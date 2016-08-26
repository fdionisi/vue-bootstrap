export default {
    name: 'form-control',
    props: {
        id: String,
        note: String,
        placeholder: String,
        model: null,
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
        _keyup(ev) { this.$emit('keyup', ev, this) },
        _renderElement(h) {
            // define witch input
            switch (this.type) {
                case 'textarea': return this._renderTextarea(h)
                case 'select': return this._renderSelect(h)
                case 'radio':
                case 'checkbox': return this._renderRadioCheck(h)
                default: return this._renderInput(h)
            }
        },
        _renderInput(h) {
            // return input
            return <input
                v-model={this.model}
                class='form-control'
                on-blur={this._blur}
                on-focus={this._focus}
                on-keydown={this._keydown}
                on-keyup={this._keyup}
                type={this.type}
                id={this.id}
                placeholder={this.placeholder} />
        },
        _renderLabel(h) {
            // return label
            return <label for={this.id}>
                { this.title }
            </label>
        },
        _renderNote(h) {
            // return label
            return <small class='text-muted'>
                { this.note }
            </small>
        },
        _renderSelect(h) {
            this.model = this.model || []
            // define options
            const options = this.options || [];
            // return label
            return <select v-model={this.model} class='form-control' multiple={this.multiple}>
                { options.map(({text, value}) => <option value={value}>{ text }</option>) }
            </select>
        },
        _renderTextarea(h) {
            // return label
            return <textarea class="form-control" v-model={this.model}>
            </textarea>
        },
        _renderRadioCheck(h) {
            return h()
        }
    },
    render(h) {
        // define createElement short
        const children = []

        // add label if needed
        if (this.title) children.push(
            this._renderLabel(h)
        )

        // main element
        children.push(
            this._renderElement(h)
        )

        // add note if needed
        if (this.note) children.push(
            this._renderNote(h)
        )

        // return generated element
        return <fiedlset class="form-group">
            { children }
        </fiedlset>
    }
}
