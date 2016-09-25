export default {
    name: 'position',
    data() {
        return {
            positionLeft: 0,
            positionTop: 0,
            arrowOffsetLeft: null,
            arrowOffsetTop: null
        }
    },
    created() {
        this._needsFlush = false
        this._lastTarget = null
    },
    mounted() {
        this.updatePosition(this.getTarget())
    },
    beforeUpdate() {
        this._needsFlush = true
    },
    computed: {
        styles() {
            return {
                left: this.positionLeft,
                top: this.positionTop
            }
        }
    },
    render(h) {
        const Child = this.$slots.default

        const style = {
            left: this.positionLeft,
            top: this.positionTop
        }

        return <Child style={this.styles} />
    },
    methods: {
        getTarget() {
            const { target } = this
            const targetElement = typeof target === 'function'
                ? target()
                : target

            return null
            // return targetElement && ReactDOM.findDOMNode(targetElement) || null
        },

        maybeUpdatePosition(placementChanged) {
            const target = this.getTarget()

            if (
                !this.props.shouldUpdatePosition &&
                target === this._lastTarget &&
                !placementChanged
            ) return

            this.updatePosition(target)
        },

        updatePosition(target) {
            this._lastTarget = target

            if (!target) {
                this.positionLeft = 0
                this.positionTop = 0
                this.arrowOffsetLeft = null
                this.arrowOffsetTop = null

                return
            }

            const overlay = ReactDOM.findDOMNode(this)
            const container = this.$root

            const position = calculatePosition(
                this.placement,
                overlay,
                target,
                container,
                this.containerPadding
            )
        }
    },
    watch: {
        placement(newPlacement, prevPlacement) {
            if (this._needsFlush) {
                this._needsFlush = false
                this.maybeUpdatePosition(newPlacement !== prevPlacement)
            }
        }
    }
}
