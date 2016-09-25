export default {
    name: 'portal',
    props: {
        container: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this._renderOverlay()
    },
    updated() {
        this._renderOverlay()
    },
    beforeDestroy() {
        this._unrenderOverlay()
        this._unmountOverlayTarget()
    },
    render: () => null,
    methods: {
        _mountOverlayTarget() {
            if (!(this.$isServer || this._overlayTarget)) {
                this._overlayTarget = document.createElement('div')
                // this._portalContainerNode = getContainer(this.container.$root, ownerDocument(this).body)
                this._portalContainerNode = this.$root
                this._portalContainerNode.appendChild(this._overlayTarget)
            }
        },
        _unmountOverlayTarget() {
            if (!this.$isServer && this._overlayTarget) {
                this._portalContainerNode.removeChild(this._overlayTarget)
                this._overlayTarget = null
            }

            this._portalContainerNode = null
        },
        _renderOverlay() {

            let overlay = !this.$slots.default
                ? null
                : this.$slots.default

            // Save reference for future access.
            if (overlay !== null) {
                this._mountOverlayTarget()
                // this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
                //     this, overlay, this._overlayTarget
                // )
            } else {
                // Unrender if the component is null for transitions to null
                this._unrenderOverlay()
                this._unmountOverlayTarget()
            }
        },
        _unrenderOverlay() {
            if (this._overlayTarget) {
                // ReactDOM.unmountComponentAtNode(this._overlayTarget)
                this._overlayInstance = null
            }
        }
    }
}
