export default {
    name: 'tooltip',
    props: {
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
                tooltip: true,
                [`tooltip-${this.position}`]: true
            }
        }
    },
    created() {
        this.visible = this.show
    },
    render(h) {
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
                y = (y || 1) * 5 + 'px'
                style.left = '50%'

                position = position || 'top'
            break
            case 'left':
                position = position || 'right'
                x = -1
            case 'right':
                y = '-50%'
                x = (x || 1) * 5 + 'px'
                style.top = '50%'

                position = position || 'left'
            break
        }

        style[position] = '100%'

        style.transform = `translate3d(${x}, ${y}, 0)`

        const on = {
            mouseenter: () => this.visible = true,
            mouseleave: () => this.visible = false,
            click: (ev) => ev.preventDefault()
        }

        return <span style="position:relative">
            <a href="#" { ...{ on } }>{ this.$slots.target || this.target }</a>
            <transition name="fade">
                {
                    this.visible && <div
                        class={this.className}
                        style={style}
                        role="tooltip">
                        <div class="tooltip-arrow"></div>

                        <div class="tooltip-inner">{ this.$slots.default }</div>
                    </div>
                }
            </transition>
        </span>
    }
}
