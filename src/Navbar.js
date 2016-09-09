import { emitEvent } from './misc/utilities'

import Navs from './Navs'

export default {
    name: 'navbar',
    props: {
        bg: {
            type: String,
            default: 'faded'
        },
        luminosity: {
            type: String,
            default: 'light'
        },
        fullWidth: Boolean,
        fixedTop: Boolean,
        fixedBottom: Boolean,
        brand: {
            type: Object,
            default: () => ({})
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    render(h) {
        const className = {
            navbar: true,
            'navbar-full': this.fullWidth,
            'navbar-fixed-top': this.fixedTop,
            'navbar-fixed-bottom': !this.fixedTop && this.fixedBottom,
            [`navbar-${this.luminosity}`]: true,
            [`bg-${this.bg}`]: true
        }

        return <nav class={className}>
            { this.brand.text && <a class="navbar-brand" on-click={emitEvent('brand-click', this)} href={this.brand.href || '#'}>{ this.brand.text }</a> }

            { this.list.length && <Navs class="navbar-nav" list={this.list}/> }

            { this.$slots.default }
        </nav>
    }
}
