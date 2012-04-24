YUI.add('gmmobileapp', function (Y) {
    "use strict";

    var L = Y.Lang;

    var HomePageView, SearchView, DeparturesView, LoadingView,
        SearchFormView;
    var Station, StationList, Train, TrainList;


    var bookmarkManager = (function () {
        var key = 'stations',
            storage = Y.config.win.localStorage, // TODO check
            data = {};

        function getAll() {
            var st = storage.getItem(key);
            if ( st ) {
                data = Y.JSON.parse(st);
            }
            return data;
        }

        function isBookmarked(code) {
            var stations = getAll();

            if ( stations[code] )
                return true;
            return false;
        }

        return {
            getAll: getAll,
            isBookmarked: isBookmarked,
            toggleBookmark: function (station) {
                var id = station.get('id');
                if ( isBookmarked(id) ) {
                    delete data[id];
                } else {
                    data[id] = station.json();
                }
                storage.setItem(key, Y.JSON.stringify(data));
            }
        }
    })();

    // Models and ModelLists
    Train = Y.Base.create('train', Y.Model, [], {

    }, {
        ATTRS: {
            num: {value:null},
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
            Y.io(options.action, {
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
            var s = Y.JSON.parse(res);
            this.set('time', s.time);
            return s.trains;
        }
    }, {
        ATTRS: {
            stationCode: {value: ''},
            time: {value: ''}
        }
    });

    Station = Y.Base.create('station', Y.Model, [], {
        idAttribute: 'code',
        bookmarkManager: bookmarkManager,

        initializer: function () {
            var that = this;

            this.after('bookmarkedChange', function (e) {
                that.bookmarkManager.toggleBookmark(that);
            });
        },

        json: function () {
            return {
                code: this.get('code'),
                name: this.get('name')
            };
        }
    }, {
        ATTRS: {
            code: {value: null},
            name: {value: null},
            bookmarked: {
                getter: function () {
                    return bookmarkManager.isBookmarked(this.get('code'));
                }
            }
        }
    });

    StationList = Y.Base.create('stationList', Y.ModelList, [], {
        model: Station,
        bookmarkManager: bookmarkManager,

        sync: function (action, options, callback) {
            Y.io(options.action, {
                method: 'GET',
                on: {
                    failure: function () {
                        callback("IO failure"); // TODO properly handle errors
                    },
                    success: function (tId, data) {
                        callback(false, data.response);
                    }
                }
            });
        },

        parse: function (res) {
            return Y.JSON.parse(res);
        },

        loadBookmarked: function() {
            var that = this;
            Y.each(this.bookmarkManager.getAll(), function (o) {
                that.add(o);
            });
            return this;
        }

    }, {

    });

    // Views

    SearchFormView = Y.Base.create('searchView', Y.View, [], {

        initializer: function () {
            this.publish('search', {preventable: false});
        },

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
    });



    HomePageView = Y.Base.create('homePageView', SearchFormView, [], {
        selectors: {
            help: '.help'
        },
        template: Y.Handlebars.compile(Y.one('#t-home').getContent()),

        events: {
            '.gm-bookmark': {
                click: 'bookmark'
            },
            '.gm-station-list li': {
                click: 'departures'
            },
            '.gm-search': {
                click: 'search'
            },
            '#search-station': {
                keypress: 'handleEnter'
            }
        },

        initializer: function () {
            this.publish('bookmarkChange', {preventable: false});
            this.publish('departures', {preventable: false});
        },

        render: function () {
            var vars = {
                    stations: this.get('stations').map(function (s) {
                        return s.getAttrs(['code', 'name', 'bookmarked']);
                    })
                },
                content = '';
            content =  this.template(vars);
            this.get('container').addClass('home').setContent(content);

            return this;
        },

        departures: function (e) {
            e.halt(true);
            this.fire('departures', {code: e.currentTarget.getAttribute('data-station-code')});
        },

        bookmark: function (e) {
            var li = e.target.ancestor(function (n) {
                    return (n.get('localName') == 'li' ? n : false);
                }, false),
                that = this;
            e.halt(true);
            this.fire('bookmarkChange', {
                station: this.get('stations').getById(
                    e.target.getAttribute('data-station-code')
                )
            });
            li.hide('fadeOut', {}, function() {
                if ( li.siblings().size() == 0 ) {
                    Y.one(that.selectors.help).show('fadeIn');
                }
                li.get('parentNode').remove(true);
            });
        }
    });

    SearchView = Y.Base.create('searchView', SearchFormView, [], {
        template: Y.Handlebars.compile(Y.one('#t-search').getContent()),

        events: {
            '.gm-bookmark': {
                click: 'bookmark'
            },
            '.gm-station-list li': {
                click: 'departures'
            },
            '.gm-search': {
                click: 'search'
            },
            '#search-station': {
                keypress: 'handleEnter'
            }
        },

        initializer: function () {
            this.publish('bookmarkChange', {preventable: false});
            this.publish('departures', {preventable: false});
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

        departures: function (e) {
            e.halt(true);
            this.fire('departures', {code: e.currentTarget.getAttribute('data-station-code')});
        },

        bookmark: function (e) {
            e.halt(true);
            this.fire('bookmarkChange', {
                station: this.get('results').getById(
                    e.target.getAttribute('data-station-code')
                )
            });
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
                    time: this.get('trains').get('time'),
                    trains: this.get('trains').map(function (t) {
                        return t.getAttrs(['num', 'type', 'destination', 'time', 'platform', 'details'])
                    })
                },
                content = this.template(vars);
            this.get('container').addClass(this.containerClass).setContent(content);
            return this;
        }

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
            loading: {
                type: LoadingView,
                parent: 'home'
            }
        },

        initializer: function () {
            this.on('*:search', this.navigateToSearch);

            this.on('*:bookmarkChange', this.bookmark);

            this.on('*:departures', this.navigateToDepartures);

            Y.all('.gm-t-partial').each(function () {
                Y.Handlebars.registerPartial(
                    this.getAttribute('data-name'),
                    this.getContent()
                );
            });

            this.on('init', function (e) {
                var loader = Y.one(this.get('appLoader'));
                if ( loader ) {
                    loader.remove(true);
                }
            });

        },

        // Event handlers
        navigateToSearch: function (e) {
            this.navigate('/search/' + e.search);
        },

        navigateToDepartures: function (e) {
            this.navigate('/departures/' + e.code);
        },

        bookmark: function (e) {
            var bookmarked = e.station.get('bookmarked');
            e.station.set('bookmarked', !bookmarked);
        },

        // Route handlers
        showHome: function (req, res, next) {
            this.showView('home', {
                stations: this.get('stations').loadBookmarked()
            });
        },
        showSearch: function (req, res, next) {
            var that = this,
                list = new StationList();
            list.load({
                action: L.sub(
                    this.get('actions.search'),
                    {str: req.params.str}
                )
            }, function () {
                that.showView('search', {
                    search: req.params.str,
                    results: list
                });
            });
        },
        showGeoSearch: function (req, res, next) {

        },
        showDepartures: function (req, res, next) {
            var code = req.params.code,
                station = this.get('stations').getById(code),
                that = this,
                tl = new TrainList();

            this.showView('loading');
            tl.load({
                stationCode: code,
                action: L.sub(this.get('actions.timetable'), {
                    code: code
                })
            }, function () {
                if ( that.get('activeView').name === 'loadingView' ) {
                    that.showView('departures', {
                        station: station,
                        trains: tl
                    });
                }
            });
        }
    },{
        ATTRS: {
            routes: {
                value: [
                    {path: '/', callback: 'showHome'},
                    {path: '/search/:str', callback: 'showSearch'},
                    {path: '/geosearch', callback: 'showGeoSearch'},
                    {path: '/departures/:code', callback: 'showDepartures'}
                ]
            },
            stations: {
                value: new StationList()
            },
            actions: {
                value: {}
            }
        }
    });

}, '1.0.0', {
    requires: [
        'app', 'app-transitions', 'handlebars', 'transition', 'io-base', 'json'
    ]
});
