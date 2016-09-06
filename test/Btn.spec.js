import Vue from 'vue'
import Button from '../src/Button'
import { BUTTON_VARIANTS } from '../src/misc/constants'

describe('Button', () => {
    // XXX: remove warning from console
    // '[Vue warn]: options "name" can only be used as a component definition option, not during instance creation.'
    delete Button.name;

    it('render with standard props', () => {
        // define button
        const Btn = Object.assign(
            { propsData: { } },
            Button
        )
        // create view-model and mount it
        const vm = new Vue(Btn)
        vm.$mount()
        // size checks
        expect(vm.size).toBe('md')
        expect(!vm.$el.classList.contains('btn-md')).toBe(true)
        // tag check
        expect(vm.tag).toBe('button')
        expect(vm.$el.tagName).toBe('BUTTON')
        // type check
        expect(vm.type).toBe('button')
        expect(vm.$el.type).toBe('button')
        // variant check
        expect(vm.variant).toBe('secondary')
        expect(vm.$el.classList.contains('btn-secondary')).toBe(true)
    })

    it('render with proper size\'s class', () => {
        // define all sizes
        const SIZES = [
            { value: 'sm', result: true },
            { value: 'md', result: false },
            { value: 'lg', result: true }
        ];
        // automatic test
        SIZES.forEach(({ value, result }) => {
            // define SM button
            const btn = Object.assign(
                { propsData: { size: value } },
                Button
            )
            // create view-model and mount it
            const vm = new Vue(btn)
            vm.$mount()
            // size checks
            expect(vm.size).toBe(value)
            expect(vm.$el.classList.contains(`btn-${value}`)).toBe(result)
        })
    })

    it('render with proper variant\'s class', () => {
        // define all sizes
        const VARIANTS = BUTTON_VARIANTS.map(
            value => ({ value, result: true })
        )
        // automatic test
        VARIANTS.forEach(({ value, result }) => {
            // define SM button
            const btn = Object.assign(
                { propsData: { variant: value } },
                Button
            )
            // create view-model and mount it
            const vm = new Vue(btn)
            vm.$mount()
            // size checks
            expect(vm.variant).toBe(value)
            expect(vm.$el.classList.contains(`btn-${value}`)).toBe(result)
        })
    })

    it('render with `btn-block` when `block` property is true', () => {
        // define SM button
        const btn = Object.assign(
            { propsData: {  } },
            Button
        )
        const btnBlock = Object.assign(
            { propsData: { block: true } },
            Button
        )
        // create view-model and mount it
        const vm = new Vue(btn)
        const vmBlock = new Vue(btnBlock)
        vm.$mount()
        vmBlock.$mount()
        // property check
        expect(vm.block).toBe(false)
        expect(vmBlock.block).toBe(true)
        // $el class check
        expect(vm.$el.classList.contains('btn-block')).toBe(false)
        expect(vmBlock.$el.classList.contains('btn-block')).toBe(true)
    })

    it('render with `disabled` property having priority over `active` one', () => {
        const STATUS = [
            { propsData: { active: true, disabled: true }, result: { active: false, disabled: true } },
            { propsData: { active: true, disabled: false }, result: { active: true, disabled: false } }
        ]
        STATUS.forEach(({ propsData, result }) => {
            // define SM button
            const btn = Object.assign(
                { propsData },
                Button
            )
            // create view-model and mount it
            const vm = new Vue(btn)
            vm.$mount()
            // $el class check
            expect(vm.$el.classList.contains('active')).toBe(result.active)
            expect(vm.$el.classList.contains('disabled')).toBe(result.disabled)
            expect(vm.$el.disabled).toBe(result.disabled)
        })
    })

    it('render with `a` tag when specified', () => {
        // define button
        const Btn = Object.assign(
            { propsData: { tag: 'a' } },
            Button
        )
        // create view-model and mount it
        const vm = new Vue(Btn)
        vm.$mount()
        // tag check
        expect(vm.tag).toBe('a')
        expect(vm.$el.tagName).toBe('A')
    })

    it('render only <a>\'s properties when `a` tag is specified', () => {
        // define constants
        const href = 'https://ddg.gg/'
        const target = '_blank'
        const type = 'submit'
        // define button
        const Link = Object.assign(
            { propsData: { tag: 'a', href, target, type } },
            Button
        )
        // define button
        const Btn = Object.assign(
            { propsData: { href, target, type } },
            Button
        )
        // create view-models and mount them
        const vmLink = new Vue(Link)
        const vmBtn = new Vue(Btn)
        vmLink.$mount()
        vmBtn.$mount()
        // href check
        expect(vmLink.$el.href).toBe(href)
        expect(!vmBtn.$el.href).toBe(true)
        // target check
        expect(vmLink.$el.target).toBe(target)
        expect(!vmBtn.$el.target).toBe(true)
        // type check
        expect(!vmLink.$el.type).toBe(true)
        expect(vmBtn.$el.type).toBe(type)
    })

    // TODO: to test to check how is better
    it('react at click event', () => {
        // define button
        const Btn = Object.assign(
            { propsData: { } },
            Button
        )
        // create view-models and mount them
        const vm = new Vue(Btn)
        vm.$mount()
        vm.$on('click', (ev) => {
            expect(ev instanceof MouseEvent).toBe(true)
        })
        // create and dispatchEvent
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        })
        vm.$el.dispatchEvent(event)
    })
})
