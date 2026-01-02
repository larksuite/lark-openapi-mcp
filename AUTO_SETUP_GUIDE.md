# Hướng dẫn chạy script tự động

## 🚀 Cách 1: Dùng file .bat (Đơn giản nhất)

1. Download file `setup-windows-auto.bat` từ repo này
2. **Double-click** vào file `setup-windows-auto.bat`
3. Script sẽ tự động:
   - Tạo thư mục config
   - Tạo file `claude_desktop_config.json`
   - Mở thư mục config để bạn kiểm tra
4. Restart Claude Desktop

## 🔧 Cách 2: Dùng PowerShell script (Chi tiết hơn)

1. Download file `setup-windows-auto.ps1`

2. **Chuột phải** vào file → Chọn **"Run with PowerShell"**

   Hoặc mở PowerShell và chạy:
   ```powershell
   .\setup-windows-auto.ps1
   ```

3. Nếu gặp lỗi "execution policy":
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
   .\setup-windows-auto.ps1
   ```

4. Restart Claude Desktop

## ⚡ Cách 3: Copy-paste vào PowerShell (Nhanh nhất)

1. Mở **PowerShell** (Win + X → Windows PowerShell)

2. Copy và paste **TOÀN BỘ** đoạn này:

```powershell
# Tạo thư mục
New-Item -ItemType Directory -Force -Path "$env:APPDATA\Claude" | Out-Null

# Tạo config
@"
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a",
        "cli_a9dd97eee3389ed2",
        "-s",
        "DeKaf683pqJGhPxiWVWIeh2VLSeBFGsO",
        "--domain",
        "https://open.larksuite.com",
        "--oauth",
        "--token-mode",
        "user_access_token"
      ]
    }
  }
}
"@ | Out-File -FilePath "$env:APPDATA\Claude\claude_desktop_config.json" -Encoding UTF8 -Force

Write-Host "`n✅ Hoàn tất! File config đã được tạo" -ForegroundColor Green
Write-Host "📁 Vị trí: $env:APPDATA\Claude\claude_desktop_config.json" -ForegroundColor Cyan
Write-Host "`n⚠️  Hãy RESTART Claude Desktop ngay!" -ForegroundColor Yellow
explorer "$env:APPDATA\Claude"
```

3. Nhấn **Enter**

4. Restart Claude Desktop

---

## ✅ Sau khi chạy script:

1. **Thoát hoàn toàn Claude Desktop**:
   - Chuột phải icon Claude trên taskbar
   - Chọn **"Quit"**

2. **Đợi 5 giây**

3. **Mở lại Claude Desktop**

4. **Kiểm tra**:
   - Click menu (góc trên trái)
   - Vào **"Connectors"**
   - Tìm **"lark-mcp"** trong danh sách

---

## 🎯 Xác nhận thành công:

Hỏi Claude Desktop:
```
Bạn có tools gì từ Lark?
```

Hoặc:
```
List my Lark groups
```

Nếu Claude trả lời với danh sách tools/groups → **Thành công!** 🎉

---

## 🐛 Gặp lỗi?

### Lỗi: "execution policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
```

### Lỗi: "File not found"
Đảm bảo bạn đang ở đúng thư mục chứa file .bat hoặc .ps1

### Lỗi: "MCP server not found"
- Kiểm tra file: `%APPDATA%\Claude\claude_desktop_config.json` có tồn tại không
- Restart lại Claude Desktop **hoàn toàn**
- Kiểm tra Node.js: `node -v` (cần >= 20.0.0)

---

## 📥 Download files:

Từ repo GitHub:
```
https://github.com/Truongnguyen90/lark-openapi-mcp
```

Hoặc clone repo:
```bash
git clone https://github.com/Truongnguyen90/lark-openapi-mcp.git
cd lark-openapi-mcp
```

Rồi chạy:
```
setup-windows-auto.bat
```

---

**Khuyến nghị: Dùng Cách 3 (Copy-paste vào PowerShell) - Nhanh và dễ nhất!**
