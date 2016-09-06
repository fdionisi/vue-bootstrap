import { BUTTON_VARIANTS } from './misc/constants'
import { inEnum } from './misc/validators'

export default {
    name: 'tag',
    props: {
        pill: {
            type: Boolean,
            default: false
        },
        variant: {
            validator: inEnum(...BUTTON_VARIANTS),
            default: 'secondary'
        }
    },
    computed: {
        className() {
            return {
                tag: true,
                'tag-pill': this.pill,
                [`tag-${this.variant}`]: true
            }
        }
    },
    render(h) {
        return <span class={this.className}>
            { this.$slots.default }
        </span>
    }
}
