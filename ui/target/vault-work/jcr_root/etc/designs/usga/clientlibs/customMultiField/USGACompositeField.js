USGACompositeField = CQ.Ext.extend(CQ.form.CompositeField, {
    constructor: function(config) {
        config = config || { };

        var defaults = {
            "layout": "form",
            "bodyStyle": "padding: 10px;",
            "labelWidth": 100,
            defaults: {
                "anchor": "99%"
            }
        };

        config = CQ.Util.applyDefaults(config, defaults);

        USGACompositeField.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        USGACompositeField.superclass.initComponent.call(this);

        this.items.each(function(c, i) {
            if (c.xtype == 'tags') {
                this.initTagInputField(c);
            }
        }, this);
    },

    initTagInputField: function (c) {
        c.superPrepareSubmit = c.prepareSubmit;

        var prepSubmit = function () {
            var tags = this.getTags();

            this.clear();

            for (var i = 0; i < tags.length; i++) {
                this.addTag(tags[i]);
            }

            this.superPrepareSubmit.apply(this);
        };

        c.prepareSubmit = function () {
            return prepSubmit.apply(c);
        };

        c.on('destroy', function () {
            if (this.formOwner) {
                if (this.formOwner.isXType('dialog')) {
                    this.formOwner.un('beforesubmit', this.prepareSubmit, this)
                } else if (this.formOwner.isXType(CQ.Ext.form.FormPanel)) {
                    this.formOwner.getForm().un("beforeaction", this.prepareSubmit, this);
                }
            }

            CQ.Ext.destroy(
                this.textField,
                this.dummyInput,
                this.inputDummy,
                this.popupMenu,
                this.namespacesTabPanel
            );

            CQ.Ext.destroyMembers(this, 'hiddenFields');
        });
    },

	processPath: function(path) {
		CQ.Log.debug("CQ.Dialog#processPath: processing path for fields");
		var fields = CQ.Util.findFormFields(this);
		for (var name in fields) {
			for (var i = 0; i < fields[name].length; i++) {
				try {
					if (fields[name][i].processPath) {
						CQ.Log.debug("CQ.Dialog#processPath: field '{0}'", [name]);
						fields[name][i].processPath(path);
					}
				}
				catch (e) {
					CQ.Log.debug("CQ.Dialog#processPath: {0}", e.message);
				}
			}
		}
		USGACompositeField.superclass.processPath.call(path);
	},

    setValue : function(value) {
        this.fireEvent("change", this, value, this.getValue());

        this.value = value;

        this.items.each(function(c, i) {
            var index = c.name.lastIndexOf('/');

            if (index > -1 && index < c.name.length) {
                var name = c.name.substring(index + 1, c.name.length);

                if (value.hasOwnProperty(name)) {
                    c.setValue(value[name]);
                }
            }
        });
    },

    getValue : function() {
        return this.value;
    }

});

CQ.Ext.reg("usgacompositefield", USGACompositeField);
