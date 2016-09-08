import { BUTTON_VARIANTS, SIZES } from './misc/constants'
import { inEnum } from './misc/validators'

import BtnGroup from './BtnGroup'

export default {
    name: 'btn-toolbar',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        name: String,
        groups: {
            type: Array,
            required: true,
            twoWay: true,
            default: []
        },
        size: {
            validator: inEnum(...SIZES),
            default: 'md'
        },
        variant: {
            validator: inEnum(...BUTTON_VARIANTS),
            default: 'secondary'
        }
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
        trigger(button) {
            // if active, than remove from model
            this.callback && this.callback(button);
            // emit toggle
            this.$emit('press', button);
        }
    },
    render(h) {
        const children = this.groups.map(
            ({name, callback, disabled, options}) => <BtnGroup
                name={name}
                callback={callback}
                disabled={disabled}
                options={options}
                variant={this.variant}
                size={this.size} />
        )

        return <div class="btn-toolbar" role="toolbar" aria-label={this.name}>
            { children }
        </div>
    }
}
