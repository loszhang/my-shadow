/**
 * Shadowrocket/Surge/QuantumultX Header Rewrite Script
 * 
 * 功能：根据域名替换 Request Header
 * 
 * [Script]
 * HeaderRewrite = type=http-request, pattern=^http, script-path=candytallymovie.vip.js, requires-body=false
 */

// 配置区域
const rules = {
    "X-Emby-Authorization": 'MediaBrowser Token="", UserId="22F53B42-3ECA-4B1B-8A49-FC6AD0D36615", Client="SenPlayer", Device="iPhone", DeviceId="ACE6164A-B753-425F-9B39-BB178E09BAC1", Version="5.8.5"',
    "User-Agent": "SenPlayer/5.8.5"
};

// 目标域名关键字
const targetDomain = "candytallymovie.vip";

// 获取当前请求的 URL 和 Headers
const url = $request.url;
const headers = $request.headers;
let modified = false;

// 检查 URL 是否包含目标域名
if (url.indexOf(targetDomain) !== -1) {
    console.log(`[Header Rewrite] Match domain: ${targetDomain}, URL: ${url}`);
    
    // 采用“先删后加”的策略
    for (const key in rules) {
        const newValue = rules[key];
        
        // 1. 查找并删除所有已存在的同名 Header (忽略大小写)
        for (const hKey in headers) {
            if (hKey.toLowerCase() === key.toLowerCase()) {
                console.log(`[Header Rewrite] Removing existing header: ${hKey}`);
                delete headers[hKey];
                modified = true;
            }
        }

        // 2. 添加新的 Header
        if (newValue !== null) {
            console.log(`[Header Rewrite] Setting header: ${key}`);
            headers[key] = newValue;
            modified = true;
        }
    }
} else {
    // console.log(`[Header Rewrite] Ignored URL: ${url}`);
}

if (modified) {
    $done({ headers: headers });
} else {
    $done({});
}
