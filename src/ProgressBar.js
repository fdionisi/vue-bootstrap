export default {
    name: 'progress-bar',
    functional: true,
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
    render(h, { props }) {
        const className = {
            progress: true,
            [`progress-${props.variant}`]: props.variant !== 'default',
            'progress-striped': props.striped
        }

        const fallbackStyle = {
            width: Math.round((props.value * 100) / props.max) + '%'
        }

        return <progress class={className} value={props.value} max={props.max}>
            <div class="progress">
                <span class="progress-bar" style={fallbackStyle}></span>
            </div>
        </progress>
    }
}
