export default {
    name: 'forms',
    props: {
        inline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            return {
                'form-inline': this.inline
            }
        }
    },
    render(h) {

        return <form
            class={this.className}
            on-submit={(ev) => this.$emit('submit', ev, this)}
            on-reset={(ev) => this.$emit('reset', ev, this)}>
            { this.$slots.default }
        </form>
    }
}
