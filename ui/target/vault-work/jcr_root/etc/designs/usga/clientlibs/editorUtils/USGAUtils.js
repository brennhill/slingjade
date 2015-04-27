if(!window.USGA){
    window.USGA = {}
}

(function(USGA, window){
    USGA.editFuncs = USGA.editFuncs || {};
    window.editFuncs =  USGA.editFuncs;
    editFuncs.addMetaData = function(cqEl, name, data) {
        $(cqEl.getEl().child("input[type='checkbox']", true)).attr('data-'+name, data);
    };

    editFuncs.eventIconEnableAmountValidate = function(cqEl) {
        var valid = true;
        var enabledAmount = 0;

        cqEl.ownerCt.findByType('selection').forEach(function(entry){
            enabledAmount += entry.getValue()[0] ? 1 : 0;
        });
        if(enabledAmount > 4) {
            cqEl.reset();
            CQ.Ext.Msg.show({title:'validation failed',msg: 'Cannot be more than 4 selected items',buttons: CQ.Ext.Msg.OK,animEl: 'elId',icon: CQ.Ext.MessageBox.ERROR});
            valid = false;
        }

        return valid;
    };

    editFuncs.eventElementToggle = function(context, names, display) {
        var elements = [];

        context.forEach(function(entry) {
            $.each(names, function(index, value){
                if(entry.name == value){
                    elements.push(entry);
                }
            });

        });

        $.each(elements, function(index, el){
            if(display) {
                el.show();
            } else {
                el.hide();
            }
        });
    };

    editFuncs.eventSetSmallIconOptions = function(cqEl) {
        var select;
        var options = [];
        cqEl.ownerCt.ownerCt.findByType('selection').forEach(function(entry) {
            if(entry.name == './smallBreakpointIcon') {
                select = entry;
            }
        });

        cqEl.ownerCt.findByType('selection').forEach(function(entry){
            if(entry.getValue()[0]) {
                var checkbox = $(entry.getEl().child("input[type='checkbox']", true));

                options.push({value: checkbox.attr('data-option-value'), text: checkbox.attr('data-option-text')});
            }
        });

        select.reset();
        select.setOptions(options);
    };
})(USGA, window);