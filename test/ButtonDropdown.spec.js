import Vue from 'vue'
import ButtonDropdown from '../src/ButtonDropdown'

describe('ButtonDropdown', () => {
    // XXX: remove warning from console
    // '[Vue warn]: options "name" can only be used as a component definition option, not during instance creation.'
    delete ButtonDropdown.name;

    it('render with standard props', () => {
        // define button
        const Btn = Object.assign(
            { propsData: { } },
            ButtonDropdown
        )
        // create view-model and mount it
        const vm = new Vue(Btn)
        vm.$mount()
        // check dropup
        expect(vm.dropup).toBe(false)
        // check options
        expect(vm.options.length).toBe(0)
        // check size
        expect(vm.size).toBe('md')
        // check variant
        expect(vm.variant).toBe('secondary')
    })

    it('render with `dropup` class when property is specified', () => {
        // define button
        const Btn = Object.assign(
            { propsData: { dropup: true } },
            ButtonDropdown
        )
        // create view-model and mount it
        const vm = new Vue(Btn)
        vm.$mount()
        // check dropup
        expect(vm.dropup).toBe(true)
        expect(vm.$el.classList.contains('dropup')).toBe(true)
    })
})
