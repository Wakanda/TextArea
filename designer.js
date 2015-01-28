(function(TextArea) {
    "use strict";

    TextArea.setWidth(200);
    TextArea.setHeight(200);

    TextArea.addStates(':hover', ':active', ':focus', ':disabled');

    TextArea.addEvents({
        name: 'action',
        description: 'On Action',
        category: 'General Events'
    },{
        name: 'blur',
        description: 'On Blur',
        category: 'Focus Events'
    },{
        name: 'focus',
        description: 'On Focus',
        category: 'Focus Events'
    },{
        name: 'click',
        description: 'On Click',
        category: 'Mouse Events'
    },{
        name: 'dblclick',
        description: 'On Double Click',
        category: 'Mouse Events' 
    },{
        name: 'mousedown',
        description: 'On Mouse Down',
        category: 'Mouse Events'
    },{
        name: 'mouseout',
        description: 'On Mouse Out',
        category: 'Mouse Events'
    },{
        name: 'mouseover',
        description: 'On Mouse Over',
        category: 'Mouse Events'
    },{
        name: 'mouseup',
        description: 'On Mouse Up',
        category: 'Mouse Events'
    },{
        name: 'keydown',
        description: 'On Key Down',
        category: 'Keyboard Events'
    },{
        name: 'keyup',
        description: 'On Key Up',
        category: 'Keyboard Events'
    },{
        name: 'select',
        description: 'On Select',
        category: 'Keyboard Events'
    },{
        name: 'touchstart',
        description: 'On Touch Start',
        category: 'Touch Events'
    },{
        name: 'touchend',
        description: 'On Touch End',
        category: 'Touch Events'
    },{
        name: 'touchcancel',
        description: 'On Touch Cancel',
        category: 'Touch Events'
    });

    TextArea.addLabel({ description: 'Label for widget' });

    TextArea.customizeProperty('value',{ multiline: true });
    TextArea.customizeProperty('readOnly',{ title: 'Read only' });
    TextArea.customizeProperty('maxLength',{ title: 'Max length' });

    function showValue(){
        var dsValue = this.value.boundDatasource();
        if (dsValue && dsValue.datasourceName) {
            this.value('['+ dsValue +']');
        } else if (!dsValue) {
            this.value('');
        }
    }

    TextArea.doAfter('init', function() {
        showValue.call(this);
        this.subscribe('datasourceBindingChange', 'value', showValue, this);
    });

    // Set panel menu
    TextArea.setPanelStyle({
        'fClass': true,
        'text': true,
        'textShadow': true,
        'dropShadow': true,
        'innerShadow': true,
        'background': true,
        'border': true,
        'label': true,
        'sizePosition': true
    });
});