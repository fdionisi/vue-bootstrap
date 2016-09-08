export default {
    name: 'jumbotron',
    functional: true,
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        fluid: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, children }) {
        const Component = props.tag

        const className = {
            'jumbotron': true,
            'jumbotron-fluid': props.fluid
        }

        return <Component class={className}>
            { children }
        </Component>
    }
}
