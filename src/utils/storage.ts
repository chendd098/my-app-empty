export const getCookiePart = (expire?:number, path?:string, domain?:string, secure?:string):string => {
    var result = [];
    if (typeof expire === 'number' && expire !== 0 && expire === expire) {
        var d:any = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expire);
        result.push('; expires=' + d.toGMTString());
    }

    result.push(path ? '; path=' + path : '');
    result.push(domain ? '; domain=' + domain : '');
    result.push(secure ? '; ' + secure : '');
    return result.join('');
}
// 设置cookie
export const setCookie = (name:string, value:string,expire?:number, path?:string, domain?:string, secure?:string) => {
    expire = expire == null ? 30 : Number(expire);
    path = path || "/";
    name = encodeURIComponent(name);
    value = encodeURIComponent(value);
    document.cookie = name + "=" + value + getCookiePart(expire, path, domain, secure);
}
// 获取cookie
export const getCookie = (name:string):string | null => {
    name = decodeURIComponent(name);
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(decodeURIComponent(arr[2]));
    else
        return null;
}
// 清除cookie
export const clearCookie = (name:string) => {
    setCookie(name, "", -1);
}