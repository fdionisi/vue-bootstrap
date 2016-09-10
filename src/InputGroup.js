export default {
    name: 'input-group',
    props: {
        id: String,
        note: String,
        placeholder: String,
        beforeAddons: {
            type: Array,
            default: () => []
        },
        afterAddons: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => []
        },
        status: {
            type: String
            // validator: inEnum('success', 'warning', 'danger')
        },
        title: String,
        value: {
            type: null,
            twoWay: true
        },
        type: {
            type: String,
            default: 'text'
        }
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
            // return input
            return <input
                class={this.className}
                on-blur={this._blur}
                on-focus={this._focus}
                on-keydown={this._keydown}
                on-keyup={this._keyup}
                type={this.type}
                id={this.id}
                placeholder={this.placeholder} />
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
