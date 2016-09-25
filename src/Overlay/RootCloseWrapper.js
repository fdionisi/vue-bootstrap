// TODO: Consider using an ES6 symbol here, once we use babel-runtime.
const CLICK_WAS_INSIDE = '__click_was_inside';

let counter = 0;

function isLeftClickEvent(event) {
    return event.button === 0
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function getSuppressRootClose() {
    let id = CLICK_WAS_INSIDE + '_' + counter++

    return {
        id,
        suppressRootClose(event) {
            // Tag the native event to prevent the root close logic on document click.
            // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
            // which is only supported in IE >= 9.
            event.nativeEvent[id] = true
        }
    };
}

export default {
    name: 'root-close-wrapper',
    created() {
        let { id, suppressRootClose } = getSuppressRootClose()

        this._suppressRootId = id

        this._suppressRootCloseHandler = suppressRootClose
    },
    mounted() {
        this.bindRootCloseHandlers()
    },
    beforeDestroy() {
        this.unbindRootCloseHandlers()
    },
    render() {
        const child = this.$slots.default

        const on = {
            [this.event]: this._suppressRootCloseHandler
        }

        if (this.noWrap) return child

        // Wrap the child in a new element, so the child won't have to handle
        // potentially combining multiple onClick listeners.
        return <div { ...{ on } }>
            { this.$slots.default }
        </div>
    },
    methods: {
        bindRootCloseHandlers() {
            const doc = this.$root.$el

            this._onDocumentMouseListener = addEventListener(doc, this.event, this.handleDocumentMouse)

            this._onDocumentKeyupListener = addEventListener(doc, 'keyup', this.handleDocumentKeyUp)
        },
        unbindRootCloseHandlers() {
            if (this._onDocumentMouseListener)
                this._onDocumentMouseListener.remove()

            if (this._onDocumentKeyupListener)
                this._onDocumentKeyupListener.remove()
        },
        handleDocumentMouse(ev) {
            // This is now the native event.
            if (ev[this._suppressRootId]) return

            if (this.disabled || isModifiedEvent(ev) || !isLeftClickEvent(ev))
                return

            this.$emit('root-close', ev, this)

            this.props.onRootClose && this.props.onRootClose()
        },

        handleDocumentKeyUp(ev) {
            if (ev.keyCode === 27)
                this.$emit('root-close', ev, this)
        },
        getWrappedDOMNode() {
            // We can't use a ref to identify the wrapped child, since we might be
            // stealing the ref from the owner, but we know exactly the DOM structure
            // that will be rendered, so we can just do this to get the child's DOM
            // node for doing size calculations in OverlayMixin.
            // const node = ReactDOM.findDOMNode(this);
            let node
            return this.noWrap
                ? node
                : node.firstChild
        }
    }
}
