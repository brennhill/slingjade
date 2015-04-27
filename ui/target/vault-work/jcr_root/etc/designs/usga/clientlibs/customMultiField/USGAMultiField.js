USGAMultiField = CQ.Ext.extend(CQ.form.MultiField, {

    insert: function(index, component) {
        var name = this.name;
        var item = USGAMultiField.superclass.insert.call(this, index, component);

        if (item instanceof CQ.form.MultiField.Item && item.field && item.field.items) {

            item.field.items.each(function(c, i2) {
                var subName = c.getName().replace('./', '');
                var itemName = 'item' + index;

                c.name = name + '/items/' + itemName + '/' + subName;
                if (c.xtype == 'selection' && c.hiddenField) {
                    c.hiddenField.name = c.name;
                }
            });
        }

        return item;
    },

    setValue: function(value) {
        this.fireEvent("change", this, value, this.getValue());

        var oldItems = this.items;

        oldItems.each(function(item/*, index, length*/) {
            if (item instanceof CQ.form.MultiField.Item) {
                this.remove(item, true);
                this.findParentByType("form").getForm().remove(item);
            }
        }, this);

        this.doLayout();

        if ((value != null) && (value != "")) {
            if (value instanceof Array || CQ.Ext.isArray(value)) {
                for (var i = 0; i < value.length; i++) {
                    this.addItem(value[i]);
                }
            } else if (value.hasOwnProperty('items')) {
                for (var item in value['items']) {
                    if (value['items'].hasOwnProperty(item) && item.indexOf('item') == 0) {
                        this.addItem(value['items'][item]);
                    }
                }
            } else {
                this.addItem(value);
            }
        }
    }
});

CQ.Ext.reg("usgamultifield", USGAMultiField);
