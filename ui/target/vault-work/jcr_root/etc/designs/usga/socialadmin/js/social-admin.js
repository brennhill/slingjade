var usga = window.usga || {};

usga.SocialAdmin = can.Control.extend({
    $element: null,
    context: {},
    model: {},
    helpers: {},

    onAdd: function (context) {
        var newItemTimestamp = moment(context.publishDate),
            itemToPost = new can.Map(context.serialize()),
            insertPos;

        context.attr('isPosted', true);

        if (!context.categories) {
            context.attr('categories', []);
        }
        if (!context.subCategories) {
            context.attr('subCategories', []);
        }

        if (!this.context.posted.length) {
            this.context.posted.push(itemToPost);
        } else {
            insertPos = this.context.posted.length;

            this.context.posted.each(function (item, i) {
                var itemTimestamp = moment(item.publishDate);

                if (newItemTimestamp.isAfter(itemTimestamp) || newItemTimestamp.isSame(itemTimestamp)) {
                    insertPos = i;
                    return false;
                }
            });

            this.context.posted.splice(insertPos, 0, itemToPost);
        }
    },

    onRemove: function (context) {
        var $aggregatedItem = this.$element.find('.col-aggregated #' + context._id + ':first'),
            index = this.context.posted.indexOf(context);

        if ($aggregatedItem.length === 1) {
            $aggregatedItem.data('item').attr('isPosted', false);
        }
        else {
            var newItemTimestamp = moment(context.publishDate),
                insertPos = this.context.aggregated.length;

            this.context.aggregated.each(function (item, i) {
                var itemTimestamp = moment(item.publishDate);

                if (newItemTimestamp.isAfter(itemTimestamp) || newItemTimestamp.isSame(itemTimestamp)) {
                    insertPos = i;
                    return false;
                }
            });

            context.attr('isPosted', false);
            this.context.aggregated.splice(insertPos, 0, context);
        }

        this.context.posted.splice(index, 1);
    },

    onEdit: function (context, $el) {
        $el.toggleClass("active");
        $el.parents(".element").find(".edit-categories-popup").toggle();
        $el.parents(".element").siblings().find(".popup").hide();
        $el.parents(".element").siblings().find(".edit-categories").removeClass("active");

        this.context.attr('editableItem', {});

        this.context.attr('editableItem', {
            categories: context.categories.serialize(),
            subCategories: context.subCategories.serialize()
        });
    },

    onEditCancel: function (context, $el) {
        var $container = $el.closest('.element');

        $el.toggleClass("active");
        $container.find(".edit-categories-popup").toggle();

        this.context.attr('editableItem', {});
    },

    onEditUpdate: function (context, $el) {
        var $container = $el.closest('.element'),
            categories = [],
            subCategories = [];

        $el.toggleClass("active");
        $container.find(".edit-categories-popup").toggle();

        $container.find('.categories option:selected').each(function (i, opt) {
            categories.push($(opt).val());
        });
        $container.find('.sub-categories option:selected').each(function (i, opt) {
            subCategories.push($(opt).val());
        });

        context.categories.replace(categories);
        context.subCategories.replace(subCategories);

        this.context.attr('editableItem', {});
    },

    onChanges: function () {
        this.context.attr('isChanged', this.context.posted.isDirty(true));
    },

    onSave: function () {
        var serialized = this.context.posted.serialize();
        serialized = $.map(serialized, function (item) {
            return usga.Utils.pick(item,
                [
                    "id", "publishDate", "account", "description", "hashtags", "references", "provider",
                    "link", "image", "categories", "subCategories"
                ]);
        });
        this.model.updatePosted(JSON.stringify({items: serialized})).done(this.proxy(function () {
            this.context.attr('isChanged', false);
            this.context.posted.backup(true);
        }));
    },

    onCancel: function () {
        this.context.posted.restore(true);
        this.context.attr('isChanged', false);
        this.syncFeeds();
    },

    init: function (element, options) {
        var me = this;
        this._super(element, options);

        this.$element = element;

        this.on(document, 'ready', this.proxy(this.onDocumentReady));

        this.context = new can.Map({
            aggregated: [],
            posted: [],
            editableItem: {},
            isChanged: false,

            onAdd: this.proxy(this.onAdd),

            onRemove: this.proxy(this.onRemove),
            onEdit: this.proxy(this.onEdit),
            onEditCancel: this.proxy(this.onEditCancel),
            onEditUpdate: this.proxy(this.onEditUpdate),

            onCancel: this.proxy(this.onCancel),
            onSave: this.proxy(this.onSave)
        });
        this.helpers = {
            getSocialName: function (options) {
                return options.context._id.split('_')[0];
            },

            getPublishDate: function (options) {
                return moment(options.context.publishDate).format('MMM DD');
            },

            listCategories: function (options) {
                var frags = [];

                $.each(me.options.categories, function (i, tag) {
                    frags.push(options.fn({selected: me.context.editableItem.categories.indexOf(i) !== -1, name: tag, key: i}));
                });

                return frags;
            },

            listSubCategories: function (options) {
                var frags = [];

                $.each(me.options.subCategories, function (i, tag) {
                    frags.push(options.fn({selected: me.context.editableItem.subCategories.indexOf(i) !== -1, name: tag, key: i}));
                });

                return frags;
            }
        };
        this.model = new usga.SocialAdminFeed(this.options.methods);
        this.context.delegate('posted.**', 'change', this.proxy(this.onChanges));
    },

    _makePlainId: function (id) {
        if (id) {
            return id.replace(/\-+|_+|\s+/ig, '_').replace(/[^a-z0-9_]/ig, '');
        }
        return id;
    },

    onDocumentReady: function () {
        var me = this;

        $.when(this.model.getAggregated(), this.model.getPosted()).done(function (aggregated, posted) {
            me.onLoadFeeds(aggregated[0], posted[0]);
        });

        this.$element.append(can.view('#socialAdminTemplate', this.context, this.helpers));
    },

    onLoadFeeds: function (aggregated, posted) {
        aggregated.items = aggregated.items || [];
        posted.items = posted.items || [];

        aggregated.items = $.map(aggregated.items, this.proxy(function (item) {
            if (!item.id) {
                return null;
            }
            item._id = this._makePlainId(item.id);
            return item;
        }));
        posted.items = $.map(posted.items, this.proxy(function (item) {
            if (!item.id) {
                return null;
            }
            item._id = this._makePlainId(item.id);
            return item;
        }));

        aggregated.items.sort(usga.Utils.sortByPublishDateDesc);
        posted.items.sort(usga.Utils.sortByPublishDateDesc);

        $.each(posted.items, function (i, item) {
            item.categories = item.categories || [];
            item.subCategories = item.subCategories || [];
        });

        this.context.attr('aggregated', aggregated.items);
        this.context.attr('posted', posted.items);
        this.context.attr('posted').backup(true);

        this.syncFeeds();
    },

    syncFeeds: function () {
        var postedIds = $.map(this.context.posted, function (item) {
            return item._id;
        });

        $.each(this.context.aggregated, this.proxy(function (i, item) {
            item.attr('isPosted', postedIds.indexOf(item._id) !== -1);
        }));
    }
});

usga.SocialAdminFeed = can.Construct.extend({
    methods: {
        getAggregated: null,
        getPosted: null,
        updatePosted: null
    },

    init: function (methods) {
        this.methods = can.extend(this.methods, methods);
    },

    getMethodInfo: function (name) {
        return $.map(this.methods[name].split(' '), function (val) {
            return val.trim();
        });
    },

    makeRequest: function (type, url, data) {
        return $.ajax({
            type: type,
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: data || {}
        });
    },

    getAggregated: function () {
        if (!this.methods.getAggregated) {
            return $.when([]);
        }

        return this.makeRequest.apply(this, this.getMethodInfo('getAggregated'));
    },

    getPosted: function () {
        if (!this.methods.getPosted) {
            return $.when([]);
        }

        return this.makeRequest.apply(this, this.getMethodInfo('getPosted'));
    },

    updatePosted: function (items) {
        if (!this.methods.updatePosted) {
            return $.when();
        }

        var methodInfo = this.getMethodInfo('updatePosted');

        return this.makeRequest(methodInfo[0], methodInfo[1], items);
    }
});