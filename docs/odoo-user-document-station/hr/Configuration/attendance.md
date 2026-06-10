---
sidebar_position: 4
title: Cấu hình Chấm công & Tăng ca
---

# Hướng dẫn Cấu hình Chấm công và Quy tắc Tăng ca (Attendance & Overtime Rulesets)

Tài liệu này hướng dẫn chi tiết cách cấu hình Bộ quy tắc Tăng ca (Overtime Rulesets) và quản lý dữ liệu Chấm công (Attendances) của nhân viên trong hệ thống Odoo, đảm bảo dữ liệu công và giờ làm thêm được tự động tính toán chính xác qua module **Kindoo Work Entry** phục vụ tính lương.

---

## PHẦN I: CẤU HÌNH BỘ QUY TẮC TĂNG CA (OVERTIME RULESETS)

Bộ quy tắc tăng ca (`hr.attendance.overtime.ruleset`) quản lý các điều kiện phát hiện giờ làm thêm từ dữ liệu chấm công thực tế và liên kết chúng với các loại công tăng ca tương ứng để trả lương.

## 1. Đường dẫn cấu hình
Để thiết lập Bộ quy tắc tăng ca, truy cập:
> **Chấm công (Attendance)** $\rightarrow$ **Cấu hình (Configuration)** $\rightarrow$ **Bộ quy tắc tăng ca (Overtime Rulesets)**

## 2. Cấu hình Bộ quy tắc tăng ca (Ruleset)
Khi tạo mới một Ruleset, HR Admin thiết lập các thông tin chung sau:
* **Tên bộ quy tắc (Ruleset Name)**: Nhập tên gợi nhớ (Ví dụ: *Quy tắc tăng ca khối văn phòng*, *Quy tắc tăng ca khối nhà máy*).
* **Chế độ kết hợp hệ số nhân (Rate Combination Mode)**: Xác định cách tính toán hệ số lương khi có nhiều quy tắc tăng ca cùng được áp dụng đồng thời:
  * **Hệ số lớn nhất (Maximum Rate - `max`)**: Chỉ sử dụng hệ số của quy tắc cao nhất. *(Ví dụ: Nếu giờ làm đó vừa thỏa mãn quy tắc 150% vừa thỏa mãn quy tắc 120%, hệ thống sẽ áp dụng hệ số 150%)*.
  * **Cộng dồn hệ số (Sum of all rates - `sum`)**: Cộng các phần vượt mức `100%` lại với nhau. *(Ví dụ: Hệ số cơ bản 100% + quy tắc thứ nhất vượt mức 50% + quy tắc thứ hai vượt mức 20% = Tổng hệ số 170% / 1.7)*.

## 3. Thiết lập chi tiết Quy tắc tăng ca (Overtime Rules)
Trong tab **Overtime Rules**, nhấp **Thêm một dòng (Add a line)** để định nghĩa từng quy tắc tăng ca con (`hr.attendance.overtime.rule`):

### A. Tiêu chí tính toán (Based Off)
* **Tính theo số lượng (Quantity)**: Giờ làm thêm là số giờ vượt quá mức quy định trong một chu kỳ (Ngày hoặc Tuần).
  * *Giờ làm việc thường lệ (Usual work hours)*: Số giờ chuẩn quy định (Ví dụ: 8 giờ/ngày).
  * *Giờ theo hợp đồng (Expected hours from contract)*: Hệ thống tự động lấy số giờ làm việc chuẩn theo lịch làm việc thực tế được gán cho nhân viên.
* **Tính theo mốc thời gian (Timing)**: Giờ làm thêm được xác định khi nhân viên làm việc vào các khung giờ hoặc ngày cụ thể:
  * *Ngày làm việc (work_days)*: Tăng ca trong ngày làm việc bình thường (Ví dụ: Tăng ca tối).
  * *Ngày nghỉ (non_work_days)*: Tăng ca vào ngày nghỉ tuần (Ví dụ: Chủ nhật).
  * *Khi nhân viên nghỉ (leave)*: Tăng ca vào thời điểm nhân viên được nghỉ phép/nghỉ lễ.
  * *Ngoài lịch làm việc cụ thể (schedule)*: Làm việc ngoài khung giờ quy định trong một Lịch làm việc được chọn.
  * *Khung giờ bắt đầu/kết thúc (From / To)*: Định nghĩa khung giờ tính tăng ca (Ví dụ: từ `18:00` đến `22:00`).

