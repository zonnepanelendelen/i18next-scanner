"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var acorn = _interopRequireWildcard(require("acorn"));
var _acornJsx = _interopRequireDefault(require("acorn-jsx"));
var _acornStage = _interopRequireDefault(require("acorn-stage3"));
var _chalk = _interopRequireDefault(require("chalk"));
var _cloneDeep = _interopRequireDefault(require("clone-deep"));
var _deepmerge = _interopRequireDefault(require("deepmerge"));
var _ensureType = require("ensure-type");
var _esprimaNext = require("esprima-next");
var _fs = _interopRequireDefault(require("fs"));
var _i18next = _interopRequireDefault(require("i18next"));
var _lodash = _interopRequireDefault(require("lodash"));
var _parse = _interopRequireDefault(require("parse5"));
var _sortobject = _interopRequireDefault(require("sortobject"));
var _acornJsxWalk = _interopRequireDefault(require("./acorn-jsx-walk"));
var _flattenObjectKeys = _interopRequireDefault(require("./flatten-object-keys"));
var _nodesToString = _interopRequireDefault(require("./nodes-to-string"));
var _omitEmptyObject = _interopRequireDefault(require("./omit-empty-object"));
var _excluded = ["replacer", "space"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint no-console: 0 */ /* eslint no-eval: 0 */
_i18next["default"].init({
  compatibilityJSON: 'v3'
});
var namespaceRegexp = /([a-z-_]+).\w/;
var defaults = {
  debug: false,
  // verbose logging

  sort: false,
  // sort keys in alphabetical order

  attr: {
    // HTML attributes to parse
    list: ['data-i18n'],
    extensions: ['.html', '.htm']
  },
  func: {
    // function names to parse
    list: ['i18next.t', 'i18n.t'],
    extensions: ['.js', '.jsx']
  },
  trans: {
    // Trans component (https://github.com/i18next/react-i18next)
    component: 'Trans',
    i18nKey: 'i18nKey',
    defaultsKey: 'defaults',
    extensions: ['.js', '.jsx'],
    fallbackKey: false,
    supportBasicHtmlNodes: true,
    // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
    keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.
    acorn: {
      ecmaVersion: 2020,
      // defaults to 2020
      sourceType: 'module' // defaults to 'module'
      // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
    }
  },

  lngs: ['en'],
  // array of supported languages
  fallbackLng: 'en',
  // language to lookup key if not found while calling `parser.get(key, { lng: '' })`

  ns: [],
  // string or array of namespaces

  defaultLng: 'en',
  // default language used for checking default values

  defaultNs: 'translation',
  // default namespace used if not passed to translation function

  defaultValue: '',
  // default value used if not passed to `parser.set`

  // resource
  resource: {
    // The path where resources get loaded from. Relative to current working directory.
    loadPath: 'i18n/{{lng}}/{{ns}}.json',
    // The path to store resources. Relative to the path specified by `gulp.dest(path)`.
    savePath: 'i18n/{{lng}}/{{ns}}.json',
    // Specify the number of space characters to use as white space to insert into the output JSON string for readability purpose.
    jsonIndent: 2,
    // Normalize line endings to '\r\n', '\r', '\n', or 'auto' for the current operating system. Defaults to '\n'.
    // Aliases: 'CRLF', 'CR', 'LF', 'crlf', 'cr', 'lf'
    lineEnding: '\n'
  },
  keySeparator: '.',
  // char to separate keys
  nsSeparator: ':',
  // char to split namespace from key

  // Context Form
  context: true,
  // whether to add context form key
  contextFallback: true,
  // whether to add a fallback key as well as the context form key
  contextSeparator: '_',
  // char to split context from key
  contextDefaultValues: [],
  // list of values for dynamic values

  // Plural Form
  plural: true,
  // whether to add plural form key
  pluralFallback: true,
  // whether to add a fallback key as well as the plural form key
  pluralSeparator: '_',
  // char to split plural from key

  // interpolation options
  interpolation: {
    prefix: '{{',
    // prefix for interpolation
    suffix: '}}' // suffix for interpolation
  },

  metadata: {},
  // additional custom options
  allowDynamicKeys: false // allow Dynamic Keys
};

// http://codereview.stackexchange.com/questions/45991/balanced-parentheses
var matchBalancedParentheses = function matchBalancedParentheses() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var parentheses = '[]{}()';
  var stack = [];
  var bracePosition;
  var start = -1;
  var i = 0;
  str = '' + str; // ensure string
  for (i = 0; i < str.length; ++i) {
    if (start >= 0 && stack.length === 0) {
      return str.substring(start, i);
    }
    bracePosition = parentheses.indexOf(str[i]);
    if (bracePosition < 0) {
      continue;
    }
    if (bracePosition % 2 === 0) {
      if (start < 0) {
        start = i; // remember the start position
      }

      stack.push(bracePosition + 1); // push next expected brace position
      continue;
    }
    if (stack.pop() !== bracePosition) {
      return str.substring(start, i);
    }
  }
  return str.substring(start, i);
};
var normalizeOptions = function normalizeOptions(options) {
  // Attribute
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'attr.list'))) {
    _lodash["default"].set(options, 'attr.list', defaults.attr.list);
  }
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'attr.extensions'))) {
    _lodash["default"].set(options, 'attr.extensions', defaults.attr.extensions);
  }

  // Function
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'func.list'))) {
    _lodash["default"].set(options, 'func.list', defaults.func.list);
  }
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'func.extensions'))) {
    _lodash["default"].set(options, 'func.extensions', defaults.func.extensions);
  }

  // Trans
  if (_lodash["default"].get(options, 'trans')) {
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.component'))) {
      _lodash["default"].set(options, 'trans.component', defaults.trans.component);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.i18nKey'))) {
      _lodash["default"].set(options, 'trans.i18nKey', defaults.trans.i18nKey);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.defaultsKey'))) {
      _lodash["default"].set(options, 'trans.defaultsKey', defaults.trans.defaultsKey);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.extensions'))) {
      _lodash["default"].set(options, 'trans.extensions', defaults.trans.extensions);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.fallbackKey'))) {
      _lodash["default"].set(options, 'trans.fallbackKey', defaults.trans.fallbackKey);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.acorn'))) {
      _lodash["default"].set(options, 'trans.acorn', defaults.trans.acorn);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.supportBasicHtmlNodes'))) {
      _lodash["default"].set(options, 'trans.supportBasicHtmlNodes', defaults.trans.supportBasicHtmlNodes);
    }
    if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'trans.keepBasicHtmlNodesFor'))) {
      _lodash["default"].set(options, 'trans.keepBasicHtmlNodesFor', defaults.trans.keepBasicHtmlNodesFor);
    }
  }

  // Resource
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'resource.loadPath'))) {
    _lodash["default"].set(options, 'resource.loadPath', defaults.resource.loadPath);
  }
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'resource.savePath'))) {
    _lodash["default"].set(options, 'resource.savePath', defaults.resource.savePath);
  }
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'resource.jsonIndent'))) {
    _lodash["default"].set(options, 'resource.jsonIndent', defaults.resource.jsonIndent);
  }
  if (_lodash["default"].isUndefined(_lodash["default"].get(options, 'resource.lineEnding'))) {
    _lodash["default"].set(options, 'resource.lineEnding', defaults.resource.lineEnding);
  }

  // Accept both nsseparator or nsSeparator
  if (!_lodash["default"].isUndefined(options.nsseparator)) {
    options.nsSeparator = options.nsseparator;
    delete options.nsseparator;
  }
  // Allowed only string or false
  if (!_lodash["default"].isString(options.nsSeparator)) {
    options.nsSeparator = false;
  }

  // Accept both keyseparator or keySeparator
  if (!_lodash["default"].isUndefined(options.keyseparator)) {
    options.keySeparator = options.keyseparator;
    delete options.keyseparator;
  }
  // Allowed only string or false
  if (!_lodash["default"].isString(options.keySeparator)) {
    options.keySeparator = false;
  }
  if (!_lodash["default"].isArray(options.ns)) {
    options.ns = [options.ns];
  }
  options.ns = _lodash["default"].union(_lodash["default"].flatten(options.ns.concat(options.defaultNs)));
  return options;
};

