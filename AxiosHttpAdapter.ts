///<reference path="node_modules/axios/axios.d.ts"/>

import * as axios from "axios";
import Uri from 'typescript-dotnet-umd/System/Uri/Uri';
import ArgumentNullException from 'typescript-dotnet-umd/System/Exceptions/ArgumentNullException';
import Exception from 'typescript-dotnet-umd/System/Exception';
import {IHttpRequestAdapter} from "typescript-dotnet-umd/System/Net/Http/IHttpRequestAdapter";
import {IHttpRequestParams} from "typescript-dotnet-umd/System/Net/Http/IHttpRequestParams";

const EXCEPTION_NAME:string = 'AxiosRequestException';

class AxiosRequestException extends Exception {

	constructor(public response:axios.Response) {
		super('Axios request failed.');
	}

	protected getName():string
	{ return EXCEPTION_NAME; }

}

export default class AxiosHttpAdapter implements IHttpRequestAdapter
{

	constructor(private _axios:axios.AxiosInstance)
	{
		if(!_axios)
			throw new ArgumentNullException('instance');
	}

	request<TResult>(params:IHttpRequestParams):PromiseLike<TResult>
	{
		return this
			._axios.request(coerceParams(params))
			.then(response=>response.data)
			.catch(response=>{
				throw new AxiosRequestException(response);
			});
	}

}

function coerceParams(params:IHttpRequestParams):axios.RequestOptions {
	var uri = Uri.from(params.uri);
	return {
		method:params.method,
		url:uri.baseUri,
		params:uri.queryParams,
		data:params.data
	}
}

