(function (w) {
    /* exported fiona */
    'use strict';

    var amazon = 'https://www.amazon.com'
        , fetchUri = amazon + '/gp/digital/fiona/manage/features/order-history/ajax/'
        , deleteUri = amazon + '/gp/digital/fiona/du/fiona-delete.html'
        , _ = utils
        , LibraryItem = (function () {
            var LibraryItem = function (rawData) {
                    if (arguments.length === 0) {
                        return;
                    }

                    this.title = rawData.title;
                    this.author = rawData.author;
                    this.asin = rawData.asin;
                    this.sid = rawData.sid;
                }
                , proto = LibraryItem.prototype;

            proto.category = '<General Library Item>';

            proto.toString = function () {
                return "title:" + this.title + ", asin:" + this.asin;
            };

            // to avoid mass deletes of bought titles, we set this to false for anything but personal docs.
            proto.isDeletable = false;

            /**
             * Delete library item
             * @param [options.callback] {Function}
             */
            proto.delete = function (callback) {
                if(!this.isDeletable) {
                    callback();
                    return;
                }

                var HARD_CODED_SID = "192-2870048-2042810",
                    body = {
                        contentName: this.asin,
                        sid: HARD_CODED_SID,
                        orderID: this.orderID,
                        isAjax: 1,
                        category: this.category
                    };
                doPost(deleteUri, body, callback);
            };

            return LibraryItem;
        }())
        , PersonalDoc = (function () {
            var PersonalDoc, proto, uber;

            PersonalDoc = function () {
                LibraryItem.apply(this, arguments);
            };

            /**
             * Fetch personal documents
             * @param options.offset  default 0
             * @param options.count default 15
             */
            PersonalDoc.findAll = createFetchFunction('queryPdocs.html', 0, 15);

            PersonalDoc.prototype = new LibraryItem;
            PersonalDoc.constructor = PersonalDoc;

            proto = PersonalDoc.prototype;
            uber = LibraryItem.prototype;
            proto.category = "kindle_pdoc";
            proto.isDeletable =  true;

            proto.toString = function () {
                return "[PersonalDoc] " + uber.toString.call(this);
            };

            return PersonalDoc;
        }())
        , Ebook = (function () {
            var Ebook, proto, uber;

            Ebook = function (itemData) {
                LibraryItem.call(this, itemData);
                this.orderDate = new Date(itemData.orderDateEpoch);
                this.orderID = itemData.orderID;
            };

            /**
             * Fetch books
             * @param options.offset  default 0
             * @param options.count default 15
             */
            Ebook.findAll = createFetchFunction('queryOwnership_refactored2.html', 0, 15);

            Ebook.prototype = new LibraryItem;
            uber = LibraryItem.prototype;
            proto = Ebook.prototype;
            Ebook.constructor = Ebook;
            proto.category = "fiona_ebook";
            proto.toString = function () {
                return "[Ebook] " + uber.toString.call(this) + ", orderDate: "+this.orderDate;
            };

            return Ebook;
        }())
        , ResultSet = (function () {
            var ResultSet = function (rawData) {
                    this.hasMore = rawData.data.hasMore === 1;
                    this.offset = rawData.data.offset;
                    this.totalCount = rawData.data.totalCount;

                    var type = rawData.data.contentType;
                    this.items = rawData.data.items.map(function (itemData) {
                        if (type === "Personal Documents") return new PersonalDoc(itemData);
                        else if (type === "All") return new Ebook(itemData);
                        else return new LibraryItem(itemData);
                    });
                }
                , proto = ResultSet.prototype;


            proto.toString = function () {
                return "ResultSet: " + this.items.length + "/" + this.offset + " (offset " + this.offset + ")";
            };

            return ResultSet;
        }());

    function fetch(options) {
        doPost(fetchUri + options.action,
            { offset: options.offset, count: options.count },
            function(parsedData) { options.callback(new ResultSet(parsedData)); },
            options.errorFunction || function () {
                console.error(options.action + ": Fetch of titles failed");
            }
        );
    }


    function doPost(uri, params, callback, errorFunc) {
        if(!params) throw new Error("Missing parameters");

        var body = _.buildParameterString(params)
            , r = new XMLHttpRequest();

        r.open("POST", uri, true);
        r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")

        r.onerror = errorFunc || function () {
            console.error("Failed POST");
        };

        r.onload = function () {
            var body = r.responseText, result = undefined;

            if (body) {
                try {
                    result = JSON.parse(body);
                }
                catch (ex) {
                    result = ex;
                }
            }
            callback(result);
        };

        r.send(body);
    }

    function createFetchFunction(action, defaultOffset, defaultItemsFetched) {
        return function (options) {
            var opts;
            if (!options) opts = {};
            else opts = options;

            opts.offset = opts.offset || defaultOffset;
            opts.count = opts.count || defaultItemsFetched;

            opts.action = action;
            return fetch(opts);
        };
    }

    w.fiona = {
        _ResultSet: ResultSet,
        _LibraryItem: LibraryItem,
        PersonalDoc: PersonalDoc,
        Ebook: Ebook
    };
})(window);
