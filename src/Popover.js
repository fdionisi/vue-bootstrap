export default {
    name: 'popover',
    props: {
        event: {
            type: String,
            default: 'click'
        },
        title: String,
        target: {
            type: null,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'top'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    computed: {
        className() {
            return {
                in: true,
                fade: true,
                popover: true,
                [`popover-${this.position}`]: true
            }
        }
    },
    created() {
        this.visible = this.show
    },
    render(h) {
        const on = {}
        const style = {
            top: 'auto',
            left: 'auto'
        }

        let x = 0, y = 0, position
        switch (this.position) {
            case 'top':
                position = 'bottom'
                y = -1
            case 'bottom':
                x = '-50%'
                y = (y || 1) * 10 + 'px'
                style.left = '50%'

                position = position || 'top'
            break
            case 'left':
                position = position || 'right'
                x = -1
            case 'right':
                y = '-50%'
                x = (x || 1) * 10 + 'px'
                style.top = '50%'

                position = position || 'left'
            break
        }

        style[position] = '100%'

        style.transform = `translate3d(${x}, ${y}, 0)`

        switch (this.event) {
            case 'click':
                on.click = (ev) => {
                    ev.preventDefault()
                    this.visible = !this.visible
                }
            break
            case 'hover':
                on.mouseenter = () => this.visible = true
                on.mouseleave = () => this.visible = false
                on.click = (ev) => ev.preventDefault()
            break
        }

        return <span style="position:relative">
            <a href="#" { ...{ on } }>{ this.$slots.target || this.target }</a>
            <transition name="fade">
                {
                    this.visible && <div
                        class={this.className}
                        style={style}
                        role="tooltip">
                        <div class="popover-arrow"></div>
                        { this.title && <h3 class="popover-title">{ this.title }</h3> }

                        <div class="popover-content">{ this.$slots.default }</div>
                    </div>
                }
            </transition>
        </span>
    }
}
