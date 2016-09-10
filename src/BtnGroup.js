import { BUTTON_VARIANTS, SIZES } from './misc/constants';
import { inEnum } from './misc/validators';

import Btn from './Btn'
import BtnDropdown from './BtnDropdown'

export default {
    name: 'btn-group',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        name: String,
        options: {
            type: Array,
            twoWay: true,
            default: () => []
        },
        size: {
            validator: inEnum(...SIZES),
            default: 'md'
        },
        variant: {
            validator: inEnum(...BUTTON_VARIANTS),
            default: 'secondary'
        },
        vertical: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            return {
                'btn-group': !this.vertical,
                'btn-group-vertical': this.vertical
            }
        }
    },
    render(h) {
        // define subchildren
        const children = [];
        for (let button of this.options) children.push(
            // when item in options has dropdown
            button.dropdown
                // render dropdown element
                ? this._renderDropdown(h, button)
                // render button element
                : this._renderButton(h, button)
        )
        // return render
        return <div class={this.className} aria-label={this.name} role="group">
            { children }

            { this.$slots.default }
        </div>
    },
    methods: {
        buttonClass(option) {
            return {
                btn: true,
                active: option.active,
                disabled: option.disabled || this.disabled,
                [`btn-${this.size}`]: this.size !== 'md',
                [`btn-${option.variant || this.variant}`]: true
            }
        },
        _renderDropdown(h, { title, text, options }) {
            // return wrapper w/ child dropdown component
            return <BtnDropdown
                callback={this.trigger}
                title={title}
                text={text}
                options={options}
                size={this.size} />
        },
        _renderButton(h, button) {
            // get button's props
            let { type='button', text='', active, disabled, size, variant } = button
            size = size || this.size
            // return wrapper w/ child dropdown component
            return <Btn
                type={type}
                class={button.class}
                on-click={this.trigger}
                active={active}
                disabled={disabled}
                size={size}
                variant={variant}>
                { text }
            </Btn>
        },
        trigger(button) {
            // if active, than remove from model
            this.callback && this.callback(button)
            // emit toggle
            this.$emit('press', button)
        }
    }
}
