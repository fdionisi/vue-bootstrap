import { STATUS_VARIANTS } from './misc/constants'
import { emitEvent } from './misc/utilities'
import { inEnum } from './misc/validators'

const closeRenderer = (h, ctx) => {

    return <button
        on-click={emitEvent('close', ctx)}
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close" >

        <span aria-hidden="true">
            &times;
        </span>
    </button>
}

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
    render(h) {
        const className = {
            alert: true,
            [`alert-${this.variant}`]: true,
            'alert-dismissible': this.dismissible
        }

        return (
            <div
                role="alert"
                class={className}>

                { this.dismissible && closeRenderer(h, this) }

                { this.$slots.default }
            </div>
        )
    }
}
