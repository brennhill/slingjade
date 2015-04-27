var usga = window.usga || {};

usga.Utils = new (can.Construct.extend({
    pick: function (obj, keys) {
        var result = {}, key;

        if (obj === null) {
            return result;
        }

        obj = new Object(obj);

        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (key in obj) {
                result[key] = obj[key];
            }
        }

        return result;
    },

    sortByPublishDateDesc: function (item1, item2) {
        var m1 = moment(item1.publishDate), m2 = moment(item2.publishDate);

        if (m1.isAfter(m2)) {
            return -1;
        }
        if (m1.isBefore(m2)) {
            return 1;
        }

        return 0;
    }
}))();