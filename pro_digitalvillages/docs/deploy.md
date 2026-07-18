# 数字乡村系统部署手册

## 环境要求

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20+ (开发环境)

## 快速启动

1. 克隆项目后进入根目录
2. 执行 `docker-compose up -d`
3. 等待服务启动完成
4. 访问 http://localhost/admin 进入后台管理端
5. 访问 http://localhost/dashboard 进入大屏端

## 开发环境启动

### 后端

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### 后台管理端

```bash
cd admin-web
npm install
npm run dev
```

### 大屏端

```bash
cd dashboard
npm install
npm run dev
```

### 小程序端（H5 预览）

```bash
cd miniapp
npm install
npm run dev
```

## 默认账号

- 用户名：admin
- 密码：admin123

## 目录说明

| 目录 | 说明 |
|------|------|
| backend | NestJS 后端服务 |
| admin-web | Vue 3 后台管理端 |
| dashboard | Vue 3 大屏可视化端 |
| miniapp | Vue 3 H5 小程序端 |
| nginx | Nginx 反向代理配置 |
| docs | 项目文档 |
