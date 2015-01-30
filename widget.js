WAF.define('TextArea', ['waf-core/widget'], function(widget) {
    'use strict';

    function updateAttribute(property, valueOverwrite) {
        var value = this[property]();

        if (value) {
            this.node.setAttribute(property.toLowerCase(), valueOverwrite || value);
        }
        else {
            this.node.removeAttribute(property.toLowerCase());
        }
    }

    function onChange(event) {
        var value = event.data.value;

        switch (event.target) {
            case 'value':
                this.node.value = value;
                this.node.textContent = value;
                return;

            case 'maxLength':
                if (value < 0) {
                    this.maxLength(0);
                    value = 0;
                }
                break;

            case 'readOnly':
                value = (value && 'readonly');
                break;
        }

        updateAttribute.call(this, event.target, value);
    }

    var TextArea = widget.create('TextArea', {
        tagName: 'textarea',
        value: widget.property({
            type: 'string',
            bindable: true,
            description: 'Static text or datasource value',
            defaultValueCallback: function() {
                return this.node.textContent || this.node.value;
            }
        }),
        maxLength: widget.property({
            type: 'integer',
            description: 'Maximum length (in characters) to input',
            bindable: false,
            defaultValueCallback: function() {
                return parseInt(this.node.getAttribute('maxlength'), 10) || '';
            }
        }),
        readOnly: widget.property({
            type: 'boolean',
            description: 'Read only or read/write',
            defaultValue: false,
            bindable: false,
            defaultValueCallback: function() {
                return this.node.hasAttribute('readonly');
            }
        }),
        placeholder: widget.property({
            type: 'string',
            description: 'Placeholder text',
            bindable: false,
            defaultValueCallback: function() {
                return this.node.getAttribute('placeholder') || '';
            }
        }),
        init: function init () {
            var subscriber;

            this.addClass('form-control');

            updateAttribute.call(this, 'readOnly', 'readonly');
            updateAttribute.call(this, 'maxLength');
            updateAttribute.call(this, 'placeholder');

            this.node.textContent = this.value();
            this.node.value = this.value();

            subscriber = this.subscribe('change', onChange, this);
            subscriber.options.once = true;

            this.node.addEventListener('change', function() {
                this.value(this.node.value);
            }.bind(this), false);
        },
        hasFocus: function hasFocus () {
            return (document.activeElement === this.node);
        },
        disable: function() {
           this.$super('disable')();
           this.node.disabled = true;
        },
        enable: function() {
           this.$super('enable')();
           this.node.disabled = false;
        }
    });

    TextArea.addTabIndex();

    return TextArea;
});