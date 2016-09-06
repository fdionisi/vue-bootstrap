import { STATUS_VARIANTS } from './misc/constants'
import { inEnum } from './misc/validators'
export default {
    name: 'alert',
    props: {
        dismissible: {
            type: Boolean,
            default: true
        },
        variant: {
            validator: inEnum(...STATUS_VARIANTS),
            default: 'success'
        }
    },
    computed: {
        className() {
            return {
                alert: true,
                [`alert-${this.variant}`]: true,
                'alert-dismissible': this.dismissible
            }
        }
    },
    methods: {
        _renderClose() {
            const h = this.$createElement

            return <button on-click={this.close} type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        },
        closeClick(ev) {
            this.$emit('close', ev, this)
        }
    },
    render(h) {
        return (
            <div
                role="alert"
                class={this.className}>
                { this.dismissible && this._renderClose() }
                { this.$slots.default }
            </div>
        )
    }
}
