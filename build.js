module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isFQDN = __webpack_require__(2);
var isIP = __webpack_require__(3);
var EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // intentionally non-exhaustive

var EnvError = function (_TypeError) {
    _inherits(EnvError, _TypeError);

    function EnvError() {
        var _ref;

        _classCallCheck(this, EnvError);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EnvError.__proto__ || Object.getPrototypeOf(EnvError)).call.apply(_ref, [this].concat(args)));

        Error.captureStackTrace(_this, EnvError);
        _this.name = 'EnvError';
        return _this;
    }

    return EnvError;
}(TypeError);

exports.EnvError = EnvError;

var EnvMissingError = function (_ReferenceError) {
    _inherits(EnvMissingError, _ReferenceError);

    function EnvMissingError() {
        var _ref2;

        _classCallCheck(this, EnvMissingError);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this2 = _possibleConstructorReturn(this, (_ref2 = EnvMissingError.__proto__ || Object.getPrototypeOf(EnvMissingError)).call.apply(_ref2, [this].concat(args)));

        Error.captureStackTrace(_this2, EnvMissingError);
        _this2.name = 'EnvMissingError';
        return _this2;
    }

    return EnvMissingError;
}(ReferenceError);

exports.EnvMissingError = EnvMissingError;

function makeValidator(parseFn) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unknown';

    return function () {
        var spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        spec.type = type;
        spec._parse = parseFn;
        return spec;
    };
}
exports.makeValidator = makeValidator;

exports.bool = makeValidator(function (input) {
    switch (input) {
        case true:
        case 'true':
        case 't':
        case '1':
            return true;
        case false:
        case 'false':
        case 'f':
        case '0':
            return false;
        default:
            return null;
    }
}, 'bool');

exports.num = makeValidator(function (input) {
    var coerced = +input;
    if (Number.isNaN(coerced)) throw new EnvError('Invalid number input: "' + input + '"');
    return coerced;
}, 'num');

exports.str = makeValidator(function (input) {
    if (typeof input === 'string') return input;
    throw new EnvError('Not a string: "' + input + '"');
}, 'str');

exports.email = makeValidator(function (x) {
    if (EMAIL_REGEX.test(x)) return x;
    throw new EnvError('Invalid email address: "' + x + '"');
}, 'email');

exports.host = makeValidator(function (input) {
    if (!isFQDN(input, { require_tld: false }) && !isIP(input)) {
        throw new EnvError('Invalid host (domain or ip): "' + input + '"');
    }
    return input;
}, 'host');

exports.port = makeValidator(function (input) {
    var coerced = +input;
    if (Number.isNaN(coerced) || '' + coerced !== '' + input || coerced % 1 !== 0 || coerced < 1 || coerced > 65535) {
        throw new EnvError('Invalid port input: "' + input + '"');
    }
    return coerced;
}, 'port');

exports.url = makeValidator(function (x) {
    var url = __webpack_require__(4);
    var isValid = false;

    if (url.URL) {
        try {
            new url.URL(x);
            isValid = true;
        } catch (e) {
            isValid = false;
        }
    } else {
        var parsed = url.parse(x);
        isValid = !!(parsed.protocol && parsed.host && parsed.slashes);
    }

    if (isValid) return x;
    throw new EnvError('Invalid url: "' + x + '"');
}, 'url');

exports.json = makeValidator(function (x) {
    try {
        return JSON.parse(x);
    } catch (e) {
        throw new EnvError('Invalid json: "' + x + '"');
    }
}, 'json');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var require;

var _require2 = __webpack_require__(0),
    EnvError = _require2.EnvError,
    EnvMissingError = _require2.EnvMissingError,
    makeValidator = _require2.makeValidator,
    bool = _require2.bool,
    num = _require2.num,
    str = _require2.str,
    json = _require2.json,
    url = _require2.url,
    email = _require2.email,
    host = _require2.host,
    port = _require2.port;

var extend = function extend() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Object.assign({}, x, y);
};

var testOnlySymbol = Symbol('envalid - test only');

