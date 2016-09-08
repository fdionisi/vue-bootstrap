import { emitEvent } from './misc/utilities'

export default {
    name: 'forms',
    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },
    render(h) {
        const className = {
            'form-inline': this.inline
        }

        return <form
            class={ className }
            on-submit={ emitEvent('submit', this) }
            on-reset={ emitEvent('reset', this) }>

            { this.$slots.default }
        </form>
    }
}
