/**
 * The <code>CQ.form.CustomCompositeField</code> class allows multiple input
 * fields to represent a single entry for editing multi value properties
 * (in CustomMultiField).
 *
 * @class CQ.form.CustomCompositeField
 * @extends CQ.form.CompositeField
 */
CQ.form.CustomCompositeField = CQ.Ext.extend(CQ.form.CompositeField, {

	/**
	 * 
	 */
    constructor: function(config) {
        this.config = config || { };
        this.componentItems = new Array();
        
        var defaults = {
            "border": true,
            "layout": "form",
            "layoutConfig": {
        		"columns" : "1"
        	}           
        };        
        this.config = CQ.Util.applyDefaults(config, defaults);
        CQ.form.CustomGenericList.superclass.constructor.call(this, config);
    },

    /**
     * 
     */
    initComponent: function() {                
    	CQ.form.CustomCompositeField.superclass.initComponent.call(this);
    	for (var i = 0; i < this.config.length; i++) {	
    		var name = this.config[i].name.replace("./", "");
    		this.componentItems[name] = this.add(this.config[i]);	
    		// CUSTOM ADD 07/19/2009, widens the textfield input field(s)
    		// this hits before CustomMultiField#addItem() when Add + button is clicked
    		this.componentItems[name].width="85%";
    		if( CQ.Ext.isSafari ) {
				this.componentItems[name].width="85%";
			}

    		if( this.componentItems[name].isXType("trigger") && !this.componentItems[name].style ) {
//    			if(CQ.Ext.isIE || CQ.Ext.isIE7) {
//    	    		alert("In IE");
//    	    	}
 				// in IE, can't go above 85% because then it messes up the alignment of fieldLabel
 				// and Up button (something to do with layout of TriggerField
    			this.componentItems[name].style = "width:83%";
    			if( CQ.Ext.isSafari ) {
    				this.componentItems[name].style = "width:85%";
    			}
            }
			if( this.componentItems[name].isXType("selection") ) {
				this.componentItems[name].width = "70%";
				this.componentItems[name].style = "width:70%";
			}
    	}
    },
    
    /**
     * 
     */
    processRecord: function(record, path) {
    	for (var c in this.componentItems) {
    		if (typeof(this.componentItems[c]) === 'function') {
    			continue;
    		}
    		if (this.componentItems[c].processPath) {
    		    this.componentItems[c].processPath(path);
    		}
    		if (this.componentItems[c].processInit) {
                this.componentItems[c].processInit(path, record);
            }
            if (!this.componentItems[c].initialConfig.ignoreData) {
            	this.componentItems[c].processRecord(record, path);
            }    		   		
    	}
    },

    /**
     * 
     */
    setValue: function(value) {    	        
//    	for (var c in value) {   
//    		this.componentItems[c].setValue(value[c]);
//    	}
		// changed in CustomMultiField, so don't think it hits the code here
		for( var i = 0; i < this.config.length; i++ ) {
			this.componentItems[i].setValue(value.items.get(i).getValue());
		}
    },

    /**
     * 
     */
    getValue: function() {
        var returnArray = new Array();
        for (var i = 0; i < this.componentItems.length; i++) {
        	returnArray[i] = this.componentItems[i].getValue();
        }
    	return returnArray;
    }

});

// register xtype
CQ.Ext.reg("customcompositefield", CQ.form.CustomCompositeField);