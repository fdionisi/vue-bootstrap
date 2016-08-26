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
        _renderSplitted() {
            const h = this.$createElement
            return [
                <Btn
                    on-click={this.btnClick}
                    variant={this.variant}
                    size={this.size}>
                    { this.$slots.default }
                    { this.text }
                </Btn>,
                this._renderButton(this.toggle, <span class="sr-only">Toggle Dropdown</span>)
            ]
        },
        _renderButton(event, children) {
            const h = this.$createElement

            return <Btn
                on-click={event}
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={this.visibility}
                active={this.visibility}
                variant={this.variant}
                size={this.size}>
                { children }
            </Btn>
        },
        _renderDropdownMenu() {
            const h = this.$createElement

            return <DropdownMenu
                ref="dropdown"
                on-show={this._show}
                on-hide={this._hide}
                options={this.options}
                title={this.title}>
            </DropdownMenu>
        },
        btnClick() {
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
        const children = [this._renderDropdownMenu()]

        if (this.split) children.unshift(...this._renderSplitted())

        else children.unshift(this._renderButton(this.btnClick, [this.$slots.default, this.text]))

        return <div role="group" class={this.className}>
            { children }
        </div>
    }
}
