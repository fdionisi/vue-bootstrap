import FormControl from './FormControl'

export default {
    name: 'input-group',
    props: {
        ...FormControl.props,
        id: String,
        note: String,
        beforeAddons: {
            type: Array,
            default: () => []
        },
        afterAddons: {
            type: Array,
            default: () => []
        },
        title: String
    },
    computed: {
        className() {
            return {
                'form-control': true,
                [`form-control-${this.status}`]: this.status
            }
        }
    },
    methods: {
        _blur(ev) { this.$emit('blur', ev, this) },
        _focus(ev) { this.$emit('focus', ev, this) },
        _keydown(ev) { this.$emit('keydown', ev, this) },
        _keyup(ev) { this._updateValue(ev); this.$emit('keyup', ev, this) },
        _renderAddon(addon) {
            const h = this.$createElement
            return <span class="input-group-addon">
                { addon }
            </span>
        },
        _renderInput() {
            const h = this.$createElement

            const props = {}
            for (let propName in FormControl.props)
                if (FormControl.props.hasOwnProperty(propName))
                    props[propName] = this[propName]

            const on = {
                input: this._updateValue
            }

            // return input
            return <FormControl { ...{ on, props } } />
        },
        _updateValue(value) {
            if (this.value === value) return
            this.$emit('input', value)
        }
    },
    render(h) {
        // return generated element
        return <div class="input-group">
            { this.$slots.beforeAddons }
            { this.beforeAddons.map(this._renderAddon) }
            { this._renderInput() }
            { this.afterAddons.map(this._renderAddon) }
            { this.$slots.afterAddons }
        </div>
    }
}
