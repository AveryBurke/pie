// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7pddQ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "bd82787c1020577a";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"6ZzI7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "create", ()=>(0, _createJsDefault.default));
parcelHelpers.export(exports, "creator", ()=>(0, _creatorJsDefault.default));
parcelHelpers.export(exports, "local", ()=>(0, _localJsDefault.default));
parcelHelpers.export(exports, "matcher", ()=>(0, _matcherJsDefault.default));
parcelHelpers.export(exports, "namespace", ()=>(0, _namespaceJsDefault.default));
parcelHelpers.export(exports, "namespaces", ()=>(0, _namespacesJsDefault.default));
parcelHelpers.export(exports, "pointer", ()=>(0, _pointerJsDefault.default));
parcelHelpers.export(exports, "pointers", ()=>(0, _pointersJsDefault.default));
parcelHelpers.export(exports, "select", ()=>(0, _selectJsDefault.default));
parcelHelpers.export(exports, "selectAll", ()=>(0, _selectAllJsDefault.default));
parcelHelpers.export(exports, "selection", ()=>(0, _indexJsDefault.default));
parcelHelpers.export(exports, "selector", ()=>(0, _selectorJsDefault.default));
parcelHelpers.export(exports, "selectorAll", ()=>(0, _selectorAllJsDefault.default));
parcelHelpers.export(exports, "style", ()=>(0, _styleJs.styleValue));
parcelHelpers.export(exports, "window", ()=>(0, _windowJsDefault.default));
var _createJs = require("./create.js");
var _createJsDefault = parcelHelpers.interopDefault(_createJs);
var _creatorJs = require("./creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _localJs = require("./local.js");
var _localJsDefault = parcelHelpers.interopDefault(_localJs);
var _matcherJs = require("./matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);
var _pointerJs = require("./pointer.js");
var _pointerJsDefault = parcelHelpers.interopDefault(_pointerJs);
var _pointersJs = require("./pointers.js");
var _pointersJsDefault = parcelHelpers.interopDefault(_pointersJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _indexJs = require("./selection/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _selectorJs = require("./selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
var _selectorAllJs = require("./selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
var _styleJs = require("./selection/style.js");
var _windowJs = require("./window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);

},{"./create.js":"9KZKw","./creator.js":"6qJeN","./local.js":"7ox6C","./matcher.js":"33yNG","./namespace.js":"aYL8Z","./namespaces.js":"kQM63","./pointer.js":"44Bj8","./pointers.js":"gdt8u","./select.js":"bmQlm","./selectAll.js":"bsp3d","./selection/index.js":"dvcb8","./selector.js":"gqWxq","./selectorAll.js":"feKTn","./selection/style.js":"jYjE6","./window.js":"ekrRb","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9KZKw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _creatorJs = require("./creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
exports.default = function(name) {
    return (0, _selectJsDefault.default)((0, _creatorJsDefault.default)(name).call(document.documentElement));
};

},{"./creator.js":"6qJeN","./select.js":"bmQlm","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6qJeN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
function creatorInherit(name) {
    return function() {
        var document = this.ownerDocument, uri = this.namespaceURI;
        return uri === (0, _namespacesJs.xhtml) && document.documentElement.namespaceURI === (0, _namespacesJs.xhtml) ? document.createElement(name) : document.createElementNS(uri, name);
    };
}
function creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}
exports.default = function(name) {
    var fullname = (0, _namespaceJsDefault.default)(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
};

},{"./namespace.js":"aYL8Z","./namespaces.js":"kQM63","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"aYL8Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);
exports.default = function(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return (0, _namespacesJsDefault.default).hasOwnProperty(prefix) ? {
        space: (0, _namespacesJsDefault.default)[prefix],
        local: name
    } : name; // eslint-disable-line no-prototype-builtins
};

},{"./namespaces.js":"kQM63","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"kQM63":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "xhtml", ()=>xhtml);
var xhtml = "http://www.w3.org/1999/xhtml";
exports.default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"fn8Fk":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"bmQlm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./selection/index.js");
exports.default = function(selector) {
    return typeof selector === "string" ? new (0, _indexJs.Selection)([
        [
            document.querySelector(selector)
        ]
    ], [
        document.documentElement
    ]) : new (0, _indexJs.Selection)([
        [
            selector
        ]
    ], (0, _indexJs.root));
};

},{"./selection/index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dvcb8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "root", ()=>root);
parcelHelpers.export(exports, "Selection", ()=>Selection);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _selectChildJs = require("./selectChild.js");
var _selectChildJsDefault = parcelHelpers.interopDefault(_selectChildJs);
var _selectChildrenJs = require("./selectChildren.js");
var _selectChildrenJsDefault = parcelHelpers.interopDefault(_selectChildrenJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _dataJs = require("./data.js");
var _dataJsDefault = parcelHelpers.interopDefault(_dataJs);
var _enterJs = require("./enter.js");
var _enterJsDefault = parcelHelpers.interopDefault(_enterJs);
var _exitJs = require("./exit.js");
var _exitJsDefault = parcelHelpers.interopDefault(_exitJs);
var _joinJs = require("./join.js");
var _joinJsDefault = parcelHelpers.interopDefault(_joinJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _orderJs = require("./order.js");
var _orderJsDefault = parcelHelpers.interopDefault(_orderJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
var _callJs = require("./call.js");
var _callJsDefault = parcelHelpers.interopDefault(_callJs);
var _nodesJs = require("./nodes.js");
var _nodesJsDefault = parcelHelpers.interopDefault(_nodesJs);
var _nodeJs = require("./node.js");
var _nodeJsDefault = parcelHelpers.interopDefault(_nodeJs);
var _sizeJs = require("./size.js");
var _sizeJsDefault = parcelHelpers.interopDefault(_sizeJs);
var _emptyJs = require("./empty.js");
var _emptyJsDefault = parcelHelpers.interopDefault(_emptyJs);
var _eachJs = require("./each.js");
var _eachJsDefault = parcelHelpers.interopDefault(_eachJs);
var _attrJs = require("./attr.js");
var _attrJsDefault = parcelHelpers.interopDefault(_attrJs);
var _styleJs = require("./style.js");
var _styleJsDefault = parcelHelpers.interopDefault(_styleJs);
var _propertyJs = require("./property.js");
var _propertyJsDefault = parcelHelpers.interopDefault(_propertyJs);
var _classedJs = require("./classed.js");
var _classedJsDefault = parcelHelpers.interopDefault(_classedJs);
var _textJs = require("./text.js");
var _textJsDefault = parcelHelpers.interopDefault(_textJs);
var _htmlJs = require("./html.js");
var _htmlJsDefault = parcelHelpers.interopDefault(_htmlJs);
var _raiseJs = require("./raise.js");
var _raiseJsDefault = parcelHelpers.interopDefault(_raiseJs);
var _lowerJs = require("./lower.js");
var _lowerJsDefault = parcelHelpers.interopDefault(_lowerJs);
var _appendJs = require("./append.js");
var _appendJsDefault = parcelHelpers.interopDefault(_appendJs);
var _insertJs = require("./insert.js");
var _insertJsDefault = parcelHelpers.interopDefault(_insertJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _cloneJs = require("./clone.js");
var _cloneJsDefault = parcelHelpers.interopDefault(_cloneJs);
var _datumJs = require("./datum.js");
var _datumJsDefault = parcelHelpers.interopDefault(_datumJs);
var _onJs = require("./on.js");
var _onJsDefault = parcelHelpers.interopDefault(_onJs);
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);
var _iteratorJs = require("./iterator.js");
var _iteratorJsDefault = parcelHelpers.interopDefault(_iteratorJs);
var root = [
    null
];
function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
}
function selection() {
    return new Selection([
        [
            document.documentElement
        ]
    ], root);
}
function selection_selection() {
    return this;
}
Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: (0, _selectJsDefault.default),
    selectAll: (0, _selectAllJsDefault.default),
    selectChild: (0, _selectChildJsDefault.default),
    selectChildren: (0, _selectChildrenJsDefault.default),
    filter: (0, _filterJsDefault.default),
    data: (0, _dataJsDefault.default),
    enter: (0, _enterJsDefault.default),
    exit: (0, _exitJsDefault.default),
    join: (0, _joinJsDefault.default),
    merge: (0, _mergeJsDefault.default),
    selection: selection_selection,
    order: (0, _orderJsDefault.default),
    sort: (0, _sortJsDefault.default),
    call: (0, _callJsDefault.default),
    nodes: (0, _nodesJsDefault.default),
    node: (0, _nodeJsDefault.default),
    size: (0, _sizeJsDefault.default),
    empty: (0, _emptyJsDefault.default),
    each: (0, _eachJsDefault.default),
    attr: (0, _attrJsDefault.default),
    style: (0, _styleJsDefault.default),
    property: (0, _propertyJsDefault.default),
    classed: (0, _classedJsDefault.default),
    text: (0, _textJsDefault.default),
    html: (0, _htmlJsDefault.default),
    raise: (0, _raiseJsDefault.default),
    lower: (0, _lowerJsDefault.default),
    append: (0, _appendJsDefault.default),
    insert: (0, _insertJsDefault.default),
    remove: (0, _removeJsDefault.default),
    clone: (0, _cloneJsDefault.default),
    datum: (0, _datumJsDefault.default),
    on: (0, _onJsDefault.default),
    dispatch: (0, _dispatchJsDefault.default),
    [Symbol.iterator]: (0, _iteratorJsDefault.default)
};
exports.default = selection;

},{"./select.js":"8v90o","./selectAll.js":"5um9f","./selectChild.js":"6LCzc","./selectChildren.js":"cx8Xh","./filter.js":"dhrDd","./data.js":"4lhGj","./enter.js":"5BED0","./exit.js":"gLX02","./join.js":"8fs9B","./merge.js":"7HgEL","./order.js":"6wEFp","./sort.js":"3e5wq","./call.js":"eWZXT","./nodes.js":"3FICq","./node.js":"5be3K","./size.js":"5G9x2","./empty.js":"jVLCA","./each.js":"lTMsw","./attr.js":"dfsZu","./style.js":"jYjE6","./property.js":"Wswa0","./classed.js":"lhgaz","./text.js":"ghnBl","./html.js":"eza8C","./raise.js":"g2YDP","./lower.js":"55qNS","./append.js":"e09cy","./insert.js":"7jJuk","./remove.js":"6LuWV","./clone.js":"hhodd","./datum.js":"3NYcP","./on.js":"9s3pK","./dispatch.js":"5iUhR","./iterator.js":"9QGzs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8v90o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
exports.default = function(select) {
    if (typeof select !== "function") select = (0, _selectorJsDefault.default)(select);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
        }
    }
    return new (0, _indexJs.Selection)(subgroups, this._parents);
};

},{"./index.js":"dvcb8","../selector.js":"gqWxq","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gqWxq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function none() {}
exports.default = function(selector) {
    return selector == null ? none : function() {
        return this.querySelector(selector);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5um9f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _arrayJs = require("../array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _selectorAllJs = require("../selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
function arrayAll(select) {
    return function() {
        return (0, _arrayJsDefault.default)(select.apply(this, arguments));
    };
}
exports.default = function(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = (0, _selectorAllJsDefault.default)(select);
    for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
        }
    }
    return new (0, _indexJs.Selection)(subgroups, parents);
};

},{"./index.js":"dvcb8","../array.js":"iLve6","../selectorAll.js":"feKTn","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"iLve6":[function(require,module,exports) {
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}
exports.default = array;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"feKTn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function empty() {
    return [];
}
exports.default = function(selector) {
    return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6LCzc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _matcherJs = require("../matcher.js");
var find = Array.prototype.find;
function childFind(match) {
    return function() {
        return find.call(this.children, match);
    };
}
function childFirst() {
    return this.firstElementChild;
}
exports.default = function(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0, _matcherJs.childMatcher)(match)));
};

},{"../matcher.js":"33yNG","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"33yNG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "childMatcher", ()=>childMatcher);
exports.default = function(selector) {
    return function() {
        return this.matches(selector);
    };
};
function childMatcher(selector) {
    return function(node) {
        return node.matches(selector);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cx8Xh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _matcherJs = require("../matcher.js");
var filter = Array.prototype.filter;
function children() {
    return Array.from(this.children);
}
function childrenFilter(match) {
    return function() {
        return filter.call(this.children, match);
    };
}
exports.default = function(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0, _matcherJs.childMatcher)(match)));
};

},{"../matcher.js":"33yNG","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dhrDd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _matcherJs = require("../matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);
exports.default = function(match) {
    if (typeof match !== "function") match = (0, _matcherJsDefault.default)(match);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    }
    return new (0, _indexJs.Selection)(subgroups, this._parents);
};

},{"./index.js":"dvcb8","../matcher.js":"33yNG","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4lhGj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _enterJs = require("./enter.js");
var _constantJs = require("../constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for(; i < dataLength; ++i)if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
    } else enter[i] = new (0, _enterJs.EnterNode)(parent, data[i]);
    // Put any non-null nodes that don’t fit into exit.
    for(; i < groupLength; ++i)if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = new Map, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for(i = 0; i < groupLength; ++i)if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) exit[i] = node;
        else nodeByKeyValue.set(keyValue, node);
    }
    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for(i = 0; i < dataLength; ++i){
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
        } else enter[i] = new (0, _enterJs.EnterNode)(parent, data[i]);
    }
    // Add any remaining nodes that were not bound to data to exit.
    for(i = 0; i < groupLength; ++i)if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
    return node.__data__;
}
exports.default = function(value, key) {
    if (!arguments.length) return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function") value = (0, _constantJsDefault.default)(value);
    for(var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j){
        var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for(var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0)if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while(!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
        }
    }
    update = new (0, _indexJs.Selection)(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
};
// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
    return typeof data === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
     : Array.from(data); // Map, Set, iterable, string, or anything else
}

},{"./index.js":"dvcb8","./enter.js":"5BED0","../constant.js":"bdNRD","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5BED0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EnterNode", ()=>EnterNode);
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");
exports.default = function() {
    return new (0, _indexJs.Selection)(this._enter || this._groups.map((0, _sparseJsDefault.default)), this._parents);
};
function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
}
EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
        return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
    }
};

},{"./sparse.js":"9ql2J","./index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9ql2J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(update) {
    return new Array(update.length);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bdNRD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return function() {
        return x;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gLX02":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");
exports.default = function() {
    return new (0, _indexJs.Selection)(this._exit || this._groups.map((0, _sparseJsDefault.default)), this._parents);
};

},{"./sparse.js":"9ql2J","./index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8fs9B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
    } else enter = enter.append(onenter + "");
    if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
    }
    if (onexit == null) exit.remove();
    else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7HgEL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
exports.default = function(context) {
    var selection = context.selection ? context.selection() : context;
    for(var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
        for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
    }
    for(; j < m0; ++j)merges[j] = groups0[j];
    return new (0, _indexJs.Selection)(merges, this._parents);
};

},{"./index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6wEFp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    for(var groups = this._groups, j = -1, m = groups.length; ++j < m;){
        for(var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;)if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
        }
    }
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3e5wq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
exports.default = function(compare) {
    if (!compare) compare = ascending;
    function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }
    for(var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group[i]) sortgroup[i] = node;
        sortgroup.sort(compareNode);
    }
    return new (0, _indexJs.Selection)(sortgroups, this._parents).order();
};
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"./index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eWZXT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3FICq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    return Array.from(this);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5be3K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j)for(var group = groups[j], i = 0, n = group.length; i < n; ++i){
        var node = group[i];
        if (node) return node;
    }
    return null;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5G9x2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    let size = 0;
    for (const node of this)++size; // eslint-disable-line no-unused-vars
    return size;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"jVLCA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {
    return !this.node();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"lTMsw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(callback) {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dfsZu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _namespaceJs = require("../namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
function attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function attrConstant(name, value) {
    return function() {
        this.setAttribute(name, value);
    };
}
function attrConstantNS(fullname, value) {
    return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
    };
}
function attrFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
    };
}
function attrFunctionNS(fullname, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
    };
}
exports.default = function(name, value) {
    var fullname = (0, _namespaceJsDefault.default)(name);
    if (arguments.length < 2) {
        var node = this.node();
        return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
};

},{"../namespace.js":"aYL8Z","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"jYjE6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "styleValue", ()=>styleValue);
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
function styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function styleConstant(name, value, priority) {
    return function() {
        this.style.setProperty(name, value, priority);
    };
}
function styleFunction(name, value, priority) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    };
}
exports.default = function(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
};
function styleValue(node, name) {
    return node.style.getPropertyValue(name) || (0, _windowJsDefault.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}

},{"../window.js":"ekrRb","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ekrRb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(node) {
    return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
     || node.document && node // node is a Window
     || node.defaultView; // node is a Document
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"Wswa0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function propertyRemove(name) {
    return function() {
        delete this[name];
    };
}
function propertyConstant(name, value) {
    return function() {
        this[name] = value;
    };
}
function propertyFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
    };
}
exports.default = function(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"lhgaz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function classArray(string) {
    return string.trim().split(/^|\s+/);
}
function classList(node) {
    return node.classList || new ClassList(node);
}
function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
    add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
            this._names.push(name);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
            this._names.splice(i, 1);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    contains: function(name) {
        return this._names.indexOf(name) >= 0;
    }
};
function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.add(names[i]);
}
function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.remove(names[i]);
}
function classedTrue(names) {
    return function() {
        classedAdd(this, names);
    };
}
function classedFalse(names) {
    return function() {
        classedRemove(this, names);
    };
}
function classedFunction(names, value) {
    return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
}
exports.default = function(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while(++i < n)if (!list.contains(names[i])) return false;
        return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ghnBl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function textRemove() {
    this.textContent = "";
}
function textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function textFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
    };
}
exports.default = function(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eza8C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function htmlRemove() {
    this.innerHTML = "";
}
function htmlConstant(value) {
    return function() {
        this.innerHTML = value;
    };
}
function htmlFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
    };
}
exports.default = function(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"g2YDP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}
exports.default = function() {
    return this.each(raise);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"55qNS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
exports.default = function() {
    return this.each(lower);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"e09cy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
exports.default = function(name) {
    var create = typeof name === "function" ? name : (0, _creatorJsDefault.default)(name);
    return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
    });
};

},{"../creator.js":"6qJeN","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7jJuk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
function constantNull() {
    return null;
}
exports.default = function(name, before) {
    var create = typeof name === "function" ? name : (0, _creatorJsDefault.default)(name), select = before == null ? constantNull : typeof before === "function" ? before : (0, _selectorJsDefault.default)(before);
    return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
};

},{"../creator.js":"6qJeN","../selector.js":"gqWxq","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6LuWV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}
exports.default = function() {
    return this.each(remove);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hhodd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
exports.default = function(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3NYcP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9s3pK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function contextListener(listener) {
    return function(event) {
        listener.call(this, event, this.__data__);
    };
}
function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {
            type: t,
            name: name
        };
    });
}
function onRemove(typename) {
    return function() {
        var on = this.__on;
        if (!on) return;
        for(var j = 0, i = -1, m = on.length, o; j < m; ++j)if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
        else on[++i] = o;
        if (++i) on.length = i;
        else delete this.__on;
    };
}
function onAdd(typename, value, options) {
    return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) {
            for(var j = 0, m = on.length; j < m; ++j)if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.options);
                this.addEventListener(o.type, o.listener = listener, o.options = options);
                o.value = value;
                return;
            }
        }
        this.addEventListener(typename.type, listener, options);
        o = {
            type: typename.type,
            name: typename.name,
            value: value,
            listener: listener,
            options: options
        };
        if (!on) this.__on = [
            o
        ];
        else on.push(o);
    };
}
exports.default = function(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for(var j = 0, m = on.length, o; j < m; ++j)for(i = 0, o = on[j]; i < n; ++i){
            if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
        }
        return;
    }
    on = value ? onAdd : onRemove;
    for(i = 0; i < n; ++i)this.each(on(typenames[i], value, options));
    return this;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5iUhR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
function dispatchEvent(node, type, params) {
    var window = (0, _windowJsDefault.default)(node), event = window.CustomEvent;
    if (typeof event === "function") event = new event(type, params);
    else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
    return function() {
        return dispatchEvent(this, type, params);
    };
}
function dispatchFunction(type, params) {
    return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
    };
}
exports.default = function(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
};

},{"../window.js":"ekrRb","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9QGzs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function*() {
    for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
        for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) yield node;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7ox6C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var nextId = 0;
