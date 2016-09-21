export default {
    name: 'pagination',
    props: {
        pages: {
            type: Number,
            default: 0
        },
        value: null
    },
    methods: {
        _emitClick(ev) {
            const { page } = ev.target.dataset
            ev.preventDefault()
            this.$emit('input', parseInt(page))
        },
        _renderLink() {
            const h = this.$createElement
            const children = []

            for (let i = 1, len = this.pages; i <= len; i++) {
                const className = {
                    'page-item': true,
                    'active': this.value === i
                }

                children.push(
                    <li class={className}>
                        <a href="#" class="page-link" data-page={i} on-click={this._emitClick}>
                            { i }
                        </a>
                    </li>
                )
            }

            return children
        }
    },
    render(h) {
        return <ul class="pagination">
            { this._renderLink() }
        </ul>
    }
}
