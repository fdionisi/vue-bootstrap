export default {
    props: {
        indicators: {
            type: Boolean,
            default: true
        },
        controls: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            position: 0
        }
    },
    methods: {
        slideTo() {
            return () => {}
        },
        slidePosition() {
            return () => {}
        },
        _renderIndicators() {
            const h = this.$createElement

            const renderIndicator = (item, index) => <li on-click={this.slideTo(index)} class={ this.position === index && 'active'}></li>

            return <ol class="carousel-indicators">
                { this.list.map(renderIndicator) }
            </ol>
        },
        _renderItemCaption(caption) {
            const h = this.$createElement

            return <div class="carousel-caption">
                <h3>{ caption.title }</h3>
                <p>{ caption.desc }</p>
            </div>
        },
        _renderItem(item, index) {
            const h = this.$createElement

            if (typeof item === 'string')
                item = {
                    img: item
                }

            const className = {
                'carousel-item': true,
                active: index === this.position
            }

            return <div class="carousel-item">
                <img src={item.img} alt={item.title}/>
                { item.caption && this._renderItemCaption(item.caption) }
            </div>
        },
        _renderLeftControl() {
            return this._renderControl('left')
        },
        _renderRightControl() {
            return this._renderControl('right')
        },
        _renderControl(position) {
            const h = this.$createElement

            const className = {
                'carousel-control': true,
                [position]: true
            }

            const direction = position === 'left'
                ? 'prev'
                : 'next'

            return <a
                class={className}
                href="#"
                on-click={this.slidePosition(direction)}>

                <span class={`icon-${direction}`} aria-hidden="true"></span>
                <span class="sr-only">{ position === 'left' ? 'Previous' : 'Next' }</span>
            </a>
        }
    },
    render(h) {
        return <div class="carousel slide">
            { this.indicators && this._renderIndicators() }

            <div class="carousel-inner" role="listbox">
                { this.list.map(this._renderItem) }
            </div>

            { this.controls && this._renderLeftControl() }
            { this.controls && this._renderRightControl() }
        </div>
    }
}
