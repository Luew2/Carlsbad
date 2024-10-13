"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Required dependencies
var htmlparser2 = require('htmlparser2');
var css = require('css');
var domSerializer = require('dom-serializer')["default"];
var Color = require('color');

// Main component creation function
function createFigmaComponentFromData(_x) {
  return _createFigmaComponentFromData.apply(this, arguments);
} // CSS parsing
function _createFigmaComponentFromData() {
  _createFigmaComponentFromData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(componentData) {
    var position,
      html,
      cssText,
      name,
      cssStyles,
      dom,
      frame,
      _iterator10,
      _step10,
      childNode,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          position = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {
            x: 0,
            y: 0
          };
          html = componentData.html, cssText = componentData.css, name = componentData.name;
          cssStyles = parseCSS(cssText);
          dom = htmlparser2.parseDocument(html);
          frame = figma.createFrame();
          frame.name = name || 'Component';
          frame.x = position.x;
          frame.y = position.y;

          // Set the layout mode and sizing modes for auto-layout
          frame.layoutMode = 'VERTICAL';
          frame.primaryAxisSizingMode = 'AUTO';
          frame.counterAxisSizingMode = 'AUTO';
          frame.clipsContent = false; // Prevent content from being clipped

          console.log("Creating component: ".concat(frame.name));
          if (!(dom.children && dom.children.length > 0)) {
            _context2.next = 31;
            break;
          }
          _iterator10 = _createForOfIteratorHelper(dom.children);
          _context2.prev = 15;
          _iterator10.s();
        case 17:
          if ((_step10 = _iterator10.n()).done) {
            _context2.next = 23;
            break;
          }
          childNode = _step10.value;
          _context2.next = 21;
          return processDomNode(childNode, frame, cssStyles);
        case 21:
          _context2.next = 17;
          break;
        case 23:
          _context2.next = 28;
          break;
        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](15);
          _iterator10.e(_context2.t0);
        case 28:
          _context2.prev = 28;
          _iterator10.f();
          return _context2.finish(28);
        case 31:
          figma.currentPage.appendChild(frame);
          console.log("Appended frame: ".concat(frame.name, " to current page."));
          return _context2.abrupt("return", frame);
        case 34:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[15, 25, 28, 31]]);
  }));
  return _createFigmaComponentFromData.apply(this, arguments);
}
function parseCSS(cssText) {
  var parsedCSS = css.parse(cssText);
  var styles = {};
  var _iterator = _createForOfIteratorHelper(parsedCSS.stylesheet.rules),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      if (rule.type === 'rule') {
        var _iterator2 = _createForOfIteratorHelper(rule.selectors),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var selector = _step2.value;
            var declarations = {};
            var _iterator3 = _createForOfIteratorHelper(rule.declarations),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var declaration = _step3.value;
                if (declaration.type === 'declaration') {
                  declarations[declaration.property] = declaration.value;
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            if (styles[selector]) {
              styles[selector] = _objectSpread(_objectSpread({}, styles[selector]), declarations);
            } else {
              styles[selector] = declarations;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return styles;
}

// HTML to Figma node mapping
function createFigmaNodeForHTML(tagName) {
  console.log("Handling HTML element: ".concat(tagName));
  var figmaNode;
  var blockElements = ['div', 'nav', 'ul', 'li', 'section', 'header', 'footer', 'article', 'aside', 'a', 'button'];
  var inlineElements = ['span', 'strong', 'em', 'b', 'i'];
  if (blockElements.includes(tagName)) {
    figmaNode = figma.createFrame();
    figmaNode.layoutMode = 'VERTICAL';
    figmaNode.primaryAxisSizingMode = 'AUTO';
    figmaNode.counterAxisSizingMode = 'AUTO';
  } else if (inlineElements.includes(tagName)) {
    figmaNode = figma.createFrame();
    figmaNode.layoutMode = 'HORIZONTAL';
    figmaNode.primaryAxisSizingMode = 'AUTO';
    figmaNode.counterAxisSizingMode = 'AUTO';
  } else if (tagName === 'img') {
    figmaNode = figma.createRectangle();
    figmaNode.name = 'Image';
  } else if (tagName === 'svg') {
    figmaNode = null;
  } else {
    figmaNode = figma.createFrame();
    // Default to auto-layout for other elements
    figmaNode.layoutMode = 'VERTICAL';
    figmaNode.primaryAxisSizingMode = 'AUTO';
    figmaNode.counterAxisSizingMode = 'AUTO';
  }
  if (figmaNode) {
    figmaNode.name = tagName;
    figmaNode.clipsContent = false; // Prevent clipping
    console.log("Created Figma node: ".concat(figmaNode.name));
  }
  return figmaNode;
}

// Main DOM processing function
function processDomNode(_x2, _x3, _x4) {
  return _processDomNode.apply(this, arguments);
} // Style parsing and application functions
function _processDomNode() {
  _processDomNode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(domNode, parentFigmaNode, cssStyles) {
    var parentStyles,
      depth,
      indent,
      figmaNode,
      nodeStyles,
      tagName,
      combinedStyles,
      _iterator11,
      _step11,
      childNode,
      textContent,
      _combinedStyles,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          parentStyles = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
          depth = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : 0;
          if (domNode) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return");
        case 4:
          indent = '  '.repeat(depth);
          console.log("".concat(indent, "Processing DOM node at depth ").concat(depth, ":"), domNode);
          console.log("".concat(indent, "DOM node type:"), domNode.type);
          nodeStyles = {};
          if (!(domNode.type === 'tag')) {
            _context3.next = 60;
            break;
          }
          tagName = domNode.name ? domNode.name.toLowerCase() : '';
          console.log("".concat(indent, "Tag name: ").concat(tagName));
          if (!(tagName === 'svg')) {
            _context3.next = 17;
            break;
          }
          _context3.next = 14;
          return handleSVGElement(domNode, cssStyles);
        case 14:
          figmaNode = _context3.sent;
          _context3.next = 24;
          break;
        case 17:
          if (!(tagName === 'img')) {
            _context3.next = 23;
            break;
          }
          _context3.next = 20;
          return handleImageNode(domNode);
        case 20:
          figmaNode = _context3.sent;
          _context3.next = 24;
          break;
        case 23:
          figmaNode = createFigmaNodeForHTML(tagName);
        case 24:
          nodeStyles = getNodeStyles(domNode, cssStyles);
          console.log("".concat(indent, "Node styles:"), nodeStyles);
          if (!figmaNode) {
            _context3.next = 58;
            break;
          }
          combinedStyles = _objectSpread(_objectSpread({}, parentStyles), nodeStyles);
          if (!(figmaNode.type === 'TEXT')) {
            _context3.next = 35;
            break;
          }
          _context3.next = 31;
          return setTextNodeContent(figmaNode, domNode, combinedStyles);
        case 31:
          _context3.next = 33;
          return applyTextStyles(figmaNode, combinedStyles);
        case 33:
          _context3.next = 58;
          break;
        case 35:
          _context3.next = 37;
          return applyStylesToFigmaNode(figmaNode, combinedStyles);
        case 37:
          applyAutoLayoutStyles(figmaNode, combinedStyles);
          if (!(figmaNode.type === 'FRAME')) {
            _context3.next = 58;
            break;
          }
          if (!(domNode.children && domNode.children.length > 0)) {
            _context3.next = 58;
            break;
          }
          console.log("".concat(indent, "Processing ").concat(domNode.children.length, " children of Frame node at depth ").concat(depth));
          _iterator11 = _createForOfIteratorHelper(domNode.children);
          _context3.prev = 42;
          _iterator11.s();
        case 44:
          if ((_step11 = _iterator11.n()).done) {
            _context3.next = 50;
            break;
          }
          childNode = _step11.value;
          _context3.next = 48;
          return processDomNode(childNode, figmaNode, cssStyles, nodeStyles, depth + 1);
        case 48:
          _context3.next = 44;
          break;
        case 50:
          _context3.next = 55;
          break;
        case 52:
          _context3.prev = 52;
          _context3.t0 = _context3["catch"](42);
          _iterator11.e(_context3.t0);
        case 55:
          _context3.prev = 55;
          _iterator11.f();
          return _context3.finish(55);
        case 58:
          _context3.next = 71;
          break;
        case 60:
          if (!(domNode.type === 'text')) {
            _context3.next = 71;
            break;
          }
          textContent = domNode.data.trim();
          console.log("".concat(indent, "Text content: \"").concat(textContent, "\""));
          if (!textContent) {
            _context3.next = 71;
            break;
          }
          figmaNode = figma.createText();
          console.log("".concat(indent, "Created Text node for text content"));
          _combinedStyles = _objectSpread({}, parentStyles);
          _context3.next = 69;
          return setTextNodeContent(figmaNode, domNode, _combinedStyles);
        case 69:
          _context3.next = 71;
          return applyTextStyles(figmaNode, _combinedStyles);
        case 71:
          if (figmaNode) {
            parentFigmaNode.appendChild(figmaNode);
            console.log("".concat(indent, "Appended node: ").concat(figmaNode.name, " to parent: ").concat(parentFigmaNode.name));
          }
        case 72:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[42, 52, 55, 58]]);
  }));
  return _processDomNode.apply(this, arguments);
}
function parsePadding(padding) {
  var parts = padding.split(' ').map(parseNumericValue);
  switch (parts.length) {
    case 1:
      return {
        top: parts[0],
        bottom: parts[0],
        left: parts[0],
        right: parts[0]
      };
    case 2:
      return {
        top: parts[0],
        bottom: parts[0],
        left: parts[1],
        right: parts[1]
      };
    case 3:
      return {
        top: parts[0],
        bottom: parts[2],
        left: parts[1],
        right: parts[1]
      };
    case 4:
      return {
        top: parts[0],
        bottom: parts[2],
        left: parts[3],
        right: parts[1]
      };
    default:
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
  }
}
function parseMargin(margin) {
  return parsePadding(margin); // Margin parsing is identical to padding
}
function parseTransform(transform) {
  var matrixMatch = transform.match(/matrix\(([^)]+)\)/);
  if (matrixMatch) {
    var values = matrixMatch[1].split(',').map(parseFloat);
    if (values.length >= 6) {
      return [[values[0], values[2], values[4]],
      // Note the positions of the indices
      [values[1], values[3], values[5]]];
    }
  }
  return [[1, 0, 0], [0, 1, 0]];
}
function parseNumericValue(value) {
  if (!value) return undefined;
  var numericValue = parseFloat(value);
  var unit = value.replace(numericValue, '').trim();
  switch (unit) {
    case 'px':
    case '':
      return numericValue;
    case 'em':
      return numericValue * 16;
    case '%':
      return numericValue / 100;
    default:
      return numericValue;
  }
}
function getTextContent(domNode) {
  var text = '';
  if (domNode.type === 'text') {
    text += domNode.data;
  } else if (domNode.children && domNode.children.length > 0) {
    var _iterator4 = _createForOfIteratorHelper(domNode.children),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var child = _step4.value;
        text += getTextContent(child);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  return text.trim();
}
function handleSVGElement(_x5, _x6) {
  return _handleSVGElement.apply(this, arguments);
}
function _handleSVGElement() {
  _handleSVGElement = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(domNode, cssStyles) {
    var svgString, svgNode, nodeStyles, fillColor;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log("Handling SVG element: ".concat(domNode.name));
          svgString = domSerializer(domNode, {
            xmlMode: true
          });
          console.log("Serialized SVG string: ".concat(svgString));
          svgNode = figma.createNodeFromSvg(svgString);
          console.log("Created SVG node: ".concat(svgNode.name));

          // Get the fill color from the styles
          nodeStyles = getNodeStyles(domNode, cssStyles);
          if (nodeStyles && nodeStyles['fill']) {
            fillColor = cssColorToFigmaRGB(nodeStyles['fill']);
            applyFillToVectorNodes(svgNode, fillColor);
          }
          return _context4.abrupt("return", svgNode);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error('Error creating SVG node:', _context4.t0);
          return _context4.abrupt("return", null);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _handleSVGElement.apply(this, arguments);
}
function applyFillToVectorNodes(node, fillColor) {
  if ('fills' in node && node.type === 'VECTOR') {
    node.fills = [{
      type: 'SOLID',
      color: fillColor
    }];
    console.log("Set fill color of vector node ".concat(node.name, " to"), fillColor);
  }
  if ('children' in node && node.children.length > 0) {
    var _iterator5 = _createForOfIteratorHelper(node.children),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var child = _step5.value;
        applyFillToVectorNodes(child, fillColor);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
}
function setTextNodeContent(_x7, _x8, _x9) {
  return _setTextNodeContent.apply(this, arguments);
}
function _setTextNodeContent() {
  _setTextNodeContent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(textNode, domNode, styles) {
    var fontFamily, fontStyleCSS, fontWeight, figmaFontStyle, fontName, textContent;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          fontFamily = parseFontFamily(styles['font-family']);
          fontStyleCSS = styles['font-style'] || '';
          fontWeight = styles['font-weight'] || '400'; // Default to 400 (Regular)
          // Map font-weight and font-style to Figma font style
          figmaFontStyle = mapFontWeightToFigmaStyle(fontStyleCSS, fontWeight);
          fontName = {
            family: fontFamily,
            style: figmaFontStyle
          };
          console.log("Attempting to load font: ".concat(fontName.family, " ").concat(fontName.style));
          _context5.prev = 6;
          _context5.next = 9;
          return figma.loadFontAsync(fontName);
        case 9:
          textNode.fontName = fontName;
          console.log("Set font: ".concat(fontName.family, " ").concat(fontName.style));
          _context5.next = 21;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](6);
          console.error("Failed to load font: ".concat(fontName.family, " ").concat(fontName.style), _context5.t0);

          // Fallback to default font
          fontName = {
            family: 'Roboto',
            style: 'Regular'
          };
          _context5.next = 19;
          return figma.loadFontAsync(fontName);
        case 19:
          textNode.fontName = fontName;
          console.log("Fallback to default font: ".concat(fontName.family, " ").concat(fontName.style));
        case 21:
          textContent = getTextContent(domNode);
          textNode.characters = textContent || ' '; // Ensure there's at least a space character
          console.log("Set text content: \"".concat(textNode.characters, "\""));
        case 24:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[6, 13]]);
  }));
  return _setTextNodeContent.apply(this, arguments);
}
function parseFontFamily(fontFamilyString) {
  if (!fontFamilyString) return 'Roboto';

  // Split the fontFamilyString by commas to handle multiple fonts
  var fontFamilies = fontFamilyString.split(',');
  var _iterator6 = _createForOfIteratorHelper(fontFamilies),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var family = _step6.value;
      // Remove any quotes and trim whitespace
      family = family.replace(/['"]/g, '').trim();

      // Return the first non-empty font family
      if (family) return family;
    }

    // Fallback to 'Roboto' if no valid fonts are found
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return 'Roboto';
}
function mapFontWeightToFigmaStyle(fontStyle, fontWeight) {
  var isItalic = fontStyle.toLowerCase().includes('italic');
  var style = 'Regular'; // Default style

  switch (fontWeight.toString()) {
    case '100':
    case '200':
      style = 'Thin';
      break;
    case '300':
      style = 'Light';
      break;
    case '400':
    case 'normal':
      style = 'Regular';
      break;
    case '500':
      style = 'Medium';
      break;
    case '600':
      style = 'Semi Bold';
      break;
    case '700':
    case 'bold':
      style = 'Bold';
      break;
    case '800':
      style = 'Extra Bold';
      break;
    case '900':
      style = 'Black';
      break;
    default:
      style = 'Regular';
      break;
  }
  if (isItalic) style += ' Italic';
  return style;
}
var loadedFonts = new Set();
function loadFont(_x10) {
  return _loadFont.apply(this, arguments);
}
function _loadFont() {
  _loadFont = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(fontName) {
    var fontKey;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          fontKey = "".concat(fontName.family, "_").concat(fontName.style);
          if (!loadedFonts.has(fontKey)) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return");
        case 3:
          _context6.prev = 3;
          _context6.next = 6;
          return figma.loadFontAsync(fontName);
        case 6:
          loadedFonts.add(fontKey);
          console.log("Loaded font: ".concat(fontKey));
          _context6.next = 14;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](3);
          console.error("Failed to load font: ".concat(fontKey), _context6.t0);
          throw _context6.t0;
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 10]]);
  }));
  return _loadFont.apply(this, arguments);
}
function applyAutoLayoutStyles(node, styles) {
  if (node.type !== 'FRAME') return;
  if (styles['display'] === 'flex') {
    // Determine layout mode based on flex-direction
    if (styles['flex-direction']) {
      node.layoutMode = styles['flex-direction'] === 'column' ? 'VERTICAL' : 'HORIZONTAL';
    }

    // Set primary axis alignment based on justify-content
    if (styles['justify-content']) {
      node.primaryAxisAlignItems = mapJustifyContent(styles['justify-content']);
    }

    // Set counter axis alignment based on align-items
    if (styles['align-items']) {
      node.counterAxisAlignItems = mapAlignItems(styles['align-items']);
    }

    // Set spacing based on gap
    if (styles['gap']) {
      node.itemSpacing = parseNumericValue(styles['gap']) || 0;
      console.log("Set item spacing to: ".concat(node.itemSpacing));
    }
    console.log("Applied auto-layout styles to node: ".concat(node.name));
  } else {
    node.layoutMode = 'NONE';
    console.log("Disabled auto-layout for node: ".concat(node.name));
  }
}
function mapJustifyContent(value) {
  var map = {
    'flex-start': 'MIN',
    'flex-end': 'MAX',
    'center': 'CENTER',
    'space-between': 'SPACE_BETWEEN',
    'space-around': 'SPACE_AROUND',
    'space-evenly': 'SPACE_EVENLY'
  };
  return map[value] || 'MIN';
}
function mapAlignItems(value) {
  var map = {
    'flex-start': 'MIN',
    'flex-end': 'MAX',
    'center': 'CENTER',
    'baseline': 'BASELINE'
  };
  return map[value] || 'MIN';
}
function getNodeStyles(domNode, cssStyles) {
  console.log("Fetching styles for node: ".concat(domNode.name));
  console.log("CSS Styles:", cssStyles);
  var styles = {};
  var selectors = getSelectorsForNode(domNode);
  console.log("Fetching styles for node: ".concat(domNode.name, ", Selectors:"), selectors);
  var sortedSelectors = selectors.sort(function (a, b) {
    return getSpecificity(a) - getSpecificity(b);
  });
  var _iterator7 = _createForOfIteratorHelper(sortedSelectors),
    _step7;
  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var selector = _step7.value;
      if (cssStyles[selector]) {
        Object.assign(styles, cssStyles[selector]);
        console.log("Applied styles from selector: ".concat(selector), cssStyles[selector]);
      }
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
  return styles;
}
function getSpecificity(selector) {
  var a = 0,
    b = 0,
    c = 0;
  var parts = selector.split(/(?=[#\.])/);
  var _iterator8 = _createForOfIteratorHelper(parts),
    _step8;
  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      var part = _step8.value;
      if (part.startsWith('#')) a += 1;else if (part.startsWith('.')) b += 1;else c += 1;
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }
  return a * 100 + b * 10 + c;
}
function getSelectorsForNode(domNode) {
  var selectors = [];
  var tagName = domNode.name ? domNode.name.toLowerCase() : '';
  var id = domNode.attribs && domNode.attribs.id;
  var classList = domNode.attribs && domNode.attribs["class"] ? domNode.attribs["class"].split(' ') : [];
  if (tagName) selectors.push(tagName);
  if (id) {
    selectors.push("#".concat(id));
    if (tagName) selectors.push("".concat(tagName, "#").concat(id));
  }
  var _iterator9 = _createForOfIteratorHelper(classList),
    _step9;
  try {
    for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
      var className = _step9.value;
      selectors.push(".".concat(className));
      if (tagName) selectors.push("".concat(tagName, ".").concat(className));
    }
  } catch (err) {
    _iterator9.e(err);
  } finally {
    _iterator9.f();
  }
  return selectors;
}
function applyStylesToFigmaNode(_x11, _x12) {
  return _applyStylesToFigmaNode.apply(this, arguments);
}
function _applyStylesToFigmaNode() {
  _applyStylesToFigmaNode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(node, styles) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          console.log("Applying styles to node: ".concat(node.name), styles);
          _context7.prev = 1;
          // Common styles for all node types
          applyOpacityStyles(node, styles);
          applyTransformStyles(node, styles);
          if (!(node.type === 'FRAME' || node.type === 'GROUP' || node.type === 'COMPONENT')) {
            _context7.next = 12;
            break;
          }
          // Apply container-specific styles
          applyBackgroundStyles(node, styles);
          applyLayoutStyles(node, styles);
          applyGeometryStyles(node, styles);
          applyAutoLayoutStyles(node, styles);
          applyBorderStyles(node, styles);
          _context7.next = 18;
          break;
        case 12:
          if (!(node.type === 'TEXT')) {
            _context7.next = 17;
            break;
          }
          _context7.next = 15;
          return applyTextStyles(node, styles);
        case 15:
          _context7.next = 18;
          break;
        case 17:
          if (node.type === 'VECTOR') {
            applyVectorStyles(node, styles);
          } else {
            // Apply general styles for other node types
            applyBackgroundStyles(node, styles);
            applyGeometryStyles(node, styles);
            applyBorderStyles(node, styles);
          }
        case 18:
          _context7.next = 23;
          break;
        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](1);
          console.error("Error applying styles to node: ".concat(node.name), _context7.t0);
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 20]]);
  }));
  return _applyStylesToFigmaNode.apply(this, arguments);
}
function applyVectorStyles(node, styles) {
  if (styles['fill']) {
    var fillColor = extractColor(styles['fill']);
    if (fillColor) {
      node.fills = [{
        type: 'SOLID',
        color: fillColor
      }];
      console.log("Set fill of vector node ".concat(node.name, " to"), fillColor);
    }
  }
  if (styles['stroke']) {
    var strokeColor = extractColor(styles['stroke']);
    if (strokeColor) {
      node.strokes = [{
        type: 'SOLID',
        color: strokeColor
      }];
      node.strokeWeight = parseNumericValue(styles['stroke-width']) || 1;
      console.log("Set stroke of vector node ".concat(node.name, " to"), strokeColor);
    }
  }
}
function applyBackgroundStyles(node, styles) {
  if (styles['background']) {
    var _extractColorFromBack = extractColorFromBackground(styles['background']),
      color = _extractColorFromBack.color,
      opacity = _extractColorFromBack.opacity;
    if (color) {
      node.fills = [{
        type: 'SOLID',
        color: color,
        opacity: opacity
      }];
      console.log("Set fills and opacity via 'background':", color, opacity);
    }
  } else if (styles['background-color']) {
    var _color = cssColorToFigmaRGB(styles['background-color']);
    node.fills = [{
      type: 'SOLID',
      color: _color
    }];
    console.log("Set fills via 'background-color':", _color);
  } else {
    node.fills = [];
    console.log("No background defined. Removed fills from node: ".concat(node.name));
  }
}
function applyGeometryStyles(node, styles) {
  if (styles['border-radius']) {
    node.cornerRadius = parseNumericValue(styles['border-radius']) || 0;
    console.log("Set border radius to:", node.cornerRadius);
  }

  // Avoid setting fixed width and height when using auto-layout
  if (styles['width']) {
    var width = parseNumericValue(styles['width']);
    if (!isNaN(width)) {
      if (node.layoutMode === 'NONE') {
        node.resize(width, node.height);
        console.log("Set width: ".concat(width));
      } else {
        // In auto-layout, set sizing mode to FIXED if width is specified
        node.primaryAxisSizingMode = 'FIXED';
        node.resize(width, node.height);
        console.log("Set width and primaryAxisSizingMode to FIXED: ".concat(width));
      }
    }
  }
  if (styles['height']) {
    var height = parseNumericValue(styles['height']);
    if (!isNaN(height)) {
      if (node.layoutMode === 'NONE') {
        node.resize(node.width, height);
        console.log("Set height: ".concat(height));
      } else {
        // In auto-layout, set sizing mode to FIXED if height is specified
        node.counterAxisSizingMode = 'FIXED';
        node.resize(node.width, height);
        console.log("Set height and counterAxisSizingMode to FIXED: ".concat(height));
      }
    }
  }
}
function applyLayoutStyles(node, styles) {
  applyPaddingStyles(node, styles);
  // applyMarginStyles(node, styles);
  if (styles['position'] === 'absolute') {
    // In Figma, this corresponds to setting the node to absolute positioning
    if ('layoutPositioning' in node) {
      node.layoutPositioning = 'ABSOLUTE';
    }
    console.log("Set node ".concat(node.name, " to absolute positioning."));
  } else {
    // Ensure the node is set to normal positioning
    if ('layoutPositioning' in node) {
      node.layoutPositioning = 'AUTO'; // or 'NORMAL'
    }
  }
  if (styles['display'] === 'flex') {
    var flexDirection = styles['flex-direction'] || 'row';
    node.layoutMode = flexDirection === 'column' ? 'VERTICAL' : 'HORIZONTAL';
    node.primaryAxisSizingMode = 'AUTO';
    node.counterAxisSizingMode = 'AUTO';
    console.log("Set node to auto-layout with layoutMode: ".concat(node.layoutMode));
  } else if (styles['display']) {
    node.layoutMode = 'NONE';
    console.log("Disabled auto-layout for node: ".concat(node.name));
  }
}
function applyPaddingStyles(node, styles) {
  if (node.type !== 'FRAME') {
    console.warn("Cannot apply padding to node type: ".concat(node.type));
    return;
  }
  if (styles['padding']) {
    var padding = parsePadding(styles['padding']);
    node.paddingTop = padding.top;
    node.paddingBottom = padding.bottom;
    node.paddingLeft = padding.left;
    node.paddingRight = padding.right;
    console.log("Set padding:", padding);
  } else {
    // Directly handle individual padding properties without using paddingProps and paddingMap
    var individualPaddings = ['padding-top', 'padding-bottom', 'padding-left', 'padding-right'];
    individualPaddings.forEach(function (prop) {
      var figmaProp = prop.replace('padding-', 'padding');
      var side = figmaProp.charAt(figmaProp.length - 1).toUpperCase() + figmaProp.slice(0, -1);
      var value = parseNumericValue(styles[prop]);
      if (!isNaN(value)) {
        node["padding".concat(side)] = value;
        console.log("Set padding".concat(side, " to ").concat(value));
      }
    });
    console.log("Set individual padding:", individualPaddings.map(function (prop) {
      return "".concat(prop, "=").concat(styles[prop]);
    }).join(', '));
  }
}
function applyMarginStyles(node, styles) {
  if (node.type !== 'FRAME') {
    console.warn("Cannot apply margin to node type: ".concat(node.type));
    return;
  }
  if (styles['margin']) {
    var margin = parseMargin(styles['margin']);
    node.x += margin.left;
    node.y += margin.top;
    console.log("Set margin:", margin);
  } else {
    var marginProps = ['margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
    marginProps.forEach(function (prop) {
      var value = parseNumericValue(styles[prop]);
      if (!isNaN(value)) {
        if (prop.includes('left') || prop.includes('right')) node.x += value;
        if (prop.includes('top') || prop.includes('bottom')) node.y += value;
        console.log("Set ".concat(prop, " to ").concat(value));
      }
    });
    console.log("Set individual margin:", marginProps.map(function (prop) {
      return "".concat(prop, "=").concat(styles[prop]);
    }).join(', '));
  }
}
function applyTextStyles(_x13, _x14) {
  return _applyTextStyles.apply(this, arguments);
}
function _applyTextStyles() {
  _applyTextStyles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(node, styles) {
    var fontFamily, fontStyleCSS, fontWeight, figmaFontStyle, fontName, fallbackFont, color, alignmentMap, lineHeightValue;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          // Set font size
          if (styles['font-size']) {
            node.fontSize = parseNumericValue(styles['font-size']) || 12;
            console.log("Set font size to: ".concat(node.fontSize));
          }

          // Parse font family
          fontFamily = parseFontFamily(styles['font-family']); // Map font-weight and font-style to Figma font style
          fontStyleCSS = styles['font-style'] || ''; // e.g., 'italic'
          fontWeight = styles['font-weight'] || '400'; // e.g., 'bold' or '700'
          figmaFontStyle = mapFontWeightToFigmaStyle(fontStyleCSS, fontWeight);
          fontName = {
            family: fontFamily,
            style: figmaFontStyle
          };
          console.log("Attempting to load font: ".concat(fontName.family, " ").concat(fontName.style));
          _context8.prev = 7;
          _context8.next = 10;
          return loadFont(fontName);
        case 10:
          node.fontName = fontName;
          console.log("Set font to: ".concat(fontName.family, " ").concat(fontName.style));
          _context8.next = 22;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](7);
          console.error("Failed to load font: ".concat(fontName.family, " ").concat(fontName.style), _context8.t0);
          // Fallback to default font
          fallbackFont = {
            family: 'Roboto',
            style: 'Regular'
          };
          _context8.next = 20;
          return loadFont(fallbackFont);
        case 20:
          node.fontName = fallbackFont;
          console.log("Fallback to default font: ".concat(fallbackFont.family, " ").concat(fallbackFont.style));
        case 22:
          // Set text color
          if (styles['color']) {
            color = cssColorToFigmaRGB(styles['color']);
            node.fills = [{
              type: 'SOLID',
              color: color
            }];
            console.log("Set text color to:", color);
          }

          // Set text alignment
          if (styles['text-align']) {
            alignmentMap = {
              'left': 'LEFT',
              'center': 'CENTER',
              'right': 'RIGHT',
              'justify': 'JUSTIFIED'
            };
            node.textAlignHorizontal = alignmentMap[styles['text-align']] || 'LEFT';
            console.log("Set text alignment to: ".concat(node.textAlignHorizontal));
          }

          // Set line height
          if (styles['line-height']) {
            lineHeightValue = parseNumericValue(styles['line-height']);
            if (!isNaN(lineHeightValue)) {
              node.lineHeight = {
                unit: 'PIXELS',
                value: lineHeightValue
              };
              console.log("Set line height to: ".concat(node.lineHeight.value));
            } else {
              node.lineHeight = {
                unit: 'PIXELS',
                value: node.fontSize * 1.2
              };
              console.log("Set default line height to: ".concat(node.lineHeight.value));
            }
          }
        case 25:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[7, 14]]);
  }));
  return _applyTextStyles.apply(this, arguments);
}
function applyBorderStyles(node, styles) {
  if (styles['border'] || styles['border-color'] || styles['border-width']) {
    var borderColor = styles['border-color'] || 'rgba(255,255,255,1)';
    var borderWidth = styles['border-width'] ? parseNumericValue(styles['border-width']) : 1;
    if (styles['border']) {
      // Improved parsing of border shorthand using regex
      // This regex captures border-width, border-style, and border-color
      var borderRegex = /^(\d+px)?\s*(\S+)?\s*(rgba?\([^)]+\)|#[0-9A-Fa-f]{3,6})?$/i;
      var borderMatch = styles['border'].match(borderRegex);
      if (borderMatch) {
        if (borderMatch[1]) {
          borderWidth = parseNumericValue(borderMatch[1]);
        }
        if (borderMatch[3]) {
          borderColor = borderMatch[3];
        }
      }
    }

    // Now set the stroke
    try {
      var color = cssColorToFigmaRGB(borderColor);
      node.strokes = [{
        type: 'SOLID',
        color: color
      }];
      node.strokeWeight = borderWidth;
      console.log("Set stroke: color=".concat(borderColor, ", strokeWeight=").concat(borderWidth));
    } catch (error) {
      console.error("Error setting stroke: color=".concat(borderColor, ", strokeWeight=").concat(borderWidth), error);
    }
  }
}
function applyTransformStyles(node, styles) {
  var transformableNodeTypes = ['VECTOR', 'FRAME', 'GROUP', 'INSTANCE', 'COMPONENT', 'RECTANGLE', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE', 'TEXT'];
  if (styles['transform'] && transformableNodeTypes.includes(node.type)) {
    try {
      node.relativeTransform = parseTransform(styles['transform']);
      console.log("Set transform for node: ".concat(node.name));
    } catch (error) {
      console.error("Error setting transform for node: ".concat(node.name), error);
    }
  }
}
function applyOpacityStyles(node, styles) {
  if (styles['opacity']) {
    var opacityValue = parseFloat(styles['opacity']);
    if (opacityValue >= 0 && opacityValue <= 1) {
      node.opacity = opacityValue;
    } else {
      console.warn("Invalid opacity value: ".concat(opacityValue, ". Must be between 0 and 1."));
    }
  }
}

// Color Utilities
function extractColorFromBackground(background) {
  if (!background || typeof background !== 'string') {
    return {
      color: null,
      opacity: 1
    };
  }

  // Enhanced regex to capture complete rgba(), rgb(), and hex colors
  var colorRegex = /(rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*\d*\.?\d+)?\))|(#([0-9A-Fa-f]{3,6}))/i;
  var match = background.match(colorRegex);
  if (!match) {
    // If no color part is found, return default
    return {
      color: null,
      opacity: 1
    };
  }
  var colorString = match[0];

  // Handle rgba(), rgb(), and hex colors
  var rgbaMatch = colorString.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    var r = parseFloat(rgbaMatch[1]) / 255;
    var g = parseFloat(rgbaMatch[2]) / 255;
    var b = parseFloat(rgbaMatch[3]) / 255;
    var a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return {
      color: {
        r: r,
        g: g,
        b: b
      },
      opacity: a
    };
  }
  var hexMatch = colorString.match(/#([0-9A-Fa-f]{3,6})/);
  if (hexMatch) {
    return {
      color: hexToFigmaRGB(hexMatch[0]),
      opacity: 1
    };
  }

  // If color format is unrecognized, return default
  return {
    color: null,
    opacity: 1
  };
}
function cssColorToFigmaRGB(cssColor) {
  try {
    var color = Color(cssColor);
    return {
      r: color.red() / 255,
      g: color.green() / 255,
      b: color.blue() / 255
    };
  } catch (error) {
    console.error("Failed to parse CSS color: ".concat(cssColor), error);
    return {
      r: 1,
      g: 1,
      b: 1
    }; // Default to white
  }
}
function hexToFigmaRGB(hex) {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16 & 255) / 255,
    g: (bigint >> 8 & 255) / 255,
    b: (bigint & 255) / 255
  };
}