/**
* Validate a single env var, given a spec object
*
* @throws EnvError - If validation is unsuccessful
* @return - The cleaned value
*/
function validateVar(_ref) {
    var _ref$spec = _ref.spec,
        spec = _ref$spec === undefined ? {} : _ref$spec,
        name = _ref.name,
        rawValue = _ref.rawValue;

    if (typeof spec._parse !== 'function') {
        throw new EnvError('Invalid spec for "' + name + '"');
    }
    var value = spec._parse(rawValue);

    if (spec.choices) {
        if (!Array.isArray(spec.choices)) {
            throw new TypeError('"choices" must be an array (in spec for "' + name + '")');
        } else if (!~spec.choices.indexOf(value)) {
            throw new EnvError('Value "' + value + '" not in choices [' + spec.choices + ']');
        }
    }
    if (value == null) throw new EnvError('Invalid value for env var "' + name + '"');
    return value;
}

// Format a string error message for when a required env var is missing
function formatSpecDescription(spec) {
    var egText = spec.example ? ' (eg. "' + spec.example + '")' : '';
    var docsText = spec.docs ? '. See ' + spec.docs : '';
    return '' + spec.desc + egText + docsText || '';
}

// Extend an env var object with the values parsed from a ".env"
// file, whose path is given by the second argument.
function extendWithDotEnv(inputEnv) {
    var dotEnvPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.env';

    // fs and dotenv cannot be required inside react-native.
    // The react-native packager detects the require calls even if they
    // are not on the top level, so we need to obfuscate them
    var _require = require;
    var fs = __webpack_require__(5);
    var dotenv = __webpack_require__(6);

    var dotEnvBuffer = null;
    try {
        dotEnvBuffer = fs.readFileSync(dotEnvPath);
    } catch (err) {
        if (err.code === 'ENOENT') return inputEnv;
        throw err;
    }
    var parsed = dotenv.parse(dotEnvBuffer);
    return extend(parsed, inputEnv);
}

function cleanEnv(inputEnv) {
    var specs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var output = {};
    var defaultNodeEnv = '';
    var errors = {};
    var env = options.dotEnvPath !== null ? extendWithDotEnv(inputEnv, options.dotEnvPath) : inputEnv;
    var varKeys = Object.keys(specs);

    // If validation for NODE_ENV isn't specified, use the default validation:
    if (!~varKeys.indexOf('NODE_ENV')) {
        defaultNodeEnv = validateVar({
            name: 'NODE_ENV',
            spec: str({ choices: ['development', 'test', 'production'] }),
            rawValue: env.NODE_ENV || 'production'
        });
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = varKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            var spec = specs[k];
            var usingDevDefault = env.NODE_ENV !== 'production' && spec.hasOwnProperty('devDefault');
            var devDefault = usingDevDefault ? spec.devDefault : undefined;
            var rawValue = env[k];

            if (rawValue === undefined) {
                rawValue = devDefault === undefined ? spec.default : devDefault;
            }

            // Default values can be anything falsy (including an explicitly set undefined), without
            // triggering validation errors:
            var usingFalsyDefault = spec.hasOwnProperty('default') && spec.default === rawValue || usingDevDefault && devDefault === rawValue;

            try {
                if (rawValue === testOnlySymbol) {
                    throw new EnvMissingError(formatSpecDescription(spec));
                }

                if (rawValue === undefined) {
                    if (!usingFalsyDefault) {
                        throw new EnvMissingError(formatSpecDescription(spec));
                    }

                    output[k] = undefined;
                } else {
                    output[k] = validateVar({ name: k, spec: spec, rawValue: rawValue });
                }
            } catch (err) {
                if (options.reporter === null) throw err;
                errors[k] = err;
            }
        }

        // If we need to run Object.assign() on output, we must do it before the
        // defineProperties() call, otherwise the properties would be lost
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

    output = options.strict ? output : extend(env, output);

    Object.defineProperties(output, {
        isDev: { value: (defaultNodeEnv || output.NODE_ENV) === 'development' },
        isProduction: { value: (defaultNodeEnv || output.NODE_ENV) === 'production' },
        isTest: { value: (defaultNodeEnv || output.NODE_ENV) === 'test' }
    });

    if (options.transformer) {
        output = options.transformer(output);
    }

    var reporter = options.reporter || __webpack_require__(7);
    reporter({ errors: errors, env: output });

    if (options.strict) output = __webpack_require__(9)(output, env);

    return Object.freeze(output);
}

