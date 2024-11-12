// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[727],{

/***/ 809:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./src/middleware.ts
var middleware_namespaceObject = {};
__webpack_require__.r(middleware_namespaceObject);
__webpack_require__.d(middleware_namespaceObject, {
  config: () => (config),
  middleware: () => (middleware)
});

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/globals.js
var globals = __webpack_require__(131);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/adapter.js + 16 modules
var adapter = __webpack_require__(612);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/exports/next-response.js
var next_response = __webpack_require__(912);
;// CONCATENATED MODULE: ./src/middleware.ts

function middleware(request) {
    // Add your middleware logic here
    // For now, just let all requests through
    return next_response/* default */.Z.next();
}
// Configure which routes use this middleware
const config = {
    matcher: "/api/:path*"
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fsrc%2Fmiddleware.ts&page=%2Fsrc%2Fmiddleware&rootDir=C%3A%5CUsers%5CRaj%5Cwallofadvice&matchers=W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpP1xcL2FwaSg%2FOlxcLygoPzpbXlxcLyNcXD9dKz8pKD86XFwvKD86W15cXC8jXFw%2FXSs%2FKSkqKSk%2FKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiL2FwaS86cGF0aCoifV0%3D&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W3sicmVnZXhwIjoiXig%2FOlxcLyhfbmV4dFxcL2RhdGFcXC9bXi9dezEsfSkpP1xcL2FwaSg%2FOlxcLygoPzpbXlxcLyNcXD9dKz8pKD86XFwvKD86W15cXC8jXFw%2FXSs%2FKSkqKSk%2FKC5qc29uKT9bXFwvI1xcP10%2FJCIsIm9yaWdpbmFsU291cmNlIjoiL2FwaS86cGF0aCoifV19!


// Import the userland code.

const mod = {
    ...middleware_namespaceObject
};
const handler = mod.middleware || mod.default;
const page = "/src/middleware";
if (typeof handler !== "function") {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return (0,adapter/* adapter */.V)({
        ...opts,
        page,
        handler
    });
}

//# sourceMappingURL=middleware.js.map

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [139], () => (__webpack_exec__(809)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map