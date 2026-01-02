# Hướng dẫn cài đặt nhanh Lark MCP cho Claude

## Cài đặt tự động (Khuyến nghị) 🚀

### Bước 1: Chuẩn bị

Trước khi bắt đầu, bạn cần:

1. ✅ **Node.js >= 20.0.0** đã cài đặt
   ```bash
   node -v  # Kiểm tra version
   ```

2. ✅ **Ứng dụng Lark/Feishu** đã tạo
   - Truy cập: https://open.feishu.cn/ (Feishu) hoặc https://open.larksuite.com/ (Lark)
   - Tạo ứng dụng và lấy **App ID** và **App Secret**

3. ✅ **Claude Desktop** đã cài đặt

### Bước 2: Chạy script cài đặt

```bash
cd /home/user/lark-openapi-mcp
./setup-claude.sh
```

Script sẽ hỏi bạn:
- App ID của bạn
- App Secret của bạn
- Có dùng Lark phiên bản quốc tế không? (y/N)
- Có cần OAuth login không? (y/N)

### Bước 3: Khởi động lại Claude Desktop

Đóng hoàn toàn và mở lại Claude Desktop. Xong! 🎉

---

## Cài đặt thủ công

Nếu bạn muốn tự cấu hình:

### 1. Tìm file cấu hình Claude

- **Linux**: `~/.config/Claude/claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### 2. Tạo/Chỉnh sửa file cấu hình

Thêm cấu hình sau (thay `your_app_id` và `your_app_secret`):

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "your_app_id",
        "-s",
        "your_app_secret"
      ]
    }
  }
}
```

### 3. Khởi động lại Claude Desktop

---

## Nếu cần truy cập với danh tính user (OAuth)

### 1. Cấu hình redirect URL

Trong console Lark/Feishu, thêm redirect URL:
```
http://localhost:3000/callback
```

### 2. Login

```bash
npx -y @larksuiteoapi/lark-mcp login -a your_app_id -s your_app_secret
```

### 3. Cập nhật cấu hình Claude Desktop

Thêm `--oauth` và `--token-mode`:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "your_app_id",
        "-s",
        "your_app_secret",
        "--oauth",
        "--token-mode",
        "user_access_token"
      ]
    }
  }
}
```

---

## Ví dụ sử dụng trong Claude Desktop

Sau khi cài đặt, thử các lệnh sau trong Claude Desktop:

- "Gửi tin nhắn 'Hello team!' đến nhóm XYZ"
- "Tạo tài liệu mới tên 'Meeting Notes'"
- "Kiểm tra lịch hôm nay"
- "Tạo cuộc họp 'Sprint Planning' vào 2pm ngày mai"

---

## Gặp lỗi?

### Node.js quá cũ
```bash
# Cập nhật Node.js từ https://nodejs.org/
# Cần phiên bản >= 20.0.0
```

### Claude không thấy MCP server
1. Kiểm tra file JSON có đúng cú pháp không
2. Khởi động lại Claude Desktop hoàn toàn (quit và mở lại)
3. Kiểm tra logs trong Claude Desktop settings

### Lỗi permission/quyền
- Vào console Lark/Feishu
- Thêm các quyền cần thiết cho app của bạn
- Xem danh sách quyền cần thiết trong [README](./README.md)

---

## Tài liệu đầy đủ

- 📖 [Hướng dẫn chi tiết tiếng Việt](./SETUP_VI.md)
- 🪟 [Hướng dẫn cho Windows](./SETUP_WINDOWS.md)
- 📖 [English Documentation](./README.md)
- 📖 [中文文档](./README_ZH.md)
- 🔧 [Advanced Configuration](./docs/usage/configuration/configuration.md)

---

**Cần hỗ trợ?** Xem [FAQ](./docs/troubleshooting/faq.md) hoặc tạo issue tại [GitHub](https://github.com/larksuite/lark-openapi-mcp/issues)
