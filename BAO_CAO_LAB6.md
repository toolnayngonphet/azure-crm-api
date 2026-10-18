# BÁO CÁO THỰC HÀNH LAB 6: TRIỂN KHAI VÀ QUẢN TRỊ ỨNG DỤNG TRÊN MICROSOFT AZURE

- **Môn học:** Các nền tảng phát triển phần mềm
- **Sinh viên thực hiện:** [Họ và tên của bạn]
- **Mã số sinh viên:** [MSSV]
- **Lớp:** [Lớp học phần]
- **Link GitHub Repository:** [Dán link repo GitHub của bạn vào đây]
- **Link Web App Azure:** https://[tên-web-app-của-bạn].azurewebsites.net

---

## PHẦN 1: KẾT QUẢ 4 MODULE MICROSOFT LEARN

### Module 1: Get started with Azure SQL Database for modern application development
- **Mô tả:** Học và thực hành khởi tạo cơ sở dữ liệu quan hệ Azure SQL Database, cấu hình Firewall và truy vấn dữ liệu.
- **Minh chứng bài tập (Exercise):**
  > *(Dán ảnh chụp màn hình hoàn thành Exercise / Query dữ liệu thành công trên Azure SQL tại đây)*

---

### Module 2: Host a web application with Azure App Service
- **Mô tả:** Tìm hiểu kiến trúc Azure App Service (PaaS), tạo App Service Plan và triển khai trang web mẫu lên Cloud.
- **Minh chứng bài tập (Exercise):**
  > *(Dán ảnh chụp màn hình Web App khởi tạo thành công và truy cập được trên trình duyệt tại đây)*

---

### Module 3: Monitor applications with Application Insights
- **Mô tả:** Tích hợp công cụ giám sát Application Insights để theo dõi Request, Dependency, Failure Rate và hiệu năng của ứng dụng theo thời gian thực (Live Metrics).
- **Minh chứng bài tập (Exercise):**
  > *(Dán ảnh chụp màn hình Dashboard Application Insights, Application Map hoặc Live Metrics có dữ liệu request tại đây)*

---

### Module 4: Build and deploy applications to Azure by using GitHub Actions
- **Mô tả:** Xây dựng quy trình tự động hóa CI/CD bằng GitHub Actions, tự động build source code và deploy lên Azure App Service khi có commit mới.
- **Minh chứng bài tập (Exercise):**
  > *(Dán ảnh chụp màn hình pipeline GitHub Actions chạy thành công (màu xanh) tại đây)*

---

## PHẦN 2: THỰC HÀNH MỞ RỘNG - XÂY DỰNG VÀ TRIỂN KHAI API CRM TRÊN AZURE

### 1. Kiến trúc hệ thống
- **Backend:** Node.js (Express + TypeScript)
- **Tài liệu API:** Swagger UI (OpenAPI 3.0) tích hợp tại `/api-docs`
- **Giám sát:** Azure Application Insights SDK
- **CI/CD:** GitHub Actions (`.github/workflows/azure-deploy.yml`)
- **Hosting:** Azure App Service (Linux, Node 20 LTS)
- **Tính năng mở rộng:** Cấu hình Autoscale tự động co giãn tài nguyên

### 2. Các chức năng API CRM đã xây dựng
- `GET /api/health`: Health check kiểm tra trạng thái dịch vụ (phục vụ Autoscale probe).
- `GET /api/customers`: Lấy danh sách khách hàng (hỗ trợ tìm kiếm theo tên/email/công ty và lọc theo trạng thái).
- `GET /api/customers/:id`: Lấy thông tin chi tiết một khách hàng.
- `POST /api/customers`: Tạo khách hàng mới trong hệ thống CRM.
- `PUT /api/customers/:id`: Cập nhật thông tin khách hàng.
- `DELETE /api/customers/:id`: Xóa khách hàng khỏi hệ thống.

---

### 3. Minh chứng triển khai trên Azure Portal

#### a. Khởi tạo Azure App Service
- **Tên Web App:** `[Tên app của bạn]`
- **Runtime stack:** Node 20 LTS (Linux)
- **Minh chứng:**
  > *(Dán ảnh màn hình trang Overview của Web App trên Azure Portal)*

#### b. Cấu hình Autoscale (Co giãn tự động)
- **Cấu hình:** Đặt quy tắc Scale out (tăng số instance khi CPU > 70%) và Scale in (giảm instance khi CPU < 30%).
- **Minh chứng:**
  > *(Dán ảnh màn hình cấu hình Scale Out / Autoscale rules trong App Service Plan)*

#### c. Tích hợp Application Insights
- **Connection String:** Đã nạp vào biến môi trường `APPLICATIONINSIGHTS_CONNECTION_STRING` trên App Service Configuration.
- **Minh chứng:**
  > *(Dán ảnh cấu hình App Settings trên Azure Portal và Dashboard Live Metrics hiển thị telemetry khi gọi API)*

#### d. Tự động hóa CI/CD với GitHub Actions
- **Quy trình:** Khi push code lên nhánh `main`, workflow sẽ tự động: `npm ci` -> `npm run build` -> đóng gói artifact -> deploy lên Azure Web App thông qua Publish Profile.
- **Minh chứng:**
  > *(Dán ảnh màn hình tab Actions trên GitHub báo trạng thái thành công - Green Check)*

---

### 4. Kết quả kiểm thử API trên Azure

#### a. Kiểm thử qua Swagger UI trên tên miền Azure (`https://...azurewebsites.net/api-docs`)
> *(Dán ảnh chụp màn hình giao diện Swagger UI đang chạy trên tên miền thật của Azure)*

#### b. Kiểm thử chức năng GET /api/customers (Danh sách khách hàng)
> *(Dán ảnh Postman hoặc trình duyệt gọi API lấy danh sách)*

#### c. Kiểm thử chức năng POST /api/customers (Thêm khách hàng mới)
> *(Dán ảnh Postman gửi body JSON thêm khách hàng thành công HTTP 201)*

#### d. Kiểm thử chức năng PUT & DELETE (Cập nhật và Xóa khách hàng)
> *(Dán ảnh Postman cập nhật và xóa khách hàng thành công)*

---

## PHẦN 3: KẾT LUẬN VÀ BÀI HỌC KINH NGHIỆM
- Nắm vững quy trình thiết kế, đóng gói và triển khai ứng dụng Cloud-native trên nền tảng Microsoft Azure.
- Hiểu rõ cơ chế tự động co giãn tài nguyên (Autoscale) giúp tối ưu hóa chi phí và đảm bảo tính sẵn sàng cao cho ứng dụng doanh nghiệp.
- Ứng dụng thành công văn hóa DevOps với GitHub Actions để rút ngắn chu kỳ phát hành phần mềm và Application Insights để chủ động giám sát lỗi trong môi trường thực tế.
