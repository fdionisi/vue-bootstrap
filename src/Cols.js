import { colsClass } from './misc/utilities'

export default {
    name: 'cols',
    functional: true,
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        xs: Number,
        sm: Number,
        md: Number,
        lg: Number,
        xsHidden: {
            type: Boolean,
            default: false
        },
        smHidden: {
            type: Boolean,
            default: false
        },
        mdHidden: {
            type: Boolean,
            default: false
        },
        lgHidden: {
            type: Boolean,
            default: false
        },
        xsOffset: Number,
        smOffset: Number,
        mdOffset: Number,
        lgOffset: Number,
        xsPush: Number,
        smPush: Number,
        mdPush: Number,
        lgPush: Number,
        xsPull: Number,
        smPull: Number,
        mdPull: Number,
        lgPull: Number
    },
    render(h, { children, props }) {
        const Component = props.tag

        const className = colsClass(props)

        return <Component class={className}>
            { children }
        </Component>
    }
}
