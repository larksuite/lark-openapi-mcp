# Hướng dẫn cài đặt Lark MCP trên Windows

Hướng dẫn chi tiết cho người dùng Windows muốn setup Lark MCP với Claude Desktop.

## Yêu cầu

- ✅ Windows 10 hoặc mới hơn
- ✅ Node.js >= 20.0.0
- ✅ Claude Desktop đã cài đặt
- ✅ App Lark/Feishu (có App ID và App Secret)

## Bước 1: Kiểm tra Node.js

Mở **PowerShell** hoặc **Command Prompt**, gõ:

```bash
node -v
```

Nếu hiển thị `v20.x.x` hoặc cao hơn → OK!

Nếu chưa có hoặc phiên bản cũ:
1. Tải tại: https://nodejs.org/
2. Chọn phiên bản **LTS**
3. Cài đặt và restart PowerShell

## Bước 2: Tạo file config Claude Desktop

### Cách 1: Dùng PowerShell (Khuyến nghị)

1. Mở **Windows PowerShell**:
   - Nhấn `Win + X`
   - Chọn "Windows PowerShell" hoặc "Terminal"

2. Copy và paste lệnh này (cho **Lark Quốc tế**):

```powershell
# Tạo thư mục config
New-Item -ItemType Directory -Force -Path "$env:APPDATA\Claude"

# Tạo file config cho Lark International
$config = @'
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "YOUR_APP_ID",
        "-s",
        "YOUR_APP_SECRET",
        "--domain",
        "https://open.larksuite.com"
      ]
    }
  }
}
'@

$config | Out-File -FilePath "$env:APPDATA\Claude\claude_desktop_config.json" -Encoding UTF8

# Mở thư mục để kiểm tra
explorer "$env:APPDATA\Claude"
```

3. Mở file `claude_desktop_config.json` vừa tạo
4. Thay:
   - `YOUR_APP_ID` → App ID thật của bạn
   - `YOUR_APP_SECRET` → App Secret thật của bạn
5. Lưu lại (Ctrl + S)

### Cách 2: Tạo thủ công

1. Nhấn `Win + R`
2. Gõ: `%APPDATA%\Claude`
3. Nhấn Enter
4. Nếu thư mục không tồn tại, tạo thư mục `Claude`
5. Tạo file mới: `claude_desktop_config.json`
6. Mở bằng Notepad
7. Paste nội dung:

**Cho Feishu Trung Quốc:**
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
        "YOUR_APP_ID",
        "-s",
        "YOUR_APP_SECRET"
      ]
    }
  }
}
```

**Cho Lark Quốc tế:**
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
        "YOUR_APP_ID",
        "-s",
        "YOUR_APP_SECRET",
        "--domain",
        "https://open.larksuite.com"
      ]
    }
  }
}
```

8. Thay `YOUR_APP_ID` và `YOUR_APP_SECRET`
9. Lưu lại

## Bước 3: Restart Claude Desktop

1. **Thoát hoàn toàn** Claude Desktop:
   - Chuột phải vào icon Claude trên taskbar
   - Chọn **Quit** hoặc **Exit**
   - Hoặc nhấn `Alt + F4` khi Claude đang focus

2. Mở lại Claude Desktop

3. Kiểm tra: Hỏi Claude:
   ```
   Bạn có tools nào từ Lark?
   ```

Nếu thấy danh sách tools → **Thành công!** 🎉

---

## Bước 4 (Tùy chọn): OAuth Login

Nếu cần truy cập tài liệu cá nhân, lịch, tin nhắn user:

### 4.1. Cấu hình Redirect URL

1. Vào https://open.larksuite.com/ (hoặc open.feishu.cn)
2. Chọn app của bạn
3. **Security Settings** → **Redirect URLs**
4. Thêm: `http://localhost:3000/callback`
5. **Save**

### 4.2. Chạy lệnh login

Mở PowerShell hoặc Command Prompt:

**Cho Lark Quốc tế:**
```bash
npx -y @larksuiteoapi/lark-mcp login -a YOUR_APP_ID -s YOUR_APP_SECRET --domain https://open.larksuite.com
```

