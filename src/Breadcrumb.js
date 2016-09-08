const crumbRenderer = (h) => (item, index, list) => {
    const className = ['breadcrumb-item']
    const lastPosition = list.length - 1

    if (index === lastPosition) className.push('active')

    return <li class={className}>
        <a href={item.href || '#'}>{ item.text }</a>
    </li>
}

export default {
    name: 'breadcrumb',
    functional: true,
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    render(h, { props }) {
        return <ol class="breadcrumb">
            { props.list.map(crumbRenderer(h)) }
        </ol>
    }
}
