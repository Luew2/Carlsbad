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
// src/code.js
var htmlparser2 = require('htmlparser2');
var css = require('css');
var domSerializer = require('dom-serializer');
var Color = require('color');
var _require = require('domhandler'),
  Element = _require.Element,
  Text = _require.Text,
  Comment = _require.Comment;
function createFigmaComponentFromData(_x) {
  return _createFigmaComponentFromData.apply(this, arguments);
}
function _createFigmaComponentFromData() {
  _createFigmaComponentFromData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(componentData) {
    var html, cssText, name, cssStyles, dom, frame, _iterator7, _step7, childNode;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          html = componentData.html, cssText = componentData.css, name = componentData.name; // Parse CSS
          cssStyles = parseCSS(cssText); // Parse HTML
          dom = htmlparser2.parseDocument(html); // Create a Figma frame to hold the component
          frame = figma.createFrame();
          frame.name = name || 'Component';
          console.log("Creating component: ".concat(frame.name)); // Debugging

          // Iterate through child nodes of the DOM root and process each
          if (!(dom.children && dom.children.length > 0)) {
            _context2.next = 24;
            break;
          }
          _iterator7 = _createForOfIteratorHelper(dom.children);
          _context2.prev = 8;
          _iterator7.s();
        case 10:
          if ((_step7 = _iterator7.n()).done) {
            _context2.next = 16;
            break;
          }
          childNode = _step7.value;
          _context2.next = 14;
          return processDomNode(childNode, frame, cssStyles);
        case 14:
          _context2.next = 10;
          break;
        case 16:
          _context2.next = 21;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](8);
          _iterator7.e(_context2.t0);
        case 21:
          _context2.prev = 21;
          _iterator7.f();
          return _context2.finish(21);
        case 24:
          figma.currentPage.appendChild(frame);
          console.log("Appended frame: ".concat(frame.name, " to current page.")); // Debugging
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[8, 18, 21, 24]]);
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
                declarations[declaration.property] = declaration.value;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            styles[selector] = declarations;
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

