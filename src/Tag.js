import { VARIANTS } from './misc/constants'
import { inEnum } from './misc/validators'

export default {
    name: 'tag',
    functional: true,
    props: {
        pill: {
            type: Boolean,
            default: false
        },
        variant: {
            validator: inEnum(...VARIANTS),
            default: 'secondary'
        }
    },
    render(h, ctx) {
        const { props, children } = ctx

        const className = {
            tag: true,
            'tag-pill': props.pill,
            [`tag-${props.variant}`]: true
        }

        return <span class={ className }>
            { children }
        </span>
    }
}
