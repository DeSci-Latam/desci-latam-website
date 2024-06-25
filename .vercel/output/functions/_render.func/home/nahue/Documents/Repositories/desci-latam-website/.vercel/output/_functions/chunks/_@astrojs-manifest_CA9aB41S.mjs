import { b as bold, a as red, y as yellow, d as dim, e as blue } from './astro/server_Dluq3R61.mjs';
import 'clsx';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/feature/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/feature","isIndex":true,"type":"page","pattern":"^\\/en\\/feature\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"feature","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/feature/index.astro","pathname":"/en/feature","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/page/feature/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/page/feature","isIndex":false,"type":"page","pattern":"^\\/en\\/page\\/feature\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"feature","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/page/feature.astro","pathname":"/en/page/feature","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/page/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/page","isIndex":true,"type":"page","pattern":"^\\/en\\/page\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/page/index.astro","pathname":"/en/page","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/setup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/setup","isIndex":false,"type":"page","pattern":"^\\/en\\/setup\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/setup.mdx","pathname":"/en/setup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"es/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/es/blog","isIndex":true,"type":"page","pattern":"^\\/es\\/blog\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/blog/index.astro","pathname":"/es/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"es/page/setup/setup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/es/page/setup/setup","isIndex":false,"type":"page","pattern":"^\\/es\\/page\\/setup\\/setup\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/page/setup/setup.mdx","pathname":"/es/page/setup/setup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"es/page/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/es/page","isIndex":true,"type":"page","pattern":"^\\/es\\/page\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/page/index.astro","pathname":"/es/page","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/feature/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/feature","isIndex":false,"type":"page","pattern":"^\\/pt\\/feature\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"feature","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/feature.astro","pathname":"/pt/feature","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/about","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/about\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/about.astro","pathname":"/pt/page/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/blog","isIndex":true,"type":"page","pattern":"^\\/pt\\/page\\/blog\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/blog/index.astro","pathname":"/pt/page/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/guides/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/guides","isIndex":true,"type":"page","pattern":"^\\/pt\\/page\\/guides\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"guides","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/guides/index.astro","pathname":"/pt/page/guides","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/index-backup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/index-backup","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/index-backup\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"index-backup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/index-backup.astro","pathname":"/pt/page/index-backup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/intro/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/intro","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/intro\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"intro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/intro.astro","pathname":"/pt/page/intro","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/landing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/landing","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/landing\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"landing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/landing.astro","pathname":"/pt/page/landing","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/login","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/login\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/login.astro","pathname":"/pt/page/login","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/pricing/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/pricing","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/pricing\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/pricing.astro","pathname":"/pt/page/pricing","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/register/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/register","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/register\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/register.astro","pathname":"/pt/page/register","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/releases/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/releases","isIndex":true,"type":"page","pattern":"^\\/pt\\/page\\/releases\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"releases","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/releases/index.astro","pathname":"/pt/page/releases","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/waitlist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page/waitlist","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/waitlist\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"waitlist","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/waitlist.astro","pathname":"/pt/page/waitlist","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/page/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/page","isIndex":true,"type":"page","pattern":"^\\/pt\\/page\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/index.astro","pathname":"/pt/page","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"pt/setup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/pt/setup","isIndex":false,"type":"page","pattern":"^\\/pt\\/setup\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"setup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/setup.mdx","pathname":"/pt/setup","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.11.0_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DZL4CV8D.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.CmJf3PkW.css"},{"type":"inline","content":".astro-route-announcer{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}\n"}],"routeData":{"route":"/pt/page/animes","isIndex":false,"type":"page","pattern":"^\\/pt\\/page\\/animes\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}],[{"content":"page","dynamic":false,"spread":false}],[{"content":"animes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/page/animes.astro","pathname":"/pt/page/animes","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://desci-latam-website-git-header-descilatam.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/blog-2/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/changelog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/en/setup.mdx",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/page/setup/setup.mdx",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/setup.mdx",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/404.astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/blog-2/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/changelog/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/monolingual.astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/en/category/[category]/[page].astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/category/[category]/[page].astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/page/category/[category]/[page].astro",{"propagation":"in-tree","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/category/[category]/[page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/ListPosts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/category/[category]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/category/[category]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/page/category/[category]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/pt/category/[category]/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/lib/fetchers.ts",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/blog-header.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/blog/category/[category].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/es/blog/category/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/es/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/blog/category/[category].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/blog/category/[category]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/guides/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/guides/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/blog-2/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/blog-2/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/changelog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/changelog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/[lang]/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/es/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/docs/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/docs/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/docs/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/docs/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/guides/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/guides/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/releases/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/releases/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/releases/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/releases/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/utils/post.ts",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/utils/index.ts",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/Category.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/ListCategories.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/HeaderLink.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/Base.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/Article.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/setup@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/es/page/setup/setup@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/pt/setup@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[lang]/monolingual@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/en/feature/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/en/feature/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/en/page/feature.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/en/page/feature@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/en/page/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/en/page/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/es/page/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/es/page/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/feature.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/feature@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/index-backup.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/pt/page/index-backup@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/cards/blog-card.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/login.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/register.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/about.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/animes.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/index.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/intro.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/landing.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/pricing.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/pt/page/waitlist.astro",{"propagation":"none","containsHead":true}],["/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/blog-post.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/components/cards/guide-card.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/guide-post.astro",{"propagation":"in-tree","containsHead":false}],["/home/nahue/Documents/Repositories/desci-latam-website/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.11.0_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/en/category/[category]/[page]@_@astro":"pages/en/category/_category_/_page_.astro.mjs","\u0000@astro-page:src/pages/en/feature/index@_@astro":"pages/en/feature.astro.mjs","\u0000@astro-page:src/pages/en/page/feature@_@astro":"pages/en/page/feature.astro.mjs","\u0000@astro-page:src/pages/en/page/index@_@astro":"pages/en/page.astro.mjs","\u0000@astro-page:src/pages/en/setup@_@mdx":"pages/en/setup.astro.mjs","\u0000@astro-page:src/pages/es/blog/category/[category]@_@astro":"pages/es/blog/category/_category_.astro.mjs","\u0000@astro-page:src/pages/es/blog/index@_@astro":"pages/es/blog.astro.mjs","\u0000@astro-page:src/pages/es/blog/[...slug]@_@astro":"pages/es/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/es/category/[category]/[page]@_@astro":"pages/es/category/_category_/_page_.astro.mjs","\u0000@astro-page:src/pages/es/page/category/[category]/[page]@_@astro":"pages/es/page/category/_category_/_page_.astro.mjs","\u0000@astro-page:src/pages/es/page/setup/setup@_@mdx":"pages/es/page/setup/setup.astro.mjs","\u0000@astro-page:src/pages/es/page/index@_@astro":"pages/es/page.astro.mjs","\u0000@astro-page:src/pages/pt/category/[category]/[page]@_@astro":"pages/pt/category/_category_/_page_.astro.mjs","\u0000@astro-page:src/pages/pt/docs/[...slug]@_@astro":"pages/pt/docs/_---slug_.astro.mjs","\u0000@astro-page:src/pages/pt/feature@_@astro":"pages/pt/feature.astro.mjs","\u0000@astro-page:src/pages/pt/page/about@_@astro":"pages/pt/page/about.astro.mjs","\u0000@astro-page:src/pages/pt/page/animes@_@astro":"pages/pt/page/animes.astro.mjs","\u0000@astro-page:src/pages/pt/page/blog/category/[category]@_@astro":"pages/pt/page/blog/category/_category_.astro.mjs","\u0000@astro-page:src/pages/pt/page/blog/index@_@astro":"pages/pt/page/blog.astro.mjs","\u0000@astro-page:src/pages/pt/page/blog/[...slug]@_@astro":"pages/pt/page/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/pt/page/docs/[...slug]@_@astro":"pages/pt/page/docs/_---slug_.astro.mjs","\u0000@astro-page:src/pages/pt/page/guides/index@_@astro":"pages/pt/page/guides.astro.mjs","\u0000@astro-page:src/pages/pt/page/guides/[...slug]@_@astro":"pages/pt/page/guides/_---slug_.astro.mjs","\u0000@astro-page:src/pages/pt/page/index-backup@_@astro":"pages/pt/page/index-backup.astro.mjs","\u0000@astro-page:src/pages/pt/page/intro@_@astro":"pages/pt/page/intro.astro.mjs","\u0000@astro-page:src/pages/pt/page/landing@_@astro":"pages/pt/page/landing.astro.mjs","\u0000@astro-page:src/pages/pt/page/login@_@astro":"pages/pt/page/login.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/pt/page/pricing@_@astro":"pages/pt/page/pricing.astro.mjs","\u0000@astro-page:src/pages/pt/page/register@_@astro":"pages/pt/page/register.astro.mjs","\u0000@astro-page:src/pages/pt/page/releases/[slug]@_@astro":"pages/pt/page/releases/_slug_.astro.mjs","\u0000@astro-page:src/pages/pt/page/releases/index@_@astro":"pages/pt/page/releases.astro.mjs","\u0000@astro-page:src/pages/pt/page/waitlist@_@astro":"pages/pt/page/waitlist.astro.mjs","\u0000@astro-page:src/pages/pt/page/index@_@astro":"pages/pt/page.astro.mjs","\u0000@astro-page:src/pages/pt/setup@_@mdx":"pages/pt/setup.astro.mjs","\u0000@astro-page:src/pages/[lang]/404@_@astro":"pages/_lang_/404.astro.mjs","\u0000@astro-page:src/pages/[lang]/blog-2/index@_@astro":"pages/_lang_/blog-2.astro.mjs","\u0000@astro-page:src/pages/[lang]/blog-2/[...slug]@_@astro":"pages/_lang_/blog-2/_---slug_.astro.mjs","\u0000@astro-page:src/pages/[lang]/changelog/index@_@astro":"pages/_lang_/changelog.astro.mjs","\u0000@astro-page:src/pages/[lang]/changelog/[...slug]@_@astro":"pages/_lang_/changelog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/[lang]/monolingual@_@astro":"pages/_lang_/monolingual.astro.mjs","\u0000@astro-page:src/pages/[lang]/rss.xml@_@js":"pages/_lang_/rss.xml.astro.mjs","\u0000@astro-page:src/pages/[lang]/index@_@astro":"pages/_lang_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","/home/nahue/Documents/Repositories/desci-latam-website/node_modules/.pnpm/astro@4.11.0_typescript@5.5.2/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/home/nahue/Documents/Repositories/desci-latam-website/node_modules/.pnpm/@astrojs+react@3.6.0_@types+react-dom@18.3.0_@types+react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1_vite@5.3.1/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","/node_modules/.pnpm/astro@4.11.0_typescript@5.5.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_CdXJA0Qf.mjs","/src/pages/404.astro":"chunks/404_BBBGJUmj.mjs","/src/pages/en/category/[category]/[page].astro":"chunks/_page__CdtKvp5p.mjs","/src/pages/en/feature/index.astro":"chunks/index_n7DhEu3h.mjs","/src/pages/en/page/feature.astro":"chunks/feature_BlKjKTXk.mjs","/src/pages/en/page/index.astro":"chunks/index_D3XmrzlB.mjs","/src/pages/en/setup.mdx":"chunks/setup_jImqpyQY.mjs","/src/pages/es/blog/category/[category].astro":"chunks/_category__CmObpz-X.mjs","/src/pages/es/blog/index.astro":"chunks/index_CKoLPf0L.mjs","/src/pages/es/blog/[...slug].astro":"chunks/_...slug__J2bFh9D4.mjs","/src/pages/es/category/[category]/[page].astro":"chunks/_page__Dbt1zqx2.mjs","/src/pages/es/page/category/[category]/[page].astro":"chunks/_page__BY1veezb.mjs","/src/pages/es/page/setup/setup.mdx":"chunks/setup_BtuujR4V.mjs","/src/pages/es/page/index.astro":"chunks/index_C_oSO1c7.mjs","/src/pages/pt/category/[category]/[page].astro":"chunks/_page__CRxpnQco.mjs","/src/pages/pt/docs/[...slug].astro":"chunks/_...slug__DXJgcyFV.mjs","/src/pages/pt/feature.astro":"chunks/feature_CbULrocs.mjs","/src/pages/pt/page/about.astro":"chunks/about_DkBdUq7w.mjs","/src/pages/pt/page/animes.astro":"chunks/animes_T7rm1D6B.mjs","/src/pages/pt/page/blog/category/[category].astro":"chunks/_category__yu041k2O.mjs","/src/pages/pt/page/blog/index.astro":"chunks/index_CSWO-aXp.mjs","/src/pages/pt/page/blog/[...slug].astro":"chunks/_...slug__DOa9cNyM.mjs","/src/pages/pt/page/docs/[...slug].astro":"chunks/_...slug__DnzLMyu9.mjs","/src/pages/pt/page/guides/index.astro":"chunks/index_DCPKyHTy.mjs","/src/pages/pt/page/guides/[...slug].astro":"chunks/_...slug__Cw38ameR.mjs","/src/pages/pt/page/index-backup.astro":"chunks/index-backup_DuG8nBRP.mjs","/src/pages/pt/page/intro.astro":"chunks/intro_CGo-jqHx.mjs","/src/pages/pt/page/landing.astro":"chunks/landing__JGkazGC.mjs","/src/pages/pt/page/login.astro":"chunks/login_HCcRAcAD.mjs","/src/pages/pt/page/pricing.astro":"chunks/pricing_DgQ7YnU8.mjs","/src/pages/pt/page/register.astro":"chunks/register_Bnl2VETV.mjs","/src/pages/pt/page/releases/[slug].astro":"chunks/_slug__4JCS6k79.mjs","/src/pages/pt/page/releases/index.astro":"chunks/index_AUaqpVrN.mjs","/src/pages/pt/page/waitlist.astro":"chunks/waitlist_BdfPcYx_.mjs","/src/pages/pt/page/index.astro":"chunks/index_CU_4TwyS.mjs","/src/pages/pt/setup.mdx":"chunks/setup_hZI5h8io.mjs","/src/pages/[lang]/404.astro":"chunks/404_DsF-D2id.mjs","/src/pages/[lang]/blog-2/index.astro":"chunks/index_DYel-mFu.mjs","/src/pages/[lang]/blog-2/[...slug].astro":"chunks/_...slug__BIXvbE_r.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/layouts/Article.astro":"chunks/Article_HuR1Bt31.mjs","/src/pages/[lang]/changelog/index.astro":"chunks/index_CCUw9kT_.mjs","/src/pages/[lang]/changelog/[...slug].astro":"chunks/_...slug__CoXq27Ty.mjs","/src/pages/[lang]/monolingual.astro":"chunks/monolingual_C6Ef7911.mjs","/src/pages/[lang]/rss.xml.js":"chunks/rss.xml_tBAjSF7m.mjs","/src/pages/[lang]/index.astro":"chunks/index_CoGyTbxC.mjs","/src/pages/index.astro":"chunks/index_ggygN7Xh.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/first-post.md?astroContentCollectionEntry=true":"chunks/first-post_DpzmBxR2.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/markdown-style-guide.md?astroContentCollectionEntry=true":"chunks/markdown-style-guide_sFLXAx0_.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/pale-blue-dot.md?astroContentCollectionEntry=true":"chunks/pale-blue-dot_e1OsuGBx.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/preview-markdown.md?astroContentCollectionEntry=true":"chunks/preview-markdown_CTPbeKKj.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/third-post.md?astroContentCollectionEntry=true":"chunks/third-post_BvHRlEK8.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/using-mdx.mdx?astroContentCollectionEntry=true":"chunks/using-mdx_CXW4ZKq2.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/en/first-post/index.mdx?astroContentCollectionEntry=true":"chunks/index_5qWwTgm5.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/es/ por-que-desci-todavia-no-es-perfecto-7-principales-desafios/index.mdx?astroContentCollectionEntry=true":"chunks/index_t-zl3hMc.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/pt/first-post/index.mdx?astroContentCollectionEntry=true":"chunks/index_JCvh8fU8.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/en/1/1_0.md?astroContentCollectionEntry=true":"chunks/1_0_BAm4yh74.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/es/1/1_0.md?astroContentCollectionEntry=true":"chunks/1_0_DdnDy86a.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/pt/1/1_0.md?astroContentCollectionEntry=true":"chunks/1_0_BSuPAUOs.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/code-blocks.mdx?astroContentCollectionEntry=true":"chunks/code-blocks_C5dgEccU.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/components.mdx?astroContentCollectionEntry=true":"chunks/components_Cc363gZY.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/index.mdx?astroContentCollectionEntry=true":"chunks/index_B7-Cmbf6.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/style-guide.mdx?astroContentCollectionEntry=true":"chunks/style-guide_C_SMMLlq.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/getting-started.mdx?astroContentCollectionEntry=true":"chunks/getting-started_D-m7hG4W.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/in-progress.mdx?astroContentCollectionEntry=true":"chunks/in-progress_C0A3frzV.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/build-blog-using-astro-mdx.mdx?astroContentCollectionEntry=true":"chunks/build-blog-using-astro-mdx_BACVKqDA.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/using-next-auth-next-13.mdx?astroContentCollectionEntry=true":"chunks/using-next-auth-next-13_C_DC2f2P.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_0.md?astroContentCollectionEntry=true":"chunks/1_0_Bf5RIKgV.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_4.md?astroContentCollectionEntry=true":"chunks/1_4_DcMIJP3w.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_8.md?astroContentCollectionEntry=true":"chunks/1_8_C1-76TMD.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/2_0.md?astroContentCollectionEntry=true":"chunks/2_0_DbYpBRCO.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/first-post.md?astroPropagatedAssets":"chunks/first-post_BhBKJCX3.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/markdown-style-guide.md?astroPropagatedAssets":"chunks/markdown-style-guide_Ch_4w58n.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/pale-blue-dot.md?astroPropagatedAssets":"chunks/pale-blue-dot_DkYNmWlg.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/preview-markdown.md?astroPropagatedAssets":"chunks/preview-markdown_CD98ns_F.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/third-post.md?astroPropagatedAssets":"chunks/third-post_BXsWfa7t.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_DGloCWa8.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/en/first-post/index.mdx?astroPropagatedAssets":"chunks/index_CDWrveKC.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/es/ por-que-desci-todavia-no-es-perfecto-7-principales-desafios/index.mdx?astroPropagatedAssets":"chunks/index_lgN7DMvb.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/pt/first-post/index.mdx?astroPropagatedAssets":"chunks/index_Dvdpwyfd.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/en/1/1_0.md?astroPropagatedAssets":"chunks/1_0_C1NYMX26.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/es/1/1_0.md?astroPropagatedAssets":"chunks/1_0_B9Cb0efI.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/pt/1/1_0.md?astroPropagatedAssets":"chunks/1_0_Dq8fwcHw.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/code-blocks.mdx?astroPropagatedAssets":"chunks/code-blocks_Dl7oS1vM.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/components.mdx?astroPropagatedAssets":"chunks/components_DWPbvFU7.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/index.mdx?astroPropagatedAssets":"chunks/index_Vudt8Zjp.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/style-guide.mdx?astroPropagatedAssets":"chunks/style-guide_DyvTGWun.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/getting-started.mdx?astroPropagatedAssets":"chunks/getting-started_Bdf0FW7F.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/in-progress.mdx?astroPropagatedAssets":"chunks/in-progress_Co6Z4DcY.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/build-blog-using-astro-mdx.mdx?astroPropagatedAssets":"chunks/build-blog-using-astro-mdx_2jk2Eef2.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/using-next-auth-next-13.mdx?astroPropagatedAssets":"chunks/using-next-auth-next-13_iRc001Yt.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_0.md?astroPropagatedAssets":"chunks/1_0_CRzFXodY.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_4.md?astroPropagatedAssets":"chunks/1_4_BcoZa8j2.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_8.md?astroPropagatedAssets":"chunks/1_8_kVxilk4z.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/2_0.md?astroPropagatedAssets":"chunks/2_0_Ce-OEvoV.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/first-post.md":"chunks/first-post_CipP-BMI.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/markdown-style-guide.md":"chunks/markdown-style-guide_DfZ-dPJx.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/pale-blue-dot.md":"chunks/pale-blue-dot_ZF9k6gQ9.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/preview-markdown.md":"chunks/preview-markdown_CO4kcRXD.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/third-post.md":"chunks/third-post_doGEgUEg.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog/using-mdx.mdx":"chunks/using-mdx_Dp73cYha.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/en/first-post/index.mdx":"chunks/index_B_1haxSZ.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/es/ por-que-desci-todavia-no-es-perfecto-7-principales-desafios/index.mdx":"chunks/index_7IPT3dp1.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/blog2/pt/first-post/index.mdx":"chunks/index_Dy7fIXDh.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/en/1/1_0.md":"chunks/1_0_BDyrcrNY.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/es/1/1_0.md":"chunks/1_0_D2gfqFAW.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/changelog/pt/1/1_0.md":"chunks/1_0_VGHWaV1w.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/code-blocks.mdx":"chunks/code-blocks_DQvYGDhb.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/components.mdx":"chunks/components_-WITnMrh.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/index.mdx":"chunks/index_CS-6dECc.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/documentation/style-guide.mdx":"chunks/style-guide_DdQaQXHB.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/getting-started.mdx":"chunks/getting-started_D6D9jmT4.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/docs/in-progress.mdx":"chunks/in-progress_CqY5Benc.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/build-blog-using-astro-mdx.mdx":"chunks/build-blog-using-astro-mdx_BiAbZ4tf.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/guides/using-next-auth-next-13.mdx":"chunks/using-next-auth-next-13_CTn0HIh1.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_0.md":"chunks/1_0_HH54W3nu.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_4.md":"chunks/1_4_DAla9i2d.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/1_8.md":"chunks/1_8_MJsRtrmg.mjs","/home/nahue/Documents/Repositories/desci-latam-website/src/content/releases/2_0.md":"chunks/2_0_D5oqwlYE.mjs","\u0000@astrojs-manifest":"manifest_Dj389hDe.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.B_zssVYw.js","/astro/hoisted.js?q=2":"_astro/hoisted.CVuGQYSB.js","/astro/hoisted.js?q=0":"_astro/hoisted.BLSuOyJ5.js","@astrojs/react/client.js":"_astro/client.XTbkuo2N.js","@/components/toc":"_astro/toc.DjLz8cLb.js","@/components/main-navigation-menu":"_astro/main-navigation-menu.BqfEjYqD.js","/home/nahue/Documents/Repositories/desci-latam-website/node_modules/.pnpm/@pagefind+default-ui@1.1.0/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.GIbl3K41.js","@/components/ui/scroll-area":"_astro/scroll-area.CUFdaB_2.js","/astro/hoisted.js?q=3":"_astro/hoisted.CfP565uY.js","sonner":"_astro/_astro-entry_sonner.rPf9huzC.js","@/components/animes-tabs":"_astro/animes-tabs.CPZux90o.js","@/components/layout/sheet-mobile-nav":"_astro/sheet-mobile-nav.XJRQu1ZU.js","/astro/hoisted.js?q=4":"_astro/hoisted.DZL4CV8D.js","@/components/forms/waitlist-form":"_astro/waitlist-form.CAcYqqMX.js","@/components/theme-toggle":"_astro/theme-toggle.DsZ4p7nY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/mariposa.CCNBzXDA.png","/_astro/astronauta.BlqJoPeD.png","/_astro/pes.Cz5zEmSd.png","/_astro/cientifica.kZGJt1lK.png","/_astro/caos.jaJFuyGA.png","/_astro/cover.CAkVLbI9.png","/_astro/starlog-placeholder-1.D1Ad2KDX.jpg","/_astro/starlog-placeholder-14.C35Xhprn.jpg","/_astro/starlog-placeholder-18.DGuuNQXy.jpg","/_astro/starlog-placeholder-2.Dx_N7jU4.jpg","/_astro/logo.7ywmAUN1.svg","/_astro/desci-1.DhlBnEa7.jpg","/_astro/_slug_.C9JR2hMZ.css","/_astro/_slug_.CmJf3PkW.css","/favicon copy.svg","/favicon.svg","/og.jpg","/_astro/_astro-entry_sonner.DPHK7gBM.js","/_astro/_astro-entry_sonner.rPf9huzC.js","/_astro/animes-tabs.CPZux90o.js","/_astro/button.DKIpWAhM.js","/_astro/client.XTbkuo2N.js","/_astro/createLucideIcon.D-ywHMOr.js","/_astro/hoisted.BLSuOyJ5.js","/_astro/hoisted.B_zssVYw.js","/_astro/hoisted.CVuGQYSB.js","/_astro/hoisted.CfP565uY.js","/_astro/hoisted.DZL4CV8D.js","/_astro/index.BD67RL0F.js","/_astro/index.BUSt7gCi.js","/_astro/index.Blrfq9q_.js","/_astro/index.CMQ3OGCn.js","/_astro/index.Cyl1RP4W.js","/_astro/index.D9w78PYq.js","/_astro/index.s-Xjfene.js","/_astro/index.ws-AkMl3.js","/_astro/jsx-runtime.SN7vRHW2.js","/_astro/main-navigation-menu.BqfEjYqD.js","/_astro/scroll-area.CUFdaB_2.js","/_astro/sheet-mobile-nav.XJRQu1ZU.js","/_astro/theme-toggle.DsZ4p7nY.js","/_astro/toc.DjLz8cLb.js","/_astro/ui-core.GIbl3K41.js","/_astro/utils.CP77xEu2.js","/_astro/waitlist-form.CAcYqqMX.js","/fonts/calsans-semibold.woff2","/fonts/inter.woff2","/images/blog/placeholder-1.jpg","/images/blog/placeholder-2.jpg","/images/blog/placeholder-3.jpg","/images/blog/placeholder-4.jpg","/images/blog/placeholder-5.jpg","/images/blog/placeholder-about.jpg","/images/examples/about.jpg","/images/examples/animes.jpg","/images/examples/changelog.jpg","/images/examples/documentation.jpg","/images/examples/landing.jpg","/images/examples/newsletter.jpg","/images/examples/placeholder.jpg","/images/examples/pricing.jpg","/images/examples/static-blog.jpg","/images/examples/waitlist.jpg","/404.html","/en/feature/index.html","/en/page/feature/index.html","/en/page/index.html","/en/setup/index.html","/es/blog/index.html","/es/page/setup/setup/index.html","/es/page/index.html","/pt/feature/index.html","/pt/page/about/index.html","/pt/page/blog/index.html","/pt/page/guides/index.html","/pt/page/index-backup/index.html","/pt/page/intro/index.html","/pt/page/landing/index.html","/pt/page/login/index.html","/pt/page/pricing/index.html","/pt/page/register/index.html","/pt/page/releases/index.html","/pt/page/waitlist/index.html","/pt/page/index.html","/pt/setup/index.html","/index.html"],"i18n":{"strategy":"pathname-prefix-always-no-redirect","locales":["en","es","pt"],"defaultLocale":"es","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
