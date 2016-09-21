import Btn from './Btn'
import BtnGroup from './BtnGroup'

export default {
    name: 'btn-checkbox',
    props: {
        ...BtnGroup.props,
        value: null
    },
    methods: {
        _updateValue({ target }) {
            const currentValue = this.value || []
            const targetValue = target.__vue__.value

            const targetPos = currentValue.indexOf(targetValue)

            if (targetPos === -1) currentValue.push(targetValue)
            else currentValue.splice(targetPos, 1)

            this.$emit('input', currentValue)
        }
    },
    computed: {
        stateOptions() {
            const currentValue = this.value || []
            return this.options.map((option) => {
                return {
                    ...option,
                    active: currentValue.includes(option.value)
                }
            })
        }
    },
    render(h) {
        return <BtnGroup>
            { this.stateOptions.map((props) => <Btn on-click={this._updateValue} { ...{ props } } />)}
        </BtnGroup>
    }
}
