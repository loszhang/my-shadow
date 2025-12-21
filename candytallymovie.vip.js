/**
 * Shadowrocket/Surge/QuantumultX Header Rewrite Script
 * 
 * 功能：根据域名替换 Request Header
 * 
 * [Script]
 * HeaderRewrite = type=http-request, pattern=^https?://.*candytallymovie\.vip, script-path=candytallymovie.vip.js, requires-body=false
 */

// 配置区域
const rules = {
    "X-Emby-Authorization": 'MediaBrowser Token="", UserId="22F53B42-3ECA-4B1B-8A49-FC6AD0D36615", Client="SenPlayer", Device="iPhone", DeviceId="ACE6164A-B753-425F-9B39-BB178E09BAC1", Version="5.8.5"',
    "User-Agent": "SenPlayer/5.8.5"
};

// 获取当前请求的 URL 和 Headers
const url = $request.url;
const headers = $request.headers;
let modified = false;

console.log(`[Header Rewrite] Script triggered for URL: ${url}`);

// 既然模块正则已经限制了域名，脚本内部就直接执行替换逻辑
// 采用“先删后加”的策略，确保兼容性和彻底性

for (const key in rules) {
    const newValue = rules[key];
    
    // 1. 查找并删除所有已存在的同名 Header (忽略大小写)
    // 这一步是为了防止 headers 里同时存在 "User-Agent" 和 "user-agent" 导致覆盖失败或重复
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

if (modified) {
    $done({ headers: headers });
} else {
    $done({});
}