function local() {
    return new Local;
}
exports.default = local;
function Local() {
    this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
    constructor: Local,
    get: function(node) {
        var id = this._;
        while(!(id in node))if (!(node = node.parentNode)) return;
        return node[id];
    },
    set: function(node, value) {
        return node[this._] = value;
    },
    remove: function(node) {
        return this._ in node && delete node[this._];
    },
    toString: function() {
        return this._;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"44Bj8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _sourceEventJs = require("./sourceEvent.js");
var _sourceEventJsDefault = parcelHelpers.interopDefault(_sourceEventJs);
exports.default = function(event, node) {
    event = (0, _sourceEventJsDefault.default)(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
        var svg = node.ownerSVGElement || node;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform(node.getScreenCTM().inverse());
            return [
                point.x,
                point.y
            ];
        }
        if (node.getBoundingClientRect) {
            var rect = node.getBoundingClientRect();
            return [
                event.clientX - rect.left - node.clientLeft,
                event.clientY - rect.top - node.clientTop
            ];
        }
    }
    return [
        event.pageX,
        event.pageY
    ];
};

},{"./sourceEvent.js":"2sjV3","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"2sjV3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(event) {
    let sourceEvent;
    while(sourceEvent = event.sourceEvent)event = sourceEvent;
    return event;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gdt8u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _pointerJs = require("./pointer.js");
var _pointerJsDefault = parcelHelpers.interopDefault(_pointerJs);
var _sourceEventJs = require("./sourceEvent.js");
var _sourceEventJsDefault = parcelHelpers.interopDefault(_sourceEventJs);
exports.default = function(events, node) {
    if (events.target) {
        events = (0, _sourceEventJsDefault.default)(events);
        if (node === undefined) node = events.currentTarget;
        events = events.touches || [
            events
        ];
    }
    return Array.from(events, (event)=>(0, _pointerJsDefault.default)(event, node));
};

},{"./pointer.js":"44Bj8","./sourceEvent.js":"2sjV3","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bsp3d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _indexJs = require("./selection/index.js");
exports.default = function(selector) {
    return typeof selector === "string" ? new (0, _indexJs.Selection)([
        document.querySelectorAll(selector)
    ], [
        document.documentElement
    ]) : new (0, _indexJs.Selection)([
        (0, _arrayJsDefault.default)(selector)
    ], (0, _indexJs.root));
};

},{"./array.js":"iLve6","./selection/index.js":"dvcb8","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"diZln":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolate", ()=>(0, _valueJsDefault.default));
parcelHelpers.export(exports, "interpolateArray", ()=>(0, _arrayJsDefault.default));
parcelHelpers.export(exports, "interpolateBasis", ()=>(0, _basisJsDefault.default));
parcelHelpers.export(exports, "interpolateBasisClosed", ()=>(0, _basisClosedJsDefault.default));
parcelHelpers.export(exports, "interpolateDate", ()=>(0, _dateJsDefault.default));
parcelHelpers.export(exports, "interpolateDiscrete", ()=>(0, _discreteJsDefault.default));
parcelHelpers.export(exports, "interpolateHue", ()=>(0, _hueJsDefault.default));
parcelHelpers.export(exports, "interpolateNumber", ()=>(0, _numberJsDefault.default));
parcelHelpers.export(exports, "interpolateNumberArray", ()=>(0, _numberArrayJsDefault.default));
parcelHelpers.export(exports, "interpolateObject", ()=>(0, _objectJsDefault.default));
parcelHelpers.export(exports, "interpolateRound", ()=>(0, _roundJsDefault.default));
parcelHelpers.export(exports, "interpolateString", ()=>(0, _stringJsDefault.default));
parcelHelpers.export(exports, "interpolateTransformCss", ()=>(0, _indexJs.interpolateTransformCss));
parcelHelpers.export(exports, "interpolateTransformSvg", ()=>(0, _indexJs.interpolateTransformSvg));
parcelHelpers.export(exports, "interpolateZoom", ()=>(0, _zoomJsDefault.default));
parcelHelpers.export(exports, "interpolateRgb", ()=>(0, _rgbJsDefault.default));
parcelHelpers.export(exports, "interpolateRgbBasis", ()=>(0, _rgbJs.rgbBasis));
parcelHelpers.export(exports, "interpolateRgbBasisClosed", ()=>(0, _rgbJs.rgbBasisClosed));
parcelHelpers.export(exports, "interpolateHsl", ()=>(0, _hslJsDefault.default));
parcelHelpers.export(exports, "interpolateHslLong", ()=>(0, _hslJs.hslLong));
parcelHelpers.export(exports, "interpolateLab", ()=>(0, _labJsDefault.default));
parcelHelpers.export(exports, "interpolateHcl", ()=>(0, _hclJsDefault.default));
parcelHelpers.export(exports, "interpolateHclLong", ()=>(0, _hclJs.hclLong));
parcelHelpers.export(exports, "interpolateCubehelix", ()=>(0, _cubehelixJsDefault.default));
parcelHelpers.export(exports, "interpolateCubehelixLong", ()=>(0, _cubehelixJs.cubehelixLong));
parcelHelpers.export(exports, "piecewise", ()=>(0, _piecewiseJsDefault.default));
parcelHelpers.export(exports, "quantize", ()=>(0, _quantizeJsDefault.default));
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _discreteJs = require("./discrete.js");
var _discreteJsDefault = parcelHelpers.interopDefault(_discreteJs);
var _hueJs = require("./hue.js");
var _hueJsDefault = parcelHelpers.interopDefault(_hueJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _roundJs = require("./round.js");
var _roundJsDefault = parcelHelpers.interopDefault(_roundJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _indexJs = require("./transform/index.js");
var _zoomJs = require("./zoom.js");
var _zoomJsDefault = parcelHelpers.interopDefault(_zoomJs);
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _hslJs = require("./hsl.js");
var _hslJsDefault = parcelHelpers.interopDefault(_hslJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _hclJs = require("./hcl.js");
var _hclJsDefault = parcelHelpers.interopDefault(_hclJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);
var _piecewiseJs = require("./piecewise.js");
var _piecewiseJsDefault = parcelHelpers.interopDefault(_piecewiseJs);
var _quantizeJs = require("./quantize.js");
var _quantizeJsDefault = parcelHelpers.interopDefault(_quantizeJs);

},{"./value.js":"jpYZx","./array.js":"koqAQ","./basis.js":"1Ooet","./basisClosed.js":"M9QtQ","./date.js":"3XkSs","./discrete.js":"90PRQ","./hue.js":"1W0Wd","./number.js":"4QiRj","./numberArray.js":"dwfTF","./object.js":"lq06n","./round.js":"c40lf","./string.js":"kN3to","./transform/index.js":"cGkHl","./zoom.js":"5XIqn","./rgb.js":"1j4Fa","./hsl.js":"gU7Tl","./lab.js":"bvFxM","./hcl.js":"jSFXW","./cubehelix.js":"1QaVa","./piecewise.js":"uWsm7","./quantize.js":"2xARP","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"jpYZx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _arrayJs = require("./array.js");
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
exports.default = function(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? (0, _constantJsDefault.default)(b) : (t === "number" ? (0, _numberJsDefault.default) : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgbJsDefault.default) : (0, _stringJsDefault.default) : b instanceof (0, _d3Color.color) ? (0, _rgbJsDefault.default) : b instanceof Date ? (0, _dateJsDefault.default) : (0, _numberArrayJs.isNumberArray)(b) ? (0, _numberArrayJsDefault.default) : Array.isArray(b) ? (0, _arrayJs.genericArray) : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? (0, _objectJsDefault.default) : (0, _numberJsDefault.default))(a, b);
};

},{"d3-color":"gIpJt","./rgb.js":"1j4Fa","./array.js":"koqAQ","./date.js":"3XkSs","./number.js":"4QiRj","./object.js":"lq06n","./string.js":"kN3to","./constant.js":"k7aM6","./numberArray.js":"dwfTF","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gIpJt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "color", ()=>(0, _colorJsDefault.default));
parcelHelpers.export(exports, "rgb", ()=>(0, _colorJs.rgb));
parcelHelpers.export(exports, "hsl", ()=>(0, _colorJs.hsl));
parcelHelpers.export(exports, "lab", ()=>(0, _labJsDefault.default));
parcelHelpers.export(exports, "hcl", ()=>(0, _labJs.hcl));
parcelHelpers.export(exports, "lch", ()=>(0, _labJs.lch));
parcelHelpers.export(exports, "gray", ()=>(0, _labJs.gray));
parcelHelpers.export(exports, "cubehelix", ()=>(0, _cubehelixJsDefault.default));
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);

},{"./color.js":"d4pwH","./lab.js":"3DySO","./cubehelix.js":"hSyij","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"d4pwH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color);
parcelHelpers.export(exports, "darker", ()=>darker);
parcelHelpers.export(exports, "brighter", ()=>brighter);
parcelHelpers.export(exports, "rgbConvert", ()=>rgbConvert);
parcelHelpers.export(exports, "rgb", ()=>rgb);
parcelHelpers.export(exports, "Rgb", ()=>Rgb);
parcelHelpers.export(exports, "hslConvert", ()=>hslConvert);
parcelHelpers.export(exports, "hsl", ()=>hsl);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
function Color() {}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
};
(0, _defineJsDefault.default)(Color, color, {
    copy (channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable () {
        return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
});
function color_formatHex() {
    return this.rgb().formatHex();
}
function color_formatHex8() {
    return this.rgb().formatHex8();
}
function color_formatHsl() {
    return hslConvert(this).formatHsl();
}
function color_formatRgb() {
    return this.rgb().formatRgb();
}
function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
     : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
     : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
     : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
     : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
exports.default = color;
function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Rgb, rgb, (0, _defineJs.extend)(Color, {
    brighter (k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker (k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb () {
        return this;
    },
    clamp () {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable () {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
}));
function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
}
function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Hsl, hsl, (0, _defineJs.extend)(Color, {
    brighter (k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker (k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb () {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    clamp () {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable () {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl () {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
    }
}));
function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
}
function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
}
/* From FvD 13.37, CSS Color Module Level 3 */ function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

},{"./define.js":"ek9pA","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ek9pA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "extend", ()=>extend);
exports.default = function(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
};
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3DySO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "gray", ()=>gray);
parcelHelpers.export(exports, "Lab", ()=>Lab);
parcelHelpers.export(exports, "lch", ()=>lch);
parcelHelpers.export(exports, "hcl", ()=>hcl);
parcelHelpers.export(exports, "Hcl", ()=>Hcl);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
var _colorJs = require("./color.js");
var _mathJs = require("./math.js");
// https://observablehq.com/@mbostock/lab-and-rgb
const K = 18, Xn = 0.96422, Yn = 1, Zn = 0.82521, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1;
function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl) return hcl2lab(o);
    if (!(o instanceof (0, _colorJs.Rgb))) o = (0, _colorJs.rgbConvert)(o);
    var r = rgb2lrgb(o.r), g = rgb2lrgb(o.g), b = rgb2lrgb(o.b), y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
    if (r === g && g === b) x = z = y;
    else {
        x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
        z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}
function gray(l, opacity) {
    return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}
function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}
exports.default = lab;
function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Lab, lab, (0, _defineJs.extend)((0, _colorJs.Color), {
    brighter (k) {
        return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker (k) {
        return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb () {
        var y = (this.l + 16) / 116, x = isNaN(this.a) ? y : y + this.a / 500, z = isNaN(this.b) ? y : y - this.b / 200;
        x = Xn * lab2xyz(x);
        y = Yn * lab2xyz(y);
        z = Zn * lab2xyz(z);
        return new (0, _colorJs.Rgb)(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
}));
function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
}
function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * (0, _mathJs.degrees);
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}
function lch(l, c, h, opacity) {
    return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}
function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
}
function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
    var h = o.h * (0, _mathJs.radians);
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}
(0, _defineJsDefault.default)(Hcl, hcl, (0, _defineJs.extend)((0, _colorJs.Color), {
    brighter (k) {
        return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker (k) {
        return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb () {
        return hcl2lab(this).rgb();
    }
}));

},{"./define.js":"ek9pA","./color.js":"d4pwH","./math.js":"7bhOe","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7bhOe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "radians", ()=>radians);
parcelHelpers.export(exports, "degrees", ()=>degrees);
const radians = Math.PI / 180;
const degrees = 180 / Math.PI;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hSyij":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Cubehelix", ()=>Cubehelix);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
var _colorJs = require("./color.js");
var _mathJs = require("./math.js");
var A = -0.14861, B = 1.78277, C = -0.29227, D = -0.90649, E = 1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof (0, _colorJs.Rgb))) o = (0, _colorJs.rgbConvert)(o);
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), h = s ? Math.atan2(k, bl) * (0, _mathJs.degrees) - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
exports.default = cubehelix;
function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Cubehelix, cubehelix, (0, _defineJs.extend)((0, _colorJs.Color), {
    brighter (k) {
        k = k == null ? (0, _colorJs.brighter) : Math.pow((0, _colorJs.brighter), k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker (k) {
        k = k == null ? (0, _colorJs.darker) : Math.pow((0, _colorJs.darker), k);
        return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb () {
        var h = isNaN(this.h) ? 0 : (this.h + 120) * (0, _mathJs.radians), l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
        return new (0, _colorJs.Rgb)(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
}));

},{"./define.js":"ek9pA","./color.js":"d4pwH","./math.js":"7bhOe","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1j4Fa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rgbBasis", ()=>rgbBasis);
parcelHelpers.export(exports, "rgbBasisClosed", ()=>rgbBasisClosed);
var _d3Color = require("d3-color");
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
exports.default = function rgbGamma(y) {
    var color = (0, _colorJs.gamma)(y);
    function rgb(start, end) {
        var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
        return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
        };
    }
    rgb.gamma = rgbGamma;
    return rgb;
}(1);
function rgbSpline(spline) {
    return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for(i = 0; i < n; ++i){
            color = (0, _d3Color.rgb)(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
            color.r = r(t);
            color.g = g(t);
            color.b = b(t);
            return color + "";
        };
    };
}
var rgbBasis = rgbSpline((0, _basisJsDefault.default));
var rgbBasisClosed = rgbSpline((0, _basisClosedJsDefault.default));

},{"d3-color":"gIpJt","./basis.js":"1Ooet","./basisClosed.js":"M9QtQ","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1Ooet":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "basis", ()=>basis);
function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
exports.default = function(values) {
    var n = values.length - 1;
    return function(t) {
        var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
        return basis((t - i / n) * n, v0, v1, v2, v3);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"M9QtQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basisJs = require("./basis.js");
exports.default = function(values) {
    var n = values.length;
    return function(t) {
        var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
        return (0, _basisJs.basis)((t - i / n) * n, v0, v1, v2, v3);
    };
};

},{"./basis.js":"1Ooet","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"frXEc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hue", ()=>hue);
parcelHelpers.export(exports, "gamma", ()=>gamma);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function linear(a, d) {
    return function(t) {
        return a + t * d;
    };
}
function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
    };
}
function hue(a, b) {
    var d = b - a;
    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
}
function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
    };
}
function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
}
exports.default = nogamma;

},{"./constant.js":"k7aM6","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"k7aM6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = (x)=>()=>x;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"koqAQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "genericArray", ()=>genericArray);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
exports.default = function(a, b) {
    return ((0, _numberArrayJs.isNumberArray)(b) ? (0, _numberArrayJsDefault.default) : genericArray)(a, b);
};
function genericArray(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
    for(i = 0; i < na; ++i)x[i] = (0, _valueJsDefault.default)(a[i], b[i]);
    for(; i < nb; ++i)c[i] = b[i];
    return function(t) {
        for(i = 0; i < na; ++i)c[i] = x[i](t);
        return c;
    };
}

},{"./value.js":"jpYZx","./numberArray.js":"dwfTF","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dwfTF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isNumberArray", ()=>isNumberArray);
exports.default = function(a, b) {
    if (!b) b = [];
    var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
    return function(t) {
        for(i = 0; i < n; ++i)c[i] = a[i] * (1 - t) + b[i] * t;
        return c;
    };
};
function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3XkSs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    var d = new Date;
    return a = +a, b = +b, function(t) {
        return d.setTime(a * (1 - t) + b * t), d;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4QiRj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"lq06n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
exports.default = function(a, b) {
    var i = {}, c = {}, k;
    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};
    for(k in b)if (k in a) i[k] = (0, _valueJsDefault.default)(a[k], b[k]);
    else c[k] = b[k];
    return function(t) {
        for(k in i)c[k] = i[k](t);
        return c;
    };
};

},{"./value.js":"jpYZx","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"kN3to":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
    return function() {
        return b;
    };
}
function one(b) {
    return function(t) {
        return b(t) + "";
    };
}
exports.default = function(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = []; // number interpolators
    // Coerce inputs to strings.
    a = a + "", b = b + "";
    // Interpolate pairs of numbers in a & b.
    while((am = reA.exec(a)) && (bm = reB.exec(b))){
        if ((bs = bm.index) > bi) {
            bs = b.slice(bi, bs);
            if (s[i]) s[i] += bs; // coalesce with previous string
            else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) {
            if (s[i]) s[i] += bm; // coalesce with previous string
            else s[++i] = bm;
        } else {
            s[++i] = null;
            q.push({
                i: i,
                x: (0, _numberJsDefault.default)(am, bm)
            });
        }
        bi = reB.lastIndex;
    }
    // Add remains of b.
    if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
    }
    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
        for(var i = 0, o; i < b; ++i)s[(o = q[i]).i] = o.x(t);
        return s.join("");
    });
};

},{"./number.js":"4QiRj","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"90PRQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(range) {
    var n = range.length;
    return function(t) {
        return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1W0Wd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _colorJs = require("./color.js");
exports.default = function(a, b) {
    var i = (0, _colorJs.hue)(+a, +b);
    return function(t) {
        var x = i(t);
        return x - 360 * Math.floor(x / 360);
    };
};

},{"./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"c40lf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    return a = +a, b = +b, function(t) {
        return Math.round(a * (1 - t) + b * t);
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cGkHl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolateTransformCss", ()=>interpolateTransformCss);
parcelHelpers.export(exports, "interpolateTransformSvg", ()=>interpolateTransformSvg);
var _numberJs = require("../number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _parseJs = require("./parse.js");
function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
        return s.length ? s.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push("translate(", null, pxComma, null, pxParen);
            q.push({
                i: i - 4,
                x: (0, _numberJsDefault.default)(xa, xb)
            }, {
                i: i - 2,
                x: (0, _numberJsDefault.default)(ya, yb)
            });
        } else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
    }
    function rotate(a, b, s, q) {
        if (a !== b) {
            if (a - b > 180) b += 360;
            else if (b - a > 180) a += 360; // shortest path
            q.push({
                i: s.push(pop(s) + "rotate(", null, degParen) - 2,
                x: (0, _numberJsDefault.default)(a, b)
            });
        } else if (b) s.push(pop(s) + "rotate(" + b + degParen);
    }
    function skewX(a, b, s, q) {
        if (a !== b) q.push({
            i: s.push(pop(s) + "skewX(", null, degParen) - 2,
            x: (0, _numberJsDefault.default)(a, b)
        });
        else if (b) s.push(pop(s) + "skewX(" + b + degParen);
    }
    function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push(pop(s) + "scale(", null, ",", null, ")");
            q.push({
                i: i - 4,
                x: (0, _numberJsDefault.default)(xa, xb)
            }, {
                i: i - 2,
                x: (0, _numberJsDefault.default)(ya, yb)
            });
        } else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
    return function(a, b) {
        var s = [], q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
            var i = -1, n = q.length, o;
            while(++i < n)s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
}
var interpolateTransformCss = interpolateTransform((0, _parseJs.parseCss), "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform((0, _parseJs.parseSvg), ", ", ")", ")");

},{"../number.js":"4QiRj","./parse.js":"1EGbo","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1EGbo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/* eslint-disable no-undef */ parcelHelpers.export(exports, "parseCss", ()=>parseCss);
parcelHelpers.export(exports, "parseSvg", ()=>parseSvg);
var _decomposeJs = require("./decompose.js");
var _decomposeJsDefault = parcelHelpers.interopDefault(_decomposeJs);
var svgNode;
function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? (0, _decomposeJs.identity) : (0, _decomposeJsDefault.default)(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
    if (value == null) return 0, _decomposeJs.identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return 0, _decomposeJs.identity;
    value = value.matrix;
    return (0, _decomposeJsDefault.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}

},{"./decompose.js":"57jik","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"57jik":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "identity", ()=>identity);
var degrees = 180 / Math.PI;
var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
};
exports.default = function(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5XIqn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var epsilon2 = 1e-12;
function cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
}
function sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
}
function tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}
exports.default = function zoomRho(rho, rho2, rho4) {
    // p0 = [ux0, uy0, w0]
    // p1 = [ux1, uy1, w1]
    function zoom(p0, p1) {
        var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
        // Special case for u0 ≅ u1.
        if (d2 < epsilon2) {
            S = Math.log(w1 / w0) / rho;
            i = function(t) {
                return [
                    ux0 + t * dx,
                    uy0 + t * dy,
                    w0 * Math.exp(rho * t * S)
                ];
            };
        } else {
            var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
            S = (r1 - r0) / rho;
            i = function(t) {
                var s = t * S, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
                return [
                    ux0 + u * dx,
                    uy0 + u * dy,
                    w0 * coshr0 / cosh(rho * s + r0)
                ];
            };
        }
        i.duration = S * 1000 * rho / Math.SQRT2;
        return i;
    }
    zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
    };
    return zoom;
}(Math.SQRT2, 2, 4);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gU7Tl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hslLong", ()=>hslLong);
var _d3Color = require("d3-color");
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
function hsl(hue) {
    return function(start, end) {
        var h = hue((start = (0, _d3Color.hsl)(start)).h, (end = (0, _d3Color.hsl)(end)).h), s = (0, _colorJsDefault.default)(start.s, end.s), l = (0, _colorJsDefault.default)(start.l, end.l), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
        return function(t) {
            start.h = h(t);
            start.s = s(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
        };
    };
}
exports.default = hsl((0, _colorJs.hue));
var hslLong = hsl((0, _colorJsDefault.default));

},{"d3-color":"gIpJt","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bvFxM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
function lab(start, end) {
    var l = (0, _colorJsDefault.default)((start = (0, _d3Color.lab)(start)).l, (end = (0, _d3Color.lab)(end)).l), a = (0, _colorJsDefault.default)(start.a, end.a), b = (0, _colorJsDefault.default)(start.b, end.b), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
    return function(t) {
        start.l = l(t);
        start.a = a(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
    };
}
exports.default = lab;

},{"d3-color":"gIpJt","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"jSFXW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hclLong", ()=>hclLong);
var _d3Color = require("d3-color");
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
function hcl(hue) {
    return function(start, end) {
        var h = hue((start = (0, _d3Color.hcl)(start)).h, (end = (0, _d3Color.hcl)(end)).h), c = (0, _colorJsDefault.default)(start.c, end.c), l = (0, _colorJsDefault.default)(start.l, end.l), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
        return function(t) {
            start.h = h(t);
            start.c = c(t);
            start.l = l(t);
            start.opacity = opacity(t);
            return start + "";
        };
    };
}
exports.default = hcl((0, _colorJs.hue));
var hclLong = hcl((0, _colorJsDefault.default));

},{"d3-color":"gIpJt","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1QaVa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cubehelixLong", ()=>cubehelixLong);
var _d3Color = require("d3-color");
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
function cubehelix(hue) {
    return function cubehelixGamma(y) {
        y = +y;
        function cubehelix(start, end) {
            var h = hue((start = (0, _d3Color.cubehelix)(start)).h, (end = (0, _d3Color.cubehelix)(end)).h), s = (0, _colorJsDefault.default)(start.s, end.s), l = (0, _colorJsDefault.default)(start.l, end.l), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
            return function(t) {
                start.h = h(t);
                start.s = s(t);
                start.l = l(Math.pow(t, y));
                start.opacity = opacity(t);
                return start + "";
            };
        }
        cubehelix.gamma = cubehelixGamma;
        return cubehelix;
    }(1);
}
exports.default = cubehelix((0, _colorJs.hue));
var cubehelixLong = cubehelix((0, _colorJsDefault.default));

},{"d3-color":"gIpJt","./color.js":"frXEc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"uWsm7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
function piecewise(interpolate, values) {
    if (values === undefined) values = interpolate, interpolate = (0, _valueJsDefault.default);
    var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
    while(i < n)I[i] = interpolate(v, v = values[++i]);
    return function(t) {
        var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
        return I[i](t - i);
    };
}
exports.default = piecewise;

},{"./value.js":"jpYZx","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"2xARP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(interpolator, n) {
    var samples = new Array(n);
    for(var i = 0; i < n; ++i)samples[i] = interpolator(i / (n - 1));
    return samples;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"fVWdL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "arc", ()=>(0, _arcJsDefault.default));
parcelHelpers.export(exports, "area", ()=>(0, _areaJsDefault.default));
parcelHelpers.export(exports, "line", ()=>(0, _lineJsDefault.default));
parcelHelpers.export(exports, "pie", ()=>(0, _pieJsDefault.default));
parcelHelpers.export(exports, "areaRadial", ()=>(0, _areaRadialJsDefault.default)) // Note: radialArea is deprecated!
;
parcelHelpers.export(exports, "radialArea", ()=>(0, _areaRadialJsDefault.default));
parcelHelpers.export(exports, "lineRadial", ()=>(0, _lineRadialJsDefault.default)) // Note: radialLine is deprecated!
;
parcelHelpers.export(exports, "radialLine", ()=>(0, _lineRadialJsDefault.default));
parcelHelpers.export(exports, "pointRadial", ()=>(0, _pointRadialJsDefault.default));
parcelHelpers.export(exports, "link", ()=>(0, _linkJs.link));
parcelHelpers.export(exports, "linkHorizontal", ()=>(0, _linkJs.linkHorizontal));
parcelHelpers.export(exports, "linkVertical", ()=>(0, _linkJs.linkVertical));
parcelHelpers.export(exports, "linkRadial", ()=>(0, _linkJs.linkRadial));
parcelHelpers.export(exports, "symbol", ()=>(0, _symbolJsDefault.default));
parcelHelpers.export(exports, "symbolsStroke", ()=>(0, _symbolJs.symbolsStroke));
parcelHelpers.export(exports, "symbolsFill", ()=>(0, _symbolJs.symbolsFill));
parcelHelpers.export(exports, "symbols", ()=>(0, _symbolJs.symbolsFill));
parcelHelpers.export(exports, "symbolAsterisk", ()=>(0, _asteriskJsDefault.default));
parcelHelpers.export(exports, "symbolCircle", ()=>(0, _circleJsDefault.default));
parcelHelpers.export(exports, "symbolCross", ()=>(0, _crossJsDefault.default));
parcelHelpers.export(exports, "symbolDiamond", ()=>(0, _diamondJsDefault.default));
parcelHelpers.export(exports, "symbolDiamond2", ()=>(0, _diamond2JsDefault.default));
parcelHelpers.export(exports, "symbolPlus", ()=>(0, _plusJsDefault.default));
parcelHelpers.export(exports, "symbolSquare", ()=>(0, _squareJsDefault.default));
parcelHelpers.export(exports, "symbolSquare2", ()=>(0, _square2JsDefault.default));
parcelHelpers.export(exports, "symbolStar", ()=>(0, _starJsDefault.default));
parcelHelpers.export(exports, "symbolTriangle", ()=>(0, _triangleJsDefault.default));
parcelHelpers.export(exports, "symbolTriangle2", ()=>(0, _triangle2JsDefault.default));
parcelHelpers.export(exports, "symbolWye", ()=>(0, _wyeJsDefault.default));
parcelHelpers.export(exports, "symbolTimes", ()=>(0, _timesJsDefault.default));
parcelHelpers.export(exports, "symbolX", ()=>(0, _timesJsDefault.default));
parcelHelpers.export(exports, "curveBasisClosed", ()=>(0, _basisClosedJsDefault.default));
parcelHelpers.export(exports, "curveBasisOpen", ()=>(0, _basisOpenJsDefault.default));
parcelHelpers.export(exports, "curveBasis", ()=>(0, _basisJsDefault.default));
parcelHelpers.export(exports, "curveBumpX", ()=>(0, _bumpJs.bumpX));
parcelHelpers.export(exports, "curveBumpY", ()=>(0, _bumpJs.bumpY));
parcelHelpers.export(exports, "curveBundle", ()=>(0, _bundleJsDefault.default));
parcelHelpers.export(exports, "curveCardinalClosed", ()=>(0, _cardinalClosedJsDefault.default));
parcelHelpers.export(exports, "curveCardinalOpen", ()=>(0, _cardinalOpenJsDefault.default));
parcelHelpers.export(exports, "curveCardinal", ()=>(0, _cardinalJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRomClosed", ()=>(0, _catmullRomClosedJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRomOpen", ()=>(0, _catmullRomOpenJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRom", ()=>(0, _catmullRomJsDefault.default));
parcelHelpers.export(exports, "curveLinearClosed", ()=>(0, _linearClosedJsDefault.default));
parcelHelpers.export(exports, "curveLinear", ()=>(0, _linearJsDefault.default));
parcelHelpers.export(exports, "curveMonotoneX", ()=>(0, _monotoneJs.monotoneX));
parcelHelpers.export(exports, "curveMonotoneY", ()=>(0, _monotoneJs.monotoneY));
parcelHelpers.export(exports, "curveNatural", ()=>(0, _naturalJsDefault.default));
parcelHelpers.export(exports, "curveStep", ()=>(0, _stepJsDefault.default));
parcelHelpers.export(exports, "curveStepAfter", ()=>(0, _stepJs.stepAfter));
parcelHelpers.export(exports, "curveStepBefore", ()=>(0, _stepJs.stepBefore));
parcelHelpers.export(exports, "stack", ()=>(0, _stackJsDefault.default));
parcelHelpers.export(exports, "stackOffsetExpand", ()=>(0, _expandJsDefault.default));
parcelHelpers.export(exports, "stackOffsetDiverging", ()=>(0, _divergingJsDefault.default));
parcelHelpers.export(exports, "stackOffsetNone", ()=>(0, _noneJsDefault.default));
parcelHelpers.export(exports, "stackOffsetSilhouette", ()=>(0, _silhouetteJsDefault.default));
parcelHelpers.export(exports, "stackOffsetWiggle", ()=>(0, _wiggleJsDefault.default));
parcelHelpers.export(exports, "stackOrderAppearance", ()=>(0, _appearanceJsDefault.default));
parcelHelpers.export(exports, "stackOrderAscending", ()=>(0, _ascendingJsDefault.default));
parcelHelpers.export(exports, "stackOrderDescending", ()=>(0, _descendingJsDefault.default));
parcelHelpers.export(exports, "stackOrderInsideOut", ()=>(0, _insideOutJsDefault.default));
parcelHelpers.export(exports, "stackOrderNone", ()=>(0, _noneJsDefault1.default));
parcelHelpers.export(exports, "stackOrderReverse", ()=>(0, _reverseJsDefault.default));
var _arcJs = require("./arc.js");
var _arcJsDefault = parcelHelpers.interopDefault(_arcJs);
var _areaJs = require("./area.js");
var _areaJsDefault = parcelHelpers.interopDefault(_areaJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _pieJs = require("./pie.js");
var _pieJsDefault = parcelHelpers.interopDefault(_pieJs);
var _areaRadialJs = require("./areaRadial.js");
var _areaRadialJsDefault = parcelHelpers.interopDefault(_areaRadialJs);
var _lineRadialJs = require("./lineRadial.js");
var _lineRadialJsDefault = parcelHelpers.interopDefault(_lineRadialJs);
var _pointRadialJs = require("./pointRadial.js");
var _pointRadialJsDefault = parcelHelpers.interopDefault(_pointRadialJs);
var _linkJs = require("./link.js");
var _symbolJs = require("./symbol.js");
var _symbolJsDefault = parcelHelpers.interopDefault(_symbolJs);
var _asteriskJs = require("./symbol/asterisk.js");
var _asteriskJsDefault = parcelHelpers.interopDefault(_asteriskJs);
var _circleJs = require("./symbol/circle.js");
var _circleJsDefault = parcelHelpers.interopDefault(_circleJs);
var _crossJs = require("./symbol/cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _diamondJs = require("./symbol/diamond.js");
var _diamondJsDefault = parcelHelpers.interopDefault(_diamondJs);
var _diamond2Js = require("./symbol/diamond2.js");
var _diamond2JsDefault = parcelHelpers.interopDefault(_diamond2Js);
var _plusJs = require("./symbol/plus.js");
var _plusJsDefault = parcelHelpers.interopDefault(_plusJs);
var _squareJs = require("./symbol/square.js");
var _squareJsDefault = parcelHelpers.interopDefault(_squareJs);
var _square2Js = require("./symbol/square2.js");
var _square2JsDefault = parcelHelpers.interopDefault(_square2Js);
var _starJs = require("./symbol/star.js");
var _starJsDefault = parcelHelpers.interopDefault(_starJs);
var _triangleJs = require("./symbol/triangle.js");
var _triangleJsDefault = parcelHelpers.interopDefault(_triangleJs);
var _triangle2Js = require("./symbol/triangle2.js");
var _triangle2JsDefault = parcelHelpers.interopDefault(_triangle2Js);
var _wyeJs = require("./symbol/wye.js");
var _wyeJsDefault = parcelHelpers.interopDefault(_wyeJs);
var _timesJs = require("./symbol/times.js");
var _timesJsDefault = parcelHelpers.interopDefault(_timesJs);
var _basisClosedJs = require("./curve/basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _basisOpenJs = require("./curve/basisOpen.js");
var _basisOpenJsDefault = parcelHelpers.interopDefault(_basisOpenJs);
var _basisJs = require("./curve/basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _bumpJs = require("./curve/bump.js");
var _bundleJs = require("./curve/bundle.js");
var _bundleJsDefault = parcelHelpers.interopDefault(_bundleJs);
var _cardinalClosedJs = require("./curve/cardinalClosed.js");
var _cardinalClosedJsDefault = parcelHelpers.interopDefault(_cardinalClosedJs);
var _cardinalOpenJs = require("./curve/cardinalOpen.js");
var _cardinalOpenJsDefault = parcelHelpers.interopDefault(_cardinalOpenJs);
var _cardinalJs = require("./curve/cardinal.js");
var _cardinalJsDefault = parcelHelpers.interopDefault(_cardinalJs);
var _catmullRomClosedJs = require("./curve/catmullRomClosed.js");
var _catmullRomClosedJsDefault = parcelHelpers.interopDefault(_catmullRomClosedJs);
var _catmullRomOpenJs = require("./curve/catmullRomOpen.js");
var _catmullRomOpenJsDefault = parcelHelpers.interopDefault(_catmullRomOpenJs);
var _catmullRomJs = require("./curve/catmullRom.js");
var _catmullRomJsDefault = parcelHelpers.interopDefault(_catmullRomJs);
var _linearClosedJs = require("./curve/linearClosed.js");
var _linearClosedJsDefault = parcelHelpers.interopDefault(_linearClosedJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _monotoneJs = require("./curve/monotone.js");
var _naturalJs = require("./curve/natural.js");
var _naturalJsDefault = parcelHelpers.interopDefault(_naturalJs);
var _stepJs = require("./curve/step.js");
var _stepJsDefault = parcelHelpers.interopDefault(_stepJs);
var _stackJs = require("./stack.js");
var _stackJsDefault = parcelHelpers.interopDefault(_stackJs);
var _expandJs = require("./offset/expand.js");
var _expandJsDefault = parcelHelpers.interopDefault(_expandJs);
var _divergingJs = require("./offset/diverging.js");
var _divergingJsDefault = parcelHelpers.interopDefault(_divergingJs);
var _noneJs = require("./offset/none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
var _silhouetteJs = require("./offset/silhouette.js");
var _silhouetteJsDefault = parcelHelpers.interopDefault(_silhouetteJs);
var _wiggleJs = require("./offset/wiggle.js");
var _wiggleJsDefault = parcelHelpers.interopDefault(_wiggleJs);
var _appearanceJs = require("./order/appearance.js");
var _appearanceJsDefault = parcelHelpers.interopDefault(_appearanceJs);
var _ascendingJs = require("./order/ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _descendingJs = require("./order/descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _insideOutJs = require("./order/insideOut.js");
var _insideOutJsDefault = parcelHelpers.interopDefault(_insideOutJs);
var _noneJs1 = require("./order/none.js");
var _noneJsDefault1 = parcelHelpers.interopDefault(_noneJs1);
var _reverseJs = require("./order/reverse.js");
var _reverseJsDefault = parcelHelpers.interopDefault(_reverseJs);

},{"./arc.js":"dmjBU","./area.js":"bi8Y1","./line.js":"8mYFT","./pie.js":"eHRYs","./areaRadial.js":"J7m3f","./lineRadial.js":"gkllc","./pointRadial.js":"6HrNn","./link.js":"5jT6S","./symbol.js":"5meFA","./symbol/asterisk.js":"blJvM","./symbol/circle.js":"ddfCW","./symbol/cross.js":"iIczt","./symbol/diamond.js":"1JKTt","./symbol/diamond2.js":"1Fjr4","./symbol/plus.js":"8orgv","./symbol/square.js":"5u3Jo","./symbol/square2.js":"6mKGu","./symbol/star.js":"26zKs","./symbol/triangle.js":"7dBX4","./symbol/triangle2.js":"1c9Dp","./symbol/wye.js":"34Lcs","./symbol/times.js":"erzp4","./curve/basisClosed.js":"eDaxh","./curve/basisOpen.js":"eJOS0","./curve/basis.js":"hJGJU","./curve/bump.js":"4hr8v","./curve/bundle.js":"5mzp3","./curve/cardinalClosed.js":"74gyN","./curve/cardinalOpen.js":"bWomn","./curve/cardinal.js":"qsW2i","./curve/catmullRomClosed.js":"fWZcx","./curve/catmullRomOpen.js":"6UqB5","./curve/catmullRom.js":"kALtf","./curve/linearClosed.js":"eJzOb","./curve/linear.js":"alNSQ","./curve/monotone.js":"4xf0w","./curve/natural.js":"5vYnK","./curve/step.js":"kdbKB","./stack.js":"3J4qo","./offset/expand.js":"hCPeF","./offset/diverging.js":"8CQlP","./offset/none.js":"hOkdk","./offset/silhouette.js":"dh4Xg","./offset/wiggle.js":"eveGm","./order/appearance.js":"jTxCV","./order/ascending.js":"04VYH","./order/descending.js":"86wUo","./order/insideOut.js":"9P3vM","./order/none.js":"9HOAs","./order/reverse.js":"2qPx7","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dmjBU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _mathJs = require("./math.js");
var _pathJs = require("./path.js");
function arcInnerRadius(d) {
    return d.innerRadius;
}
function arcOuterRadius(d) {
    return d.outerRadius;
}
function arcStartAngle(d) {
    return d.startAngle;
}
function arcEndAngle(d) {
    return d.endAngle;
}
function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
    if (t * t < (0, _mathJs.epsilon)) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [
        x0 + t * x10,
        y0 + t * y10
    ];
}
// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / (0, _mathJs.sqrt)(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * (0, _mathJs.sqrt)((0, _mathJs.max)(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
    // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return {
        cx: cx0,
        cy: cy0,
        x01: -ox,
        y01: -oy,
        x11: cx0 * (r1 / r - 1),
        y11: cy0 * (r1 / r - 1)
    };
}
exports.default = function() {
    var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = (0, _constantJsDefault.default)(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null, path = (0, _pathJs.withPath)(arc);
    function arc() {
        var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - (0, _mathJs.halfPi), a1 = endAngle.apply(this, arguments) - (0, _mathJs.halfPi), da = (0, _mathJs.abs)(a1 - a0), cw = a1 > a0;
        if (!context) context = buffer = path();
        // Ensure that the outer radius is always larger than the inner radius.
        if (r1 < r0) r = r1, r1 = r0, r0 = r;
        // Is it a point?
        if (!(r1 > (0, _mathJs.epsilon))) context.moveTo(0, 0);
        else if (da > (0, _mathJs.tau) - (0, _mathJs.epsilon)) {
            context.moveTo(r1 * (0, _mathJs.cos)(a0), r1 * (0, _mathJs.sin)(a0));
            context.arc(0, 0, r1, a0, a1, !cw);
            if (r0 > (0, _mathJs.epsilon)) {
                context.moveTo(r0 * (0, _mathJs.cos)(a1), r0 * (0, _mathJs.sin)(a1));
                context.arc(0, 0, r0, a1, a0, cw);
            }
        } else {
            var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > (0, _mathJs.epsilon) && (padRadius ? +padRadius.apply(this, arguments) : (0, _mathJs.sqrt)(r0 * r0 + r1 * r1)), rc = (0, _mathJs.min)((0, _mathJs.abs)(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
            // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
            if (rp > (0, _mathJs.epsilon)) {
                var p0 = (0, _mathJs.asin)(rp / r0 * (0, _mathJs.sin)(ap)), p1 = (0, _mathJs.asin)(rp / r1 * (0, _mathJs.sin)(ap));
                if ((da0 -= p0 * 2) > (0, _mathJs.epsilon)) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
                else da0 = 0, a00 = a10 = (a0 + a1) / 2;
                if ((da1 -= p1 * 2) > (0, _mathJs.epsilon)) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
                else da1 = 0, a01 = a11 = (a0 + a1) / 2;
            }
            var x01 = r1 * (0, _mathJs.cos)(a01), y01 = r1 * (0, _mathJs.sin)(a01), x10 = r0 * (0, _mathJs.cos)(a10), y10 = r0 * (0, _mathJs.sin)(a10);
            // Apply rounded corners?
            if (rc > (0, _mathJs.epsilon)) {
                var x11 = r1 * (0, _mathJs.cos)(a11), y11 = r1 * (0, _mathJs.sin)(a11), x00 = r0 * (0, _mathJs.cos)(a00), y00 = r0 * (0, _mathJs.sin)(a00), oc;
                // Restrict the corner radius according to the sector angle. If this
                // intersection fails, it’s probably because the arc is too small, so
                // disable the corner radius entirely.
                if (da < (0, _mathJs.pi)) {
                    if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
                        var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / (0, _mathJs.sin)((0, _mathJs.acos)((ax * bx + ay * by) / ((0, _mathJs.sqrt)(ax * ax + ay * ay) * (0, _mathJs.sqrt)(bx * bx + by * by))) / 2), lc = (0, _mathJs.sqrt)(oc[0] * oc[0] + oc[1] * oc[1]);
                        rc0 = (0, _mathJs.min)(rc, (r0 - lc) / (kc - 1));
                        rc1 = (0, _mathJs.min)(rc, (r1 - lc) / (kc + 1));
                    } else rc0 = rc1 = 0;
                }
            }
            // Is the sector collapsed to a line?
            if (!(da1 > (0, _mathJs.epsilon))) context.moveTo(x01, y01);
            else if (rc1 > (0, _mathJs.epsilon)) {
                t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
                t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
                context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
                // Have the corners merged?
                if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                else {
                    context.arc(t0.cx, t0.cy, rc1, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t0.y11, t0.x11), !cw);
                    context.arc(0, 0, r1, (0, _mathJs.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _mathJs.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                    context.arc(t1.cx, t1.cy, rc1, (0, _mathJs.atan2)(t1.y11, t1.x11), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                }
            } else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
            // Is there no inner ring, and it’s a circular sector?
            // Or perhaps it’s an annular sector collapsed due to padding?
            if (!(r0 > (0, _mathJs.epsilon)) || !(da0 > (0, _mathJs.epsilon))) context.lineTo(x10, y10);
            else if (rc0 > (0, _mathJs.epsilon)) {
                t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
                t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
                context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
                // Have the corners merged?
                if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                else {
                    context.arc(t0.cx, t0.cy, rc0, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t0.y11, t0.x11), !cw);
                    context.arc(0, 0, r0, (0, _mathJs.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _mathJs.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                    context.arc(t1.cx, t1.cy, rc0, (0, _mathJs.atan2)(t1.y11, t1.x11), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                }
            } else context.arc(0, 0, r0, a10, a00, cw);
        }
        context.closePath();
        if (buffer) return context = null, buffer + "" || null;
    }
    arc.centroid = function() {
        var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - (0, _mathJs.pi) / 2;
        return [
            (0, _mathJs.cos)(a) * r,
            (0, _mathJs.sin)(a) * r
        ];
    };
    arc.innerRadius = function(_) {
        return arguments.length ? (innerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : innerRadius;
    };
    arc.outerRadius = function(_) {
        return arguments.length ? (outerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : outerRadius;
    };
    arc.cornerRadius = function(_) {
        return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : cornerRadius;
    };
    arc.padRadius = function(_) {
        return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : padRadius;
    };
    arc.startAngle = function(_) {
        return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : startAngle;
    };
    arc.endAngle = function(_) {
        return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : endAngle;
    };
    arc.padAngle = function(_) {
        return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : padAngle;
    };
    arc.context = function(_) {
        return arguments.length ? (context = _ == null ? null : _, arc) : context;
    };
    return arc;
};

},{"./constant.js":"7BfAk","./math.js":"7jH6R","./path.js":"dqTRs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7BfAk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x) {
    return function constant() {
        return x;
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7jH6R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "abs", ()=>abs);
parcelHelpers.export(exports, "atan2", ()=>atan2);
parcelHelpers.export(exports, "cos", ()=>cos);
parcelHelpers.export(exports, "max", ()=>max);
parcelHelpers.export(exports, "min", ()=>min);
parcelHelpers.export(exports, "sin", ()=>sin);
parcelHelpers.export(exports, "sqrt", ()=>sqrt);
parcelHelpers.export(exports, "epsilon", ()=>epsilon);
parcelHelpers.export(exports, "pi", ()=>pi);
parcelHelpers.export(exports, "halfPi", ()=>halfPi);
parcelHelpers.export(exports, "tau", ()=>tau);
parcelHelpers.export(exports, "acos", ()=>acos);
parcelHelpers.export(exports, "asin", ()=>asin);
const abs = Math.abs;
const atan2 = Math.atan2;
const cos = Math.cos;
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const sqrt = Math.sqrt;
const epsilon = 1e-12;
const pi = Math.PI;
const halfPi = pi / 2;
const tau = 2 * pi;
function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dqTRs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "withPath", ()=>withPath);
var _d3Path = require("d3-path");
function withPath(shape) {
    let digits = 3;
    shape.digits = function(_) {
        if (!arguments.length) return digits;
        if (_ == null) digits = null;
        else {
            const d = Math.floor(_);
            if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
            digits = d;
        }
        return shape;
    };
    return ()=>new (0, _d3Path.Path)(digits);
}

},{"d3-path":"bVB7z","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bVB7z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Path", ()=>(0, _pathJs.Path));
parcelHelpers.export(exports, "path", ()=>(0, _pathJs.path));
parcelHelpers.export(exports, "pathRound", ()=>(0, _pathJs.pathRound));
var _pathJs = require("./path.js");

},{"./path.js":"iD1oh","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"iD1oh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Path", ()=>Path);
parcelHelpers.export(exports, "path", ()=>path);
parcelHelpers.export(exports, "pathRound", ()=>pathRound);
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function append(strings) {
    this._ += strings[0];
    for(let i = 1, n = strings.length; i < n; ++i)this._ += arguments[i] + strings[i];
}
function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function(strings) {
        this._ += strings[0];
        for(let i = 1, n = strings.length; i < n; ++i)this._ += Math.round(arguments[i] * k) / k + strings[i];
    };
}
class Path {
    constructor(digits){
        this._x0 = this._y0 = this._x1 = this._y1 = null; // end of current subpath
        this._ = "";
        this._append = digits == null ? append : appendRound(digits);
    }
    moveTo(x, y) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }
    closePath() {
        if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._append`Z`;
        }
    }
    lineTo(x, y) {
        this._append`L${this._x1 = +x},${this._y1 = +y}`;
    }
    quadraticCurveTo(x1, y1, x, y) {
        this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
    }
    bezierCurveTo(x1, y1, x2, y2, x, y) {
        this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
    }
    arcTo(x1, y1, x2, y2, r) {
        x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);
        let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
        // Is this path empty? Move to (x1,y1).
        if (this._x1 === null) this._append`M${this._x1 = x1},${this._y1 = y1}`;
        else if (!(l01_2 > epsilon)) ;
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) this._append`L${this._x1 = x1},${this._y1 = y1}`;
        else {
            let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
            // If the start tangent is not coincident with (x0,y0), line to.
            if (Math.abs(t01 - 1) > epsilon) this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
            this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
        }
    }
    arc(x, y, r, a0, a1, ccw) {
        x = +x, y = +y, r = +r, ccw = !!ccw;
        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);
        let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
        // Is this path empty? Move to (x0,y0).
        if (this._x1 === null) this._append`M${x0},${y0}`;
        else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._append`L${x0},${y0}`;
        // Is this arc empty? We’re done.
        if (!r) return;
        // Does the angle go the wrong way? Flip the direction.
        if (da < 0) da = da % tau + tau;
        // Is this a complete circle? Draw two arcs to complete the circle.
        if (da > tauEpsilon) this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
        else if (da > epsilon) this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
    rect(x, y, w, h) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
    }
    toString() {
        return this._;
    }
}
function path() {
    return new Path;
}
// Allow instanceof d3.path
path.prototype = Path.prototype;
function pathRound(digits = 3) {
    return new Path(+digits);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bi8Y1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _pathJs = require("./path.js");
var _pointJs = require("./point.js");
exports.default = function(x0, y0, y1) {
    var x1 = null, defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null, path = (0, _pathJs.withPath)(area);
    x0 = typeof x0 === "function" ? x0 : x0 === undefined ? (0, _pointJs.x) : (0, _constantJsDefault.default)(+x0);
    y0 = typeof y0 === "function" ? y0 : y0 === undefined ? (0, _constantJsDefault.default)(0) : (0, _constantJsDefault.default)(+y0);
    y1 = typeof y1 === "function" ? y1 : y1 === undefined ? (0, _pointJs.y) : (0, _constantJsDefault.default)(+y1);
    function area(data) {
        var i, j, k, n = (data = (0, _arrayJsDefault.default)(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
        if (context == null) output = curve(buffer = path());
        for(i = 0; i <= n; ++i){
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) {
                    j = i;
                    output.areaStart();
                    output.lineStart();
                } else {
                    output.lineEnd();
                    output.lineStart();
                    for(k = i - 1; k >= j; --k)output.point(x0z[k], y0z[k]);
                    output.lineEnd();
                    output.areaEnd();
                }
            }
            if (defined0) {
                x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
                output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
            }
        }
        if (buffer) return output = null, buffer + "" || null;
    }
    function arealine() {
        return (0, _lineJsDefault.default)().defined(defined).curve(curve).context(context);
    }
    area.x = function(_) {
        return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), x1 = null, area) : x0;
    };
    area.x0 = function(_) {
        return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : x0;
    };
    area.x1 = function(_) {
        return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : x1;
    };
    area.y = function(_) {
        return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), y1 = null, area) : y0;
    };
    area.y0 = function(_) {
        return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : y0;
    };
    area.y1 = function(_) {
        return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : y1;
    };
    area.lineX0 = area.lineY0 = function() {
        return arealine().x(x0).y(y0);
    };
    area.lineY1 = function() {
        return arealine().x(x0).y(y1);
    };
    area.lineX1 = function() {
        return arealine().x(x1).y(y0);
    };
    area.defined = function(_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(!!_), area) : defined;
    };
    area.curve = function(_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
    };
    area.context = function(_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
    };
    return area;
};

},{"./array.js":"hvhZm","./constant.js":"7BfAk","./curve/linear.js":"alNSQ","./line.js":"8mYFT","./path.js":"dqTRs","./point.js":"i5xwl","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hvhZm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "slice", ()=>slice);
var slice = Array.prototype.slice;
exports.default = function(x) {
    return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
     : Array.from(x); // Map, Set, iterable, string, or anything else
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"alNSQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function Linear(context) {
    this._context = context;
}
Linear.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // falls through
            default:
                this._context.lineTo(x, y);
                break;
        }
    }
};
exports.default = function(context) {
    return new Linear(context);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8mYFT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _pathJs = require("./path.js");
var _pointJs = require("./point.js");
exports.default = function(x, y) {
    var defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null, path = (0, _pathJs.withPath)(line);
    x = typeof x === "function" ? x : x === undefined ? (0, _pointJs.x) : (0, _constantJsDefault.default)(x);
    y = typeof y === "function" ? y : y === undefined ? (0, _pointJs.y) : (0, _constantJsDefault.default)(y);
    function line(data) {
        var i, n = (data = (0, _arrayJsDefault.default)(data)).length, d, defined0 = false, buffer;
        if (context == null) output = curve(buffer = path());
        for(i = 0; i <= n; ++i){
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) output.lineStart();
                else output.lineEnd();
            }
            if (defined0) output.point(+x(d, i, data), +y(d, i, data));
        }
        if (buffer) return output = null, buffer + "" || null;
    }
    line.x = function(_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), line) : x;
    };
    line.y = function(_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), line) : y;
    };
    line.defined = function(_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(!!_), line) : defined;
    };
    line.curve = function(_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };
    line.context = function(_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };
    return line;
};

},{"./array.js":"hvhZm","./constant.js":"7BfAk","./curve/linear.js":"alNSQ","./path.js":"dqTRs","./point.js":"i5xwl","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"i5xwl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "x", ()=>x);
parcelHelpers.export(exports, "y", ()=>y);
function x(p) {
    return p[0];
}
function y(p) {
    return p[1];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eHRYs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _descendingJs = require("./descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var _mathJs = require("./math.js");
exports.default = function() {
    var value = (0, _identityJsDefault.default), sortValues = (0, _descendingJsDefault.default), sort = null, startAngle = (0, _constantJsDefault.default)(0), endAngle = (0, _constantJsDefault.default)((0, _mathJs.tau)), padAngle = (0, _constantJsDefault.default)(0);
    function pie(data) {
        var i, n = (data = (0, _arrayJsDefault.default)(data)).length, j, k, sum = 0, index = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min((0, _mathJs.tau), Math.max(-(0, _mathJs.tau), endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
        for(i = 0; i < n; ++i)if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) sum += v;
        // Optionally sort the arcs by previously-computed values or by data.
        if (sortValues != null) index.sort(function(i, j) {
            return sortValues(arcs[i], arcs[j]);
        });
        else if (sort != null) index.sort(function(i, j) {
            return sort(data[i], data[j]);
        });
        // Compute the arcs! They are stored in the original data's order.
        for(i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1)j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
            data: data[j],
            index: i,
            value: v,
            startAngle: a0,
            endAngle: a1,
            padAngle: p
        };
        return arcs;
    }
    pie.value = function(_) {
        return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : value;
    };
    pie.sortValues = function(_) {
        return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
    };
    pie.sort = function(_) {
        return arguments.length ? (sort = _, sortValues = null, pie) : sort;
    };
    pie.startAngle = function(_) {
        return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : startAngle;
    };
    pie.endAngle = function(_) {
        return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : endAngle;
    };
    pie.padAngle = function(_) {
        return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : padAngle;
    };
    return pie;
};

},{"./array.js":"hvhZm","./constant.js":"7BfAk","./descending.js":"hvcq7","./identity.js":"ebpjw","./math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hvcq7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ebpjw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(d) {
    return d;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"J7m3f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _radialJs = require("./curve/radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _areaJs = require("./area.js");
var _areaJsDefault = parcelHelpers.interopDefault(_areaJs);
var _lineRadialJs = require("./lineRadial.js");
exports.default = function() {
    var a = (0, _areaJsDefault.default)().curve((0, _radialJs.curveRadialLinear)), c = a.curve, x0 = a.lineX0, x1 = a.lineX1, y0 = a.lineY0, y1 = a.lineY1;
    a.angle = a.x, delete a.x;
    a.startAngle = a.x0, delete a.x0;
    a.endAngle = a.x1, delete a.x1;
    a.radius = a.y, delete a.y;
    a.innerRadius = a.y0, delete a.y0;
    a.outerRadius = a.y1, delete a.y1;
    a.lineStartAngle = function() {
        return (0, _lineRadialJs.lineRadial)(x0());
    }, delete a.lineX0;
    a.lineEndAngle = function() {
        return (0, _lineRadialJs.lineRadial)(x1());
    }, delete a.lineX1;
    a.lineInnerRadius = function() {
        return (0, _lineRadialJs.lineRadial)(y0());
    }, delete a.lineY0;
    a.lineOuterRadius = function() {
        return (0, _lineRadialJs.lineRadial)(y1());
    }, delete a.lineY1;
    a.curve = function(_) {
        return arguments.length ? c((0, _radialJsDefault.default)(_)) : c()._curve;
    };
    return a;
};

},{"./curve/radial.js":"c4bl3","./area.js":"bi8Y1","./lineRadial.js":"gkllc","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"c4bl3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "curveRadialLinear", ()=>curveRadialLinear);
var _linearJs = require("./linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var curveRadialLinear = curveRadial((0, _linearJsDefault.default));
function Radial(curve) {
    this._curve = curve;
}
Radial.prototype = {
    areaStart: function() {
        this._curve.areaStart();
    },
    areaEnd: function() {
        this._curve.areaEnd();
    },
    lineStart: function() {
        this._curve.lineStart();
    },
    lineEnd: function() {
        this._curve.lineEnd();
    },
    point: function(a, r) {
        this._curve.point(r * Math.sin(a), r * -Math.cos(a));
    }
};
function curveRadial(curve) {
    function radial(context) {
        return new Radial(curve(context));
    }
    radial._curve = curve;
    return radial;
}
exports.default = curveRadial;

},{"./linear.js":"alNSQ","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gkllc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lineRadial", ()=>lineRadial);
var _radialJs = require("./curve/radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
function lineRadial(l) {
    var c = l.curve;
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    l.curve = function(_) {
        return arguments.length ? c((0, _radialJsDefault.default)(_)) : c()._curve;
    };
    return l;
}
exports.default = function() {
    return lineRadial((0, _lineJsDefault.default)().curve((0, _radialJs.curveRadialLinear)));
};

},{"./curve/radial.js":"c4bl3","./line.js":"8mYFT","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6HrNn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(x, y) {
    return [
        (y = +y) * Math.cos(x -= Math.PI / 2),
        y * Math.sin(x)
    ];
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5jT6S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "link", ()=>link);
parcelHelpers.export(exports, "linkHorizontal", ()=>linkHorizontal);
parcelHelpers.export(exports, "linkVertical", ()=>linkVertical);
parcelHelpers.export(exports, "linkRadial", ()=>linkRadial);
var _arrayJs = require("./array.js");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _bumpJs = require("./curve/bump.js");
var _pathJs = require("./path.js");
var _pointJs = require("./point.js");
function linkSource(d) {
    return d.source;
}
function linkTarget(d) {
    return d.target;
}
function link(curve) {
    let source = linkSource, target = linkTarget, x = (0, _pointJs.x), y = (0, _pointJs.y), context = null, output = null, path = (0, _pathJs.withPath)(link);
    function link() {
        let buffer;
        const argv = (0, _arrayJs.slice).call(arguments);
        const s = source.apply(this, argv);
        const t = target.apply(this, argv);
        if (context == null) output = curve(buffer = path());
        output.lineStart();
        argv[0] = s, output.point(+x.apply(this, argv), +y.apply(this, argv));
        argv[0] = t, output.point(+x.apply(this, argv), +y.apply(this, argv));
        output.lineEnd();
        if (buffer) return output = null, buffer + "" || null;
    }
    link.source = function(_) {
        return arguments.length ? (source = _, link) : source;
    };
    link.target = function(_) {
        return arguments.length ? (target = _, link) : target;
    };
    link.x = function(_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), link) : x;
    };
    link.y = function(_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), link) : y;
    };
    link.context = function(_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), link) : context;
    };
    return link;
}
function linkHorizontal() {
    return link((0, _bumpJs.bumpX));
}
function linkVertical() {
    return link((0, _bumpJs.bumpY));
}
function linkRadial() {
    const l = link((0, _bumpJs.bumpRadial));
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    return l;
}

},{"./array.js":"hvhZm","./constant.js":"7BfAk","./curve/bump.js":"4hr8v","./path.js":"dqTRs","./point.js":"i5xwl","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4hr8v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bumpX", ()=>bumpX);
parcelHelpers.export(exports, "bumpY", ()=>bumpY);
parcelHelpers.export(exports, "bumpRadial", ()=>bumpRadial);
var _pointRadialJs = require("../pointRadial.js");
var _pointRadialJsDefault = parcelHelpers.interopDefault(_pointRadialJs);
class Bump {
    constructor(context, x){
        this._context = context;
        this._x = x;
    }
    areaStart() {
        this._line = 0;
    }
    areaEnd() {
        this._line = NaN;
    }
    lineStart() {
        this._point = 0;
    }
    lineEnd() {
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    }
    point(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                if (this._line) this._context.lineTo(x, y);
                else this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // falls through
            default:
                if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
                else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
                break;
        }
        this._x0 = x, this._y0 = y;
    }
}
class BumpRadial {
    constructor(context){
        this._context = context;
    }
    lineStart() {
        this._point = 0;
    }
    lineEnd() {}
    point(x, y) {
        x = +x, y = +y;
        if (this._point === 0) this._point = 1;
        else {
            const p0 = (0, _pointRadialJsDefault.default)(this._x0, this._y0);
            const p1 = (0, _pointRadialJsDefault.default)(this._x0, this._y0 = (this._y0 + y) / 2);
            const p2 = (0, _pointRadialJsDefault.default)(x, this._y0);
            const p3 = (0, _pointRadialJsDefault.default)(x, y);
            this._context.moveTo(...p0);
            this._context.bezierCurveTo(...p1, ...p2, ...p3);
        }
        this._x0 = x, this._y0 = y;
    }
}
function bumpX(context) {
    return new Bump(context, true);
}
function bumpY(context) {
    return new Bump(context, false);
}
function bumpRadial(context) {
    return new BumpRadial(context);
}

},{"../pointRadial.js":"6HrNn","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5meFA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "symbolsFill", ()=>symbolsFill);
parcelHelpers.export(exports, "symbolsStroke", ()=>symbolsStroke);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _pathJs = require("./path.js");
var _asteriskJs = require("./symbol/asterisk.js");
var _asteriskJsDefault = parcelHelpers.interopDefault(_asteriskJs);
var _circleJs = require("./symbol/circle.js");
var _circleJsDefault = parcelHelpers.interopDefault(_circleJs);
var _crossJs = require("./symbol/cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _diamondJs = require("./symbol/diamond.js");
var _diamondJsDefault = parcelHelpers.interopDefault(_diamondJs);
var _diamond2Js = require("./symbol/diamond2.js");
var _diamond2JsDefault = parcelHelpers.interopDefault(_diamond2Js);
var _plusJs = require("./symbol/plus.js");
var _plusJsDefault = parcelHelpers.interopDefault(_plusJs);
var _squareJs = require("./symbol/square.js");
var _squareJsDefault = parcelHelpers.interopDefault(_squareJs);
var _square2Js = require("./symbol/square2.js");
var _square2JsDefault = parcelHelpers.interopDefault(_square2Js);
var _starJs = require("./symbol/star.js");
var _starJsDefault = parcelHelpers.interopDefault(_starJs);
var _triangleJs = require("./symbol/triangle.js");
var _triangleJsDefault = parcelHelpers.interopDefault(_triangleJs);
var _triangle2Js = require("./symbol/triangle2.js");
var _triangle2JsDefault = parcelHelpers.interopDefault(_triangle2Js);
var _wyeJs = require("./symbol/wye.js");
var _wyeJsDefault = parcelHelpers.interopDefault(_wyeJs);
var _timesJs = require("./symbol/times.js");
var _timesJsDefault = parcelHelpers.interopDefault(_timesJs);
const symbolsFill = [
    (0, _circleJsDefault.default),
    (0, _crossJsDefault.default),
    (0, _diamondJsDefault.default),
    (0, _squareJsDefault.default),
    (0, _starJsDefault.default),
    (0, _triangleJsDefault.default),
    (0, _wyeJsDefault.default)
];
const symbolsStroke = [
    (0, _circleJsDefault.default),
    (0, _plusJsDefault.default),
    (0, _timesJsDefault.default),
    (0, _triangle2JsDefault.default),
    (0, _asteriskJsDefault.default),
    (0, _square2JsDefault.default),
    (0, _diamond2JsDefault.default)
];
function Symbol(type, size) {
    let context = null, path = (0, _pathJs.withPath)(symbol);
    type = typeof type === "function" ? type : (0, _constantJsDefault.default)(type || (0, _circleJsDefault.default));
    size = typeof size === "function" ? size : (0, _constantJsDefault.default)(size === undefined ? 64 : +size);
    function symbol() {
        let buffer;
        if (!context) context = buffer = path();
        type.apply(this, arguments).draw(context, +size.apply(this, arguments));
        if (buffer) return context = null, buffer + "" || null;
    }
    symbol.type = function(_) {
        return arguments.length ? (type = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(_), symbol) : type;
    };
    symbol.size = function(_) {
        return arguments.length ? (size = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), symbol) : size;
    };
    symbol.context = function(_) {
        return arguments.length ? (context = _ == null ? null : _, symbol) : context;
    };
    return symbol;
}
exports.default = Symbol;

},{"./constant.js":"7BfAk","./path.js":"dqTRs","./symbol/asterisk.js":"blJvM","./symbol/circle.js":"ddfCW","./symbol/cross.js":"iIczt","./symbol/diamond.js":"1JKTt","./symbol/diamond2.js":"1Fjr4","./symbol/plus.js":"8orgv","./symbol/square.js":"5u3Jo","./symbol/square2.js":"6mKGu","./symbol/star.js":"26zKs","./symbol/triangle.js":"7dBX4","./symbol/triangle2.js":"1c9Dp","./symbol/wye.js":"34Lcs","./symbol/times.js":"erzp4","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"blJvM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const sqrt3 = (0, _mathJs.sqrt)(3);
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size + (0, _mathJs.min)(size / 28, 0.75)) * 0.59436;
        const t = r / 2;
        const u = t * sqrt3;
        context.moveTo(0, r);
        context.lineTo(0, -r);
        context.moveTo(-u, -t);
        context.lineTo(u, t);
        context.moveTo(-u, t);
        context.lineTo(u, -t);
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ddfCW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size / (0, _mathJs.pi));
        context.moveTo(r, 0);
        context.arc(0, 0, r, 0, (0, _mathJs.tau));
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"iIczt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size / 5) / 2;
        context.moveTo(-3 * r, -r);
        context.lineTo(-r, -r);
        context.lineTo(-r, -3 * r);
        context.lineTo(r, -3 * r);
        context.lineTo(r, -r);
        context.lineTo(3 * r, -r);
        context.lineTo(3 * r, r);
        context.lineTo(r, r);
        context.lineTo(r, 3 * r);
        context.lineTo(-r, 3 * r);
        context.lineTo(-r, r);
        context.lineTo(-3 * r, r);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1JKTt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const tan30 = (0, _mathJs.sqrt)(1 / 3);
