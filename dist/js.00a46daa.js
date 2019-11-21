// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/components/Slide.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slide =
/*#__PURE__*/
function () {
  function Slide(elem) {
    _classCallCheck(this, Slide);

    this.elem = elem;
    var rect = this.elem.getBoundingClientRect();
    console.log(rect);
    this.height = rect.height;
    this.width = rect.width;
    this.calculatePosition();
  }

  _createClass(Slide, [{
    key: "calculatePosition",
    value: function calculatePosition() {
      if (this.width > this.height) {
        this.elem.classList.add('is-landscape');
      } else {
        this.elem.classList.add('is-portrait');
      }
    }
  }]);

  return Slide;
}();

var _default = Slide;
exports.default = _default;
},{}],"js/components/ProtoComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProtoComponent =
/*#__PURE__*/
function () {
  function ProtoComponent() {
    _classCallCheck(this, ProtoComponent);

    this.events = {};
  }

  _createClass(ProtoComponent, [{
    key: "dispatch",
    value: function dispatch(eventName, data) {
      var event = this.events[eventName];

      if (event) {
        event.fire(data);
      }
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      var event = this.events[eventName];

      if (!event) {
        event = new DispatcherEvent(eventName);
        this.events[eventName] = event;
      }

      event.registerCallback(callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      var event = this.events[eventName];

      if (event && event.callbacks.indexOf(callback) > -1) {
        event.unregisterCallback(callback);

        if (event.callbacks.length === 0) {
          delete this.events[eventName];
        }
      }
    }
  }]);

  return ProtoComponent;
}();

var DispatcherEvent =
/*#__PURE__*/
function () {
  function DispatcherEvent(eventName) {
    _classCallCheck(this, DispatcherEvent);

    this.eventName = eventName;
    this.callbacks = [];
  }

  _createClass(DispatcherEvent, [{
    key: "registerCallback",
    value: function registerCallback(callback) {
      this.callbacks.push(callback);
    }
  }, {
    key: "unregisterCallback",
    value: function unregisterCallback(callback) {
      var index = this.callbacks.indexOf(callback);

      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    }
  }, {
    key: "fire",
    value: function fire(data) {
      var callbacks = this.callbacks.slice(0);
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }]);

  return DispatcherEvent;
}();

var _default = ProtoComponent;
exports.default = _default;
},{}],"js/components/Slideshow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Slide = _interopRequireDefault(require("./Slide"));

