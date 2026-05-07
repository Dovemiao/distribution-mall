# 分销商城系统 Distribution Mall

一个支持淘宝和拼多多联盟推广的分销商城，包含前台商城和后台管理系统，可部署到 Cloudflare Pages/Workers。

## 🚀 功能特性

### 前台商城
- 🛍️ 淘宝风格UI设计
- 🔍 商品搜索和筛选
- 🏷️ 商品分类浏览
- 📱 响应式设计
- 🔗 淘宝/拼多多联盟推广链接
- 🛒 购物车功能
- ❤️ 收藏夹
- 💬 商品评论评分

### 后台管理
- 📦 商品管理（增删改查）
- 🏷️ 分类管理
- 👀 推广数据统计
- 🔑 联盟账号配置
- 📊 销售数据分析
- 👤 用户管理

### 技术栈
- **前台**: React + Vite + TailwindCSS
- **后台**: React + Vite + Ant Design
- **后端**: Cloudflare Workers + D1 数据库
- **部署**: Cloudflare Pages/Workers

## 📦 快速开始

### 本地开发

```bash
# 前台开发
cd frontend
npm install
npm run dev

# 后台开发 (新终端)
cd admin
npm install
npm run dev

# 后端开发 (新终端)
cd backend
npm install
wrangler dev
```

### 生产部署

详见各目录下的 README.md

## 📚 项目结构

```
.
├── frontend/          # 前台商城 (Cloudflare Pages)
├── admin/            # 后台管理 (Cloudflare Pages)
├── backend/          # 后端服务 (Cloudflare Workers)
├── wrangler.toml     # Cloudflare 配置
└── README.md
```

## 🔐 环境变量

创建 `backend/.env` 文件：
```
TAOBAO_API_KEY=你的淘宝API密钥
TAOBAO_API_SECRET=你的淘宝API密钥
PINDUODUO_API_KEY=你的拼多多API密钥
PINDUODUO_API_SECRET=你的拼多多API密钥
```

## 📝 License

MIT
