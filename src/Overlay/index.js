import Portal from './Portal'
import Position from './Position'
import RootCloseWrapper from './RootCloseWrapper'

import { emitEvent } from '../misc/utilities'

export default {
    name: 'overlay',
    props: {
        show: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            exited: false
        }
    },
    created() {
        this.exited = !this.show
    },
    beforeUpdate() {
        if (this.show) this.exited = false
        else if (!this.transition) this.exited = true
    },
    render(h) {
        let {
            container,
            containerPadding,
            target,
            placement,
            shouldUpdatePosition,
            rootClose,
            transition
        } = this


        // Don't un-render the overlay while it's transitioning out.
        const mountOverlay = this.show || (transition && !this.exited)
        // Don't bother showing anything if we don't have to.
        if (!mountOverlay) return null

        const child = this.$slots.default

        // Position is be inner-most because it adds inline styles into the child,
        // which the other wrappers don't forward correctly.
        const positionProps = { container, containerPadding, target, placement, shouldUpdatePosition }
        child = <Position {...{ props: positionProps } }>
            { child }
        </Position>


        if (transition) child = <transition
            name={transition}
            on-before-enter={emitEvent('before-enter', this)}
            on-enter={emitEvent('enter', this)}
            on-after-enter={emitEvent('after-enter', this)}
            on-enter-cancelled={emitEvent('enter-cancelled', this)}
            on-before-leave={emitEvent('before-leave', this)}
            on-leave={emitEvent('leave', this)}
            on-after-leave={emitEvent('after-leave', this)}
            on-leave-cancelled={emitEvent('leave-cancelled', this)}>
            { child }
        </transition>


        if (rootClose) child = <RootCloseWrapper
            on-root-close={emitEvent('hide')}>
            { child }
        </RootCloseWrapper>


        return <Portal container={container}>
            { child }
        </Portal>
    }
}
