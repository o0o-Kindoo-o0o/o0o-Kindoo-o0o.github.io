---
sidebar_position: 1
title: Cấu hình Loại Công việc
---

# Hướng dẫn Cấu hình Loại Công việc (Work Entry Types)

Tài liệu này hướng dẫn chi tiết cách thiết lập và cấu hình các **Loại Công việc (Work Entry Types)** trong module **Kindoo Work Entry**. Việc cấu hình đúng loại công việc là vô cùng quan trọng vì nó ảnh hưởng trực tiếp đến việc hiển thị ma trận chấm công, giải quyết xung đột khi trùng lịch làm việc, và tính toán hệ số lương khi xuất dữ liệu tính lương (Payroll).



---

## 1. Đường dẫn cấu hình

Để truy cập danh sách và cấu hình các Loại Công việc, truy cập theo đường dẫn sau trên giao diện Odoo:

> **Kindoo Work Entry** $\rightarrow$ **Configuration** $\rightarrow$ **Work Entry Types**

---

## 2. Chi tiết các trường thông tin cấu hình

Khi tạo mới hoặc chỉnh sửa một Loại Công việc, bạn cần cấu hình các thông tin sau:

| Tên trường (Giao diện) | Tên kỹ thuật (Field) | Loại dữ liệu | Ý nghĩa & Hướng dẫn thiết lập | Ý kiến / Yêu cầu chỉnh sửa |
| :--- | :--- | :--- | :--- | :--- |
| **Work Entry Type Name** | `name` | Char | Tên hiển thị trực quan (ví dụ: *Công thường, Nghỉ phép năm, Tăng ca ngày thường 150%, Tăng ca Chủ nhật 200%*). | |
| **Display Code** | `display_code` | Char (Tối đa 3 ký tự) | Mã hiển thị ngắn gọn trên bảng ma trận chấm công (Attendance Matrix) giúp giao diện gọn gàng (ví dụ: `ATT`, `AL`, `PH`, `OT1`). | |
| **Payroll Code** | `code` | Char (Duy nhất) | Mã kỹ thuật dùng trong cấu thức tính lương và tổng hợp công. **Lưu ý:** Không nên thay đổi mã này sau khi đã sử dụng vì sẽ ảnh hưởng đến công thức lương. | |
| **External Code** | `external_code` | Char | Mã đối chiếu dùng khi xuất dữ liệu tích hợp với phần mềm nhân sự/kế toán bên thứ ba (nếu có). | |
| **Sequence** | `sequence` | Integer | Thứ tự ưu tiên dùng để tự động giải quyết xung đột khi các bản ghi công bị trùng lặp thời gian trong cùng một ngày (xem chi tiết ở **Mục 3**). | |
| **Salary Rate** (hoặc **Rate**) | `amount_rate` | Float (Hiển thị dạng %) | Hệ số nhân lương áp dụng cho loại công việc này (ví dụ: `100%` cho ngày thường, `150%`/`200%`/`300%` cho tăng ca, hoặc `0%` cho nghỉ không lương) (xem chi tiết ở **Mục 4**). | |
| **Working Time** | `is_work` | Boolean | Tích chọn nếu loại công việc này được tính là thời gian làm việc thực tế trong lịch trình làm việc chuẩn. | |
| **Time Off** | `is_leave` | Boolean | Tích chọn nếu loại công việc này liên kết với một loại nghỉ phép (Leaves/Holidays). Trường này tự động đảo ngược giá trị với `is_work`. | |
| **Added to Monthly Pay** | `is_extra_hours` | Boolean | Tích chọn nếu các giờ thuộc loại này là giờ làm thêm ngoài giờ chuẩn và cần được cộng trực tiếp vào lương cơ bản dưới dạng khoản thưởng. | |
| **Color** | `color` | Integer | Mã màu dùng để phân biệt các loại công việc trên giao diện Lịch (Calendar) và Ma trận chấm công. | |
| **Active** | `active` | Boolean | Cho phép ẩn/hiện loại công việc mà không cần xóa lịch sử dữ liệu. | |

---

## 3. Cơ chế giải quyết xung đột thời gian (Conflict & Overlap Resolution)

Trong thực tế, một nhân viên có thể có nhiều loại bản ghi công trùng lặp thời gian với nhau trong cùng một ngày. 
*(Ví dụ: Nhân viên có lịch làm việc chuẩn cả ngày, nhưng đăng ký nghỉ phép nửa buổi chiều, hoặc đi làm tăng ca trùng vào ca làm việc chuẩn).*

Hệ thống Kindoo Work Entry tự động giải quyết các xung đột này dựa trên trường **Sequence (Thứ tự ưu tiên)** theo nguyên tắc:

:::important
**Quy tắc giải quyết trùng lặp:**
- Bản ghi có Loại Công việc sở hữu **Sequence cao hơn sẽ THẮNG** và được giữ nguyên vẹn thời gian.
- Bản ghi có Loại Công việc sở hữu **Sequence thấp hơn sẽ bị CẮT BỎ** hoặc **CHIA TÁCH** phần thời gian bị trùng lặp.
- Cơ chế này áp dụng tự động trên cả giao diện hiển thị bảng công (Attendance Matrix) và khi xuất Excel tổng hợp công (Worked Days Summary).
:::

### 3.1. Bảng Sequence khuyến nghị thiết lập