var _ProtoComponent2 = _interopRequireDefault(require("./ProtoComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Slideshow =
/*#__PURE__*/
function (_ProtoComponent) {
  _inherits(Slideshow, _ProtoComponent);

  function Slideshow(elem) {
    var _this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Slideshow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slideshow).call(this));
    var configDefaults = {
      autoPlay: false,
      dots: true
    };
    _this.config = _objectSpread({}, configDefaults, {}, config);
    _this.elem = elem;
    _this.elem.classList.add;
    _this.slides = _toConsumableArray(elem.querySelectorAll('.slideshow__slide'));
    _this.slideCount = _this.slides.length;
    _this.buttons = [];
    _this.currentIndex = 0;
    _this.autoPlayInterval = _this.config.autoPlay ? _this._autoPlay() : false;
    _this.isAutoPlay = true;

    if (_this.config.autoPlay) {
      _this._initAutoPlay(_this.elem);
    } // adding slideshow modules


    _this.renderComponents();

    _this._setSlide();

    _this._addArrowKeyTriggers();

    return _this;
  }

  _createClass(Slideshow, [{
    key: "nextSlide",
    value: function nextSlide() {
      this._unsetSlide();

      if (this.currentIndex === this.slides.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = this.currentIndex + 1;
      }

      this._setSlide();

      _get(_getPrototypeOf(Slideshow.prototype), "dispatch", this).call(this, 'onNextSlide', {
        currentIndex: this.currentIndex,
        elem: this.slides[this.currentIndex]
      });
    }
  }, {
    key: "prevSlide",
    value: function prevSlide() {
      this._unsetSlide();

      if (this.currentIndex === 0) {
        this.currentIndex = this.slideCount - 1;
      } else {
        this.currentIndex = this.currentIndex - 1;
      }

      this._setSlide();

      _get(_getPrototypeOf(Slideshow.prototype), "dispatch", this).call(this, 'onPrevSlide', {
        currentIndex: this.currentIndex,
        elem: this.slides[this.currentIndex]
      });
    }
  }, {
    key: "gotoSlide",
    value: function gotoSlide(index) {
      this._unsetSlide();

      this.currentIndex = index;

      this._setSlide();

      _get(_getPrototypeOf(Slideshow.prototype), "dispatch", this).call(this, 'onGoToSlide', {
        currentIndex: this.currentIndex,
        elem: this.slides[this.currentIndex]
      });
    }
  }, {
    key: "_setSlide",
    value: function _setSlide() {
      this.slides[this.currentIndex].classList.add('is-active');

      if (this.config.dots) {
        this.buttons[this.currentIndex].classList.add('is-active');
      }
    }
  }, {
    key: "_unsetSlide",
    value: function _unsetSlide() {
      this.slides[this.currentIndex].classList.remove('is-active');

      if (this.config.dots) {
        this.buttons[this.currentIndex].classList.remove('is-active');
      }
    }
  }, {
    key: "_autoPlay",
    value: function _autoPlay() {
      var _this2 = this;

      return setInterval(function () {
        _this2.nextSlide();
      }, 3000);
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
      // for testing
      this.elem.setAttribute('data-testid', 'slideshow');

      this._generateSlides();

      this._generateArrows();

      if (this.config.dots) {
        this._generateDots();
      }
    }
  }, {
    key: "_generateDots",
    value: function _generateDots() {
      var _this3 = this;

      var buttonList = '<div class="slideShow__buttonList">';
      this.slides.forEach(function () {
        buttonList = buttonList + '<button class="slideShow__button">dot</button>';
      });
      buttonList = buttonList + '</div>';
      this.elem.insertAdjacentHTML('beforeend', buttonList);
      this.buttons = _toConsumableArray(this.elem.querySelectorAll('.slideShow__button'));
      this.buttons.forEach(function (elem, index) {
        elem.addEventListener('click', function () {
          _this3.gotoSlide(index);
        });

        if (_this3.config.autoPlay) {
          _this3._initAutoPlay(elem);
        }
      });
    }
  }, {
    key: "_generateSlides",
    value: function _generateSlides() {
      this.slides.forEach(function (slide) {
        return new _Slide.default(slide);
      });
    }
  }, {
    key: "_generateArrows",
    value: function _generateArrows() {
      var _this4 = this;

      var arrowControls = "\n    <div class=\"slideshow__controls\">\n        <button class=\"slideshow__arrow slideshow__arrow--prev\">Prev</button>\n        <button class=\"slideshow__arrow slideshow__arrow--next\">next</button> \n    </div>";
      this.elem.insertAdjacentHTML('beforeend', arrowControls);
      var prevArrow = this.elem.querySelector('.slideshow__arrow--prev');
      var nextArrow = this.elem.querySelector('.slideshow__arrow--next');
      prevArrow.addEventListener('click', function () {
        return _this4.prevSlide();
      });
      nextArrow.addEventListener('click', function () {
        return _this4.nextSlide();
      });
    }
  }, {
    key: "_addArrowKeyTriggers",
    value: function _addArrowKeyTriggers() {
      var _this5 = this;

      this.elem.onkeydown = function (e) {
        if (e.keyCode === 37) {
          _this5.prevSlide();
        } else if (e.keyCode === 39) {
          _this5.nextSlide();
        }
      };
    }
  }, {
    key: "_initAutoPlay",
    value: function _initAutoPlay(elem) {
      var _this6 = this;

      elem.addEventListener('mouseenter', function () {
        _this6._cancelAutoPlay();
      });
      elem.addEventListener('focus', function () {
        _this6._cancelAutoPlay();
      });
      elem.addEventListener('blur', function (e) {
        _this6._resumeAutoPlay();
      });
      elem.addEventListener('mouseleave', function () {
        _this6._resumeAutoPlay();
      });
    }
  }, {
    key: "_cancelAutoPlay",
    value: function _cancelAutoPlay() {
      if (this.isAutoPlay) {
        this.isAutoPlay = false;
        clearInterval(this.autoPlayInterval);
      }
    }
  }, {
    key: "_resumeAutoPlay",
    value: function _resumeAutoPlay() {
      if (!this.isAutoPlay) {
        this.isAutoPlay = true;
        this.autoPlayInterval = this._autoPlay();
      }
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this.config;
    }
  }]);

  return Slideshow;
}(_ProtoComponent2.default);

var _default = Slideshow;
exports.default = _default;
},{"./Slide":"js/components/Slide.js","./ProtoComponent":"js/components/ProtoComponent.js"}],"js/components/helperRender.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import 'react' from React
var data = [{
  title: 'test'
}, {
  title: 'test2'
}, {
  title: 'test3'
}, {
  title: 'test4'
}];

var renderHelper = function renderHelper() {
  var str = '';
  data.forEach(function (item) {
    str = str + "\n        <article>\n            <div class=\"content\">\n                <div class=\"article__info\">\n                    <div class=\"article__title\">\n                        <h3> sdkfj jdkf sdkfjs dkfjsd dsf dsf</h3>\n                    </div>\n                    <div class=\"article__byline byline\">\n                        <div class=\"byline__author\"></div>\n                        <div class=\"byline__info\">\n                            <p class=\"byline__name\">dskfj dsfj jkjdf</p>\n                            <p class=\"byline__title\">fake title</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </article>\n      ";
  });
  return str;
};

var _default = renderHelper;
exports.default = _default;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./../scss/main.scss");

var _Slideshow = _interopRequireDefault(require("./components/Slideshow"));

var _helperRender = _interopRequireDefault(require("./components/helperRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// hello area 17
window.onload = function () {
  var elem = document.querySelector('.slideshow');

  if (elem) {
    var slideshow = new _Slideshow.default(elem);
    window.slideshow = slideshow;
  }

  var renderHelper = document.querySelector('.renderHelper');

  if (renderHelper) {
    renderHelper.innerHTML = renderHelper();
  }
};
},{"./../scss/main.scss":"scss/main.scss","./components/Slideshow":"js/components/Slideshow.js","./components/helperRender":"js/components/helperRender.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56432" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map