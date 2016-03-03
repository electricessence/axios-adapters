///<reference path="bower_components/typescript-dotnet/source/System/Net/Http/IHttpRequestAdapter.d.ts"/>
///<reference path="bower_components/axios/axios.d.ts"/>
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
        define(["require", "exports", 'axios', 'bower_components/typescript-dotnet/source/System/Uri/Uri', 'bower_components/typescript-dotnet/source/System/Exceptions/ArgumentNullException', 'bower_components/typescript-dotnet/source/System/Exception'], factory);
    }
})(function (require, exports) {
    "use strict";
    var axios = require('axios');
    var Uri_1 = require('bower_components/typescript-dotnet/source/System/Uri/Uri');
    var ArgumentNullException_1 = require('bower_components/typescript-dotnet/source/System/Exceptions/ArgumentNullException');
    var Exception_1 = require('bower_components/typescript-dotnet/source/System/Exception');
    var EXCEPTION_NAME = 'AxiosRequestException';
    var AxiosRequestException = (function (_super) {
        __extends(AxiosRequestException, _super);
        function AxiosRequestException(response) {
            _super.call(this, 'Axios request failed.', null, function (_) { return _.response = response; });
        }
        AxiosRequestException.prototype.getName = function () { return EXCEPTION_NAME; };
        return AxiosRequestException;
    }(Exception_1.default));
    var AxiosHttpAdapter = (function () {
        function AxiosHttpAdapter(_axios) {
            this._axios = _axios;
            if (!_axios)
                throw new ArgumentNullException_1.default('_axios');
        }
        AxiosHttpAdapter.create = function (param) {
            return new AxiosHttpAdapter(axios.create(typeof param == 'string'
                ? { baseURL: param }
                : param));
        };
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = AxiosHttpAdapter;
    function coerceParams(params) {
        var uri = Uri_1.default.from(params.uri);
        return {
            method: params.method,
            url: uri.baseUri,
            params: uri.queryParams,
            data: params.data
        };
    }
});
//# sourceMappingURL=AxiosHttpAdapter.js.map