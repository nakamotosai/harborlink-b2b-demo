# Harborlink B2B Demo（领港工业 · 前端技术演示）

> **作品集用脱敏站**。虚构公司「领港 / Harborlink」，**不含真实客户公司名、地址、电话、邮箱、产品编号、图册原件或后台密钥**。  
> 正式客户项目代码与线上站 **未修改**；本目录为独立副本。

## 你能看到什么

| 能力 | 说明 |
|---|---|
| 三语首页 | `/ja/` `/zh/` `/en/` |
| 主题 / 字体 | 浏览器本地存储切换（键名已脱敏） |
| 产品区 + 规格卡 | 假系列 HL-A01…E03 |
| 图册区 | 本地假 PDF + 占位封面 |
| 联系表单壳 | `mailto:contact@example.com`（演示） |
| 响应式 + 微动效 | 保留原实现结构 |
| Admin mock | 密码 `demo-admin`，只写内存，不推 GitHub |

## 本地运行

```powershell
cd "F:\demo\日本建材官网"
npm install
npm run placeholders   # 若 public 占位图缺失
npm run dev
# 打开 http://127.0.0.1:4321/zh/
```

```powershell
npm run build
npm run preview
```

## 与原项目的关系

| 项 | 说明 |
|---|---|
| 原版本机 | `C:\Users\sai\xmza\xmza-main`（只读，本任务未改） |
| 本目录 | 独立 git；文案 / API / 资产已替换为虚构数据 |

## 负向清单

- 不部署到客户域名 / Cloudflare 项目
- 不复制客户 `.env` / PAT
- 不使用真实 PDF 图册与产品摄影
- 不写回客户仓库

Private demo for portfolio. Not for redistribution as a real company site.
