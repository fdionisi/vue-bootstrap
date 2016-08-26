/*!
 * VueBootstrap.js v0.1.0
 * (c) 2016-2016 Federico Dionisi
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueBootstrap = global.VueBootstrap || {})));
}(this, (function (exports) { 'use strict';

    function interopDefault(ex) {
    	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var index = createCommonjsModule(function (module) {
    var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;

    module.exports = function mergeJSXProps(objs) {
      return objs.reduce(function (a, b) {
        var aa, bb, key, nestedKey;
        for (key in b) {
          aa = a[key];
          bb = b[key];
          if (aa && nestRE.test(key)) {
            if (key === 'on' || key === 'nativeOn' || key === 'hook') {
              for (nestedKey in bb) {
                aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey]);
              }
            } else if (Array.isArray(aa)) {
              a[key] = aa.concat(bb);
            } else if (Array.isArray(bb)) {
              a[key] = [aa].concat(bb);
            } else {
              for (nestedKey in bb) {
                aa[nestedKey] = bb[nestedKey];
              }
            }
          } else {
            a[key] = b[key];
          }
        }
        return a;
      }, {});
    };

    function mergeFn(a, b) {
      return function () {
        a.apply(this, arguments);
        b.apply(this, arguments);
      };
    }
    });

    var _mergeJSXProps = interopDefault(index);

    var SIZES = ['sm', 'md', 'lg'];

    var VARIANTS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];
    var BUTTON_VARIANTS = VARIANTS.concat('link');

    function inEnum() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return function (val) {
            return args.includes(val);
        };
    }

    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    var BUTTON_TAG = ['button', 'a', 'input'];
    var BUTTON_TYPES = ['button', 'reset', 'submit'];

    var Btn = {
        name: 'btn',
        props: {
            active: {
                type: Boolean,
                default: false
            },
            block: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            outline: Boolean,
            href: String,
            size: {
                validator: inEnum.apply(undefined, toConsumableArray(SIZES)),
                default: 'md'
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(BUTTON_VARIANTS)),
                default: 'secondary'
            },
            tag: {
                validator: inEnum.apply(undefined, BUTTON_TAG),
                default: 'button'
            },
            target: {
                type: String,
                default: ''
            },
            text: String,
            type: {
                validator: inEnum.apply(undefined, BUTTON_TYPES),
                default: 'button'
            }
        },
        computed: {
            className: function className() {
                var _ref;

                return _ref = {
                    btn: true,
                    active: this.disabled ? false : this.active,
                    disabled: this.tag === 'a' && this.disabled
                }, defineProperty(_ref, 'btn-' + this.variant + (this.variant !== 'link' && this.outline && '-outline' || ''), true), defineProperty(_ref, 'btn-' + this.size, this.size !== 'md'), defineProperty(_ref, 'btn-block', this.block), _ref;
            }
        },
        render: function render(h) {
            var Tag = this.tag;
            var attrs = this.tag === 'button' ? this._buttonAttrs() : this.tag === 'a' ? this._linkAttrs() : this._inputAttrs();

            return h(
                Tag,
                _mergeJSXProps([{
                    on: {
                        click: this.clicked
                    },
                    'class': this.className }, { attrs: attrs }]),
                [this.$slots.default, this.text]
            );
        },

        methods: {
            _buttonAttrs: function _buttonAttrs() {
                return { 'aria-pressed': this.active, type: this.type, disabled: this.disabled };
            },
            _linkAttrs: function _linkAttrs() {
                return { 'aria-pressed': this.active, href: this.href || '#', target: this.target || undefined, role: 'button' };
            },
            _inputAttrs: function _inputAttrs() {
                return { 'aria-pressed': this.active, type: this.type, disabled: this.disabled, value: this.text };
            },
            clicked: function clicked(ev) {
                this.$emit('click', ev);
            }
        }
    };

    function findParent(target) {
        var el = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return target === el ? true : !!el.parentElement && findParent(target, el.parentElement);
    }

    var DropdownMenu = {
        name: 'dropdown-menu',
        props: {
            options: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            tag: {
                type: String,
                default: 'a'
            },
            title: String
        },
        data: function data() {
            return {
                visible: false
            };
        },

        methods: {
            _renderLink: function _renderLink(h, item) {
                var on = {};

                if (item.click) on.click = !item.disabled ? item.click : function (ev) {
                    return ev.preventDefault();
                };

                return h(
                    'a',
                    _mergeJSXProps([{
                        attrs: {
                            href: item.href || '#'
                        },
                        'class': { 'dropdown-item': true, disabled: item.disabled }
                    }, { on: on }]),
                    [item.text]
                );
            },
            _renderDivider: function _renderDivider(h) {
                return h(
                    'div',
                    { 'class': 'dropdown-divider' },
                    []
                );
            },
            _renderTitle: function _renderTitle(h) {
                return h(
                    'h6',
                    { 'class': 'dropdown-header' },
                    [this.title]
                );
            },
            _generateListener: function _generateListener() {
                var _this = this;

                return function (_ref) {
                    var target = _ref.target;

                    !findParent(_this.$el, target) && _this.toggle();
                };
            },
            toggle: function toggle() {
                this.visible = !this.visible;
            }
        },
        created: function created() {
            var _this2 = this;

            this.__body__ = document.body;
            this.$on('show', function () {
                if (!_this2.__ev_listener__) _this2.__ev_listener__ = _this2._generateListener();

                setTimeout(function () {
                    _this2.__body__.addEventListener('click', _this2.__ev_listener__);
                }, 100);
            });
            this.$on('hide', function () {
                if (!(_this2.__body__ && _this2.__ev_listener__)) return;

                _this2.__body__.removeEventListener('click', _this2.__ev_listener__);
                delete _this2.__ev_listener__;
            });
        },
        destroyed: function destroyed() {
            this.$off('show');
            this.$off('hide');
        },
        render: function render(h) {
            var children = [];

            if (this.title) children.push(this._renderTitle(h));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;
                    children.push(item.divider ? this._renderDivider(h) : this._renderLink(h, item));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return h(
                'div',
                {
                    directives: [{
                        name: 'show',
                        value: this.visible
                    }],
                    attrs: {
                        'aria-label': this.id
                    },
                    style: { display: 'block' },
                    'class': 'dropdown-menu' },
                [children]
            );
        },

        watch: {
            visible: function visible(val, oldVal) {
                if (val === oldVal) return;

                this.$emit(val ? 'show' : 'hide');
            }
        },

        events: {
            show: function show() {
                if (!this.__body__) this.__body__ = document.body;

                if (!this.__ev_listener__) this.__ev_listener__ = this._generateListener();

                this.__body__.addEventLisener('click', this.__ev_listener__);
            },
            hide: function hide() {
                if (!(this.__body__ && this.__ev_listener__)) return;

                this.__body__.removeEventLisener('click', this.__ev_listener__);
                delete this.__ev_listener__;
            }
        }
    };

    var BtnDropdown = {
        name: 'btn-dropdown',
        props: {
            dropup: {
                type: Boolean,
                default: false
            },
            split: Function,
            title: String,
            options: {
                type: Array,
                twoWay: true,
                default: function _default() {
                    return [];
                }
            },
            size: {
                validator: inEnum.apply(undefined, toConsumableArray(SIZES)),
                default: 'md'
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(BUTTON_VARIANTS)),
                default: 'secondary'
            },
            text: String
        },
        data: function data() {
            return {
                visible: false
            };
        },

        computed: {
            className: function className() {
                return {
                    'btn-group': true,
                    dropup: this.dropup
                };
            },
            visibility: function visibility() {
                var dropdown = this.$refs.dropdown || {};
                return dropdown.visible;
            }
        },
        methods: {
            _renderSplitted: function _renderSplitted() {
                var h = this.$createElement;
                return [h(
                    Btn,
                    {
                        on: {
                            click: this.btnClick
                        },
                        attrs: {
                            variant: this.variant,
                            size: this.size }
                    },
                    [this.$slots.default, this.text]
                ), this._renderButton(this.toggle, h(
                    'span',
                    { 'class': 'sr-only' },
                    ['Toggle Dropdown']
                ))];
            },
            _renderButton: function _renderButton(event, children) {
                var h = this.$createElement;

                return h(
                    Btn,
                    {
                        on: {
                            click: event
                        },

                        'class': 'dropdown-toggle',
                        attrs: { 'data-toggle': 'dropdown',
                            'aria-haspopup': 'true',
                            'aria-expanded': this.visibility,
                            active: this.visibility,
                            variant: this.variant,
                            size: this.size }
                    },
                    [children]
                );
            },
            _renderDropdownMenu: function _renderDropdownMenu() {
                var h = this.$createElement;

                return h(
                    DropdownMenu,
                    {
                        ref: 'dropdown',
                        on: {
                            show: this._show,
                            hide: this._hide
                        },
                        attrs: {
                            options: this.options,
                            title: this.title }
                    },
                    []
                );
            },
            btnClick: function btnClick() {
                if (this.split) this.split();else this.toggle();
            },
            toggle: function toggle() {
                this.$refs.dropdown.toggle();
            },
            _show: function _show() {
                var _this = this;

                this.visible = true;
                this.$nextTick(function () {
                    return _this.$emit('show');
                });
            },
            _hide: function _hide() {
                var _this2 = this;

                this.visible = false;
                this.$nextTick(function () {
                    return _this2.$emit('hide');
                });
            }
        },
        render: function render(h) {
            var children = [this._renderDropdownMenu()];

            if (this.split) children.unshift.apply(children, toConsumableArray(this._renderSplitted()));else children.unshift(this._renderButton(this.btnClick, [this.$slots.default, this.text]));

            return h(
                'div',
                {
                    attrs: { role: 'group' },
                    'class': this.className },
                [children]
            );
        }
    };

    var BtnGroup = {
        name: 'btn-group',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: String,
            options: {
                type: Array,
                twoWay: true,
                default: function _default() {
                    return [];
                }
            },
            size: {
                validator: inEnum.apply(undefined, toConsumableArray(SIZES)),
                default: 'md'
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(BUTTON_VARIANTS)),
                default: 'secondary'
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            className: function className() {
                return {
                    'btn-group': !this.vertical,
                    'btn-group-vertical': this.vertical
                };
            }
        },
        render: function render(h) {
            var children = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var button = _step.value;
                    children.push(button.dropdown ? this._renderDropdown(h, button) : this._renderButton(h, button));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return h(
                'div',
                { 'class': this.className, attrs: { 'aria-label': this.name, role: 'group' }
                },
                [children]
            );
        },

        methods: {
            buttonClass: function buttonClass(option) {
                var _ref;

                return _ref = {
                    btn: true,
                    active: option.active,
                    disabled: option.disabled || this.disabled
                }, defineProperty(_ref, 'btn-' + this.size, this.size !== 'md'), defineProperty(_ref, 'btn-' + (option.variant || this.variant), true), _ref;
            },
            _renderDropdown: function _renderDropdown(h, _ref2) {
                var title = _ref2.title;
                var text = _ref2.text;
                var options = _ref2.options;

                return h(
                    'btn-group',
                    {
                        attrs: {
                            'prop-callback': this.trigger,
                            'prop-title': title,
                            'prop-text': text,
                            'prop-options': options,
                            'prop-size': this.size }
                    },
                    []
                );
            },
            _renderButton: function _renderButton(h, button) {
                var _button$type = button.type;
                var type = _button$type === undefined ? 'button' : _button$type;
                var _button$text = button.text;
                var text = _button$text === undefined ? '' : _button$text;
                var active = button.active;
                var disabled = button.disabled;
                var size = button.size;
                var variant = button.variant;

                size = size || this.size;

                return h(
                    Btn,
                    {
                        attrs: {
                            type: type,

                            'prop-active': active,
                            'prop-disabled': disabled,
                            'prop-size': size,
                            'prop-variant': variant },
                        'class': button.class,
                        on: {
                            click: this.trigger
                        }
                    },
                    [text]
                );
            },
            trigger: function trigger(button) {
                this.callback && this.callback(button);

                this.$emit('press', button);
            }
        }
    };

    var BtnToolbar = {
        name: 'btn-toolbar',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: String,
            groups: {
                type: Array,
                required: true,
                twoWay: true,
                default: []
            },
            size: {
                validator: inEnum.apply(undefined, toConsumableArray(SIZES)),
                default: 'md'
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(BUTTON_VARIANTS)),
                default: 'secondary'
            }
        },
        methods: {
            buttonClass: function buttonClass(option) {
                var _ref;

                return _ref = {
                    btn: true,
                    active: option.active,
                    disabled: option.disabled || this.disabled
                }, defineProperty(_ref, 'btn-' + this.size, this.size !== 'md'), defineProperty(_ref, 'btn-' + (option.variant || this.variant), true), _ref;
            },
            trigger: function trigger(button) {
                this.callback && this.callback(button);

                this.$emit('press', button);
            }
        },
        render: function render(h) {
            var _this = this;

            var children = this.groups.map(function (_ref2) {
                var name = _ref2.name;
                var callback = _ref2.callback;
                var disabled = _ref2.disabled;
                var options = _ref2.options;
                return h(
                    BtnGroup,
                    {
                        attrs: {
                            'prop-name': name,
                            'prop-callback': callback,
                            'prop-disabled': disabled,
                            'prop-options': options,
                            variant: _this.variant,
                            size: _this.size }
                    },
                    []
                );
            });

            return h(
                'div',
                { 'class': 'btn-toolbar', attrs: { role: 'toolbar', 'aria-label': this.name }
                },
                [children]
            );
        }
    };

    var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

    var Cols = {
        name: 'cols',
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            xs: Number,
            sm: Number,
            md: Number,
            lg: Number,
            xsHidden: {
                type: Boolean,
                default: false
            },
            smHidden: {
                type: Boolean,
                default: false
            },
            mdHidden: {
                type: Boolean,
                default: false
            },
            lgHidden: {
                type: Boolean,
                default: false
            },
            xsOffset: Number,
            smOffset: Number,
            mdOffset: Number,
            lgOffset: Number,
            xsPush: Number,
            smPush: Number,
            mdPush: Number,
            lgPush: Number,
            xsPull: Number,
            smPull: Number,
            mdPull: Number,
            lgPull: Number
        },
        computed: {
            className: function className() {
                var _this = this;

                var classes = [];
                var elementProps = this.$options.props;
                DEVICE_SIZES.forEach(function (size) {
                    var popProp = function popProp(propSuffix, modifier) {
                        var propName = '' + size + propSuffix;
                        var propValue = _this[propName];

                        if (propValue) classes.push('col-' + size + modifier + '-' + propValue);
                    };

                    popProp('', '');
                    popProp('Offset', '-offset');
                    popProp('Push', '-push');
                    popProp('Pull', '-pull');

                    var hiddenPropName = size + 'Hidden';
                    if (_this[hiddenPropName]) classes.push('hidden-' + size);
                });

                return classes;
            }
        },
        render: function render(h) {
            var Component = this.tag;
            return h(
                Component,
                { 'class': this.className },
                [this.$slots.default]
            );
        }
    };

    var FormControl = {
        name: 'form-control',
        props: {
            id: String,
            note: String,
            placeholder: String,
            multiple: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            status: {
                type: String
            },
            title: String,
            value: {
                type: null,
                twoWay: true
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        data: function data() {
            return {
                hiddenValue: null
            };
        },

        computed: {
            className: function className() {
                return defineProperty({
                    'form-control': true
                }, 'form-control-' + this.status, this.status);
            }
        },
        methods: {
            _blur: function _blur(ev) {
                this.$emit('blur', ev, this);
            },
            _focus: function _focus(ev) {
                this.$emit('focus', ev, this);
            },
            _keydown: function _keydown(ev) {
                this.$emit('keydown', ev, this);
            },
            _keyup: function _keyup(ev) {
                this._updateValue(ev);this.$emit('keyup', ev, this);
            },
            _renderElement: function _renderElement() {
                switch (this.type) {
                    case 'textarea':
                        return this._renderTextarea();
                    case 'select':
                        return this._renderSelect();
                    case 'radio':
                    case 'checkbox':
                        return this._renderRadioCheck();
                    default:
                        return this._renderInput();
                }
            },
            _renderInput: function _renderInput() {
                var h = this.$createElement;

                return h(
                    'input',
                    {
                        'class': 'form-control',
                        on: {
                            blur: this._blur,
                            focus: this._focus,
                            keydown: this._keydown,
                            keyup: this._keyup
                        },
                        attrs: {
                            type: this.type,
                            id: this.id,
                            placeholder: this.placeholder }
                    },
                    []
                );
            },
            _renderLabel: function _renderLabel() {
                var h = this.$createElement;

                return h(
                    'label',
                    {
                        attrs: { 'for': this.id }
                    },
                    [this.title]
                );
            },
            _renderNote: function _renderNote() {
                var h = this.$createElement;

                return h(
                    'small',
                    { 'class': 'text-muted' },
                    [this.note]
                );
            },
            _renderSelect: function _renderSelect() {
                var h = this.$createElement;

                var options = this.options || [];

                return h(
                    'select',
                    {
                        on: {
                            change: this._updateValue
                        },
                        'class': 'form-control', attrs: { multiple: this.multiple }
                    },
                    [options.map(function (_ref2) {
                        var text = _ref2.text;
                        var value = _ref2.value;
                        return h(
                            'option',
                            {
                                attrs: { value: value }
                            },
                            [text]
                        );
                    })]
                );
            },
            _renderTextarea: function _renderTextarea() {
                var h = this.$createElement;

                return h(
                    'textarea',
                    {
                        on: {
                            keyup: this._updateValue
                        },
                        'class': 'form-control', directives: [{
                            name: 'model',
                            value: this.hiddenValue
                        }]
                    },
                    []
                );
            },
            _renderRadioCheck: function _renderRadioCheck() {
                var h = this.$createElement;
                return h();
            },
            _updateValue: function _updateValue(_ref3) {
                var target = _ref3.target;

                var value = target.value;
                this.$emit('input', value);
            }
        },
        render: function render(h) {
            return h(
                'fieldset',
                { 'class': 'form-group' },
                [this.title && this._renderLabel(), this._renderElement(), this.note && this._renderNote()]
            );
        }
    };

    exports.Btn = Btn;
    exports.BtnGroup = BtnGroup;
    exports.BtnDropdown = BtnDropdown;
    exports.BtnToolbar = BtnToolbar;
    exports.Cols = Cols;
    exports.DropdownMenu = DropdownMenu;
    exports.FormControl = FormControl;

    Object.defineProperty(exports, '__esModule', { value: true });

})));