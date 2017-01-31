/*!
 * VueBootstrap.js v0.1.0
 * (c) 2016-2017 Federico Dionisi
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(factory((global.VueBootstrap = global.VueBootstrap || {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

    Vue = 'default' in Vue ? Vue['default'] : Vue;

    var SIZES = ['sm', 'md', 'lg'];

    var STATUS_VARIANTS = ['success', 'info', 'warning', 'danger'];
    var VARIANTS = STATUS_VARIANTS.concat('primary', 'secondary');
    var BUTTON_VARIANTS = VARIANTS.concat('link');

    var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

    function interopDefault(ex) {
    	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var inDOM = createCommonjsModule(function (module) {
    'use strict';

    module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    });

    var inDOM$1 = interopDefault(inDOM);


    var require$$0 = Object.freeze({
    	default: inDOM$1
    });

    var contains = createCommonjsModule(function (module) {
    'use strict';

    var canUseDOM = interopDefault(require$$0);

    var contains = function () {
      var root = canUseDOM && document.documentElement;

      return root && root.contains ? function (context, node) {
        return context.contains(node);
      } : root && root.compareDocumentPosition ? function (context, node) {
        return context === node || !!(context.compareDocumentPosition(node) & 16);
      } : function (context, node) {
        if (node) do {
          if (node === context) return true;
        } while (node = node.parentNode);

        return false;
      };
    }();

    module.exports = contains;
    });

    var contains$1 = interopDefault(contains);


    var require$$2 = Object.freeze({
      default: contains$1
    });

    var isWindow = createCommonjsModule(function (module) {
    'use strict';

    module.exports = function getWindow(node) {
      return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
    };
    });

    var isWindow$1 = interopDefault(isWindow);


    var require$$0$1 = Object.freeze({
      default: isWindow$1
    });

    var ownerDocument = createCommonjsModule(function (module, exports) {
    "use strict";

    exports.__esModule = true;
    exports["default"] = ownerDocument;

    function ownerDocument(node) {
      return node && node.ownerDocument || document;
    }

    module.exports = exports["default"];
    });

    var ownerDocument$1 = interopDefault(ownerDocument);


    var require$$1 = Object.freeze({
      default: ownerDocument$1
    });

    var offset = createCommonjsModule(function (module) {
    'use strict';

    var contains = interopDefault(require$$2),
        getWindow = interopDefault(require$$0$1),
        ownerDocument = interopDefault(require$$1);

    module.exports = function offset(node) {
      var doc = ownerDocument(node),
          win = getWindow(doc),
          docElem = doc && doc.documentElement,
          box = { top: 0, left: 0, height: 0, width: 0 };

      if (!doc) return;

      if (!contains(docElem, node)) return box;

      if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

      if (box.width || box.height) {

        box = {
          top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
          left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
          width: (box.width == null ? node.offsetWidth : box.width) || 0,
          height: (box.height == null ? node.offsetHeight : box.height) || 0
        };
      }

      return box;
    };
    });

    var getOffset = interopDefault(offset);


    var require$$4 = Object.freeze({
      default: getOffset
    });

    var babelHelpers = createCommonjsModule(function (module, exports) {
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
      } else if (typeof exports === "object") {
        factory(exports);
      } else {
        factory(root.babelHelpers = {});
      }
    })(commonjsGlobal, function (global) {
      var babelHelpers = global;

      babelHelpers.interopRequireDefault = function (obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      };

      babelHelpers._extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };
    });
    });

    var babelHelpers$1 = interopDefault(babelHelpers);


    var require$$1$1 = Object.freeze({
      default: babelHelpers$1
    });

    var camelize = createCommonjsModule(function (module) {
    "use strict";

    var rHyphen = /-(.)/g;

    module.exports = function camelize(string) {
      return string.replace(rHyphen, function (_, chr) {
        return chr.toUpperCase();
      });
    };
    });

    var camelize$1 = interopDefault(camelize);


    var require$$0$4 = Object.freeze({
      default: camelize$1
    });

    var camelizeStyle = createCommonjsModule(function (module) {
    'use strict';

    var camelize = interopDefault(require$$0$4);
    var msPattern = /^-ms-/;

    module.exports = function camelizeStyleName(string) {
      return camelize(string.replace(msPattern, 'ms-'));
    };
    });

    var camelizeStyle$1 = interopDefault(camelizeStyle);


    var require$$0$3 = Object.freeze({
      default: camelizeStyle$1
    });

    var hyphenate = createCommonjsModule(function (module) {
    'use strict';

    var rUpper = /([A-Z])/g;

    module.exports = function hyphenate(string) {
      return string.replace(rUpper, '-$1').toLowerCase();
    };
    });

    var hyphenate$1 = interopDefault(hyphenate);


    var require$$0$5 = Object.freeze({
      default: hyphenate$1
    });

    var hyphenateStyle = createCommonjsModule(function (module) {
    "use strict";

    var hyphenate = interopDefault(require$$0$5);
    var msPattern = /^ms-/;

    module.exports = function hyphenateStyleName(string) {
      return hyphenate(string).replace(msPattern, "-ms-");
    };
    });

    var hyphenateStyle$1 = interopDefault(hyphenateStyle);


    var require$$2$1 = Object.freeze({
      default: hyphenateStyle$1
    });

    var getComputedStyle = createCommonjsModule(function (module) {
    'use strict';

    var babelHelpers = interopDefault(require$$1$1);

    var _utilCamelizeStyle = interopDefault(require$$0$3);

    var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

    var rposition = /^(top|right|bottom|left)$/;
    var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

    module.exports = function _getComputedStyle(node) {
      if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
      var doc = node.ownerDocument;

      return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : {
        getPropertyValue: function getPropertyValue(prop) {
          var style = node.style;

          prop = (0, _utilCamelizeStyle2['default'])(prop);

          if (prop == 'float') prop = 'styleFloat';

          var current = node.currentStyle[prop] || null;

          if (current == null && style && style[prop]) current = style[prop];

          if (rnumnonpx.test(current) && !rposition.test(prop)) {
            var left = style.left;
            var runStyle = node.runtimeStyle;
            var rsLeft = runStyle && runStyle.left;

            if (rsLeft) runStyle.left = node.currentStyle.left;

            style.left = prop === 'fontSize' ? '1em' : current;
            current = style.pixelLeft + 'px';

            style.left = left;
            if (rsLeft) runStyle.left = rsLeft;
          }

          return current;
        }
      };
    };
    });

    var getComputedStyle$1 = interopDefault(getComputedStyle);


    var require$$1$2 = Object.freeze({
      default: getComputedStyle$1
    });

    var removeStyle = createCommonjsModule(function (module) {
    'use strict';

    module.exports = function removeStyle(node, key) {
      return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
    };
    });

    var removeStyle$1 = interopDefault(removeStyle);


    var require$$0$6 = Object.freeze({
      default: removeStyle$1
    });

    var index = createCommonjsModule(function (module) {
    'use strict';

    var camelize = interopDefault(require$$0$3),
        hyphenate = interopDefault(require$$2$1),
        _getComputedStyle = interopDefault(require$$1$2),
        removeStyle = interopDefault(require$$0$6);

    var has = Object.prototype.hasOwnProperty;

    module.exports = function style(node, property, value) {
      var css = '',
          props = property;

      if (typeof property === 'string') {

        if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
      }

      for (var key in props) {
        if (has.call(props, key)) {
          !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
        }
      }node.style.cssText += ';' + css;
    };
    });

    var index$1 = interopDefault(index);


    var require$$0$2 = Object.freeze({
      default: index$1
    });

    var offsetParent = createCommonjsModule(function (module, exports) {
    'use strict';

    var babelHelpers = interopDefault(require$$1$1);

    exports.__esModule = true;
    exports['default'] = offsetParent;

    var _ownerDocument = interopDefault(require$$1);

    var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

    var _style = interopDefault(require$$0$2);

    var _style2 = babelHelpers.interopRequireDefault(_style);

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase();
    }

    function offsetParent(node) {
      var doc = (0, _ownerDocument2['default'])(node),
          offsetParent = node && node.offsetParent;

      while (offsetParent && nodeName(node) !== 'html' && (0, _style2['default'])(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
      }

      return offsetParent || doc.documentElement;
    }

    module.exports = exports['default'];
    });

    var offsetParent$1 = interopDefault(offsetParent);


    var require$$3 = Object.freeze({
      default: offsetParent$1
    });

    var scrollTop = createCommonjsModule(function (module) {
    'use strict';

    var getWindow = interopDefault(require$$0$1);

    module.exports = function scrollTop(node, val) {
      var win = getWindow(node);

      if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

      if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
    };
    });

    var getScrollTop = interopDefault(scrollTop);


    var require$$2$2 = Object.freeze({
      default: getScrollTop
    });

    var scrollLeft = createCommonjsModule(function (module) {
    'use strict';

    var getWindow = interopDefault(require$$0$1);

    module.exports = function scrollTop(node, val) {
      var win = getWindow(node);

      if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;

      if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
    };
    });

    var scrollLeft$1 = interopDefault(scrollLeft);


    var require$$1$3 = Object.freeze({
      default: scrollLeft$1
    });

    var position = createCommonjsModule(function (module, exports) {
    'use strict';

    var babelHelpers = interopDefault(require$$1$1);

    exports.__esModule = true;
    exports['default'] = position;

    var _offset = interopDefault(require$$4);

    var _offset2 = babelHelpers.interopRequireDefault(_offset);

    var _offsetParent = interopDefault(require$$3);

    var _offsetParent2 = babelHelpers.interopRequireDefault(_offsetParent);

    var _scrollTop = interopDefault(require$$2$2);

    var _scrollTop2 = babelHelpers.interopRequireDefault(_scrollTop);

    var _scrollLeft = interopDefault(require$$1$3);

    var _scrollLeft2 = babelHelpers.interopRequireDefault(_scrollLeft);

    var _style = interopDefault(require$$0$2);

    var _style2 = babelHelpers.interopRequireDefault(_style);

    function nodeName(node) {
      return node.nodeName && node.nodeName.toLowerCase();
    }

    function position(node, offsetParent) {
      var parentOffset = { top: 0, left: 0 },
          offset;

      if ((0, _style2['default'])(node, 'position') === 'fixed') {
        offset = node.getBoundingClientRect();
      } else {
        offsetParent = offsetParent || (0, _offsetParent2['default'])(node);
        offset = (0, _offset2['default'])(node);

        if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2['default'])(offsetParent);

        parentOffset.top += parseInt((0, _style2['default'])(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2['default'])(offsetParent) || 0;
        parentOffset.left += parseInt((0, _style2['default'])(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2['default'])(offsetParent) || 0;
      }

      return babelHelpers._extends({}, offset, {
        top: offset.top - parentOffset.top - (parseInt((0, _style2['default'])(node, 'marginTop'), 10) || 0),
        left: offset.left - parentOffset.left - (parseInt((0, _style2['default'])(node, 'marginLeft'), 10) || 0)
      });
    }

    module.exports = exports['default'];
    });

    interopDefault(position);

    var asyncGenerator = function () {
      function AwaitValue(value) {
        this.value = value;
      }

      function AsyncGenerator(gen) {
        var front, back;

        function send(key, arg) {
          return new Promise(function (resolve, reject) {
            var request = {
              key: key,
              arg: arg,
              resolve: resolve,
              reject: reject,
              next: null
            };

            if (back) {
              back = back.next = request;
            } else {
              front = back = request;
              resume(key, arg);
            }
          });
        }

        function resume(key, arg) {
          try {
            var result = gen[key](arg);
            var value = result.value;

            if (value instanceof AwaitValue) {
              Promise.resolve(value.value).then(function (arg) {
                resume("next", arg);
              }, function (arg) {
                resume("throw", arg);
              });
            } else {
              settle(result.done ? "return" : "normal", result.value);
            }
          } catch (err) {
            settle("throw", err);
          }
        }

        function settle(type, value) {
          switch (type) {
            case "return":
              front.resolve({
                value: value,
                done: true
              });
              break;

            case "throw":
              front.reject(value);
              break;

            default:
              front.resolve({
                value: value,
                done: false
              });
              break;
          }

          front = front.next;

          if (front) {
            resume(front.key, front.arg);
          } else {
            back = null;
          }
        }

        this._invoke = send;

        if (typeof gen.return !== "function") {
          this.return = undefined;
        }
      }

      if (typeof Symbol === "function" && Symbol.asyncIterator) {
        AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
          return this;
        };
      }

      AsyncGenerator.prototype.next = function (arg) {
        return this._invoke("next", arg);
      };

      AsyncGenerator.prototype.throw = function (arg) {
        return this._invoke("throw", arg);
      };

      AsyncGenerator.prototype.return = function (arg) {
        return this._invoke("return", arg);
      };

      return {
        wrap: function (fn) {
          return function () {
            return new AsyncGenerator(fn.apply(this, arguments));
          };
        },
        await: function (value) {
          return new AwaitValue(value);
        }
      };
    }();

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

    var _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    var colsClass = function colsClass() {
        var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var opposite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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
            var payload = [ctx].concat(extraArgs);

            if (ev) payload.unshift(ev);

            ctx.$emit.apply(ctx, [eventName].concat(toConsumableArray(payload)));
        };
    };

    function inEnum() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var validator = function validator(val) {
            return args.includes(val);
        };
        validator.__doc_accept = args.join(', ');
        return validator;
    }

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
                        'click': props.clicked
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
                    ['\xD7']
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
                [!props.isLast && h(
                    'a',
                    {
                        on: {
                            'click': props.clicked
                        },
                        attrs: { href: props.href || '#' }
                    },
                    [props.text]
                ), props.isLast && props.text]
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

    var index$2 = createCommonjsModule(function (module) {
    var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;

    module.exports = function mergeJSXProps(objs) {
      return objs.reduce(function (a, b) {
        var aa, bb, key, nestedKey, temp;
        for (key in b) {
          aa = a[key];
          bb = b[key];
          if (aa && nestRE.test(key)) {
            if (key === 'class') {
              if (typeof aa === 'string') {
                temp = aa;
                a[key] = aa = {};
                aa[temp] = true;
              }
              if (typeof bb === 'string') {
                temp = bb;
                b[key] = bb = {};
                bb[temp] = true;
              }
            }
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

    var _mergeJSXProps = interopDefault(index$2);

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
            },
            value: null
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
                        'click': this.clicked
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
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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

            this.__body__ = this.$root.$el;
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
                if (!this.__body__) this.__body__ = this.$root.$el;

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
                            'click': this.btnClick
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
                            'click': event
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
                            'show': this._show,
                            'hide': this._hide
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
                [children, this.$slots.default]
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
                var title = _ref2.title,
                    text = _ref2.text,
                    options = _ref2.options;

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
                var _button$type = button.type,
                    type = _button$type === undefined ? 'button' : _button$type,
                    _button$text = button.text,
                    text = _button$text === undefined ? '' : _button$text,
                    active = button.active,
                    disabled = button.disabled,
                    size = button.size,
                    variant = button.variant;

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
                            'click': this.trigger
                        }
                    },
                    [text]
                );
            },
            trigger: function trigger(ev) {
                this.callback && this.callback(ev);

                this.$emit('click', ev, this);
            }
        }
    };

    var BtnCheckbox = {
        name: 'btn-checkbox',
        props: _extends({}, BtnGroup.props, {
            value: null
        }),
        methods: {
            _updateValue: function _updateValue(_ref) {
                var target = _ref.target;

                var currentValue = this.value || [];
                var targetValue = target.__vue__.value;

                var targetPos = currentValue.indexOf(targetValue);

                if (targetPos === -1) currentValue.push(targetValue);else currentValue.splice(targetPos, 1);

                this.$emit('input', currentValue);
            }
        },
        computed: {
            stateOptions: function stateOptions() {
                var currentValue = this.value || [];
                return this.options.map(function (option) {
                    return _extends({}, option, {
                        active: currentValue.includes(option.value)
                    });
                });
            }
        },
        render: function render(h) {
            var _this = this;

            return h(
                BtnGroup,
                null,
                [this.stateOptions.map(function (props) {
                    return h(
                        Btn,
                        _mergeJSXProps([{
                            on: {
                                'click': _this._updateValue
                            }
                        }, { props: props }]),
                        []
                    );
                })]
            );
        }
    };

    var BtnRadio = {
        name: 'btn-radio',
        props: _extends({}, BtnGroup.props, {
            value: null
        }),
        methods: {
            _updateValue: function _updateValue(_ref) {
                var target = _ref.target;

                this.$emit('input', target.__vue__.value);
            }
        },
        computed: {
            stateOptions: function stateOptions() {
                var _this = this;

                return this.options.map(function (option) {
                    return _extends({}, option, {
                        active: _this.value === option.value
                    });
                });
            }
        },
        render: function render(h) {
            var _this2 = this;

            var props = {};

            for (var propName in Btn.props) {
                if (Btn.props.hasOwnProperty(propName)) props[propName] = this[propName];
            }delete props.value;

            return h(
                BtnGroup,
                { props: props },
                [this.stateOptions.map(function (props) {
                    return h(
                        Btn,
                        _mergeJSXProps([{
                            on: {
                                'click': _this2._updateValue
                            }
                        }, { props: props }]),
                        []
                    );
                })]
            );
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
                var name = _ref2.name,
                    callback = _ref2.callback,
                    disabled = _ref2.disabled,
                    options = _ref2.options;
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
                                "click": _this.slideTo(index)
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
                            "click": this.slidePosition(direction)
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
            var children = _ref.children,
                props = _ref.props;

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
                        'submit': emitEvent('submit', this),
                        'reset': emitEvent('reset', this)
                    }
                },
                [this.$slots.default]
            );
        }
    };

    var FormControl = {
        name: 'form-control',
        props: {
            id: String,
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
                type: String,
                validator: inEnum(undefined, 'success', 'warning', 'danger')
            },
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
        computed: {
            className: function className() {
                var _ref;

                return _ref = {
                    'form-control': this.type !== 'static',
                    'form-control-static': this.type === 'static'
                }, defineProperty(_ref, 'form-control-' + this.status, this.status), defineProperty(_ref, 'form-control-' + this.size, this.size !== 'md'), _ref;
            }
        },
        methods: {
            _updateAndEmit: function _updateAndEmit(eventName) {
                var _this = this;

                return function (ev) {
                    emitEvent(eventName, _this)();
                    _this._updateValue(ev);
                };
            },
            _renderStatic: function _renderStatic() {
                var h = this.$createElement;

                return h(
                    'p',
                    {
                        on: {
                            'click': emitEvent('click', this)
                        },
                        'class': this.className },
                    [this.placeholder]
                );
            },
            _renderInput: function _renderInput() {
                var h = this.$createElement;

                return h(
                    'input',
                    {
                        'class': this.className,
                        on: {
                            'click': this._updateAndEmit('click'),
                            'blur': this._updateAndEmit('blur'),
                            'focus': this._updateAndEmit('focus'),
                            'keydown': this._updateAndEmit('keydown'),
                            'keypress': this._updateAndEmit('keypress'),
                            'keyup': this._updateAndEmit('keyup')
                        },
                        attrs: {
                            type: this.type,
                            id: this.id,
                            name: this.id,
                            value: this.value,
                            placeholder: this.placeholder }
                    },
                    []
                );
            },
            _renderSelect: function _renderSelect() {
                var h = this.$createElement;

                var options = this.options || [];

                return h(
                    'select',
                    {
                        on: {
                            'click': this._updateAndEmit('click'),
                            'change': this._updateAndEmit('change'),
                            'select': this._updateAndEmit('select')
                        },
                        attrs: {
                            id: this.id,
                            name: this.id,

                            multiple: this.multiple },
                        'class': this.className },
                    [options.map(this._renderOption)]
                );
            },
            _renderOption: function _renderOption(_ref2) {
                var text = _ref2.text,
                    value = _ref2.value;

                var h = this.$createElement;

                return h(
                    'option',
                    {
                        on: {
                            'click': this._updateAndEmit('click')
                        },
                        attrs: { value: value }
                    },
                    [text]
                );
            },
            _renderTextarea: function _renderTextarea() {
                var h = this.$createElement;

                return h(
                    'textarea',
                    {
                        on: {
                            'click': this._updateAndEmit('click'),
                            'blur': this._updateAndEmit('blur'),
                            'focus': this._updateAndEmit('focus'),
                            'keydown': this._updateAndEmit('keydown'),
                            'keypress': this._updateAndEmit('keypress'),
                            'keyup': this._updateAndEmit('keyup')
                        },
                        attrs: {
                            id: this.id,
                            name: this.id
                        },
                        'class': this.className },
                    []
                );
            },
            _updateValue: function _updateValue(_ref3) {
                var target = _ref3.target;

                if (this.value === target.value) return;

                var value = target.value;
                this.$emit('input', value);
            }
        },
        render: function render(h) {
            switch (this.type) {
                case 'slot':
                    return this.$slots.default;
                case 'static':
                    return this._renderStatic();
                case 'textarea':
                    return this._renderTextarea();
                case 'select':
                    return this._renderSelect();
                default:
                    return this._renderInput();
            }
        }
    };

    var FormGroup = {
        name: 'form-group',
        props: _extends({}, FormControl.props, {
            inline: {
                type: Boolean,
                default: false
            },
            statusMessage: String,
            note: String,
            title: String,
            row: null
        }),
        data: function data() {
            return {
                hiddenValue: null
            };
        },

        computed: {
            formCheck: function formCheck() {
                switch (this.type) {
                    case 'radio':
                    case 'checkbox':
                        return true;
                    default:
                        return false;
                }
            },
            className: function className() {
                return defineProperty({
                    'form-group': this.type !== 'static'
                }, 'has-' + this.status, this.status);
            }
        },
        methods: {
            _renderElement: function _renderElement() {
                switch (this.type) {
                    case 'slot':
                        return this.$slots.default;
                    case 'radio':
                    case 'checkbox':
                        return this._renderRadioCheck();
                    default:
                        return this._renderFormControl();
                }
            },
            _renderRowElement: function _renderRowElement() {
                var h = this.$createElement;

                return h(
                    'div',
                    { 'class': colsClass(this.row) },
                    [this._renderElement()]
                );
            },
            _renderFormControl: function _renderFormControl() {
                var h = this.$createElement;

                var props = {};
                for (var propName in FormControl.props) {
                    if (FormControl.props.hasOwnProperty(propName)) props[propName] = this[propName];
                }var on = {
                    input: this._updateValue,
                    click: emitEvent('click', this),
                    blur: emitEvent('blur', this),
                    focus: emitEvent('focus', this),
                    keydown: emitEvent('keydown', this),
                    keypress: emitEvent('keypress', this),
                    keyup: emitEvent('keyup', this),
                    change: emitEvent('change', this),
                    select: emitEvent('select', this)
                };

                return h(
                    FormControl,
                    { on: on, props: props },
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
            _renderRadioCheck: function _renderRadioCheck() {
                var _this = this;

                var h = this.$createElement;

                var emitClick = emitEvent('click', this);
                var onClick = function onClick(ev) {
                    var value = ev.target.value;


                    if (_this.formCheck) {
                        var copy = _this.value.slice();
                        var pos = copy.indexOf(value);

                        if (pos > -1) {
                            copy.splice(pos, 1);
                        } else {
                            copy.push(value);
                        }

                        value = copy;
                    }

                    _this._updateValue(value);

                    emitClick(value);
                };

                return this.options.map(function (option) {
                    return h(
                        'div',
                        { 'class': _this._radioCheckClass(option) },
                        [h(
                            'label',
                            { 'class': _this.formCheck ? 'form-check-label' : '' },
                            [h(
                                'input',
                                {
                                    on: {
                                        'click': onClick
                                    },

                                    'class': _this.formCheck ? 'form-check-input' : '',
                                    attrs: { type: _this.type,
                                        name: _this.id,
                                        id: option.id,
                                        value: option.value,
                                        checkbox: _this.formCheck ? _this.value.includes(option.value) : option.value === _this.value }
                                },
                                []
                            ), option.text]
                        )]
                    );
                });
            },
            _radioCheckClass: function _radioCheckClass(option) {
                var _ref2;

                return _ref2 = {}, defineProperty(_ref2, this.type, !this.inline && !this.formCheck), defineProperty(_ref2, this.type + '-inline', this.inline && !this.formCheck), defineProperty(_ref2, 'form-check', this.formCheck && !this.inline), defineProperty(_ref2, 'form-check-inline', this.formCheck && this.inline), defineProperty(_ref2, 'disabled', option.disabled), _ref2;
            },
            _updateValue: function _updateValue(value) {
                if (this.value === value) {
                    return;
                }

                this.$emit('input', value);
            }
        },
        render: function render(h) {
            return h(
                'fieldset',
                { 'class': this.className },
                [this.title && this._renderTitle(), this.row ? this._renderRowElement() : this._renderElement(), this.status && this.statusMessage && h(
                    'div',
                    { 'class': 'form-control-feedback' },
                    [this.statusMessage]
                ), this.note && this._renderNote()]
            );
        }
    };

    var InputGroup = {
        name: 'input-group',
        props: _extends({}, FormControl.props, {
            id: String,
            note: String,
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
            title: String
        }),
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

                var props = {};
                for (var propName in FormControl.props) {
                    if (FormControl.props.hasOwnProperty(propName)) props[propName] = this[propName];
                }var on = {
                    input: this._updateValue
                };

                return h(
                    FormControl,
                    { on: on, props: props },
                    []
                );
            },
            _updateValue: function _updateValue(value) {
                if (this.value === value) return;
                this.$emit('input', value);
            }
        },
        render: function render(h) {
            return h(
                'div',
                { 'class': 'input-group' },
                [this.$slots.beforeAddons, this.beforeAddons.map(this._renderAddon), this._renderInput(), this.afterAddons.map(this._renderAddon), this.$slots.afterAddons]
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
            var props = _ref.props,
                children = _ref.children;

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

            var Component = ctx.action ? 'button' : 'li';

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
                        'click': ctx.emitClick
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
                var _ev$target = ev.target,
                    target = _ev$target === undefined ? {} : _ev$target;
                var _target$dataset = target.dataset,
                    dataset = _target$dataset === undefined ? {} : _target$dataset;


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

    var ModalHeader = {
        name: 'modal-header',
        functional: true,
        render: function render(h, _ref) {
            var props = _ref.props,
                children = _ref.children;
            var context = props.context;

            var emitClose = function emitClose(ev) {
                return context.$emit('hide', ev, context);
            };

            return h(
                'div',
                { 'class': 'modal-header' },
                [context && context.dismissible && h(
                    'button',
                    {
                        attrs: {
                            type: 'button',

                            'aria-label': 'Close' },
                        'class': 'close',
                        on: {
                            'click': emitClose
                        }
                    },
                    [h(
                        'span',
                        {
                            attrs: { 'aria-hidden': 'true' }
                        },
                        ['\xD7']
                    )]
                ), props.title && h(
                    'h4',
                    { 'class': 'modal-title' },
                    [props.title]
                ), children]
            );
        }
    };

    var ModalBody = {
        name: 'modal-body',
        functional: true,
        render: function render(h, _ref2) {
            var children = _ref2.children;

            return h(
                'div',
                { 'class': 'modal-body' },
                [children]
            );
        }
    };

    var ModalFooter = {
        name: 'modal-footer',
        functional: true,
        render: function render(h, _ref3) {
            var children = _ref3.children;

            return h(
                'div',
                { 'class': 'modal-footer' },
                [children]
            );
        }
    };

    var Modal = {
        name: 'modal',
        props: {
            id: {
                type: String,
                required: true
            },
            container: Object,
            dismissible: {
                type: Boolean,
                default: true
            },
            transition: {
                type: String,
                default: 'fade'
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data: function data() {
            return {
                visible: false,
                modalVisible: false
            };
        },
        created: function created() {
            var _this = this;

            this.visible = this.show;

            this.$on('show', function () {
                if (!_this.$isServer) document.body.classList.add('modal-open');

                _this.visible = true;
            });
            this.$on('hide', function () {
                if (!_this.$isServer) document.body.classList.remove('modal-open');

                _this.visible = false;
            });
            this.$on('toggle', function () {
                if (!_this.$isServer) document.body.classList.toggle('modal-open');

                _this.visible = !!_this.visible;
            });
        },

        methods: {
            _ejectModal: function _ejectModal() {
                var _this2 = this;

                if (this.$isServer || !this._modal) return;

                this.modalVisible = false;

                this.$nextTick(function () {
                    _this2._modal.$destroy();
                    document.body.removeChild(document.querySelector('#' + _this2.id));

                    delete _this2._modal;
                });
            },
            _injectModal: function _injectModal() {
                var _this3 = this;

                if (this.$isServer || this._modal) return;

                var ctx = this;

                var injectDiv = function injectDiv() {
                    return document.body.appendChild(document.createElement('div'));
                };

                this.modalVisible = true;

                this.$nextTick(function () {
                    _this3._modal = new Vue({
                        render: function render(h) {
                            return h(
                                'div',
                                null,
                                [function () {
                                    return ctx._renderModal();
                                }, function () {
                                    return ctx._renderBackdrop();
                                }]
                            );
                        }
                    });

                    _this3._modal.$mount(injectDiv());
                });
            },
            _renderBackdrop: function _renderBackdrop() {
                var h = this.$createElement;

                return h(
                    'div',
                    { 'class': 'modal-backdrop fade in' },
                    []
                );
            },
            _renderModal: function _renderModal() {
                var h = this.$createElement;

                return h(
                    'div',
                    { 'class': 'modal in', on: {
                            'click': emitEvent('hide', this)
                        },
                        style: 'display: block;' },
                    [h(
                        'div',
                        {
                            on: {
                                'click': function click(ev) {
                                    return ev.stopImmediatePropagation();
                                }
                            },
                            'class': 'modal-dialog', attrs: { role: 'document' }
                        },
                        [h(
                            'div',
                            { 'class': 'modal-content' },
                            [this.$slots.header && h(
                                ModalHeader,
                                {
                                    attrs: { context: this }
                                },
                                [this.$slots.header]
                            ), this.$slots.body && h(
                                ModalBody,
                                null,
                                [this.$slots.body]
                            ), this.$slots.footer && h(
                                ModalFooter,
                                null,
                                [this.$slots.footer]
                            ), this.$slots.default]
                        )]
                    )]
                );
            },
            _renderEl: function _renderEl() {
                var h = this.$createElement;

                return h(
                    'div',
                    {
                        attrs: { id: this.id }
                    },
                    [this._renderModal(), this._renderBackdrop()]
                );
            }
        },
        watch: {
            visible: function visible(val) {
                if (val) this._injectModal();else this._ejectModal();
            }
        },
        render: function render(h) {
            return null;
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
                active: this.isActive,
                'dropdown-toggle': this.dropdown
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
                            'click': event
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
                            'click': emitEvent('click', this)
                        }
                    },
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
                                tag: item.tag,
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
                            'click': emitEvent('brand-click', this)
                        },
                        attrs: { href: this.brand.href || '#' }
                    },
                    [this.brand.text]
                ), this.list.length && h(
                    Navs,
                    { 'class': 'navbar-nav', attrs: { list: this.list }
                    },
                    []
                ) || '', this.$slots.default]
            );
        }
    };

    var Pagination = {
        name: 'pagination',
        props: {
            pages: {
                type: Number,
                default: 0
            },
            value: null
        },
        methods: {
            _emitClick: function _emitClick(ev) {
                var page = ev.target.dataset.page;

                ev.preventDefault();
                this.$emit('input', parseInt(page));
            },
            _renderLink: function _renderLink() {
                var h = this.$createElement;
                var children = [];

                for (var i = 1, len = this.pages; i <= len; i++) {
                    var className = {
                        'page-item': true,
                        'active': this.value === i
                    };

                    children.push(h(
                        'li',
                        { 'class': className },
                        [h(
                            'a',
                            {
                                attrs: { href: '#', 'data-page': i },
                                'class': 'page-link', on: {
                                    'click': this._emitClick
                                }
                            },
                            [i]
                        )]
                    ));
                }

                return children;
            }
        },
        render: function render(h) {
            return h(
                'ul',
                { 'class': 'pagination' },
                [this._renderLink()]
            );
        }
    };

    var Popover = {
        name: 'popover',
        props: {
            id: {
                type: String,
                required: true
            },
            event: {
                type: String,
                default: 'click'
            },
            title: String,
            target: {
                type: null,
                required: true
            },
            show: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top'
            }
        },
        data: function data() {
            return {
                visible: false
            };
        },

        computed: {
            className: function className() {
                return defineProperty({
                    in: true,
                    fade: true,
                    popover: true
                }, 'popover-' + this.position, true);
            }
        },
        created: function created() {
            this.visible = this.show;
        },

        methods: {
            _ejectPopover: function _ejectPopover() {
                if (this.$isServer || !this._modal) return;

                var ctx = this;
                var Vue = this.constructor;

                this._modal.$destroy();
                document.body.removeChild(document.querySelector('#modal'));

                delete this._modal;
            },
            _injectPopover: function _injectPopover() {
                if (this.$isServer || this._modal) return;

                var ctx = this;
                var Vue = this.constructor;

                var _modal_el = document.createElement('div');
                _modal_el.id = 'modal';

                document.body.appendChild(_modal_el);

                this._modal = new Vue({
                    el: '#modal',
                    render: function render(h) {
                        return ctx._renderEl();
                    }
                });
            },
            _renderPopover: function _renderPopover() {
                var h = this.$createElement;

                var style = {
                    top: 'auto',
                    left: 'auto'
                };

                return h(
                    'transition',
                    {
                        attrs: { name: 'fade' }
                    },
                    [this.visible && h(
                        'div',
                        {
                            'class': this.className,
                            style: style,
                            attrs: { role: 'tooltip' }
                        },
                        [h(
                            'div',
                            { 'class': 'popover-arrow' },
                            []
                        ), this.title && h(
                            'h3',
                            { 'class': 'popover-title' },
                            [this.title]
                        ), h(
                            'div',
                            { 'class': 'popover-content' },
                            [this.$slots.default]
                        )]
                    )]
                );
            }
        },
        render: function render(h) {
            var _this = this;

            var on = {};

            switch (this.event) {
                case 'click':
                    on.click = function (ev) {
                        ev.preventDefault();
                        _this.visible = !_this.visible;
                    };
                    break;
                case 'hover':
                    on.mouseenter = function () {
                        return _this.visible = true;
                    };
                    on.mouseleave = function () {
                        return _this.visible = false;
                    };
                    on.click = function (ev) {
                        return ev.preventDefault();
                    };
                    break;
            }

            return h(
                'a',
                _mergeJSXProps([{
                    attrs: { href: '#' }
                }, { on: on }]),
                [this.$slots.target || this.target]
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
            var props = ctx.props,
                children = ctx.children;


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

    var Tooltip = {
        name: 'tooltip',
        props: {
            target: {
                type: null,
                required: true
            },
            show: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top'
            }
        },
        data: function data() {
            return {
                visible: false
            };
        },

        computed: {
            className: function className() {
                return defineProperty({
                    in: true,
                    fade: true,
                    tooltip: true
                }, 'tooltip-' + this.position, true);
            }
        },
        created: function created() {
            this.visible = this.show;
        },
        render: function render(h) {
            var _this = this;

            var style = {
                top: 'auto',
                left: 'auto'
            };

            var x = 0,
                y = 0,
                position = void 0;
            switch (this.position) {
                case 'top':
                    position = 'bottom';
                    y = -1;
                case 'bottom':
                    x = '-50%';
                    y = (y || 1) * 5 + 'px';
                    style.left = '50%';

                    position = position || 'top';
                    break;
                case 'left':
                    position = position || 'right';
                    x = -1;
                case 'right':
                    y = '-50%';
                    x = (x || 1) * 5 + 'px';
                    style.top = '50%';

                    position = position || 'left';
                    break;
            }

            style[position] = '100%';

            style.transform = 'translate3d(' + x + ', ' + y + ', 0)';

            var on = {
                mouseenter: function mouseenter() {
                    return _this.visible = true;
                },
                mouseleave: function mouseleave() {
                    return _this.visible = false;
                },
                click: function click(ev) {
                    return ev.preventDefault();
                }
            };

            return h(
                'span',
                { style: 'position:relative' },
                [h(
                    'a',
                    _mergeJSXProps([{
                        attrs: { href: '#' }
                    }, { on: on }]),
                    [this.$slots.target || this.target]
                ), h(
                    'transition',
                    {
                        attrs: { name: 'fade' }
                    },
                    [this.visible && h(
                        'div',
                        {
                            'class': this.className,
                            style: style,
                            attrs: { role: 'tooltip' }
                        },
                        [h(
                            'div',
                            { 'class': 'tooltip-arrow' },
                            []
                        ), h(
                            'div',
                            { 'class': 'tooltip-inner' },
                            [this.$slots.default]
                        )]
                    )]
                )]
            );
        }
    };

    exports.Alert = Alert;
    exports.Breadcrumb = Breadcrumb;
    exports.Btn = Btn;
    exports.BtnCheckbox = BtnCheckbox;
    exports.BtnGroup = BtnGroup;
    exports.BtnRadio = BtnRadio;
    exports.BtnDropdown = BtnDropdown;
    exports.BtnToolbar = BtnToolbar;
    exports.Carousel = Carousel;
    exports.Cols = Cols;
    exports.DropdownMenu = DropdownMenu;
    exports.Forms = Forms;
    exports.FormControl = FormControl;
    exports.FormGroup = FormGroup;
    exports.InputGroup = InputGroup;
    exports.Jumbotron = Jumbotron;
    exports.ListGroup = ListGroup;
    exports.Modal = Modal;
    exports.Navbar = Navbar;
    exports.NavItem = NavItem;
    exports.Navs = Navs;
    exports.Pagination = Pagination;
    exports.Popover = Popover;
    exports.ProgressBar = ProgressBar;
    exports.Tag = Tag;
    exports.Tooltip = Tooltip;

    Object.defineProperty(exports, '__esModule', { value: true });

})));