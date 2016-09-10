import { emitEvent, colsClass } from './misc/utilities'

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
                'form-control': this.type !== 'static',
                'form-control-static': this.type === 'static',
                [`form-control-${this.status}`]: this.status,
                [`form-control-${this.size}`]: this.size !== 'md'
            }
        }
    },
    methods: {
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
            return <p on-click={this._click} class={this.className}>{ this.placeholder }</p>
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

            const emitKeyup = emitEvent('keyup', this)
            const onKeyup = (ev) => {
                this._updateValue(ev)
                emitKeyup(ev)
            }

            return <input
                class={this.className}
                on-click={emitEvent('click', this)}
                on-blur={emitEvent('blur', this)}
                on-focus={emitEvent('focus', this)}
                on-keydown={emitEvent('keydown', this)}
                on-keyup={onKeyup}
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

            const emitSelect = emitEvent('select', this)
            const onSelect = (ev) => {
                this._updateValue(ev)
                emitSelect(ev)
            }

            return <select
                on-click={emitEvent('click', this)}
                on-select={onSelect}
                class={this.className}
                multiple={this.multiple}>

                { options.map(this._renderOption) }
            </select>
        },
        _renderOption({text, value}) {
            const h = this.$createElement

            return <option on-click={emitEvent('option-click', this)} value={value}>{ text }</option>
        },
        _renderTextarea() {
            const h = this.$createElement

            const emitKeyup = emitEvent('keyup', this)
            const onKeyup = (ev) => {
                this._updateValue(ev)
                emitKeyup(ev)
            }

            return <textarea
                on-click={emitEvent('click', this)}
                on-blur={emitEvent('blur', this)}
                on-focus={emitEvent('focus', this)}
                on-keydown={emitEvent('keydown', this)}
                on-keyup={onKeyup}
                class={this.className}>

            </textarea>
        },
        _renderRadioCheck() {
            const h = this.$createElement

            const emitClick = emitEvent('click', this)
            const onClick = (ev) => {
                this._updateValue(ev)
                emitClick(ev)
            }

            return this.options.map((option) => (
                <div class={this._radioCheckClass(option)}>
                    <label class={this.formCheck ? 'form-check-label' : ''}>
                        <input
                            on-click={onClick}
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