**Cho Feishu Trung Quốc:**
```bash
npx -y @larksuiteoapi/lark-mcp login -a YOUR_APP_ID -s YOUR_APP_SECRET
```

Lệnh sẽ:
1. Mở browser tự động
2. Yêu cầu bạn đăng nhập Lark/Feishu
3. Cho phép quyền truy cập
4. Lưu token tự động

### 4.3. Cập nhật config

Mở `%APPDATA%\Claude\claude_desktop_config.json`, thêm `--oauth` và `--token-mode`:

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
        "YOUR_APP_ID",
        "-s",
        "YOUR_APP_SECRET",
        "--domain",
        "https://open.larksuite.com",
        "--oauth",
        "--token-mode",
        "user_access_token"
      ]
    }
  }
}
```

### 4.4. Restart Claude Desktop lại

---

## Ví dụ sử dụng

Sau khi setup xong, thử các lệnh sau trong Claude Desktop:

### Tin nhắn & Chat:
```
Liệt kê các nhóm chat của tôi
Gửi tin nhắn "Hello team!" đến nhóm Marketing
```

### Tài liệu:
```
Tạo tài liệu mới tên "Meeting Notes"
Đọc nội dung tài liệu abc123
```

### Lịch:
```
Kiểm tra lịch hôm nay
Tạo cuộc họp "Sprint Planning" vào 2pm ngày mai
```

---

## Khắc phục sự cố

### ❌ Lỗi: "MCP server not found"

**Giải pháp:**
1. Kiểm tra file JSON có lỗi cú pháp không:
   - Mở https://jsonlint.com/
   - Copy nội dung file config vào
   - Kiểm tra lỗi

2. Đảm bảo đường dẫn đúng:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```

3. Restart Claude Desktop **hoàn toàn** (Quit → Open lại)

### ❌ Lỗi: "Node.js not found"

**Giải pháp:**
1. Cài Node.js từ: https://nodejs.org/
2. Chọn phiên bản LTS
3. Restart PowerShell/Command Prompt sau khi cài
4. Kiểm tra: `node -v`

### ❌ Lỗi: "Invalid credentials"

**Giải pháp:**
1. Kiểm tra lại App ID và App Secret trong console Lark/Feishu
2. Đảm bảo không có khoảng trắng thừa khi copy
3. Kiểm tra app đã được **publish** chưa

### ❌ Lỗi: "Permission denied" khi gọi API

**Giải pháp:**
1. Vào Lark/Feishu console
2. Chọn app của bạn
3. **Permissions & Scopes**
4. Thêm các quyền cần thiết:
   - `im:message` - Tin nhắn
   - `im:chat` - Nhóm chat
   - `docx:document` - Tài liệu
   - `calendar:calendar` - Lịch
5. **Publish** app
6. Nếu dùng OAuth, chạy lại lệnh login

### ❌ OAuth login không mở browser

**Giải pháp:**
1. Copy URL từ terminal
2. Paste vào browser thủ công
3. Hoàn thành flow đăng nhập
4. Quay lại terminal

### ❌ "Redirect URI mismatch"

**Giải pháp:**
1. Vào console Lark/Feishu
2. **Security Settings** → **Redirect URLs**
3. Đảm bảo có: `http://localhost:3000/callback`
4. Lưu và thử lại

---

## Mẹo

### Kiểm tra config file

Mở PowerShell:
```powershell
notepad "$env:APPDATA\Claude\claude_desktop_config.json"
```

### Xem logs của Claude Desktop

Logs thường ở:
```
%APPDATA%\Claude\logs
```

### Xóa token OAuth và login lại

```powershell
# Xem vị trí lưu token
echo $env:LOCALAPPDATA
# Token lưu trong keychain/credential manager của Windows
```

---

## Tài liệu tham khảo

- [Hướng dẫn tiếng Việt đầy đủ](./SETUP_VI.md)
- [Quick Start](./QUICK_START_VI.md)
- [English Documentation](./README.md)
- [Configuration Guide](./docs/usage/configuration/configuration.md)

---

**Cần hỗ trợ?** Tạo issue tại: https://github.com/larksuite/lark-openapi-mcp/issues
