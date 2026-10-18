# HƯỚNG DẪN TỪNG BƯỚC HOÀN THÀNH LAB 6 AZURE

Tài liệu này hướng dẫn chi tiết từng cú click chuột để bạn hoàn thành bài Lab 6 và lấy trọn điểm.

---

## BƯỚC 1: LÀM 4 MODULE TRÊN MICROSOFT LEARN (LẤY ẢNH MINH CHỨNG)

Bạn truy cập vào các đường link sau (nhớ đăng nhập tài khoản Microsoft sinh viên):

1. **Module 1 (Azure SQL Database):**
   * Link: https://learn.microsoft.com/en-us/training/modules/get-started-sql-database-application-development/
   * *Nội dung:* Get started with Azure SQL Database for modern application development.

2. **Module 2 (Host a web application with Azure App Service):**
   * Link: https://learn.microsoft.com/en-us/training/modules/host-a-web-app-with-azure-app-service/
   * *Nội dung:* Host a web application with Azure App Service.

3. **Module 3 (Application Insights):**
   * Link chính: https://learn.microsoft.com/en-us/training/modules/configure-monitoring-applications/
   * Link bài thực hành OpenTelemetry & App Insights: https://learn.microsoft.com/en-us/training/modules/instrument-app-with-opentelemetry/

4. **Module 4 (Deploy by using GitHub Actions):**
   * Link: https://learn.microsoft.com/en-us/training/modules/github-actions-cd/
   * *Nội dung:* Build and deploy applications to Azure by using GitHub Actions.

---

## BƯỚC 2: TẠO TÀI NGUYÊN TRÊN AZURE PORTAL (portal.azure.com)

### 1. Tạo Web App (App Service)
1. Truy cập https://portal.azure.com/
2. Tìm kiếm **App Services** -> Bấm **+ Create** -> Chọn **Web App**.
3. Điền thông tin:
   * **Resource Group:** Chọn hoặc bấm *Create new* (VD: `rg-lab6-azure`).
   * **Name:** Đặt tên duy nhất (VD: `crm-api-sv123456`). *(Lưu lại tên này!)*
   * **Publish:** Code.
   * **Runtime stack:** `Node 20 LTS`.
   * **Operating System:** `Linux`.
   * **Pricing plan:** Chọn gói **Basic B1** hoặc **Standard S1** (để có hỗ trợ tính năng Autoscale).
4. Bấm **Review + create** -> **Create**.

### 2. Cấu hình Autoscale (Tự động co giãn)
1. Vào Web App vừa tạo -> Ở thanh menu bên trái, tìm mục **Scale out (App Service plan)**.
2. Chọn tab **Rule-based** (hoặc Custom autoscale).
3. Bấm **+ Add a rule**:
   * **Metric name:** Percentage CPU.
   * **Operator:** Greater than (`>`).
   * **Threshold:** `70`%.
   * **Action:** Increase count by `1`.
4. Bấm **Save**.
5. *Chụp ảnh màn hình giao diện cấu hình Autoscale này để dán vào báo cáo.*

### 3. Bật Application Insights & Lấy Connection String
1. Vào Web App -> Menu bên trái tìm **Application Insights**.
2. Bấm **Turn on Application Insights** -> Chọn Resource name mặc định -> Bấm **Apply**.
3. Sau khi bật xong, tìm mục **Connection String** -> Bấm copy chuỗi này.
4. Ở menu bên trái của Web App, vào mục **Configuration** (hoặc **Environment variables**) -> Bấm **+ New application setting**:
   * **Name:** `APPLICATIONINSIGHTS_CONNECTION_STRING`
   * **Value:** [Dán Connection String vừa copy vào]
5. Bấm **Apply** / **Save**.
6. *Chụp ảnh màn hình trang cấu hình Application Insights.*

### 4. Tải Publish Profile (Để cấu hình GitHub CI/CD)
1. Ở trang **Overview** của Web App trên Azure Portal.
2. Nhìn lên thanh công cụ trên cùng, bấm nút **Get publish profile** (file `.PublishSettings` sẽ được tải về máy).
3. Mở file vừa tải về bằng Notepad, copy toàn bộ nội dung text bên trong file.

---

## BƯỚC 3: ĐẨY CODE LÊN GITHUB & DEPLOY TỰ ĐỘNG

1. Mở trang https://github.com/ và tạo một **Repository mới** (VD: `azure-crm-api`, để chế độ Public hoặc Private đều được).
2. Thêm Secret vào GitHub:
   * Vào repo trên GitHub -> Bấm tab **Settings** -> **Secrets and variables** -> **Actions**.
   * Bấm nút **New repository secret**.
   * **Name:** `AZURE_WEBAPP_PUBLISH_PROFILE`
   * **Secret:** [Dán toàn bộ nội dung file Publish Profile đã copy ở Bước 2.4].
   * Bấm **Add secret**.
3. Cập nhật tên Web App trong file `.github/workflows/azure-deploy.yml`:
   * Mở file `.github/workflows/azure-deploy.yml` trong project.
   * Đổi giá trị dòng:
     ```yaml
     AZURE_WEBAPP_NAME: 'crm-customer-api'
     ```
     thành đúng tên Web App bạn đã tạo trên Azure (VD: `crm-api-sv123456`).
4. Đẩy mã nguồn lên GitHub bằng các lệnh terminal:
   ```bash
   git add .
   git commit -m "Update Azure Web App Name"
   git remote add origin https://github.com/[username-cua-ban]/[ten-repo].git
   git branch -M main
   git push -u origin main
   ```
5. Sau khi push xong, vào tab **Actions** trên GitHub xem pipeline tự động chạy:
   * Chờ khoảng 1-2 phút, khi có icon tích xanh ✅ là đã deploy thành công lên Azure!
   * *Chụp ảnh màn hình tab Actions này lại.*

---

## BƯỚC 4: TEST API TRÊN AZURE & HOÀN THÀNH BÁO CÁO

1. Truy cập vào đường dẫn Swagger của bạn:
   `https://[ten-web-app-cua-ban].azurewebsites.net/api-docs`
2. Bạn sẽ thấy giao diện Swagger UI hiển thị trực quan các API:
   * `/api/health`
   * `/api/customers` (GET, POST, PUT, DELETE)
3. Thử bấm **"Try it out"** và **"Execute"** các API -> Chụp ảnh kết quả.
4. Mở file [BAO_CAO_LAB6.md](file:///d:/HK261/C%C3%A1c%20n%E1%BB%81n%20t%E1%BA%A3ng%20ph%C3%A1t%20tri%E1%BB%83n%20ph%E1%BA%A7n%20m%E1%BB%81m/Lab6_%20Azure%20App/BAO_CAO_LAB6.md), dán các hình ảnh minh chứng đã chụp vào các mục tương ứng.
5. Xuất ra file PDF hoặc Word và nộp lên Elearning.