// Image Handling
function handleImageNode(_x15) {
  return _handleImageNode.apply(this, arguments);
} // Design System Import
function _handleImageNode() {
  _handleImageNode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(domNode) {
    var imgUrl, response, arrayBuffer, image, imageHash, width, height;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          imgUrl = domNode.attribs.src;
          if (imgUrl) {
            _context9.next = 4;
            break;
          }
          return _context9.abrupt("return", null);
        case 4:
          _context9.next = 6;
          return fetch(imgUrl);
        case 6:
          response = _context9.sent;
          if (response.ok) {
            _context9.next = 9;
            break;
          }
          throw new Error("Network response was not ok: ".concat(response.statusText));
        case 9:
          _context9.next = 11;
          return response.arrayBuffer();
        case 11:
          arrayBuffer = _context9.sent;
          image = figma.createRectangle();
          imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
          image.fills = [{
            type: 'IMAGE',
            scaleMode: 'FILL',
            imageHash: imageHash
          }];
          image.name = 'Image';
          width = parseNumericValue(domNode.attribs.width) || 100;
          height = parseNumericValue(domNode.attribs.height) || 100;
          image.resize(width, height);
          console.log("Created Image node with size: ".concat(width, "x").concat(height));
          return _context9.abrupt("return", image);
        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching image:', _context9.t0);
          return _context9.abrupt("return", null);
        case 27:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 23]]);
  }));
  return _handleImageNode.apply(this, arguments);
}
function importDesignSystem(_x16) {
  return _importDesignSystem.apply(this, arguments);
}
function _importDesignSystem() {
  _importDesignSystem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(designData) {
    var currentYPosition, componentSpacing, _iterator12, _step12, componentData, frame;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          console.log('Importing design data:', designData);
          _context10.prev = 1;
          if (!designData.colors) {
            _context10.next = 6;
            break;
          }
          console.log('Importing colors...');
          _context10.next = 6;
          return importColors(designData.colors);
        case 6:
          if (!designData.fonts) {
            _context10.next = 10;
            break;
          }
          console.log('Importing fonts...');
          _context10.next = 10;
          return importFonts(designData.fonts);
        case 10:
          if (!designData.buttons) {
            _context10.next = 14;
            break;
          }
          console.log('Importing buttons...');
          _context10.next = 14;
          return importButtons(designData.buttons);
        case 14:
          if (!designData.components) {
            _context10.next = 37;
            break;
          }
          console.log('Importing components...');

          // Initialize the position tracking variable
          currentYPosition = 0;
          componentSpacing = 100; // Space between components, adjust as needed
          _iterator12 = _createForOfIteratorHelper(designData.components);
          _context10.prev = 19;
          _iterator12.s();
        case 21:
          if ((_step12 = _iterator12.n()).done) {
            _context10.next = 29;
            break;
          }
          componentData = _step12.value;
          _context10.next = 25;
          return createFigmaComponentFromData(componentData, {
            x: 0,
            y: currentYPosition
          });
        case 25:
          frame = _context10.sent;
          // Update the currentXPosition for the next component
          currentYPosition += frame.height + componentSpacing;
        case 27:
          _context10.next = 21;
          break;
        case 29:
          _context10.next = 34;
          break;
        case 31:
          _context10.prev = 31;
          _context10.t0 = _context10["catch"](19);
          _iterator12.e(_context10.t0);
        case 34:
          _context10.prev = 34;
          _iterator12.f();
          return _context10.finish(34);
        case 37:
          if (!designData.logoUrl) {
            _context10.next = 41;
            break;
          }
          console.log('Importing logo...');
          _context10.next = 41;
          return importLogo(designData.logoUrl);
        case 41:
          _context10.next = 47;
          break;
        case 43:
          _context10.prev = 43;
          _context10.t1 = _context10["catch"](1);
          console.error('Error during importDesignSystem:', _context10.t1);
          throw _context10.t1;
        case 47:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 43], [19, 31, 34, 37]]);
  }));
  return _importDesignSystem.apply(this, arguments);
}
function importLogo(_x17) {
  return _importLogo.apply(this, arguments);
}
function _importLogo() {
  _importLogo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(logoUrl) {
    var response, arrayBuffer, image, imageHash;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return fetch(logoUrl);
        case 3:
          response = _context11.sent;
          if (response.ok) {
            _context11.next = 6;
            break;
          }
          throw new Error('Network response was not ok');
        case 6:
          _context11.next = 8;
          return response.arrayBuffer();
        case 8:
          arrayBuffer = _context11.sent;
          image = figma.createRectangle();
          imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
          image.fills = [{
            type: 'IMAGE',
            imageHash: imageHash,
            scaleMode: 'FILL'
          }];
          image.name = 'Logo';
          figma.currentPage.appendChild(image);
          _context11.next = 19;
          break;
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](0);
          console.error('Error importing logo:', _context11.t0);
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 16]]);
  }));
  return _importLogo.apply(this, arguments);
}
function importColors(_x18) {
  return _importColors.apply(this, arguments);
}
function _importColors() {
  _importColors = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(colors) {
    var _iterator13, _step13, colorToken, paintStyle, color;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _iterator13 = _createForOfIteratorHelper(colors);
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              colorToken = _step13.value;
              paintStyle = figma.createPaintStyle();
              paintStyle.name = colorToken.name || "Color ".concat(colorToken.value);
              color = hexToFigmaRGB(colorToken.value);
              paintStyle.paints = [{
                type: 'SOLID',
                color: color
              }];
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        case 2:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _importColors.apply(this, arguments);
}
function importFonts(_x19) {
  return _importFonts.apply(this, arguments);
}
function _importFonts() {
  _importFonts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(fonts) {
    var loadedFonts, _iterator14, _step14, fontToken, fontFamily, fontStyle, fontKey, textStyle;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          loadedFonts = new Set();
          _iterator14 = _createForOfIteratorHelper(fonts);
          _context13.prev = 2;
          _iterator14.s();
        case 4:
          if ((_step14 = _iterator14.n()).done) {
            _context13.next = 28;
            break;
          }
          fontToken = _step14.value;
          fontFamily = fontToken.value;
          fontStyle = fontToken.style || 'Regular';
          fontKey = "".concat(fontFamily, "-").concat(fontStyle);
          if (loadedFonts.has(fontKey)) {
            _context13.next = 22;
            break;
          }
          _context13.prev = 10;
          _context13.next = 13;
          return figma.loadFontAsync({
            family: fontFamily,
            style: fontStyle
          });
        case 13:
          loadedFonts.add(fontKey);
          console.log("Loaded font: ".concat(fontFamily, " ").concat(fontStyle));
          _context13.next = 20;
          break;
        case 17:
          _context13.prev = 17;
          _context13.t0 = _context13["catch"](10);
          console.error("Failed to load font: ".concat(fontFamily, " ").concat(fontStyle), _context13.t0);
        case 20:
          _context13.next = 23;
          break;
        case 22:
          console.log("Font already loaded: ".concat(fontFamily, " ").concat(fontStyle));
        case 23:
          textStyle = figma.createTextStyle();
          textStyle.name = fontToken.name || "".concat(fontFamily, " ").concat(fontStyle);
          textStyle.fontName = {
            family: fontFamily,
            style: fontStyle
          };
        case 26:
          _context13.next = 4;
          break;
        case 28:
          _context13.next = 33;
          break;
        case 30:
          _context13.prev = 30;
          _context13.t1 = _context13["catch"](2);
          _iterator14.e(_context13.t1);
        case 33:
          _context13.prev = 33;
          _iterator14.f();
          return _context13.finish(33);
        case 36:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[2, 30, 33, 36], [10, 17]]);
  }));
  return _importFonts.apply(this, arguments);
}
function importButtons(_x20) {
  return _importButtons.apply(this, arguments);
}
function _importButtons() {
  _importButtons = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(buttons) {
    var _iterator15, _step15, buttonToken;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _iterator15 = _createForOfIteratorHelper(buttons);
          _context14.prev = 1;
          _iterator15.s();
        case 3:
          if ((_step15 = _iterator15.n()).done) {
            _context14.next = 9;
            break;
          }
          buttonToken = _step15.value;
          _context14.next = 7;
          return createButtonComponent(buttonToken);
        case 7:
          _context14.next = 3;
          break;
        case 9:
          _context14.next = 14;
          break;
        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](1);
          _iterator15.e(_context14.t0);
        case 14:
          _context14.prev = 14;
          _iterator15.f();
          return _context14.finish(14);
        case 17:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[1, 11, 14, 17]]);
  }));
  return _importButtons.apply(this, arguments);
}
function createButtonComponent(_x21) {
  return _createButtonComponent.apply(this, arguments);
} // Plugin UI Setup
function _createButtonComponent() {
  _createButtonComponent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(buttonToken) {
    var value, name, component, rect, text, fontFamily, fontStyle;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          value = buttonToken.value, name = buttonToken.name;
          component = figma.createComponent();
          component.name = name || 'Button';
          rect = figma.createRectangle();
          component.appendChild(rect);
          if (value['background-color']) {
            rect.fills = [{
              type: 'SOLID',
              color: cssColorToFigmaRGB(value['background-color'])
            }];
            rect.opacity = 1;
            console.log("Set button background color:", cssColorToFigmaRGB(value['background-color']));
          }
          if (value['border-radius']) {
            rect.cornerRadius = parseInt(value['border-radius']);
            console.log("Set button border radius:", rect.cornerRadius);
          }
          text = figma.createText();
          fontFamily = value['font-family'] || 'Roboto';
          fontStyle = value['font-style'] || 'Regular';
          _context15.next = 12;
          return figma.loadFontAsync({
            family: fontFamily,
            style: fontStyle
          });
        case 12:
          text.characters = name || 'Button';
          _context15.next = 15;
          return applyStylesToFigmaNode(text, value);
        case 15:
          component.appendChild(text);
          text.x = rect.x + rect.width / 2 - text.width / 2;
          text.y = rect.y + rect.height / 2 - text.height / 2;
          component.resize(rect.width, rect.height);
        case 19:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _createButtonComponent.apply(this, arguments);
}
figma.showUI(__html__, {
  width: 320,
  height: 200
});
figma.ui.onmessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(msg) {
    var designData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Message received from UI:', msg);
          if (!(msg.type === 'import-design')) {
            _context.next = 17;
            break;
          }
          designData = msg.designData;
          console.log('Starting import of design data:', designData);
          _context.prev = 4;
          _context.next = 7;
          return importDesignSystem(designData);
        case 7:
          figma.notify('Design system imported successfully!');
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          console.error('Error importing design system:', _context.t0);
          figma.notify('Failed to import design system. Check console for details.');
        case 14:
          _context.prev = 14;
          figma.closePlugin();
          return _context.finish(14);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 10, 14, 17]]);
  }));
  return function (_x22) {
    return _ref.apply(this, arguments);
  };
}();