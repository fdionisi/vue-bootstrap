import Vue from 'vue'
import DropdownMenu from '../src/DropdownMenu'

describe('DropdownMenu', () => {
    // XXX: remove warning from console
    // '[Vue warn]: options "name" can only be used as a component definition option, not during instance creation.'
    delete DropdownMenu.name;

    it('render with default properties', () => {
        // define dropdown menu
        const Ddm = Object.assign(
            { propsData: { } },
            DropdownMenu
        )
        // create view-model and mount it
        const vm = new Vue(Ddm)
        vm.$mount()
        // size checks
        expect(vm.options.length).toBe(0)
        expect(vm.tag).toBe('a')
        expect(vm.title).toBe(undefined)
        // visibility check
        expect(vm.visible).toBe(false)
        expect(vm.$el.style.display).toBe('none')
    })

    it('change visibility using `toggle` method', () => {
        // define dropdown menu
        const Ddm = Object.assign(
            { propsData: { } },
            DropdownMenu
        )
        // create view-model and mount it
        const vm = new Vue(Ddm)
        vm.$mount()
        // visibility check
        expect(vm.visible).toBe(false)
        expect(vm.$el.style.display).toBe('none')
        // toggle visibility
        vm.toggle()
        vm.$nextTick(() => {
            // visibility check
            expect(vm.visible).toBe(true)
            expect(vm.$el.style.display).toBe('')
            // toggle visibility
            vm.toggle()
            vm.$nextTick(() => {
                // visibility check
                expect(vm.visible).toBe(false)
                expect(vm.$el.style.display).toBe('none')
            })
        })
    })
})
