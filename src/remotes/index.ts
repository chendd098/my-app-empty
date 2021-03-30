import axios , { AxiosPromise, AxiosResponse }from 'axios'
export interface ITodo {
	id?: string;
	text?: string;
	completed : boolean
}
export const apiBasePath = app.apiBasePath // + '/admin'
export function getHeaders(contentType? : string) : any {
	let headers : HeadersInit = {}
	if(contentType){
		headers['content-type'] = contentType
	}
	return headers
}
export function isSuccess(data : any){
	return (data && data.success) ||(data && data.code === 0)
}

export const axiosInstance = axios.create({
    baseURL:apiBasePath,
    headers:getHeaders('application/json'),
    timeout : 600,
    validateStatus: status => status >= 200 && status <= 500,
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('before config',config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
  });
/**
* 获取金额配置数据
* 
* @param so 
*/
export function GetBoleAwardAmountList(so:any):any{
    return  axiosInstance.post(
                'BoleAmount/GetBoleAwardAmountList',
                JSON.stringify(so)
            ).then((res:any) => {
                // return res
                if (isSuccess(res)) {
                    return res
                } else {
                     console.log('fail',res)
                    // throw res
                }
            })
 }