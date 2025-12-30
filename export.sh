#!/bin/bash

# Content Hub 代码导出脚本

set -e

echo "📦 Content Hub 代码导出工具"
echo "=============================="
echo ""

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="/workspace/projects"
ARCHIVE_NAME="content-hub-clean.tar.gz"

echo "📂 项目目录: $PROJECT_DIR"
echo "📦 输出目录: $OUTPUT_DIR"
echo "📁 文件名: $ARCHIVE_NAME"
echo ""

cd "$OUTPUT_DIR"

echo "🗜️  正在打包代码（排除 node_modules, .next, .git）..."
tar --exclude='content-hub/node_modules' \
    --exclude='content-hub/.next' \
    --exclude='content-hub/.git' \
    --exclude='content-hub/output.log' \
    -czf "$ARCHIVE_NAME" content-hub/

if [ -f "$ARCHIVE_NAME" ]; then
    SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
    echo "✅ 打包成功！"
    echo ""
    echo "📦 文件信息："
    echo "   - 文件名: $ARCHIVE_NAME"
    echo "   - 大小: $SIZE"
    echo "   - 位置: $OUTPUT_DIR/$ARCHIVE_NAME"
    echo ""
    echo "📥 下载方式："
    echo ""
    echo "方式 1 - SCP 下载（推荐）："
    echo "   scp your-username@server-ip:$OUTPUT_DIR/$ARCHIVE_NAME ./"
    echo ""
    echo "方式 2 - SFTP 工具："
    echo "   使用 FileZilla/WinSCP 等工具下载文件"
    echo ""
    echo "方式 3 - 查看 DOWNLOAD.md 了解更多方式"
    echo ""
    echo "📖 解压和使用："
    echo "   tar -xzf $ARCHIVE_NAME"
    echo "   cd content-hub"
    echo "   npm install"
    echo "   npm run dev"
    echo ""
else
    echo "❌ 打包失败"
    exit 1
fi
