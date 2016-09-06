export default {
    name: 'jumbotron',
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
    computed: {
        className() {
            return {
                'jumbotron': true,
                'jumbotron-fluid': this.fluid
            }
        }
    },
    render(h) {
        const Component = this.tag
        return <Component class={this.className}>
            { this.$slots.default }
        </Component>
    }
}