const tan30_2 = tan30 * 2;
exports.default = {
    draw (context, size) {
        const y = (0, _mathJs.sqrt)(size / tan30_2);
        const x = y * tan30;
        context.moveTo(0, -y);
        context.lineTo(x, 0);
        context.lineTo(0, y);
        context.lineTo(-x, 0);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1Fjr4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size) * 0.62625;
        context.moveTo(0, -r);
        context.lineTo(r, 0);
        context.lineTo(0, r);
        context.lineTo(-r, 0);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8orgv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size - (0, _mathJs.min)(size / 7, 2)) * 0.87559;
        context.moveTo(-r, 0);
        context.lineTo(r, 0);
        context.moveTo(0, r);
        context.lineTo(0, -r);
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5u3Jo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const w = (0, _mathJs.sqrt)(size);
        const x = -w / 2;
        context.rect(x, x, w, w);
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6mKGu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size) * 0.4431;
        context.moveTo(r, r);
        context.lineTo(r, -r);
        context.lineTo(-r, -r);
        context.lineTo(-r, r);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"26zKs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const ka = 0.89081309152928522810;
const kr = (0, _mathJs.sin)((0, _mathJs.pi) / 10) / (0, _mathJs.sin)(7 * (0, _mathJs.pi) / 10);
const kx = (0, _mathJs.sin)((0, _mathJs.tau) / 10) * kr;
const ky = -(0, _mathJs.cos)((0, _mathJs.tau) / 10) * kr;
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size * ka);
        const x = kx * r;
        const y = ky * r;
        context.moveTo(0, -r);
        context.lineTo(x, y);
        for(let i = 1; i < 5; ++i){
            const a = (0, _mathJs.tau) * i / 5;
            const c = (0, _mathJs.cos)(a);
            const s = (0, _mathJs.sin)(a);
            context.lineTo(s * r, -c * r);
            context.lineTo(c * x - s * y, s * x + c * y);
        }
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7dBX4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const sqrt3 = (0, _mathJs.sqrt)(3);
exports.default = {
    draw (context, size) {
        const y = -(0, _mathJs.sqrt)(size / (sqrt3 * 3));
        context.moveTo(0, y * 2);
        context.lineTo(-sqrt3 * y, -y);
        context.lineTo(sqrt3 * y, -y);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1c9Dp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const sqrt3 = (0, _mathJs.sqrt)(3);
exports.default = {
    draw (context, size) {
        const s = (0, _mathJs.sqrt)(size) * 0.6824;
        const t = s / 2;
        const u = s * sqrt3 / 2; // cos(Math.PI / 6)
        context.moveTo(0, -s);
        context.lineTo(u, t);
        context.lineTo(-u, t);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"34Lcs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
const c = -0.5;
const s = (0, _mathJs.sqrt)(3) / 2;
const k = 1 / (0, _mathJs.sqrt)(12);
const a = (k / 2 + 1) * 3;
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size / a);
        const x0 = r / 2, y0 = r * k;
        const x1 = x0, y1 = r * k + r;
        const x2 = -x1, y2 = y1;
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
        context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
        context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
        context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
        context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
        context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
        context.closePath();
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"erzp4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw (context, size) {
        const r = (0, _mathJs.sqrt)(size - (0, _mathJs.min)(size / 6, 1.7)) * 0.6189;
        context.moveTo(-r, -r);
        context.lineTo(r, r);
        context.moveTo(-r, r);
        context.lineTo(r, -r);
    }
};

},{"../math.js":"7jH6R","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eDaxh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _basisJs = require("./basis.js");
function BasisClosed(context) {
    this._context = context;
}
BasisClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x2, this._y2);
                this._context.closePath();
                break;
            case 2:
                this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
                this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x2, this._y2);
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._x2 = x, this._y2 = y;
                break;
            case 1:
                this._point = 2;
                this._x3 = x, this._y3 = y;
                break;
            case 2:
                this._point = 3;
                this._x4 = x, this._y4 = y;
                this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
                break;
            default:
                (0, _basisJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};
