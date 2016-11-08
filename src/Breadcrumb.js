import { emitEvent } from './misc/utilities'

const Crumb = {
    functional: true,
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        isLast: {
            type: Boolean,
            default: false
        },
        text: String,
        href: String,
        clicked: {
            type: Function,
            default: () => () => {}
        }
    },
    render: (h, { props }) => {
        const className = ['breadcrumb-item']

        if (props.isLast) className.push('active')

        return(
            <li class={className}>
                { !props.isLast &&
                    <a on-click={props.clicked} href={props.href || '#'}>{ props.text }</a>
                }
                
                { props.isLast && props.text }
            </li>
        )
    }
}

export default {
    name: 'breadcrumb',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    render(h) {
        const lastPosition = this.list.length - 1

        return <ol class="breadcrumb">
            {
                this.list.map((item, index) => <Crumb
                    disabled={item.disabled}
                    is-last={index === lastPosition}
                    clicked={emitEvent('click', this, item, index)}
                    href={item.href}
                    text={item.text} />
                )
            }
        </ol>
    }
}
