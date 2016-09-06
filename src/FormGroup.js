import { colsClass } from './misc/utilities'

export default {
    name: 'form-group',
    props: {
        id: String,
        inline: {
            type: Boolean,
            default: false
        },
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
        row: null,
        size: {
            type: String,
            default: 'md'
        },
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
                [`form-control-${this.status}`]: this.status,
                [`form-control-${this.size}`]: this.size !== 'md'
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
                case 'slot': return this.$slots.default
                case 'static': return this._renderStatic()
                case 'textarea': return this._renderTextarea()
                case 'select': return this._renderSelect()
                case 'radio':
                case 'checkbox': return this._renderRadioCheck()
                default: return this._renderInput()
            }
        },
        _renderStatic() {
            return <p class="form-control-static">{ this.placeholder }</p>
        },
        _renderInput() {
            const h = this.$createElement

            return this.row ? this._renderRowInput() : this._renderNormalInput()
        },
        _renderRowInput() {
            const h = this.$createElement

            return <div class={colsClass(this.row)}>
                { this._renderNormalInput() }
            </div>
        },
        _renderNormalInput() {
            const h = this.$createElement

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
        _renderTitle() {
            const h = this.$createElement

            switch (this.type) {
                case 'radio':
                case 'checkbox': return <legend>{ this.title }</legend>
                default:
                    let className = []

                    if (this.row) className = ['col-form-label'].concat(colsClass(this.row, true))

                    return (
                        <label class={className} for={this.id}>
                            { this.title }
                        </label>
                    )
            }
        },
        _renderNote() {
            const h = this.$createElement

            return <small class='text-muted'>
                { this.note }
            </small>
        },
        _renderSelect() {
            const h = this.$createElement

            const options = this.options || [];

            return <select
                on-change={this._updateValue}
                class='form-control'
                multiple={this.multiple}>

                { options.map(this._renderOption) }
            </select>
        },
        _renderOption({text, value}) {
            const h = this.$createElement

            return <option value={value}>{ text }</option>
        },
        _renderTextarea() {
            const h = this.$createElement

            return <textarea
                v-model={this.hiddenValue}
                on-keyup={this._updateValue}
                class="form-control">

            </textarea>
        },
        _renderRadioCheck() {
            const h = this.$createElement

            return this.options.map((option) => (
                <div class={this._radioCheckClass(option)}>
                    <label class={this.formCheck ? 'form-check-label' : ''}>
                        <input
                            class={this.formCheck ? 'form-check-input' : ''}
                            type={this.type}
                            name={this.id}
                            id={option.id}
                            value={option.value}
                            checkbox={option.value === this.value} />

                        { option.text }
                    </label>
                </div>
            ))
        },
        _radioCheckClass(option) {
            return {
                [this.type]: !this.inline && !this.formCheck,
                [`${this.type}-inline`]: this.inline && !this.formCheck,
                'form-check': this.formCheck && !this.inline,
                'form-check-inline': this.formCheck && this.inline,
                disabled: option.disabled
            }
        },
        _updateValue({ target }) {
            const value = target.value

            this.$emit('input', value)
        }
    },
    render(h) {
        // return generated element
        return <fieldset class="form-group">
            { this.title && this._renderTitle() }

            { this._renderElement() }

            { this.note && this._renderNote() }
        </fieldset>
    }
}
