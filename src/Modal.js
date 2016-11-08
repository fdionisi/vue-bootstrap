import Vue from 'vue'
import { emitEvent } from './misc/utilities'

const ModalHeader = {
    name: 'modal-header',
    functional: true,
    render: (h, { props, children }) => {
        const { context } = props
        const emitClose = (ev) => context.$emit('hide', ev, context)

        return <div class="modal-header">
            {
                context && context.dismissible && <button
                    type="button"
                    class="close"
                    on-click={emitClose}
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            }

            { props.title && <h4 class="modal-title">{ props.title }</h4> }

            { children }
        </div>
    }
}

const ModalBody = {
    name: 'modal-body',
    functional: true,
    render: (h, { children }) => {
        return <div class="modal-body">
            { children }
        </div>
    }
}

const ModalFooter = {
    name: 'modal-footer',
    functional: true,
    render: (h, { children }) => {
        return <div class="modal-footer">
            { children }
        </div>
    }
}

export default {
    name: 'modal',
    props: {
        id: {
            type: String,
            required: true
        },
        container: Object,
        dismissible: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'fade'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: false,
            modalVisible: false
        }
    },
    created() {
        this.visible = this.show

        this.$on('show', () => {
            if (!this.$isServer)
                document.body.classList.add('modal-open')

            this.visible = true
        })
        this.$on('hide', () => {
            if (!this.$isServer)
                document.body.classList.remove('modal-open')

            this.visible = false
        })
        this.$on('toggle', () => {
            if (!this.$isServer)
                document.body.classList.toggle('modal-open')

            this.visible = !!this.visible
        })
    },
    methods: {
        _ejectModal() {
            if (this.$isServer || !this._modal) return

            this.modalVisible = false

            this.$nextTick(() => {
                this._modal.$destroy()
                document.body.removeChild(
                    document.querySelector(`#${this.id}`)
                )

                delete this._modal
            })
        },
        _injectModal() {
            if (this.$isServer || this._modal) return

            const ctx = this

            const injectDiv = () => document.body.appendChild(
                document.createElement('div')
            )

            this.modalVisible = true

            this.$nextTick(() => {
                this._modal = new Vue({
                    render: (h) => <div>
                        { () => ctx._renderModal() }
                        { () => ctx._renderBackdrop() }
                    </div>
                })

                this._modal.$mount(injectDiv())
            })
        },
        _renderBackdrop() {
            const h = this.$createElement

            return <div class="modal-backdrop fade in"></div>
        },
        _renderModal() {
            const h = this.$createElement

            return <div class="modal in" on-click={emitEvent('hide', this)} style="display: block;">
                <div on-click={(ev) => ev.stopImmediatePropagation()} class="modal-dialog" role="document">
                    <div class="modal-content">
                        { this.$slots.header && <ModalHeader context={this}>{ this.$slots.header }</ModalHeader> }

                        { this.$slots.body && <ModalBody>{ this.$slots.body }</ModalBody> }

                        { this.$slots.footer && <ModalFooter>{ this.$slots.footer }</ModalFooter> }

                        { this.$slots.default }
                    </div>
                </div>
            </div>
        },
        _renderEl() {
            const h = this.$createElement

            // return <div>
            // </div>
            return <div id={this.id}>
                { this._renderModal() }
                { this._renderBackdrop() }
            </div>
        }
    },
    watch: {
        visible(val) {
            if (val) this._injectModal()
            else this._ejectModal()
        }
    },
    render(h) {
        return null
    }
}
