const listItemRenderer = (h, ctx) => (item) => {
    const Component = ctx.action
        ? 'button'
        : 'ul'

    const variant = item.variant || ctx.variant

    const className = {
        'list-group-item': true,
        'list-group-item-action': ctx.action,
        [`list-group-item-${variant}`]: variant,
        disabled: item.disabled
    }

    return <Component
        class={className}
        data-value={item.value}
        on-click={ctx.emitClick}>

        { item.heading && <h5 class="list-group-item-heading">{ item.heading }</h5> }
        { item.text && <p class="list-group-item-text">{ item.text }</p> }

        { item.children }
    </Component>
}

export default {
    name: 'list-group',
    props: {
        variant: String,
        action: Boolean,
        list: {
            type: Array,
            default: () => []
        },
        tag: {
            type: String,
            default: 'ul'
        }
    },
    methods: {
        emitClick(ev) {
            const { target={} } = ev
            const { dataset={} } = target

            dataset.value && this.$emit('click', ev, dataset.value)
        }
    },
    render(h) {
        const Component = this.action
            ? 'div'
            : this.tag

        return <Component class="list-group">
            { this.list.map(listItemRenderer(h, this)) }
        </Component>
    }
}
