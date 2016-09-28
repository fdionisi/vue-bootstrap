import Btn from './Btn'
import BtnGroup from './BtnGroup'

export default {
    name: 'btn-radio',
    props: {
        ...BtnGroup.props,
        value: null
    },
    methods: {
        _updateValue({ target }) {
            this.$emit('input', target.__vue__.value)
        }
    },
    computed: {
        stateOptions() {
            return this.options.map((option) => {
                return {
                    ...option,
                    active: this.value === option.value
                }
            })
        }
    },
    render(h) {
        const btnGroupProps = this.$options.props || {}
        const props = {}

        for (let propName in btnGroupProps)
            if (btnGroupProps.hasOwnProperty(propName))
                props[propName] = this[propName]

        delete props.value

        return <BtnGroup { ...{ props } }>
            { this.stateOptions.map((props) => <Btn on-click={this._updateValue} { ...{ props } } />)}
        </BtnGroup>
    }
}
