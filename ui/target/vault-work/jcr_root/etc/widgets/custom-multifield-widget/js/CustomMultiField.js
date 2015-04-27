/**
 * The <code>CQ.form.MultiField</code> class represents an editable list
 * of form fields for editing multi value properties.
 *
 * @class CQ.form.MultiField
 * @extends CQ.form.CompositeField
 */
CQ.form.CustomMultiField = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
     * @cfg {Object} fieldConfig
     * The configuration options for the fields (optional).
     */
    fieldConfig: null,
    
    /**
     * @cfg {Object} numberOfItems
     * CUSTOM ADD 
     */
    numberOfItems: null,
    
    /**
     * @cfg {Object}
     * CUSTOM ADD for overall name of the widget, NOT the name of the individual
     * fields that comprise this widget
     */
	customMultiFieldName: null,
	
	/**
	 * @cfg {Boolean} storeIndexPos
	 * CUSTOM ADD <code>TRUE</code> to store index position, mainly used with
	 * second level links for left navigation component
	 */
	storeIndexPos: false,
	
	/**
     * @cfg {Number} maxItems Maximum number of items that can be created (defaults to 25).
     * CUSTOM ADD
     */
	maxItems: 100,
     
    /**
     * Creates a new <code>CQ.form.CustomMultiField</code>.
     * @constructor
     * @param {Object} config The config object
     */
    constructor: function(config) {
        var list = this;

        // CUSTOM ADD
        if (!config.customMultiFieldName) {
        	config.customMultiFieldName = "./numberofitems";
        }
        
        if (!config.value) {
        	config.value = 0;
        }
        // END CUSTOM ADD
        
        if (!config.fieldConfig) {
            config.fieldConfig = {};
        }
        if (!config.fieldConfig.xtype) {
        	// CUSTOM - this allows multiple input fields to be considered
        	// as one entry, e.g. textfield "Name", textfield "Phone", textfield
        	// "Email", 3 separate textfields input but counts as "one" entry
        	// otherwise, only one input field is allowed
            config.fieldConfig.xtype = "customcompositefield";	// CUSTOM ADD, original was textfield
        }
        config.fieldConfig.name = config.name;
        config.fieldConfig.style = "width:95%;";
        var items = new Array();

        // CUSTOM ADD
        this.numberOfItems = new CQ.Ext.form.Hidden({
            "name": config.customMultiFieldName,
            "value": config.value
        });
        items.push(this.numberOfItems);
        // END CUSTOM ADD
        
        if(config.readOnly) {
            //if component is defined as readOnly, apply this to all items
            config.fieldConfig.readOnly = true;
        } else {
            items.push({
                "xtype":"button",
                "cls": "cq-multifield-btn",
                "text":"+",
                "handler":function() {
                    list.addItem();
                }
            });
        }

        // PART OF ORIGINAL MultiField.js, commenting out to use the following
//        items.push({
//            "xtype":"hidden",
//            "name":config.name + CQ.Sling.DELETE_SUFFIX
//        });

        // CUSTOM ADD
        this.customMultiFieldName = config.customMultiFieldName;
        this.fieldConfig = config.fieldConfig;
        // need to actually add @Delete to all fields that comprise one
    	// entity/composite field; for example, if there is
    	// 1 browsefield, 2 textfields that = 1 image, need
    	// to loop through and add to the browsefield and 2
    	// textfields
        for (var i = 0; i < this.fieldConfig.length; i++) {
//        	if (this.fieldConfig[i].autoDelete) {
        		items.push({
        			"xtype":"hidden",
        			"name":this.fieldConfig[i].name + CQ.Sling.DELETE_SUFFIX	// @Delete
        		});
//        	}
          	if (this.fieldConfig[i].xtype == "pathfield") {
          		config.fieldConfig[i].style = "width:200px";
          	}
        }  
        items.push({ 
        	"xtype":"hidden",
        	"name":config.customMultiFieldName + CQ.Sling.DELETE_SUFFIX
        });
        // END CUSTOM ADD
        
        config = CQ.Util.applyDefaults(config, {
            "defaults":{
                "xtype":"custommultifielditem",
                "fieldConfig":config.fieldConfig,
                "storeIndexPos": false,	// CUSTOM ADD
                "maxItems": 100	// CUSTOM ADD
            },
            "items":[
                {
                    "xtype":"panel",
                    "border":true,
                    "bodyStyle":"padding:4px",
                    "items":items
                }
            ]
        });

        // CUSTOM ADD - mostly for left nav component second level links
        if (config.storeIndexPos) this.storeIndexPos = config.storeIndexPos;
        // mostly for front images in header component
        if (config.maxItems) this.maxItems = config.maxItems;
        // END CUSTOM ADD
        
        CQ.form.CustomMultiField.superclass.constructor.call(this,config);
        if (this.defaults.fieldConfig.regex) {
            // somehow regex get broken in this.defaults, so fix it
            this.defaults.fieldConfig.regex = config.fieldConfig.regex;
        }
        this.addEvents(
            /**
             * @event change
             * Fires when the value is changed.
             * @param {CQ.form.CustomMultiField} this
             * @param {Mixed} newValue The new value
             * @param {Mixed} oldValue The original value
             */
            "change"
        );

        // CUSTOM ADD - "beforeSubmit" listener
        this.on("render",function() {
            this.parentDialog = this.findParentByType("dialog");
            if(this.parentDialog) {
                
                this.parentDialog.on("beforeSubmit", function(path, record) {
                	if( list.storeIndexPos ) {
                		list.resetCustomValue();
                	}
                }, this.parentDialog);
            }
        },this);
        // END CUSTOM ADD
    },

    /**
     * Validates a value according to the field's validation rules and marks the field as invalid
     * if the validation fails
     * @param {Mixed} value The value to validate
     * @return {Boolean} True if the value is valid, else false
     */
    validateValue : function(value) {
    	// CUSTOM ADD added 10/30/09 - allow required fields to be validated
    	var isValid = true;
    	var currentObj = this;
    	var dialogFields = CQ.Util.findFormFields(currentObj);
    	for (var name in dialogFields) {
    		for (var i = 0; i < dialogFields[name].length; i++) {
    			// only validate values if "OK" button clicked if inside customcompositefield
    			if( dialogFields[name][i].xtype == "customcompositefield" || dialogFields[name][i].isXType("customcompositefield") ) {
    				var compositeField = dialogFields[name][i];
    				// FOR loop to loop through each field that comprises one customcompositefield
    				for( var x = 0; x < compositeField.items.getCount(); x++ ) {
//                   	 	alert(compositeField.items.get(x).name + " = " + compositeField.items.get(x).getValue() 
//                 			 + ", num = " + x + ", length = "+compositeField.items.get(x).getValue().length 
//                 			 + ", raw value = " + compositeField.items.get(x).getRawValue()
//                 			+ ", allowblank = " + compositeField.items.get(x).allowBlank);

						// if field (part of one customcompositefield) is required and no value is
						// input, mark invalid and do NOT pass validation (error message should be displayed)
		 				if( !compositeField.items.get(x).allowBlank && compositeField.items.get(x).getValue().length < 1 ) {
		 					compositeField.items.get(x).markInvalid(compositeField.items.get(x).blankText);
		 					isValid = false;
		 				}
    				}  // end FOR loop of customcompositefields
				}  // end IF statement - only if customcompositefield
    		}  // end OUTER FOR loop to loop through all fields in dialog
    	}  // end OUTER OUTER FOR loop
        return isValid;
    	// END CUSTOM ADD
    },
    
    /**
            * Called from constructor, on "beforeSubmit" listener, when the author
            * clicks the "OK" button in the dialog. Setting some values to be saved
            * (usually hidden fields, to support leftnav component). Called and
            * values set before the actual submit/dialog save.
            */
    resetCustomValue: function() {
    	// CUSTOM ADD FUNCTION
    	var currentObj = this;
    	var dialogFields = CQ.Util.findFormFields(currentObj);
    	for (var name in dialogFields) {
    		var indexNum = 0;
    		for (var i = 0; i < dialogFields[name].length; i++) {
    			// only adjust values before "OK" post if inside customcompositefield
    			if( dialogFields[name][i].xtype == "customcompositefield" || dialogFields[name][i].isXType("customcompositefield") ) {
    				var compositeField = dialogFields[name][i];
    				// for loop to loop through each field that comprises one customcompositefield
    				for( var x = 0; x < compositeField.items.getCount(); x++ ) {
//                   	 	alert(compositeField.items.get(x).name + " = " + compositeField.items.get(x).getValue() 
//                 			 + ", num = " + x + ", indexNum = "+indexNum + ", raw value = " + compositeField.items.get(x).getRawValue());
		
		 				var originalValue = compositeField.items.get(x).getValue();
 						var linkTextValue;
						if( compositeField.items.get(x).name == "./secondLevelLinkText" ) {
							linkTextValue = originalValue;
							linkTextValue = linkTextValue.replace(/ /g,"-").toLowerCase();
						}
						if( compositeField.items.get(x).name == "./secondLevelIndex" 
							 && (!originalValue || originalValue == null || originalValue == '') ) {
							compositeField.items.get(x).setRawValue(indexNum);
							compositeField.items.get(x).setValue(indexNum);
						}
						// store version of link text (without spaces) in hidden field so
						// can match the link text item by looping through the array and
						// matching this hidden field (which indicates which link text in the
						// array it is). From this, can grab the index of the array and
						// then can inherit from parent or above. kind of convoluted, but
						// only way it can work based on the leftnav, leftnavitem, leftnavparsys components
						if( compositeField.items.get(x).name == "./secondLevelHolderName" 
							 && (!originalValue || originalValue == null || originalValue == '') ) {
							compositeField.items.get(x).setRawValue("node_holder_"+linkTextValue);
							compositeField.items.get(x).setValue("node_holder_"+linkTextValue);
						}
    				}  // end FOR loop of customcompositefields
					indexNum++;
				}  // end IF statement - only if customcompositefield
    		}  // end OUTER FOR loop to loop through all fields in dialog
    	}  // end OUTER OUTER FOR loop
    },
    
    /**
     * Adds a new field to the widget.
     * @param value The value of the field
     */
    addItem: function(value) {
    	// CUSTOM IF statement added 10/30/2009 - only allow max 5 front images 
    	// to be added
    	if( this.items.getCount() > this.maxItems ) {
    		var msg = CQ.I18n.getMessage("You can only create a maximum of ") + this.maxItems + CQ.I18n.getMessage(" items.");
	        CQ.Ext.Msg.show({
	            "title": CQ.I18n.getMessage("Create New Item"),
	            "msg": msg,
	            "buttons": CQ.Ext.Msg.OK
	        });	
    	} else {
	        var item = this.insert(this.items.getCount() - 1, {});
	        this.findParentByType("form").getForm().add(item.field);
	        this.doLayout();
	
	        if (value) {
	            item.setValue(value);
	        }
	        if (item.field.isXType("trigger")) {
	            item.field.wrap.setWidth("95%");
	        }
	
	        // CUSTOM ADD
	        this.setNumberOfItems();
	        return item;
    	}
        // END CUSTOM ADD
    },
    
    /**
     * Returns the data value.
     * @return {String[]} value The field value
     */
    getValue: function() {
        var value = new Array();
        this.items.each(function(item, index/*, length*/) {
            if (item instanceof CQ.form.CustomMultiField.Item) {
                value[index] = item.getValue();
                index++;
            }
        }, this);
        return value;
    },

    /**
     * Sets a data value into the field and validates it.
     * @param {Mixed} value The value to set
     */
    setValue: function(value) {
    	 // ORIGINAL MultiField.js, commenting out to use the one below
//        this.fireEvent("change", this, value, this.getValue());
//    	var oldItems = this.items;
//        oldItems.each(function(item/*, index, length*/) {
//            if (item instanceof CQ.form.CustomMultiField.Item) {
//                this.remove(item, true);
//                this.findParentByType("form").getForm().remove(item);
//            }
//        }, this);
//        this.doLayout();
//        if ((value != null) && (value != "")) {
//            if (value instanceof Array || CQ.Ext.isArray(value)) {
//                for (var i = 0; i < value.length; i++) {
//                    this.addItem(value[i]);
//                }
//            } else {
//            	this.addItem(value);
//            }
//        }
    	 
    	// CUSTOM ADD
		this.fireEvent("change", this, value, this.getValue());   
        this.doLayout();
        if ((value != null) && (value != "")) {
        	if (value instanceof Array || CQ.Ext.isArray(value)) {
              for (var i = 0; i < value.length; i++) {
                  this.addItem(value[i]);
              }
          } else {
          	this.addItem(value);
          }
        }
        // END CUSTOM ADD
    },
     
    /**
     * Returns the number of separate items
     * @return {int} value The field value
     */
    getNumberOfItems: function() {
    	// CUSTOM ADD FUNCTION
    	return this.items.getCount() - 1;
    },
      
    /**
     * Sets the number of separate items
     * @param {int} num
     */
    setNumberOfItems: function(num) {
    	// CUSTOM ADD FUNCTION
    	if (!num) {
      		this.numberOfItems.setValue(this.getNumberOfItems()); 
      	} else {
      		this.numberOfItems.setValue(num);
      	}
    },
    
    // This function allows the saved nodes to be retrieved and
    // displayed in the dialog when re-opening the dialog.
    // This retrieves the correct input fields but the actual
    // information inside the input fields (e.g. the actual name
    // of the contact) is retrieved via the other processRecord() in the item.
    processRecord: function(record, path) {   
    	// CUSTOM ADD FUNCTION
     	var oldItems = this.items;
     	var values = new Array();
         oldItems.each(function(item/*, index, length*/) {
             if (item instanceof CQ.form.CustomMultiField.Item) {
                 this.remove(item, true);
                 this.findParentByType("form").getForm().remove(item);
             }
         }, this);                 
  
         var numItems = record.get(this.customMultiFieldName);  

         if (!numItems) {
         	numItems = 0;
         }
         
         if (numItems == 1) {
         		var item = this.addItem();
         		item.processRecord(record, path);
         } else {
         	for (var i = 0; i < numItems; i++ ) {
         		var newRecord = record.copy();
         		for (c in newRecord.data) {        			
         			if (CQ.Ext.isArray(newRecord.data[c])) {
         				newRecord.data[c] = newRecord.data[c][i];			
         			}
         		}
         		var item = this.addItem();
         		item.processRecord(newRecord, path);
         	}
         }
     }

});

