/* @jsx h */
import { BUTTON_VARIANTS, SIZES } from './misc/constants'
import { inEnum } from './misc/validators'

import Btn from './Btn'
import DropdownMenu from './DropdownMenu'

export default {
    name: 'btn-dropdown',
    props: {
        dropup: {
            type: Boolean,
            default: false
        },
        split: Function,
        title: String,
        options: {
            type: Array,
            twoWay: true,
            default: () => []
        },
        size: {
            validator: inEnum(...SIZES),
            default: 'md'
        },
        variant: {
            validator: inEnum(...BUTTON_VARIANTS),
            default: 'secondary'
        },
        text: String
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        className() {
            return {
                'btn-group': true,
                dropup: this.dropup
            }
        },
        visibility() {
            const dropdown = this.$refs.dropdown || {}
            return dropdown.visible
        }
    },
    methods: {
        _renderSplitted(h) {
            return [
                <Btn
                    on-click={this.btnClick}
                    prop-variant={this.variant}
                    prop-size={this.size}>
                    { this.text }
                </Btn>,
                this._renderButton(h, this.toggle, <span class="sr-only">Toggle Dropdown</span>)
            ]
        },
        _renderButton(h, event, children) {
            return <Btn
                on-click={event}
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={this.visibility}
                prop-active={this.visibility}
                prop-variant={this.variant}
                prop-size={this.size}>
                { children }
            </Btn>
        },
        _renderDropdownMenu(h) {
            return <DropdownMenu
                ref="dropdown"
                on-show={this._show}
                on-hide={this._hide}
                prop-options={this.options}
                prop-title={this.title}>
            </DropdownMenu>
        },
        btnClick(h) {
            // when splitted do the action in it
            if (this.split) this.split()
            // otherwise toggle dropdown
            else this.toggle()
        },
        toggle() {
            // toggle dropdown visibility
            this.$refs.dropdown.toggle()
        },
        _show() {
            this.visible = true
            this.$nextTick(() => this.$emit('show'))
        },
        _hide() {
            this.visible = false
            this.$nextTick(() => this.$emit('hide'))
        }
    },
    render(h) {
        // define empty children
        const children = [this._renderDropdownMenu(h)]

        if (this.split) children.unshift(...this._renderSplitted(h))

        else children.unshift(this._renderButton(h, this.btnClick, this.text))

        return <div role="group" class={this.className}>
            { children }
        </div>
    }
}