exports.default = function(context) {
    return new BasisClosed(context);
};

},{"../noop.js":"98PIP","./basis.js":"hJGJU","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"98PIP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function() {};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hJGJU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
parcelHelpers.export(exports, "Basis", ()=>Basis);
function point(that, x, y) {
    that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}
function Basis(context) {
    this._context = context;
}
Basis.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 3:
                point(this, this._x1, this._y1); // falls through
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
            default:
                point(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};
exports.default = function(context) {
    return new Basis(context);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eJOS0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basisJs = require("./basis.js");
function BasisOpen(context) {
    this._context = context;
}
BasisOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6;
                this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
                break;
            case 3:
                this._point = 4; // falls through
            default:
                (0, _basisJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};
exports.default = function(context) {
    return new BasisOpen(context);
};

},{"./basis.js":"hJGJU","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5mzp3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basisJs = require("./basis.js");
function Bundle(context, beta) {
    this._basis = new (0, _basisJs.Basis)(context);
    this._beta = beta;
}
Bundle.prototype = {
    lineStart: function() {
        this._x = [];
        this._y = [];
        this._basis.lineStart();
    },
    lineEnd: function() {
        var x = this._x, y = this._y, j = x.length - 1;
        if (j > 0) {
            var x0 = x[0], y0 = y[0], dx = x[j] - x0, dy = y[j] - y0, i = -1, t;
            while(++i <= j){
                t = i / j;
                this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
            }
        }
        this._x = this._y = null;
        this._basis.lineEnd();
    },
    point: function(x, y) {
        this._x.push(+x);
        this._y.push(+y);
    }
};
exports.default = function custom(beta) {
    function bundle(context) {
        return beta === 1 ? new (0, _basisJs.Basis)(context) : new Bundle(context, beta);
    }
    bundle.beta = function(beta) {
        return custom(+beta);
    };
    return bundle;
}(0.85);

},{"./basis.js":"hJGJU","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"74gyN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CardinalClosed", ()=>CardinalClosed);
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _cardinalJs = require("./cardinal.js");
function CardinalClosed(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                this.point(this._x5, this._y5);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;
            case 1:
                this._point = 2;
                this._context.moveTo(this._x4 = x, this._y4 = y);
                break;
            case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;
            default:
                (0, _cardinalJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new CardinalClosed(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"../noop.js":"98PIP","./cardinal.js":"qsW2i","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"qsW2i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
parcelHelpers.export(exports, "Cardinal", ()=>Cardinal);
function point(that, x, y) {
    that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}
function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                point(this, this._x1, this._y1);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                this._x1 = x, this._y1 = y;
                break;
            case 2:
                this._point = 3; // falls through
            default:
                point(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new Cardinal(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bWomn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CardinalOpen", ()=>CardinalOpen);
var _cardinalJs = require("./cardinal.js");
function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4; // falls through
            default:
                (0, _cardinalJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new CardinalOpen(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"./cardinal.js":"qsW2i","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"fWZcx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cardinalClosedJs = require("./cardinalClosed.js");
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _catmullRomJs = require("./catmullRom.js");
function CatmullRomClosed(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRomClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                this.point(this._x5, this._y5);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;
            case 1:
                this._point = 2;
                this._context.moveTo(this._x4 = x, this._y4 = y);
                break;
            case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;
            default:
                (0, _catmullRomJs.point)(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRomClosed(context, alpha) : new (0, _cardinalClosedJs.CardinalClosed)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"./cardinalClosed.js":"74gyN","../noop.js":"98PIP","./catmullRom.js":"kALtf","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"kALtf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
var _mathJs = require("../math.js");
var _cardinalJs = require("./cardinal.js");
function point(that, x, y) {
    var x1 = that._x1, y1 = that._y1, x2 = that._x2, y2 = that._y2;
    if (that._l01_a > (0, _mathJs.epsilon)) {
        var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
        x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
        y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
    }
    if (that._l23_a > (0, _mathJs.epsilon)) {
        var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
        x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
        y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
    }
    that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRom.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                this.point(this._x2, this._y2);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3; // falls through
            default:
                point(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRom(context, alpha) : new (0, _cardinalJs.Cardinal)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"../math.js":"7jH6R","./cardinal.js":"qsW2i","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6UqB5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cardinalOpenJs = require("./cardinalOpen.js");
var _catmullRomJs = require("./catmullRom.js");
function CatmullRomOpen(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRomOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4; // falls through
            default:
                (0, _catmullRomJs.point)(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRomOpen(context, alpha) : new (0, _cardinalOpenJs.CardinalOpen)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"./cardinalOpen.js":"bWomn","./catmullRom.js":"kALtf","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eJzOb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
function LinearClosed(context) {
    this._context = context;
}
LinearClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        if (this._point) this._context.closePath();
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) this._context.lineTo(x, y);
        else this._point = 1, this._context.moveTo(x, y);
    }
};
exports.default = function(context) {
    return new LinearClosed(context);
};

},{"../noop.js":"98PIP","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4xf0w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "monotoneX", ()=>monotoneX);
parcelHelpers.export(exports, "monotoneY", ()=>monotoneY);
function sign(x) {
    return x < 0 ? -1 : 1;
}
// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
// Calculate a one-sided slope.
function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
    var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
    this._context = context;
}
MonotoneX.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
            case 3:
                point(this, this._t0, slope2(this, this._t0));
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        var t1 = NaN;
        x = +x, y = +y;
        if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                point(this, slope2(this, t1 = slope3(this, x, y)), t1);
                break;
            default:
                point(this, this._t0, t1 = slope3(this, x, y));
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
        this._t0 = t1;
    }
};
function MonotoneY(context) {
    this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
    MonotoneX.prototype.point.call(this, y, x);
};
function ReflectContext(context) {
    this._context = context;
}
ReflectContext.prototype = {
    moveTo: function(x, y) {
        this._context.moveTo(y, x);
    },
    closePath: function() {
        this._context.closePath();
    },
    lineTo: function(x, y) {
        this._context.lineTo(y, x);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
        this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
    }
};
function monotoneX(context) {
    return new MonotoneX(context);
}
function monotoneY(context) {
    return new MonotoneY(context);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5vYnK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function Natural(context) {
    this._context = context;
}
Natural.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = [];
        this._y = [];
    },
    lineEnd: function() {
        var x = this._x, y = this._y, n = x.length;
        if (n) {
            this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
            if (n === 2) this._context.lineTo(x[1], y[1]);
            else {
                var px = controlPoints(x), py = controlPoints(y);
                for(var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1)this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
            }
        }
        if (this._line || this._line !== 0 && n === 1) this._context.closePath();
        this._line = 1 - this._line;
        this._x = this._y = null;
    },
    point: function(x, y) {
        this._x.push(+x);
        this._y.push(+y);
    }
};
// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
    var i, n = x.length - 1, m, a = new Array(n), b = new Array(n), r = new Array(n);
    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
    for(i = 1; i < n - 1; ++i)a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
    for(i = 1; i < n; ++i)m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    a[n - 1] = r[n - 1] / b[n - 1];
    for(i = n - 2; i >= 0; --i)a[i] = (r[i] - a[i + 1]) / b[i];
    b[n - 1] = (x[n] + a[n - 1]) / 2;
    for(i = 0; i < n - 1; ++i)b[i] = 2 * x[i + 1] - a[i + 1];
    return [
        a,
        b
    ];
}
exports.default = function(context) {
    return new Natural(context);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"kdbKB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "stepBefore", ()=>stepBefore);
parcelHelpers.export(exports, "stepAfter", ()=>stepAfter);
function Step(context, t) {
    this._context = context;
    this._t = t;
}
Step.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = this._y = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // falls through
            default:
                if (this._t <= 0) {
                    this._context.lineTo(this._x, y);
                    this._context.lineTo(x, y);
                } else {
                    var x1 = this._x * (1 - this._t) + x * this._t;
                    this._context.lineTo(x1, this._y);
                    this._context.lineTo(x1, y);
                }
                break;
        }
        this._x = x, this._y = y;
    }
};
exports.default = function(context) {
    return new Step(context, 0.5);
};
function stepBefore(context) {
    return new Step(context, 0);
}
function stepAfter(context) {
    return new Step(context, 1);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3J4qo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _noneJs = require("./offset/none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
var _noneJs1 = require("./order/none.js");
var _noneJsDefault1 = parcelHelpers.interopDefault(_noneJs1);
function stackValue(d, key) {
    return d[key];
}
function stackSeries(key) {
    const series = [];
    series.key = key;
    return series;
}
exports.default = function() {
    var keys = (0, _constantJsDefault.default)([]), order = (0, _noneJsDefault1.default), offset = (0, _noneJsDefault.default), value = stackValue;
    function stack(data) {
        var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n = sz.length, j = -1, oz;
        for (const d of data)for(i = 0, ++j; i < n; ++i)(sz[i][j] = [
            0,
            +value(d, sz[i].key, j, data)
        ]).data = d;
        for(i = 0, oz = (0, _arrayJsDefault.default)(order(sz)); i < n; ++i)sz[oz[i]].index = i;
        offset(sz, oz);
        return sz;
    }
    stack.keys = function(_) {
        return arguments.length ? (keys = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(Array.from(_)), stack) : keys;
    };
    stack.value = function(_) {
        return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), stack) : value;
    };
    stack.order = function(_) {
        return arguments.length ? (order = _ == null ? (0, _noneJsDefault1.default) : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(Array.from(_)), stack) : order;
    };
    stack.offset = function(_) {
        return arguments.length ? (offset = _ == null ? (0, _noneJsDefault.default) : _, stack) : offset;
    };
    return stack;
};

},{"./array.js":"hvhZm","./constant.js":"7BfAk","./offset/none.js":"hOkdk","./order/none.js":"9HOAs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hOkdk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(series, order) {
    if (!((n = series.length) > 1)) return;
    for(var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i){
        s0 = s1, s1 = series[order[i]];
        for(j = 0; j < m; ++j)s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9HOAs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(series) {
    var n = series.length, o = new Array(n);
    while(--n >= 0)o[n] = n;
    return o;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hCPeF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series, order) {
    if (!((n = series.length) > 0)) return;
    for(var i, n, j = 0, m = series[0].length, y; j < m; ++j){
        for(y = i = 0; i < n; ++i)y += series[i][j][1] || 0;
        if (y) for(i = 0; i < n; ++i)series[i][j][1] /= y;
    }
    (0, _noneJsDefault.default)(series, order);
};

},{"./none.js":"hOkdk","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8CQlP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = function(series, order) {
    if (!((n = series.length) > 0)) return;
    for(var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j)for(yp = yn = 0, i = 0; i < n; ++i){
        if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) d[0] = yp, d[1] = yp += dy;
        else if (dy < 0) d[1] = yn, d[0] = yn += dy;
        else d[0] = 0, d[1] = dy;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"dh4Xg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series, order) {
    if (!((n = series.length) > 0)) return;
    for(var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j){
        for(var i = 0, y = 0; i < n; ++i)y += series[i][j][1] || 0;
        s0[j][1] += s0[j][0] = -y / 2;
    }
    (0, _noneJsDefault.default)(series, order);
};

},{"./none.js":"hOkdk","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"eveGm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series, order) {
    if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
    for(var y = 0, j = 1, s0, m, n; j < m; ++j){
        for(var i = 0, s1 = 0, s2 = 0; i < n; ++i){
            var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
            for(var k = 0; k < i; ++k){
                var sk = series[order[k]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
                s3 += skj0 - skj1;
            }
            s1 += sij0, s2 += s3 * sij0;
        }
        s0[j - 1][1] += s0[j - 1][0] = y;
        if (s1) y -= s2 / s1;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    (0, _noneJsDefault.default)(series, order);
};

},{"./none.js":"hOkdk","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"jTxCV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series) {
    var peaks = series.map(peak);
    return (0, _noneJsDefault.default)(series).sort(function(a, b) {
        return peaks[a] - peaks[b];
    });
};
function peak(series) {
    var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
    while(++i < n)if ((vi = +series[i][1]) > vj) vj = vi, j = i;
    return j;
}

},{"./none.js":"9HOAs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"04VYH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sum", ()=>sum);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series) {
    var sums = series.map(sum);
    return (0, _noneJsDefault.default)(series).sort(function(a, b) {
        return sums[a] - sums[b];
    });
};
function sum(series) {
    var s = 0, i = -1, n = series.length, v;
    while(++i < n)if (v = +series[i][1]) s += v;
    return s;
}

},{"./none.js":"9HOAs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"86wUo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
exports.default = function(series) {
    return (0, _ascendingJsDefault.default)(series).reverse();
};

},{"./ascending.js":"04VYH","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9P3vM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _appearanceJs = require("./appearance.js");
var _appearanceJsDefault = parcelHelpers.interopDefault(_appearanceJs);
var _ascendingJs = require("./ascending.js");
exports.default = function(series) {
    var n = series.length, i, j, sums = series.map((0, _ascendingJs.sum)), order = (0, _appearanceJsDefault.default)(series), top = 0, bottom = 0, tops = [], bottoms = [];
    for(i = 0; i < n; ++i){
        j = order[i];
        if (top < bottom) {
            top += sums[j];
            tops.push(j);
        } else {
            bottom += sums[j];
            bottoms.push(j);
        }
    }
    return bottoms.reverse().concat(tops);
};

},{"./appearance.js":"jTxCV","./ascending.js":"04VYH","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"2qPx7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
exports.default = function(series) {
    return (0, _noneJsDefault.default)(series).reverse();
};

},{"./none.js":"9HOAs","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ehvhk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
var _d3Ease = require("d3-ease");
var _d3Timer = require("d3-timer");
var _d3Transition = require("d3-transition");
var _d3TransitionDefault = parcelHelpers.interopDefault(_d3Transition);
function pizza() {
    let queue, tasks, interpolator, generator, draw, dequeue, enqueue;
    function chart(selection) {
        selection.each(function() {
            const dataContainer = (0, _d3Selection.select)(this).append("custom");
            //private variables
            let duration = 250, current = {}, transitionId = "";
            enqueue = function() {
                queue.enqueue(tasks);
            };
            dequeue = function() {
                let currentTask = queue.dequeue();
                if (currentTask) {
                    const { type , input  } = currentTask;
                    switch(type){
                        case "sections":
                            transitionId = input[0] ? input[0].id : "";
                            updateData(input);
                            break;
                        case "duration":
                            duration = input;
                            dequeue();
                        default:
                            break;
                    }
                } else {
                    duration = 250;
                    transitionId = "";
                }
            };
            function updateData(sections) {
                const dataBinding = dataContainer.selectAll("custom.section").data(sections, function(d) {
                    return d.id || (0, _d3Selection.select)(this).attr("id");
                });
                dataBinding.exit().each(function() {
                    const id = (0, _d3Selection.select)(this).attr("id");
                    delete current[id];
                }).remove();
                transition(dataBinding);
                dataBinding.enter().append("custom").attr("id", (section)=>section.id).classed("section", true).append("path").attr("fill", (section)=>section.fill).attr("d", (section)=>generator(section)).attr("opacity", 1).each(function(s) {
                    current = {
                        ...current,
                        [s.id]: {
                            ...s
                        }
                    };
                });
            }
            const transition = function(selection) {
                const t = (0, _d3Timer.timer)(function(elapsed) {
                    draw();
                    if (elapsed > duration + 100) t.stop();
                });
                console.log(selection);
                selection.select("path").transition().duration(duration).ease((0, _d3Ease.easePolyInOut).exponent(3)).attr("opacity", 1).attrTween("d", function(a) {
                    const from = {
                        ...current[a.id]
                    };
                    const i = interpolator(from, a);
                    return (t)=>{
                        return generator(i(t));
                    };
                }).attr("fill", (d)=>d.fill).end().catch(()=>{
                    console.log("rejected ");
                }).then(()=>{
                    selection.each(function(d) {
                        current = {
                            ...current,
                            [d.id]: d
                        };
                    });
                    dequeue();
                });
            };
            //boot
            dequeue();
        });
    }
    chart.interpolator = function(value) {
        interpolator = value;
        return chart;
    };
    chart.generator = function(value) {
        generator = value;
        return chart;
    };
    chart.draw = function(value) {
        draw = value;
        return chart;
    };
    chart.queue = function(value) {
        queue = value;
        return chart;
    };
    chart.enqueue = function(value) {
        tasks = value;
        if (typeof enqueue === "function") enqueue();
        return chart;
    };
    chart.dequeue = function() {
        if (typeof dequeue === "function") dequeue();
        return chart;
    };
    return chart;
}
exports.default = pizza;

},{"d3-timer":"kgMa2","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk","d3-selection":"6ZzI7","d3-ease":"gPDWW","d3-transition":"8v4c8"}],"kgMa2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>(0, _timerJs.now));
parcelHelpers.export(exports, "timer", ()=>(0, _timerJs.timer));
parcelHelpers.export(exports, "timerFlush", ()=>(0, _timerJs.timerFlush));
parcelHelpers.export(exports, "timeout", ()=>(0, _timeoutJsDefault.default));
parcelHelpers.export(exports, "interval", ()=>(0, _intervalJsDefault.default));
var _timerJs = require("./timer.js");
var _timeoutJs = require("./timeout.js");
var _timeoutJsDefault = parcelHelpers.interopDefault(_timeoutJs);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);

},{"./timer.js":"4zseI","./timeout.js":"gEAgj","./interval.js":"bu6lt","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4zseI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>now);
parcelHelpers.export(exports, "Timer", ()=>Timer);
parcelHelpers.export(exports, "timer", ()=>timer);
parcelHelpers.export(exports, "timerFlush", ()=>timerFlush);
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1000, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
};
function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
    clockNow = 0;
}
function Timer() {
    this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
            if (taskTail) taskTail._next = this;
            else taskHead = this;
            taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
    },
    stop: function() {
        if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
        }
    }
};
function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
}
function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while(t){
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
    }
    --frame;
}
function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
        timerFlush();
    } finally{
        frame = 0;
        nap();
        clockNow = 0;
    }
}
function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while(t1)if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
    } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
    taskTail = t0;
    sleep(time);
}
function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
        if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
    } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gEAgj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _timerJs = require("./timer.js");