// figma/src/code.js
function processDomNode(_x2, _x3, _x4) {
  return _processDomNode.apply(this, arguments);
}
function _processDomNode() {
  _processDomNode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(domNode, parentFigmaNode, cssStyles) {
    var parentStyles,
      depth,
      indent,
      figmaNode,
      nodeStyles,
      tagName,
      skip,
      svgString,
      combinedStyles,
      fontFamily,
      fontStyle,
      fontName,
      textContent,
      _combinedStyles,
      _fontFamily,
      _fontStyle,
      _fontName,
      currentParentFigmaNode,
      _iterator8,
      _step8,
      childNode,
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
          indent = '  '.repeat(depth); // Indentation for debug statements
          _context3.prev = 5;
          console.log("".concat(indent, "Processing DOM node at depth ").concat(depth, ":"), domNode); // Debugging
          console.log("".concat(indent, "DOM node type:"), domNode.type); // Debugging
          nodeStyles = {};
          if (!(domNode.type === 'tag')) {
            _context3.next = 48;
            break;
          }
          tagName = domNode.name ? domNode.name.toLowerCase() : '';
          console.log("".concat(indent, "Tag name: ").concat(tagName)); // Debugging

          // Determine whether to skip this node
          skip = false; // Determine the Figma node to create based on the tag name
          if (!(tagName === 'svg')) {
            _context3.next = 20;
            break;
          }
          console.log("".concat(indent, "Handling SVG element")); // Debugging
          // Handle SVG
          svgString = domSerializer(domNode, {
            xmlMode: true
          });
          figmaNode = figma.createNodeFromSvg(svgString);
          console.log("".concat(indent, "Created SVG node: ").concat(figmaNode.name)); // Debugging
          _context3.next = 29;
          break;
        case 20:
          if (!(tagName === 'img')) {
            _context3.next = 28;
            break;
          }
          console.log("".concat(indent, "Handling IMG element")); // Debugging
          // Handle images
          _context3.next = 24;
          return handleImageNode(domNode);
        case 24:
          figmaNode = _context3.sent;
          console.log("".concat(indent, "Created Image node: ").concat(figmaNode.name)); // Debugging
          _context3.next = 29;
          break;
        case 28:
          if (['p', 'span', 'h1', 'h2'].includes(tagName)) {
            console.log("".concat(indent, "Handling text element: ").concat(tagName)); // Debugging
            // Handle text elements
            figmaNode = figma.createText();
            console.log("".concat(indent, "Created Text node: ").concat(figmaNode.name)); // Debugging
          } else {
            console.log("".concat(indent, "Skipping unrecognized element: ").concat(tagName)); // Debugging
            skip = true;
            // Do not create a figmaNode for unrecognized elements
          }
        case 29:
          // Get node styles
          nodeStyles = getNodeStyles(domNode, cssStyles);
          console.log("".concat(indent, "Node styles:"), nodeStyles); // Debugging
          if (!(!skip && figmaNode)) {
            _context3.next = 46;
            break;
          }
          // Combine styles
          combinedStyles = _objectSpread(_objectSpread({}, parentStyles), nodeStyles); // Apply styles to the Figma node
          applyStylesToFigmaNode(figmaNode, nodeStyles, parentStyles);
          console.log("".concat(indent, "Applied styles to node: ").concat(figmaNode.name)); // Debugging

          // Handle text content if it's a Text node
          if (!(figmaNode.type === 'TEXT')) {
            _context3.next = 46;
            break;
          }
          // Extract font information
          fontFamily = combinedStyles['font-family'] || 'Roboto';
          fontStyle = combinedStyles['font-style'] || 'Regular';
          fontName = {
            family: fontFamily,
            style: fontStyle
          };
          console.log("".concat(indent, "Loading font: ").concat(fontName.family, " ").concat(fontName.style)); // Debugging
          _context3.next = 42;
          return figma.loadFontAsync(fontName);
        case 42:
          // Set fontName
          figmaNode.fontName = fontName;
          console.log("".concat(indent, "Set font family:"), figmaNode.fontName); // Debugging

          // Set text characters
          figmaNode.characters = getTextContent(domNode);
          console.log("".concat(indent, "Set text characters: \"").concat(figmaNode.characters, "\"")); // Debugging
        case 46:
          _context3.next = 67;
          break;
        case 48:
          if (!(domNode.type === 'text')) {
            _context3.next = 67;
            break;
          }
          // Handle text nodes
          textContent = domNode.data.trim();
          console.log("".concat(indent, "Text content: \"").concat(textContent, "\"")); // Debugging
          if (!textContent) {
            _context3.next = 67;
            break;
          }
          figmaNode = figma.createText();
          console.log("".concat(indent, "Created Text node for text content")); // Debugging

          // Combine styles
          _combinedStyles = _objectSpread({}, parentStyles); // Extract font information
          _fontFamily = _combinedStyles['font-family'] || 'Roboto';
          _fontStyle = _combinedStyles['font-style'] || 'Regular';
          _fontName = {
            family: _fontFamily,
            style: _fontStyle
          };
          console.log("".concat(indent, "Loading font: ").concat(_fontName.family, " ").concat(_fontName.style)); // Debugging
          _context3.next = 61;
          return figma.loadFontAsync(_fontName);
        case 61:
          // Set fontName
          figmaNode.fontName = _fontName;
          console.log("".concat(indent, "Set font family:"), figmaNode.fontName); // Debugging

          // Apply styles
          applyStylesToFigmaNode(figmaNode, {}, parentStyles);
          console.log("".concat(indent, "Applied parent styles to text node")); // Debugging

          // Set text characters
          figmaNode.characters = textContent;
          console.log("".concat(indent, "Set text characters: \"").concat(figmaNode.characters, "\"")); // Debugging
        case 67:
          // Decide which parent to use for processing children
          currentParentFigmaNode = parentFigmaNode; // Append the Figma node to the parent and set current parent
          if (figmaNode) {
            parentFigmaNode.appendChild(figmaNode);
            console.log("".concat(indent, "Appended node: ").concat(figmaNode.name, " to parent: ").concat(parentFigmaNode.name)); // Debugging
            currentParentFigmaNode = figmaNode;
          } else {
            console.log("".concat(indent, "No Figma node created for DOM node type: ").concat(domNode.type)); // Debugging
            // Use parentFigmaNode as current parent
          }

          // Process children
          if (!(domNode.children && domNode.children.length > 0)) {
            _context3.next = 91;
            break;
          }
          console.log("".concat(indent, "Processing ").concat(domNode.children.length, " children of node at depth ").concat(depth)); // Debugging
          _iterator8 = _createForOfIteratorHelper(domNode.children);
          _context3.prev = 72;
          _iterator8.s();
        case 74:
          if ((_step8 = _iterator8.n()).done) {
            _context3.next = 81;
            break;
          }
          childNode = _step8.value;
          console.log("".concat(indent, "Processing child node at depth ").concat(depth + 1)); // Debugging
          _context3.next = 79;
          return processDomNode(childNode, currentParentFigmaNode, cssStyles, nodeStyles, depth + 1);
        case 79:
          _context3.next = 74;
          break;
        case 81:
          _context3.next = 86;
          break;
        case 83:
          _context3.prev = 83;
          _context3.t0 = _context3["catch"](72);
          _iterator8.e(_context3.t0);
        case 86:
          _context3.prev = 86;
          _iterator8.f();
          return _context3.finish(86);
        case 89:
          _context3.next = 92;
          break;
        case 91:
          console.log("".concat(indent, "No children to process for node at depth ").concat(depth)); // Debugging
        case 92:
          _context3.next = 97;
          break;
        case 94:
          _context3.prev = 94;
          _context3.t1 = _context3["catch"](5);
          console.error("".concat(indent, "Error processing node at depth ").concat(depth, ": ").concat(domNode.name || domNode.type), _context3.t1);
        case 97:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 94], [72, 83, 86, 89]]);
  }));
  return _processDomNode.apply(this, arguments);
}
function getNodeStyles(domNode, cssStyles) {
  var styles = {};
  var selectors = getSelectorsForNode(domNode);
  console.log("Fetching styles for node: ".concat(domNode.name, ", Selectors:"), selectors); // Debugging
  var _iterator4 = _createForOfIteratorHelper(selectors),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var selector = _step4.value;
      if (cssStyles[selector]) {
        Object.assign(styles, cssStyles[selector]);
        console.log("Applied styles from selector: ".concat(selector), cssStyles[selector]); // Debugging
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return styles;
}
function getSelectorsForNode(domNode) {
  var selectors = [];
  var tagName = domNode.name ? domNode.name.toLowerCase() : '';
  var id = domNode.attribs && domNode.attribs.id;
  var classList = domNode.attribs && domNode.attribs["class"] ? domNode.attribs["class"].split(' ') : [];

  // Element selector
  if (tagName) selectors.push(tagName);

  // ID selector
  if (id) {
    selectors.push("#".concat(id));
    if (tagName) selectors.push("".concat(tagName, "#").concat(id));
  }

  // Class selectors
  var _iterator5 = _createForOfIteratorHelper(classList),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var className = _step5.value;
      selectors.push(".".concat(className));
      if (tagName) selectors.push("".concat(tagName, ".").concat(className));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  return selectors;
}
function parseNumericValue(value) {
  var numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(numericValue) ? undefined : numericValue;
}
function applyStylesToFigmaNode(node, styles) {
  var parentStyles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var combinedStyles = _objectSpread(_objectSpread({}, parentStyles), styles);
  console.log("Applying styles to node: ".concat(node.name), combinedStyles); // Debugging

  // Handle background and background-color
  if (combinedStyles['background']) {
    var _extractColorFromBack = extractColorFromBackground(combinedStyles['background']),
      color = _extractColorFromBack.color,
      opacity = _extractColorFromBack.opacity;
    if (color) {
      node.fills = [{
        type: 'SOLID',
        color: color
      }];
      node.opacity = opacity;
      console.log("Set fills and opacity via 'background':", color, opacity); // Debugging
    }
  } else if (combinedStyles['background-color']) {
    var _color = cssColorToFigmaRGB(combinedStyles['background-color']);
    node.fills = [{
      type: 'SOLID',
      color: _color
    }];
    node.opacity = 1; // Default opacity
    console.log("Set fills via 'background-color':", _color); // Debugging
  } else {
    // If no background is specified, remove existing fills to prevent white boxes
    node.fills = [];
    console.log("No background defined. Removed fills from node: ".concat(node.name)); // Debugging
  }

  // Handle text properties
  if (node.type === 'TEXT') {
    // Remove setting node.fontName here
    if (combinedStyles['font-size']) {
      node.fontSize = parseInt(combinedStyles['font-size'], 10);
      console.log("Set font size:", node.fontSize); // Debugging
    }
    if (combinedStyles['color']) {
      var _color2 = cssColorToFigmaRGB(combinedStyles['color']);
      node.fills = [{
        type: 'SOLID',
        color: _color2
      }];
      node.opacity = 1; // Default opacity for text color
      console.log("Set text fills:", _color2); // Debugging
    }
  }

  // Map logical properties to physical ones
  if (combinedStyles['block-size'] && !combinedStyles['height']) {
    combinedStyles['height'] = combinedStyles['block-size'];
  }
  if (combinedStyles['inline-size'] && !combinedStyles['width']) {
    combinedStyles['width'] = combinedStyles['inline-size'];
  }

  // Now handle width and height as before
  if (combinedStyles['width']) {
    var width = parseNumericValue(combinedStyles['width']);
    if (!isNaN(width)) {
      node.resize(width, node.height);
      console.log("Resized width to:", width); // Debugging
    }
  }
  if (combinedStyles['height']) {
    var height = parseNumericValue(combinedStyles['height']);
    if (!isNaN(height)) {
      node.resize(node.width, height);
      console.log("Resized height to:", height); // Debugging
    }
  }

  // Handle position (Note: Figma uses absolute positioning)
  if (combinedStyles['left'] && combinedStyles['top']) {
    node.x = parseInt(combinedStyles['left'], 10);
    node.y = parseInt(combinedStyles['top'], 10);
    console.log("Set position to: x=".concat(node.x, ", y=").concat(node.y)); // Debugging
  }

  // Handle border radius
  if (combinedStyles['border-radius']) {
    if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
      node.cornerRadius = parseInt(combinedStyles['border-radius'], 10);
      console.log("Set border radius to:", node.cornerRadius); // Debugging
    }
  }
}