CQ.Ext.reg("custommultifield", CQ.form.CustomMultiField);

/**
 * The <code>CQ.form.CustomMultiField.Item</code> class represents an item in a
 * <code>CQ.form.CustomMultiField</code>. This class is not intended for direct use.
 *
 * @private
 * @class CQ.form.CustomMultiField.Item
 * @extends CQ.Ext.Panel
 */
CQ.form.CustomMultiField.Item = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * Creates a new <code>CQ.form.CustomMultiField.Item</code>.
     * @constructor
     * @param {Object} config The config object
     */
    constructor: function(config) {
        var item = this;
        this.field = CQ.Util.build(config.fieldConfig, true);

        var items = new Array();
        items.push({
            "xtype":"panel",
            "border":false,
            "cellCls":"cq-multifield-itemct",
            "items":item.field
        });

        if(!config.fieldConfig.readOnly) {
            items.push({
                "xtype":"panel",
                "border":false,
                "items":{
                    "xtype":"button",
                    "text":"Up",
                    "handler":function() {
                        var parent = item.ownerCt;
                        var index = parent.items.indexOf(item);

                        if (index > 0) {
                            item.reorder(parent.items.itemAt(index - 1));
                        }
                    }
                }
            });
            items.push({
                "xtype":"panel",
                "border":false,
                "items":{
                    "xtype":"button",
                    "text":"Down",
                    "handler":function() {
                        var parent = item.ownerCt;
                        var index = parent.items.indexOf(item);
                        
                        if (index < parent.items.getCount() - 1) {
                            item.reorder(parent.items.itemAt(index + 1));
                        }
                    }
                }
            });
            items.push({
                "xtype":"panel",
                "border":false,
                "items":{
                    "xtype":"button",
                    "cls": "cq-multifield-btn",
                    "text":"Del",	// originally -
                    "handler":function() {
		            	// CUSTOM ADD
		                var parent = item.ownerCt;
		            	var numItems = parent.items.getCount() - 1;

		            	// need to actually remove all fields that comprise one
		            	// entity/composite field; for example, if there is
		            	// 1 browsefield, 2 textfields that = 1 image, need
		            	// to loop through and remove the browsefield and 2
		            	// textfields
		            	for( var i = 0; i < item.field.items.getCount(); i++ ) {
		            		item.ownerCt.remove(item.field.items.get(i));
		            	}
		            	// END CUSTOM ADD
                        item.ownerCt.remove(item);	// original and only line from MultiField.js
                        // CUSTOM ADD
                        parent.setNumberOfItems(parent.items.getCount()-1);
                        // END CUSTOM ADD    
                    }
                }
            });
        }

        config = CQ.Util.applyDefaults(config, {
            "layout":"table",
            "anchor":"100%",
            "border":true,
            "layoutConfig":{
                "columns":4
            },
            "defaults":{
                "bodyStyle":"padding:3px"
            },
            "items":items
        });
        CQ.form.CustomMultiField.Item.superclass.constructor.call(this, config);

        if (config.value) {
            this.field.setValue(config.value);
        }
    },
    
    /**
     * Reorders the item above the specified item.
     * @param item The item to reorder above
     */
    reorder: function(item) {
    	// PART OF ORIGINAL MultiField.js, commenting out 3 original lines to use the one below
//    	var value = item.field.getValue();
//        item.field.setValue(this.field.getValue());
//        this.field.setValue(value);
		// CUSTOM ADD
		// number of items (individual fields) that make up one entity/composite field;
        // for example, if there is
    	// 1 browsefield, 2 textfields that = 1 image, need
    	// to loop through and switch the browsefield and 2
    	// textfields
        for( var i = 0; i < item.field.items.getCount(); i++) {
        	var value = item.field.items.get(i).getValue();
        	item.field.items.get(i).setValue(this.field.items.get(i).getValue());
        	this.field.items.get(i).setValue(value);
        }
        // END CUSTOM ADD
    },

    /**
     * Returns the data value.
     * @return {String} value The field value
     */
    getValue: function() {
        return this.field.getValue();
    },

    /**
     * Sets a data value into the field and validates it.
     * @param {String} value The value to set
     */
    setValue: function(value) {
        this.field.setValue(value);
    },
    
    // This function NEEDS to be used in conjunction with the processRecord()
    // function above. It retrieves the actual information from the input fields
    // (the saved text, etc. in CRX) and displays the information in the dialog
    // when re-opening the dialog
    processRecord : function(record, path) {
    	 // CUSTOM ADD FUNCTION
     	this.field.processRecord(record, path);
   	}
});

CQ.Ext.reg("custommultifielditem", CQ.form.CustomMultiField.Item);
