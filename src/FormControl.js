export default {
    name: 'form-control',
    props: {
        id: String,
        note: String,
        placeholder: String,
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
    data() {
        return {
            hiddenValue: null
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
        _renderElement() {
            // define witch input
            switch (this.type) {
                case 'textarea': return this._renderTextarea()
                case 'select': return this._renderSelect()
                case 'radio':
                case 'checkbox': return this._renderRadioCheck()
                default: return this._renderInput()
            }
        },
        _renderInput() {
            const h = this.$createElement
            // return input
            return <input
                class='form-control'
                on-blur={this._blur}
                on-focus={this._focus}
                on-keydown={this._keydown}
                on-keyup={this._keyup}
                type={this.type}
                id={this.id}
                placeholder={this.placeholder} />
        },
        _renderLabel() {
            const h = this.$createElement
            // return label
            return <label for={this.id}>
                { this.title }
            </label>
        },
        _renderNote() {
            const h = this.$createElement
            // return label
            return <small class='text-muted'>
                { this.note }
            </small>
        },
        _renderSelect() {
            const h = this.$createElement
            // define options
            const options = this.options || [];
            // return label
            return <select on-change={this._updateValue} class='form-control' multiple={this.multiple}>
                { options.map(({text, value}) => <option value={value}>{ text }</option>) }
            </select>
        },
        _renderTextarea() {
            const h = this.$createElement
            // return label
            return <textarea on-keyup={this._updateValue} class="form-control" v-model={this.hiddenValue}>
            </textarea>
        },
        _renderRadioCheck() {
            const h = this.$createElement
            return h()
        },
        _updateValue({ target }) {
            const value = target.value
            this.$emit('input', value)
        }
    },
    render(h) {
        // return generated element
        return <fieldset class="form-group">
            { this.title && this._renderLabel() }
            { this._renderElement() }
            { this.note && this._renderNote() }
        </fieldset>
    }
}