// Utility function to extract color from background shorthand
function extractColorFromBackground(background) {
  if (!background || typeof background !== 'string') {
    return {
      color: null,
      opacity: 1
    };
  }

  // Split the background value
  var parts = background.split(/\s+/);
  var colorPart = parts.find(function (part) {
    return /^(rgb|#)/i.test(part);
  });
  if (!colorPart) {
    // If no color part is found, return default
    return {
      color: null,
      opacity: 1
    };
  }

  // Handle rgba(), rgb(), and hex colors
  var rgbaMatch = colorPart.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
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
  var hexMatch = colorPart.match(/#([0-9A-Fa-f]{3,6})/);
  if (hexMatch) {
    return {
      color: hexToFigmaRGB(hexMatch[0]),
      opacity: 1
    };
  }

  // Add more parsing as needed
  return {
    color: null,
    opacity: 1
  };
}
function cssColorToFigmaRGB(cssColor) {
  var color = Color(cssColor);
  return {
    r: color.red() / 255,
    g: color.green() / 255,
    b: color.blue() / 255
  };
}
function getTextContent(domNode) {
  var text = '';
  if (domNode.type === 'text') {
    text += domNode.data;
  } else if (domNode.children && domNode.children.length > 0) {
    var _iterator6 = _createForOfIteratorHelper(domNode.children),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var child = _step6.value;
        text += getTextContent(child);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
  return text;
}
function handleImageNode(_x5) {
  return _handleImageNode.apply(this, arguments);
}
function _handleImageNode() {
  _handleImageNode = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(domNode) {
    var imgUrl, response, arrayBuffer, image, imageHash;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          imgUrl = domNode.attribs.src;
          if (imgUrl) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", null);
        case 4:
          _context4.next = 6;
          return fetch(imgUrl);
        case 6:
          response = _context4.sent;
          if (response.ok) {
            _context4.next = 9;
            break;
          }
          throw new Error('Network response was not ok');
        case 9:
          _context4.next = 11;
          return response.arrayBuffer();
        case 11:
          arrayBuffer = _context4.sent;
          image = figma.createRectangle();
          imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
          image.fills = [{
            type: 'IMAGE',
            imageHash: imageHash,
            scaleMode: 'FILL'
          }];
          return _context4.abrupt("return", image);
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          console.error('Error fetching image:', _context4.t0);
          return _context4.abrupt("return", null);
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 18]]);
  }));
  return _handleImageNode.apply(this, arguments);
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
          console.log('Message received from UI:', msg); // Add logging
          if (!(msg.type === 'import-design')) {
            _context.next = 17;
            break;
          }
          designData = msg.designData;
          console.log('Starting import of design data:', designData); // Add logging
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
  return function (_x6) {
    return _ref.apply(this, arguments);
  };
}();
function importDesignSystem(_x7) {
  return _importDesignSystem.apply(this, arguments);
}
function _importDesignSystem() {
  _importDesignSystem = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(designData) {
    var _iterator9, _step9, componentData;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log('Importing design data:', designData); // Log the design data
          _context5.prev = 1;
          if (!designData.colors) {
            _context5.next = 6;
            break;
          }
          console.log('Importing colors...');
          _context5.next = 6;
          return importColors(designData.colors);
        case 6:
          if (!designData.fonts) {
            _context5.next = 10;
            break;
          }
          console.log('Importing fonts...');
          _context5.next = 10;
          return importFonts(designData.fonts);
        case 10:
          if (!designData.buttons) {
            _context5.next = 14;
            break;
          }
          console.log('Importing buttons...');
          _context5.next = 14;
          return importButtons(designData.buttons);
        case 14:
          if (!designData.components) {
            _context5.next = 33;
            break;
          }
          console.log('Importing components...');
          _iterator9 = _createForOfIteratorHelper(designData.components);
          _context5.prev = 17;
          _iterator9.s();
        case 19:
          if ((_step9 = _iterator9.n()).done) {
            _context5.next = 25;
            break;
          }
          componentData = _step9.value;
          _context5.next = 23;
          return createFigmaComponentFromData(componentData);
        case 23:
          _context5.next = 19;
          break;
        case 25:
          _context5.next = 30;
          break;
        case 27:
          _context5.prev = 27;
          _context5.t0 = _context5["catch"](17);
          _iterator9.e(_context5.t0);
        case 30:
          _context5.prev = 30;
          _iterator9.f();
          return _context5.finish(30);
        case 33:
          if (!designData.logoUrl) {
            _context5.next = 37;
            break;
          }
          console.log('Importing logo...');
          _context5.next = 37;
          return importLogo(designData.logoUrl);
        case 37:
          _context5.next = 43;
          break;
        case 39:
          _context5.prev = 39;
          _context5.t1 = _context5["catch"](1);
          console.error('Error during importDesignSystem:', _context5.t1);
          throw _context5.t1;
        case 43:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 39], [17, 27, 30, 33]]);
  }));
  return _importDesignSystem.apply(this, arguments);
}
function importLogo(_x8) {
  return _importLogo.apply(this, arguments);
}
function _importLogo() {
  _importLogo = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(logoUrl) {
    var response, arrayBuffer, image, imageHash;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return fetch(logoUrl);
        case 3:
          response = _context6.sent;
          if (response.ok) {
            _context6.next = 6;
            break;
          }
          throw new Error('Network response was not ok');
        case 6:
          _context6.next = 8;
          return response.arrayBuffer();
        case 8:
          arrayBuffer = _context6.sent;
          image = figma.createRectangle();
          imageHash = figma.createImage(new Uint8Array(arrayBuffer)).hash;
          image.fills = [{
            type: 'IMAGE',
            imageHash: imageHash,
            scaleMode: 'FILL'
          }];
          image.name = 'Logo';
          figma.currentPage.appendChild(image);
          _context6.next = 19;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](0);
          console.error('Error importing logo:', _context6.t0);
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 16]]);
  }));
  return _importLogo.apply(this, arguments);
}
function importColors(_x9) {
  return _importColors.apply(this, arguments);
}
function _importColors() {
  _importColors = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(colors) {
    var _iterator10, _step10, colorToken, paintStyle, color;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _iterator10 = _createForOfIteratorHelper(colors);
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              colorToken = _step10.value;
              paintStyle = figma.createPaintStyle();
              paintStyle.name = colorToken.name || "Color ".concat(colorToken.value);
              color = hexToFigmaRGB(colorToken.value);
              paintStyle.paints = [{
                type: 'SOLID',
                color: color
              }];
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _importColors.apply(this, arguments);
}
function hexToFigmaRGB(hex) {
  // Remove '#' if present
  hex = hex.replace('#', '');

  // Parse the hex color
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16 & 255) / 255;
  var g = (bigint >> 8 & 255) / 255;
  var b = (bigint & 255) / 255;
  return {
    r: r,
    g: g,
    b: b
  };
}
function importFonts(_x10) {
  return _importFonts.apply(this, arguments);
}
function _importFonts() {
  _importFonts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(fonts) {
    var loadedFonts, _iterator11, _step11, fontToken, fontFamily, fontStyle, fontKey, textStyle;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          loadedFonts = new Set(); // To track loaded fonts and prevent duplicates
          _iterator11 = _createForOfIteratorHelper(fonts);
          _context8.prev = 2;
          _iterator11.s();
        case 4:
          if ((_step11 = _iterator11.n()).done) {
            _context8.next = 28;
            break;
          }
          fontToken = _step11.value;
          fontFamily = fontToken.value;
          fontStyle = fontToken.style || 'Regular'; // Assuming style is provided
          // Check if the font is already loaded
          fontKey = "".concat(fontFamily, "-").concat(fontStyle);
          if (loadedFonts.has(fontKey)) {
            _context8.next = 22;
            break;
          }
          _context8.prev = 10;
          _context8.next = 13;
          return figma.loadFontAsync({
            family: fontFamily,
            style: fontStyle
          });
        case 13:
          loadedFonts.add(fontKey);
          console.log("Loaded font: ".concat(fontFamily, " ").concat(fontStyle)); // Debugging
          _context8.next = 20;
          break;
        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](10);
          console.error("Failed to load font: ".concat(fontFamily, " ").concat(fontStyle), _context8.t0);
        case 20:
          _context8.next = 23;
          break;
        case 22:
          console.log("Font already loaded: ".concat(fontFamily, " ").concat(fontStyle)); // Debugging
        case 23:
          textStyle = figma.createTextStyle();
          textStyle.name = fontToken.name || "".concat(fontFamily, " ").concat(fontStyle);
          textStyle.fontName = {
            family: fontFamily,
            style: fontStyle
          };
        case 26:
          _context8.next = 4;
          break;
        case 28:
          _context8.next = 33;
          break;
        case 30:
          _context8.prev = 30;
          _context8.t1 = _context8["catch"](2);
          _iterator11.e(_context8.t1);
        case 33:
          _context8.prev = 33;
          _iterator11.f();
          return _context8.finish(33);
        case 36:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 30, 33, 36], [10, 17]]);
  }));
  return _importFonts.apply(this, arguments);
}
function importButtons(_x11) {
  return _importButtons.apply(this, arguments);
}
function _importButtons() {
  _importButtons = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(buttons) {
    var _iterator12, _step12, buttonToken;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _iterator12 = _createForOfIteratorHelper(buttons);
          _context9.prev = 1;
          _iterator12.s();
        case 3:
          if ((_step12 = _iterator12.n()).done) {
            _context9.next = 9;
            break;
          }
          buttonToken = _step12.value;
          _context9.next = 7;
          return createButtonComponent(buttonToken);
        case 7:
          _context9.next = 3;
          break;
        case 9:
          _context9.next = 14;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](1);
          _iterator12.e(_context9.t0);
        case 14:
          _context9.prev = 14;
          _iterator12.f();
          return _context9.finish(14);
        case 17:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 11, 14, 17]]);
  }));
  return _importButtons.apply(this, arguments);
}
function createButtonComponent(_x12) {
  return _createButtonComponent.apply(this, arguments);
}
function _createButtonComponent() {
  _createButtonComponent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(buttonToken) {
    var value, name, component, rect, text, fontFamily, fontStyle;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          value = buttonToken.value, name = buttonToken.name;
          component = figma.createComponent();
          component.name = name || 'Button';

          // Create a rectangle as the button background
          rect = figma.createRectangle();
          component.appendChild(rect);

          // Apply styles
          if (value['background-color']) {
            rect.fills = [{
              type: 'SOLID',
              color: cssColorToFigmaRGB(value['background-color'])
            }];
            rect.opacity = 1; // Default opacity
            console.log("Set button background color:", cssColorToFigmaRGB(value['background-color'])); // Debugging
          }
          if (value['border-radius']) {
            rect.cornerRadius = parseInt(value['border-radius']);
            console.log("Set button border radius:", rect.cornerRadius); // Debugging
          }

          // Create text label
          text = figma.createText(); // Extract font information from button styles
          fontFamily = value['font-family'] || 'Roboto';
          fontStyle = value['font-style'] || 'Regular'; // Load the required font
          _context10.next = 12;
          return figma.loadFontAsync({
            family: fontFamily,
            style: fontStyle
          });
        case 12:
          text.characters = name || 'Button';
          applyStylesToFigmaNode(text, value); // Assuming value contains font styles
          component.appendChild(text);

          // Position text over the rectangle
          text.x = rect.x + rect.width / 2 - text.width / 2;
          text.y = rect.y + rect.height / 2 - text.height / 2;

          // Adjust component size
          component.resize(rect.width, rect.height);
        case 18:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _createButtonComponent.apply(this, arguments);
}