exports.default = function(callback, delay, time) {
    var t = new (0, _timerJs.Timer);
    delay = delay == null ? 0 : +delay;
    t.restart((elapsed)=>{
        t.stop();
        callback(elapsed + delay);
    }, delay, time);
    return t;
};

},{"./timer.js":"4zseI","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bu6lt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _timerJs = require("./timer.js");
exports.default = function(callback, delay, time) {
    var t = new (0, _timerJs.Timer), total = delay;
    if (delay == null) return t.restart(callback, delay, time), t;
    t._restart = t.restart;
    t.restart = function(callback, delay, time) {
        delay = +delay, time = time == null ? (0, _timerJs.now)() : +time;
        t._restart(function tick(elapsed) {
            elapsed += total;
            t._restart(tick, total += delay, time);
            callback(elapsed);
        }, delay, time);
    };
    t.restart(callback, delay, time);
    return t;
};

},{"./timer.js":"4zseI","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gPDWW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "easeLinear", ()=>(0, _linearJs.linear));
parcelHelpers.export(exports, "easeQuad", ()=>(0, _quadJs.quadInOut));
parcelHelpers.export(exports, "easeQuadIn", ()=>(0, _quadJs.quadIn));
parcelHelpers.export(exports, "easeQuadOut", ()=>(0, _quadJs.quadOut));
parcelHelpers.export(exports, "easeQuadInOut", ()=>(0, _quadJs.quadInOut));
parcelHelpers.export(exports, "easeCubic", ()=>(0, _cubicJs.cubicInOut));
parcelHelpers.export(exports, "easeCubicIn", ()=>(0, _cubicJs.cubicIn));
parcelHelpers.export(exports, "easeCubicOut", ()=>(0, _cubicJs.cubicOut));
parcelHelpers.export(exports, "easeCubicInOut", ()=>(0, _cubicJs.cubicInOut));
parcelHelpers.export(exports, "easePoly", ()=>(0, _polyJs.polyInOut));
parcelHelpers.export(exports, "easePolyIn", ()=>(0, _polyJs.polyIn));
parcelHelpers.export(exports, "easePolyOut", ()=>(0, _polyJs.polyOut));
parcelHelpers.export(exports, "easePolyInOut", ()=>(0, _polyJs.polyInOut));
parcelHelpers.export(exports, "easeSin", ()=>(0, _sinJs.sinInOut));
parcelHelpers.export(exports, "easeSinIn", ()=>(0, _sinJs.sinIn));
parcelHelpers.export(exports, "easeSinOut", ()=>(0, _sinJs.sinOut));
parcelHelpers.export(exports, "easeSinInOut", ()=>(0, _sinJs.sinInOut));
parcelHelpers.export(exports, "easeExp", ()=>(0, _expJs.expInOut));
parcelHelpers.export(exports, "easeExpIn", ()=>(0, _expJs.expIn));
parcelHelpers.export(exports, "easeExpOut", ()=>(0, _expJs.expOut));
parcelHelpers.export(exports, "easeExpInOut", ()=>(0, _expJs.expInOut));
parcelHelpers.export(exports, "easeCircle", ()=>(0, _circleJs.circleInOut));
parcelHelpers.export(exports, "easeCircleIn", ()=>(0, _circleJs.circleIn));
parcelHelpers.export(exports, "easeCircleOut", ()=>(0, _circleJs.circleOut));
parcelHelpers.export(exports, "easeCircleInOut", ()=>(0, _circleJs.circleInOut));
parcelHelpers.export(exports, "easeBounce", ()=>(0, _bounceJs.bounceOut));
parcelHelpers.export(exports, "easeBounceIn", ()=>(0, _bounceJs.bounceIn));
parcelHelpers.export(exports, "easeBounceOut", ()=>(0, _bounceJs.bounceOut));
parcelHelpers.export(exports, "easeBounceInOut", ()=>(0, _bounceJs.bounceInOut));
parcelHelpers.export(exports, "easeBack", ()=>(0, _backJs.backInOut));
parcelHelpers.export(exports, "easeBackIn", ()=>(0, _backJs.backIn));
parcelHelpers.export(exports, "easeBackOut", ()=>(0, _backJs.backOut));
parcelHelpers.export(exports, "easeBackInOut", ()=>(0, _backJs.backInOut));
parcelHelpers.export(exports, "easeElastic", ()=>(0, _elasticJs.elasticOut));
parcelHelpers.export(exports, "easeElasticIn", ()=>(0, _elasticJs.elasticIn));
parcelHelpers.export(exports, "easeElasticOut", ()=>(0, _elasticJs.elasticOut));
parcelHelpers.export(exports, "easeElasticInOut", ()=>(0, _elasticJs.elasticInOut));
var _linearJs = require("./linear.js");
var _quadJs = require("./quad.js");
var _cubicJs = require("./cubic.js");
var _polyJs = require("./poly.js");
var _sinJs = require("./sin.js");
var _expJs = require("./exp.js");
var _circleJs = require("./circle.js");
var _bounceJs = require("./bounce.js");
var _backJs = require("./back.js");
var _elasticJs = require("./elastic.js");

},{"./linear.js":false,"./quad.js":false,"./cubic.js":"12ax7","./poly.js":"9YpdL","./sin.js":false,"./exp.js":false,"./circle.js":false,"./bounce.js":false,"./back.js":false,"./elastic.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"12ax7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cubicIn", ()=>cubicIn);
parcelHelpers.export(exports, "cubicOut", ()=>cubicOut);
parcelHelpers.export(exports, "cubicInOut", ()=>cubicInOut);
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    return --t * t * t + 1;
}
function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"9YpdL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "polyIn", ()=>polyIn);
parcelHelpers.export(exports, "polyOut", ()=>polyOut);
parcelHelpers.export(exports, "polyInOut", ()=>polyInOut);
var exponent = 3;
var polyIn = function custom(e) {
    e = +e;
    function polyIn(t) {
        return Math.pow(t, e);
    }
    polyIn.exponent = custom;
    return polyIn;
}(exponent);
var polyOut = function custom(e) {
    e = +e;
    function polyOut(t) {
        return 1 - Math.pow(1 - t, e);
    }
    polyOut.exponent = custom;
    return polyOut;
}(exponent);
var polyInOut = function custom(e) {
    e = +e;
    function polyInOut(t) {
        return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
    }
    polyInOut.exponent = custom;
    return polyInOut;
}(exponent);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"8v4c8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "transition", ()=>(0, _indexJsDefault.default));
parcelHelpers.export(exports, "active", ()=>(0, _activeJsDefault.default));
parcelHelpers.export(exports, "interrupt", ()=>(0, _interruptJsDefault.default));
var _indexJs = require("./selection/index.js");
var _indexJs1 = require("./transition/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs1);
var _activeJs = require("./active.js");
var _activeJsDefault = parcelHelpers.interopDefault(_activeJs);
var _interruptJs = require("./interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);

},{"./selection/index.js":"5jWQh","./transition/index.js":"3DFGx","./active.js":false,"./interrupt.js":"6qtbn","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5jWQh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _d3Selection = require("d3-selection");
var _interruptJs = require("./interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);
var _transitionJs = require("./transition.js");
var _transitionJsDefault = parcelHelpers.interopDefault(_transitionJs);
(0, _d3Selection.selection).prototype.interrupt = (0, _interruptJsDefault.default);
(0, _d3Selection.selection).prototype.transition = (0, _transitionJsDefault.default);

},{"d3-selection":"6ZzI7","./interrupt.js":"4HJ9B","./transition.js":"bwvxw","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"4HJ9B":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _interruptJs = require("../interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);
exports.default = function(name) {
    return this.each(function() {
        (0, _interruptJsDefault.default)(this, name);
    });
};

},{"../interrupt.js":"6qtbn","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"6qtbn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./transition/schedule.js");
exports.default = function(node, name) {
    var schedules = node.__transition, schedule, active, empty = true, i;
    if (!schedules) return;
    name = name == null ? null : name + "";
    for(i in schedules){
        if ((schedule = schedules[i]).name !== name) {
            empty = false;
            continue;
        }
        active = schedule.state > (0, _scheduleJs.STARTING) && schedule.state < (0, _scheduleJs.ENDING);
        schedule.state = (0, _scheduleJs.ENDED);
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
    }
    if (empty) delete node.__transition;
};

},{"./transition/schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5AieB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CREATED", ()=>CREATED);
parcelHelpers.export(exports, "SCHEDULED", ()=>SCHEDULED);
parcelHelpers.export(exports, "STARTING", ()=>STARTING);
parcelHelpers.export(exports, "STARTED", ()=>STARTED);
parcelHelpers.export(exports, "RUNNING", ()=>RUNNING);
parcelHelpers.export(exports, "ENDING", ()=>ENDING);
parcelHelpers.export(exports, "ENDED", ()=>ENDED);
parcelHelpers.export(exports, "init", ()=>init);
parcelHelpers.export(exports, "set", ()=>set);
parcelHelpers.export(exports, "get", ()=>get);
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var emptyOn = (0, _d3Dispatch.dispatch)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
exports.default = function(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
        name: name,
        index: index,
        group: group,
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
    });
};
function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
}
function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
}
function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
}
function create(node, id, self) {
    var schedules = node.__transition, tween;
    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = (0, _d3Timer.timer)(schedule, 0, self.time);
    function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);
        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
    }
    function start(elapsed) {
        var i, j, n, o;
        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();
        for(i in schedules){
            o = schedules[i];
            if (o.name !== self.name) continue;
            // While this element already has a starting transition during this frame,
            // defer starting an interrupting transition until that transition has a
            // chance to tick (and possibly end); see d3/d3-transition#54!
            if (o.state === STARTED) return (0, _d3Timer.timeout)(start);
            // Interrupt the active transition, if any.
            if (o.state === RUNNING) {
                o.state = ENDED;
                o.timer.stop();
                o.on.call("interrupt", node, node.__data__, o.index, o.group);
                delete schedules[i];
            } else if (+i < id) {
                o.state = ENDED;
                o.timer.stop();
                o.on.call("cancel", node, node.__data__, o.index, o.group);
                delete schedules[i];
            }
        }
        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        (0, _d3Timer.timeout)(function() {
            if (self.state === STARTED) {
                self.state = RUNNING;
                self.timer.restart(tick, self.delay, self.time);
                tick(elapsed);
            }
        });
        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;
        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for(i = 0, j = -1; i < n; ++i)if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
        tween.length = j + 1;
    }
    function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
        while(++i < n)tween[i].call(node, t);
        // Dispatch the end event.
        if (self.state === ENDING) {
            self.on.call("end", node, node.__data__, self.index, self.group);
            stop();
        }
    }
    function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for(var i in schedules)return; // eslint-disable-line no-unused-vars
        delete node.__transition;
    }
}

},{"d3-dispatch":"86IBD","d3-timer":"kgMa2","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"86IBD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dispatch", ()=>(0, _dispatchJsDefault.default));
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);

},{"./dispatch.js":"gNDQF","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gNDQF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var noop = {
    value: ()=>{}
};
function dispatch() {
    for(var i = 0, n = arguments.length, _ = {}, t; i < n; ++i){
        if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
    }
    return new Dispatch(_);
}
function Dispatch(_) {
    this._ = _;
}
function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {
            type: t,
            name: name
        };
    });
}
Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
        var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
            while(++i < n)if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
            return;
        }
        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while(++i < n){
            if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
            else if (callback == null) for(t in _)_[t] = set(_[t], typename.name, null);
        }
        return this;
    },
    copy: function() {
        var copy = {}, _ = this._;
        for(var t in _)copy[t] = _[t].slice();
        return new Dispatch(copy);
    },
    call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for(var args = new Array(n), i = 0, n, t; i < n; ++i)args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(var t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    }
};
function get(type, name) {
    for(var i = 0, n = type.length, c; i < n; ++i){
        if ((c = type[i]).name === name) return c.value;
    }
}
function set(type, name, callback) {
    for(var i = 0, n = type.length; i < n; ++i)if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
    }
    if (callback != null) type.push({
        name: name,
        value: callback
    });
    return type;
}
exports.default = dispatch;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bwvxw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../transition/index.js");
var _scheduleJs = require("../transition/schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);
var _d3Ease = require("d3-ease");
var _d3Timer = require("d3-timer");
var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: (0, _d3Ease.easeCubicInOut)
};
function inherit(node, id) {
    var timing;
    while(!(timing = node.__transition) || !(timing = timing[id])){
        if (!(node = node.parentNode)) throw new Error(`transition ${id} not found`);
    }
    return timing;
}
exports.default = function(name) {
    var id, timing;
    if (name instanceof (0, _indexJs.Transition)) id = name._id, name = name._name;
    else id = (0, _indexJs.newId)(), (timing = defaultTiming).time = (0, _d3Timer.now)(), name = name == null ? null : name + "";
    for(var groups = this._groups, m = groups.length, j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) (0, _scheduleJsDefault.default)(node, name, id, i, group, timing || inherit(node, id));
    }
    return new (0, _indexJs.Transition)(groups, this._parents, name, id);
};

},{"../transition/index.js":"3DFGx","../transition/schedule.js":"5AieB","d3-ease":"gPDWW","d3-timer":"kgMa2","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"3DFGx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Transition", ()=>Transition);
parcelHelpers.export(exports, "newId", ()=>newId);
var _d3Selection = require("d3-selection");
var _attrJs = require("./attr.js");
var _attrJsDefault = parcelHelpers.interopDefault(_attrJs);
var _attrTweenJs = require("./attrTween.js");
var _attrTweenJsDefault = parcelHelpers.interopDefault(_attrTweenJs);
var _delayJs = require("./delay.js");
var _delayJsDefault = parcelHelpers.interopDefault(_delayJs);
var _durationJs = require("./duration.js");
var _durationJsDefault = parcelHelpers.interopDefault(_durationJs);
var _easeJs = require("./ease.js");
var _easeJsDefault = parcelHelpers.interopDefault(_easeJs);
var _easeVaryingJs = require("./easeVarying.js");
var _easeVaryingJsDefault = parcelHelpers.interopDefault(_easeVaryingJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _onJs = require("./on.js");
var _onJsDefault = parcelHelpers.interopDefault(_onJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _selectionJs = require("./selection.js");
var _selectionJsDefault = parcelHelpers.interopDefault(_selectionJs);
var _styleJs = require("./style.js");
var _styleJsDefault = parcelHelpers.interopDefault(_styleJs);
var _styleTweenJs = require("./styleTween.js");
var _styleTweenJsDefault = parcelHelpers.interopDefault(_styleTweenJs);
var _textJs = require("./text.js");
var _textJsDefault = parcelHelpers.interopDefault(_textJs);
var _textTweenJs = require("./textTween.js");
var _textTweenJsDefault = parcelHelpers.interopDefault(_textTweenJs);
var _transitionJs = require("./transition.js");
var _transitionJsDefault = parcelHelpers.interopDefault(_transitionJs);
var _tweenJs = require("./tween.js");
var _tweenJsDefault = parcelHelpers.interopDefault(_tweenJs);
var _endJs = require("./end.js");
var _endJsDefault = parcelHelpers.interopDefault(_endJs);
var id = 0;
function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
}
function transition(name) {
    return (0, _d3Selection.selection)().transition(name);
}
exports.default = transition;
function newId() {
    return ++id;
}
var selection_prototype = (0, _d3Selection.selection).prototype;
Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: (0, _selectJsDefault.default),
    selectAll: (0, _selectAllJsDefault.default),
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: (0, _filterJsDefault.default),
    merge: (0, _mergeJsDefault.default),
    selection: (0, _selectionJsDefault.default),
    transition: (0, _transitionJsDefault.default),
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: (0, _onJsDefault.default),
    attr: (0, _attrJsDefault.default),
    attrTween: (0, _attrTweenJsDefault.default),
    style: (0, _styleJsDefault.default),
    styleTween: (0, _styleTweenJsDefault.default),
    text: (0, _textJsDefault.default),
    textTween: (0, _textTweenJsDefault.default),
    remove: (0, _removeJsDefault.default),
    tween: (0, _tweenJsDefault.default),
    delay: (0, _delayJsDefault.default),
    duration: (0, _durationJsDefault.default),
    ease: (0, _easeJsDefault.default),
    easeVarying: (0, _easeVaryingJsDefault.default),
    end: (0, _endJsDefault.default),
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

},{"d3-selection":"6ZzI7","./attr.js":"hYsPe","./attrTween.js":"bg4BF","./delay.js":"7b7N6","./duration.js":"5ozIM","./ease.js":"hHLWH","./easeVarying.js":"cM1wf","./filter.js":"7Y9qP","./merge.js":"a6nHd","./on.js":"kGMAv","./remove.js":"bYUeL","./select.js":"hPLKO","./selectAll.js":"bpkiv","./selection.js":"16k7b","./style.js":"ktYWG","./styleTween.js":"liUsP","./text.js":"7cxtL","./textTween.js":"cXA6x","./transition.js":"1z7ro","./tween.js":"7sgUT","./end.js":"gGxEe","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hYsPe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _tweenJs = require("./tween.js");
var _interpolateJs = require("./interpolate.js");
var _interpolateJsDefault = parcelHelpers.interopDefault(_interpolateJs);
function attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function attrConstant(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function attrConstantNS(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function attrFunction(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}
function attrFunctionNS(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}
exports.default = function(name, value) {
    var fullname = (0, _d3Selection.namespace)(name), i = fullname === "transform" ? (0, _d3Interpolate.interpolateTransformSvg) : (0, _interpolateJsDefault.default);
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0, _tweenJs.tweenValue)(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
};

},{"d3-interpolate":"diZln","d3-selection":"6ZzI7","./tween.js":"7sgUT","./interpolate.js":"ebJwC","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7sgUT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tweenValue", ()=>tweenValue);
var _scheduleJs = require("./schedule.js");
function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), tween = schedule.tween;
        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
            tween1 = tween0 = tween;
            for(var i = 0, n = tween1.length; i < n; ++i)if (tween1[i].name === name) {
                tween1 = tween1.slice();
                tween1.splice(i, 1);
                break;
            }
        }
        schedule.tween = tween1;
    };
}
function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), tween = schedule.tween;
        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
            tween1 = (tween0 = tween).slice();
            for(var t = {
                name: name,
                value: value
            }, i = 0, n = tween1.length; i < n; ++i)if (tween1[i].name === name) {
                tween1[i] = t;
                break;
            }
            if (i === n) tween1.push(t);
        }
        schedule.tween = tween1;
    };
}
exports.default = function(name, value) {
    var id = this._id;
    name += "";
    if (arguments.length < 2) {
        var tween = (0, _scheduleJs.get)(this.node(), id).tween;
        for(var i = 0, n = tween.length, t; i < n; ++i){
            if ((t = tween[i]).name === name) return t.value;
        }
        return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
};
function tweenValue(transition, name, value) {
    var id = transition._id;
    transition.each(function() {
        var schedule = (0, _scheduleJs.set)(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
        return (0, _scheduleJs.get)(node, id).value[name];
    };
}

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ebJwC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");
exports.default = function(a, b) {
    var c;
    return (typeof b === "number" ? (0, _d3Interpolate.interpolateNumber) : b instanceof (0, _d3Color.color) ? (0, _d3Interpolate.interpolateRgb) : (c = (0, _d3Color.color)(b)) ? (b = c, _d3Interpolate.interpolateRgb) : (0, _d3Interpolate.interpolateString))(a, b);
};

},{"d3-color":"gIpJt","d3-interpolate":"diZln","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bg4BF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
function attrInterpolate(name, i) {
    return function(t) {
        this.setAttribute(name, i.call(this, t));
    };
}
function attrInterpolateNS(fullname, i) {
    return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
}
function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
    }
    tween._value = value;
    return tween;
}
function attrTween(name, value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
    }
    tween._value = value;
    return tween;
}
exports.default = function(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = (0, _d3Selection.namespace)(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
};

},{"d3-selection":"6ZzI7","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7b7N6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
function delayFunction(id, value) {
    return function() {
        (0, _scheduleJs.init)(this, id).delay = +value.apply(this, arguments);
    };
}
function delayConstant(id, value) {
    return value = +value, function() {
        (0, _scheduleJs.init)(this, id).delay = value;
    };
}
exports.default = function(value) {
    var id = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : (0, _scheduleJs.get)(this.node(), id).delay;
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"5ozIM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
function durationFunction(id, value) {
    return function() {
        (0, _scheduleJs.set)(this, id).duration = +value.apply(this, arguments);
    };
}
function durationConstant(id, value) {
    return value = +value, function() {
        (0, _scheduleJs.set)(this, id).duration = value;
    };
}
exports.default = function(value) {
    var id = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : (0, _scheduleJs.get)(this.node(), id).duration;
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hHLWH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
        (0, _scheduleJs.set)(this, id).ease = value;
    };
}
exports.default = function(value) {
    var id = this._id;
    return arguments.length ? this.each(easeConstant(id, value)) : (0, _scheduleJs.get)(this.node(), id).ease;
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cM1wf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
function easeVarying(id, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        (0, _scheduleJs.set)(this, id).ease = v;
    };
}
exports.default = function(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7Y9qP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");
exports.default = function(match) {
    if (typeof match !== "function") match = (0, _d3Selection.matcher)(match);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
    }
    return new (0, _indexJs.Transition)(subgroups, this._parents, this._name, this._id);
};

},{"d3-selection":"6ZzI7","./index.js":"3DFGx","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"a6nHd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
exports.default = function(transition) {
    if (transition._id !== this._id) throw new Error;
    for(var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
        for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
    }
    for(; j < m0; ++j)merges[j] = groups0[j];
    return new (0, _indexJs.Transition)(merges, this._parents, this._name, this._id);
};

},{"./index.js":"3DFGx","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"kGMAv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
    });
}
function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? (0, _scheduleJs.init) : (0, _scheduleJs.set);
    return function() {
        var schedule = sit(this, id), on = schedule.on;
        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
        schedule.on = on1;
    };
}
exports.default = function(name, listener) {
    var id = this._id;
    return arguments.length < 2 ? (0, _scheduleJs.get)(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bYUeL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function removeFunction(id) {
    return function() {
        var parent = this.parentNode;
        for(var i in this.__transition)if (+i !== id) return;
        if (parent) parent.removeChild(this);
    };
}
exports.default = function() {
    return this.on("end.remove", removeFunction(this._id));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"hPLKO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);
exports.default = function(select) {
    var name = this._name, id = this._id;
    if (typeof select !== "function") select = (0, _d3Selection.selector)(select);
    for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            (0, _scheduleJsDefault.default)(subgroup[i], name, id, i, subgroup, (0, _scheduleJs.get)(node, id));
        }
    }
    return new (0, _indexJs.Transition)(subgroups, this._parents, name, id);
};

},{"d3-selection":"6ZzI7","./index.js":"3DFGx","./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bpkiv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);
exports.default = function(select) {
    var name = this._name, id = this._id;
    if (typeof select !== "function") select = (0, _d3Selection.selectorAll)(select);
    for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
            for(var children = select.call(node, node.__data__, i, group), child, inherit = (0, _scheduleJs.get)(node, id), k = 0, l = children.length; k < l; ++k)if (child = children[k]) (0, _scheduleJsDefault.default)(child, name, id, k, children, inherit);
            subgroups.push(children);
            parents.push(node);
        }
    }
    return new (0, _indexJs.Transition)(subgroups, parents, name, id);
};

},{"d3-selection":"6ZzI7","./index.js":"3DFGx","./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"16k7b":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Selection = require("d3-selection");
var Selection = (0, _d3Selection.selection).prototype.constructor;
exports.default = function() {
    return new Selection(this._groups, this._parents);
};

},{"d3-selection":"6ZzI7","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"ktYWG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _scheduleJs = require("./schedule.js");
var _tweenJs = require("./tween.js");
var _interpolateJs = require("./interpolate.js");
var _interpolateJsDefault = parcelHelpers.interopDefault(_interpolateJs);
function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name), string1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
}
function styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function styleConstant(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function styleFunction(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name), value1 = value(this), string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}
function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;
        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
        schedule.on = on1;
    };
}
exports.default = function(name, value, priority) {
    var i = (name += "") === "transform" ? (0, _d3Interpolate.interpolateTransformCss) : (0, _interpolateJsDefault.default);
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, (0, _tweenJs.tweenValue)(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
};

},{"d3-interpolate":"diZln","d3-selection":"6ZzI7","./schedule.js":"5AieB","./tween.js":"7sgUT","./interpolate.js":"ebJwC","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"liUsP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function styleInterpolate(name, i, priority) {
    return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
    };
}
function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
    }
    tween._value = value;
    return tween;
}
exports.default = function(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"7cxtL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tweenJs = require("./tween.js");
function textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function textFunction(value) {
    return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
    };
}
exports.default = function(value) {
    return this.tween("text", typeof value === "function" ? textFunction((0, _tweenJs.tweenValue)(this, "text", value)) : textConstant(value == null ? "" : value + ""));
};

},{"./tween.js":"7sgUT","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cXA6x":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function textInterpolate(i) {
    return function(t) {
        this.textContent = i.call(this, t);
    };
}
function textTween(value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
    }
    tween._value = value;
    return tween;
}
exports.default = function(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"1z7ro":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);
exports.default = function() {
    var name = this._name, id0 = this._id, id1 = (0, _indexJs.newId)();
    for(var groups = this._groups, m = groups.length, j = 0; j < m; ++j){
        for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
            var inherit = (0, _scheduleJs.get)(node, id0);
            (0, _scheduleJsDefault.default)(node, name, id1, i, group, {
                time: inherit.time + inherit.delay + inherit.duration,
                delay: 0,
                duration: inherit.duration,
                ease: inherit.ease
            });
        }
    }
    return new (0, _indexJs.Transition)(groups, this._parents, name, id1);
};

},{"./index.js":"3DFGx","./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"gGxEe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _scheduleJs = require("./schedule.js");
exports.default = function() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
        var cancel = {
            value: reject
        }, end = {
            value: function() {
                if (--size === 0) resolve();
            }
        };
        that.each(function() {
            var schedule = (0, _scheduleJs.set)(this, id), on = schedule.on;
            // If this node shared a dispatch with the previous node,
            // just assign the updated shared dispatch and we’re done!
            // Otherwise, copy-on-write.
            if (on !== on0) {
                on1 = (on0 = on).copy();
                on1._.cancel.push(cancel);
                on1._.interrupt.push(cancel);
                on1._.end.push(end);
            }
            schedule.on = on1;
        });
        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
    });
};

},{"./schedule.js":"5AieB","@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"82hnu":[function(require,module,exports) {
var global = arguments[3];
(function(f) {
    var g;
    module.exports = f();
})(function() {
    var define, module1, exports;
    return (function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = undefined;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a;
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r);
                    }, p, p.exports, r, e, n, t);
                }
                return n[i].exports;
            }
            for(var u = undefined, i = 0; i < t.length; i++)o(t[i]);
            return o;
        }
        return r;
    })()({
        1: [
            function(require, module1, exports) {
                "use strict";
                /**
 * Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
 *
 * Works with anything that has a `length` property and index access properties, including NodeList.
 *
 * @template {unknown} T
 * @param {Array<T> | ({length:number, [number]: T})} list
 * @param {function (item: T, index: number, list:Array<T> | ({length:number, [number]: T})):boolean} predicate
 * @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac `Array.prototype` by default,
 * 				allows injecting a custom implementation in tests
 * @returns {T | undefined}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
 */ function find(list, predicate, ac) {
                    if (ac === undefined) ac = Array.prototype;
                    if (list && typeof ac.find === "function") return ac.find.call(list, predicate);
                    for(var i = 0; i < list.length; i++)if (Object.prototype.hasOwnProperty.call(list, i)) {
                        var item = list[i];
                        if (predicate.call(undefined, item, i, list)) return item;
                    }
                }
                /**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */ function freeze(object, oc) {
                    if (oc === undefined) oc = Object;
                    return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
                }
                /**
 * Since we can not rely on `Object.assign` we provide a simplified version
 * that is sufficient for our needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 *
 * @returns {Object} target
 * @throws TypeError if target is not an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */ function assign(target, source) {
                    if (target === null || typeof target !== "object") throw new TypeError("target is not an object");
                    for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                    return target;
                }
                /**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */ var MIME_TYPE = freeze({
                    /**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */ HTML: "text/html",
                    /**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */ isHTML: function(value) {
                        return value === MIME_TYPE.HTML;
                    },
                    /**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */ XML_APPLICATION: "application/xml",
                    /**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */ XML_TEXT: "text/xml",
                    /**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */ XML_XHTML_APPLICATION: "application/xhtml+xml",
                    /**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */ XML_SVG_IMAGE: "image/svg+xml"
                });
                /**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */ var NAMESPACE = freeze({
                    /**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */ HTML: "http://www.w3.org/1999/xhtml",
                    /**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */ isHTML: function(uri) {
                        return uri === NAMESPACE.HTML;
                    },
                    /**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */ SVG: "http://www.w3.org/2000/svg",
                    /**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */ XML: "http://www.w3.org/XML/1998/namespace",
                    /**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */ XMLNS: "http://www.w3.org/2000/xmlns/"
                });
                exports.assign = assign;
                exports.find = find;
                exports.freeze = freeze;
                exports.MIME_TYPE = MIME_TYPE;
                exports.NAMESPACE = NAMESPACE;
            },
            {}
        ],
        2: [
            function(require, module1, exports) {
                var conventions = require("./conventions");
                var dom = require("./dom");
                var entities = require("./entities");
                var sax = require("./sax");
                var DOMImplementation = dom.DOMImplementation;
                var NAMESPACE = conventions.NAMESPACE;
                var ParseError = sax.ParseError;
                var XMLReader = sax.XMLReader;
                /**
 * Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating all of the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA
 * > 2. the two-character sequence #xD #x85
 * > 3. the single character #x85
 * > 4. the single character #x2028
 * > 5. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 */ function normalizeLineEndings(input) {
                    return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
                }
                /**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */ /**
 * @typedef DOMParserOptions
 * @property {DOMHandler} [domBuilder]
 * @property {Function} [errorHandler]
 * @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
 * 						defaults to `normalizeLineEndings`
 * @property {Locator} [locator]
 * @property {Record<string, string>} [xmlns]
 *
 * @see normalizeLineEndings
 */ /**
 * The DOMParser interface provides the ability to parse XML or HTML source code
 * from a string into a DOM `Document`.
 *
 * _xmldom is different from the spec in that it allows an `options` parameter,
 * to override the default behavior._
 *
 * @param {DOMParserOptions} [options]
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */ function DOMParser(options) {
                    this.options = options || {
                        locator: {}
                    };
                }
                DOMParser.prototype.parseFromString = function(source, mimeType) {
                    var options = this.options;
                    var sax = new XMLReader();
                    var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler
                    var errorHandler = options.errorHandler;
                    var locator = options.locator;
                    var defaultNSMap = options.xmlns || {};
                    var isHTML = /\/x?html?$/.test(mimeType); //mimeType.toLowerCase().indexOf('html') > -1;
                    var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
                    if (locator) domBuilder.setDocumentLocator(locator);
                    sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
                    sax.domBuilder = options.domBuilder || domBuilder;
                    if (isHTML) defaultNSMap[""] = NAMESPACE.HTML;
                    defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
                    var normalize = options.normalizeLineEndings || normalizeLineEndings;
                    if (source && typeof source === "string") sax.parse(normalize(source), defaultNSMap, entityMap);
                    else sax.errorHandler.error("invalid doc source");
                    return domBuilder.doc;
                };
                function buildErrorHandler(errorImpl, domBuilder, locator) {
                    if (!errorImpl) {
                        if (domBuilder instanceof DOMHandler) return domBuilder;
                        errorImpl = domBuilder;
                    }
                    var errorHandler = {};
                    var isCallback = errorImpl instanceof Function;
                    locator = locator || {};
                    function build(key) {
                        var fn = errorImpl[key];
                        if (!fn && isCallback) fn = errorImpl.length == 2 ? function(msg) {
                            errorImpl(key, msg);
                        } : errorImpl;
                        errorHandler[key] = fn && function(msg) {
                            fn("[xmldom " + key + "]	" + msg + _locator(locator));
                        } || function() {};
                    }
                    build("warning");
                    build("error");
                    build("fatalError");
                    return errorHandler;
                }
                //console.log('#\n\n\n\n\n\n\n####')
                /**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */ function DOMHandler() {
                    this.cdata = false;
                }
                function position(locator, node) {
                    node.lineNumber = locator.lineNumber;
                    node.columnNumber = locator.columnNumber;
                }
                /**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ DOMHandler.prototype = {
                    startDocument: function() {
                        this.doc = new DOMImplementation().createDocument(null, null, null);
                        if (this.locator) this.doc.documentURI = this.locator.systemId;
                    },
                    startElement: function(namespaceURI, localName, qName, attrs) {
                        var doc = this.doc;
                        var el = doc.createElementNS(namespaceURI, qName || localName);
                        var len = attrs.length;
                        appendElement(this, el);
                        this.currentElement = el;
                        this.locator && position(this.locator, el);
                        for(var i = 0; i < len; i++){
                            var namespaceURI = attrs.getURI(i);
                            var value = attrs.getValue(i);
                            var qName = attrs.getQName(i);
                            var attr = doc.createAttributeNS(namespaceURI, qName);
                            this.locator && position(attrs.getLocator(i), attr);
                            attr.value = attr.nodeValue = value;
                            el.setAttributeNode(attr);
                        }
                    },
                    endElement: function(namespaceURI, localName, qName) {
                        var current = this.currentElement;
                        var tagName = current.tagName;
                        this.currentElement = current.parentNode;
                    },
                    startPrefixMapping: function(prefix, uri) {},
                    endPrefixMapping: function(prefix) {},
                    processingInstruction: function(target, data) {
                        var ins = this.doc.createProcessingInstruction(target, data);
                        this.locator && position(this.locator, ins);
                        appendElement(this, ins);
                    },
                    ignorableWhitespace: function(ch, start, length) {},
                    characters: function(chars, start, length) {
                        chars = _toString.apply(this, arguments);
                        //console.log(chars)
                        if (chars) {
                            if (this.cdata) var charNode = this.doc.createCDATASection(chars);
                            else var charNode = this.doc.createTextNode(chars);
                            if (this.currentElement) this.currentElement.appendChild(charNode);
                            else if (/^\s*$/.test(chars)) this.doc.appendChild(charNode);
                            this.locator && position(this.locator, charNode);
                        }
                    },
                    skippedEntity: function(name) {},
                    endDocument: function() {
                        this.doc.normalize();
                    },
                    setDocumentLocator: function(locator) {
                        if (this.locator = locator) locator.lineNumber = 0;
                    },
                    //LexicalHandler
                    comment: function(chars, start, length) {
                        chars = _toString.apply(this, arguments);
                        var comm = this.doc.createComment(chars);
                        this.locator && position(this.locator, comm);
                        appendElement(this, comm);
                    },
                    startCDATA: function() {
                        //used in characters() methods
                        this.cdata = true;
                    },
                    endCDATA: function() {
                        this.cdata = false;
                    },
                    startDTD: function(name, publicId, systemId) {
                        var impl = this.doc.implementation;
                        if (impl && impl.createDocumentType) {
                            var dt = impl.createDocumentType(name, publicId, systemId);
                            this.locator && position(this.locator, dt);
                            appendElement(this, dt);
                            this.doc.doctype = dt;
                        }
                    },
                    /**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */ warning: function(error) {
                        console.warn("[xmldom warning]	" + error, _locator(this.locator));
                    },
                    error: function(error) {
                        console.error("[xmldom error]	" + error, _locator(this.locator));
                    },
                    fatalError: function(error) {
                        throw new ParseError(error, this.locator);
                    }
                };
                function _locator(l) {
                    if (l) return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
                }
                function _toString(chars, start, length) {
                    if (typeof chars == "string") return chars.substr(start, length);
                    else {
                        if (chars.length >= start + length || start) return new java.lang.String(chars, start, length) + "";
                        return chars;
                    }
                }
                /*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */ "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
                    DOMHandler.prototype[key] = function() {
                        return null;
                    };
                });
                /* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */ function appendElement(hander, node) {
                    if (!hander.currentElement) hander.doc.appendChild(node);
                    else hander.currentElement.appendChild(node);
                } //appendChild and setAttributeNS are preformance key
                exports.__DOMHandler = DOMHandler;
                exports.normalizeLineEndings = normalizeLineEndings;
                exports.DOMParser = DOMParser;
            },
            {
                "./conventions": 1,
                "./dom": 3,
                "./entities": 4,
                "./sax": 7
            }
        ],
        3: [
            function(require, module1, exports) {
                var conventions = require("./conventions");
                var find = conventions.find;
                var NAMESPACE = conventions.NAMESPACE;
                /**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */ function notEmptyString(input) {
                    return input !== "";
                }
                /**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
 */ function splitOnASCIIWhitespace(input) {
                    // U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
                    return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
                }
                /**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */ function orderedSetReducer(current, element) {
                    if (!current.hasOwnProperty(element)) current[element] = true;
                    return current;
                }
                /**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */ function toOrderedSet(input) {
                    if (!input) return [];
                    var list = splitOnASCIIWhitespace(input);
                    return Object.keys(list.reduce(orderedSetReducer, {}));
                }
                /**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */ function arrayIncludes(list) {
                    return function(element) {
                        return list && list.indexOf(element) !== -1;
                    };
                }
                function copy(src, dest) {
                    for(var p in src)if (Object.prototype.hasOwnProperty.call(src, p)) dest[p] = src[p];
                }
                /**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */ function _extends(Class, Super) {
                    var pt = Class.prototype;
                    if (!(pt instanceof Super)) {
                        function t() {}
                        t.prototype = Super.prototype;
                        t = new t();
                        copy(pt, t);
                        Class.prototype = pt = t;
                    }
                    if (pt.constructor != Class) {
                        if (typeof Class != "function") console.error("unknown Class:" + Class);
                        pt.constructor = Class;
                    }
                }
                // Node Types
                var NodeType = {};
                var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
                var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
                var TEXT_NODE = NodeType.TEXT_NODE = 3;
                var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
                var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
                var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
                var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
                var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
                var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
                var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
                var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
                var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
                // ExceptionCode
                var ExceptionCode = {};
                var ExceptionMessage = {};
                var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
                var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
                var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
                var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
                var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
                var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
                var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
                var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
                var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
                var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
                //level2
                var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
                var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
                var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
                var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
                var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
                /**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */ function DOMException(code, message) {
                    if (message instanceof Error) var error = message;
                    else {
                        error = this;
                        Error.call(this, ExceptionMessage[code]);
                        this.message = ExceptionMessage[code];
                        if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
                    }
                    error.code = code;
                    if (message) this.message = this.message + ": " + message;
                    return error;
                }
                DOMException.prototype = Error.prototype;
                copy(ExceptionCode, DOMException);
                /**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */ function NodeList() {}
                NodeList.prototype = {
                    /**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */ length: 0,
                    /**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
	 */ item: function(index) {
                        return this[index] || null;
                    },
                    toString: function(isHTML, nodeFilter) {
                        for(var buf = [], i = 0; i < this.length; i++)serializeToString(this[i], buf, isHTML, nodeFilter);
                        return buf.join("");
                    },
                    /**
	 * @private
	 * @param {function (Node):boolean} predicate
	 * @returns {Node[]}
	 */ filter: function(predicate) {
                        return Array.prototype.filter.call(this, predicate);
                    },
                    /**
	 * @private
	 * @param {Node} item
	 * @returns {number}
	 */ indexOf: function(item) {
                        return Array.prototype.indexOf.call(this, item);
                    }
                };
                function LiveNodeList(node, refresh) {
                    this._node = node;
                    this._refresh = refresh;
                    _updateLiveList(this);
                }
                function _updateLiveList(list) {
                    var inc = list._node._inc || list._node.ownerDocument._inc;
                    if (list._inc != inc) {
                        var ls = list._refresh(list._node);
                        //console.log(ls.length)
                        __set__(list, "length", ls.length);
                        copy(ls, list);
                        list._inc = inc;
                    }
                }
                LiveNodeList.prototype.item = function(i) {
                    _updateLiveList(this);
                    return this[i];
                };
                _extends(LiveNodeList, NodeList);
                /**
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */ function NamedNodeMap() {}
                function _findNodeIndex(list, node) {
                    var i = list.length;
                    while(i--){
                        if (list[i] === node) return i;
                    }
                }
                function _addNamedNode(el, list, newAttr, oldAttr) {
                    if (oldAttr) list[_findNodeIndex(list, oldAttr)] = newAttr;
                    else list[list.length++] = newAttr;
                    if (el) {
                        newAttr.ownerElement = el;
                        var doc = el.ownerDocument;
                        if (doc) {
                            oldAttr && _onRemoveAttribute(doc, el, oldAttr);
                            _onAddAttribute(doc, el, newAttr);
                        }
                    }
                }
                function _removeNamedNode(el, list, attr) {
                    //console.log('remove attr:'+attr)
                    var i = _findNodeIndex(list, attr);
                    if (i >= 0) {
                        var lastIndex = list.length - 1;
                        while(i < lastIndex)list[i] = list[++i];
                        list.length = lastIndex;
                        if (el) {
                            var doc = el.ownerDocument;
                            if (doc) {
                                _onRemoveAttribute(doc, el, attr);
                                attr.ownerElement = null;
                            }
                        }
                    } else throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
                }
                NamedNodeMap.prototype = {
                    length: 0,
                    item: NodeList.prototype.item,
                    getNamedItem: function(key) {
                        //		if(key.indexOf(':')>0 || key == 'xmlns'){
                        //			return null;
                        //		}
                        //console.log()
                        var i = this.length;
                        while(i--){
                            var attr = this[i];
                            //console.log(attr.nodeName,key)
                            if (attr.nodeName == key) return attr;
                        }
                    },
                    setNamedItem: function(attr) {
                        var el = attr.ownerElement;
                        if (el && el != this._ownerElement) throw new DOMException(INUSE_ATTRIBUTE_ERR);
                        var oldAttr = this.getNamedItem(attr.nodeName);
                        _addNamedNode(this._ownerElement, this, attr, oldAttr);
                        return oldAttr;
                    },
                    /* returns Node */ setNamedItemNS: function(attr) {
                        var el = attr.ownerElement, oldAttr;
                        if (el && el != this._ownerElement) throw new DOMException(INUSE_ATTRIBUTE_ERR);
                        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
                        _addNamedNode(this._ownerElement, this, attr, oldAttr);
                        return oldAttr;
                    },
                    /* returns Node */ removeNamedItem: function(key) {
                        var attr = this.getNamedItem(key);
                        _removeNamedNode(this._ownerElement, this, attr);
                        return attr;
                    },
                    //for level2
                    removeNamedItemNS: function(namespaceURI, localName) {
                        var attr = this.getNamedItemNS(namespaceURI, localName);
                        _removeNamedNode(this._ownerElement, this, attr);
                        return attr;
                    },
                    getNamedItemNS: function(namespaceURI, localName) {
                        var i = this.length;
                        while(i--){
                            var node = this[i];
                            if (node.localName == localName && node.namespaceURI == namespaceURI) return node;
                        }
                        return null;
                    }
                };
                /**
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */ function DOMImplementation() {}
                DOMImplementation.prototype = {
                    /**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */ hasFeature: function(feature, version) {
                        return true;
                    },
                    /**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */ createDocument: function(namespaceURI, qualifiedName, doctype) {
                        var doc = new Document();
                        doc.implementation = this;
                        doc.childNodes = new NodeList();
                        doc.doctype = doctype || null;
                        if (doctype) doc.appendChild(doctype);
                        if (qualifiedName) {
                            var root = doc.createElementNS(namespaceURI, qualifiedName);
                            doc.appendChild(root);
                        }
                        return doc;
                    },
                    /**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */ createDocumentType: function(qualifiedName, publicId, systemId) {
                        var node = new DocumentType();
                        node.name = qualifiedName;
                        node.nodeName = qualifiedName;
                        node.publicId = publicId || "";
                        node.systemId = systemId || "";
                        return node;
                    }
                };
                /**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */ function Node() {}
                Node.prototype = {
                    firstChild: null,
                    lastChild: null,
                    previousSibling: null,
                    nextSibling: null,
                    attributes: null,
                    parentNode: null,
                    childNodes: null,
                    ownerDocument: null,
                    nodeValue: null,
                    namespaceURI: null,
                    prefix: null,
                    localName: null,
                    // Modified in DOM Level 2:
                    insertBefore: function(newChild, refChild) {
                        return _insertBefore(this, newChild, refChild);
                    },
                    replaceChild: function(newChild, oldChild) {
                        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
                        if (oldChild) this.removeChild(oldChild);
                    },
                    removeChild: function(oldChild) {
                        return _removeChild(this, oldChild);
                    },
                    appendChild: function(newChild) {
                        return this.insertBefore(newChild, null);
                    },
                    hasChildNodes: function() {
                        return this.firstChild != null;
                    },
                    cloneNode: function(deep) {
                        return cloneNode(this.ownerDocument || this, this, deep);
                    },
                    // Modified in DOM Level 2:
                    normalize: function() {
                        var child = this.firstChild;
                        while(child){
                            var next = child.nextSibling;
                            if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
                                this.removeChild(next);
                                child.appendData(next.data);
                            } else {
                                child.normalize();
                                child = next;
                            }
                        }
                    },
                    // Introduced in DOM Level 2:
                    isSupported: function(feature, version) {
                        return this.ownerDocument.implementation.hasFeature(feature, version);
                    },
                    // Introduced in DOM Level 2:
                    hasAttributes: function() {
                        return this.attributes.length > 0;
                    },
                    /**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */ lookupPrefix: function(namespaceURI) {
                        var el = this;
                        while(el){
                            var map = el._nsMap;
                            //console.dir(map)
                            if (map) for(var n in map){
                                if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) return n;
                            }
                            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
                        }
                        return null;
                    },
                    // Introduced in DOM Level 3:
                    lookupNamespaceURI: function(prefix) {
                        var el = this;
                        while(el){
                            var map = el._nsMap;
                            //console.dir(map)
                            if (map) {
                                if (Object.prototype.hasOwnProperty.call(map, prefix)) return map[prefix];
                            }
                            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
                        }
                        return null;
                    },
                    // Introduced in DOM Level 3:
                    isDefaultNamespace: function(namespaceURI) {
                        var prefix = this.lookupPrefix(namespaceURI);
                        return prefix == null;
                    }
                };
                function _xmlEncoder(c) {
                    return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
                }
                copy(NodeType, Node);
                copy(NodeType, Node.prototype);
                /**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */ function _visitNode(node, callback) {
                    if (callback(node)) return true;
                    if (node = node.firstChild) do {
                        if (_visitNode(node, callback)) return true;
                    }while (node = node.nextSibling);
                }
                function Document() {
                    this.ownerDocument = this;
                }
                function _onAddAttribute(doc, el, newAttr) {
                    doc && doc._inc++;
                    var ns = newAttr.namespaceURI;
                    if (ns === NAMESPACE.XMLNS) //update namespace
                    el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
                }
                function _onRemoveAttribute(doc, el, newAttr, remove) {
                    doc && doc._inc++;
                    var ns = newAttr.namespaceURI;
                    if (ns === NAMESPACE.XMLNS) //update namespace
                    delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
                }
                /**
 * Updates `el.childNodes`, updating the indexed items and it's `length`.
 * Passing `newChild` means it will be appended.
 * Otherwise it's assumed that an item has been removed,
 * and `el.firstNode` and it's `.nextSibling` are used
 * to walk the current list of child nodes.
 *
 * @param {Document} doc
 * @param {Node} el
 * @param {Node} [newChild]
 * @private
 */ function _onUpdateChild(doc, el, newChild) {
                    if (doc && doc._inc) {
                        doc._inc++;
                        //update childNodes
                        var cs = el.childNodes;
                        if (newChild) cs[cs.length++] = newChild;
                        else {
                            var child = el.firstChild;
                            var i = 0;
                            while(child){
                                cs[i++] = child;
                                child = child.nextSibling;
                            }
                            cs.length = i;
                            delete cs[cs.length];
                        }
                    }
                }
                /**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 *
 * @param {Node} parentNode
 * @param {Node} child
 * @returns {Node} the child that was removed.
 * @private
 */ function _removeChild(parentNode, child) {
                    var previous = child.previousSibling;
                    var next = child.nextSibling;
                    if (previous) previous.nextSibling = next;
                    else parentNode.firstChild = next;
                    if (next) next.previousSibling = previous;
                    else parentNode.lastChild = previous;
                    child.parentNode = null;
                    child.previousSibling = null;
                    child.nextSibling = null;
                    _onUpdateChild(parentNode.ownerDocument, parentNode);
                    return child;
                }
                /**
 * Returns `true` if `node` can be a parent for insertion.
 * @param {Node} node
 * @returns {boolean}
 */ function hasValidParentNodeType(node) {
                    return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
                }
                /**
 * Returns `true` if `node` can be inserted according to it's `nodeType`.
 * @param {Node} node
 * @returns {boolean}
 */ function hasInsertableNodeType(node) {
                    return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
                }
                /**
 * Returns true if `node` is a DOCTYPE node
 * @param {Node} node
 * @returns {boolean}
 */ function isDocTypeNode(node) {
                    return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
                }
                /**
 * Returns true if the node is an element
 * @param {Node} node
 * @returns {boolean}
 */ function isElementNode(node) {
                    return node && node.nodeType === Node.ELEMENT_NODE;
                }
                /**
 * Returns true if `node` is a text node
 * @param {Node} node
 * @returns {boolean}
 */ function isTextNode(node) {
                    return node && node.nodeType === Node.TEXT_NODE;
                }
                /**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Document} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */ function isElementInsertionPossible(doc, child) {
                    var parentChildNodes = doc.childNodes || [];
                    if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) return false;
                    var docTypeNode = find(parentChildNodes, isDocTypeNode);
                    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
                }
                /**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Node} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */ function isElementReplacementPossible(doc, child) {
                    var parentChildNodes = doc.childNodes || [];
                    function hasElementChildThatIsNotChild(node) {
                        return isElementNode(node) && node !== child;
                    }
                    if (find(parentChildNodes, hasElementChildThatIsNotChild)) return false;
                    var docTypeNode = find(parentChildNodes, isDocTypeNode);
                    return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
                }
                /**
 * @private
 * Steps 1-5 of the checks before inserting and before replacing a child are the same.
 *
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */ function assertPreInsertionValidity1to5(parent, node, child) {
                    // 1. If `parent` is not a Document, DocumentFragment, or Element node, then throw a "HierarchyRequestError" DOMException.
                    if (!hasValidParentNodeType(parent)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
                    // 2. If `node` is a host-including inclusive ancestor of `parent`, then throw a "HierarchyRequestError" DOMException.
                    // not implemented!
                    // 3. If `child` is non-null and its parent is not `parent`, then throw a "NotFoundError" DOMException.
                    if (child && child.parentNode !== parent) throw new DOMException(NOT_FOUND_ERR, "child not in parent");
                    if (// 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
                    !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
                    // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
                    // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
                    // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
                    isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE) throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType);
                }
                /**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */ function assertPreInsertionValidityInDocument(parent, node, child) {
                    var parentChildNodes = parent.childNodes || [];
                    var nodeChildNodes = node.childNodes || [];
                    // DocumentFragment
                    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                        var nodeChildElements = nodeChildNodes.filter(isElementNode);
                        // If node has more than one element child or has a Text node child.
                        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
                        // Otherwise, if `node` has one element child and either `parent` has an element child,
                        // `child` is a doctype, or `child` is non-null and a doctype is following `child`.
                        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
                    }
                    // Element
                    if (isElementNode(node)) {
                        // `parent` has an element child, `child` is a doctype,
                        // or `child` is non-null and a doctype is following `child`.
                        if (!isElementInsertionPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
                    }
                    // DocumentType
                    if (isDocTypeNode(node)) {
                        // `parent` has a doctype child,
                        if (find(parentChildNodes, isDocTypeNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
                        var parentElementChild = find(parentChildNodes, isElementNode);
                        // `child` is non-null and an element is preceding `child`,
                        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
                        // or `child` is null and `parent` has an element child.
                        if (!child && parentElementChild) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
                    }
                }
                /**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */ function assertPreReplacementValidityInDocument(parent, node, child) {
                    var parentChildNodes = parent.childNodes || [];
                    var nodeChildNodes = node.childNodes || [];
                    // DocumentFragment
                    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                        var nodeChildElements = nodeChildNodes.filter(isElementNode);
                        // If `node` has more than one element child or has a Text node child.
                        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
                        // Otherwise, if `node` has one element child and either `parent` has an element child that is not `child` or a doctype is following `child`.
                        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
                    }
                    // Element
                    if (isElementNode(node)) {
                        // `parent` has an element child that is not `child` or a doctype is following `child`.
                        if (!isElementReplacementPossible(parent, child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
                    }
                    // DocumentType
                    if (isDocTypeNode(node)) {
                        function hasDoctypeChildThatIsNotChild(node) {
                            return isDocTypeNode(node) && node !== child;
                        }
                        // `parent` has a doctype child that is not `child`,
                        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
                        var parentElementChild = find(parentChildNodes, isElementNode);
                        // or an element is preceding `child`.
                        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
                    }
                }
                /**
 * @private
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */ function _insertBefore(parent, node, child, _inDocumentAssertion) {
                    // To ensure pre-insertion validity of a node into a parent before a child, run these steps:
                    assertPreInsertionValidity1to5(parent, node, child);
                    // If parent is a document, and any of the statements below, switched on the interface node implements,
                    // are true, then throw a "HierarchyRequestError" DOMException.
                    if (parent.nodeType === Node.DOCUMENT_NODE) (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
                    var cp = node.parentNode;
                    if (cp) cp.removeChild(node); //remove and update
                    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
                        var newFirst = node.firstChild;
                        if (newFirst == null) return node;
                        var newLast = node.lastChild;
                    } else newFirst = newLast = node;
                    var pre = child ? child.previousSibling : parent.lastChild;
                    newFirst.previousSibling = pre;
                    newLast.nextSibling = child;
                    if (pre) pre.nextSibling = newFirst;
                    else parent.firstChild = newFirst;
                    if (child == null) parent.lastChild = newLast;
                    else child.previousSibling = newLast;
                    do newFirst.parentNode = parent;
                    while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
                    _onUpdateChild(parent.ownerDocument || parent, parent);
                    //console.log(parent.lastChild.nextSibling == null)
                    if (node.nodeType == DOCUMENT_FRAGMENT_NODE) node.firstChild = node.lastChild = null;
                    return node;
                }
                /**
 * Appends `newChild` to `parentNode`.
 * If `newChild` is already connected to a `parentNode` it is first removed from it.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 * @param {Node} parentNode
 * @param {Node} newChild
 * @returns {Node}
 * @private
 */ function _appendSingleChild(parentNode, newChild) {
                    if (newChild.parentNode) newChild.parentNode.removeChild(newChild);
                    newChild.parentNode = parentNode;
                    newChild.previousSibling = parentNode.lastChild;
                    newChild.nextSibling = null;
                    if (newChild.previousSibling) newChild.previousSibling.nextSibling = newChild;
                    else parentNode.firstChild = newChild;
                    parentNode.lastChild = newChild;
                    _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
                    return newChild;
                }
                Document.prototype = {
                    //implementation : null,
                    nodeName: "#document",
                    nodeType: DOCUMENT_NODE,
                    /**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */ doctype: null,
                    documentElement: null,
                    _inc: 1,
                    insertBefore: function(newChild, refChild) {
                        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
                            var child = newChild.firstChild;
                            while(child){
                                var next = child.nextSibling;
                                this.insertBefore(child, refChild);
                                child = next;
                            }
                            return newChild;
                        }
                        _insertBefore(this, newChild, refChild);
                        newChild.ownerDocument = this;
                        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) this.documentElement = newChild;
                        return newChild;
                    },
                    removeChild: function(oldChild) {
                        if (this.documentElement == oldChild) this.documentElement = null;
                        return _removeChild(this, oldChild);
                    },
                    replaceChild: function(newChild, oldChild) {
                        //raises
                        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
                        newChild.ownerDocument = this;
                        if (oldChild) this.removeChild(oldChild);
                        if (isElementNode(newChild)) this.documentElement = newChild;
                    },
                    // Introduced in DOM Level 2:
                    importNode: function(importedNode, deep) {
                        return importNode(this, importedNode, deep);
                    },
                    // Introduced in DOM Level 2:
                    getElementById: function(id) {
                        var rtv = null;
                        _visitNode(this.documentElement, function(node) {
                            if (node.nodeType == ELEMENT_NODE) {
                                if (node.getAttribute("id") == id) {
                                    rtv = node;
                                    return true;
                                }
                            }
                        });
                        return rtv;
                    },
                    /**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */ getElementsByClassName: function(classNames) {
                        var classNamesSet = toOrderedSet(classNames);
                        return new LiveNodeList(this, function(base) {
                            var ls = [];
                            if (classNamesSet.length > 0) _visitNode(base.documentElement, function(node) {
                                if (node !== base && node.nodeType === ELEMENT_NODE) {
                                    var nodeClassNames = node.getAttribute("class");
                                    // can be null if the attribute does not exist
                                    if (nodeClassNames) {
                                        // before splitting and iterating just compare them for the most common case
                                        var matches = classNames === nodeClassNames;
                                        if (!matches) {
                                            var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                                            matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                                        }
                                        if (matches) ls.push(node);
                                    }
                                }
                            });
                            return ls;
                        });
                    },
                    //document factory method:
                    createElement: function(tagName) {
                        var node = new Element();
                        node.ownerDocument = this;
                        node.nodeName = tagName;
                        node.tagName = tagName;
                        node.localName = tagName;
                        node.childNodes = new NodeList();
                        var attrs = node.attributes = new NamedNodeMap();
                        attrs._ownerElement = node;
                        return node;
                    },
                    createDocumentFragment: function() {
                        var node = new DocumentFragment();
                        node.ownerDocument = this;
                        node.childNodes = new NodeList();
                        return node;
                    },
                    createTextNode: function(data) {
                        var node = new Text();
                        node.ownerDocument = this;
                        node.appendData(data);
                        return node;
                    },
                    createComment: function(data) {
                        var node = new Comment();
                        node.ownerDocument = this;
                        node.appendData(data);
                        return node;
                    },
                    createCDATASection: function(data) {
                        var node = new CDATASection();
                        node.ownerDocument = this;
                        node.appendData(data);
                        return node;
                    },
                    createProcessingInstruction: function(target, data) {
                        var node = new ProcessingInstruction();
                        node.ownerDocument = this;
                        node.tagName = node.target = target;
                        node.nodeValue = node.data = data;
                        return node;
                    },
                    createAttribute: function(name) {
                        var node = new Attr();
                        node.ownerDocument = this;
                        node.name = name;
                        node.nodeName = name;
                        node.localName = name;
                        node.specified = true;
                        return node;
                    },
                    createEntityReference: function(name) {
                        var node = new EntityReference();
                        node.ownerDocument = this;
                        node.nodeName = name;
                        return node;
                    },
                    // Introduced in DOM Level 2:
                    createElementNS: function(namespaceURI, qualifiedName) {
                        var node = new Element();
                        var pl = qualifiedName.split(":");
                        var attrs = node.attributes = new NamedNodeMap();
                        node.childNodes = new NodeList();
                        node.ownerDocument = this;
                        node.nodeName = qualifiedName;
                        node.tagName = qualifiedName;
                        node.namespaceURI = namespaceURI;
                        if (pl.length == 2) {
                            node.prefix = pl[0];
                            node.localName = pl[1];
                        } else //el.prefix = null;
                        node.localName = qualifiedName;
                        attrs._ownerElement = node;
                        return node;
                    },
                    // Introduced in DOM Level 2:
                    createAttributeNS: function(namespaceURI, qualifiedName) {
                        var node = new Attr();
                        var pl = qualifiedName.split(":");
                        node.ownerDocument = this;
                        node.nodeName = qualifiedName;
                        node.name = qualifiedName;
                        node.namespaceURI = namespaceURI;
                        node.specified = true;
                        if (pl.length == 2) {
                            node.prefix = pl[0];
                            node.localName = pl[1];
                        } else //el.prefix = null;
                        node.localName = qualifiedName;
                        return node;
                    }
                };
                _extends(Document, Node);
                function Element() {
                    this._nsMap = {};
                }
                Element.prototype = {
                    nodeType: ELEMENT_NODE,
                    hasAttribute: function(name) {
                        return this.getAttributeNode(name) != null;
                    },
                    getAttribute: function(name) {
                        var attr = this.getAttributeNode(name);
                        return attr && attr.value || "";
                    },
                    getAttributeNode: function(name) {
                        return this.attributes.getNamedItem(name);
                    },
                    setAttribute: function(name, value) {
                        var attr = this.ownerDocument.createAttribute(name);
                        attr.value = attr.nodeValue = "" + value;
                        this.setAttributeNode(attr);
                    },
                    removeAttribute: function(name) {
                        var attr = this.getAttributeNode(name);
                        attr && this.removeAttributeNode(attr);
                    },
                    //four real opeartion method
                    appendChild: function(newChild) {
                        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) return this.insertBefore(newChild, null);
                        else return _appendSingleChild(this, newChild);
                    },
                    setAttributeNode: function(newAttr) {
                        return this.attributes.setNamedItem(newAttr);
                    },
                    setAttributeNodeNS: function(newAttr) {
                        return this.attributes.setNamedItemNS(newAttr);
                    },
                    removeAttributeNode: function(oldAttr) {
                        //console.log(this == oldAttr.ownerElement)
                        return this.attributes.removeNamedItem(oldAttr.nodeName);
                    },
                    //get real attribute name,and remove it by removeAttributeNode
                    removeAttributeNS: function(namespaceURI, localName) {
                        var old = this.getAttributeNodeNS(namespaceURI, localName);
                        old && this.removeAttributeNode(old);
                    },
                    hasAttributeNS: function(namespaceURI, localName) {
                        return this.getAttributeNodeNS(namespaceURI, localName) != null;
                    },
                    getAttributeNS: function(namespaceURI, localName) {
                        var attr = this.getAttributeNodeNS(namespaceURI, localName);
                        return attr && attr.value || "";
                    },
                    setAttributeNS: function(namespaceURI, qualifiedName, value) {
                        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
                        attr.value = attr.nodeValue = "" + value;
                        this.setAttributeNode(attr);
                    },
                    getAttributeNodeNS: function(namespaceURI, localName) {
                        return this.attributes.getNamedItemNS(namespaceURI, localName);
                    },
                    getElementsByTagName: function(tagName) {
                        return new LiveNodeList(this, function(base) {
                            var ls = [];
                            _visitNode(base, function(node) {
                                if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) ls.push(node);
                            });
                            return ls;
                        });
                    },
                    getElementsByTagNameNS: function(namespaceURI, localName) {
                        return new LiveNodeList(this, function(base) {
                            var ls = [];
                            _visitNode(base, function(node) {
                                if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) ls.push(node);
                            });
                            return ls;
                        });
                    }
                };
                Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
                Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
                _extends(Element, Node);
                function Attr() {}
                Attr.prototype.nodeType = ATTRIBUTE_NODE;
                _extends(Attr, Node);
                function CharacterData() {}
                CharacterData.prototype = {
                    data: "",
                    substringData: function(offset, count) {
                        return this.data.substring(offset, offset + count);
                    },
                    appendData: function(text) {
                        text = this.data + text;
                        this.nodeValue = this.data = text;
                        this.length = text.length;
                    },
                    insertData: function(offset, text) {
                        this.replaceData(offset, 0, text);
                    },
                    appendChild: function(newChild) {
                        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
                    },
                    deleteData: function(offset, count) {
                        this.replaceData(offset, count, "");
                    },
                    replaceData: function(offset, count, text) {
                        var start = this.data.substring(0, offset);
                        var end = this.data.substring(offset + count);
                        text = start + text + end;
                        this.nodeValue = this.data = text;
                        this.length = text.length;
                    }
                };
                _extends(CharacterData, Node);
                function Text() {}
                Text.prototype = {
                    nodeName: "#text",
                    nodeType: TEXT_NODE,
                    splitText: function(offset) {
                        var text = this.data;
                        var newText = text.substring(offset);
                        text = text.substring(0, offset);
                        this.data = this.nodeValue = text;
                        this.length = text.length;
                        var newNode = this.ownerDocument.createTextNode(newText);
                        if (this.parentNode) this.parentNode.insertBefore(newNode, this.nextSibling);
                        return newNode;
                    }
                };
                _extends(Text, CharacterData);
                function Comment() {}
                Comment.prototype = {
                    nodeName: "#comment",
                    nodeType: COMMENT_NODE
                };
                _extends(Comment, CharacterData);
                function CDATASection() {}
                CDATASection.prototype = {
                    nodeName: "#cdata-section",
                    nodeType: CDATA_SECTION_NODE
                };
                _extends(CDATASection, CharacterData);
                function DocumentType() {}
                DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
                _extends(DocumentType, Node);
                function Notation() {}
                Notation.prototype.nodeType = NOTATION_NODE;
                _extends(Notation, Node);
                function Entity() {}
                Entity.prototype.nodeType = ENTITY_NODE;
                _extends(Entity, Node);
                function EntityReference() {}
                EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
                _extends(EntityReference, Node);
                function DocumentFragment() {}
                DocumentFragment.prototype.nodeName = "#document-fragment";
                DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
                _extends(DocumentFragment, Node);
                function ProcessingInstruction() {}
                ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
                _extends(ProcessingInstruction, Node);
                function XMLSerializer() {}
                XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
                    return nodeSerializeToString.call(node, isHtml, nodeFilter);
                };
                Node.prototype.toString = nodeSerializeToString;
                function nodeSerializeToString(isHtml, nodeFilter) {
                    var buf = [];
                    var refNode = this.nodeType == 9 && this.documentElement || this;
                    var prefix = refNode.prefix;
                    var uri = refNode.namespaceURI;
                    if (uri && prefix == null) {
                        //console.log(prefix)
                        var prefix = refNode.lookupPrefix(uri);
                        if (prefix == null) //isHTML = true;
                        var visibleNamespaces = [
                            {
                                namespace: uri,
                                prefix: null
                            }
                        ];
                    }
                    serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
                    //console.log('###',this.nodeType,uri,prefix,buf.join(''))
                    return buf.join("");
                }
                function needNamespaceDefine(node, isHTML, visibleNamespaces) {
                    var prefix = node.prefix || "";
                    var uri = node.namespaceURI;
                    // According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
                    // and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
                    // > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
                    // in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
                    // and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
                    // > [...] Furthermore, the attribute value [...] must not be an empty string.
                    // so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
                    if (!uri) return false;
                    if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) return false;
                    var i = visibleNamespaces.length;
                    while(i--){
                        var ns = visibleNamespaces[i];
                        // get namespace prefix
                        if (ns.prefix === prefix) return ns.namespace !== uri;
                    }
                    return true;
                }
                /**
 * Well-formed constraint: No < in Attribute Values
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 *
 * Literal whitespace other than space that appear in attribute values
 * are serialized as their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces)
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 */ function addSerializedAttribute(buf, qualifiedName, value) {
                    buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
                }
                function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
                    if (!visibleNamespaces) visibleNamespaces = [];
                    if (nodeFilter) {
                        node = nodeFilter(node);
                        if (node) {
                            if (typeof node == "string") {
                                buf.push(node);
                                return;
                            }
                        } else return;
                    //buf.sort.apply(attrs, attributeSorter);
                    }
                    switch(node.nodeType){
                        case ELEMENT_NODE:
                            var attrs = node.attributes;
                            var len = attrs.length;
                            var child = node.firstChild;
                            var nodeName = node.tagName;
                            isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
                            var prefixedNodeName = nodeName;
                            if (!isHTML && !node.prefix && node.namespaceURI) {
                                var defaultNS;
                                // lookup current default ns from `xmlns` attribute
                                for(var ai = 0; ai < attrs.length; ai++)if (attrs.item(ai).name === "xmlns") {
                                    defaultNS = attrs.item(ai).value;
                                    break;
                                }
                                if (!defaultNS) // lookup current default ns in visibleNamespaces
                                for(var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--){
                                    var namespace = visibleNamespaces[nsi];
                                    if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                                        defaultNS = namespace.namespace;
                                        break;
                                    }
                                }
                                if (defaultNS !== node.namespaceURI) for(var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--){
                                    var namespace = visibleNamespaces[nsi];
                                    if (namespace.namespace === node.namespaceURI) {
                                        if (namespace.prefix) prefixedNodeName = namespace.prefix + ":" + nodeName;
                                        break;
                                    }
                                }
                            }
                            buf.push("<", prefixedNodeName);
                            for(var i = 0; i < len; i++){
                                // add namespaces for attributes
                                var attr = attrs.item(i);
                                if (attr.prefix == "xmlns") visibleNamespaces.push({
                                    prefix: attr.localName,
                                    namespace: attr.value
                                });
                                else if (attr.nodeName == "xmlns") visibleNamespaces.push({
                                    prefix: "",
                                    namespace: attr.value
                                });
                            }
                            for(var i = 0; i < len; i++){
                                var attr = attrs.item(i);
                                if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
                                    var prefix = attr.prefix || "";
                                    var uri = attr.namespaceURI;
                                    addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
                                    visibleNamespaces.push({
                                        prefix: prefix,
                                        namespace: uri
                                    });
                                }
                                serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
                            }
                            // add namespace for current node
                            if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
                                var prefix = node.prefix || "";
                                var uri = node.namespaceURI;
                                addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
                                visibleNamespaces.push({
                                    prefix: prefix,
                                    namespace: uri
                                });
                            }
                            if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
                                buf.push(">");
                                //if is cdata child node
                                if (isHTML && /^script$/i.test(nodeName)) while(child){
                                    if (child.data) buf.push(child.data);
                                    else serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                                    child = child.nextSibling;
                                }
                                else while(child){
                                    serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                                    child = child.nextSibling;
                                }
                                buf.push("</", prefixedNodeName, ">");
                            } else buf.push("/>");
                            // remove added visible namespaces
                            //visibleNamespaces.length = startVisibleNamespaces;
                            return;
                        case DOCUMENT_NODE:
                        case DOCUMENT_FRAGMENT_NODE:
                            var child = node.firstChild;
                            while(child){
                                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                                child = child.nextSibling;
                            }
                            return;
                        case ATTRIBUTE_NODE:
                            return addSerializedAttribute(buf, node.name, node.value);
                        case TEXT_NODE:
                            /**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
		 */ return buf.push(node.data.replace(/[<&>]/g, _xmlEncoder));
                        case CDATA_SECTION_NODE:
                            return buf.push("<![CDATA[", node.data, "]]>");
                        case COMMENT_NODE:
                            return buf.push("<!--", node.data, "-->");
                        case DOCUMENT_TYPE_NODE:
                            var pubid = node.publicId;
                            var sysid = node.systemId;
                            buf.push("<!DOCTYPE ", node.name);
                            if (pubid) {
                                buf.push(" PUBLIC ", pubid);
                                if (sysid && sysid != ".") buf.push(" ", sysid);
                                buf.push(">");
                            } else if (sysid && sysid != ".") buf.push(" SYSTEM ", sysid, ">");
                            else {
                                var sub = node.internalSubset;
                                if (sub) buf.push(" [", sub, "]");
                                buf.push(">");
                            }
                            return;
                        case PROCESSING_INSTRUCTION_NODE:
                            return buf.push("<?", node.target, " ", node.data, "?>");
                        case ENTITY_REFERENCE_NODE:
                            return buf.push("&", node.nodeName, ";");
                        //case ENTITY_NODE:
                        //case NOTATION_NODE:
                        default:
                            buf.push("??", node.nodeName);
                    }
                }
                function importNode(doc, node, deep) {
                    var node2;
                    switch(node.nodeType){
                        case ELEMENT_NODE:
                            node2 = node.cloneNode(false);
                            node2.ownerDocument = doc;
                        //var attrs = node2.attributes;
                        //var len = attrs.length;
                        //for(var i=0;i<len;i++){
                        //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
                        //}
                        case DOCUMENT_FRAGMENT_NODE:
                            break;
                        case ATTRIBUTE_NODE:
                            deep = true;
                            break;
                    }
                    if (!node2) node2 = node.cloneNode(false); //false
                    node2.ownerDocument = doc;
                    node2.parentNode = null;
                    if (deep) {
                        var child = node.firstChild;
                        while(child){
                            node2.appendChild(importNode(doc, child, deep));
                            child = child.nextSibling;
                        }
                    }
                    return node2;
                }
                //
                //var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
                //					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
                function cloneNode(doc, node, deep) {
                    var node2 = new node.constructor();
                    for(var n in node)if (Object.prototype.hasOwnProperty.call(node, n)) {
                        var v = node[n];
                        if (typeof v != "object") {
                            if (v != node2[n]) node2[n] = v;
                        }
                    }
                    if (node.childNodes) node2.childNodes = new NodeList();
                    node2.ownerDocument = doc;
                    switch(node2.nodeType){
                        case ELEMENT_NODE:
                            var attrs = node.attributes;
                            var attrs2 = node2.attributes = new NamedNodeMap();
                            var len = attrs.length;
                            attrs2._ownerElement = node2;
                            for(var i = 0; i < len; i++)node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
                            break;
                        case ATTRIBUTE_NODE:
                            deep = true;
                    }
                    if (deep) {
                        var child = node.firstChild;
                        while(child){
                            node2.appendChild(cloneNode(doc, child, deep));
                            child = child.nextSibling;
                        }
                    }
                    return node2;
                }
                function __set__(object, key, value) {
                    object[key] = value;
                }
                //do dynamic
                try {
                    if (Object.defineProperty) {
                        Object.defineProperty(LiveNodeList.prototype, "length", {
                            get: function() {
                                _updateLiveList(this);
                                return this.$$length;
                            }
                        });
                        Object.defineProperty(Node.prototype, "textContent", {
                            get: function() {
                                return getTextContent(this);
                            },
                            set: function(data) {
                                switch(this.nodeType){
                                    case ELEMENT_NODE:
                                    case DOCUMENT_FRAGMENT_NODE:
                                        while(this.firstChild)this.removeChild(this.firstChild);
                                        if (data || String(data)) this.appendChild(this.ownerDocument.createTextNode(data));
                                        break;
                                    default:
                                        this.data = data;
                                        this.value = data;
                                        this.nodeValue = data;
                                }
                            }
                        });
                        function getTextContent(node) {
                            switch(node.nodeType){
                                case ELEMENT_NODE:
                                case DOCUMENT_FRAGMENT_NODE:
                                    var buf = [];
                                    node = node.firstChild;
                                    while(node){
                                        if (node.nodeType !== 7 && node.nodeType !== 8) buf.push(getTextContent(node));
                                        node = node.nextSibling;
                                    }
                                    return buf.join("");
                                default:
                                    return node.nodeValue;
                            }
                        }
                        __set__ = function(object, key, value) {
                            //console.log(value)
                            object["$$" + key] = value;
                        };
                    }
                } catch (e) {}
                var DOMhelper = require("./helper").DOMHelper;
                [
                    Document,
                    DocumentFragment,
                    Element
                ].forEach(function(Class) {
                    Class.prototype.querySelector = function(selectors) {
                        return DOMhelper(this).first(String(selectors), this);
                    };
                    Class.prototype.querySelectorAll = function(selectors) {
                        return DOMhelper(this).select(String(selectors), this);
                    };
                });
                Element.prototype.matches = function(selectors) {
                    return DOMhelper(this).match(this, selectors);
                };
                //if(typeof require == 'function'){
                exports.DocumentType = DocumentType;
                exports.DOMException = DOMException;
                exports.DOMImplementation = DOMImplementation;
                exports.Element = Element;
                exports.Node = Node;
                exports.NodeList = NodeList;
                exports.XMLSerializer = XMLSerializer;
            //}
            },
            {
                "./conventions": 1,
                "./helper": 5
            }
        ],
        4: [
            function(require, module1, exports) {
                var freeze = require("./conventions").freeze;
                /**
 * The entities that are predefined in every XML document.
 *
 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
 */ exports.XML_ENTITIES = freeze({
                    amp: "&",
                    apos: "'",
                    gt: ">",
                    lt: "<",
                    quot: '"'
                });
                /**
 * A map of currently 241 entities that are detected in an HTML document.
 * They contain all entries from `XML_ENTITIES`.
 *
 * @see XML_ENTITIES
 * @see DOMParser.parseFromString
 * @see DOMImplementation.prototype.createHTMLDocument
 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
 */ exports.HTML_ENTITIES = freeze({
                    lt: "<",
                    gt: ">",
                    amp: "&",
                    quot: '"',
                    apos: "'",
                    Agrave: "\xc0",
                    Aacute: "\xc1",
                    Acirc: "\xc2",
                    Atilde: "\xc3",
                    Auml: "\xc4",
                    Aring: "\xc5",
                    AElig: "\xc6",
                    Ccedil: "\xc7",
                    Egrave: "\xc8",
                    Eacute: "\xc9",
                    Ecirc: "\xca",
                    Euml: "\xcb",
                    Igrave: "\xcc",
                    Iacute: "\xcd",
                    Icirc: "\xce",
                    Iuml: "\xcf",
                    ETH: "\xd0",
                    Ntilde: "\xd1",
                    Ograve: "\xd2",
                    Oacute: "\xd3",
                    Ocirc: "\xd4",
                    Otilde: "\xd5",
                    Ouml: "\xd6",
                    Oslash: "\xd8",
                    Ugrave: "\xd9",
                    Uacute: "\xda",
                    Ucirc: "\xdb",
                    Uuml: "\xdc",
                    Yacute: "\xdd",
                    THORN: "\xde",
                    szlig: "\xdf",
                    agrave: "\xe0",
                    aacute: "\xe1",
                    acirc: "\xe2",
                    atilde: "\xe3",
                    auml: "\xe4",
                    aring: "\xe5",
                    aelig: "\xe6",
                    ccedil: "\xe7",
                    egrave: "\xe8",
                    eacute: "\xe9",
                    ecirc: "\xea",
                    euml: "\xeb",
                    igrave: "\xec",
                    iacute: "\xed",
                    icirc: "\xee",
                    iuml: "\xef",
                    eth: "\xf0",
                    ntilde: "\xf1",
                    ograve: "\xf2",
                    oacute: "\xf3",
                    ocirc: "\xf4",
                    otilde: "\xf5",
                    ouml: "\xf6",
                    oslash: "\xf8",
                    ugrave: "\xf9",
                    uacute: "\xfa",
                    ucirc: "\xfb",
                    uuml: "\xfc",
                    yacute: "\xfd",
                    thorn: "\xfe",
                    yuml: "\xff",
                    nbsp: "\xa0",
                    iexcl: "\xa1",
                    cent: "\xa2",
                    pound: "\xa3",
                    curren: "\xa4",
                    yen: "\xa5",
                    brvbar: "\xa6",
                    sect: "\xa7",
                    uml: "\xa8",
                    copy: "\xa9",
                    ordf: "\xaa",
                    laquo: "\xab",
                    not: "\xac",
                    shy: "\xad\xad",
                    reg: "\xae",
                    macr: "\xaf",
                    deg: "\xb0",
                    plusmn: "\xb1",
                    sup2: "\xb2",
                    sup3: "\xb3",
                    acute: "\xb4",
                    micro: "\xb5",
                    para: "\xb6",
                    middot: "\xb7",
                    cedil: "\xb8",
                    sup1: "\xb9",
                    ordm: "\xba",
                    raquo: "\xbb",
                    frac14: "\xbc",
                    frac12: "\xbd",
                    frac34: "\xbe",
                    iquest: "\xbf",
                    times: "\xd7",
                    divide: "\xf7",
                    forall: "∀",
                    part: "∂",
                    exist: "∃",
                    empty: "∅",
                    nabla: "∇",
                    isin: "∈",
                    notin: "∉",
                    ni: "∋",
                    prod: "∏",
                    sum: "∑",
                    minus: "−",
                    lowast: "∗",
                    radic: "√",
                    prop: "∝",
                    infin: "∞",
                    ang: "∠",
                    and: "∧",
                    or: "∨",
                    cap: "∩",
                    cup: "∪",
                    "int": "∫",
                    there4: "∴",
                    sim: "∼",
                    cong: "≅",
                    asymp: "≈",
                    ne: "≠",
                    equiv: "≡",
                    le: "≤",
                    ge: "≥",
                    sub: "⊂",
                    sup: "⊃",
                    nsub: "⊄",
                    sube: "⊆",
                    supe: "⊇",
                    oplus: "⊕",
                    otimes: "⊗",
                    perp: "⊥",
                    sdot: "⋅",
                    Alpha: "Α",
                    Beta: "Β",
                    Gamma: "Γ",
                    Delta: "Δ",
                    Epsilon: "Ε",
                    Zeta: "Ζ",
                    Eta: "Η",
                    Theta: "Θ",
                    Iota: "Ι",
                    Kappa: "Κ",
                    Lambda: "Λ",
                    Mu: "Μ",
                    Nu: "Ν",
                    Xi: "Ξ",
                    Omicron: "Ο",
                    Pi: "Π",
                    Rho: "Ρ",
                    Sigma: "Σ",
                    Tau: "Τ",
                    Upsilon: "Υ",
                    Phi: "Φ",
                    Chi: "Χ",
                    Psi: "Ψ",
                    Omega: "Ω",
                    alpha: "α",
                    beta: "β",
                    gamma: "γ",
                    delta: "δ",
                    epsilon: "ε",
                    zeta: "ζ",
                    eta: "η",
                    theta: "θ",
                    iota: "ι",
                    kappa: "κ",
                    lambda: "λ",
                    mu: "μ",
                    nu: "ν",
                    xi: "ξ",
                    omicron: "ο",
                    pi: "π",
                    rho: "ρ",
                    sigmaf: "ς",
                    sigma: "σ",
                    tau: "τ",
                    upsilon: "υ",
                    phi: "φ",
                    chi: "χ",
                    psi: "ψ",
                    omega: "ω",
                    thetasym: "ϑ",
                    upsih: "ϒ",
                    piv: "ϖ",
                    OElig: "Œ",
                    oelig: "œ",
                    Scaron: "Š",
                    scaron: "š",
                    Yuml: "Ÿ",
                    fnof: "ƒ",
                    circ: "ˆ",
                    tilde: "˜",
                    ensp: " ",
                    emsp: " ",
                    thinsp: " ",
                    zwnj: "‌",
                    zwj: "‍",
                    lrm: "‎",
                    rlm: "‏",
                    ndash: "–",
                    mdash: "—",
                    lsquo: "‘",
                    rsquo: "’",
                    sbquo: "‚",
                    ldquo: "“",
                    rdquo: "”",
                    bdquo: "„",
                    dagger: "†",
                    Dagger: "‡",
                    bull: "•",
                    hellip: "…",
                    permil: "‰",
                    prime: "′",
                    Prime: "″",
                    lsaquo: "‹",
                    rsaquo: "›",
                    oline: "‾",
                    euro: "€",
                    trade: "™",
                    larr: "←",
                    uarr: "↑",
                    rarr: "→",
                    darr: "↓",
                    harr: "↔",
                    crarr: "↵",
                    lceil: "⌈",
                    rceil: "⌉",
                    lfloor: "⌊",
                    rfloor: "⌋",
                    loz: "◊",
                    spades: "♠",
                    clubs: "♣",
                    hearts: "♥",
                    diams: "♦"
                });
                /**
 * @deprecated use `HTML_ENTITIES` instead
 * @see HTML_ENTITIES
 */ exports.entityMap = exports.HTML_ENTITIES;
            },
            {
                "./conventions": 1
            }
        ],
        5: [
            function(require, module1, exports) {
                (function(global) {
                    (function() {
                        function helper(g) {
                            var doc = global.document || g, root = doc.documentElement || g, isSingleMatch, isSingleSelect, lastSlice, lastContext, lastPosition, lastMatcher, lastSelector, lastPartsMatch, lastPartsSelect, prefixes = "(?:[#.:]|::)?", operators = "([~*^$|!]?={1})", whitespace = "[\\x20\\t\\n\\r\\f]", combinators = "\\x20|[>+~](?=[^>+~])", pseudoparms = "(?:[-+]?\\d*n)?[-+]?\\d*", skip_groups = "\\[.*\\]|\\(.*\\)|\\{.*\\}", any_esc_chr = "\\\\.", alphalodash = "[_a-zA-Z]", non_asc_chr = "[^\\x00-\\x9f]", escaped_chr = "\\\\[^\\n\\r\\f0-9a-fA-F]", unicode_chr = "\\\\[0-9a-fA-F]{1,6}(?:\\r\\n|" + whitespace + ")?", quotedvalue = "\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*\"|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'", reSplitGroup = /([^,\\()[\]]+|\[[^[\]]*\]|\[.*\]|\([^()]+\)|\(.*\)|\{[^{}]+\}|\{.*\}|\\.)+/g, reTrimSpaces = RegExp("[\\n\\r\\f]|^" + whitespace + "+|" + whitespace + "+$", "g"), reEscapedChars = /\\([0-9a-fA-F]{1,6}[\x20\t\n\r\f]?|.)|([\x22\x27])/g, standardValidator, extendedValidator, reValidator, attrcheck, attributes, attrmatcher, pseudoclass, reOptimizeSelector, reSimpleNot, reSplitToken, Optimize, identifier, extensions = ".+", Patterns = {
                                spseudos: /^\:(root|empty|(?:first|last|only)(?:-child|-of-type)|nth(?:-last)?(?:-child|-of-type)\(\s?(even|odd|(?:[-+]{0,1}\d*n\s?)?[-+]{0,1}\s?\d*)\s?\))?(.*)/i,
                                dpseudos: /^\:(link|visited|target|active|focus|hover|checked|disabled|enabled|selected|lang\(([-\w]{2,})\)|(?:matches|not)\(\s?(:nth(?:-last)?(?:-child|-of-type)\(\s?(?:even|odd|(?:[-+]{0,1}\d*n\s?)?[-+]{0,1}\s?\d*)\s?\)|[^()]*)\s?\))?(.*)/i,
                                epseudos: /^((?:[:]{1,2}(?:after|before|first-letter|first-line))|(?:[:]{2,2}(?:selection|backdrop|placeholder)))?(.*)/i,
                                children: RegExp("^" + whitespace + "?\\>" + whitespace + "?(.*)"),
                                adjacent: RegExp("^" + whitespace + "?\\+" + whitespace + "?(.*)"),
                                relative: RegExp("^" + whitespace + "?\\~" + whitespace + "?(.*)"),
                                ancestor: RegExp("^" + whitespace + "+(.*)"),
                                universal: RegExp("^\\*(.*)")
                            }, Tokens = {
                                prefixes: prefixes,
                                identifier: identifier,
                                attributes: attributes
                            }, QUIRKS_MODE, XML_DOCUMENT, GEBTN = "getElementsByTagName" in doc, GEBCN = "getElementsByClassName" in doc, IE_LT_9 = typeof doc.addEventListener != "function", LINK_NODES = {
                                a: 1,
                                A: 1,
                                area: 1,
                                AREA: 1,
                                link: 1,
                                LINK: 1
                            }, ATTR_BOOLEAN = {
                                checked: 1,
                                disabled: 1,
                                ismap: 1,
                                multiple: 1,
                                readonly: 1,
                                selected: 1
                            }, ATTR_DEFAULT = {
                                value: "defaultValue",
                                checked: "defaultChecked",
                                selected: "defaultSelected"
                            }, ATTR_URIDATA = {
                                action: 2,
                                cite: 2,
                                codebase: 2,
                                data: 2,
                                href: 2,
                                longdesc: 2,
                                lowsrc: 2,
                                src: 2,
                                usemap: 2
                            }, HTML_TABLE = {
                                "accept": 1,
                                "accept-charset": 1,
                                "align": 1,
                                "alink": 1,
                                "axis": 1,
                                "bgcolor": 1,
                                "charset": 1,
                                "checked": 1,
                                "clear": 1,
                                "codetype": 1,
                                "color": 1,
                                "compact": 1,
                                "declare": 1,
                                "defer": 1,
                                "dir": 1,
                                "direction": 1,
                                "disabled": 1,
                                "enctype": 1,
                                "face": 1,
                                "frame": 1,
                                "hreflang": 1,
                                "http-equiv": 1,
                                "lang": 1,
                                "language": 1,
                                "link": 1,
                                "media": 1,
                                "method": 1,
                                "multiple": 1,
                                "nohref": 1,
                                "noresize": 1,
                                "noshade": 1,
                                "nowrap": 1,
                                "readonly": 1,
                                "rel": 1,
                                "rev": 1,
                                "rules": 1,
                                "scope": 1,
                                "scrolling": 1,
                                "selected": 1,
                                "shape": 1,
                                "target": 1,
                                "text": 1,
                                "type": 1,
                                "valign": 1,
                                "valuetype": 1,
                                "vlink": 1
                            }, NATIVE_TRAVERSAL_API = "nextElementSibling" in root && "previousElementSibling" in root, Selectors = {}, Operators = {
                                "=": "n=='%m'",
                                "^=": "n.indexOf('%m')==0",
                                "*=": "n.indexOf('%m')>-1",
                                "|=": "(n+'-').indexOf('%m-')==0",
                                "~=": "(' '+n+' ').indexOf(' %m ')>-1",
                                "$=": "n.substr(n.length-'%m'.length)=='%m'"
                            }, concatCall = function(data, elements, callback) {
                                var i = -1, element;
                                while(element = elements[++i]){
                                    if (false === callback(data[data.length] = element)) break;
                                }
                                return data;
                            }, switchContext = function(from, force) {
                                var oldDoc = doc;
                                lastContext = from;
                                doc = from.ownerDocument || from;
                                if (force || oldDoc !== doc) {
                                    root = doc.documentElement;
                                    XML_DOCUMENT = doc.createElement("DiV").nodeName == "DiV";
                                    QUIRKS_MODE = !XML_DOCUMENT && typeof doc.compatMode == "string" ? doc.compatMode.indexOf("CSS") < 0 : function() {
                                        var style = doc.createElement("div").style;
                                        return style && (style.width = 1) && style.width == "1px";
                                    }();
                                    Config.CACHING && Dom.setCache(true, doc);
                                }
                            }, codePointToUTF16 = function(codePoint) {
                                if (codePoint < 1 || codePoint > 0x10ffff || codePoint > 0xd7ff && codePoint < 0xe000) return "\\ufffd";
                                if (codePoint < 0x10000) {
                                    var lowHex = "000" + codePoint.toString(16);
                                    return "\\u" + lowHex.substr(lowHex.length - 4);
                                }
                                return "\\u" + ((codePoint - 0x10000 >> 0x0a) + 0xd800).toString(16) + "\\u" + ((codePoint - 0x10000) % 0x400 + 0xdc00).toString(16);
                            }, stringFromCodePoint = function(codePoint) {
                                if (codePoint < 1 || codePoint > 0x10ffff || codePoint > 0xd7ff && codePoint < 0xe000) return "�";
                                if (codePoint < 0x10000) return String.fromCharCode(codePoint);
                                return String.fromCodePoint ? String.fromCodePoint(codePoint) : String.fromCharCode((codePoint - 0x10000 >> 0x0a) + 0xd800, (codePoint - 0x10000) % 0x400 + 0xdc00);
                            }, convertEscapes = function(str) {
                                return str.replace(reEscapedChars, function(substring, p1, p2) {
                                    return p2 ? "\\" + p2 : /^[0-9a-fA-F]/.test(p1) ? codePointToUTF16(parseInt(p1, 16)) : /^[\\\x22\x27]/.test(p1) ? substring : p1;
                                });
                            }, unescapeIdentifier = function(str) {
                                return str.replace(reEscapedChars, function(substring, p1, p2) {
                                    return p2 ? p2 : /^[0-9a-fA-F]/.test(p1) ? stringFromCodePoint(parseInt(p1, 16)) : /^[\\\x22\x27]/.test(p1) ? substring : p1;
                                });
                            }, byIdRaw = function(id, elements) {
                                var i = -1, element;
                                while(element = elements[++i]){
                                    if (element.getAttribute("id") == id) break;
                                }
                                return element || null;
                            }, _byId = !IE_LT_9 ? function(id, from) {
                                id = /\\/.test(id) ? unescapeIdentifier(id) : id;
                                return from.getElementById && from.getElementById(id) || byIdRaw(id, from.getElementsByTagName("*"));
                            } : function(id, from) {
                                var element = null;
                                id = /\\/.test(id) ? unescapeIdentifier(id) : id;
                                if (XML_DOCUMENT || from.nodeType != 9) return byIdRaw(id, from.getElementsByTagName("*"));
                                if ((element = from.getElementById(id)) && element.name == id && from.getElementsByName) return byIdRaw(id, from.getElementsByName(id));
                                return element;
                            }, byId = function(id, from) {
                                from || (from = doc);
                                if (lastContext !== from) switchContext(from);
                                return _byId(id, from);
                            }, byTagRaw = function(tag, from) {
                                var any = tag == "*", element = from, elements = [], next = element.firstChild;
                                any || (tag = tag.toUpperCase());
                                while(element = next){
                                    if (element.tagName > "@" && (any || element.tagName.toUpperCase() == tag)) elements[elements.length] = element;
                                    if (next = element.firstChild || element.nextSibling) continue;
                                    while(!next && (element = element.parentNode) && element !== from)next = element.nextSibling;
                                }
                                return elements;
                            }, contains = "compareDocumentPosition" in root ? function(container, element) {
                                return (container.compareDocumentPosition(element) & 16) == 16;
                            } : "contains" in root ? function(container, element) {
                                return container !== element && container.contains(element);
                            } : function(container, element) {
                                while(element = element.parentNode){
                                    if (element === container) return true;
                                }
                                return false;
                            }, getAttribute = !IE_LT_9 ? function(node, attribute) {
                                return node.getAttribute(attribute);
                            } : function(node, attribute) {
                                attribute = attribute.toLowerCase();
                                if (typeof node[attribute] == "object") return node.attributes[attribute] && node.attributes[attribute].value;
                                return attribute == "type" ? node.getAttribute(attribute) : ATTR_URIDATA[attribute] ? node.getAttribute(attribute, 2) : ATTR_BOOLEAN[attribute] ? node.getAttribute(attribute) ? attribute : "false" : (node = node.getAttributeNode(attribute)) && node.value;
                            }, hasAttribute = !IE_LT_9 && root.hasAttribute ? function(node, attribute) {
                                return node.hasAttribute(attribute);
                            } : function(node, attribute) {
                                var obj = node.getAttributeNode(attribute = attribute.toLowerCase());
                                return ATTR_DEFAULT[attribute] && attribute != "value" ? node[ATTR_DEFAULT[attribute]] : obj && obj.specified;
                            }, isEmpty = function(node) {
                                node = node.firstChild;
                                while(node){
                                    if (node.nodeType == 3 || node.nodeName > "@") return false;
                                    node = node.nextSibling;
                                }
                                return true;
                            }, isLink = function(element) {
                                return hasAttribute(element, "href") && LINK_NODES[element.nodeName];
                            }, nthElement = function(element, last) {
                                var count = 1, succ = last ? "nextSibling" : "previousSibling";
                                while(element = element[succ])if (element.nodeName > "@") ++count;
                                return count;
                            }, nthOfType = function(element, last) {
                                var count = 1, succ = last ? "nextSibling" : "previousSibling", type = element.nodeName;
                                while(element = element[succ])if (element.nodeName == type) ++count;
                                return count;
                            }, configure = function(option) {
                                if (typeof option == "string") return !!Config[option];
                                if (typeof option != "object") return Config;
                                for(var i in option){
                                    Config[i] = !!option[i];
                                    if (i == "SIMPLENOT") {
                                        matchContexts = {};
                                        matchResolvers = {};
                                        selectContexts = {};
                                        selectResolvers = {};
                                    }
                                }
                                setIdentifierSyntax();
                                reValidator = RegExp(Config.SIMPLENOT ? standardValidator : extendedValidator);
                                return true;
                            }, emit = function(message) {
                                if (Config.VERBOSITY) throw Error(message);
                                if (Config.LOGERRORS && console && console.log) console.log(message);
                            }, Config = {
                                CACHING: false,
                                ESCAPECHR: true,
                                NON_ASCII: true,
                                SELECTOR3: true,
                                UNICODE16: true,
                                SHORTCUTS: false,
                                SIMPLENOT: true,
                                SVG_LCASE: false,
                                UNIQUE_ID: true,
                                USE_HTML5: true,
                                VERBOSITY: true,
                                LOGERRORS: true
                            }, initialize = function(doc) {
                                setIdentifierSyntax();
                                switchContext(doc, true);
                            }, setIdentifierSyntax = function() {
                                var syntax = "", start = Config["SELECTOR3"] ? "-{2}|" : "";
                                Config["NON_ASCII"] && (syntax += "|" + non_asc_chr);
                                Config["UNICODE16"] && (syntax += "|" + unicode_chr);
                                Config["ESCAPECHR"] && (syntax += "|" + escaped_chr);
                                syntax += Config["UNICODE16"] || Config["ESCAPECHR"] ? "" : "|" + any_esc_chr;
                                identifier = "-?(?:" + start + alphalodash + syntax + ")(?:-|[0-9]|" + alphalodash + syntax + ")*";
                                attrcheck = "(" + quotedvalue + "|" + identifier + ")";
                                attributes = whitespace + "*(" + identifier + "(?::" + identifier + ")?)" + whitespace + "*(?:" + operators + whitespace + "*" + attrcheck + ")?" + whitespace + "*" + "(i)?" + whitespace + "*";
                                attrmatcher = attributes.replace(attrcheck, "([\\x22\\x27]*)((?:\\\\?.)*?)\\3");
                                pseudoclass = "((?:" + pseudoparms + "|" + quotedvalue + "|" + prefixes + identifier + "|" + "\\[" + attributes + "\\]|" + "\\(.+\\)|" + whitespace + "*|" + ",)+)";
                                standardValidator = "(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])(\\*|(?:" + prefixes + identifier + ")" + "|" + combinators + "|\\[" + attributes + "\\]" + "|\\(" + pseudoclass + "\\)" + "|\\{" + extensions + "\\}" + "|(?:,|" + whitespace + "*)" + ")+";
                                reSimpleNot = RegExp("^((?!:not)(" + prefixes + identifier + "|\\([^()]*\\))+" + "|\\[" + attributes + "\\]" + ")$");
                                reSplitToken = RegExp("(" + prefixes + identifier + "|" + "\\[" + attributes + "\\]|" + "\\(" + pseudoclass + "\\)|" + "\\\\.|[^\\x20\\t\\n\\r\\f>+~])+", "g");
                                reOptimizeSelector = RegExp(identifier + "|^$");
                                Optimize = {
                                    ID: RegExp("^\\*?#(" + identifier + ")|" + skip_groups),
                                    TAG: RegExp("^(" + identifier + ")|" + skip_groups),
                                    CLASS: RegExp("^\\.(" + identifier + "$)|" + skip_groups)
                                };
                                Patterns.id = RegExp("^#(" + identifier + ")(.*)");
                                Patterns.tagName = RegExp("^(" + identifier + ")(.*)");
                                Patterns.className = RegExp("^\\.(" + identifier + ")(.*)");
                                Patterns.attribute = RegExp("^\\[" + attrmatcher + "\\](.*)");
                                Tokens.identifier = identifier;
                                Tokens.attributes = attributes;
                                extendedValidator = standardValidator.replace(pseudoclass, ".*");
                                reValidator = RegExp(standardValidator);
                            }, ACCEPT_NODE = "r[r.length]=c[k];if(f&&false===f(c[k]))break main;else continue main;", REJECT_NODE = IE_LT_9 ? 'if(e.nodeName<"A")continue;' : "", TO_UPPER_CASE = IE_LT_9 ? ".toUpperCase()" : "", compile = function(selector, source, mode) {
                                var parts = typeof selector == "string" ? selector.match(reSplitGroup) : selector;
                                typeof source == "string" || (source = "");
                                if (parts.length == 1) source += compileSelector(parts[0], mode ? ACCEPT_NODE : "f&&f(k);return true;", mode);
                                else {
                                    var i = -1, seen = {}, token;
                                    while(token = parts[++i]){
                                        token = token.replace(reTrimSpaces, "");
                                        if (!seen[token] && (seen[token] = true)) source += compileSelector(token, mode ? ACCEPT_NODE : "f&&f(k);return true;", mode);
                                    }
                                }
                                if (mode) return Function("c,s,d,h,g,f", "var N,n,x=0,k=-1,e,r=[];main:while((e=c[++k])){" + source + "}return r;");
                                else return Function("e,s,d,h,g,f", "var N,n,x=0,k=e;" + source + "return false;");
                            }, compileSelector = function(selector, source, mode) {
                                var a, b, n, k = 0, expr, match, result, status, test, type;
                                while(selector){
                                    k++;
                                    if (match = selector.match(Patterns.universal)) expr = "";
                                    else if (match = selector.match(Patterns.id)) {
                                        match[1] = /\\/.test(match[1]) ? convertEscapes(match[1]) : match[1];
                                        source = "if(" + (XML_DOCUMENT ? 's.getAttribute(e,"id")' : '(e.submit?s.getAttribute(e,"id"):e.id)') + '=="' + match[1] + '"' + "){" + source + "}";
                                    } else if (match = selector.match(Patterns.tagName)) {
                                        test = Config.SVG_LCASE ? '||e.nodeName=="' + match[1].toLowerCase() + '"' : "";
                                        source = "if(e.nodeName" + (XML_DOCUMENT ? '=="' + match[1] + '"' : TO_UPPER_CASE + '=="' + match[1].toUpperCase() + '"' + test) + "){" + source + "}";
                                    } else if (match = selector.match(Patterns.className)) {
                                        match[1] = /\\/.test(match[1]) ? convertEscapes(match[1]) : match[1];
                                        match[1] = QUIRKS_MODE ? match[1].toLowerCase() : match[1];
                                        source = "if((n=" + (XML_DOCUMENT ? 'e.getAttribute("class")' : "e.className") + ')&&n.length&&(" "+' + (QUIRKS_MODE ? "n.toLowerCase()" : "n") + ".replace(/" + whitespace + '+/g," ")+" ").indexOf(" ' + match[1] + ' ")>-1' + "){" + source + "}";
                                    } else if (match = selector.match(Patterns.attribute)) {
                                        expr = match[1].split(":");
                                        expr = expr.length == 2 ? expr[1] : expr[0] + "";
                                        if (match[2] && !Operators[match[2]]) {
                                            emit('Unsupported operator in attribute selectors "' + selector + '"');
                                            return "";
                                        }
                                        test = "false";
                                        if (match[2] && match[4] && (test = Operators[match[2]])) {
                                            match[4] = /\\/.test(match[4]) ? convertEscapes(match[4]) : match[4];
                                            type = match[5] == "i" || HTML_TABLE[expr.toLowerCase()];
                                            test = test.replace(/\%m/g, type ? match[4].toLowerCase() : match[4]);
                                        } else if (match[2] == "!=" || match[2] == "=") test = "n" + match[2] + '=""';
                                        source = 'if(n=s.hasAttribute(e,"' + match[1] + '")){' + (match[2] ? 'n=s.getAttribute(e,"' + match[1] + '")' : "") + (type && match[2] ? ".toLowerCase();" : ";") + "if(" + (match[2] ? test : "n") + "){" + source + "}}";
                                    } else if (match = selector.match(Patterns.adjacent)) source = NATIVE_TRAVERSAL_API ? "var N" + k + "=e;if((e=e.previousElementSibling)){" + source + "}e=N" + k + ";" : "var N" + k + "=e;while((e=e.previousSibling)){if(e.nodeType==1){" + source + "break;}}e=N" + k + ";";
                                    else if (match = selector.match(Patterns.relative)) source = NATIVE_TRAVERSAL_API ? "var N" + k + "=e;while((e=e.previousElementSibling)){" + source + "}e=N" + k + ";" : "var N" + k + "=e;while((e=e.previousSibling)){if(e.nodeType==1){" + source + "}}e=N" + k + ";";
                                    else if (match = selector.match(Patterns.children)) source = "var N" + k + "=e;if((e=e.parentNode)&&e.nodeType==1){" + source + "}e=N" + k + ";";
                                    else if (match = selector.match(Patterns.ancestor)) source = "var N" + k + "=e;while((e=e.parentNode)&&e.nodeType==1){" + source + "}e=N" + k + ";";
                                    else if ((match = selector.match(Patterns.spseudos)) && match[1]) switch(match[1]){
                                        case "root":
                                            if (match[3]) source = "if(e===h||s.contains(h,e)){" + source + "}";
                                            else source = "if(e===h){" + source + "}";
                                            break;
                                        case "empty":
                                            source = "if(s.isEmpty(e)){" + source + "}";
                                            break;
                                        default:
                                            if (match[1] && match[2]) {
                                                if (match[2] == "n") {
                                                    source = "if(e!==h){" + source + "}";
                                                    break;
                                                } else if (match[2] == "even") {
                                                    a = 2;
                                                    b = 0;
                                                } else if (match[2] == "odd") {
                                                    a = 2;
                                                    b = 1;
                                                } else {
                                                    b = (n = match[2].match(/(-?\d+)$/)) ? parseInt(n[1], 10) : 0;
                                                    a = (n = match[2].match(/(-?\d*)n/i)) ? parseInt(n[1], 10) : 0;
                                                    if (n && n[1] == "-") a = -1;
                                                }
                                                test = a > 1 ? /last/i.test(match[1]) ? "(n-(" + b + "))%" + a + "==0" : "n>=" + b + "&&(n-(" + b + "))%" + a + "==0" : a < -1 ? /last/i.test(match[1]) ? "(n-(" + b + "))%" + a + "==0" : "n<=" + b + "&&(n-(" + b + "))%" + a + "==0" : a === 0 ? "n==" + b : a == -1 ? "n<=" + b : "n>=" + b;
                                                source = "if(e!==h){n=s[" + (/-of-type/i.test(match[1]) ? '"nthOfType"' : '"nthElement"') + "]" + "(e," + (/last/i.test(match[1]) ? "true" : "false") + ");" + "if(" + test + "){" + source + "}" + "}";
                                            } else {
                                                a = /first/i.test(match[1]) ? "previous" : "next";
                                                n = /only/i.test(match[1]) ? "previous" : "next";
                                                b = /first|last/i.test(match[1]);
                                                type = /-of-type/i.test(match[1]) ? "&&n.nodeName!=e.nodeName" : '&&n.nodeName<"@"';
                                                source = "if(e!==h){" + ("n=e;while((n=n." + a + "Sibling)" + type + ");if(!n){" + (b ? source : "n=e;while((n=n." + n + "Sibling)" + type + ");if(!n){" + source + "}") + "}") + "}";
                                            }
                                            break;
                                    }
                                    else if ((match = selector.match(Patterns.dpseudos)) && match[1]) switch(match[1].match(/^\w+/)[0]){
                                        case "matches":
                                            expr = match[3].replace(reTrimSpaces, "");
                                            source = 'if(s.match(e, "' + expr.replace(/\x22/g, '\\"') + '",g)){' + source + "}";
                                            break;
                                        case "not":
                                            expr = match[3].replace(reTrimSpaces, "");
                                            if (Config.SIMPLENOT && !reSimpleNot.test(expr)) {
                                                emit('Negation pseudo-class only accepts simple selectors "' + selector + '"');
                                                return "";
                                            } else if ("compatMode" in doc) source = "if(!" + compile(expr, "", false) + "(e,s,d,h,g)){" + source + "}";
                                            else source = 'if(!s.match(e, "' + expr.replace(/\x22/g, '\\"') + '",g)){' + source + "}";
                                            break;
                                        case "checked":
                                            source = 'if((typeof e.form!=="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)' + (Config.USE_HTML5 ? "||(/^option$/i.test(e.nodeName)&&(e.selected||e.checked))" : "") + "){" + source + "}";
                                            break;
                                        case "disabled":
                                            source = 'if(((typeof e.form!=="undefined"' + (Config.USE_HTML5 ? "" : "&&!(/^hidden$/i).test(e.type)") + ")||s.isLink(e))&&e.disabled===true){" + source + "}";
                                            break;
                                        case "enabled":
                                            source = 'if(((typeof e.form!=="undefined"' + (Config.USE_HTML5 ? "" : "&&!(/^hidden$/i).test(e.type)") + ")||s.isLink(e))&&e.disabled===false){" + source + "}";
                                            break;
                                        case "lang":
                                            test = "";
                                            if (match[2]) test = match[2].substr(0, 2) + "-";
                                            source = 'do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="' + match[2].toLowerCase() + '")||' + '(n&&(n=="' + match[2].toLowerCase() + '"||n.substr(0,3)=="' + test.toLowerCase() + '")))' + "{" + source + "break;}}while((e=e.parentNode)&&e!==g);";
                                            break;
                                        case "target":
                                            source = "if(e.id==d.location.hash.slice(1)){" + source + "}";
                                            break;
                                        case "link":
                                            source = "if(s.isLink(e)&&!e.visited){" + source + "}";
                                            break;
                                        case "visited":
                                            source = "if(s.isLink(e)&&e.visited){" + source + "}";
                                            break;
                                        case "active":
                                            source = "if(e===d.activeElement){" + source + "}";
                                            break;
                                        case "hover":
                                            source = "if(e===d.hoverElement){" + source + "}";
                                            break;
                                        case "focus":
                                            source = "hasFocus" in doc ? 'if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href||typeof e.tabIndex=="number")){' + source + "}" : "if(e===d.activeElement&&(e.type||e.href)){" + source + "}";
                                            break;
                                        case "selected":
                                            source = "if(/^option$/i.test(e.nodeName)&&(e.selected||e.checked)){" + source + "}";
                                            break;
                                        default:
                                            break;
                                    }
                                    else if ((match = selector.match(Patterns.epseudos)) && match[1]) source = "if(!(/1|11/).test(e.nodeType)){" + source + "}";
                                    else {
                                        expr = false;
                                        status = false;
                                        for(expr in Selectors)if ((match = selector.match(Selectors[expr].Expression)) && match[1]) {
                                            result = Selectors[expr].Callback(match, source);
                                            if ("match" in result) match = result.match;
                                            source = result.source;
                                            status = result.status;
                                            if (status) break;
                                        }
                                        if (!status) {
                                            emit('Unknown pseudo-class selector "' + selector + '"');
                                            return "";
                                        }
                                        if (!expr) {
                                            emit('Unknown token in selector "' + selector + '"');
                                            return "";
                                        }
                                    }
                                    if (!match) {
                                        emit('Invalid syntax in selector "' + selector + '"');
                                        return "";
                                    }
                                    selector = match && match[match.length - 1];
                                }
                                return source;
                            }, match = function(element, selector, from, callback) {
                                var parts;
                                if (!(element && element.nodeType == 1)) {
                                    emit("Invalid element argument");
                                    return false;
                                } else if (typeof selector != "string") {
                                    emit("Invalid selector argument");
                                    return false;
                                } else if (lastContext !== from) switchContext(from || (from = element.ownerDocument));
                                selector = selector.replace(reTrimSpaces, "").replace(/\x00|\\$/g, "�");
                                Config.SHORTCUTS && (selector = Dom.shortcuts(selector, element, from));
                                if (lastMatcher != selector) {
                                    if ((parts = selector.match(reValidator)) && parts[0] == selector) {
                                        isSingleMatch = (parts = selector.match(reSplitGroup)).length < 2;
                                        lastMatcher = selector;
                                        lastPartsMatch = parts;
                                    } else {
                                        emit('The string "' + selector + '", is not a valid CSS selector');
                                        return false;
                                    }
                                } else parts = lastPartsMatch;
                                if (!matchResolvers[selector] || matchContexts[selector] !== from) {
                                    matchResolvers[selector] = compile(isSingleMatch ? [
                                        selector
                                    ] : parts, "", false);
                                    matchContexts[selector] = from;
                                }
                                return matchResolvers[selector](element, Snapshot, doc, root, from, callback);
                            }, first = function(selector, from) {
                                return select(selector, from, function() {
                                    return false;
                                })[0] || null;
                            }, select = function(selector, from, callback) {
                                var i, changed, element, elements, parts, token, original = selector;
                                if (arguments.length === 0) {
                                    emit("Not enough arguments");
                                    return [];
                                } else if (typeof selector != "string") return [];
                                else if (from && !/1|9|11/.test(from.nodeType)) {
                                    emit("Invalid or illegal context element");
                                    return [];
                                } else if (lastContext !== from) switchContext(from || (from = doc));
                                if (Config.CACHING && (elements = Dom.loadResults(original, from, doc, root))) return callback ? concatCall([], elements, callback) : elements;
                                selector = selector.replace(reTrimSpaces, "").replace(/\x00|\\$/g, "�");
                                Config.SHORTCUTS && (selector = Dom.shortcuts(selector, from));
                                if (changed = lastSelector != selector) {
                                    if ((parts = selector.match(reValidator)) && parts[0] == selector) {
                                        isSingleSelect = (parts = selector.match(reSplitGroup)).length < 2;
                                        lastSelector = selector;
                                        lastPartsSelect = parts;
                                    } else {
                                        emit('The string "' + selector + '", is not a valid CSS selector');
                                        return [];
                                    }
                                } else parts = lastPartsSelect;
                                if (from.nodeType == 11) elements = byTagRaw("*", from);
                                else if (isSingleSelect) {
                                    if (changed) {
                                        parts = selector.match(reSplitToken);
                                        token = parts[parts.length - 1];
                                        lastSlice = token.split(":not");
                                        lastSlice = lastSlice[lastSlice.length - 1];
                                        lastPosition = selector.length - token.length;
                                    }
                                    if (Config.UNIQUE_ID && lastSlice && (parts = lastSlice.match(Optimize.ID)) && (token = parts[1])) {
                                        if (element = _byId(token, from)) {
                                            if (match(element, selector)) {
                                                callback && callback(element);
                                                elements = [
                                                    element
                                                ];
                                            } else elements = [];
                                        }
                                    } else if (Config.UNIQUE_ID && (parts = selector.match(Optimize.ID)) && (token = parts[1])) {
                                        if (element = _byId(token, doc)) {
                                            if ("#" + token == selector) {
                                                callback && callback(element);
                                                elements = [
                                                    element
                                                ];
                                            } else if (/[>+~]/.test(selector)) from = element.parentNode;
                                            else from = element;
                                        } else elements = [];
                                    }
                                    if (elements) {
                                        Config.CACHING && Dom.saveResults(original, from, doc, elements);
                                        return elements;
                                    }
                                    if (!XML_DOCUMENT && GEBTN && lastSlice && (parts = lastSlice.match(Optimize.TAG)) && (token = parts[1])) {
                                        if ((elements = from.getElementsByTagName(token)).length === 0) return [];
                                        selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace(token, "*");
                                    } else if (!XML_DOCUMENT && GEBCN && lastSlice && (parts = lastSlice.match(Optimize.CLASS)) && (token = parts[1])) {
                                        if ((elements = from.getElementsByClassName(unescapeIdentifier(token))).length === 0) return [];
                                        selector = selector.slice(0, lastPosition) + selector.slice(lastPosition).replace("." + token, reOptimizeSelector.test(selector.charAt(selector.indexOf(token) - 1)) ? "" : "*");
                                    }
                                }
                                if (!elements) {
                                    if (IE_LT_9) elements = /^(?:applet|object)$/i.test(from.nodeName) ? from.children : byTagRaw("*", from);
                                    else elements = from.getElementsByTagName("*");
                                }
                                if (!selectResolvers[selector] || selectContexts[selector] !== from) {
                                    selectResolvers[selector] = compile(isSingleSelect ? [
                                        selector
                                    ] : parts, REJECT_NODE, true);
                                    selectContexts[selector] = from;
                                }
                                elements = selectResolvers[selector](elements, Snapshot, doc, root, from, callback);
                                Config.CACHING && Dom.saveResults(original, from, doc, elements);
                                return elements;
                            }, FN = function(x) {
                                return x;
                            }, matchContexts = {}, matchResolvers = {}, selectContexts = {}, selectResolvers = {}, Snapshot = {
                                byId: _byId,
                                match: match,
                                select: select,
                                isLink: isLink,
                                isEmpty: isEmpty,
                                contains: contains,
                                nthOfType: nthOfType,
                                nthElement: nthElement,
                                getAttribute: getAttribute,
                                hasAttribute: hasAttribute
                            }, Dom = {
                                ACCEPT_NODE: ACCEPT_NODE,
                                byId: byId,
                                match: match,
                                first: first,
                                select: select,
                                compile: compile,
                                contains: contains,
                                configure: configure,
                                getAttribute: getAttribute,
                                hasAttribute: hasAttribute,
                                setCache: FN,
                                shortcuts: FN,
                                loadResults: FN,
                                saveResults: FN,
                                emit: emit,
                                Config: Config,
                                Snapshot: Snapshot,
                                Operators: Operators,
                                Selectors: Selectors,
                                Tokens: Tokens,
                                registerOperator: function(symbol, resolver) {
                                    Operators[symbol] || (Operators[symbol] = resolver);
                                },
                                registerSelector: function(name, rexp, func) {
                                    Selectors[name] || (Selectors[name] = {
                                        Expression: rexp,
                                        Callback: func
                                    });
                                }
                            };
                            initialize(doc);
                            return Dom;
                        }
                        exports.DOMHelper = helper;
                    }).call(this);
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            },
            {}
        ],
        6: [
            function(require, module1, exports) {
                var dom = require("./dom");
                exports.DOMImplementation = dom.DOMImplementation;
                exports.XMLSerializer = dom.XMLSerializer;
                exports.DOMParser = require("./dom-parser").DOMParser;
            },
            {
                "./dom": 3,
                "./dom-parser": 2
            }
        ],
        7: [
            function(require, module1, exports) {
                var NAMESPACE = require("./conventions").NAMESPACE;
                //[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
                //[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
                //[5]   	Name	   ::=   	NameStartChar (NameChar)*
                var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/ //\u10000-\uEFFFF
                ;
                var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
                var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
                //var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
                //var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
                //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
                //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
                var S_TAG = 0; //tag name offerring
                var S_ATTR = 1; //attr name offerring
                var S_ATTR_SPACE = 2; //attr name end and space offer
                var S_EQ = 3; //=space?
                var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)
                var S_ATTR_END = 5; //attr value end and no space(quot end)
                var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)
                var S_TAG_CLOSE = 7; //closed el<el />
                /**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */ function ParseError(message, locator) {
                    this.message = message;
                    this.locator = locator;
                    if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
                }
                ParseError.prototype = new Error();
                ParseError.prototype.name = ParseError.name;
                function XMLReader() {}
                XMLReader.prototype = {
                    parse: function(source, defaultNSMap, entityMap) {
                        var domBuilder = this.domBuilder;
                        domBuilder.startDocument();
                        _copy(defaultNSMap, defaultNSMap = {});
                        parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
                        domBuilder.endDocument();
                    }
                };
                function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
                    function fixedFromCharCode(code) {
                        // String.prototype.fromCharCode does not supports
                        // > 2 bytes unicode chars directly
                        if (code > 0xffff) {
                            code -= 0x10000;
                            var surrogate1 = 0xd800 + (code >> 10), surrogate2 = 0xdc00 + (code & 0x3ff);
                            return String.fromCharCode(surrogate1, surrogate2);
                        } else return String.fromCharCode(code);
                    }
                    function entityReplacer(a) {
                        var k = a.slice(1, -1);
                        if (Object.hasOwnProperty.call(entityMap, k)) return entityMap[k];
                        else if (k.charAt(0) === "#") return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
                        else {
                            errorHandler.error("entity not found:" + a);
                            return a;
                        }
                    }
                    function appendText(end) {
                        if (end > start) {
                            var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
                            locator && position(start);
                            domBuilder.characters(xt, 0, end - start);
                            start = end;
                        }
                    }
                    function position(p, m) {
                        while(p >= lineEnd && (m = linePattern.exec(source))){
                            lineStart = m.index;
                            lineEnd = lineStart + m[0].length;
                            locator.lineNumber++;
                        //console.log('line++:',locator,startPos,endPos)
                        }
                        locator.columnNumber = p - lineStart + 1;
                    }
                    var lineStart = 0;
                    var lineEnd = 0;
                    var linePattern = /.*(?:\r\n?|\n)|.*$/g;
                    var locator = domBuilder.locator;
                    var parseStack = [
                        {
                            currentNSMap: defaultNSMapCopy
                        }
                    ];
                    var closeMap = {};
                    var start = 0;
                    while(true){
                        try {
                            var tagStart = source.indexOf("<", start);
                            if (tagStart < 0) {
                                if (!source.substr(start).match(/^\s*$/)) {
                                    var doc = domBuilder.doc;
                                    var text = doc.createTextNode(source.substr(start));
                                    doc.appendChild(text);
                                    domBuilder.currentElement = text;
                                }
                                return;
                            }
                            if (tagStart > start) appendText(tagStart);
                            switch(source.charAt(tagStart + 1)){
                                case "/":
                                    var end = source.indexOf(">", tagStart + 3);
                                    var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
                                    var config = parseStack.pop();
                                    if (end < 0) {
                                        tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                                        errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                                        end = tagStart + 1 + tagName.length;
                                    } else if (tagName.match(/\s</)) {
                                        tagName = tagName.replace(/[\s<].*/, "");
                                        errorHandler.error("end tag name: " + tagName + " maybe not complete");
                                        end = tagStart + 1 + tagName.length;
                                    }
                                    var localNSMap = config.localNSMap;
                                    var endMatch = config.tagName == tagName;
                                    var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
                                    if (endIgnoreCaseMach) {
                                        domBuilder.endElement(config.uri, config.localName, tagName);
                                        if (localNSMap) {
                                            for(var prefix in localNSMap)if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) domBuilder.endPrefixMapping(prefix);
                                        }
                                        if (!endMatch) errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName); // No known test case
                                    } else parseStack.push(config);
                                    end++;
                                    break;
                                // end elment
                                case "?":
                                    locator && position(tagStart);
                                    end = parseInstruction(source, tagStart, domBuilder);
                                    break;
                                case "!":
                                    locator && position(tagStart);
                                    end = parseDCC(source, tagStart, domBuilder, errorHandler);
                                    break;
                                default:
                                    locator && position(tagStart);
                                    var el = new ElementAttributes();
                                    var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
                                    //elStartEnd
                                    var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
                                    var len = el.length;
                                    if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                                        el.closed = true;
                                        if (!entityMap.nbsp) errorHandler.warning("unclosed xml attribute");
                                    }
                                    if (locator && len) {
                                        var locator2 = copyLocator(locator, {});
                                        //try{//attribute position fixed
                                        for(var i = 0; i < len; i++){
                                            var a = el[i];
                                            position(a.offset);
                                            a.locator = copyLocator(locator, {});
                                        }
                                        domBuilder.locator = locator2;
                                        if (appendElement(el, domBuilder, currentNSMap)) parseStack.push(el);
                                        domBuilder.locator = locator;
                                    } else if (appendElement(el, domBuilder, currentNSMap)) parseStack.push(el);
                                    if (NAMESPACE.isHTML(el.uri) && !el.closed) end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
                                    else end++;
                            }
                        } catch (e) {
                            if (e instanceof ParseError) throw e;
                            errorHandler.error("element parse error: " + e);
                            end = -1;
                        }
                        if (end > start) start = end;
                        else //TODO: 这里有可能sax回退，有位置错误风险
                        appendText(Math.max(tagStart, start) + 1);
                    }
                }
                function copyLocator(f, t) {
                    t.lineNumber = f.lineNumber;
                    t.columnNumber = f.columnNumber;
                    return t;
                }
                /**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */ function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
                    /**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */ function addAttribute(qname, value, startIndex) {
                        if (el.attributeNames.hasOwnProperty(qname)) errorHandler.fatalError("Attribute " + qname + " redefined");
                        el.addValue(qname, // @see https://www.w3.org/TR/xml/#AVNormalize
                        // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
                        // - recursive replacement of (DTD) entity references
                        // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
                        value.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer), startIndex);
                    }
                    var attrName;
                    var value;
                    var p = ++start;
                    var s = S_TAG; //status
                    while(true){
                        var c = source.charAt(p);
                        switch(c){
                            case "=":
                                if (s === S_ATTR) {
                                    attrName = source.slice(start, p);
                                    s = S_EQ;
                                } else if (s === S_ATTR_SPACE) s = S_EQ;
                                else //fatalError: equal must after attrName or space after attrName
                                throw new Error("attribute equal must after attrName"); // No known test case
                                break;
                            case "'":
                            case '"':
                                if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
                                ) {
                                    if (s === S_ATTR) {
                                        errorHandler.warning('attribute value must after "="');
                                        attrName = source.slice(start, p);
                                    }
                                    start = p + 1;
                                    p = source.indexOf(c, start);
                                    if (p > 0) {
                                        value = source.slice(start, p);
                                        addAttribute(attrName, value, start - 1);
                                        s = S_ATTR_END;
                                    } else //fatalError: no end quot match
                                    throw new Error("attribute value no end '" + c + "' match");
                                } else if (s == S_ATTR_NOQUOT_VALUE) {
                                    value = source.slice(start, p);
                                    addAttribute(attrName, value, start);
                                    errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
                                    start = p + 1;
                                    s = S_ATTR_END;
                                } else //fatalError: no equal before
                                throw new Error('attribute value must after "="'); // No known test case
                                break;
                            case "/":
                                switch(s){
                                    case S_TAG:
                                        el.setTagName(source.slice(start, p));
                                    case S_ATTR_END:
                                    case S_TAG_SPACE:
                                    case S_TAG_CLOSE:
                                        s = S_TAG_CLOSE;
                                        el.closed = true;
                                    case S_ATTR_NOQUOT_VALUE:
                                    case S_ATTR:
                                    case S_ATTR_SPACE:
                                        break;
                                    //case S_EQ:
                                    default:
                                        throw new Error("attribute invalid close char('/')") // No known test case
                                        ;
                                }
                                break;
                            case "":
                                errorHandler.error("unexpected end of input");
                                if (s == S_TAG) el.setTagName(source.slice(start, p));
                                return p;
                            case ">":
                                switch(s){
                                    case S_TAG:
                                        el.setTagName(source.slice(start, p));
                                    case S_ATTR_END:
                                    case S_TAG_SPACE:
                                    case S_TAG_CLOSE:
                                        break; //normal
                                    case S_ATTR_NOQUOT_VALUE:
                                    case S_ATTR:
                                        value = source.slice(start, p);
                                        if (value.slice(-1) === "/") {
                                            el.closed = true;
                                            value = value.slice(0, -1);
                                        }
                                    case S_ATTR_SPACE:
                                        if (s === S_ATTR_SPACE) value = attrName;
                                        if (s == S_ATTR_NOQUOT_VALUE) {
                                            errorHandler.warning('attribute "' + value + '" missed quot(")!');
                                            addAttribute(attrName, value, start);
                                        } else {
                                            if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                                            addAttribute(value, value, start);
                                        }
                                        break;
                                    case S_EQ:
                                        throw new Error("attribute value missed!!");
                                }
                                //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
                                return p;
                            /*xml space '\x20' | #x9 | #xD | #xA; */ case "\x80":
                                c = " ";
                            default:
                                if (c <= " ") switch(s){
                                    case S_TAG:
                                        el.setTagName(source.slice(start, p)); //tagName
                                        s = S_TAG_SPACE;
                                        break;
                                    case S_ATTR:
                                        attrName = source.slice(start, p);
                                        s = S_ATTR_SPACE;
                                        break;
                                    case S_ATTR_NOQUOT_VALUE:
                                        var value = source.slice(start, p);
                                        errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                                        addAttribute(attrName, value, start);
                                    case S_ATTR_END:
                                        s = S_TAG_SPACE;
                                        break;
                                }
                                else //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
                                //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
                                switch(s){
                                    //case S_TAG:void();break;
                                    //case S_ATTR:void();break;
                                    //case S_ATTR_NOQUOT_VALUE:void();break;
                                    case S_ATTR_SPACE:
                                        var tagName = el.tagName;
                                        if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                                        addAttribute(attrName, attrName, start);
                                        start = p;
                                        s = S_ATTR;
                                        break;
                                    case S_ATTR_END:
                                        errorHandler.warning('attribute space is required"' + attrName + '"!!');
                                    case S_TAG_SPACE:
                                        s = S_ATTR;
                                        start = p;
                                        break;
                                    case S_EQ:
                                        s = S_ATTR_NOQUOT_VALUE;
                                        start = p;
                                        break;
                                    case S_TAG_CLOSE:
                                        throw new Error("elements closed character '/' and '>' must be connected to");
                                }
                        } //end outer switch
                        //console.log('p++',p)
                        p++;
                    }
                }
                /**
 * @return true if has new namespace define
 */ function appendElement(el, domBuilder, currentNSMap) {
                    var tagName = el.tagName;
                    var localNSMap = null;
                    //var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
                    var i = el.length;
                    while(i--){
                        var a = el[i];
                        var qName = a.qName;
                        var value = a.value;
                        var nsp = qName.indexOf(":");
                        if (nsp > 0) {
                            var prefix = a.prefix = qName.slice(0, nsp);
                            var localName = qName.slice(nsp + 1);
                            var nsPrefix = prefix === "xmlns" && localName;
                        } else {
                            localName = qName;
                            prefix = null;
                            nsPrefix = qName === "xmlns" && "";
                        }
                        //can not set prefix,because prefix !== ''
                        a.localName = localName;
                        //prefix == null for no ns prefix attribute
                        if (nsPrefix !== false) {
                            if (localNSMap == null) {
                                localNSMap = {};
                                //console.log(currentNSMap,0)
                                _copy(currentNSMap, currentNSMap = {});
                            //console.log(currentNSMap,1)
                            }
                            currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
                            a.uri = NAMESPACE.XMLNS;
                            domBuilder.startPrefixMapping(nsPrefix, value);
                        }
                    }
                    var i = el.length;
                    while(i--){
                        a = el[i];
                        var prefix = a.prefix;
                        if (prefix) {
                            if (prefix === "xml") a.uri = NAMESPACE.XML;
                            if (prefix !== "xmlns") a.uri = currentNSMap[prefix || ""];
                        }
                    }
                    var nsp = tagName.indexOf(":");
                    if (nsp > 0) {
                        prefix = el.prefix = tagName.slice(0, nsp);
                        localName = el.localName = tagName.slice(nsp + 1);
                    } else {
                        prefix = null; //important!!
                        localName = el.localName = tagName;
                    }
                    //no prefix element has default namespace
                    var ns = el.uri = currentNSMap[prefix || ""];
                    domBuilder.startElement(ns, localName, tagName, el);
                    //endPrefixMapping and startPrefixMapping have not any help for dom builder
                    //localNSMap = null
                    if (el.closed) {
                        domBuilder.endElement(ns, localName, tagName);
                        if (localNSMap) {
                            for(prefix in localNSMap)if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) domBuilder.endPrefixMapping(prefix);
                        }
                    } else {
                        el.currentNSMap = currentNSMap;
                        el.localNSMap = localNSMap;
                        //parseStack.push(el);
                        return true;
                    }
                }
                function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
                    if (/^(?:script|textarea)$/i.test(tagName)) {
                        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
                        var text = source.substring(elStartEnd + 1, elEndStart);
                        if (/[&<]/.test(text)) {
                            if (/^script$/i.test(tagName)) {
                                //if(!/\]\]>/.test(text)){
                                //lexHandler.startCDATA();
                                domBuilder.characters(text, 0, text.length);
                                //lexHandler.endCDATA();
                                return elEndStart;
                            //}
                            } //}else{//text area
                            text = text.replace(/&#?\w+;/g, entityReplacer);
                            domBuilder.characters(text, 0, text.length);
                            return elEndStart;
                        //}
                        }
                    }
                    return elStartEnd + 1;
                }
                function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
                    //if(tagName in closeMap){
                    var pos = closeMap[tagName];
                    if (pos == null) {
                        //console.log(tagName)
                        pos = source.lastIndexOf("</" + tagName + ">");
                        if (pos < elStartEnd) pos = source.lastIndexOf("</" + tagName);
                        closeMap[tagName] = pos;
                    }
                    return pos < elStartEnd;
                //}
                }
                function _copy(source, target) {
                    for(var n in source)if (Object.prototype.hasOwnProperty.call(source, n)) target[n] = source[n];
                }
                function parseDCC(source, start, domBuilder, errorHandler) {
                    var next = source.charAt(start + 2);
                    switch(next){
                        case "-":
                            if (source.charAt(start + 3) === "-") {
                                var end = source.indexOf("-->", start + 4);
                                //append comment source.substring(4,end)//<!--
                                if (end > start) {
                                    domBuilder.comment(source, start + 4, end - start - 4);
                                    return end + 3;
                                } else {
                                    errorHandler.error("Unclosed comment");
                                    return -1;
                                }
                            } else //error
                            return -1;
                        default:
                            if (source.substr(start + 3, 6) == "CDATA[") {
                                var end = source.indexOf("]]>", start + 9);
                                domBuilder.startCDATA();
                                domBuilder.characters(source, start + 9, end - start - 9);
                                domBuilder.endCDATA();
                                return end + 3;
                            }
                            //<!DOCTYPE
                            //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
                            var matchs = split(source, start);
                            var len = matchs.length;
                            if (len > 1 && /!doctype/i.test(matchs[0][0])) {
                                var name = matchs[1][0];
                                var pubid = false;
                                var sysid = false;
                                if (len > 3) {
                                    if (/^public$/i.test(matchs[2][0])) {
                                        pubid = matchs[3][0];
                                        sysid = len > 4 && matchs[4][0];
                                    } else if (/^system$/i.test(matchs[2][0])) sysid = matchs[3][0];
                                }
                                var lastMatch = matchs[len - 1];
                                domBuilder.startDTD(name, pubid, sysid);
                                domBuilder.endDTD();
                                return lastMatch.index + lastMatch[0].length;
                            }
                    }
                    return -1;
                }
                function parseInstruction(source, start, domBuilder) {
                    var end = source.indexOf("?>", start);
                    if (end) {
                        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                        if (match) {
                            var len = match[0].length;
                            domBuilder.processingInstruction(match[1], match[2]);
                            return end + 2;
                        } else return -1;
                    }
                    return -1;
                }
                function ElementAttributes() {
                    this.attributeNames = {};
                }
                ElementAttributes.prototype = {
                    setTagName: function(tagName) {
                        if (!tagNamePattern.test(tagName)) throw new Error("invalid tagName:" + tagName);
                        this.tagName = tagName;
                    },
                    addValue: function(qName, value, offset) {
                        if (!tagNamePattern.test(qName)) throw new Error("invalid attribute:" + qName);
                        this.attributeNames[qName] = this.length;
                        this[this.length++] = {
                            qName: qName,
                            value: value,
                            offset: offset
                        };
                    },
                    length: 0,
                    getLocalName: function(i) {
                        return this[i].localName;
                    },
                    getLocator: function(i) {
                        return this[i].locator;
                    },
                    getQName: function(i) {
                        return this[i].qName;
                    },
                    getURI: function(i) {
                        return this[i].uri;
                    },
                    getValue: function(i) {
                        return this[i].value;
                    }
                };
                function split(source, start) {
                    var match;
                    var buf = [];
                    var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                    reg.lastIndex = start;
                    reg.exec(source); //skip <
                    while(match = reg.exec(source)){
                        buf.push(match);
                        if (match[1]) return buf;
                    }
                }
                exports.XMLReader = XMLReader;
                exports.ParseError = ParseError;
            },
            {
                "./conventions": 1
            }
        ],
        8: [
            function(require, module1, exports) {
                // create DOMParser variable from xmldom
                var DOMParser = require("xmldom-qsa").DOMParser;
                var DOMImplementation = require("xmldom-qsa").DOMImplementation;
                // necessary to create a standalone browserify version
                module1.exports = {
                    DOMParser: DOMParser,
                    DOMImplementation: DOMImplementation
                };
            },
            {
                "xmldom-qsa": 6
            }
        ]
    }, {}, [
        8
    ])(8);
});

},{}]},["7pddQ"], null, "parcelRequiredb4e")

//# sourceMappingURL=backgroundWorker.1020577a.js.map
