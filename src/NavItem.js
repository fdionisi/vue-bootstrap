import { emitEvent } from './misc/utilities'

import DropdownMenu from './DropdownMenu'

export default {
    name: 'nav-item',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'a'
        },
        options: {
            type: Array,
            default: () => []
        },
        dropdown: {
            type: Boolean,
            default: false
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        toggle(ev) {
            ev.preventDefault()
            // toggle dropdown visibility
            this.$refs.dropdown.toggle()
        },
        _show(ev) {
            this.visible = true
            this.$nextTick(() => this.$emit('show', ev, this))
        },
        _hide(ev) {
            this.visible = false
            this.$nextTick(() => this.$emit('hide', ev, this))
        }
    },
    render(h) {
        const { tag:NavItem } = this
        const Wrapper = 'li'

        const wrapperClassName = {
            'nav-item': true,
            dropdown: this.dropdown
        }

        const className= {
            'nav-link': true,
            disabled: this.disabled,
            active: this.isActive
        }

        const event = this.dropdown
            ? this.toggle
            : emitEvent('click', this)

        return <Wrapper class={wrapperClassName}>
            <NavItem
                href={this.href || '#'}
                on-click={event}
                class={className}>
                { this.$slots.default }
            </NavItem>
            {
                this.dropdown && <DropdownMenu
                    ref="dropdown"
                    options={this.options}
                    on-click={emitEvent('click', this)}
                    class="dropdown-toggle"
                    active={this.visibility}
                    variant={this.variant}
                    size={this.size}/>
            }
        </Wrapper>
    }
}
