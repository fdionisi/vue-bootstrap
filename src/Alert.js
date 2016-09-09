import { STATUS_VARIANTS } from './misc/constants'
import { emitEvent } from './misc/utilities'
import { inEnum } from './misc/validators'

const CloseBtn = {
    functional: true,
    props: {
        label: {
            type: String,
            default: 'Close'
        },
        clicked: {
            type: Function,
            default: () => () => {}
        }
    },
    render: (h, { props }) => (
        <button
            on-click={props.clicked}
            aria-label={props.label}
            type="button"
            class="close">

            <span aria-hidden="true">
                &times;
            </span>
        </button>
    )
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

                { this.dismissible && <CloseBtn clicked={emitEvent('close', this)} /> }

                { this.$slots.default }
            </div>
        )
    }
}
