CQ.form.CustomGenericList = CQ.Ext.extend(CQ.form.CompositeField, {
        
    
    constructor: function(config) {
        this.config = config || { };
        this.componentItems = new Array();
        var defaults = {                        
            "border": true,
            "layout": "form",
            "layoutConfig": {
        		"columns" : "1",
        			"border": false
        	}
            
        };        
        this.config = CQ.Util.applyDefaults(config, defaults);
        CQ.form.CustomGenericList.superclass.constructor.call(this, config);
    },

    initComponent: function() {                
        //for (var i=0; i<this.config.elementsConfig.length; i++){        	                	            	
        	//this.componentItems[i] = this.add(this.config.elementsConfig[i]);
        	
        //}
    	for (var i=0; i<this.config.length; i++){
    		
    		var name = this.config[i].name.replace("./", "");
    		this.componentItems[name] = this.add(this.config[i]);
    		
    		
    	}
    },
    
    processRecord: function(record, path){
    	for (var c in this.componentItems){
    		if (typeof(this.componentItems[c]) === 'function'){
    			continue;
    		}
    		if (this.componentItems[c].processInit) {
                this.componentItems[c].processInit(path, record);
            }
            if (!this.componentItems[c].initialConfig.ignoreData) {
            	this.componentItems[c].processRecord(record, path);
            }    		   		
    	}
    },

    setValue: function(value) {    	        
        	for (var c in value){            		
        		this.componentItems[c].setValue(value[c]);
        	}
        	/*for (var i=0; i< this.componentItems.length && i<value.length; i++){        		
        		//alert(this.componentItems[i].getName() + " : " + this.componentItems[i].getValue());
        		this.componentItems[i].setValue(value[i]);
        	}
        	*/
        	
        },

    getValue: function() {
        var returnArray = new Array();
        for (var i = 0; i<this.componentItems.length; i++){
        	returnArray[i] = this.componentItems[i].getValue();
        }
    	return returnArray;
    },
    
    setParName: function(value){
    	//this.items.items[2].setValue(value);    	
    }
    

});

// register xtype
CQ.Ext.reg('customgenericlist', CQ.form.CustomGenericList);

