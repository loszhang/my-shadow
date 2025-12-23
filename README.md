# Shadowrocket Header Rewrite 脚本使用指南

## 1. 推荐方法：使用原生模块 (最稳定)
**这是目前验证过的最佳方案。** 相比 JS 脚本，原生模块直接由 Shadowrocket 内核处理，速度更快且兼容性最好（完美支持 VidHub 等应用）。

### 使用步骤
1. 复制以下链接（或者在 GitHub 仓库找到 `candytallymovie_surge.sgmodule` 的 Raw 链接）：
   `https://raw.githubusercontent.com/loszhang/my-shadow/main/candytallymovie_surge.sgmodule`
2. 打开 Shadowrocket -> **配置** -> **模块**。
3. 点击右上角 **+** 号。
4. 粘贴链接，小火箭会自动下载并启用。
5. **重要**：确保你已经开启 HTTPS 解密（见下方说明）。

---

## 2. Proxyman 用户指南 (macOS/iOS)
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
