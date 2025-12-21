/**
 * Shadowrocket/Surge/QuantumultX Header Rewrite Script
 * 
 * 功能：根据域名替换 Request Header
 * 
 * 使用方式：
 * 1. Shadowrocket -> 配置 -> 模块 -> 新建/导入
 * 2. 或者直接在 [Script] 区域添加
 * 
 * [Script]
 * HeaderRewrite = type=http-request, pattern=^https?://, script-path=candytallymovie.vip.js, requires-body=false
 */

// 配置区域：定义域名和需要修改的 Header
// 域名支持部分匹配（包含即可），如果需要精确匹配请自行修改逻辑
const config = {
    "candytallymovie.vip": {
        "X-Emby-Authorization": 'MediaBrowser Token="", UserId="22F53B42-3ECA-4B1B-8A49-FC6AD0D36615", Client="SenPlayer", Device="iPhone", DeviceId="ACE6164A-B753-425F-9B39-BB178E09BAC1", Version="5.8.5"',
        "User-Agent": "SenPlayer/5.8.5"
    }
};

// 获取当前请求的 URL 和 Headers
const url = $request.url;
const headers = $request.headers;
let modified = false;

// 简单的域名匹配逻辑
// 提取 Hostname
// $request.hostname 在某些环境可能不可用，可以使用正则从 url 提取
let hostname = "";
try {
    if (typeof $request.hostname !== 'undefined') {
        hostname = $request.hostname;
    } else {
        const match = url.match(/^https?:\/\/([^/]+)/);
        if (match) hostname = match[1];
    }
} catch (e) {
    console.log("Error parsing hostname: " + e);
}

// 遍历配置查找匹配的域名
for (const domain in config) {
    if (hostname.includes(domain)) {
        console.log(`Match domain: ${domain}, applying headers...`);
        const rules = config[domain];
        
        for (const key in rules) {
            const newValue = rules[key];
            
            // 处理 Header Key 大小写不敏感的问题
            // 查找实际存在的 key
            let actualKey = key;
            for (const hKey in headers) {
                if (hKey.toLowerCase() === key.toLowerCase()) {
                    actualKey = hKey;
                    break;
                }
            }

            if (newValue === null) {
                if (headers[actualKey]) {
                    delete headers[actualKey];
                    modified = true;
                }
            } else {
                headers[actualKey] = newValue;
                modified = true;
            }
        }
        // 匹配到一个域名规则后通常停止，如果需要叠加可以去掉 break
        break; 
    }
}

if (modified) {
    $done({ headers: headers });
} else {
    $done({});
}
