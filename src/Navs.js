import NavItem from './NavItem'

export default {
    name: 'navs',
    props: {
        main: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Boolean,
            default: false
        },
        pills: {
            type: Boolean,
            default: false
        },
        stacked: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        },
        tag: {
            type: String,
            default: 'ul'
        }
    },
    render(h) {
        const Component = this.main
            ? 'nav'
            : this.tag

        const className = {
            nav: true,
            'nav-inline': this.inline && !(this.tabs && this.pills),
            'nav-tabs': this.tabs && !(this.inline && this.pills),
            'nav-pills': this.pills,
            'nav-stacked': this.pills && this.stacked
        }

        return <Component class={className}>
            {
                this.list.map((item) =>
                    <NavItem
                        tag={item.tag}
                        disabled={item.disabled}
                        dropdown={item.dropdown}
                        options={item.options || []}>

                        { item.text }
                    </NavItem>
                )
            }

            { this.$slots.default }
        </Component>
    }
}
