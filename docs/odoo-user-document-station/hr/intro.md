---
sidebar_position: 1
title: Kindoo Work Entry - Hướng dẫn vận hành
---

# Hướng dẫn Sử dụng Hệ thống Quản lý Công Kindoo (Kindoo Work Entry User Guide)

Tài liệu này là hướng dẫn tổng quan dành cho Quản trị viên Nhân sự (HR Admin / HR Officer) để vận hành hệ thống quản lý công tự động **Kindoo Work Entry**. Module này giúp tự động hóa việc chấm công, tính giờ làm thêm (Overtime), quản lý nghỉ phép và ngày nghỉ lễ, làm cơ sở chính xác để tính lương (Payroll) trên Odoo.

---

## 📌 Các bước chuẩn bị trước khi vận hành (Prerequisites)

Để hệ thống **Kindoo Work Entry** có thể hoạt động chính xác, tự động hóa toàn bộ việc chấm công và tính tăng ca dưới nền, các cấu hình nền tảng liên kết bắt buộc phải được thiết lập hoàn tất từ trước.

Vui lòng nhấp vào các liên kết bên dưới để xem chi tiết hướng dẫn cấu hình cho từng phân hệ:

- **[📋 Vận hành Chung — Trang chính](./intro)** — Hướng dẫn tổng quan vận hành hàng ngày, tái tạo bảng công và khóa công chốt lương.
- **[⚙️ Cấu hình Loại Công việc](./Configuration/work-entry-types)** — Khai báo danh mục Loại công, thiết lập Tỷ lệ lương (`amount_rate`) và Thứ tự ưu tiên (`sequence`).
- **[📅 Cấu hình Lịch làm việc & Ca kíp](./Configuration/resource-calendar)** — Thiết lập thời gian làm việc chuẩn, nghỉ trưa, phân ca kíp tuần và múi giờ (Timezone).
- **[🌙 Cấu hình Chế độ Nghỉ phép & Ngày nghỉ lễ](./Configuration/leave-and-holiday)** — Thiết lập loại nghỉ phép (`hr.leave.type`), ngày nghỉ lễ (`resource.calendar.leaves`) và cơ chế tự động sinh công.
- **[🕐 Cấu hình Chấm công & Bộ quy tắc Tăng ca](./Configuration/attendance)** — Bộ quy tắc nhận diện Overtime, quản lý lịch sử chấm công (`hr.attendance`) và kiểm toán IP.

---

## 💻 Hướng dẫn vận hành hàng ngày (Daily Operation Guide)

Sau khi hoàn tất cấu hình nền tảng, HR Admin sẽ sử dụng module hàng ngày thông qua các nghiệp vụ chính sau:

### 1. Quản lý Bảng Ma trận Chấm công (Attendance Matrix View)
Giao diện ma trận chấm công hiển thị trực quan toàn bộ số giờ làm việc, nghỉ phép, tăng ca của từng nhân viên theo từng ngày trong tháng.
* **Đường dẫn truy cập:** **Kindoo Work Entry** $\rightarrow$ **Work Entry Overview**
* **Nghiệp vụ chính:**
  * **Kiểm tra nhanh số giờ:** Rà soát số giờ thường (`ATT`), tăng ca (`OT`), nghỉ phép (`AL`) của nhân viên trong ngày.
  * **Lọc (Filters):** Lọc danh sách theo Phòng ban, Nhân viên cụ thể hoặc theo Trạng thái công (Draft/Done).
  * **Xuất Excel:** Nhấp nút xuất Excel để tải bảng tổng hợp công chi tiết phục vụ cho kế toán làm bảng tính lương.

### 2. Tái tạo bảng công (Regenerate Work Entries)
Khi có sự điều chỉnh lịch sử (HR sửa lịch làm việc, thay đổi hợp đồng, hoặc nhân viên bổ sung chấm công muộn), HR Admin cần chạy lại dữ liệu công để bảng công cập nhật chính xác:
1. Truy cập màn hình **Work Entry Overview**.
2. Nhấp vào nút **Tái tạo bảng công (Regenerate Work Entries)** trên thanh công cụ.
3. Chọn khoảng thời gian cần chạy lại công và danh sách nhân viên bị ảnh hưởng, sau đó nhấp xác nhận.
4. Hệ thống sẽ chạy tác vụ quét lại toàn bộ dữ liệu chấm công, đơn phép, ngày lễ thực tế của nhân viên để tạo lại dữ liệu công chuẩn xác nhất.

### 3. Khóa công chốt lương (Done State)
Để bảo toàn dữ liệu bảng công cuối tháng trước khi xuất sang bảng lương:
* Chọn các bản ghi công hợp lệ và chuyển trạng thái từ **Dự thảo (Draft)** sang **Đã hoàn thành (Done)**.
* **Lưu ý an toàn:** Khi bản ghi công đã chuyển sang `Done`, hệ thống sẽ **khóa hoàn toàn** bản ghi đó. Mọi thay đổi về chấm công, đơn phép hay ngày lễ sau đó đều không thể tự động ghi đè hoặc chỉnh sửa lên các ngày đã chốt lương này, nhằm đảm bảo tính toàn vẹn của lịch sử chi trả lương. HR Admin sẽ phải mở khóa thủ công nếu thực sự cần điều chỉnh.