| Loại công việc | Sequence khuyến nghị | Lý do thiết lập | Ý kiến / Yêu cầu chỉnh sửa |
| :--- | :--- | :--- | :--- |
| **Tăng ca lễ (Holiday Overtime)** | **60** | Cao nhất. Giờ làm tăng ca trong ngày Lễ/Tết sẽ ghi đè lên lịch nghỉ Lễ để ghi nhận công đi làm và tính chế độ đặc biệt. | |
| **Nghỉ lễ (Public Holiday)** | **50** | Ưu tiên cao. Ngày lễ được nghỉ lễ theo quy định, đè lên giờ công thường hoặc lịch làm việc chuẩn. | |
| **Nghỉ phép (Leave / Time Off)** | **40** | Ưu tiên trung bình - cao. Thời gian nghỉ phép (phép năm, ốm, thai sản...) sẽ đè lên giờ công thường và giờ tăng ca thông thường. | |
| **Tăng ca (Overtime)** | **30** | Ưu tiên trung bình. Giờ tăng ca ngày thường/ngày nghỉ, đè lên giờ công thường nếu có trùng lặp. | |
| **Công thường (Regular Attendance / Work)** | **20** | Ưu tiên trung bình - thấp. Giờ đi làm thực tế ghi nhận từ máy chấm công. | |
| **Giờ chuẩn theo lịch (Standard Schedule)** | **10** | Thấp nhất. Khung giờ làm việc cơ sở theo lịch làm việc. | |

### 3.2. Ví dụ minh họa và Sơ đồ xử lý

Giả sử trong ngày **09/06/2026**:
1. Nhân viên có giờ công làm việc chuẩn ghi nhận từ máy chấm công từ **08:00 đến 17:00** (Loại công việc: *Công thường*, Sequence = `20`).
2. Nhân viên có đơn xin nghỉ phép được duyệt từ **13:00 đến 17:00** (Loại công việc: *Nghỉ phép*, Sequence = `40`).

Do **Nghỉ phép (Sequence 40) > Công thường (Sequence 20)**, hệ thống sẽ tự động xử lý như sau:


:::note
Kết quả tính công cuối cùng cho ngày này sẽ là:
- **Công thường:** 5 giờ (từ 08:00 đến 13:00)
- **Nghỉ phép:** 4 giờ (từ 13:00 đến 17:00)
- Tổng thời gian ghi nhận: 9 giờ (không bị tính trùng lặp).
:::

---

## 4. Cơ chế Hệ số lương (Salary Rate)

Hệ số lương (`amount_rate`) quy định tỷ lệ chi trả cho mỗi giờ làm việc thuộc loại công việc tương ứng. Khi hệ thống tổng hợp công hoặc tính toán bảng lương (Payslip), số tiền trả cho nhân viên sẽ dựa trên công thức:

$$\text{Số tiền chi trả} = \text{Lương mỗi giờ} \times \text{Số giờ làm việc thực tế} \times \text{Hệ số lương (Salary Rate)}$$

### Thiết lập hệ số lương tiêu chuẩn:
- **Công thường (ATT):** Thiết lập `100%` (hệ số `1.0`). Nhân viên nhận đủ 100% lương giờ cho thời gian làm việc thực tế.
- **Nghỉ phép hưởng lương (AL):** Thiết lập `100%` (hệ số `1.0`). Nghỉ phép nhưng vẫn được trả đủ lương.
- **Nghỉ không lương (Unpaid):** Thiết lập `0%` (hệ số `0.0`). Thời gian nghỉ không tính lương.
- **Tăng ca ngày thường (OT 150%):** Thiết lập `150%` (hệ số `1.5`). Mỗi giờ tăng ca được trả gấp 1.5 lần giờ thường.
- **Tăng ca ngày nghỉ hàng tuần (OT 200%):** Thiết lập `200%` (hệ số `2.0`). Mỗi giờ tăng ca ngày nghỉ được trả gấp 2 lần.
- **Tăng ca ngày Lễ / Tết (OT 300%):** Thiết lập `300%` (hệ số `3.0`). Mỗi giờ tăng ca ngày Lễ được trả gấp 3 lần.

---

## 5. Các bước thiết lập nhanh Loại Công việc mới

1. Truy cập vào màn hình cấu hình Loại Công việc (**Configuration** $\rightarrow$ **Work Entry Types**).
2. Nhấp chuột vào nút **New** (Tạo mới).
3. Nhập các thông tin bắt buộc:
   - **Work Entry Type Name**: Tên loại công việc.
   - **Display Code**: Viết tắt 3 ký tự (Ví dụ: `OT2`).
   - **Payroll Code**: Mã tính lương duy nhất (Ví dụ: `OT_WEEKEND`).
4. Nhập chỉ số **Sequence** phù hợp để đảm bảo cơ chế giải quyết xung đột thời gian hoạt động đúng (Ví dụ: đặt `40` cho Nghỉ phép, `30` cho Tăng ca).
5. Thiết lập **Salary Rate** (Ví dụ: nhập `200%` nếu là tăng ca ngày nghỉ).
6. Tích chọn **Working Time** hoặc **Time Off** tùy theo bản chất của loại công việc.
7. Chọn **Color** hiển thị và nhấn biểu tượng **Save** (Lưu) để hoàn thành.
