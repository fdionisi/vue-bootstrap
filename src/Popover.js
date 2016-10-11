import { calculatePosition } from './misc/utilities'

export default {
    name: 'popover',
    props: {
        id: {
            type: String,
            required: true
        },
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
    methods: {
        _ejectPopover() {
            if (this.$isServer || !this._modal) return

            const ctx = this
            const Vue = this.constructor

            this._modal.$destroy()
            document.body.removeChild(document.querySelector('#modal'))

            delete this._modal
        },
        _injectPopover() {
            if (this.$isServer || this._modal) return

            const ctx = this
            const Vue = this.constructor

            const _modal_el = document.createElement('div')
            _modal_el.id = 'modal'

            document.body.appendChild(_modal_el)

            this._modal = new Vue({
                el:'#modal',
                render: (h) => ctx._renderEl()
            })
        },
        _renderPopover() {
            const h = this.$createElement

            const style = {
                top: 'auto',
                left: 'auto'
            }

            return <transition name="fade">
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
        }
    },
    render(h) {
        const on = {}

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

        return <a href="#" { ...{ on } }>{ this.$slots.target || this.target }</a>
    }
}
