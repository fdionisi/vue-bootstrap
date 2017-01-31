import { emitEvent, colsClass } from './misc/utilities'

import FormControl from './FormControl'

export default {
    name: 'form-group',
    props: {
        ...FormControl.props,
        inline: {
            type: Boolean,
            default: false
        },
        statusMessage: String,
        note: String,
        title: String,
        row: null
    },
    data() {
        return {
            hiddenValue: null
        }
    },
    computed: {
        formCheck() {
            switch (this.type) {
                case 'radio':
                case 'checkbox': return true
                default: return false
            }
        },
        className() {
            return {
                'form-group': this.type !== 'static',
                [`has-${this.status}`]: this.status
            }
        }
    },
    methods: {
        _renderElement() {
            // define witch input
            switch (this.type) {
                case 'slot': return this.$slots.default
                case 'radio':
                case 'checkbox': return this._renderRadioCheck()
                default: return this._renderFormControl()
            }
        },
        _renderRowElement() {
            const h = this.$createElement

            return <div class={colsClass(this.row)}>
                { this._renderElement() }
            </div>
        },
        _renderFormControl() {
            const h = this.$createElement

            const props = {}
            for (let propName in FormControl.props)
                if (FormControl.props.hasOwnProperty(propName))
                    props[propName] = this[propName]

            const on = {
                input: this._updateValue,
                click: emitEvent('click', this),
                blur: emitEvent('blur', this),
                focus: emitEvent('focus', this),
                keydown: emitEvent('keydown', this),
                keypress: emitEvent('keypress', this),
                keyup: emitEvent('keyup', this),
                change: emitEvent('change', this),
                select: emitEvent('select', this)
            }

            return <FormControl { ...{ on, props } } />
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
        _renderRadioCheck() {
            const h = this.$createElement

            const emitClick = emitEvent('click', this)
            const onClick = (ev) => {
                let { value } = ev.target

                if (this.formCheck) {
                    const copy = this.value.slice()
                    const pos = copy.indexOf(value)

                    if (pos > -1) {
                        copy.splice(pos, 1)

                    } else {
                        copy.push(value)
                    }

                    value = copy
                }

                this._updateValue(value)

                emitClick(value)
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
                            checkbox={this.formCheck ? this.value.includes(option.value) : (option.value === this.value)} />

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
        _updateValue(value) {
            if (this.value === value) {
                return
            }

            this.$emit('input', value)
        }
    },
    render(h) {
        // return generated element
        return <fieldset class={this.className}>
            { this.title && this._renderTitle() }

            { this.row ? this._renderRowElement() : this._renderElement() }

            { this.status && this.statusMessage && <div class="form-control-feedback">{ this.statusMessage }</div> }

            { this.note && this._renderNote() }
        </fieldset>
    }
}