### B. Thiết lập Hành động & Thanh toán (Action)
* **Thanh toán giờ làm thêm (Pay extra hours)**: Tích chọn để xác định đây là giờ tăng ca có trả lương.
* **Loại công việc sử dụng (Work entry type to use)**: Chọn Loại công việc tăng ca tương ứng (Ví dụ: *Tăng ca ngày thường 150%*, *Tăng ca chủ nhật 200%*).
* **Hệ số lương (Rate)**: Hệ số này sẽ hiển thị ở dạng **Readonly (Chỉ đọc)** và tự động đồng bộ theo giá trị **Salary Rate (Rate)** của Loại công việc được chọn để đảm bảo tính thống nhất dữ liệu.

### C. Thiết lập Dung sai (Tolerances)
* **Dung sai doanh nghiệp (Employer Tolerance)**: Số giờ làm thêm tối thiểu trước khi hệ thống bắt đầu tính tăng ca (Ví dụ: nếu điền `00:30` (30 phút), nhân viên phải tăng ca từ 30 phút trở lên mới được ghi nhận).
* **Dung sai nhân viên (Employee Tolerance)**: Số giờ thiếu tối đa mà nhân viên được phép chênh lệch (được dung thứ) trước khi bị hệ thống ghi nhận là thiếu giờ làm việc so với ca chuẩn.

### D. Các Case Study minh họa phối hợp cấu hình theo Mốc thời gian (Timing)
Để hiểu rõ cách thiết lập và sự phối hợp giữa các loại quy tắc mốc thời gian, dưới đây là các tình huống thực tế thường gặp tại doanh nghiệp:

#### 📌 Case Study 1: Tính Tăng ca ngày Chủ Nhật (Hệ số 200%)
* **Mục tiêu:** Tính toàn bộ thời gian đi làm phát sinh vào ngày nghỉ tuần của nhân viên (Chủ nhật) là tăng ca ngày nghỉ.
* **Cách cấu hình:**
  1. Tạo quy tắc con: **"Tăng ca Chủ Nhật"**.
  2. **Based Off (Tính dựa trên):** Chọn `Timing`.
  3. **Timing Type (Loại mốc thời gian):** Chọn `On any non-working day` (`non_work_days`).
  4. **From / To (Khung giờ):** Nhập `00:00` và `24:00` (để tính trọn ngày).
  5. **Work Entry Type (Loại công):** Chọn *Tăng ca ngày nghỉ (`OT_WEEKEND`)* có hệ số lương `200%`.
* **Kết quả:** Khi nhân viên có dữ liệu chấm công check-in/out vào ngày Chủ nhật (ví dụ đi làm từ 08:00 đến 17:00), toàn bộ thời gian này sẽ được ghi nhận là công tăng ca ngày nghỉ 200%.

#### 📌 Case Study 2: Đi làm ngày Lễ, Tết (Hệ số 300%)
* **Mục tiêu:** Nhân viên đi làm vào ngày lễ quốc gia đã được công ty công bố (Public Holidays) sẽ được tính tăng ca lễ 300%.
* **Cách cấu hình:**
  1. Tạo quy tắc con: **"Đi làm ngày Lễ"**.
  2. **Based Off (Tính dựa trên):** Chọn `Timing`.
  3. **Timing Type (Loại mốc thời gian):** Chọn `When employee is off` (`leave`) - *loại này đại diện cho việc nhân viên đang có lịch nghỉ lễ/phép trùng thời gian đó*.
  4. **From / To (Khung giờ):** Nhập `00:00` và `24:00`.
  5. **Work Entry Type (Loại công):** Chọn *Tăng ca ngày Lễ (`OT_HOLIDAY`)* có hệ số lương `300%`.
* **Kết quả:** Vào ngày Quốc Khánh 2/9 (đã cấu hình Public Holiday), nếu nhân viên vẫn chấm công đi làm, hệ thống tự động sinh công tăng ca lễ 300% cho số giờ đi làm thực tế đó.

#### 📌 Case Study 3: Tăng ca ngoài giờ làm việc hành chính (Outside of Schedule)
* **Mục tiêu:** Lịch làm việc hành chính quy định ca làm việc từ 08:00 đến 17:00. Nhân viên đi làm sớm trước 08:00 hoặc về muộn sau 17:00 được tính là tăng ca thường 150%.
* **Cách cấu hình:**
  1. Tạo quy tắc con: **"Tăng ca ngoài ca hành chính"**.
  2. **Based Off (Tính dựa trên):** Chọn `Timing`.
  3. **Timing Type (Loại mốc thời gian):** Chọn `Outside of a specific schedule` (`schedule`).
  4. **Schedule (Lịch làm việc):** Chọn *Lịch hành chính (08:00 - 17:00)*.
  5. **Work Entry Type (Loại công):** Chọn *Tăng ca thường (`OT_150`)* có hệ số lương `150%`.
