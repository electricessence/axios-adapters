///<reference path="../node_modules/axios/axios"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'typescript-dotnet-umd/System/Uri/Uri', 'typescript-dotnet-umd/System/Exceptions/ArgumentNullException', 'typescript-dotnet-umd/System/Exception'], factory);
    }
})(function (require, exports) {
    "use strict";
    var Uri_1 = require('typescript-dotnet-umd/System/Uri/Uri');
    var ArgumentNullException_1 = require('typescript-dotnet-umd/System/Exceptions/ArgumentNullException');
    var Exception_1 = require('typescript-dotnet-umd/System/Exception');
    var EXCEPTION_NAME = 'AxiosRequestException';
    var AxiosRequestException = (function (_super) {
        __extends(AxiosRequestException, _super);
        function AxiosRequestException(response) {
            _super.call(this, 'Axios request failed.');
            this.response = response;
        }
        AxiosRequestException.prototype.getName = function () { return EXCEPTION_NAME; };
        return AxiosRequestException;
    }(Exception_1.default));
    var AxiosHttpAdapter = (function () {
        function AxiosHttpAdapter(_axios) {
            this._axios = _axios;
            if (!_axios)
                throw new ArgumentNullException_1.default('instance');
        }
        AxiosHttpAdapter.prototype.request = function (params) {
            return this
                ._axios.request(coerceParams(params))
                .then(function (response) { return response.data; })
                .catch(function (response) {
                throw new AxiosRequestException(response);
            });
        };
        return AxiosHttpAdapter;
    }());
    exports.AxiosHttpAdapter = AxiosHttpAdapter;
    function coerceParams(params) {
        var uri = Uri_1.default.from(params.uri);
        return {
            method: params.method,
            url: uri.baseUri,
            params: uri.queryParams,
            data: params.data
        };
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AxiosHttpAdapter;
});
//# sourceMappingURL=AxiosHttpAdapter.js.map