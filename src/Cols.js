const DEVICE_SIZES = [
  'lg',
  'md',
  'sm',
  'xs'
]

export default {
    name: 'cols',
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
    computed: {
        className() {
            const classes = []
            const elementProps = this.$options.props
            DEVICE_SIZES.forEach(size => {
                function popProp(propSuffix, modifier) {
                    const propName = `${size}${propSuffix}`
                    const propValue = elementProps[propName]

                    if (propValue !== null)
                        classes.push(`col-${size}${modifier}-${propValue}`)

                    delete elementProps[propName]
                }

                popProp('', '')
                popProp('Offset', '-offset')
                popProp('Push', '-push')
                popProp('Pull', '-pull')

                const hiddenPropName = `${size}Hidden`
                if (elementProps[hiddenPropName])
                    classes.push(`hidden-${size}`)

                delete elementProps[hiddenPropName]
            })

            return classes
        }
    },
    render(h) {
        const Component = this.tag
        return <Component class={this.className}>
            { this.$slots.default }
        </Component>
    }
}
