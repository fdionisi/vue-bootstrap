export default {
    name: 'progress-bar',
    props: {
        striped: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: 'default'
        },
        value: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    computed: {
        className() {
            return {
                progress: true,
                [`progress-${this.variant}`]: this.variant !== 'default',
                'progress-striped': this.striped
            }
        }
    },
    render(h) {
        const fallbackStyle = {
            width: Math.round((this.value * 100)/this.max) + '%'
        }

        return <progress class={this.className} value={this.value} max={this.max}>
            <div class="progress">
                <span class="progress-bar" style={fallbackStyle}></span>
            </div>
        </progress>
    }
}
