import { emitEvent, colsClass } from './misc/utilities'
import { inEnum } from './misc/validators'

export default {
    name: 'form-control',
    props: {
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
            type: String,
            validator: inEnum(undefined, 'success', 'warning', 'danger')
        },
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
    methods: {
        _updateAndEmit(eventName) {
            return (ev) => {
                emitEvent(eventName, this)()
                this._updateValue(ev)
            }
        },
        _renderStatic() {
            const h = this.$createElement

            return <p on-click={this._click} class={this.className}>{ this.placeholder }</p>
        },
        _renderInput() {
            const h = this.$createElement

            return <input
                class={this.className}
                on-click={this._updateAndEmit('click')}
                on-blur={this._updateAndEmit('blur')}
                on-focus={this._updateAndEmit('focus')}
                on-keydown={this._updateAndEmit('keydown')}
                on-keypress={this._updateAndEmit('keypress')}
                on-keyup={this._updateAndEmit('keyup')}
                type={this.type}
                id={this.id}
                name={this.id}
                value={this.value}
                placeholder={this.placeholder} />
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
                id={this.id}
                name={this.id}
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
                id={this.id}
                name={this.id}
                class={this.className}>

            </textarea>
        },
        _updateValue({ target }) {
            if (this.value === target.value) return

            const value = target.value
            this.$emit('input', value)
        }
    },
    render(h) {
        // define witch input
        switch (this.type) {
            case 'slot': return this.$slots.default
            case 'static': return this._renderStatic()
            case 'textarea': return this._renderTextarea()
            case 'select': return this._renderSelect()
            default: return this._renderInput()
        }
    }
}
