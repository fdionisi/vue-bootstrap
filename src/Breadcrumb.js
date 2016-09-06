export default {
    name: 'breadcrumb',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        lastPosition() {
            return this.list.length - 1
        }
    },
    methods: {
        _renderCrumb(item, index) {
            const h = this.$createElement
            const className = ['breadcrumb-item']

            if (index === this.lastPosition) className.push('active')

            return <li class={className}>
                <a href={item.href || '#'}>{ item.text }</a>
            </li>
        }
    },
    render(h) {
        return <ol class="breadcrumb">
            { this.list.map(this._renderCrumb) }
        </ol>
    }
}
