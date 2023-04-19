importScripts("./backgroundWorker.3d66f3d2.js");
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
})({"B03Xv":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "a8fb9c35fdafe466";
module.bundle.HMR_BUNDLE_ID = "4a04e6c5422e625b";
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

},{}],"h19CZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _d3 = require("d3");
var _d3Shape = require("d3-shape");
var _queue = require("../static/queue");
var _renderBackground = require("../d3/renderBackground");
var _renderBackgroundDefault = parcelHelpers.interopDefault(_renderBackground);
var _svgPathProperties = require("svg-path-properties");
var _earcut = require("earcut");
var _earcutDefault = parcelHelpers.interopDefault(_earcut);
// @ts-ignore
var _domparserBundle = require("../domparser_bundle");
var _domparserBundleDefault = parcelHelpers.interopDefault(_domparserBundle);
const DOMImplementation = (0, _domparserBundleDefault.default).DOMImplementation;
const backgroundWorker = self;
class worker {
    background = (0, _renderBackgroundDefault.default)();
    ctx = null;
    canvasHeight = 0;
    canvasWidth = 0;
    dom = new DOMImplementation().createDocument();
    ratio = 2;
    generator = (0, _d3Shape.arc)();
    ringSet = [];
    ringHeights = {};
    sliceSet = [];
    sliceAngles = {};
    sliceColors = {};
    path = (0, _d3Shape.arc)()({
        innerRadius: 50,
        outerRadius: 300,
        startAngle: 0,
        endAngle: 97 * Math.PI / 180
    });
    poly = [
        10,
        0,
        0,
        50,
        60,
        60,
        70,
        10
    ];
    setContext(ctx) {
        this.ctx = ctx;
    }
    setDimensions(w, h, r) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.ratio = r;
    }
    draw() {
        const { ctx , canvasWidth , canvasHeight , ratio , path , poly  } = this;
        if (ctx) {
            ctx.save();
            ctx.clearRect(0, 0, Math.floor(canvasWidth * ratio), Math.floor(canvasHeight * ratio));
            ctx.lineWidth = .75;
            ctx.setTransform(ratio, 0, 0, ratio, Math.floor(canvasWidth * ratio) / 2, Math.floor(canvasHeight * ratio) / 2);
            (0, _d3.select)(this.dom).selectAll("custom.section").each(function(d, i) {
                const path = (0, _d3.select)(this).select("path"), id = (0, _d3.select)(this).attr("id"), fill = path.attr("fill"), opacity = +path.attr("opacity"), svgPath = path.attr("d");
                ctx.strokeStyle = "#000000";
                ctx.fillStyle = fill;
                ctx.globalAlpha = .9 //<-- make the background a little opaqu so the shapes stand out
                ;
                if (svgPath && ctx && !id.includes("_border")) {
                    ctx.stroke(new Path2D(svgPath));
                    ctx.fill(new Path2D(svgPath));
                }
            });
            ctx.globalAlpha = 1;
            ctx.stroke();
            ctx.restore();
        }
    }
    generateArcs() {
        const { ringSet , ringHeights , sliceSet , sliceColors , sliceAngles  } = this;
        return sliceSet.reduce((acc, slice)=>{
            if (sliceAngles[slice]) {
                const { startAngle , endAngle  } = sliceAngles[slice];
                const sections = ringSet.reduce((acc, ring, j)=>{
                    if (ringHeights[ring]) {
                        const { innerRadius , outerRadius  } = ringHeights[ring];
                        const id = `_${slice}_${ring}`;
                        const slicePallet = sliceColors[slice];
                        const fill = slicePallet[j % slicePallet.length];
                        const arc = {
                            id,
                            innerRadius,
                            outerRadius,
                            startAngle,
                            endAngle,
                            fill
                        };
                        const border = {
                            id: id + "_border",
                            innerRadius: innerRadius + 5,
                            outerRadius: outerRadius - 5,
                            startAngle: startAngle + 5 * Math.PI / 180,
                            endAngle: endAngle - 5 * Math.PI / 180,
                            fill: "black"
                        };
                        acc = [
                            ...acc,
                            arc,
                            border
                        ];
                    }
                    return acc;
                }, []);
                acc = [
                    ...acc,
                    ...sections
                ];
            }
            return acc;
        }, []);
    }
    initChart(ringSet, ringHeights, sliceSet, sliceAngles, sliceColors) {
        const queue = new (0, _queue.Queue)();
        this.sliceColors = sliceColors;
        this.ringSet = ringSet;
        this.ringHeights = ringHeights;
        this.sliceSet = sliceSet;
        this.sliceAngles = sliceAngles;
        const initialSections = sliceSet.flatMap((slice, i)=>{
            const { startAngle , endAngle  } = sliceAngles[slice];
            return ringSet.map((ring, j)=>{
                const { innerRadius , outerRadius  } = ringHeights[ring];
                const id = `_${slice}_${ring}`;
                const slicePallet = sliceColors[slice];
                const fill = slicePallet[j % slicePallet.length];
                return {
                    id,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle,
                    fill
                };
            });
        });
        queue.enqueue({
            type: "sections",
            input: initialSections
        });
        (0, _d3.select)(this.dom).call(this.background.queue(queue).generator((0, _d3Shape.arc)()).interpolator((0, _d3.interpolate)).draw(()=>this.draw()));
    }
    updateSliceAngles(sliceAngles) {
        this.sliceAngles = sliceAngles;
        this.generateArcs();
    }
    updateSliceSet(sliceSet, sliceAngles, sliceColors) {
        const { sliceSet: oldSliceSet  } = this;
        this.sliceSet = sliceSet;
        this.sliceColors = sliceColors;
        if (oldSliceSet.length === 0) {
            this.sliceAngles = Object.fromEntries(sliceSet.map((slice)=>[
                    slice,
                    {
                        startAngle: 0,
                        endAngle: 0
                    }
                ]));
            const startSlices = {
                type: "sections",
                input: this.generateArcs()
            };
            this.background.enqueue(startSlices);
        }
        this.sliceAngles = sliceAngles;
        this.getPathPoints();
        const endSlices = {
            type: "sections",
            input: this.generateArcs()
        };
        this.background.enqueue(endSlices);
        this.background.dequeue();
    // this.getPathPoints()
    }
    removeSlices() {
        //enqueue the transition, but don't dequeue it
        const { sliceSet  } = this;
        const outGointSliceAngles = Object.fromEntries(sliceSet.map((slice)=>[
                slice,
                {
                    startAngle: 2 * Math.PI,
                    endAngle: 2 * Math.PI
                }
            ]));
        this.sliceAngles = outGointSliceAngles;
        const leavingArcs = {
            type: "sections",
            input: this.generateArcs()
        };
        this.background.enqueue({
            type: "duration",
            input: 400
        });
        this.background.enqueue(leavingArcs);
        this.sliceSet = [];
    }
    updateRingSet(ringSet, ringHeights) {
        const { ringSet: oldRingSet  } = this;
        this.ringSet = ringSet;
        if (oldRingSet.length === 0) {
            this.background.enqueue({
                type: "duration",
                input: 400 / ringSet.length
            });
            const startingHeights = Object.fromEntries(ringSet.map((ring)=>[
                    ring,
                    {
                        innerRadius: 0,
                        outerRadius: 0
                    }
                ]));
            this.ringHeights = startingHeights;
            this.background.enqueue({
                type: "sections",
                input: this.generateArcs()
            });
            ringSet.forEach((ring, i)=>{
                const intermediateRingSet = ringSet.slice(i);
                const { innerRadius , outerRadius  } = ringHeights[ring];
                this.ringHeights[ring] = {
                    innerRadius,
                    outerRadius
                };
                intermediateRingSet.forEach((ring)=>this.ringHeights[ring] = {
                        innerRadius,
                        outerRadius
                    });
                const arcsWIthRing = this.generateArcs();
                this.background.enqueue({
                    type: "sections",
                    input: arcsWIthRing
                });
            });
        }
        this.ringHeights = ringHeights;
        this.background.enqueue({
            type: "sections",
            input: this.generateArcs()
        });
        this.background.dequeue();
        this.getPathPoints();
    }
    removeRings() {
        const { ringSet  } = this;
        this.background.enqueue({
            type: "duration",
            input: 400 / ringSet.length
        });
        ringSet.forEach((ring, i)=>{
            const { outerRadius  } = this.ringHeights[ring];
            this.ringHeights[ring] = {
                innerRadius: outerRadius,
                outerRadius
            };
            const arcsWIthRing = this.generateArcs();
            this.background.enqueue({
                type: "sections",
                input: arcsWIthRing
            });
            this.ringSet = ringSet.slice(i);
            delete this.ringHeights[ring];
        });
        this.ringSet = [];
    }
    getPathPoints() {
        const { generator  } = this;
        const sectionCoords = {};
        const sectionVerts = {};
        const arcs = this.generateArcs() //<--NOTE: destrcutring the method from "this" causes an error. look into that
        ;
        arcs.forEach(function(d, i) {
            if (d.id.includes("_border")) {
                // triangulate the boarder polygon
                const path = generator(d) || "", num_points = 100, points = [], pathProperties = new (0, _svgPathProperties.svgPathProperties)(path), pathLength = pathProperties.getTotalLength();
                for(let i = 0; i < num_points; ++i){
                    let { x , y  } = pathProperties.getPointAtLength(i * pathLength / (num_points - 1));
                    points.push(x);
                    points.push(y);
                }
                const ears = (0, _earcutDefault.default)(points), //fetch the coordiantes of the triangle vertices from the points array
                vertices = ears.reduce((acc, index)=>{
                    const i = index * 2;
                    return [
                        ...acc,
                        [
                            points[i],
                            points[i + 1]
                        ]
                    ];
                }, []);
                sectionVerts[d.id] = vertices;
                //seed the positions within the boarder polygon
                const coords = [];
                for(let i = 0; i < 200; ++i){
                    const { startAngle , endAngle , innerRadius , outerRadius , id  } = d;
                    if (id.includes("_border")) {
                        const randomClampedR = Math.random() * (outerRadius - innerRadius) + innerRadius, randomClampedTheta = Math.random() * (endAngle - startAngle) + startAngle - Math.PI / 2, x = Math.cos(randomClampedTheta) * randomClampedR, y = Math.sin(randomClampedTheta) * randomClampedR;
                        coords.push([
                            x,
                            y
                        ]);
                    }
                }
                sectionCoords[d.id] = coords;
            }
        });
        self.postMessage({
            sectionVerts,
            sectionCoords
        });
    }
}
const brw = new worker();
self.addEventListener("message", (msg)=>{
    const { type , canvas , w , h , r , ringSet , ringHeights , sliceSet , sliceAngles , sliceColors  } = msg.data;
    if (type === "set_ctx" && canvas) {
        const ctx = canvas.getContext("2d");
        brw.setContext(ctx);
    }
    if (type === "set_dimensions" && w && h && r) brw.setDimensions(w, h, r);
    if (type === "init_chart" && ringSet && ringHeights && sliceSet && sliceAngles && sliceColors) brw.initChart(ringSet, ringHeights, sliceSet, sliceAngles, sliceColors);
    if (type === "update_slice_set" && sliceSet && sliceAngles && sliceColors) brw.updateSliceSet(sliceSet, sliceAngles, sliceColors);
    if (type === "update_ring_set" && ringSet && ringHeights) brw.updateRingSet(ringSet, ringHeights);
    if (type === "remove_rings") brw.removeRings();
    if (type === "remove_slices") brw.removeSlices();
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk","../domparser_bundle":"82hnu","../d3/renderBackground":"ehvhk","d3":"7K7cD","../static/queue":"1rujW","d3-shape":"fVWdL","svg-path-properties":"cdmva","earcut":"bepWE"}],"1rujW":[function(require,module,exports) {
//this is probbaly overkill, but I want a real queue
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Queue", ()=>Queue);
class Queue {
    _oldestIndex = 1;
    _newestIndex = 1;
    _storage = {};
    size() {
        return this._newestIndex - this._oldestIndex;
    }
    enqueue(datum) {
        this._storage[this._newestIndex] = datum;
        this._newestIndex++;
    }
    dequeue() {
        let oldestIndex = this._oldestIndex, newestIndex = this._newestIndex, deletedData;
        if (oldestIndex !== newestIndex) {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;
            return deletedData;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"cdmva":[function(require,module,exports) {
// http://geoexamples.com/path-properties/ v1.0.13 Copyright 2022 Roger Veciana i Rovira
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "svgPathProperties", ()=>C);
function t(t, n, e) {
    return n in t ? Object.defineProperty(t, n, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[n] = e, t;
}
function n(t) {
    return function(t) {
        if (Array.isArray(t)) return e(t);
    }(t) || function(t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
    }(t) || function(t, n) {
        if (!t) return;
        if ("string" == typeof t) return e(t, n);
        var i = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === i && t.constructor && (i = t.constructor.name);
        if ("Map" === i || "Set" === i) return Array.from(t);
        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return e(t, n);
    }(t) || function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
}
function e(t, n) {
    (null == n || n > t.length) && (n = t.length);
    for(var e = 0, i = new Array(n); e < n; e++)i[e] = t[e];
    return i;
}
var i = {
    a: 7,
    c: 6,
    h: 1,
    l: 2,
    m: 2,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    z: 0
}, h = /([astvzqmhlc])([^astvzqmhlc]*)/gi, r = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi, s = function(t) {
    var n = t.match(r);
    return n ? n.map(Number) : [];
}, a = function(n, e, i, h) {
    var r = this;
    t(this, "x0", void 0), t(this, "x1", void 0), t(this, "y0", void 0), t(this, "y1", void 0), t(this, "getTotalLength", function() {
        return Math.sqrt(Math.pow(r.x0 - r.x1, 2) + Math.pow(r.y0 - r.y1, 2));
    }), t(this, "getPointAtLength", function(t) {
        var n = t / Math.sqrt(Math.pow(r.x0 - r.x1, 2) + Math.pow(r.y0 - r.y1, 2));
        n = Number.isNaN(n) ? 1 : n;
        var e = (r.x1 - r.x0) * n, i = (r.y1 - r.y0) * n;
        return {
            x: r.x0 + e,
            y: r.y0 + i
        };
    }), t(this, "getTangentAtLength", function(t) {
        var n = Math.sqrt((r.x1 - r.x0) * (r.x1 - r.x0) + (r.y1 - r.y0) * (r.y1 - r.y0));
        return {
            x: -(r.x1 - r.x0) / n,
            y: -(r.y1 - r.y0) / n
        };
    }), t(this, "getPropertiesAtLength", function(t) {
        var n = r.getPointAtLength(t), e = r.getTangentAtLength(t);
        return {
            x: n.x,
            y: n.y,
            tangentX: e.x,
            tangentY: e.y
        };
    }), this.x0 = n, this.x1 = e, this.y0 = i, this.y1 = h;
}, o = function(n, e, i, h, r, s, a, o, l) {
    var c = this;
    t(this, "x0", void 0), t(this, "y0", void 0), t(this, "rx", void 0), t(this, "ry", void 0), t(this, "xAxisRotate", void 0), t(this, "LargeArcFlag", void 0), t(this, "SweepFlag", void 0), t(this, "x1", void 0), t(this, "y1", void 0), t(this, "length", void 0), t(this, "getTotalLength", function() {
        return c.length;
    }), t(this, "getPointAtLength", function(t) {
        t < 0 ? t = 0 : t > c.length && (t = c.length);
        var n = g({
            x: c.x0,
            y: c.y0
        }, c.rx, c.ry, c.xAxisRotate, c.LargeArcFlag, c.SweepFlag, {
            x: c.x1,
            y: c.y1
        }, t / c.length);
        return {
            x: n.x,
            y: n.y
        };
    }), t(this, "getTangentAtLength", function(t) {
        t < 0 ? t = 0 : t > c.length && (t = c.length);
        var n, e = .05, i = c.getPointAtLength(t);
        t < 0 ? t = 0 : t > c.length && (t = c.length);
        var h = (n = t < c.length - e ? c.getPointAtLength(t + e) : c.getPointAtLength(t - e)).x - i.x, r = n.y - i.y, s = Math.sqrt(h * h + r * r);
        return t < c.length - e ? {
            x: -h / s,
            y: -r / s
        } : {
            x: h / s,
            y: r / s
        };
    }), t(this, "getPropertiesAtLength", function(t) {
        var n = c.getTangentAtLength(t), e = c.getPointAtLength(t);
        return {
            x: e.x,
            y: e.y,
            tangentX: n.x,
            tangentY: n.y
        };
    }), this.x0 = n, this.y0 = e, this.rx = i, this.ry = h, this.xAxisRotate = r, this.LargeArcFlag = s, this.SweepFlag = a, this.x1 = o, this.y1 = l;
    var f = u(300, function(t) {
        return g({
            x: n,
            y: e
        }, i, h, r, s, a, {
            x: o,
            y: l
        }, t);
    });
    this.length = f.arcLength;
}, g = function(t, n, e, i, h, r, s, a) {
    n = Math.abs(n), e = Math.abs(e), i = l(i, 360);
    var o = c(i);
    if (t.x === s.x && t.y === s.y) return {
        x: t.x,
        y: t.y,
        ellipticalArcAngle: 0
    };
    if (0 === n || 0 === e) return {
        x: 0,
        y: 0,
        ellipticalArcAngle: 0
    };
    var g = (t.x - s.x) / 2, u = (t.y - s.y) / 2, f = {
        x: Math.cos(o) * g + Math.sin(o) * u,
        y: -Math.sin(o) * g + Math.cos(o) * u
    }, y = Math.pow(f.x, 2) / Math.pow(n, 2) + Math.pow(f.y, 2) / Math.pow(e, 2);
    y > 1 && (n = Math.sqrt(y) * n, e = Math.sqrt(y) * e);
    var p = (Math.pow(n, 2) * Math.pow(e, 2) - Math.pow(n, 2) * Math.pow(f.y, 2) - Math.pow(e, 2) * Math.pow(f.x, 2)) / (Math.pow(n, 2) * Math.pow(f.y, 2) + Math.pow(e, 2) * Math.pow(f.x, 2));
    p = p < 0 ? 0 : p;
    var v = (h !== r ? 1 : -1) * Math.sqrt(p), M = v * (n * f.y / e), L = v * (-e * f.x / n), w = {
        x: Math.cos(o) * M - Math.sin(o) * L + (t.x + s.x) / 2,
        y: Math.sin(o) * M + Math.cos(o) * L + (t.y + s.y) / 2
    }, A = {
        x: (f.x - M) / n,
        y: (f.y - L) / e
    }, d = x({
        x: 1,
        y: 0
    }, A), P = x(A, {
        x: (-f.x - M) / n,
        y: (-f.y - L) / e
    });
    !r && P > 0 ? P -= 2 * Math.PI : r && P < 0 && (P += 2 * Math.PI);
    var b = d + (P %= 2 * Math.PI) * a, T = n * Math.cos(b), m = e * Math.sin(b);
    return {
        x: Math.cos(o) * T - Math.sin(o) * m + w.x,
        y: Math.sin(o) * T + Math.cos(o) * m + w.y,
        ellipticalArcStartAngle: d,
        ellipticalArcEndAngle: d + P,
        ellipticalArcAngle: b,
        ellipticalArcCenter: w,
        resultantRx: n,
        resultantRy: e
    };
}, u = function(t, n) {
    t = t || 500;
    for(var e, i = 0, h = [], r = [], s = n(0), a = 0; a < t; a++){
        var o = y(a * (1 / t), 0, 1);
        e = n(o), i += f(s, e), r.push([
            s,
            e
        ]), h.push({
            t: o,
            arcLength: i
        }), s = e;
    }
    return e = n(1), r.push([
        s,
        e
    ]), i += f(s, e), h.push({
        t: 1,
        arcLength: i
    }), {
        arcLength: i,
        arcLengthMap: h,
        approximationLines: r
    };
}, l = function(t, n) {
    return (t % n + n) % n;
}, c = function(t) {
    return t * (Math.PI / 180);
}, f = function(t, n) {
    return Math.sqrt(Math.pow(n.x - t.x, 2) + Math.pow(n.y - t.y, 2));
}, y = function(t, n, e) {
    return Math.min(Math.max(t, n), e);
}, x = function(t, n) {
    var e = t.x * n.x + t.y * n.y, i = Math.sqrt((Math.pow(t.x, 2) + Math.pow(t.y, 2)) * (Math.pow(n.x, 2) + Math.pow(n.y, 2)));
    return (t.x * n.y - t.y * n.x < 0 ? -1 : 1) * Math.acos(e / i);
}, p = [
    [],
    [],
    [
        -0.5773502691896257,
        .5773502691896257
    ],
    [
        0,
        -0.7745966692414834,
        .7745966692414834
    ],
    [
        -0.33998104358485626,
        .33998104358485626,
        -0.8611363115940526,
        .8611363115940526
    ],
    [
        0,
        -0.5384693101056831,
        .5384693101056831,
        -0.906179845938664,
        .906179845938664
    ],
    [
        .6612093864662645,
        -0.6612093864662645,
        -0.2386191860831969,
        .2386191860831969,
        -0.932469514203152,
        .932469514203152
    ],
    [
        0,
        .4058451513773972,
        -0.4058451513773972,
        -0.7415311855993945,
        .7415311855993945,
        -0.9491079123427585,
        .9491079123427585
    ],
    [
        -0.1834346424956498,
        .1834346424956498,
        -0.525532409916329,
        .525532409916329,
        -0.7966664774136267,
        .7966664774136267,
        -0.9602898564975363,
        .9602898564975363
    ],
    [
        0,
        -0.8360311073266358,
        .8360311073266358,
        -0.9681602395076261,
        .9681602395076261,
        -0.3242534234038089,
        .3242534234038089,
        -0.6133714327005904,
        .6133714327005904
    ],
    [
        -0.14887433898163122,
        .14887433898163122,
        -0.4333953941292472,
        .4333953941292472,
        -0.6794095682990244,
        .6794095682990244,
        -0.8650633666889845,
        .8650633666889845,
        -0.9739065285171717,
        .9739065285171717
    ],
    [
        0,
        -0.26954315595234496,
        .26954315595234496,
        -0.5190961292068118,
        .5190961292068118,
        -0.7301520055740494,
        .7301520055740494,
        -0.8870625997680953,
        .8870625997680953,
        -0.978228658146057,
        .978228658146057
    ],
    [
        -0.1252334085114689,
        .1252334085114689,
        -0.3678314989981802,
        .3678314989981802,
        -0.5873179542866175,
        .5873179542866175,
        -0.7699026741943047,
        .7699026741943047,
        -0.9041172563704749,
        .9041172563704749,
        -0.9815606342467192,
        .9815606342467192
    ],
    [
        0,
        -0.2304583159551348,
        .2304583159551348,
        -0.44849275103644687,
        .44849275103644687,
        -0.6423493394403402,
        .6423493394403402,
        -0.8015780907333099,
        .8015780907333099,
        -0.9175983992229779,
        .9175983992229779,
        -0.9841830547185881,
        .9841830547185881
    ],
    [
        -0.10805494870734367,
        .10805494870734367,
        -0.31911236892788974,
        .31911236892788974,
        -0.5152486363581541,
        .5152486363581541,
        -0.6872929048116855,
        .6872929048116855,
        -0.827201315069765,
        .827201315069765,
        -0.9284348836635735,
        .9284348836635735,
        -0.9862838086968123,
        .9862838086968123
    ],
    [
        0,
        -0.20119409399743451,
        .20119409399743451,
        -0.3941513470775634,
        .3941513470775634,
        -0.5709721726085388,
        .5709721726085388,
        -0.7244177313601701,
        .7244177313601701,
        -0.8482065834104272,
        .8482065834104272,
        -0.937273392400706,
        .937273392400706,
        -0.9879925180204854,
        .9879925180204854
    ],
    [
        -0.09501250983763744,
        .09501250983763744,
        -0.2816035507792589,
        .2816035507792589,
        -0.45801677765722737,
        .45801677765722737,
        -0.6178762444026438,
        .6178762444026438,
        -0.755404408355003,
        .755404408355003,
        -0.8656312023878318,
        .8656312023878318,
        -0.9445750230732326,
        .9445750230732326,
        -0.9894009349916499,
        .9894009349916499
    ],
    [
        0,
        -0.17848418149584785,
        .17848418149584785,
        -0.3512317634538763,
        .3512317634538763,
        -0.5126905370864769,
        .5126905370864769,
        -0.6576711592166907,
        .6576711592166907,
        -0.7815140038968014,
        .7815140038968014,
        -0.8802391537269859,
        .8802391537269859,
        -0.9506755217687678,
        .9506755217687678,
        -0.9905754753144174,
        .9905754753144174
    ],
    [
        -0.0847750130417353,
        .0847750130417353,
        -0.2518862256915055,
        .2518862256915055,
        -0.41175116146284263,
        .41175116146284263,
        -0.5597708310739475,
        .5597708310739475,
        -0.6916870430603532,
        .6916870430603532,
        -0.8037049589725231,
        .8037049589725231,
        -0.8926024664975557,
        .8926024664975557,
        -0.9558239495713977,
        .9558239495713977,
        -0.9915651684209309,
        .9915651684209309
    ],
    [
        0,
        -0.16035864564022537,
        .16035864564022537,
        -0.31656409996362983,
        .31656409996362983,
        -0.46457074137596094,
        .46457074137596094,
        -0.600545304661681,
        .600545304661681,
        -0.7209661773352294,
        .7209661773352294,
        -0.8227146565371428,
        .8227146565371428,
        -0.9031559036148179,
        .9031559036148179,
        -0.96020815213483,
        .96020815213483,
        -0.9924068438435844,
        .9924068438435844
    ],
    [
        -0.07652652113349734,
        .07652652113349734,
        -0.22778585114164507,
        .22778585114164507,
        -0.37370608871541955,
        .37370608871541955,
        -0.5108670019508271,
        .5108670019508271,
        -0.636053680726515,
        .636053680726515,
        -0.7463319064601508,
        .7463319064601508,
        -0.8391169718222188,
        .8391169718222188,
        -0.912234428251326,
        .912234428251326,
        -0.9639719272779138,
        .9639719272779138,
        -0.9931285991850949,
        .9931285991850949
    ],
    [
        0,
        -0.1455618541608951,
        .1455618541608951,
        -0.2880213168024011,
        .2880213168024011,
        -0.4243421202074388,
        .4243421202074388,
        -0.5516188358872198,
        .5516188358872198,
        -0.6671388041974123,
        .6671388041974123,
        -0.7684399634756779,
        .7684399634756779,
        -0.8533633645833173,
        .8533633645833173,
        -0.9200993341504008,
        .9200993341504008,
        -0.9672268385663063,
        .9672268385663063,
        -0.9937521706203895,
        .9937521706203895
    ],
    [
        -0.06973927331972223,
        .06973927331972223,
        -0.20786042668822127,
        .20786042668822127,
        -0.34193582089208424,
        .34193582089208424,
        -0.469355837986757,
        .469355837986757,
        -0.5876404035069116,
        .5876404035069116,
        -0.6944872631866827,
        .6944872631866827,
        -0.7878168059792081,
        .7878168059792081,
        -0.8658125777203002,
        .8658125777203002,
        -0.926956772187174,
        .926956772187174,
        -0.9700604978354287,
        .9700604978354287,
        -0.9942945854823992,
        .9942945854823992
    ],
    [
        0,
        -0.1332568242984661,
        .1332568242984661,
        -0.26413568097034495,
        .26413568097034495,
        -0.3903010380302908,
        .3903010380302908,
        -0.5095014778460075,
        .5095014778460075,
        -0.6196098757636461,
        .6196098757636461,
        -0.7186613631319502,
        .7186613631319502,
        -0.8048884016188399,
        .8048884016188399,
        -0.8767523582704416,
        .8767523582704416,
        -0.9329710868260161,
        .9329710868260161,
        -0.9725424712181152,
        .9725424712181152,
        -0.9947693349975522,
        .9947693349975522
    ],
    [
        -0.06405689286260563,
        .06405689286260563,
        -0.1911188674736163,
        .1911188674736163,
        -0.3150426796961634,
        .3150426796961634,
        -0.4337935076260451,
        .4337935076260451,
        -0.5454214713888396,
        .5454214713888396,
        -0.6480936519369755,
        .6480936519369755,
        -0.7401241915785544,
        .7401241915785544,
        -0.820001985973903,
        .820001985973903,
        -0.8864155270044011,
        .8864155270044011,
        -0.9382745520027328,
        .9382745520027328,
        -0.9747285559713095,
        .9747285559713095,
        -0.9951872199970213,
        .9951872199970213
    ]
], v = [
    [],
    [],
    [
        1,
        1
    ],
    [
        .8888888888888888,
        .5555555555555556,
        .5555555555555556
    ],
    [
        .6521451548625461,
        .6521451548625461,
        .34785484513745385,
        .34785484513745385
    ],
    [
        .5688888888888889,
        .47862867049936647,
        .47862867049936647,
        .23692688505618908,
        .23692688505618908
    ],
    [
        .3607615730481386,
        .3607615730481386,
        .46791393457269104,
        .46791393457269104,
        .17132449237917036,
        .17132449237917036
    ],
    [
        .4179591836734694,
        .3818300505051189,
        .3818300505051189,
        .27970539148927664,
        .27970539148927664,
        .1294849661688697,
        .1294849661688697
    ],
    [
        .362683783378362,
        .362683783378362,
        .31370664587788727,
        .31370664587788727,
        .22238103445337448,
        .22238103445337448,
        .10122853629037626,
        .10122853629037626
    ],
    [
        .3302393550012598,
        .1806481606948574,
        .1806481606948574,
        .08127438836157441,
        .08127438836157441,
        .31234707704000286,
        .31234707704000286,
        .26061069640293544,
        .26061069640293544
    ],
    [
        .29552422471475287,
        .29552422471475287,
        .26926671930999635,
        .26926671930999635,
        .21908636251598204,
        .21908636251598204,
        .1494513491505806,
        .1494513491505806,
        .06667134430868814,
        .06667134430868814
    ],
    [
        .2729250867779006,
        .26280454451024665,
        .26280454451024665,
        .23319376459199048,
        .23319376459199048,
        .18629021092773426,
        .18629021092773426,
        .1255803694649046,
        .1255803694649046,
        .05566856711617366,
        .05566856711617366
    ],
    [
        .24914704581340277,
        .24914704581340277,
        .2334925365383548,
        .2334925365383548,
        .20316742672306592,
        .20316742672306592,
        .16007832854334622,
        .16007832854334622,
        .10693932599531843,
        .10693932599531843,
        .04717533638651183,
        .04717533638651183
    ],
    [
        .2325515532308739,
        .22628318026289723,
        .22628318026289723,
        .2078160475368885,
        .2078160475368885,
        .17814598076194574,
        .17814598076194574,
        .13887351021978725,
        .13887351021978725,
        .09212149983772845,
        .09212149983772845,
        .04048400476531588,
        .04048400476531588
    ],
    [
        .2152638534631578,
        .2152638534631578,
        .2051984637212956,
        .2051984637212956,
        .18553839747793782,
        .18553839747793782,
        .15720316715819355,
        .15720316715819355,
        .12151857068790319,
        .12151857068790319,
        .08015808715976021,
        .08015808715976021,
        .03511946033175186,
        .03511946033175186
    ],
    [
        .2025782419255613,
        .19843148532711158,
        .19843148532711158,
        .1861610000155622,
        .1861610000155622,
        .16626920581699392,
        .16626920581699392,
        .13957067792615432,
        .13957067792615432,
        .10715922046717194,
        .10715922046717194,
        .07036604748810812,
        .07036604748810812,
        .03075324199611727,
        .03075324199611727
    ],
    [
        .1894506104550685,
        .1894506104550685,
        .18260341504492358,
        .18260341504492358,
        .16915651939500254,
        .16915651939500254,
        .14959598881657674,
        .14959598881657674,
        .12462897125553388,
        .12462897125553388,
        .09515851168249279,
        .09515851168249279,
        .062253523938647894,
        .062253523938647894,
        .027152459411754096,
        .027152459411754096
    ],
    [
        .17944647035620653,
        .17656270536699264,
        .17656270536699264,
        .16800410215645004,
        .16800410215645004,
        .15404576107681028,
        .15404576107681028,
        .13513636846852548,
        .13513636846852548,
        .11188384719340397,
        .11188384719340397,
        .08503614831717918,
        .08503614831717918,
        .0554595293739872,
        .0554595293739872,
        .02414830286854793,
        .02414830286854793
    ],
    [
        .1691423829631436,
        .1691423829631436,
        .16427648374583273,
        .16427648374583273,
        .15468467512626524,
        .15468467512626524,
        .14064291467065065,
        .14064291467065065,
        .12255520671147846,
        .12255520671147846,
        .10094204410628717,
        .10094204410628717,
        .07642573025488905,
        .07642573025488905,
        .0497145488949698,
        .0497145488949698,
        .02161601352648331,
        .02161601352648331
    ],
    [
        .1610544498487837,
        .15896884339395434,
        .15896884339395434,
        .15276604206585967,
        .15276604206585967,
        .1426067021736066,
        .1426067021736066,
        .12875396253933621,
        .12875396253933621,
        .11156664554733399,
        .11156664554733399,
        .09149002162245,
        .09149002162245,
        .06904454273764123,
        .06904454273764123,
        .0448142267656996,
        .0448142267656996,
        .019461788229726478,
        .019461788229726478
    ],
    [
        .15275338713072584,
        .15275338713072584,
        .14917298647260374,
        .14917298647260374,
        .14209610931838204,
        .14209610931838204,
        .13168863844917664,
        .13168863844917664,
        .11819453196151841,
        .11819453196151841,
        .10193011981724044,
        .10193011981724044,
        .08327674157670475,
        .08327674157670475,
        .06267204833410907,
        .06267204833410907,
        .04060142980038694,
        .04060142980038694,
        .017614007139152118,
        .017614007139152118
    ],
    [
        .14608113364969041,
        .14452440398997005,
        .14452440398997005,
        .13988739479107315,
        .13988739479107315,
        .13226893863333747,
        .13226893863333747,
        .12183141605372853,
        .12183141605372853,
        .10879729916714838,
        .10879729916714838,
        .09344442345603386,
        .09344442345603386,
        .0761001136283793,
        .0761001136283793,
        .057134425426857205,
        .057134425426857205,
        .036953789770852494,
        .036953789770852494,
        .016017228257774335,
        .016017228257774335
    ],
    [
        .13925187285563198,
        .13925187285563198,
        .13654149834601517,
        .13654149834601517,
        .13117350478706238,
        .13117350478706238,
        .12325237681051242,
        .12325237681051242,
        .11293229608053922,
        .11293229608053922,
        .10041414444288096,
        .10041414444288096,
        .08594160621706773,
        .08594160621706773,
        .06979646842452049,
        .06979646842452049,
        .052293335152683286,
        .052293335152683286,
        .03377490158481415,
        .03377490158481415,
        .0146279952982722,
        .0146279952982722
    ],
    [
        .13365457218610619,
        .1324620394046966,
        .1324620394046966,
        .12890572218808216,
        .12890572218808216,
        .12304908430672953,
        .12304908430672953,
        .11499664022241136,
        .11499664022241136,
        .10489209146454141,
        .10489209146454141,
        .09291576606003515,
        .09291576606003515,
        .07928141177671895,
        .07928141177671895,
        .06423242140852585,
        .06423242140852585,
        .04803767173108467,
        .04803767173108467,
        .030988005856979445,
        .030988005856979445,
        .013411859487141771,
        .013411859487141771
    ],
    [
        .12793819534675216,
        .12793819534675216,
        .1258374563468283,
        .1258374563468283,
        .12167047292780339,
        .12167047292780339,
        .1155056680537256,
        .1155056680537256,
        .10744427011596563,
        .10744427011596563,
        .09761865210411388,
        .09761865210411388,
        .08619016153195327,
        .08619016153195327,
        .0733464814110803,
        .0733464814110803,
        .05929858491543678,
        .05929858491543678,
        .04427743881741981,
        .04427743881741981,
        .028531388628933663,
        .028531388628933663,
        .0123412297999872,
        .0123412297999872
    ]
], M = [
    [
        1
    ],
    [
        1,
        1
    ],
    [
        1,
        2,
        1
    ],
    [
        1,
        3,
        3,
        1
    ]
], L = function(t, n, e) {
    return {
        x: (1 - e) * (1 - e) * (1 - e) * t[0] + 3 * (1 - e) * (1 - e) * e * t[1] + 3 * (1 - e) * e * e * t[2] + e * e * e * t[3],
        y: (1 - e) * (1 - e) * (1 - e) * n[0] + 3 * (1 - e) * (1 - e) * e * n[1] + 3 * (1 - e) * e * e * n[2] + e * e * e * n[3]
    };
}, w = function(t, n, e) {
    return d([
        3 * (t[1] - t[0]),
        3 * (t[2] - t[1]),
        3 * (t[3] - t[2])
    ], [
        3 * (n[1] - n[0]),
        3 * (n[2] - n[1]),
        3 * (n[3] - n[2])
    ], e);
}, A = function(t, n, e) {
    var i, h, r;
    i = e / 2, h = 0;
    for(var s = 0; s < 20; s++)r = i * p[20][s] + i, h += v[20][s] * T(t, n, r);
    return i * h;
}, d = function(t, n, e) {
    return {
        x: (1 - e) * (1 - e) * t[0] + 2 * (1 - e) * e * t[1] + e * e * t[2],
        y: (1 - e) * (1 - e) * n[0] + 2 * (1 - e) * e * n[1] + e * e * n[2]
    };
}, P = function(t, n, e) {
    void 0 === e && (e = 1);
    var i = t[0] - 2 * t[1] + t[2], h = n[0] - 2 * n[1] + n[2], r = 2 * t[1] - 2 * t[0], s = 2 * n[1] - 2 * n[0], a = 4 * (i * i + h * h), o = 4 * (i * r + h * s), g = r * r + s * s;
    if (0 === a) return e * Math.sqrt(Math.pow(t[2] - t[0], 2) + Math.pow(n[2] - n[0], 2));
    var u = o / (2 * a), l = e + u, c = g / a - u * u, f = l * l + c > 0 ? Math.sqrt(l * l + c) : 0, y = u * u + c > 0 ? Math.sqrt(u * u + c) : 0, x = u + Math.sqrt(u * u + c) !== 0 ? c * Math.log(Math.abs((l + f) / (u + y))) : 0;
    return Math.sqrt(a) / 2 * (l * f - u * y + x);
}, b = function(t, n, e) {
    return {
        x: 2 * (1 - e) * (t[1] - t[0]) + 2 * e * (t[2] - t[1]),
        y: 2 * (1 - e) * (n[1] - n[0]) + 2 * e * (n[2] - n[1])
    };
};
function T(t, n, e) {
    var i = m(1, e, t), h = m(1, e, n), r = i * i + h * h;
    return Math.sqrt(r);
}
var m = function t(n, e, i) {
    var h, r, s = i.length - 1;
    if (0 === s) return 0;
    if (0 === n) {
        r = 0;
        for(var a = 0; a <= s; a++)r += M[s][a] * Math.pow(1 - e, s - a) * Math.pow(e, a) * i[a];
        return r;
    }
    h = new Array(s);
    for(var o = 0; o < s; o++)h[o] = s * (i[o + 1] - i[o]);
    return t(n - 1, e, h);
}, q = function(t, n, e) {
    for(var i = 1, h = t / n, r = (t - e(h)) / n, s = 0; i > .001;){
        var a = e(h + r), o = Math.abs(t - a) / n;
        if (o < i) i = o, h += r;
        else {
            var g = e(h - r), u = Math.abs(t - g) / n;
            u < i ? (i = u, h -= r) : r /= 2;
        }
        if (++s > 500) break;
    }
    return h;
}, _ = function(n, e, i, h, r, s, a, o) {
    var g = this;
    t(this, "a", void 0), t(this, "b", void 0), t(this, "c", void 0), t(this, "d", void 0), t(this, "length", void 0), t(this, "getArcLength", void 0), t(this, "getPoint", void 0), t(this, "getDerivative", void 0), t(this, "getTotalLength", function() {
        return g.length;
    }), t(this, "getPointAtLength", function(t) {
        var n = [
            g.a.x,
            g.b.x,
            g.c.x,
            g.d.x
        ], e = [
            g.a.y,
            g.b.y,
            g.c.y,
            g.d.y
        ], i = q(t, g.length, function(t) {
            return g.getArcLength(n, e, t);
        });
        return g.getPoint(n, e, i);
    }), t(this, "getTangentAtLength", function(t) {
        var n = [
            g.a.x,
            g.b.x,
            g.c.x,
            g.d.x
        ], e = [
            g.a.y,
            g.b.y,
            g.c.y,
            g.d.y
        ], i = q(t, g.length, function(t) {
            return g.getArcLength(n, e, t);
        }), h = g.getDerivative(n, e, i), r = Math.sqrt(h.x * h.x + h.y * h.y);
        return r > 0 ? {
            x: h.x / r,
            y: h.y / r
        } : {
            x: 0,
            y: 0
        };
    }), t(this, "getPropertiesAtLength", function(t) {
        var n, e = [
            g.a.x,
            g.b.x,
            g.c.x,
            g.d.x
        ], i = [
            g.a.y,
            g.b.y,
            g.c.y,
            g.d.y
        ], h = q(t, g.length, function(t) {
            return g.getArcLength(e, i, t);
        }), r = g.getDerivative(e, i, h), s = Math.sqrt(r.x * r.x + r.y * r.y);
        n = s > 0 ? {
            x: r.x / s,
            y: r.y / s
        } : {
            x: 0,
            y: 0
        };
        var a = g.getPoint(e, i, h);
        return {
            x: a.x,
            y: a.y,
            tangentX: n.x,
            tangentY: n.y
        };
    }), t(this, "getC", function() {
        return g.c;
    }), t(this, "getD", function() {
        return g.d;
    }), this.a = {
        x: n,
        y: e
    }, this.b = {
        x: i,
        y: h
    }, this.c = {
        x: r,
        y: s
    }, void 0 !== a && void 0 !== o ? (this.getArcLength = A, this.getPoint = L, this.getDerivative = w, this.d = {
        x: a,
        y: o
    }) : (this.getArcLength = P, this.getPoint = d, this.getDerivative = b, this.d = {
        x: 0,
        y: 0
    }), this.length = this.getArcLength([
        this.a.x,
        this.b.x,
        this.c.x,
        this.d.x
    ], [
        this.a.y,
        this.b.y,
        this.c.y,
        this.d.y
    ], 1);
}, S = function(e) {
    var r = this;
    t(this, "length", 0), t(this, "partial_lengths", []), t(this, "functions", []), t(this, "initial_point", null), t(this, "getPartAtLength", function(t) {
        t < 0 ? t = 0 : t > r.length && (t = r.length);
        for(var n = r.partial_lengths.length - 1; r.partial_lengths[n] >= t && n > 0;)n--;
        return n++, {
            fraction: t - r.partial_lengths[n - 1],
            i: n
        };
    }), t(this, "getTotalLength", function() {
        return r.length;
    }), t(this, "getPointAtLength", function(t) {
        var n = r.getPartAtLength(t), e = r.functions[n.i];
        if (e) return e.getPointAtLength(n.fraction);
        if (r.initial_point) return r.initial_point;
        throw new Error("Wrong function at this part.");
    }), t(this, "getTangentAtLength", function(t) {
        var n = r.getPartAtLength(t), e = r.functions[n.i];
        if (e) return e.getTangentAtLength(n.fraction);
        if (r.initial_point) return {
            x: 0,
            y: 0
        };
        throw new Error("Wrong function at this part.");
    }), t(this, "getPropertiesAtLength", function(t) {
        var n = r.getPartAtLength(t), e = r.functions[n.i];
        if (e) return e.getPropertiesAtLength(n.fraction);
        if (r.initial_point) return {
            x: r.initial_point.x,
            y: r.initial_point.y,
            tangentX: 0,
            tangentY: 0
        };
        throw new Error("Wrong function at this part.");
    }), t(this, "getParts", function() {
        for(var t = [], n = 0; n < r.functions.length; n++)if (null !== r.functions[n]) {
            r.functions[n] = r.functions[n];
            var e = {
                start: r.functions[n].getPointAtLength(0),
                end: r.functions[n].getPointAtLength(r.partial_lengths[n] - r.partial_lengths[n - 1]),
                length: r.partial_lengths[n] - r.partial_lengths[n - 1],
                getPointAtLength: r.functions[n].getPointAtLength,
                getTangentAtLength: r.functions[n].getTangentAtLength,
                getPropertiesAtLength: r.functions[n].getPropertiesAtLength
            };
            t.push(e);
        }
        return t;
    });
    for(var g, u = Array.isArray(e) ? e : function(t) {
        var e = (t && t.length > 0 ? t : "M0,0").match(h);
        if (!e) throw new Error("No path elements found in string ".concat(t));
        return e.reduce(function(t, e) {
            var h = e.charAt(0), r = h.toLowerCase(), a = s(e.substr(1));
            for("m" === r && a.length > 2 && (t.push([
                h
            ].concat(n(a.splice(0, 2)))), r = "l", h = "m" === h ? "l" : "L"); a.length >= 0;){
                if (a.length === i[r]) {
                    t.push([
                        h
                    ].concat(n(a.splice(0, i[r]))));
                    break;
                }
                if (a.length < i[r]) throw new Error('Malformed path data: "'.concat(h, '" must have ').concat(i[r], " elements and has ").concat(a.length, ": ").concat(e));
                t.push([
                    h
                ].concat(n(a.splice(0, i[r]))));
            }
            return t;
        }, []);
    }(e), l = [
        0,
        0
    ], c = [
        0,
        0
    ], f = [
        0,
        0
    ], y = 0; y < u.length; y++){
        if ("M" === u[y][0]) f = [
            (l = [
                u[y][1],
                u[y][2]
            ])[0],
            l[1]
        ], this.functions.push(null), 0 === y && (this.initial_point = {
            x: u[y][1],
            y: u[y][2]
        });
        else if ("m" === u[y][0]) f = [
            (l = [
                u[y][1] + l[0],
                u[y][2] + l[1]
            ])[0],
            l[1]
        ], this.functions.push(null);
        else if ("L" === u[y][0]) this.length += Math.sqrt(Math.pow(l[0] - u[y][1], 2) + Math.pow(l[1] - u[y][2], 2)), this.functions.push(new a(l[0], u[y][1], l[1], u[y][2])), l = [
            u[y][1],
            u[y][2]
        ];
        else if ("l" === u[y][0]) this.length += Math.sqrt(Math.pow(u[y][1], 2) + Math.pow(u[y][2], 2)), this.functions.push(new a(l[0], u[y][1] + l[0], l[1], u[y][2] + l[1])), l = [
            u[y][1] + l[0],
            u[y][2] + l[1]
        ];
        else if ("H" === u[y][0]) this.length += Math.abs(l[0] - u[y][1]), this.functions.push(new a(l[0], u[y][1], l[1], l[1])), l[0] = u[y][1];
        else if ("h" === u[y][0]) this.length += Math.abs(u[y][1]), this.functions.push(new a(l[0], l[0] + u[y][1], l[1], l[1])), l[0] = u[y][1] + l[0];
        else if ("V" === u[y][0]) this.length += Math.abs(l[1] - u[y][1]), this.functions.push(new a(l[0], l[0], l[1], u[y][1])), l[1] = u[y][1];
        else if ("v" === u[y][0]) this.length += Math.abs(u[y][1]), this.functions.push(new a(l[0], l[0], l[1], l[1] + u[y][1])), l[1] = u[y][1] + l[1];
        else if ("z" === u[y][0] || "Z" === u[y][0]) this.length += Math.sqrt(Math.pow(f[0] - l[0], 2) + Math.pow(f[1] - l[1], 2)), this.functions.push(new a(l[0], f[0], l[1], f[1])), l = [
            f[0],
            f[1]
        ];
        else if ("C" === u[y][0]) g = new _(l[0], l[1], u[y][1], u[y][2], u[y][3], u[y][4], u[y][5], u[y][6]), this.length += g.getTotalLength(), l = [
            u[y][5],
            u[y][6]
        ], this.functions.push(g);
        else if ("c" === u[y][0]) (g = new _(l[0], l[1], l[0] + u[y][1], l[1] + u[y][2], l[0] + u[y][3], l[1] + u[y][4], l[0] + u[y][5], l[1] + u[y][6])).getTotalLength() > 0 ? (this.length += g.getTotalLength(), this.functions.push(g), l = [
            u[y][5] + l[0],
            u[y][6] + l[1]
        ]) : this.functions.push(new a(l[0], l[0], l[1], l[1]));
        else if ("S" === u[y][0]) {
            if (y > 0 && [
                "C",
                "c",
                "S",
                "s"
            ].indexOf(u[y - 1][0]) > -1) {
                if (g) {
                    var x = g.getC();
                    g = new _(l[0], l[1], 2 * l[0] - x.x, 2 * l[1] - x.y, u[y][1], u[y][2], u[y][3], u[y][4]);
                }
            } else g = new _(l[0], l[1], l[0], l[1], u[y][1], u[y][2], u[y][3], u[y][4]);
            g && (this.length += g.getTotalLength(), l = [
                u[y][3],
                u[y][4]
            ], this.functions.push(g));
        } else if ("s" === u[y][0]) {
            if (y > 0 && [
                "C",
                "c",
                "S",
                "s"
            ].indexOf(u[y - 1][0]) > -1) {
                if (g) {
                    var p = g.getC(), v = g.getD();
                    g = new _(l[0], l[1], l[0] + v.x - p.x, l[1] + v.y - p.y, l[0] + u[y][1], l[1] + u[y][2], l[0] + u[y][3], l[1] + u[y][4]);
                }
            } else g = new _(l[0], l[1], l[0], l[1], l[0] + u[y][1], l[1] + u[y][2], l[0] + u[y][3], l[1] + u[y][4]);
            g && (this.length += g.getTotalLength(), l = [
                u[y][3] + l[0],
                u[y][4] + l[1]
            ], this.functions.push(g));
        } else if ("Q" === u[y][0]) {
            if (l[0] == u[y][1] && l[1] == u[y][2]) {
                var M = new a(u[y][1], u[y][3], u[y][2], u[y][4]);
                this.length += M.getTotalLength(), this.functions.push(M);
            } else g = new _(l[0], l[1], u[y][1], u[y][2], u[y][3], u[y][4], void 0, void 0), this.length += g.getTotalLength(), this.functions.push(g);
            l = [
                u[y][3],
                u[y][4]
            ], c = [
                u[y][1],
                u[y][2]
            ];
        } else if ("q" === u[y][0]) {
            if (0 != u[y][1] || 0 != u[y][2]) g = new _(l[0], l[1], l[0] + u[y][1], l[1] + u[y][2], l[0] + u[y][3], l[1] + u[y][4], void 0, void 0), this.length += g.getTotalLength(), this.functions.push(g);
            else {
                var L = new a(l[0] + u[y][1], l[0] + u[y][3], l[1] + u[y][2], l[1] + u[y][4]);
                this.length += L.getTotalLength(), this.functions.push(L);
            }
            c = [
                l[0] + u[y][1],
                l[1] + u[y][2]
            ], l = [
                u[y][3] + l[0],
                u[y][4] + l[1]
            ];
        } else if ("T" === u[y][0]) {
            if (y > 0 && [
                "Q",
                "q",
                "T",
                "t"
            ].indexOf(u[y - 1][0]) > -1) g = new _(l[0], l[1], 2 * l[0] - c[0], 2 * l[1] - c[1], u[y][1], u[y][2], void 0, void 0), this.functions.push(g), this.length += g.getTotalLength();
            else {
                var w = new a(l[0], u[y][1], l[1], u[y][2]);
                this.functions.push(w), this.length += w.getTotalLength();
            }
            c = [
                2 * l[0] - c[0],
                2 * l[1] - c[1]
            ], l = [
                u[y][1],
                u[y][2]
            ];
        } else if ("t" === u[y][0]) {
            if (y > 0 && [
                "Q",
                "q",
                "T",
                "t"
            ].indexOf(u[y - 1][0]) > -1) g = new _(l[0], l[1], 2 * l[0] - c[0], 2 * l[1] - c[1], l[0] + u[y][1], l[1] + u[y][2], void 0, void 0), this.length += g.getTotalLength(), this.functions.push(g);
            else {
                var A = new a(l[0], l[0] + u[y][1], l[1], l[1] + u[y][2]);
                this.length += A.getTotalLength(), this.functions.push(A);
            }
            c = [
                2 * l[0] - c[0],
                2 * l[1] - c[1]
            ], l = [
                u[y][1] + l[0],
                u[y][2] + l[1]
            ];
        } else if ("A" === u[y][0]) {
            var d = new o(l[0], l[1], u[y][1], u[y][2], u[y][3], 1 === u[y][4], 1 === u[y][5], u[y][6], u[y][7]);
            this.length += d.getTotalLength(), l = [
                u[y][6],
                u[y][7]
            ], this.functions.push(d);
        } else if ("a" === u[y][0]) {
            var P = new o(l[0], l[1], u[y][1], u[y][2], u[y][3], 1 === u[y][4], 1 === u[y][5], l[0] + u[y][6], l[1] + u[y][7]);
            this.length += P.getTotalLength(), l = [
                l[0] + u[y][6],
                l[1] + u[y][7]
            ], this.functions.push(P);
        }
        this.partial_lengths.push(this.length);
    }
}, C = function(n) {
    var e = this;
    if (t(this, "inst", void 0), t(this, "getTotalLength", function() {
        return e.inst.getTotalLength();
    }), t(this, "getPointAtLength", function(t) {
        return e.inst.getPointAtLength(t);
    }), t(this, "getTangentAtLength", function(t) {
        return e.inst.getTangentAtLength(t);
    }), t(this, "getPropertiesAtLength", function(t) {
        return e.inst.getPropertiesAtLength(t);
    }), t(this, "getParts", function() {
        return e.inst.getParts();
    }), this.inst = new S(n), !(this instanceof C)) return new C(n);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"fn8Fk"}],"bepWE":[function(require,module,exports) {
"use strict";
module.exports = earcut;
module.exports.default = earcut;
function earcut(data, holeIndices, dim) {
    dim = dim || 2;
    var hasHoles = holeIndices && holeIndices.length, outerLen = hasHoles ? holeIndices[0] * dim : data.length, outerNode = linkedList(data, 0, outerLen, dim, true), triangles = [];
    if (!outerNode || outerNode.next === outerNode.prev) return triangles;
    var minX, minY, maxX, maxY, x, y, invSize;
    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);
    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];
        for(var i = dim; i < outerLen; i += dim){
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 32767 / invSize : 0;
    }
    earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
    return triangles;
}
// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;
    if (clockwise === signedArea(data, start, end, dim) > 0) for(i = start; i < end; i += dim)last = insertNode(i, data[i], data[i + 1], last);
    else for(i = end - dim; i >= start; i -= dim)last = insertNode(i, data[i], data[i + 1], last);
    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }
    return last;
}
// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;
    var p = start, again;
    do {
        again = false;
        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;
        } else p = p.next;
    }while (again || p !== end);
    return end;
}
// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;
    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
    var stop = ear, prev, next;
    // iterate through ears, slicing them one by one
    while(ear.prev !== ear.next){
        prev = ear.prev;
        next = ear.next;
        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim | 0);
            triangles.push(ear.i / dim | 0);
            triangles.push(next.i / dim | 0);
            removeNode(ear);
            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;
            continue;
        }
        ear = next;
        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
            else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) splitEarcut(ear, triangles, dim, minX, minY, invSize);
            break;
        }
    }
}
// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
    // now make sure we don't have other points inside the potential ear
    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    // triangle bbox; min & max are calculated like this for speed
    var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    var p = c.next;
    while(p !== a){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }
    return true;
}
function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev, b = ear, c = ear.next;
    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
    var ax = a.x, bx = b.x, cx = c.x, ay = a.y, by = b.y, cy = c.y;
    // triangle bbox; min & max are calculated like this for speed
    var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx, y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy, x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx, y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    // z-order range for the current triangle bbox;
    var minZ = zOrder(x0, y0, minX, minY, invSize), maxZ = zOrder(x1, y1, minX, minY, invSize);
    var p = ear.prevZ, n = ear.nextZ;
    // look for points inside the triangle in both directions
    while(p && p.z >= minZ && n && n.z <= maxZ){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }
    // look for remaining points in decreasing z-order
    while(p && p.z >= minZ){
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }
    // look for remaining points in increasing z-order
    while(n && n.z <= maxZ){
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }
    return true;
}
// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev, b = p.next.next;
        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
            triangles.push(a.i / dim | 0);
            triangles.push(p.i / dim | 0);
            triangles.push(b.i / dim | 0);
            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);
            p = start = b;
        }
        p = p.next;
    }while (p !== start);
    return filterPoints(p);
}
// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while(b !== a.prev){
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);
                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);
                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
                earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
                return;
            }
            b = b.next;
        }
        a = a.next;
    }while (a !== start);
}
// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [], i, len, start, end, list;
    for(i = 0, len = holeIndices.length; i < len; i++){
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }
    queue.sort(compareX);
    // process holes from left to right
    for(i = 0; i < queue.length; i++)outerNode = eliminateHole(queue[i], outerNode);
    return outerNode;
}
function compareX(a, b) {
    return a.x - b.x;
}
// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    var bridge = findHoleBridge(hole, outerNode);
    if (!bridge) return outerNode;
    var bridgeReverse = splitPolygon(bridge, hole);
    // filter collinear points around the cuts
    filterPoints(bridgeReverse, bridgeReverse.next);
    return filterPoints(bridge, bridge.next);
}
// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode, hx = hole.x, hy = hole.y, qx = -Infinity, m;
    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                m = p.x < p.next.x ? p : p.next;
                if (x === hx) return m; // hole touches outer segment; pick leftmost endpoint
            }
        }
        p = p.next;
    }while (p !== outerNode);
    if (!m) return null;
    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point
    var stop = m, mx = m.x, my = m.y, tanMin = Infinity, tan;
    p = m;
    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential
            if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
                m = p;
                tanMin = tan;
            }
        }
        p = p.next;
    }while (p !== stop);
    return m;
}
// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}
// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === 0) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    }while (p !== start);
    p.prevZ.nextZ = null;
    p.prevZ = null;
    sortLinked(p);
}
// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize, inSize = 1;
    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;
        while(p){
            numMerges++;
            q = p;
            pSize = 0;
            for(i = 0; i < inSize; i++){
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;
            while(pSize > 0 || qSize > 0 && q){
                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }
                if (tail) tail.nextZ = e;
                else list = e;
                e.prevZ = tail;
                tail = e;
            }
            p = q;
        }
        tail.nextZ = null;
        inSize *= 2;
    }while (numMerges > 1);
    return list;
}
// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = (x - minX) * invSize | 0;
    y = (y - minY) * invSize | 0;
    x = (x | x << 8) & 0x00FF00FF;
    x = (x | x << 4) & 0x0F0F0F0F;
    x = (x | x << 2) & 0x33333333;
    x = (x | x << 1) & 0x55555555;
    y = (y | y << 8) & 0x00FF00FF;
    y = (y | y << 4) & 0x0F0F0F0F;
    y = (y | y << 2) & 0x33333333;
    y = (y | y << 1) & 0x55555555;
    return x | y << 1;
}
// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start, leftmost = start;
    do {
        if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) leftmost = p;
        p = p.next;
    }while (p !== start);
    return leftmost;
}
// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
}
// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
    (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
    (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
    equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}
// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));
    if (o1 !== o2 && o3 !== o4) return true; // general case
    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2
    return false;
}
// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}
// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
        p = p.next;
    }while (p !== a);
    return false;
}
// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}
// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a, inside = false, px = (a.x + b.x) / 2, py = (a.y + b.y) / 2;
    do {
        if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
        p = p.next;
    }while (p !== a);
    return inside;
}
// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y), b2 = new Node(b.i, b.x, b.y), an = a.next, bp = b.prev;
    a.next = b;
    b.prev = a;
    a2.next = an;
    an.prev = a2;
    b2.next = a2;
    a2.prev = b2;
    bp.next = b2;
    b2.prev = bp;
    return b2;
}
// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);
    if (!last) {
        p.prev = p;
        p.next = p;
    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}
function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;
    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}
function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;
    // vertex coordinates
    this.x = x;
    this.y = y;
    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;
    // z-order curve value
    this.z = 0;
    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;
    // indicates whether this is a steiner point
    this.steiner = false;
}
// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function(data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) for(var i = 0, len = holeIndices.length; i < len; i++){
        var start = holeIndices[i] * dim;
        var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        polygonArea -= Math.abs(signedArea(data, start, end, dim));
    }
    var trianglesArea = 0;
    for(i = 0; i < triangles.length; i += 3){
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }
    return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
};
function signedArea(data, start, end, dim) {
    var sum = 0;
    for(var i = start, j = end - dim; i < end; i += dim){
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}
// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function(data) {
    var dim = data[0][0].length, result = {
        vertices: [],
        holes: [],
        dimensions: dim
    }, holeIndex = 0;
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data[i].length; j++)for(var d = 0; d < dim; d++)result.vertices.push(data[i][j][d]);
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};

},{}]},["B03Xv","h19CZ"], "h19CZ", "parcelRequiredb4e")

//# sourceMappingURL=backgroundWorker.422e625b.js.map
