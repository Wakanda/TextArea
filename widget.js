WAF.define('TextArea', ['waf-core/widget'], function(widget) {
    'use strict';

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

            this.updateAttribute.call(this, 'readOnly', this.readOnly());
            this.updateAttribute.call(this, 'maxLength', this.maxLength());
            this.updateAttribute.call(this, 'placeholder', this.placeholder());

            this.node.textContent = this.value();
            this.node.value = this.value();

            subscriber = this.subscribe('change', this.onChange, this);
            subscriber.options.once = true;

            this.node.addEventListener('change', function() {
                this.value(this.node.value);
            }.bind(this), false);
        },
        hasFocus: function hasFocus () {
            return (document.activeElement === this.node);
        },
        updateAttribute: function updateAttribute(property, valueOverwrite) {
            var value = this[property]();
            if (valueOverwrite === 0 || valueOverwrite) {
                this.node.setAttribute(property.toLowerCase(), String(valueOverwrite));
            }
            else {
                this.node.removeAttribute(property.toLowerCase());
            }
        },
        onChange: function onChange(event) {
            var value = event.data.value;

            switch (event.target) {
                case 'value':
                    this.node.value = value;
                    this.node.textContent = value;
                    return;

                case 'maxLength':
                    if (parseInt(value) < 0) {
                        value = 0;
                    }
                    break;

                case 'readOnly':
                    value = (value && 'readonly');
                    break;
            }

            this.updateAttribute.call(this, event.target, value);
        },
        disable: function() {
           this.$super('disable')();
           $(this.node).prop('disabled', true);
        },
        enable: function() {
           this.$super('enable')();
           $(this.node).prop('disabled', false);
        }
    });

    TextArea.addTabIndex();

    return TextArea;
});