* **Kết quả:** Nhân viên đi làm check-in lúc 07:30 và check-out lúc 18:00. Khoảng thời gian đi làm sớm (07:30 - 08:00) và về muộn (17:00 - 18:00) sẽ tự động tách thành tổng cộng 1.5 giờ tăng ca thường 150%. Giờ từ 08:00 - 17:00 tính công thường.

## 4. Nút "Tái tạo dữ liệu tăng ca" (Regenerate overtimes)
* Khi bạn thay đổi hoặc điều chỉnh các quy tắc tăng ca của Ruleset, hệ thống sẽ không tự động áp dụng ngay cho dữ liệu chấm công cũ.
* Hãy click vào nút **Tái tạo dữ liệu tăng ca (Regenerate overtimes)** trên thanh công cụ của Ruleset để hệ thống chạy lại luồng tính toán công tăng ca dưới nền cho toàn bộ nhân viên áp dụng bộ quy tắc này.

---

## PHẦN II: TẠO VÀ QUẢN LÝ CHẤM CÔNG (HR ATTENDANCE - hr.attendance)

Chấm công ghi nhận thời gian đi làm thực tế của nhân viên (giờ vào, giờ ra). Hệ thống **Kindoo Work Entry** sẽ dựa vào dữ liệu chấm công này để tự động tạo công làm việc ca chuẩn và công làm thêm giờ cho nhân viên.

## 1. Cách tạo mới bản ghi Chấm công (Attendance Record)

### Cách 1: Thiết bị chấm công hoặc ứng dụng Kiosk/Portal
* Nhân viên tự check-in / check-out qua thiết bị chấm công tích hợp (máy quét vân tay/khuôn mặt), ứng dụng chấm công dạng Kiosk của công ty hoặc thông qua Cổng thông tin nhân viên cá nhân (Employee Portal) của Odoo. Bản ghi chấm công sẽ được tạo tự động với thời gian thực.

### Cách 2: HR Admin tạo thủ công (Manual Creation)
Trong trường hợp nhân viên quên chấm công hoặc xảy ra sự cố thiết bị:
1. Truy cập ứng dụng **Chấm công (Attendance)**.
2. Chọn menu **Chấm công (Attendances)**.
3. Nhấp vào nút **Mới (New)** ở góc trên bên trái.
4. Điền các thông tin:
   * **Nhân viên (Employee)**: Chọn nhân viên cần bổ sung chấm công.
   * **Giờ vào (Check In)**: Chọn ngày giờ nhân viên bắt đầu làm việc.
   * **Giờ ra (Check Out)**: Chọn ngày giờ nhân viên kết thúc ca làm việc (để trống nếu ca làm việc chưa kết thúc).
5. Nhấp nút **Lưu (Save)**.

## 2. Cơ chế tự động hóa chấm công của hệ thống
Hệ thống **Kindoo Work Entry** tích hợp sâu với dữ liệu chấm công thực tế của nhân viên để tự động xử lý công việc:

* **Tự động sinh công ca chuẩn (Auto-create Work Entries):** Ngay khi bản ghi chấm công được tạo hoặc cập nhật, hệ thống đối chiếu với phiên bản hợp đồng (Version) và Lịch làm việc của nhân viên để tự động sinh ra các bản ghi công làm việc thực tế ở dạng nháp (`draft`).
* **Tự động tính toán tăng ca (Auto-calculate Overtime):** Dựa trên Bộ quy tắc tăng ca (Overtime Ruleset) tương ứng của nhân viên, hệ thống tự động phân tích và chuyển đổi phần thời gian làm ngoài ca chuẩn hoặc vượt giờ định mức thành các bản ghi công tăng ca (Overtime Work Entries) tương ứng với loại công tăng ca liên kết đã cấu hình ở *PHẦN I*.
* **Tự động thu hồi công khi xóa chấm công:** Khi bản ghi chấm công bị xóa, hệ thống tự động thu hồi (xóa) các bản ghi công thường và công tăng ca nháp (`draft`) trong khoảng thời gian bị ảnh hưởng.
* **Bảo vệ dữ liệu công đã chốt lương:** Đối với những ngày chấm công đã được chốt công và chuyển trạng thái thành **Đã hoàn thành (`done`)**, hệ thống sẽ **giữ nguyên, không tự động xóa hoặc chỉnh sửa** kể cả khi bản ghi chấm công bị thay đổi hoặc xóa bỏ, nhằm đảm bảo tính toàn vẹn dữ liệu lương lịch sử. HR Admin phải điều chỉnh thủ công nếu thực sự cần thiết.

---

