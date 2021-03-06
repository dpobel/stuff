YUI.add('gmmobileapp', function (Y) {

    var L = Y.Lang,
        localStorage = Y.config.win.localStorage; // TODO check

    var HomePageView, SearchView, DeparturesView;
    var Station, StationList, Train, TrainList;

    // Models and ModelLists
    Train = Y.Base.create('train', Y.Model, [], {

    }, {
        ATTRS: {
            type: {value:null},
            destination: {value:null},
            time: {value:null},
            platform: {value: null},
            details: {value: null}
        }
    });

    TrainList = Y.Base.create('trainList', Y.ModelList, [], {
        model: Train,

        sync: function (action, options, callback) {
            var url = '/timetable.php'; // TODO!
            if ( action != 'read' ) {
                callback('Only read is allowed');
            }
            //console.log(this.get('stationCode'));
            Y.io(url, {
                method: 'GET',
                on: {
                    failure: function () {
                        callback('IO Failed');
                    },
                    success: function(tId, data) {
                        callback(false, data.response);
                    }
                }
            });
        },

        parse: function (res) {
            return Y.JSON.parse(res);
        }
    }, {
        ATTRS: {
            stationCode: {value: ''}
        }
    });

    Station = Y.Base.create('station', Y.Model, [], {
        idAttribute: 'code'
    }, {
        ATTRS: {
            code: {value: null},
            gemCode: {value: null},
            name: {value: null},
            bookmarked: {
                value: false,
                getter: function () {
                    return (localStorage.getItem(this.get('id')) === "1");
                },
                validator: L.isBoolean
            }
        }
    });

    StationList = Y.Base.create('stationList', Y.ModelList, [], {
        model: Station,

        search: function (str) {
            return this.filter(function (s) {
                if ( s.get('name').search(new RegExp(".*" + str + ".*", "i")) != -1 ) {
                    return s;
                }
                return false;
            });
        },

        bookmarked: function() {
            return this.filter(function (s) {
                if (s.get('bookmarked')) {
                    return s;
                }
                return false;
            });
        }

    }, {

    });

    // Views
    HomePageView = Y.Base.create('homePageView', Y.View, [], {
        selectors: {
            help: '.help'
        },
        template: Y.Handlebars.compile(Y.one('#t-home').getContent()),

        events: {
            '.gm-search': {
                click: 'search'
            },

            '#search-station': {
                keypress: 'handleEnter'
            },
            '.gm-bookmark': {
                click: 'bookmark'
            }
        },

        initializer: function () {
            this.publish('search', {preventable: false});
        },

        render: function () {
            var vars = {
                    stations: this.get('stations').map(function (s) {
                        return s.getAttrs(['code', 'name', 'bookmarked']);
                    })
                }
                content = '';
            content =  this.template(vars);
            this.get('container').addClass('home').setContent(content);

            return this;
        },

        // Event handlers
        search: function () {
            var value = L.trim(Y.one('#search-station').get('value'));
            if (value !== '') {
                this.fire('search', {search: value});
            }
            // TODO warning in search form
        },

        handleEnter: function (e) {
            if (e.keyCode === 13) {
                this.search();
            }
        },

        bookmark: function (e) {
            var li = e.target.ancestor(function (n) {
                    return (n.get('localName') == 'li' ? n : false);
                }, false),
                that = this;
            e.preventDefault();
            this.fire('bookmarkChange', {code: e.target.getAttribute('data-station-code')});
            li.hide('fadeOut', {}, function() {
                if ( li.siblings().size() == 0 ) {
                    Y.one(that.selectors.help).show('fadeIn');
                }
                li.remove(true);
            });
            
        }
    });

    SearchView = Y.Base.create('searchView', Y.View, [], {
        template: Y.Handlebars.compile(Y.one('#t-search').getContent()),

        events: {
            '.gm-bookmark': {
                click: 'bookmark'
            }
        },

        initializer: function () {
            this.publish('bookmarkChange', {preventable: false});
        },

        render: function () {
            var vars = {
                    search: this.get('search'),
                    results: this.get('results').map(function (s) {
                        return s.getAttrs(['code', 'name', 'bookmarked']);
                    })
                },
                content = this.template(vars);
            this.get('container').addClass('search').setContent(content);
            return this;
        },

        bookmark: function (e) {
            e.preventDefault();
            this.fire('bookmarkChange', {code: e.target.getAttribute('data-station-code')});
            e.target.toggleClass('bookmarked');
        }
    });

    DeparturesView = Y.Base.create('departuresView', Y.View, [], {
        template: Y.Handlebars.compile(Y.one('#t-departures').getContent()),
        containerClass: 'departures',

        events: {

        },

        initializer: function () {

        },

        render: function () {
            var vars = {
                    station: this.get('station').getAttrs(['name', 'code']),
                    trains: this.get('trains').map(function (t) {
                        return t.getAttrs(['type', 'destination', 'time', 'platform', 'details'])
                    })
                },
                content = this.template(vars);
            this.get('container').addClass(this.containerClass).setContent(content);
            return this;
        }

    });

    ArrivalsView = Y.Base.create('arrivalsView', DeparturesView, [], {
        template: Y.Handlebars.compile(Y.one('#t-arrivals').getContent()),
        containerClass: 'arrivals'
    }, {

    });

    LoadingView = Y.Base.create('loadingView', Y.View, [], {
        template: Y.Handlebars.compile(Y.one('#t-loading').getContent()),

        events: {

        },

        initializer: function () {

        },

        render: function () {
            var content = this.template();
            this.get('container').addClass('loading').setContent(content);
            return this;
        }

    });

    // Application
    Y.GMMobileApp = Y.Base.create('gmMobileApp', Y.App, [], {
        views: {
            home: {
                type: HomePageView
            },
            search: {
                type: SearchView,
                parent: 'home'
            },
            departures: {
                type: DeparturesView,
                parent: 'home'
            },
            arrivals: {
                type: ArrivalsView,
                parent: 'home'
            },
            loading: {
                type: LoadingView,
                parent: 'home'
            }
        },

        initializer: function () {
            this.on('*:search', this.navigateToSearch);

            this.on('*:bookmarkChange', this.bookmark);

            Y.all('.gm-t-partial').each(function () {
                Y.Handlebars.registerPartial(
                    this.getAttribute('data-name'),
                    this.getContent()
                );
            });
        },

        // Event handlers
        navigateToSearch: function (e) {
            this.navigate('/search/' + e.search);
        },

        bookmark: function (e) {
            var station = this.get('stations').getById(e.code),
                bookmarked = station.get('bookmarked');
            station.set('bookmarked', !bookmarked);
            // TODO set event handler instead ?
            localStorage.setItem(
                station.get('id'),
                bookmarked ? "0" : "1"
            );
        },

        // Route handlers
        showHome: function (req, res, next) {
            this.showView('home', {
                stations: this._getBookmarkedStations()
            });
        },
        showSearch: function (req, res, next) {
            this.showView('search', {
                search: req.params.str,
                results: this._doSearch(req.params.str)
            });
        },
        showGeoSearch: function (req, res, next) {

        },
        showDepartures: function (req, res, next) {
            this._showTimetable(req.params.code, 'departures');
        },
        showArrivals: function (req, res, next) {
            this._showTimetable(req.params.code, 'arrivals');
        },

        // do the real jobs...
        _showTimetable: function (code, viewId) {
            var station = this.get('stations').getById(code),
                that = this;

            this.showView('loading');
            var tl = new TrainList({
                stationCode: code,
                type: viewId
            });
            tl.load(function () {
                if ( that.get('activeView').name === 'loadingView' ) {
                    that.showView(viewId, {
                        station: station,
                        trains: tl
                    });
                }
            })
        },

        _doSearch: function (str) {
            return this.get('stations').search(str);
        },

        _getBookmarkedStations: function() {
            return this.get('stations').bookmarked();
        }
    },{
        ATTRS: {
            routes: {
                value: [
                    {path: '/', callback: 'showHome'},
                    {path: '/search/:str', callback: 'showSearch'},
                    {path: '/geosearch', callback: 'showGeoSearch'},
                    {path: '/departures/:code', callback: 'showDepartures'},
                    {path: '/arrivals/:code', callback: 'showArrivals'}
                ]
            },
            stations: {
                writeOnce: true,
                value: new StationList(),
                setter: function (val) {
                    var l = new StationList();
                    l.add(val);
                    return l;
                },
                validator: L.isArray
            }
        }
    });

}, '1.0.0', {
    requires: [
        'app', 'app-transitions', 'handlebars', 'transition', 'io-base', 'json-parse'
    ]
});
