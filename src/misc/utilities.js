import { DEVICE_SIZES } from './constants'

export const colsClass = (ctx={}, opposite=false) => {
    return DEVICE_SIZES.reduce((classes, size) => {
        const popProp = (propSuffix, modifier) => {
            const propName = `${size}${propSuffix}`
            const propValue = opposite  ? 12 - ctx[propName] : ctx[propName]

            if (propValue)
                classes.push(`col-${size}${modifier}-${propValue}`)
        }

        popProp('', '')
        popProp('Offset', '-offset')
        popProp('Push', '-push')
        popProp('Pull', '-pull')

        const hiddenPropName = `${size}Hidden`
        if (ctx[hiddenPropName])
            classes.push(`hidden-${size}`)

        return classes
    }, [])
}

export const emitEvent = (eventName, ctx, ...extraArgs) => (ev) => ctx.$emit(eventName, ev, ctx, ...extraArgs)
