/**
 * Proxyman Scripting
 * 
 * 功能：替换指定域名的 Request Header
 * 适用平台：Proxyman (macOS / iOS)
 * 
 * 使用方式：
 * 1. Proxyman -> Scripting -> Script List -> + (新建脚本)
 * 2. 给脚本起名，例如 "CandyTally Header Rewrite"
 * 3. Add Rule (添加规则) -> URL Content (URL 包含) -> "candytallymovie.vip"
 * 4. 将下方代码粘贴到脚本编辑器中
 */

function onRequest(context, url, request) {
    // 配置需要修改的 Header
    // 注意：Proxyman 的 headers 可能是大小写敏感的，视具体实现而定，通常建议遍历查找
    var headersToUpdate = {
        "X-Emby-Authorization": 'MediaBrowser Token="", UserId="22F53B42-3ECA-4B1B-8A49-FC6AD0D36615", Client="SenPlayer", Device="iPhone", DeviceId="ACE6164A-B753-425F-9B39-BB178E09BAC1", Version="5.8.5"',
        "User-Agent": "SenPlayer/5.8.5"
    };

    // 打印日志方便调试
    console.log("[Proxyman] Processing: " + url);

    // 遍历我们需要修改的 Headers
    for (var key in headersToUpdate) {
        var newValue = headersToUpdate[key];
        
        // 移除旧的 Header (忽略大小写)
        // Proxyman 的 request.headers 是一个对象，直接操作即可
        // 但为了保险，先删除所有类似 key
        for (var hKey in request.headers) {
            if (hKey.toLowerCase() === key.toLowerCase()) {
                delete request.headers[hKey];
            }
        }
        
        // 设置新值
        request.headers[key] = newValue;
        console.log("[Proxyman] Set Header: " + key + " = " + newValue.substring(0, 30) + "...");
    }

    // 完成修改
    return request;
}

function onResponse(context, url, request, response) {
    // 不需要修改响应，直接返回
    return response;
}
