///<reference path="bower_components/typescript-dotnet/source/System/Net/Http/IHttpRequestAdapter.d.ts"/>
///<reference path="bower_components/axios/axios.d.ts"/>

import * as axios from 'axios';
import Uri from './bower_components/typescript-dotnet/source/System/Uri/Uri';
import ArgumentNullException from './bower_components/typescript-dotnet/source/System/Exceptions/ArgumentNullException';
import Exception from './bower_components/typescript-dotnet/source/System/Exception';

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

	request<TResult>(params:IHttpRequestParams):IPromise<TResult>
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

