#!/bin/bash

# Content Hub 快速启动脚本

set -e

echo "🚀 Content Hub 快速启动脚本"
echo "=============================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js 18+"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录下运行此脚本"
    exit 1
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "⚠️  未找到 .env.local 文件"
    echo ""
    echo "请创建 .env.local 文件并配置数据库连接："
    echo ""
    echo "DATABASE_URL=\"postgresql://用户名:密码@localhost:5432/数据库名\""
    echo ""
    echo "示例："
    echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/contenthub"'
    echo ""
    read -p "是否现在创建 .env.local 文件？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "请输入数据库连接字符串: " db_url
        echo "DATABASE_URL=\"$db_url\"" > .env.local
        echo "✅ .env.local 文件已创建"
    else
        echo "❌ 请先配置 .env.local 文件"
        exit 1
    fi
fi

echo "✅ 环境变量配置检查完成"
echo ""

# 安装依赖
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi
echo ""

# 检查数据库连接
echo "🔍 检查数据库连接..."
if npm run db:check 2>/dev/null; then
    echo "✅ 数据库连接正常"
else
    echo "⚠️  数据库连接失败或未初始化"
    echo ""
    read -p "是否需要运行数据库迁移？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 正在运行数据库迁移..."
        npx drizzle-kit push
        echo "✅ 数据库迁移完成"
    fi
fi
echo ""

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo ""
echo "访问地址："
echo "  - 前台：http://localhost:3000"
echo "  - 管理后台：http://localhost:3000/admin"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