## 3. Cơ chế kiểm soát Xung đột Chấm công (Attendance Conflict Resolution)
Trong quá trình vận hành, dữ liệu chấm công (từ máy chấm công hoặc do người dùng tạo thủ công) có thể phát sinh xung đột với các phiên bản hợp đồng (`hr.version`) hoặc lịch làm việc của nhân viên. 
Hệ thống sẽ tự động kiểm tra và đánh cờ **`Conflict = True`** trên bản ghi chấm công thay vì báo lỗi (raise error) để tránh làm gián đoạn quá trình đồng bộ hoặc import dữ liệu hàng loạt.

Các loại xung đột được hệ thống tự động phát hiện và lý do (`conflict_reason`):
* **Không có hợp đồng phù hợp (`no_contract` - No contract overlap):** Ca chấm công nằm hoàn toàn bên ngoài bất kỳ phiên bản hợp đồng (Version) nào của nhân viên.
* **Check-in ngoài hợp đồng (`check_in_outside` - Check-in outside any version):** Thời điểm Check-in nằm ngoài khung ngày của các phiên bản hợp đồng, nhưng Check-out lại nằm trong một phiên bản hợp lệ.
* **Check-out ngoài hợp đồng (`check_out_outside` - Check-out outside any version):** Thời điểm Check-out nằm ngoài các phiên bản hợp đồng, nhưng Check-in lại nằm trong một phiên bản hợp lệ.
* **Bắt chéo nhiều phiên bản hợp đồng (`cross_version` - Spans across multiple versions):** Ca chấm công bắt đầu ở phiên bản hợp đồng cũ và kết thúc ở phiên bản hợp đồng mới (Ví dụ: ca làm việc đêm vắt qua thời điểm thay đổi hợp đồng).

:::warning
**Cách xử lý khi xảy ra Conflict:**
1. Khi bản ghi chấm công bị đánh dấu **Conflict (Xung đột)**, hệ thống sẽ **KHÔNG tạo bản ghi công nháp (draft work entry)** tương ứng để tránh làm sai lệch dữ liệu bảng công.
2. HR Admin cần sử dụng bộ lọc tìm kiếm "Conflict" trên danh sách chấm công để kiểm tra và xử lý thủ công (Ví dụ: sửa lại giờ check-in/out bị lệch, hoặc điều chỉnh thời hạn hợp đồng/phiên bản cho khớp).
3. Sau khi sửa đổi và loại bỏ cờ Conflict, hệ thống sẽ tự động sinh công và tính tăng ca bình thường cho nhân viên.
:::

---

## 4. Cơ chế Kiểm soát Gian lận Chấm công qua IP (IP Address Audit)
Để hỗ trợ HR kiểm soát tính trung thực và ngăn chặn gian lận chấm công (chấm công hộ, chấm công ngoài khu vực làm việc cho phép khi sử dụng kiosk/portal), hệ thống tự động ghi nhận địa chỉ IP khi nhân viên thực hiện thao tác:

* **Trường dữ liệu ghi nhận:**
  * **Check-in IP Address (`in_ip_address`):** Ghi nhận địa chỉ IP của thiết bị mà nhân viên sử dụng để Check-in.
  * **Check-out IP Address (`out_ip_address`):** Ghi nhận địa chỉ IP của thiết bị mà nhân viên sử dụng để Check-out.
  * *Lưu ý:* Tính năng này yêu cầu kích hoạt tùy chọn "Device & Location Tracking" trong cấu hình của phân hệ Chấm công.

* **Cách thức đối chiếu và phát hiện gian lận bằng tính năng Nhóm (Group By) và Pivot:**
  HR Admin có thể dễ dàng kiểm toán sự trung thực của dữ liệu bằng cách phân tích tập trung địa chỉ IP:
  1. **Nhóm theo địa chỉ IP (Group By IP):** Trên giao diện danh sách chấm công, sử dụng tính năng **Group By (Nhóm theo) > IP Address** (hoặc Check-in/Check-out IP Address).
  2. **Các dấu hiệu bất thường cần lưu ý (Outliers):**
     * **Chấm công ngoài phạm vi cho phép:** Khi gom nhóm theo IP, HR sẽ thấy đa số nhân viên có IP thuộc mạng nội bộ của công ty. Nếu phát hiện một số nhân viên có IP lạ (mạng 4G di động hoặc IP mạng gia đình), HR có thể nhận biết ngay nhân viên đang chấm công từ xa/ở nhà trái phép.
     * **Chấm công hộ (Buddy punching):** Khi gom nhóm, nếu phát hiện một địa chỉ IP duy nhất (ngoài văn phòng) được sử dụng để check-in/out cho rất nhiều nhân viên khác nhau trong một khoảng thời gian ngắn, đó là dấu hiệu của việc một người dùng chung một thiết bị để chấm công hộ cho các đồng nghiệp khác.
