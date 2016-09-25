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
            visible: false
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
        _renderBackdrop() {
            const h = this.$createElement

            return <transition>
                <div class="modal-backdrop fade in"></div>
            </transition>
        },
        _renderModal() {
            const h = this.$createElement

            return <transition
                name="fade"
                on-afterEnter={emitEvent('showed', this)}
                on-afterLeave={emitEvent('hidden', this)}>
                <div class="modal" on-click={emitEvent('hide', this)} style="display: block">
                    <div on-click={(ev) => ev.stopImmediatePropagation()} class="modal-dialog" role="document">
                        <div class="modal-content">
                            { this.$slots.header && <ModalHeader context={this}>{ this.$slots.header }</ModalHeader> }

                            { this.$slots.body && <ModalBody>{ this.$slots.body }</ModalBody> }

                            { this.$slots.footer && <ModalFooter>{ this.$slots.footer }</ModalFooter> }

                            { this.$slots.default }
                        </div>
                    </div>
                </div>
            </transition>
        }
    },
    render(h) {
        return this.visible
        ? <div>
            { [ this._renderModal(), this._renderBackdrop() ] }
        </div>
        : null
    }
}