/**
* Utility function for providing default values only when NODE_ENV=test
*
* For more context, see https://github.com/af/envalid/issues/32
*/
var testOnly = function testOnly(defaultValueForTests) {
    return process.env.NODE_ENV === 'test' ? defaultValueForTests : testOnlySymbol;
};

module.exports = {
    // core API
    cleanEnv: cleanEnv,
    makeValidator: makeValidator,
    // error subclasses
    EnvError: EnvError,
    EnvMissingError: EnvMissingError,
    // utility function(s)
    testOnly: testOnly,
    // built-in validators
    bool: bool,
    num: num,
    str: str,
    json: json,
    host: host,
    port: port,
    url: url,
    email: email
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("validator/lib/isFQDN");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("validator/lib/isIP");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-console */
var _require = __webpack_require__(0),
    EnvMissingError = _require.EnvMissingError;

var chalk = __webpack_require__(8);
var RULE = chalk.grey('================================');

module.exports = function defaultReporter(_ref) {
    var _ref$errors = _ref.errors,
        errors = _ref$errors === undefined ? {} : _ref$errors,
        _ref$env = _ref.env,
        env = _ref$env === undefined ? {} : _ref$env;

    var errorKeys = Object.keys(errors);
    if (!errorKeys.length) return;

    var missingVarsOutput = [];
    var invalidVarsOutput = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = errorKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            var err = errors[k];
            if (err instanceof EnvMissingError) {
                missingVarsOutput.push('    ' + chalk.blue(k) + ': ' + (errors[k].message || '(required)'));
            } else invalidVarsOutput.push('    ' + chalk.blue(k) + ': ' + errors[k].message);
        }

        // Prepend "header" output for each section of the output:
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

    if (invalidVarsOutput.length) {
        invalidVarsOutput.unshift(' ' + chalk.yellow('Invalid') + ' environment variables:');
    }
    if (missingVarsOutput.length) {
        missingVarsOutput.unshift(' ' + chalk.yellow('Missing') + ' environment variables:');
    }

    var output = [RULE, invalidVarsOutput.join('\n'), missingVarsOutput.join('\n'), chalk.yellow('\n Exiting with error code 1'), RULE].filter(function (x) {
        return !!x;
    }).join('\n');

    console.error(output);
    process.exit(1);
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var meant = __webpack_require__(10);

/**
* Suggest similar env var(s) if possible; for use when an invalid var is accessed.
*/
var didYouMean = function didYouMean(scmd, commands) {
    var bestSimilarity = meant(scmd, commands);
    var suggestion = bestSimilarity.join(', ');

    if (bestSimilarity.length > 0) {
        throw new ReferenceError('[envalid] Env var ' + scmd + ' not found, did you mean ' + suggestion + '?');
    }
};

/**
* Wrap the environment object with a Proxy that throws when:
* a) trying to mutate an env var
* b) trying to access an invalid (unset) env var
*
* @return {Object} - Proxied environment object with get/set traps
*/
module.exports = function (envObj, originalEnv) {
    return new Proxy(envObj, {
        get: function get(target, name) {
            // These checks are needed because calling console.log on a
            // proxy that throws crashes the entire process. This whitelists
            // the necessary properties for `console.log(envObj)` and
            // `envObj.hasOwnProperty('string')` to work.
            if (~['inspect', 'hasOwnProperty', Symbol.toStringTag].indexOf(name)) {
                return envObj[name];
            }
            if (name.toString() === 'Symbol(util.inspect.custom)') return envObj[name];

            var varExists = envObj.hasOwnProperty(name);
            if (!varExists) {
                if (originalEnv.hasOwnProperty(name)) {
                    throw new ReferenceError('[envalid] Env var ' + name + ' was accessed but not validated. This var is set in the environment; please add an envalid validator for it.');
                }

                didYouMean(name, Object.keys(envObj));
                throw new ReferenceError('[envalid] Env var not found: ' + name);
            }

            return envObj[name];
        },
        set: function set(target, name) {
            throw new TypeError('[envalid] Attempt to mutate environment value: ' + name);
        }
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("meant");

/***/ })
/******/ ]);