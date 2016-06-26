import * as axios from "axios";
import { IHttpRequestAdapter } from "typescript-dotnet-umd/System/Net/Http/IHttpRequestAdapter";
import { IHttpRequestParams } from "typescript-dotnet-umd/System/Net/Http/IHttpRequestParams";
export declare class AxiosHttpAdapter implements IHttpRequestAdapter {
    private _axios;
    constructor(_axios: axios.AxiosInstance);
    request<TResult>(params: IHttpRequestParams): PromiseLike<TResult>;
}
export default AxiosHttpAdapter;
