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

    var SIZES = ['sm', 'md', 'lg'];

    var STATUS_VARIANTS = ['success', 'info', 'warning', 'danger'];
    var VARIANTS = STATUS_VARIANTS.concat('primary', 'secondary');
    var BUTTON_VARIANTS = VARIANTS.concat('link');

    var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

    var colsClass = function colsClass() {
        var ctx = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var opposite = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        return DEVICE_SIZES.reduce(function (classes, size) {
            var popProp = function popProp(propSuffix, modifier) {
                var propName = '' + size + propSuffix;
                var propValue = opposite ? 12 - ctx[propName] : ctx[propName];

                if (propValue) classes.push('col-' + size + modifier + '-' + propValue);
            };

            popProp('', '');
            popProp('Offset', '-offset');
            popProp('Push', '-push');
            popProp('Pull', '-pull');

            var hiddenPropName = size + 'Hidden';
            if (ctx[hiddenPropName]) classes.push('hidden-' + size);

            return classes;
        }, []);
    };

    var emitEvent = function emitEvent(eventName, ctx) {
        for (var _len = arguments.length, extraArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            extraArgs[_key - 2] = arguments[_key];
        }

        return function (ev) {
            return ctx.$emit.apply(ctx, [eventName, ev, ctx].concat(extraArgs));
        };
    };

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

    var CloseBtn = {
        functional: true,
        props: {
            label: {
                type: String,
                default: 'Close'
            },
            clicked: {
                type: Function,
                default: function _default() {
                    return function () {};
                }
            }
        },
        render: function render(h, _ref) {
            var props = _ref.props;
            return h(
                'button',
                {
                    on: {
                        click: props.clicked
                    },
                    attrs: {
                        'aria-label': props.label,
                        type: 'button'
                    },
                    'class': 'close' },
                [h(
                    'span',
                    {
                        attrs: { 'aria-hidden': 'true' }
                    },
                    ['×']
                )]
            );
        }
    };

    var Alert = {
        name: 'alert',
        props: {
            dismissible: {
                type: Boolean,
                default: true
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(STATUS_VARIANTS)),
                default: 'success'
            }
        },
        render: function render(h) {
            var _className;

            var className = (_className = {
                alert: true
            }, defineProperty(_className, 'alert-' + this.variant, true), defineProperty(_className, 'alert-dismissible', this.dismissible), _className);

            return h(
                'div',
                {
                    attrs: {
                        role: 'alert'
                    },
                    'class': className },
                [this.dismissible && h(
                    CloseBtn,
                    {
                        attrs: { clicked: emitEvent('close', this) }
                    },
                    []
                ), this.$slots.default]
            );
        }
    };

    var Crumb = {
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
                default: function _default() {
                    return function () {};
                }
            }
        },
        render: function render(h, _ref) {
            var props = _ref.props;

            var className = ['breadcrumb-item'];

            if (props.isLast) className.push('active');

            return h(
                'li',
                { 'class': className },
                [h(
                    'a',
                    {
                        on: {
                            click: props.clicked
                        },
                        attrs: { href: props.href || '#' }
                    },
                    [props.text]
                )]
            );
        }
    };

    var Breadcrumb = {
        name: 'breadcrumb',
        props: {
            list: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        render: function render(h) {
            var _this = this;

            var lastPosition = this.list.length - 1;

            return h(
                'ol',
                { 'class': 'breadcrumb' },
                [this.list.map(function (item, index) {
                    return h(
                        Crumb,
                        {
                            attrs: {
                                disabled: item.disabled,
                                'is-last': index === lastPosition,
                                clicked: emitEvent('click', _this, item, index),
                                href: item.href,
                                text: item.text }
                        },
                        []
                    );
                })]
            );
        }
    };

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
                }, defineProperty(_ref, 'btn-' + (this.variant !== 'link' && this.outline && 'outline-' || '') + this.variant, true), defineProperty(_ref, 'btn-' + this.size, this.size !== 'md'), defineProperty(_ref, 'btn-block', this.block), _ref;
            }
        },
        render: function render(h) {
            var Component = this.tag;
            var attrs = this.tag === 'button' ? this._buttonAttrs() : this.tag === 'a' ? this._linkAttrs() : this._inputAttrs();

            return h(
                Component,
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

    var findParent = function findParent(target) {
        var el = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        return target === el ? true : !!el.parentElement && findParent(target, el.parentElement);
    };

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

                var className = {
                    'dropdown-item': true,
                    disabled: item.disabled
                };

                return h(
                    'a',
                    _mergeJSXProps([{
                        attrs: {
                            href: item.href || '#'
                        },
                        'class': className
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
                        attrs: { 'aria-haspopup': 'true',
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
                    BtnDropdown,
                    {
                        attrs: {
                            callback: this.trigger,
                            title: title,
                            text: text,
                            options: options,
                            size: this.size }
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

                            active: active,
                            disabled: disabled,
                            size: size,
                            variant: variant },
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
                            name: name,
                            callback: callback,
                            disabled: disabled,
                            options: options,
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

    var Carousel = {
        props: {
            indicators: {
                type: Boolean,
                default: true
            },
            controls: {
                type: Boolean,
                default: true
            },
            list: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        data: function data() {
            return {
                position: 0
            };
        },

        methods: {
            slideTo: function slideTo() {
                return function () {};
            },
            slidePosition: function slidePosition() {
                return function () {};
            },
            _renderIndicators: function _renderIndicators() {
                var _this = this;

                var h = this.$createElement;

                var renderIndicator = function renderIndicator(item, index) {
                    return h(
                        "li",
                        {
                            on: {
                                click: _this.slideTo(index)
                            },
                            "class": _this.position === index && 'active' },
                        []
                    );
                };

                return h(
                    "ol",
                    { "class": "carousel-indicators" },
                    [this.list.map(renderIndicator)]
                );
            },
            _renderItemCaption: function _renderItemCaption(caption) {
                var h = this.$createElement;

                return h(
                    "div",
                    { "class": "carousel-caption" },
                    [h(
                        "h3",
                        null,
                        [caption.title]
                    ), h(
                        "p",
                        null,
                        [caption.desc]
                    )]
                );
            },
            _renderItem: function _renderItem(item, index) {
                var h = this.$createElement;

                if (typeof item === 'string') item = {
                    img: item
                };

                var className = {
                    'carousel-item': true,
                    active: index === this.position
                };

                return h(
                    "div",
                    { "class": "carousel-item" },
                    [h(
                        "img",
                        {
                            attrs: { src: item.img, alt: item.title }
                        },
                        []
                    ), item.caption && this._renderItemCaption(item.caption)]
                );
            },
            _renderLeftControl: function _renderLeftControl() {
                return this._renderControl('left');
            },
            _renderRightControl: function _renderRightControl() {
                return this._renderControl('right');
            },
            _renderControl: function _renderControl(position) {
                var h = this.$createElement;

                var className = defineProperty({
                    'carousel-control': true
                }, position, true);

                var direction = position === 'left' ? 'prev' : 'next';

                return h(
                    "a",
                    {
                        "class": className,
                        attrs: { href: "#"
                        },
                        on: {
                            click: this.slidePosition(direction)
                        }
                    },
                    [h(
                        "span",
                        { "class": "icon-" + direction, attrs: { "aria-hidden": "true" }
                        },
                        []
                    ), h(
                        "span",
                        { "class": "sr-only" },
                        [position === 'left' ? 'Previous' : 'Next']
                    )]
                );
            }
        },
        render: function render(h) {
            return h(
                "div",
                { "class": "carousel slide" },
                [this.indicators && this._renderIndicators(), h(
                    "div",
                    { "class": "carousel-inner", attrs: { role: "listbox" }
                    },
                    [this.list.map(this._renderItem)]
                ), this.controls && this._renderLeftControl(), this.controls && this._renderRightControl()]
            );
        }
    };

    var Cols = {
        name: 'cols',
        functional: true,
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
        render: function render(h, _ref) {
            var children = _ref.children;
            var props = _ref.props;

            var Component = props.tag;

            var className = colsClass(props);

            return h(
                Component,
                { 'class': className },
                [children]
            );
        }
    };

    var Forms = {
        name: 'forms',
        props: {
            inline: {
                type: Boolean,
                default: false
            }
        },
        render: function render(h) {
            var className = {
                'form-inline': this.inline
            };

            return h(
                'form',
                {
                    'class': className,
                    on: {
                        submit: emitEvent('submit', this),
                        reset: emitEvent('reset', this)
                    }
                },
                [this.$slots.default]
            );
        }
    };

    var FormGroup = {
        name: 'form-group',
        props: {
            id: String,
            inline: {
                type: Boolean,
                default: false
            },
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
            row: null,
            size: {
                type: String,
                default: 'md'
            },
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
                var _ref;

                return _ref = {
                    'form-control': true
                }, defineProperty(_ref, 'form-control-' + this.status, this.status), defineProperty(_ref, 'form-control-' + this.size, this.size !== 'md'), _ref;
            }
        },
        methods: {
            _renderElement: function _renderElement() {
                switch (this.type) {
                    case 'slot':
                        return this.$slots.default;
                    case 'static':
                        return this._renderStatic();
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
            _renderStatic: function _renderStatic() {
                return h(
                    'p',
                    {
                        on: {
                            click: this._click
                        },
                        'class': 'form-control-static' },
                    [this.placeholder]
                );
            },
            _renderInput: function _renderInput() {
                var h = this.$createElement;

                return this.row ? this._renderRowInput() : this._renderNormalInput();
            },
            _renderRowInput: function _renderRowInput() {
                var h = this.$createElement;

                return h(
                    'div',
                    { 'class': colsClass(this.row) },
                    [this._renderNormalInput()]
                );
            },
            _renderNormalInput: function _renderNormalInput() {
                var _this = this;

                var h = this.$createElement;

                var emitKeyup = emitEvent('keyup', this);
                var onKeyup = function onKeyup(ev) {
                    _this._updateValue(ev);
                    emitKeyup(ev);
                };

                return h(
                    'input',
                    {
                        'class': 'form-control',
                        on: {
                            click: emitEvent('click', this),
                            blur: emitEvent('blur', this),
                            focus: emitEvent('focus', this),
                            keydown: emitEvent('keydown', this),
                            keyup: onKeyup
                        },
                        attrs: {
                            type: this.type,
                            id: this.id,
                            placeholder: this.placeholder }
                    },
                    []
                );
            },
            _renderTitle: function _renderTitle() {
                var h = this.$createElement;

                switch (this.type) {
                    case 'radio':
                    case 'checkbox':
                        return h(
                            'legend',
                            null,
                            [this.title]
                        );
                    default:
                        var className = [];

                        if (this.row) className = ['col-form-label'].concat(colsClass(this.row, true));

                        return h(
                            'label',
                            { 'class': className, attrs: { 'for': this.id }
                            },
                            [this.title]
                        );
                }
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
                var _this2 = this;

                var h = this.$createElement;

                var options = this.options || [];

                var emitSelect = emitEvent('select', this);
                var onSelect = function onSelect(ev) {
                    _this2._updateValue(ev);
                    emitSelect(ev);
                };

                return h(
                    'select',
                    {
                        on: {
                            click: emitEvent('click', this),
                            select: onSelect
                        },

                        'class': 'form-control',
                        attrs: { multiple: this.multiple }
                    },
                    [options.map(this._renderOption)]
                );
            },
            _renderOption: function _renderOption(_ref2) {
                var text = _ref2.text;
                var value = _ref2.value;

                var h = this.$createElement;

                return h(
                    'option',
                    {
                        on: {
                            click: emitEvent('option-click', this)
                        },
                        attrs: { value: value }
                    },
                    [text]
                );
            },
            _renderTextarea: function _renderTextarea() {
                var _this3 = this;

                var h = this.$createElement;

                var emitKeyup = emitEvent('keyup', this);
                var onKeyup = function onKeyup(ev) {
                    _this3._updateValue(ev);
                    emitKeyup(ev);
                };

                return h(
                    'textarea',
                    {
                        on: {
                            click: emitEvent('click', this),
                            blur: emitEvent('blur', this),
                            focus: emitEvent('focus', this),
                            keydown: emitEvent('keydown', this),
                            keyup: onKeyup
                        },

                        'class': 'form-control' },
                    []
                );
            },
            _renderRadioCheck: function _renderRadioCheck() {
                var _this4 = this;

                var h = this.$createElement;

                var emitClick = emitEvent('click', this);
                var onClick = function onClick(ev) {
                    _this4._updateValue(ev);
                    emitClick(ev);
                };

                return this.options.map(function (option) {
                    return h(
                        'div',
                        { 'class': _this4._radioCheckClass(option) },
                        [h(
                            'label',
                            { 'class': _this4.formCheck ? 'form-check-label' : '' },
                            [h(
                                'input',
                                {
                                    on: {
                                        click: onClick
                                    },

                                    'class': _this4.formCheck ? 'form-check-input' : '',
                                    attrs: { type: _this4.type,
                                        name: _this4.id,
                                        id: option.id,
                                        value: option.value,
                                        checkbox: option.value === _this4.value }
                                },
                                []
                            ), option.text]
                        )]
                    );
                });
            },
            _radioCheckClass: function _radioCheckClass(option) {
                var _ref3;

                return _ref3 = {}, defineProperty(_ref3, this.type, !this.inline && !this.formCheck), defineProperty(_ref3, this.type + '-inline', this.inline && !this.formCheck), defineProperty(_ref3, 'form-check', this.formCheck && !this.inline), defineProperty(_ref3, 'form-check-inline', this.formCheck && this.inline), defineProperty(_ref3, 'disabled', option.disabled), _ref3;
            },
            _updateValue: function _updateValue(_ref4) {
                var target = _ref4.target;

                var value = target.value;
                this.$emit('input', value);
            }
        },
        render: function render(h) {
            return h(
                'fieldset',
                { 'class': 'form-group' },
                [this.title && this._renderTitle(), this._renderElement(), this.note && this._renderNote()]
            );
        }
    };

    var InputGroup = {
        name: 'input-group',
        props: {
            id: String,
            note: String,
            placeholder: String,
            beforeAddons: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            afterAddons: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
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
            _renderAddon: function _renderAddon(addon) {
                var h = this.$createElement;
                return h(
                    'span',
                    { 'class': 'input-group-addon' },
                    [addon]
                );
            },
            _renderInput: function _renderInput() {
                var h = this.$createElement;

                return h(
                    'input',
                    {
                        'class': this.className,
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
            }
        },
        render: function render(h) {
            return h(
                'div',
                { 'class': 'input-group' },
                [this.beforeAddons.map(this._renderAddon), this._renderInput(), this.afterAddons.map(this._renderAddon)]
            );
        }
    };

    var Jumbotron = {
        name: 'jumbotron',
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            fluid: {
                type: Boolean,
                default: false
            }
        },
        render: function render(h, _ref) {
            var props = _ref.props;
            var children = _ref.children;

            var Component = props.tag;

            var className = {
                'jumbotron': true,
                'jumbotron-fluid': props.fluid
            };

            return h(
                Component,
                { 'class': className },
                [children]
            );
        }
    };

    var listItemRenderer = function listItemRenderer(h, ctx) {
        return function (item) {
            var _className;

            var Component = ctx.action ? 'button' : 'ul';

            var variant = item.variant || ctx.variant;

            var className = (_className = {
                'list-group-item': true,
                'list-group-item-action': ctx.action
            }, defineProperty(_className, 'list-group-item-' + variant, variant), defineProperty(_className, 'disabled', item.disabled), _className);

            return h(
                Component,
                {
                    'class': className,
                    attrs: { 'data-value': item.value
                    },
                    on: {
                        click: ctx.emitClick
                    }
                },
                [item.heading && h(
                    'h5',
                    { 'class': 'list-group-item-heading' },
                    [item.heading]
                ), item.text && h(
                    'p',
                    { 'class': 'list-group-item-text' },
                    [item.text]
                ), item.children]
            );
        };
    };

    var ListGroup = {
        name: 'list-group',
        props: {
            variant: String,
            action: Boolean,
            list: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            tag: {
                type: String,
                default: 'ul'
            }
        },
        methods: {
            emitClick: function emitClick(ev) {
                var _ev$target = ev.target;
                var target = _ev$target === undefined ? {} : _ev$target;
                var _target$dataset = target.dataset;
                var dataset = _target$dataset === undefined ? {} : _target$dataset;


                dataset.value && this.$emit('click', ev, dataset.value);
            }
        },
        render: function render(h) {
            var Component = this.action ? 'div' : this.tag;

            return h(
                Component,
                { 'class': 'list-group' },
                [this.list.map(listItemRenderer(h, this))]
            );
        }
    };

    var NavItem = {
        name: 'nav-item',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            isActive: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'a'
            },
            options: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            dropdown: {
                type: Boolean,
                default: false
            },
            visible: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            toggle: function toggle(ev) {
                ev.preventDefault();

                this.$refs.dropdown.toggle();
            },
            _show: function _show(ev) {
                var _this = this;

                this.visible = true;
                this.$nextTick(function () {
                    return _this.$emit('show', ev, _this);
                });
            },
            _hide: function _hide(ev) {
                var _this2 = this;

                this.visible = false;
                this.$nextTick(function () {
                    return _this2.$emit('hide', ev, _this2);
                });
            }
        },
        render: function render(h) {
            var NavItem = this.tag;

            var Wrapper = 'li';

            var wrapperClassName = {
                'nav-item': true,
                dropdown: this.dropdown
            };

            var className = {
                'nav-link': true,
                disabled: this.disabled,
                active: this.isActive
            };

            var event = this.dropdown ? this.toggle : emitEvent('click', this);

            return h(
                Wrapper,
                { 'class': wrapperClassName },
                [h(
                    NavItem,
                    {
                        attrs: {
                            href: this.href || '#'
                        },
                        on: {
                            click: event
                        },

                        'class': className },
                    [this.$slots.default]
                ), this.dropdown && h(
                    DropdownMenu,
                    {
                        ref: 'dropdown',
                        attrs: { options: this.options,

                            active: this.visibility,
                            variant: this.variant,
                            size: this.size },
                        on: {
                            click: emitEvent('click', this)
                        },

                        'class': 'dropdown-toggle' },
                    []
                )]
            );
        }
    };

    var Navs = {
        name: 'navs',
        props: {
            main: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: false
            },
            tabs: {
                type: Boolean,
                default: false
            },
            pills: {
                type: Boolean,
                default: false
            },
            stacked: {
                type: Boolean,
                default: false
            },
            list: {
                type: Array,
                default: function _default() {
                    return [];
                }
            },
            tag: {
                type: String,
                default: 'ul'
            }
        },
        render: function render(h) {
            var Component = this.main ? 'nav' : this.tag;

            var className = {
                nav: true,
                'nav-inline': this.inline && !(this.tabs && this.pills),
                'nav-tabs': this.tabs && !(this.inline && this.pills),
                'nav-pills': this.pills,
                'nav-stacked': this.pills && this.stacked
            };

            return h(
                Component,
                { 'class': className },
                [this.list.map(function (item) {
                    return h(
                        NavItem,
                        {
                            attrs: {
                                disabled: item.disabled,
                                dropdown: item.dropdown,
                                options: item.options || [] }
                        },
                        [item.text]
                    );
                }), this.$slots.default]
            );
        }
    };

    var Navbar = {
        name: 'navbar',
        props: {
            bg: {
                type: String,
                default: 'faded'
            },
            luminosity: {
                type: String,
                default: 'light'
            },
            fullWidth: Boolean,
            fixedTop: Boolean,
            fixedBottom: Boolean,
            brand: {
                type: Object,
                default: function _default() {
                    return {};
                }
            },
            list: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        render: function render(h) {
            var _className;

            var className = (_className = {
                navbar: true,
                'navbar-full': this.fullWidth,
                'navbar-fixed-top': this.fixedTop,
                'navbar-fixed-bottom': !this.fixedTop && this.fixedBottom
            }, defineProperty(_className, 'navbar-' + this.luminosity, true), defineProperty(_className, 'bg-' + this.bg, true), _className);

            return h(
                'nav',
                { 'class': className },
                [this.brand.text && h(
                    'a',
                    { 'class': 'navbar-brand', on: {
                            click: emitEvent('brand-click', this)
                        },
                        attrs: { href: this.brand.href || '#' }
                    },
                    [this.brand.text]
                ), this.list.length && h(
                    Navs,
                    { 'class': 'navbar-nav', attrs: { list: this.list }
                    },
                    []
                ), this.$slots.default]
            );
        }
    };

    var ProgressBar = {
        name: 'progress-bar',
        functional: true,
        props: {
            striped: {
                type: Boolean,
                default: false
            },
            variant: {
                type: String,
                default: 'default'
            },
            value: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                required: true
            }
        },
        render: function render(h, _ref) {
            var _className;

            var props = _ref.props;

            var className = (_className = {
                progress: true
            }, defineProperty(_className, 'progress-' + props.variant, props.variant !== 'default'), defineProperty(_className, 'progress-striped', props.striped), _className);

            var fallbackStyle = {
                width: Math.round(props.value * 100 / props.max) + '%'
            };

            return h(
                'progress',
                { 'class': className, attrs: { value: props.value, max: props.max }
                },
                [h(
                    'div',
                    { 'class': 'progress' },
                    [h(
                        'span',
                        { 'class': 'progress-bar', style: fallbackStyle },
                        []
                    )]
                )]
            );
        }
    };

    var Tag = {
        name: 'tag',
        functional: true,
        props: {
            pill: {
                type: Boolean,
                default: false
            },
            variant: {
                validator: inEnum.apply(undefined, toConsumableArray(VARIANTS)),
                default: 'secondary'
            }
        },
        render: function render(h, ctx) {
            var props = ctx.props;
            var children = ctx.children;


            var className = defineProperty({
                tag: true,
                'tag-pill': props.pill
            }, 'tag-' + props.variant, true);

            return h(
                'span',
                { 'class': className },
                [children]
            );
        }
    };

    exports.Alert = Alert;
    exports.Breadcrumb = Breadcrumb;
    exports.Btn = Btn;
    exports.BtnGroup = BtnGroup;
    exports.BtnDropdown = BtnDropdown;
    exports.BtnToolbar = BtnToolbar;
    exports.Carousel = Carousel;
    exports.Cols = Cols;
    exports.DropdownMenu = DropdownMenu;
    exports.Forms = Forms;
    exports.FormGroup = FormGroup;
    exports.InputGroup = InputGroup;
    exports.Jumbotron = Jumbotron;
    exports.ListGroup = ListGroup;
    exports.Navbar = Navbar;
    exports.NavItem = NavItem;
    exports.Navs = Navs;
    exports.ProgressBar = ProgressBar;
    exports.Tag = Tag;

    Object.defineProperty(exports, '__esModule', { value: true });

})));