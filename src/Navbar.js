import { emitEvent } from './misc/utilities'

import Navs from './Navs'

export default {
    name: 'navbar',
    props: {
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
            navbar: true
        }

        return <nav class={className}>
            { this.brand.text && <a class="navbar-brand" on-click={emitEvent('brand-click', this)} href={this.brand.href || '#'}>{ this.brand.text }</a> }

            { this.list.length && <Navs class="navbar-nav" list={this.list}/> }
        </nav>
    }
}
