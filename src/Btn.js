import { BUTTON_VARIANTS, SIZES } from './misc/constants'
import { inEnum } from './misc/validators'

const BUTTON_TAG = ['button', 'a', 'input']
const BUTTON_TYPES = ['button', 'reset', 'submit']

export default {
    name: 'btn',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        outline: Boolean,
        href: String,
        size: {
            validator: inEnum(...SIZES),
            default: 'md'
        },
        variant: {
            validator: inEnum(...BUTTON_VARIANTS),
            default: 'secondary'
        },
        tag: {
            validator: inEnum(...BUTTON_TAG),
            default: 'button'
        },
        target: {
            type: String,
            default: ''
        },
        text: String,
        type: {
            validator: inEnum(...BUTTON_TYPES),
            default: 'button'
        },
        value: null
    },
    computed: {
        className() {
            return {
                btn: true,
                active: this.disabled ? false : this.active,
                disabled: this.tag === 'a' && this.disabled,
                [`btn-${this.variant !== 'link' && this.outline && 'outline-' || ''}${this.variant}`]: true,
                [`btn-${this.size}`]: this.size !== 'md',
                'btn-block': this.block
            }
        }
    },
    render(h) {
        const Component = this.tag
        const attrs = this.tag === 'button'
            ? this._buttonAttrs()
            : this.tag === 'a'
                ? this._linkAttrs()
                : this._inputAttrs()

        return (
            <Component on-click={this.clicked} class={this.className} { ...{ attrs } }>
                { this.$slots.default }
                { this.text }
            </Component>
        )
    },
    methods: {
        _buttonAttrs() {
            return { 'aria-pressed': this.active, type: this.type, disabled: this.disabled }
        },
        _linkAttrs() {
            return { 'aria-pressed': this.active, href: this.href || '#', target: this.target || undefined, role: 'button' }
        },
        _inputAttrs() {
            return { 'aria-pressed': this.active, type: this.type, disabled: this.disabled, value: this.text }
        },
        clicked(ev) {
            this.$emit('click', ev)
        }
    }
}
