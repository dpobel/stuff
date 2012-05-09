YUI.add('gmmobileapp', function (Y) {
    "use strict";

    var L = Y.Lang,
        abs = Math.abs,
        MIN_DIST_GESTURE = 10;
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

    function defaultSync(action, options, callback) {
        Y.io(options.action, {
            method: 'GET',
            on: {
                failure: function () {
                    callback('IO failed');
                },
                success: function (tId, data) {
                    callback(false, data.responseText);
                }
            }
        });
    }

    // Models and ModelLists
    var Train = Y.Base.create('train', Y.Model, [], {

        sync: defaultSync,

        parse: function (res) {
            return Y.JSON.parse(res);
        }
    }, {
        ATTRS: {
            num: {value:null},
            type: {value:null},
            destination: {value:null},
            startTime: {value:null},
            startDate: {value: null},
            platform: {value: null},
            details: {value: null},
            // following fields are set in details only
            start: {value: null},
            destinationDate: {value: null},
            destinationTime: {value: null},
            duration: {value: null},
            stops: {value: null},
            lateTime: {value: null}
        }
    });

    var TrainList = Y.Base.create('trainList', Y.ModelList, [], {
        model: Train,

        sync: defaultSync,

        parse: function (res) {
            var s = Y.JSON.parse(res);
            this.set('time', s.time);
            if ( !this.get('station') ) {
                this.set('station', new Station(s.station));
            }
            return s.trains;
        }
    }, {
        ATTRS: {
            station: {value: null},
            time: {value: ''}
        }
    });

    var Station = Y.Base.create('station', Y.Model, [], {
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

    var StationList = Y.Base.create('stationList', Y.ModelList, [], {
        model: Station,
        bookmarkManager: bookmarkManager,

        sync: defaultSync,

        parse: function (res) {
            return Y.JSON.parse(res);
        },

        loadBookmarked: function() {
            var that = this;
            this.reset();
            Y.each(this.bookmarkManager.getAll(), function (o) {
                that.add(o);
            });
            return this;
        }

   });

    // Views
    var BaseView = Y.Base.create('baseView', Y.View, [], {
        /**
         * Overrides the default implementation to handle
         * the context of gesture* events
         */
        attachEvents: function (events) {
            var container = this.get('container'),
                owns      = Y.Object.owns,
                handler, handlers, name, selector, isGesture;

            this.detachEvents();

            events || (events = this.events);

            for (selector in events) {
                if (!owns(events, selector)) { continue; }

                handlers = events[selector];

                for (name in handlers) {
                    isGesture = (name.indexOf('gesture') == 0);
                    if (!owns(handlers, name)) { continue; }

                    handler = handlers[name];

                    if (typeof handler === 'string') {
                        handler = this[handler];
                    }

                    if ( isGesture ) {
                        this._attachedViewEvents.push(
                            container.delegate(name, handler, selector, {}, this)
                        );
                    } else {
                        this._attachedViewEvents.push(
                            container.delegate(name, handler, selector, this));
                    }
                }
            }

            return this;
        },
        registerGestureStart: function (e) {
            this.set('gestureStart', {x: e.clientX, y: e.clientY});
        },

        isTap: function(e) {
            var start = this.get('gestureStart');
            if ( !e.touches ) {
                return true;
            }
            if (abs(e.clientX - start.x) > MIN_DIST_GESTURE || abs(e.clientY - start.y) > MIN_DIST_GESTURE) {
                return false;
            }
            return true;
        }
    }, {
        ATTRS: {
            template:{
                value: function() {},
                getter: function(val) {
                    if ( !L.isFunction(val) ) {
                        return Y.Handlebars.compile(val);
                    }
                    return Y.Handlebars.template(val);
                }
            },
            gestureStart: {
                value: {}
            }
        }
    });

    var BaseFormFavoriteStationView = Y.Base.create('baseFormFavoriteStationView', BaseView, [], {

        events: {
            '.gm-bookmark': {
                gesturemovestart: 'registerGestureStart',
                gesturemoveend: 'bookmark',
                click: 'cancelClick'
            },
            '.gm-station-list li': {
                gesturemovestart: 'registerGestureStart',
                gesturemoveend: 'departures'
            },
            '.gm-search': {
                gesturemovestart: 'registerGestureStart',
                gesturemoveend: 'search'
            },
            '#search-station': {
                keypress: 'handleEnter'
            }
        },

        initializer: function () {
            this.publish('search', {preventable: false});
            this.publish('bookmarkChange', {preventable: false});
            this.publish('departures', {preventable: false});
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

        departures: function (e) {
            if ( this.isTap(e) ) {
                e.halt(true);
                this.fire('departures', {code: e.currentTarget.getAttribute('data-station-code')});
            }
        },

        cancelClick: function (e) {
            e.preventDefault();
        }
    });



    var HomePageView = Y.Base.create('homePageView', BaseFormFavoriteStationView, [], {
        selectors: {
            help: '.help'
        },

        render: function () {
            var vars = {
                    stations: this.get('stations').map(function (s) {
                        return s.toJSON();
                    })
                },
                content = '';
            content =  this.get('template')(vars);
            this.get('container').addClass('home').setContent(content);

            return this;
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
                    li.get('parentNode').remove(true);
                } else {
                    li.remove(true);
                }
            });
        }
    });

    var SearchView = Y.Base.create('searchView', BaseFormFavoriteStationView, [], {
        render: function () {
            var vars = {
                    search: this.get('search'),
                    results: this.get('results').map(function (s) {
                        return s.toJSON();
                    })
                },
                content = this.get('template')(vars);
            this.get('container').addClass('search').setContent(content);
            return this;
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

    var DeparturesView = Y.Base.create('departuresView', BaseView, [], {

        events: {
            '.gm-departures li': {
                gesturemovestart: 'registerGestureStart',
                gesturemoveend: 'details'
            }
        },

        initializer: function () {
            this.publish('details', {preventable: false});
        },

        render: function () {
            var vars = {
                    station: this.get('station').toJSON(),
                    time: this.get('trains').get('time'),
                    trains: this.get('trains').map(function (t) {
                        return t.toJSON();
                    })
                },
                content = this.get('template')(vars);
            this.get('container').addClass('departures').setContent(content);
            return this;
        },

        details: function (e) {
            if ( this.isTap(e) ) {
                e.halt(true);
                this.fire('details', {
                    num: e.currentTarget.getAttribute('data-train-num'),
                    trainType: e.currentTarget.getAttribute('data-train-type'),
                    date: e.currentTarget.getAttribute('data-train-date')
                });
            }
         }

    });

    var DetailsView = Y.Base.create('detailsView', BaseView, [], {

        render: function () {
            var vars = {
                    train: this.get('train').toJSON()
                },
                content = this.get('template')(vars);
            this.get('container').addClass('details').setContent(content);
            return this;
        }

    });


    var LoadingView = Y.Base.create('loadingView', BaseView, [], {

        render: function () {
            var content = this.get('template')();
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
            details: {
                type: DetailsView,
                parent: 'departures'
            },
            loading: {
                type: LoadingView,
                parent: 'home',
                preserved: true
            }
        },
        transitions: {
            navigate: 'slideLeft',
            toChild: 'slideLeft',
            toParent: 'slideRight'
        },

        initializer: function () {
            var that = this;

            this.on('*:search', function (e) {
                that.navigate('/search/' + e.search);
            });

            this.on('*:bookmarkChange', function (e) {
                var bookmarked = e.station.get('bookmarked');
                e.station.set('bookmarked', !bookmarked);
            });

            this.on('*:departures', function (e) {
                that.navigate('/departures/' + e.code);
            });

            this.on('*:details', function (e) {
                var tmp = e.date.split('/'),
                    type = e.trainType ? e.trainType : "0";
                that.navigate(
                    '/details/' + e.num + '/'  + type + '/' +
                    tmp[2] + '|' + tmp[1] + '|' + tmp[0]
                );
            });

            Y.each(this.get('templates').partials, function (val, key) {
                Y.Handlebars.registerPartial(
                    key, L.isFunction(val) ? Y.Handlebars.template(val) : Y.Handlebars.compile(val)
                );
            });

            this.on('init', function (e) {
                var loader = Y.one(this.get('appLoader'));
                if ( loader ) {
                    loader.remove(true);
                }
            });

        },

        showView: function (view, config, options, callback) {
            var tpls = this.get('templates');
            if ( !config ) {
                config = {};
            }
            config.template = tpls.templates[view];
            Y.GMMobileApp.superclass.showView.call(this, view, config, options, this.setTitle);
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
                station: station,
                action: L.sub(this.get('actions.timetable'), {
                    code: code
                })
            }, function () {
                if ( that.isLoading() ) {
                    that.showView('departures', {
                        station: tl.get('station'),
                        trains: tl
                    });
                }
            });
        },
        showDetails: function (req, res, next) {
            var train = new Train(),
                that = this;
            this.showView('loading');
            train.load({
                action: L.sub(this.get('actions.details'), {
                    num: req.params.num,
                    type: req.params.type,
                    date: req.params.date
                })
            }, function () {
                if ( that.isLoading() ) {
                    that.showView('details', {
                        train: train
                    });
                }
            });
        },

        // utils
        isLoading: function() {
            return (this.get('activeView').name == 'loadingView');
        },

        setTitle: function () {
            Y.config.doc.title = this.get('container').one('header h1').getContent();
        }
    },{
        ATTRS: {
            routes: {
                value: [
                    {path: '/', callback: 'showHome'},
                    {path: '/search/:str', callback: 'showSearch'},
                    {path: '/geosearch', callback: 'showGeoSearch'},
                    {path: '/departures/:code', callback: 'showDepartures'},
                    {path: '/details/:num/:type/:date', callback: 'showDetails'}
                ]
            },
            stations: {
                value: new StationList()
            },
            actions: {
                value: {}
            },
            templates: {
                value: {}
            }
        }
    });

}, '1.0.0');
