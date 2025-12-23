# Shadowrocket Header Rewrite 脚本使用指南

## 1. 推荐方法：使用 GitHub 托管 (最稳定)
既然本地导入遇到问题，**强烈推荐**将文件上传到 GitHub，这样不仅导入方便，后续更新也更容易。

### 第一步：上传文件到 GitHub
1. 登录你的 [GitHub](https://github.com/) 账号。
2. 创建一个新的仓库 (Repository)，例如命名为 `shadowrocket-scripts`，选择 **Public** (公开)。
3. 将 `candytallymovie.vip.js` 和 `candytallymovie.vip.sgmodule` 两个文件上传到该仓库。

### 第二步：获取 Raw 链接
1. 在 GitHub 仓库页面，点击 `candytallymovie.vip.sgmodule` 文件。
2. 点击右上角的 **Raw** 按钮。
3. 复制浏览器地址栏中的链接 (它应该以 `https://raw.githubusercontent.com/...` 开头)。

### 第三步：在小火箭中导入
1. 打开 Shadowrocket -> **配置** -> **模块**。
2. 点击右上角 **+** 号。
3. 粘贴你刚刚复制的 `...sgmodule` 的 Raw 链接。
4. 小火箭会自动下载模块，并识别同目录下的 js 脚本。
5. 启用模块即可。

---

## 2. 备用方法：本地导入 (如果 GitHub 不可用)
小火箭完全支持将 `.js` 脚本和 `.sgmodule` 模块文件保存在手机本地使用。


### 方法 A：通过 iCloud Drive (推荐)
1. 在电脑上，将 `candytallymovie.vip.js` 和 `candytallymovie.vip.sgmodule` 复制到你的 **iCloud 云盘**。
2. 在 iPhone 上，打开 **文件 (Files)** App。
3. 找到这两个文件，长按复制。
4. 粘贴到 **我的 iPhone** -> **Shadowrocket** 文件夹中。

### 方法 B：通过小火箭内置 WiFi 上传
1. 手机和电脑连接同一个 WiFi。
2. 打开小火箭 -> **配置** -> 点击底部栏的 **导入/导出** (或者在某些版本是 **文件** 图标)。
3. 开启 **WebDAV** 或 **文件上传** 服务，浏览器访问手机显示的 IP 地址。
4. 将电脑上的 `candytallymovie.vip.js` 和 `candytallymovie.vip.sgmodule` 上传进去。

### 方法 C：AirDrop (隔空投送)
1. 如果你有 Mac，直接 AirDrop 给 iPhone，接收时选择用 Shadowrocket 打开（如果提示的话，或者先存到文件 App 再移动）。

## 3. 如何启用

### 方式一：导入模块 (最简单)
1. 确保 `candytallymovie.vip.js` 已经放入小火箭的文件夹。
2. 将 `candytallymovie.vip.sgmodule` 也放入小火箭文件夹。
3. 打开小火箭 -> **配置** -> **模块**。
4. 点击右上角 **+** (或扫描/导入)，选择 **从文件导入**。
5. 选择 `candytallymovie.vip.sgmodule`。
6. 启用该模块。

### 方式二：手动配置脚本
1. 确保 `candytallymovie.vip.js` 已经放入小火箭的文件夹。
2. 打开小火箭 -> **配置** -> 点击正在使用的配置 (例如 `default.conf`) -> **编辑配置**。
3. 找到 **[Script]** (脚本)。
4. 点击 **+** 添加：
   - **类型**: `http-request`
   - **URL正则**: `^https?://.*candytallymovie\.vip`
   - **脚本路径**: `candytallymovie.vip.js`
   - **需要正文**: `关闭` (false)
5. 点击保存。

## 4. 如何调试 (查看日志)
如果脚本似乎没有生效，可以通过小火箭的日志功能进行调试。

1. 打开 Shadowrocket -> **设置** (Settings)。
2. 找到 **日志** (Log) 选项。
3. 开启 **启用日志** (Enable Log)。
4. 访问目标网站 `candytallymovie.vip`。
5. 回到日志页面，查看是否有 `[Header Rewrite]` 开头的日志输出。
   - 如果看到 `Match domain: ...` 说明脚本已运行。
   - 如果看到 `Modifying header: ...` 说明 Header 替换成功。

## 6. Proxyman 用户指南 (macOS/iOS)
如果你使用 Proxyman 进行抓包或重写，请使用 `proxyman-script.js` 文件。

### 使用步骤
1. 打开 Proxyman。
2. 点击顶部菜单 **Scripting** -> **Script List**。
3. 点击左下角 **+** 号新建脚本。
4. **Name**: 随便填，例如 `CandyTally Rewrite`。
5. **Rules**: 点击 **+** 添加规则 -> 选择 **URL Contains** -> 填入 `candytallymovie.vip`。
6. **Script**: 删除编辑器里的默认代码，将 `proxyman-script.js` 的内容完整复制粘贴进去。
7. 保存并启用 (勾选 Enable)。
8. 确保 Proxyman 的 **SSL Proxying** 已经开启，并且该域名在 Include List 中。
