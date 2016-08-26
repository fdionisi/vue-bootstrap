function findParent(target, el={}) {
    return target === el
        ? true
        : !!el.parentElement && findParent(target, el.parentElement)
}

export default {
    name: 'dropdown-menu',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        tag: {
            type: String,
            default: 'a'
        },
        title: String
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        _renderLink(h, item) {
            const on = {}

            // click event
            if (item.click) on.click = !item.disabled
                ? item.click
                : (ev) => ev.preventDefault()

            // return link/button tag
            return <a
                href={item.href || '#'}
                class={{ 'dropdown-item': true, disabled: item.disabled }}
                { ...{ on } }>
                { item.text }
            </a>
        },
        _renderDivider(h) {
            // return simple separator
            return <div class="dropdown-divider"></div>
        },
        _renderTitle(h) {
            // return h6 element
            return <h6 class="dropdown-header">
                { this.title }
            </h6>
        },
        _generateListener() {
            return ({target}) => {
                !findParent(this.$el, target) && this.toggle()
            }
        },
        toggle() {
            // visible became not visible
            this.visible = !this.visible;
        }
    },
    created() {
        this.__body__ = document.body
        this.$on('show', () => {
            // ensure listener
            if (!this.__ev_listener__) this.__ev_listener__ = this._generateListener()
            // add event listener
            setTimeout(() => {
                this.__body__.addEventListener('click', this.__ev_listener__)
            }, 100)
        })
        this.$on('hide', () => {
            // ensure body
            if (!(this.__body__ && this.__ev_listener__)) return

            // remove event listener and delete __ev_listener__
            this.__body__.removeEventListener('click', this.__ev_listener__)
            delete this.__ev_listener__
        })
    },
    destroyed() {
        this.$off('show')
        this.$off('hide')
    },
    render(h) {
        const children = [];
        // add title when present title
        if (this.title) children.push(
            this._renderTitle(h)
        )
        // for each element in options,
        // create a link/button or a divider
        for (let item of this.options) children.push(
            item.divider
                ? this._renderDivider(h)
                : this._renderLink(h, item)
        )
        // return the elment when visible
        // otherwise return nothing
        return <div
            v-show={this.visible}
            aria-label={this.id}
            style={{ display: 'block' }}
            class="dropdown-menu">
            { children }
        </div>
    },
    watch: {
        visible(val, oldVal) {
            // when val is same as oldVal
            // just exit the listener
            if (val === oldVal) return;
            // emit show or hide,
            // depending on `$data.visible` new value
            this.$emit(val
                ? 'show'
                : 'hide'
            )
        }
    },
    // XXX: wait for a fix
    events: {
        show() {
            // ensure body
            if (!this.__body__) this.__body__ = document.body

            // ensure listener
            if (!this.__ev_listener__) this.__ev_listener__ = this._generateListener()

            // add event listener
            this.__body__.addEventLisener('click', this.__ev_listener__)
        },
        hide() {
            // ensure body
            if (!(this.__body__ && this.__ev_listener__)) return

            // remove event listener and delete __ev_listener__
            this.__body__.removeEventLisener('click', this.__ev_listener__)
            delete this.__ev_listener__
        }
    }
}
