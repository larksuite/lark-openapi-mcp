# Hướng dẫn cài đặt Lark MCP cho Claude Desktop

[English](./README.md) | Tiếng Việt

## Giới thiệu

Hướng dẫn này sẽ giúp bạn thiết lập Lark MCP (Model Context Protocol) để sử dụng với Claude Desktop, cho phép Claude truy cập và tương tác với Feishu/Lark API.

## Yêu cầu

- **Node.js**: Phiên bản >= 20.0.0
- **Claude Desktop**: Đã cài đặt trên máy tính
- **Ứng dụng Lark/Feishu**: Cần có App ID và App Secret

## Bước 1: Tạo ứng dụng Lark/Feishu

1. Truy cập [Feishu Open Platform](https://open.feishu.cn/) (Trung Quốc) hoặc [Lark Open Platform](https://open.larksuite.com/) (Quốc tế)
2. Đăng nhập và vào mục "Console"
3. Tạo ứng dụng mới
4. Lấy **App ID** và **App Secret** từ cài đặt ứng dụng
5. Thêm các quyền cần thiết cho ứng dụng của bạn
6. Nếu cần OAuth login, thiết lập redirect URL: `http://localhost:3000/callback`

## Bước 2: Kiểm tra Node.js

Mở terminal và chạy:

```bash
node -v
```

Phiên bản phải >= 20.0.0. Nếu chưa có hoặc phiên bản cũ, tải tại [nodejs.org](https://nodejs.org/)

## Bước 3: Cài đặt tự động (Khuyến nghị)

Chạy script tự động:

```bash
./setup-claude.sh
```

Script sẽ hỏi:
- **App ID**: ID ứng dụng của bạn
- **App Secret**: Secret key của ứng dụng
- **Lark International**: Chọn `y` nếu dùng phiên bản quốc tế
- **OAuth login**: Chọn `y` nếu cần truy cập API với danh tính user

## Bước 4: Cài đặt thủ công

Nếu không dùng script, làm theo các bước sau:

### 4.1. Tìm file cấu hình Claude Desktop

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 4.2. Thêm cấu hình MCP

Mở file cấu hình và thêm:

**Cấu hình cơ bản (dùng App ID/Secret)**:

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

**Cấu hình cho Lark quốc tế**:

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
        "--domain",
        "https://open.larksuite.com"
      ]
    }
  }
}
```

**Cấu hình với OAuth (truy cập user)**:

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

## Bước 5: Login OAuth (Nếu cần)

Nếu bạn cần truy cập API với danh tính user, chạy lệnh login:

```bash
# Login cơ bản
npx -y @larksuiteoapi/lark-mcp login -a your_app_id -s your_app_secret

# Login với scope cụ thể
npx -y @larksuiteoapi/lark-mcp login -a your_app_id -s your_app_secret --scope offline_access docx:document
```

**Lưu ý**: Trước khi login, đảm bảo đã cấu hình redirect URL trong console: `http://localhost:3000/callback`

## Bước 6: Khởi động lại Claude Desktop

1. Đóng hoàn toàn Claude Desktop
2. Mở lại Claude Desktop
3. Lark MCP tools sẽ có sẵn để sử dụng

## Tính năng

Sau khi cài đặt, Claude Desktop có thể:

- 📨 Gửi và quản lý tin nhắn Lark/Feishu
- 📄 Tạo, đọc và import tài liệu
- 📅 Quản lý lịch và cuộc họp
- 👥 Quản lý nhóm chat và thành viên
- 🔔 Gửi thông báo
- Và nhiều tính năng khác...

## Cấu hình nâng cao

### Chỉ định API cụ thể

Bạn có thể giới hạn chỉ sử dụng một số API nhất định bằng tham số `-t`:

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "your_app_id",
        "-s", "your_app_secret",
        "-t", "im.v1.message.create,im.v1.message.list,preset.calendar.default"
      ]
    }
  }
}
```

Xem danh sách đầy đủ các API và preset tại:
- [Preset Tools](./docs/reference/tool-presets/presets.md)
- [All Tools](./docs/reference/tool-presets/tools-en.md)

## Khắc phục sự cố

### Lỗi: "Claude Desktop không nhận MCP server"

1. Kiểm tra file cấu hình JSON có đúng cú pháp không
2. Đảm bảo đường dẫn file cấu hình chính xác
3. Khởi động lại Claude Desktop hoàn toàn

### Lỗi: "Node version not compatible"

Cập nhật Node.js lên phiên bản >= 20.0.0 từ [nodejs.org](https://nodejs.org/)

### Lỗi OAuth: "Redirect URI mismatch"

Đảm bảo đã thêm `http://localhost:3000/callback` vào danh sách redirect URI trong console Lark/Feishu

### Lỗi quyền (Permission denied)

Kiểm tra và thêm các quyền cần thiết cho ứng dụng trong console Lark/Feishu

## Tài liệu tham khảo

- [Tài liệu chính thức](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_introduction)
- [FAQ](./docs/troubleshooting/faq.md)
- [Hướng dẫn cấu hình](./docs/usage/configuration/configuration.md)
- [Feishu Open Platform](https://open.feishu.cn/)
- [Lark Open Platform](https://open.larksuite.com/)

## Ví dụ sử dụng

Sau khi cài đặt xong, bạn có thể yêu cầu Claude Desktop:

- "Gửi tin nhắn 'Hello' đến nhóm ABC trên Lark"
- "Tạo một tài liệu mới với tiêu đề 'Meeting Notes'"
- "Kiểm tra lịch của tôi hôm nay"
- "Tạo một cuộc họp mới vào 2pm ngày mai"

## Hỗ trợ

Nếu gặp vấn đề, vui lòng:
- Xem [FAQ](./docs/troubleshooting/faq.md)
- Tham khảo [Common Issues](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/use_cases)
- Báo lỗi tại [GitHub Issues](https://github.com/larksuite/lark-openapi-mcp/issues)

---

**Lưu ý**: Tool này đang ở giai đoạn Beta. Các tính năng và API có thể thay đổi.
