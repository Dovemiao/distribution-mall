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

## 📦 项目结构

```
distribution-mall/
├── frontend/          # 前台���城
├── admin/             # 后台管理系统
├── backend/           # 后端服务
├── .gitignore
├── README.md
└── wrangler.toml
```

## 📋 快速开始

### 前置要求
- Node.js >= 16
- npm 或 yarn
- Cloudflare 账户
- Wrangler CLI

### 本地开发

```bash
# 克隆项目
git clone https://github.com/Dovemiao/distribution-mall.git
cd distribution-mall

# 安装前台依赖
cd frontend
npm install
npm run dev

# 另一个终端安装后台依赖
cd admin
npm install
npm run dev

# 另一个终端启动后端
cd backend
npm install
wrangler dev
```

### 生产部署

#### 部署到 Cloudflare Pages

1. 前台商城:
```bash
cd frontend
npm run build
```

2. 后台管理:
```bash
cd admin
npm run build
```

3. 在 Cloudflare Pages 中连接此 GitHub 仓库
   - 前台构建: `cd frontend && npm run build` → 输出: `frontend/dist`
   - 后台构建: `cd admin && npm run build` → 输出: `admin/dist`

#### 部署后端到 Cloudflare Workers

```bash
cd backend
wrangler deploy
```

## 🔐 环境配置

### 创建 `backend/.env` 文件

```env
# 淘宝联盟配置
TAOBAO_API_KEY=你的淘宝API密钥
TAOBAO_API_SECRET=你的淘宝API密钥
TAOBAO_SITE_ID=你的淘宝网站ID

# 拼多多联盟配置
PINDUODUO_API_KEY=你的拼多多API密钥
PINDUODUO_API_SECRET=你的拼多多API密钥

# 数据库配置
DB_NAME=distribution_mall

# JWT密钥
JWT_SECRET=你的JWT密钥
```

## 🔗 联盟推广配置

### 淘宝联盟
1. 登录 [淘宝联盟](https://pub.alimama.com/)
2. 申请 API 权限
3. 在后台管理页面添加 API Key
4. 生成推广链接

### 拼多多
1. 登录 [拼多多联盟](https://pdd.thepop.com/)
2. 申请 API 权限
3. 在后台管理页面添加 API Key
4. 生成推广链接

## 📚 文档

- [后端 API 文档](./backend/API.md)
- [前台开发指南](./frontend/README.md)
- [后台开发指南](./admin/README.md)

## 🛠️ 可用命令

### 前台
```bash
cd frontend
npm run dev      # 开发模式
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
```

### 后台
```bash
cd admin
npm run dev      # 开发模式
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
```

### 后端
```bash
cd backend
npm run dev      # 使用 wrangler 开发模式
wrangler deploy  # 部署到 Cloudflare Workers
```

## 📝 License

MIT

## 👨‍💻 作者

[Dovemiao](https://github.com/Dovemiao)

## 🤝 贡献

欢迎 Fork 和 Pull Request！