// Get an array of plural suffixes for a given language.
// @param {string} lng The language.
// @param {string} pluralSeparator pluralSeparator, default '_'.
// @return {array} An array of plural suffixes.
var getPluralSuffixes = function getPluralSuffixes(lng) {
  var pluralSeparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
  var rule = _i18next["default"].services.pluralResolver.getRule(lng);
  if (!(rule && rule.numbers)) {
    return []; // Return an empty array if lng is not supported
  }

  if (rule.numbers.length === 1) {
    return ["".concat(pluralSeparator, "0")];
  }
  if (rule.numbers.length === 2) {
    return ['', "".concat(pluralSeparator, "plural")];
  }
  var suffixes = rule.numbers.reduce(function (acc, n, i) {
    return acc.concat("".concat(pluralSeparator).concat(i));
  }, []);
  return suffixes;
};

/**
* Creates a new parser
* @constructor
*/
var Parser = /*#__PURE__*/function () {
  function Parser(options) {
    var _this = this;
    _classCallCheck(this, Parser);
    _defineProperty(this, "options", _objectSpread({}, defaults));
    // The resStore stores all translation keys including unused ones
    _defineProperty(this, "resStore", {});
    // The resScan only stores translation keys parsed from code
    _defineProperty(this, "resScan", {});
    // The all plurals suffixes for each of target languages.
    _defineProperty(this, "pluralSuffixes", {});
    this.options = normalizeOptions(_objectSpread(_objectSpread({}, this.options), options));
    var lngs = this.options.lngs;
    var namespaces = this.options.ns;
    lngs.forEach(function (lng) {
      _this.resStore[lng] = _this.resStore[lng] || {};
      _this.resScan[lng] = _this.resScan[lng] || {};
      _this.pluralSuffixes[lng] = (0, _ensureType.ensureArray)(getPluralSuffixes(lng, _this.options.pluralSeparator));
      if (_this.pluralSuffixes[lng].length === 0) {
        _this.log("No plural rule found for: ".concat(lng));
      }
      namespaces.forEach(function (ns) {
        var resPath = _this.formatResourceLoadPath(lng, ns);
        _this.resStore[lng][ns] = {};
        _this.resScan[lng][ns] = {};
        try {
          if (_fs["default"].existsSync(resPath)) {
            _this.resStore[lng][ns] = JSON.parse(_fs["default"].readFileSync(resPath, 'utf-8'));
          }
        } catch (err) {
          _this.error("Unable to load resource file ".concat(_chalk["default"].yellow(JSON.stringify(resPath)), ": lng=").concat(lng, ", ns=").concat(ns));
          _this.error(err);
        }
      });
    });
    this.log("options=".concat(JSON.stringify(this.options, null, 2)));
  }
  _createClass(Parser, [{
    key: "log",
    value: function log() {
      var debug = this.options.debug;
      if (debug) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        console.log.apply(this, [_chalk["default"].cyan('i18next-scanner:')].concat(args));
      }
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      console.error.apply(this, [_chalk["default"].red('i18next-scanner:')].concat(args));
    }
  }, {
    key: "formatResourceLoadPath",
    value: function formatResourceLoadPath(lng, ns) {
      var options = this.options;
      var regex = {
        lng: new RegExp(_lodash["default"].escapeRegExp(options.interpolation.prefix + 'lng' + options.interpolation.suffix), 'g'),
        ns: new RegExp(_lodash["default"].escapeRegExp(options.interpolation.prefix + 'ns' + options.interpolation.suffix), 'g')
      };
      return _lodash["default"].isFunction(options.resource.loadPath) ? options.resource.loadPath(lng, ns) : options.resource.loadPath.replace(regex.lng, lng).replace(regex.ns, ns);
    }
  }, {
    key: "formatResourceSavePath",
    value: function formatResourceSavePath(lng, ns) {
      var options = this.options;
      var regex = {
        lng: new RegExp(_lodash["default"].escapeRegExp(options.interpolation.prefix + 'lng' + options.interpolation.suffix), 'g'),
        ns: new RegExp(_lodash["default"].escapeRegExp(options.interpolation.prefix + 'ns' + options.interpolation.suffix), 'g')
      };
      return _lodash["default"].isFunction(options.resource.savePath) ? options.resource.savePath(lng, ns) : options.resource.savePath.replace(regex.lng, lng).replace(regex.ns, ns);
    }
  }, {
    key: "fixStringAfterRegExp",
    value: function fixStringAfterRegExp(strToFix) {
      var options = this.options;
      var fixedString = _lodash["default"].trim(strToFix); // Remove leading and trailing whitespace
      var firstChar = fixedString[0];
      if (firstChar === '`' && fixedString.match(/\${.*?}/)) {
        if (options.allowDynamicKeys && fixedString.endsWith('}`')) {
          // Allow Dyanmic Keys at the end of the string literal with option enabled
          fixedString = fixedString.replace(/\$\{(.+?)\}/g, '');
        } else {
          // Ignore key with embedded expressions in string literals
          return null;
        }
      }
      if (_lodash["default"].includes(['\'', '"', '`'], firstChar)) {
        // Remove first and last character
        fixedString = fixedString.slice(1, -1);
      }

      // restore multiline strings
      fixedString = fixedString.replace(/(\\\n|\\\r\n)/g, '');

      // JavaScript character escape sequences
      // https://mathiasbynens.be/notes/javascript-escapes

      // Single character escape sequences
      // Note: IE < 9 treats '\v' as 'v' instead of a vertical tab ('\x0B'). If cross-browser compatibility is a concern, use \x0B instead of \v.
      // Another thing to note is that the \v and \0 escapes are not allowed in JSON strings.
      fixedString = fixedString.replace(/(\\b|\\f|\\n|\\r|\\t|\\v|\\0|\\\\|\\"|\\')/g, function (match) {
        return eval("\"".concat(match, "\""));
      });

      // * Octal escapes have been deprecated in ES5.
      // * Hexadecimal escape sequences: \\x[a-fA-F0-9]{2}
      // * Unicode escape sequences: \\u[a-fA-F0-9]{4}
      fixedString = fixedString.replace(/(\\x[a-fA-F0-9]{2}|\\u[a-fA-F0-9]{4})/g, function (match) {
        return eval("\"".concat(match, "\""));
      });
      return fixedString;
    }
  }, {
    key: "handleObjectExpression",
    value: function handleObjectExpression(props) {
      var _this2 = this;
      return props.reduce(function (acc, prop) {
        if (prop.type !== 'ObjectMethod') {
          var value = _this2.optionsBuilder(prop.value);
          if (value !== undefined) {
            return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, prop.key.name, value));
          }
        }
        return acc;
      }, {});
    }
  }, {
    key: "handleArrayExpression",
    value: function handleArrayExpression(elements) {
      var _this3 = this;
      return elements.reduce(function (acc, element) {
        return [].concat(_toConsumableArray(acc), [_this3.optionsBuilder(element)]);
      }, []);
    }
  }, {
    key: "optionsBuilder",
    value: function optionsBuilder(prop) {
      if (prop.value && prop.value.type === 'Literal' || prop.type && prop.type === 'Literal') {
        return prop.value.value !== undefined ? prop.value.value : prop.value;
      } else if (prop.value && prop.value.type === 'TemplateLiteral' || prop.type && prop.type === 'TemplateLiteral') {
        return prop.value.quasis.map(function (element) {
          return element.value.cooked;
        }).join('');
      } else if (prop.value && prop.value.type === 'ObjectExpression' || prop.type && prop.type === 'ObjectExpression') {
        return this.handleObjectExpression(prop.value.properties);
      } else if (prop.value && prop.value.type === 'ArrayExpression' || prop.type && prop.type === 'ArrayExpression') {
        return this.handleArrayExpression(prop.elements);
      } else {
        // Unable to get value of the property
        return '';
      }
    }

    // i18next.t('ns:foo.bar') // matched
    // i18next.t("ns:foo.bar") // matched
    // i18next.t('ns:foo.bar') // matched
    // i18next.t("ns:foo.bar", { count: 1 }); // matched
    // i18next.t("ns:foo.bar" + str); // not matched
  }, {
    key: "parseFuncFromString",
    value: function parseFuncFromString(content) {
      var _this4 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var customHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (_lodash["default"].isFunction(opts)) {
        customHandler = opts;
        opts = {};
      }
      var funcs = opts.list !== undefined ? (0, _ensureType.ensureArray)(opts.list) : (0, _ensureType.ensureArray)(this.options.func.list);
      if (funcs.length === 0) {
        return this;
      }
      var matchFuncs = funcs.map(function (func) {
        return '(?:' + func + ')';
      }).join('|').replace(/\./g, '\\.');
      // `\s` matches a single whitespace character, which includes spaces, tabs, form feeds, line feeds and other unicode spaces.
      var matchSpecialCharacters = '[\\r\\n\\s]*';
      var stringGroup = matchSpecialCharacters + '(' +
      // backtick (``)
      '`(?:[^`\\\\]|\\\\(?:.|$))*`' + '|' +
      // double quotes ("")
      '"(?:[^"\\\\]|\\\\(?:.|$))*"' + '|' +
      // single quote ('')
      '\'(?:[^\'\\\\]|\\\\(?:.|$))*\'' + ')' + matchSpecialCharacters;
      var pattern = '(?:(?:^\\s*)|[^a-zA-Z0-9_])' + '(?:' + matchFuncs + ')' + '\\(' + stringGroup + '(?:[\\,]' + stringGroup + ')?' + '[\\,\\)]';
      var re = new RegExp(pattern, 'gim');
      var r;
      var _loop = function _loop() {
        var options = {};
        var full = r[0];
        var key = _this4.fixStringAfterRegExp(r[1], true);
        if (!key) {
          return "continue";
        }
        if (r[2] !== undefined) {
          var defaultValue = _this4.fixStringAfterRegExp(r[2], false);
          if (!defaultValue) {
            return "continue";
          }
          options.defaultValue = defaultValue;
        }
        var endsWithComma = full[full.length - 1] === ',';
        if (endsWithComma) {
          var _opts = _objectSpread({}, opts),
            propsFilter = _opts.propsFilter;
          var code = matchBalancedParentheses(content.substr(re.lastIndex));
          if (typeof propsFilter === 'function') {
            code = propsFilter(code);
          }
          try {
            var syntax = code.trim() !== '' ? (0, _esprimaNext.parse)('(' + code + ')') : {};
            var props = _lodash["default"].get(syntax, 'body[0].expression.properties') || [];
            // http://i18next.com/docs/options/
            var supportedOptions = ['defaultValue', 'defaultValue_plural', 'count', 'context', 'ns', 'keySeparator', 'nsSeparator', 'metadata'];
            props.forEach(function (prop) {
              if (_lodash["default"].includes(supportedOptions, prop.key.name)) {
                options[prop.key.name] = _this4.optionsBuilder(prop);
              }
            });
          } catch (err) {
            _this4.error("Unable to parse code \"".concat(code, "\""));
            _this4.error(err);
          }
        }
        if (customHandler) {
          customHandler(key, options);
          return "continue";
        }
        _this4.set(key, options);
      };
      while (r = re.exec(content)) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
      return this;
    }

    // Parses translation keys from `Trans` components in JSX
    // <Trans i18nKey="some.key">Default text</Trans>
  }, {
    key: "parseTransFromString",
    value: function parseTransFromString(content) {
      var _this5 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var customHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (_lodash["default"].isFunction(opts)) {
        customHandler = opts;
        opts = {};
      }
      var _opts2 = _objectSpread({}, opts),
        _opts2$transformOptio = _opts2.transformOptions,
        transformOptions = _opts2$transformOptio === void 0 ? {} : _opts2$transformOptio,
        _opts2$component = _opts2.component,
        component = _opts2$component === void 0 ? this.options.trans.component : _opts2$component,
        _opts2$i18nKey = _opts2.i18nKey,
        i18nKey = _opts2$i18nKey === void 0 ? this.options.trans.i18nKey : _opts2$i18nKey,
        _opts2$defaultsKey = _opts2.defaultsKey,
        defaultsKey = _opts2$defaultsKey === void 0 ? this.options.trans.defaultsKey : _opts2$defaultsKey,
        fallbackKey = _opts2.fallbackKey,
        _opts2$acorn = _opts2.acorn,
        acornOptions = _opts2$acorn === void 0 ? this.options.trans.acorn : _opts2$acorn,
        _opts2$supportBasicHt = _opts2.supportBasicHtmlNodes,
        supportBasicHtmlNodes = _opts2$supportBasicHt === void 0 ? this.options.trans.supportBasicHtmlNodes : _opts2$supportBasicHt,
        _opts2$keepBasicHtmlN = _opts2.keepBasicHtmlNodesFor,
        keepBasicHtmlNodesFor = _opts2$keepBasicHtmlN === void 0 ? this.options.trans.keepBasicHtmlNodesFor : _opts2$keepBasicHtmlN;
      var parseJSXElement = function parseJSXElement(node, code) {
        if (!node) {
          return;
        }
        (0, _ensureType.ensureArray)(node.openingElement.attributes).forEach(function (attribute) {
          var value = attribute.value;
          if (!(value && value.type === 'JSXExpressionContainer')) {
            return;
          }
          var expression = value.expression;
          if (!(expression && expression.type === 'JSXElement')) {
            return;
          }
          parseJSXElement(expression, code);
        });
        (0, _ensureType.ensureArray)(node.children).forEach(function (childNode) {
          if (childNode.type === 'JSXElement') {
            parseJSXElement(childNode, code);
          }
        });
        if (component instanceof RegExp ? !node.openingElement.name.name.match(component) : node.openingElement.name.name !== component) {
          return;
        }
        var attr = (0, _ensureType.ensureArray)(node.openingElement.attributes).reduce(function (acc, attribute) {
          if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier' || attribute.value === null) {
            return acc;
          }
          var name = attribute.name.name;
          if (attribute.value.type === 'Literal') {
            acc[name] = attribute.value.value;
          } else if (attribute.value.type === 'JSXExpressionContainer') {
            var expression = attribute.value.expression;

            // Identifier
            if (expression.type === 'Identifier') {
              acc[name] = expression.name;
            }

            // Literal
            if (expression.type === 'Literal') {
              acc[name] = expression.value;
            }

            // Object Expression
            if (expression.type === 'ObjectExpression') {
              var properties = (0, _ensureType.ensureArray)(expression.properties);
              acc[name] = properties.reduce(function (obj, property) {
                if (property.value.type === 'Literal') {
                  obj[property.key.name] = property.value.value;
                } else if (property.value.type === 'TemplateLiteral') {
                  obj[property.key.name] = property.value.quasis.map(function (element) {
                    return element.value.cooked;
                  }).join('');
                } else {
                  // Unable to get value of the property
                  obj[property.key.name] = '';
                }
                return obj;
              }, {});
            }

            // Template Literal
            if (expression.type === 'TemplateLiteral') {
              acc[name] = expression.quasis.map(function (element) {
                return element.value.cooked;
              }).join('');
            }
          }
          return acc;
        }, {});
        var transKey = _lodash["default"].trim(attr[i18nKey]);
        var defaultsString = attr[defaultsKey] || '';
        if (typeof defaultsString !== 'string') {
          _this5.log("defaults value must be a static string, saw ".concat(_chalk["default"].yellow(defaultsString)));
        }

        // https://www.i18next.com/translation-function/essentials#overview-options
        var tOptions = attr.tOptions;
        var options = _objectSpread(_objectSpread({}, tOptions), {}, {
          defaultValue: defaultsString || (0, _nodesToString["default"])(node.children, {
            code: code,
            supportBasicHtmlNodes: supportBasicHtmlNodes,
            keepBasicHtmlNodesFor: keepBasicHtmlNodesFor
          }),
          fallbackKey: fallbackKey || _this5.options.trans.fallbackKey
        });
        if (Object.prototype.hasOwnProperty.call(attr, 'count')) {
          options.count = Number(attr.count) || 0;
        }
        if (Object.prototype.hasOwnProperty.call(attr, 'ns')) {
          if (typeof attr.ns !== 'string') {
            _this5.log("The ns attribute must be a string, saw ".concat(_chalk["default"].yellow(attr.ns)));
          }
          options.ns = attr.ns;
        }
        if (customHandler) {
          customHandler(transKey, options);
          return;
        }
        _this5.set(transKey, options);
      };
      try {
        var ast = acorn.Parser.extend(_acornStage["default"], (0, _acornJsx["default"])()).parse(content, _objectSpread(_objectSpread({}, defaults.trans.acorn), acornOptions));
        (0, _acornJsxWalk["default"])(ast, {
          JSXElement: function JSXElement(node) {
            return parseJSXElement(node, content);
          }
        });
      } catch (err) {
        if (transformOptions.filepath) {
          this.error("Unable to parse ".concat(_chalk["default"].blue(component), " component from ").concat(_chalk["default"].yellow(JSON.stringify(transformOptions.filepath))));
          console.error('    ' + err);
        } else {
          this.error("Unable to parse ".concat(_chalk["default"].blue(component), " component:"));
          console.error(content);
          console.error('    ' + err);
        }
      }
      return this;
    }

    // Parses translation keys from `data-i18n` attribute in HTML
    // <div data-i18n="[attr]ns:foo.bar;[attr]ns:foo.baz">
    // </div>
  }, {
    key: "parseAttrFromString",
    value: function parseAttrFromString(content) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var customHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var setter = this.set.bind(this);
      if (_lodash["default"].isFunction(opts)) {
        setter = opts;
        opts = {};
      } else if (_lodash["default"].isFunction(customHandler)) {
        setter = customHandler;
      }
      var attrs = opts.list !== undefined ? (0, _ensureType.ensureArray)(opts.list) : (0, _ensureType.ensureArray)(this.options.attr.list);
      if (attrs.length === 0) {
        return this;
      }
      var ast = _parse["default"].parse(content);
      var parseAttributeValue = function parseAttributeValue(key) {
        key = _lodash["default"].trim(key);
        if (key.length === 0) {
          return;
        }
        if (key.indexOf('[') === 0) {
          var parts = key.split(']');
          key = parts[1];
        }
        if (key.indexOf(';') === key.length - 1) {
          key = key.substr(0, key.length - 2);
        }
        setter(key);
      };
      var walk = function walk(nodes) {
        nodes.forEach(function (node) {
          if (node.attrs) {
            node.attrs.forEach(function (attr) {
              if (attrs.indexOf(attr.name) !== -1) {
                var values = attr.value.split(';');
                values.forEach(parseAttributeValue);
              }
            });
          }
          if (node.childNodes) {
            walk(node.childNodes);
          }
          if (node.content && node.content.childNodes) {
            walk(node.content.childNodes);
          }
        });
      };
      walk(ast.childNodes);
      return this;
    }

    // Get the value of a translation key or the whole resource store containing translation information
    // @param {string} [key] The translation key
    // @param {object} [opts] The opts object
    // @param {boolean} [opts.sort] True to sort object by key
    // @param {boolean} [opts.lng] The language to use
    // @return {object}
  }, {
    key: "get",
    value: function get(key) {
      var _this6 = this;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (_lodash["default"].isPlainObject(key)) {
        opts = key;
        key = undefined;
      }
      var resStore = {};
      if (this.options.removeUnusedKeys) {
        // Merge two objects `resStore` and `resScan` deeply, returning a new merged object with the elements from both `resStore` and `resScan`.
        var overwriteMerge = function overwriteMerge(destinationArray, sourceArray, options) {
          return sourceArray;
        };
        var resMerged = (0, _deepmerge["default"])(this.resStore, this.resScan, {
          arrayMerge: overwriteMerge
        });
        Object.keys(this.resStore).forEach(function (lng) {
          Object.keys(_this6.resStore[lng]).forEach(function (ns) {
            var resStoreKeys = (0, _flattenObjectKeys["default"])(_lodash["default"].get(_this6.resStore, [lng, ns], {}));
            var resScanKeys = (0, _flattenObjectKeys["default"])(_lodash["default"].get(_this6.resScan, [lng, ns], {}));
            var unusedKeys = _lodash["default"].differenceWith(resStoreKeys, resScanKeys, _lodash["default"].isEqual);
            for (var i = 0; i < unusedKeys.length; ++i) {
              _lodash["default"].unset(resMerged[lng][ns], unusedKeys[i]);
              _this6.log("Removed an unused translation key { ".concat(_chalk["default"].red(JSON.stringify(unusedKeys[i])), " from ").concat(_chalk["default"].red(JSON.stringify(_this6.formatResourceLoadPath(lng, ns)))));
            }

            // Omit empty object
            resMerged[lng][ns] = (0, _omitEmptyObject["default"])(resMerged[lng][ns]);
          });
        });
        resStore = resMerged;
      } else {
        resStore = (0, _cloneDeep["default"])(this.resStore);
      }
      if (opts.sort) {
        Object.keys(resStore).forEach(function (lng) {
          var namespaces = resStore[lng];
          Object.keys(namespaces).forEach(function (ns) {
            // Deeply sort an object by its keys without mangling any arrays inside of it
            resStore[lng][ns] = (0, _sortobject["default"])(namespaces[ns]);
          });
        });
      }
      if (!_lodash["default"].isUndefined(key)) {
        var ns = this.options.defaultNs;

        // http://i18next.com/translate/keyBasedFallback/
        // Set nsSeparator and keySeparator to false if you prefer
        // having keys as the fallback for translation.
        // i18next.init({
        //   nsSeparator: false,
        //   keySeparator: false
        // })

        if (_lodash["default"].isString(this.options.nsSeparator) && key.indexOf(this.options.nsSeparator) > -1) {
          var namespaceMatch = key.match(namespaceRegexp);
          ns = namespaceMatch[1];
          var parts = key.split(this.options.nsSeparator);
          key = parts[1];
        }
        var keys = _lodash["default"].isString(this.options.keySeparator) ? key.split(this.options.keySeparator) : [key];
        var lng = opts.lng ? opts.lng : this.options.fallbackLng;
        var namespaces = resStore[lng] || {};
        var value = namespaces[ns];
        var x = 0;
        while (keys[x]) {
          value = value && value[keys[x]];
          x++;
        }
        return value;
      }
      return resStore;
    }

    // Set translation key with an optional defaultValue to i18n resource store
    // @param {string} key The translation key
    // @param {object} [options] The options object
    // @param {boolean|function} [options.fallbackKey] When the key is missing, pass `true` to return `options.defaultValue` as key, or pass a function to return user-defined key.
    // @param {string} [options.defaultValue] defaultValue to return if translation not found
    // @param {number} [options.count] count value used for plurals
    // @param {string} [options.context] used for contexts (eg. male)
    // @param {string} [options.ns] namespace for the translation
    // @param {string|boolean} [options.nsSeparator] The value used to override this.options.nsSeparator
    // @param {string|boolean} [options.keySeparator] The value used to override this.options.keySeparator
  }, {
    key: "set",
    value: function set(key) {
      var _this7 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Backward compatibility
      if (_lodash["default"].isString(options)) {
        var _defaultValue = options;
        options = {
          defaultValue: _defaultValue
        };
      }
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaceMatch = key.match(namespaceRegexp);
      var ns = namespaceMatch[1] || options.ns || this.options.defaultNs;
      console.assert(_lodash["default"].isString(ns) && !!ns.length, 'ns is not a valid string', ns);

      // http://i18next.com/translate/keyBasedFallback/
      // Set nsSeparator and keySeparator to false if you prefer
      // having keys as the fallback for translation.
      // i18next.init({
      //   nsSeparator: false,
      //   keySeparator: false
      // })

      if (_lodash["default"].isString(nsSeparator) && key.indexOf(nsSeparator) > -1) {
        var _namespaceMatch = key.match(namespaceRegexp);
        ns = _namespaceMatch[1];
        var parts = key.split(nsSeparator);
        key = parts[1];
      }
      var keys = [];
      if (key) {
        keys = _lodash["default"].isString(keySeparator) ? key.split(keySeparator) : [key];
      } else {
        // fallback key
        if (options.fallbackKey === true) {
          key = options.defaultValue;
        }
        if (typeof options.fallbackKey === 'function') {
          key = options.fallbackKey(ns, options.defaultValue);
        }
        if (!key) {
          // Ignore empty key
          return;
        }
        keys = [key];
      }
      var _this$options = this.options,
        lngs = _this$options.lngs,
        context = _this$options.context,
        contextFallback = _this$options.contextFallback,
        contextSeparator = _this$options.contextSeparator,
        contextDefaultValues = _this$options.contextDefaultValues,
        plural = _this$options.plural,
        pluralFallback = _this$options.pluralFallback,
        pluralSeparator = _this$options.pluralSeparator,
        defaultLng = _this$options.defaultLng,
        defaultValue = _this$options.defaultValue;
      lngs.forEach(function (lng) {
        var resLoad = _this7.resStore[lng] && _this7.resStore[lng][ns];
        var resScan = _this7.resScan[lng] && _this7.resScan[lng][ns];
        if (!_lodash["default"].isPlainObject(resLoad)) {
          // Skip undefined namespace
          _this7.error("".concat(_chalk["default"].yellow(JSON.stringify(ns)), " does not exist in the namespaces (").concat(_chalk["default"].yellow(JSON.stringify(_this7.options.ns)), "): key=").concat(_chalk["default"].yellow(JSON.stringify(key)), ", options=").concat(_chalk["default"].yellow(JSON.stringify(options))));
          return;
        }
        Object.keys(keys).forEach(function (index) {
          var key = keys[index];
          if (index < keys.length - 1) {
            resLoad[key] = resLoad[key] || {};
            resLoad = resLoad[key];
            resScan[key] = resScan[key] || {};
            resScan = resScan[key];
            return; // continue
          }

          // Context & Plural
          // http://i18next.com/translate/context/
          // http://i18next.com/translate/pluralSimple/
          //
          // Format:
          // "<key>[[{{contextSeparator}}<context>]{{pluralSeparator}}<plural>]"
          //
          // Example:
          // {
          //   "translation": {
          //     "friend": "A friend",
          //     "friend_male": "A boyfriend",
          //     "friend_female": "A girlfriend",
          //     "friend_male_plural": "{{count}} boyfriends",
          //     "friend_female_plural": "{{count}} girlfriends"
          //   }
          // }
          var resKeys = [];

          // http://i18next.com/translate/context/
          var containsContext = function () {
            if (!context) {
              return false;
            }
            if (_lodash["default"].isUndefined(options.context)) {
              return false;
            }
            return _lodash["default"].isFunction(context) ? context(lng, ns, key, options) : !!context;
          }();

          // http://i18next.com/translate/pluralSimple/
          var containsPlural = function () {
            if (!plural) {
              return false;
            }
            if (_lodash["default"].isUndefined(options.count)) {
              return false;
            }
            return _lodash["default"].isFunction(plural) ? plural(lng, ns, key, options) : !!plural;
          }();
          var contextValues = function () {
            if (options.context !== '') {
              return [options.context];
            }
            if ((0, _ensureType.ensureArray)(contextDefaultValues).length > 0) {
              return (0, _ensureType.ensureArray)(contextDefaultValues);
            }
            return [];
          }();
          if (containsPlural) {
            var suffixes = pluralFallback ? _this7.pluralSuffixes[lng] : _this7.pluralSuffixes[lng].slice(1);
            suffixes.forEach(function (pluralSuffix) {
              resKeys.push("".concat(key).concat(pluralSuffix));
            });
            if (containsContext && containsPlural) {
              suffixes.forEach(function (pluralSuffix) {
                contextValues.forEach(function (contextValue) {
                  resKeys.push("".concat(key).concat(contextSeparator).concat(contextValue).concat(pluralSuffix));
                });
              });
            }
          } else {
            if (!containsContext || containsContext && contextFallback) {
              resKeys.push(key);
            }
            if (containsContext) {
              contextValues.forEach(function (contextValue) {
                resKeys.push("".concat(key).concat(contextSeparator).concat(contextValue));
              });
            }
          }
          resKeys.forEach(function (resKey) {
            if (resLoad[resKey] === undefined) {
              if (options.defaultValue_plural !== undefined && resKey.endsWith("".concat(pluralSeparator, "plural"))) {
                resLoad[resKey] = options.defaultValue_plural;
              } else {
                // Fallback to `defaultValue`
                resLoad[resKey] = _lodash["default"].isFunction(defaultValue) ? defaultValue(lng, ns, key, options) : options.defaultValue || defaultValue;
              }
              if (resLoad[resKey] !== undefined) {
                _this7.log("Added a new translation key { ".concat(_chalk["default"].yellow(JSON.stringify(resKey)), ": ").concat(_chalk["default"].yellow(JSON.stringify(resLoad[resKey])), " } to ").concat(_chalk["default"].yellow(JSON.stringify(_this7.formatResourceLoadPath(lng, ns)))));
              }
            } else if (options.defaultValue && (!options.defaultValue_plural || !resKey.endsWith("".concat(pluralSeparator, "plural")))) {
              if (!resLoad[resKey]) {
                // Use `options.defaultValue` if specified
                resLoad[resKey] = options.defaultValue;
              } else if (resLoad[resKey] !== options.defaultValue && lng === defaultLng) {
                // A default value has provided but it's different with the expected default
                _this7.log("The translation key ".concat(_chalk["default"].yellow(JSON.stringify(resKey)), ", with a default value of \"").concat(_chalk["default"].yellow(options.defaultValue), "\" has a different default value, you may need to check the translation key of default language (").concat(defaultLng, ")"));
              }
            } else if (options.defaultValue_plural && resKey.endsWith("".concat(pluralSeparator, "plural"))) {
              if (!resLoad[resKey]) {
                // Use `options.defaultValue_plural` if specified
                resLoad[resKey] = options.defaultValue_plural;
              } else if (resLoad[resKey] !== options.defaultValue_plural && lng === defaultLng) {
                // A default value has provided but it's different with the expected default
                _this7.log("The translation key ".concat(_chalk["default"].yellow(JSON.stringify(resKey)), ", with a default value of \"").concat(_chalk["default"].yellow(options.defaultValue_plural), "\" has a different default value, you may need to check the translation key of default language (").concat(defaultLng, ")"));
              }
            }
            resScan[resKey] = resLoad[resKey];
          });
        });
      });
    }

    // Returns a JSON string containing translation information
    // @param {object} [options] The options object
    // @param {boolean} [options.sort] True to sort object by key
    // @param {function|string[]|number[]} [options.replacer] The same as the JSON.stringify()
    // @param {string|number} [options.space] The same as the JSON.stringify() method
    // @return {string}
  }, {
    key: "toJSON",
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var replacer = options.replacer,
        space = options.space,
        others = _objectWithoutProperties(options, _excluded);
      return JSON.stringify(this.get(others), replacer, space);
    }
  }]);
  return Parser;
}();
var _default = Parser;
exports["default"] = _default;