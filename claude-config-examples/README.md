# Claude Desktop Config Examples

Đây là các file config mẫu để bạn sử dụng trên máy local.

## Cách sử dụng:

### 1. Tìm vị trí file config Claude Desktop trên máy của bạn:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
  - Mở File Explorer, paste: `%APPDATA%\Claude`

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Mở Finder → Go → Go to Folder → paste: `~/Library/Application Support/Claude`

- **Linux**: `~/.config/Claude/claude_desktop_config.json`
  - Mở terminal: `mkdir -p ~/.config/Claude`

### 2. Chọn file config phù hợp:

#### `basic-config.json` - Cấu hình cơ bản
Dùng cho Feishu Trung Quốc, không cần OAuth

```bash
# Copy file này nếu bạn:
# - Dùng Feishu (open.feishu.cn)
# - Chỉ cần quyền app (không cần quyền user)
```

#### `lark-international.json` - Lark quốc tế
Dùng cho Lark phiên bản quốc tế

```bash
# Copy file này nếu bạn:
# - Dùng Lark (open.larksuite.com)
# - Chỉ cần quyền app (không cần quyền user)
```

#### `oauth-config.json` - Với OAuth
Dùng khi cần truy cập với danh tính user

```bash
# Copy file này nếu bạn:
# - Cần đọc tài liệu cá nhân
# - Cần gửi tin nhắn với tên user
# - Cần truy cập lịch cá nhân
```

### 3. Thay thông tin của bạn:

Mở file config bạn chọn và thay:
- `YOUR_APP_ID_HERE` → App ID thật của bạn (ví dụ: `cli_a1b2c3d4e5f6`)
- `YOUR_APP_SECRET_HERE` → App Secret thật của bạn

### 4. Copy vào đúng vị trí:

**Windows (PowerShell):**
```powershell
# Tạo thư mục nếu chưa có
New-Item -ItemType Directory -Force -Path "$env:APPDATA\Claude"

# Copy file (thay basic-config.json bằng file bạn chọn)
Copy-Item basic-config.json "$env:APPDATA\Claude\claude_desktop_config.json"
```

**macOS/Linux:**
```bash
# Tạo thư mục nếu chưa có
mkdir -p ~/Library/Application\ Support/Claude  # macOS
mkdir -p ~/.config/Claude                        # Linux

# Copy file (thay basic-config.json bằng file bạn chọn)
cp basic-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json  # macOS
cp basic-config.json ~/.config/Claude/claude_desktop_config.json                        # Linux
```

### 5. Nếu dùng OAuth:

Sau khi copy config, chạy lệnh login trên máy local:

```bash
npx -y @larksuiteoapi/lark-mcp login -a YOUR_APP_ID -s YOUR_APP_SECRET
```

**Lưu ý**: Trước khi login, nhớ thêm redirect URL vào console Lark/Feishu:
```
http://localhost:3000/callback
```

### 6. Khởi động lại Claude Desktop

1. Thoát hoàn toàn Claude Desktop (Quit, không phải Close)
2. Mở lại Claude Desktop
3. Lark MCP đã sẵn sàng! 🎉

## Kiểm tra xem đã hoạt động chưa:

Trong Claude Desktop, thử hỏi:
```
"Bạn có tool nào từ Lark không?"
```

Hoặc thử gửi tin nhắn:
```
"Gửi tin nhắn 'Hello' đến nhóm test"
```

## Gặp lỗi?

### Lỗi: "Claude không thấy MCP server"
1. Kiểm tra file JSON có đúng cú pháp không (dùng jsonlint.com)
2. Kiểm tra đường dẫn file config
3. Restart lại Claude Desktop hoàn toàn

### Lỗi: "Node.js not found"
Cài Node.js >= 20.0.0 từ https://nodejs.org/

### Lỗi: "Invalid credentials"
Kiểm tra lại App ID và App Secret trong console Lark/Feishu

---

## Hướng dẫn chi tiết:

- [Quick Start (Vietnamese)](../QUICK_START_VI.md)
- [Full Setup Guide (Vietnamese)](../SETUP_VI.md)
- [English Documentation](../README.md)
