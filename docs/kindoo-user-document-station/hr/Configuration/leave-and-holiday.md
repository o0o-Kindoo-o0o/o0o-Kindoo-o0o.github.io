---
sidebar_position: 3
title: Cấu hình Nghỉ phép & Ngày nghỉ lễ
---

# Hướng dẫn Cấu hình Chế độ Nghỉ phép và Ngày nghỉ lễ (Time Off Types & Public Holidays)

Tài liệu này hướng dẫn chi tiết cho Cán bộ Nhân sự (HR Admin) cách thiết lập, quản lý các loại nghỉ phép và ngày nghỉ lễ chính thức trong hệ thống Odoo, đảm bảo dữ liệu công được tự động đồng bộ chính xác qua module **Kindoo Work Entry** phục vụ tính lương.

---

## PHẦN I: CẤU HÌNH LOẠI NGHỈ PHÉP (TIME OFF TYPES - hr.leave.type)

Loại nghỉ phép là các chế độ nghỉ phép mà nhân viên có thể sử dụng (Ví dụ: Nghỉ phép năm, Nghỉ phép bệnh, Nghỉ không lương, Nghỉ thai sản,...).

## 1. Quy trình các bước tạo mới
1. Truy cập vào ứng dụng **Nghỉ phép (Time Off)** từ màn hình ứng dụng chính.
2. Chọn menu **Cấu hình (Configuration)** > **Loại nghỉ phép (Time Off Types)**.
3. Nhấp vào nút **Mới (New)** ở góc trên bên trái để mở giao diện tạo mới.

## 2. Chi tiết các trường thông tin cấu hình
Dưới đây là mô tả chi tiết từng trường thông tin trên biểu mẫu Loại nghỉ phép:

### A. Thông tin cơ bản (General Information)
* **Tên loại nghỉ phép (Time Off Type)**: Điền tên trực quan để nhân viên dễ dàng nhận biết khi tạo đơn xin nghỉ (Ví dụ: *Nghỉ phép năm*, *Nghỉ phép bệnh hưởng BHXH*, *Nghỉ việc riêng*,...).
* **Người chịu trách nhiệm (Responsible Officer)**: Chọn nhân viên phụ trách quản lý loại phép này. Người này sẽ nhận được thông báo khi có các hoạt động liên quan (ví dụ: đơn xin cấp phép cần duyệt).

### B. Cấu hình Quy trình duyệt đơn (Approval Workflow)
Mục **Duyệt đơn (Approval)** xác định đơn xin nghỉ phép của nhân viên cần qua những cấp phê duyệt nào trước khi chính thức có hiệu lực:
* **Không cần duyệt (No Validation)**: Đơn phép tự động chuyển sang trạng thái đã duyệt ngay khi nhân viên gửi đi.
* **Duyệt bởi Quản lý trực tiếp (By Employee's Manager)**: Đơn phép chỉ cần Người quản lý trực tiếp của nhân viên đó phê duyệt.
* **Duyệt bởi Cán bộ nhân sự (By Time Off Officer)**: Đơn phép chỉ cần Cán bộ quản lý nghỉ phép (thuộc phòng HR) phê duyệt.
* **Cả quản lý và nhân sự duyệt (By Employee's Manager and Time Off Officer)**: Đơn phép phải qua 2 cấp duyệt. Đầu tiên, Quản lý trực tiếp duyệt (đơn chuyển sang trạng thái *Duyệt lần 1 - validate1*), sau đó Cán bộ nhân sự duyệt cuối cùng để đơn có hiệu lực hoàn toàn (*Validated*).

### C. Quản lý Hạn mức phép (Allocation Mode)
Thiết lập cách kiểm soát số ngày nghỉ tối đa của nhân viên:
* **Không cần cấp phát (No Allocation)**: Nhân viên có thể tự do xin nghỉ loại phép này mà không cần có số dư phép (Thích hợp cho: *Nghỉ không lương*, *Nghỉ ốm đau*, *Nghỉ việc riêng*).
* **Cho phép nhân viên xin cấp phép (Free Allocation Request)**: Nhân viên có thể tạo đơn xin cấp hạn mức phép (ví dụ: xin thêm 1 ngày nghỉ bù do làm thêm giờ), và HR sẽ phê duyệt đơn cấp phép đó.
* **Chỉ HR cấp phát (Allocated by HR / HR Only)**: Nhân viên không thể tự xin hạn mức. Chỉ có Cán bộ nhân sự mới được quyền phân bổ số ngày nghỉ cho nhân viên (Thích hợp cho: *Nghỉ phép năm*, *Nghỉ phép thâm niên*).

### D. Liên kết Loại công việc (Work Entry Type)
* **Loại công liên kết (Work Entry Type)**: Chọn đúng Loại công tương ứng (`hr.work.entry.type`). Khi đơn nghỉ phép được duyệt, hệ thống sẽ tự động tạo một bản ghi công với loại công này trên bảng công.
  * *Ví dụ:* Liên kết loại phép **Nghỉ phép năm** với Loại công việc **Nghỉ phép năm (`LEAVE_AL`)** có tỷ lệ thanh toán lương là `100%`.
  * *Ví dụ:* Liên kết loại phép **Nghỉ không lương** với Loại công việc **Nghỉ không lương (`LEAVE_UNPAID`)** có tỷ lệ thanh toán là `0%`.

:::important
Nếu bỏ trống trường **Loại công liên kết (Work Entry Type)**, hệ thống sẽ **không thể tự động sinh công** cho nhân viên trong những ngày họ nghỉ phép.
:::

### E. Cấu hình Hiệu lực & Hiển thị (Validity & Display)
* **Thời hạn hiệu lực (From / To)**: Giới hạn khoảng ngày loại phép này được phép sử dụng. Nhân viên chỉ nhìn thấy và chọn được loại phép này trong thời hạn quy định.
* **Cách thức xin nghỉ (Take Time Off in)**:
  * *Ngày (Day)*: Nhân viên chỉ có thể đăng ký nghỉ theo đơn vị ngày hoặc nửa ngày (0.5 ngày).
  * *Giờ (Hour)*: Cho phép nhân viên xin nghỉ chi tiết theo số giờ trong ngày.
* **Mã công ty (Company)**: Gán loại phép này cho một công ty cụ thể (trong trường hợp đa công ty). Nếu để trống, loại phép áp dụng chung cho mọi công ty.
* **Màu sắc hiển thị (Color)**: Lựa chọn màu sắc đại diện cho loại phép này khi hiển thị trên Lịch nghỉ phép (Calendar View).

### F. Cấu hình Nâng cao (Advanced Configurations)
* **Loại thời gian (Kind of Time Off - `time_type`)**: Định nghĩa bản chất của thời gian xin nghỉ:
  * *Vắng mặt (Absence / `leave`)*: Nhân viên thực sự nghỉ và vắng mặt tại nơi làm việc (Không đi làm).
  * *Thời gian làm việc (Worked Time / `other`)*: Nhân viên không ở văn phòng nhưng vẫn được tính là đang làm việc (Ví dụ: Đi công tác, Đi đào tạo/Hội thảo). Loại phép này giúp HR theo dõi thời gian vắng mặt tại văn phòng nhưng vẫn tính công đi làm bình thường trên bảng công.
* **Bao gồm ngày nghỉ lễ (Ignore Public Holidays - `include_public_holidays_in_duration`)**: 
  * Quyết định cách tính thời lượng nghỉ khi khoảng thời gian xin nghỉ bao gồm cả các ngày nghỉ lễ chính thức của công ty.
  * Nếu **Tích chọn (True)**: Ngày nghỉ lễ vẫn được tính vào tổng số ngày nghỉ của đơn. Nhân viên sẽ bị trừ hạn mức phép cho cả những ngày nghỉ lễ đó.
  * Nếu **Không tích chọn (False - Mặc định)**: Hệ thống tự động bỏ qua ngày nghỉ lễ. Nhân viên sẽ không bị trừ hạn mức phép vào ngày nghỉ lễ.
* **Ẩn trên Dashboard (Hide On Dashboard - `hide_on_dashboard`)**:
  * Nếu **Tích chọn (True)**: Loại nghỉ phép này sẽ không hiển thị trên Dashboard tổng quan về hạn mức nghỉ phép của nhân viên (Hữu ích khi doanh nghiệp có quá nhiều loại phép đặc thù cần ẩn bớt để giao diện gọn gàng).
* **Yêu cầu tài liệu đính kèm (Supporting Document - `support_document`)**:
  * Nếu **Tích chọn (True)**: Hệ thống sẽ yêu cầu đính kèm tài liệu minh chứng (Ví dụ: Giấy ra viện đối với Nghỉ ốm, Giấy đăng ký kết hôn đối với Nghỉ việc riêng kết hôn) khi tạo đơn.
* **Khấu trừ từ giờ làm thêm (Overtime Deductible - `overtime_deductible`)**:
  * Nếu **Tích chọn (True)**: Khi nhân viên đăng ký loại phép này (thường là Nghỉ bù - Compensatory Time Off), số ngày nghỉ sẽ được khấu trừ trực tiếp vào số dư giờ làm thêm (Overtime) tích lũy của nhân viên đó từ chấm công thực tế, thay vì trừ vào hạn mức phép năm.
* **Đủ điều kiện tích lũy phép (Eligible for Accrual Rate - `elligible_for_accrual_rate`)**:
  * Xác định xem thời gian nghỉ của loại phép này có được tính vào thời gian làm việc thực tế để tiếp tục tích lũy hạn mức phép khác (Accrual Allocation) hay không. Ví dụ: Đi công tác (`time_type` là `other`) thì vẫn được tính tích lũy phép năm bình thường.
* **Cho phép số dư âm (Allow Negative Cap - `allows_negative`) & Giới hạn âm tối đa (Negative Cap - `max_allowed_negative`)**:
  * Nếu **Cho phép số dư âm** được tích chọn: Hệ thống cho phép nhân viên xin nghỉ vượt quá số ngày phép hiện có (nghỉ ứng trước phép).
  * **Giới hạn âm tối đa**: Điền số ngày phép âm tối đa nhân viên được phép đạt đến (Ví dụ: Điền `-3` hoặc `3` để giới hạn chỉ được phép âm tối đa 3 ngày phép).

## 3. Ví dụ cấu hình tham khảo

| Loại nghỉ phép | Quy trình duyệt | Quản lý hạn mức | Loại công liên kết | Tỷ lệ thanh toán công |
| :--- | :--- | :--- | :--- | :--- |
| **Nghỉ phép năm** | Cả quản lý và nhân sự duyệt | Chỉ HR cấp phát | Nghỉ phép năm (`LEAVE_AL`) | 100% |
| **Nghỉ phép bệnh** | Duyệt bởi Cán bộ nhân sự | Không cần cấp phát | Nghỉ ốm hưởng BHXH (`LEAVE_SICK`) | 75% |
| **Nghỉ không lương** | Duyệt bởi Quản lý trực tiếp | Không cần cấp phát | Nghỉ không lương (`LEAVE_UNPAID`) | 0% |
| **Nghỉ chế độ thai sản**| Duyệt bởi Cán bộ nhân sự | Chỉ HR cấp phát | Nghỉ thai sản (`LEAVE_MAT`) | 0% |

## 4. Cơ chế tự động hóa chấm công của hệ thống
Hệ thống **Kindoo Work Entry** tự động đồng bộ hóa các đơn nghỉ phép (`hr.leave`) của nhân viên sang bảng công theo các nguyên tắc sau:

* **Tự động sinh công khi duyệt đơn:** Ngay khi đơn xin nghỉ phép được phê duyệt hoàn toàn (Trạng thái chuyển sang **`validate`**), hệ thống sẽ dựa trên Lịch làm việc và các phiên bản hợp đồng của nhân viên để tự động sinh ra các bản ghi công tương ứng ở trạng thái nháp (`draft`) với loại công việc đã liên kết.
* **Tự động loại trừ ngày nghỉ lễ (Public Holidays):** Nếu khoảng thời gian nghỉ phép của nhân viên trùng với ngày nghỉ lễ chính thức đã được cấu hình trong hệ thống (Xem *PHẦN II*), hệ thống sẽ tự động trừ các ngày nghỉ lễ này ra. Nhân viên không bị trừ ngày phép và hệ thống không tạo trùng hai loại công (vừa công lễ vừa công phép) trong cùng một ngày.
* **Tự động thu hồi công khi thay đổi trạng thái đơn phép:** Nếu đơn phép bị từ chối (`refuse`), bị hủy (`cancel`), hoặc đưa về trạng thái nháp/chờ duyệt (`draft`, `confirm`, `validate1`), hệ thống sẽ tự động xóa bỏ hoàn toàn các bản ghi công nháp liên quan đến đơn đó, đồng thời kích hoạt lại công làm việc bình thường cho nhân viên.
* **Tự động cập nhật công khi điều chỉnh đơn phép:** Khi có bất kỳ sự thay đổi nào đối với đơn phép đã duyệt (như sửa ngày nghỉ, đổi loại phép, thay đổi nhân viên,...), hệ thống sẽ tự động tính toán lại và cập nhật công mới tương ứng.
* **Bảo vệ dữ liệu công đã chốt lương:** Đối với những ngày nghỉ phép đã được chốt và chuyển trạng thái thành **Đã hoàn thành (`done`)**, hệ thống sẽ **giữ nguyên, không tự động xóa hoặc chỉnh sửa** kể cả khi đơn phép bị hủy, nhằm đảm bảo tính toàn vẹn của dữ liệu lương lịch sử. HR Admin phải điều chỉnh thủ công nếu muốn thay đổi.

---

## PHẦN II: CẤU HÌNH NGÀY NGHỈ LỄ (PUBLIC HOLIDAYS - resource.calendar.leaves)

Ngày nghỉ lễ là những ngày nghỉ lễ/tết được quy định chung cho toàn bộ doanh nghiệp hoặc một nhóm nhân viên theo lịch làm việc cụ thể. Hệ thống **Kindoo Work Entry** sẽ dựa vào cấu hình này để tự động chấm công nghỉ lễ cho nhân viên.

## 1. Các bước tạo mới Ngày nghỉ lễ
1. Truy cập vào ứng dụng **Nghỉ phép (Time Off)**.
2. Chọn menu **Cấu hình (Configuration)** > **Ngày nghỉ lễ (Public Holidays)**.
3. Nhấp vào nút **Mới (New)** (hoặc điền trực tiếp thông tin vào dòng trống ở cuối bảng nếu hiển thị dạng danh sách chỉnh sửa trực tiếp).

## 2. Chi tiết các trường thông tin cấu hình
* **Tên ngày nghỉ lễ (Name)**: Nhập tên ngày lễ (Ví dụ: *Tết Dương Lịch*, *Ngày Quốc Khánh 2/9*, *Giỗ tổ Hùng Vương*).
* **Từ ngày (From)**: Thời điểm bắt đầu kỳ nghỉ lễ (Ví dụ: `01/09/2026 00:00:00`).
* **Đến ngày (To)**: Thời điểm kết thúc kỳ nghỉ lễ (Ví dụ: `01/09/2026 23:59:59`).
* **Lịch làm việc (Working Hours / Calendar)**:
  * Chọn lịch làm việc áp dụng ngày lễ này (Ví dụ: *Lịch làm việc Văn phòng*).
  * Nếu **để trống (All Schedules)**, ngày nghỉ lễ sẽ áp dụng cho tất cả nhân viên thuộc mọi lịch làm việc trong hệ thống.
* **Loại công việc (Work Entry Type)**: Chọn loại công việc liên kết phù hợp (Ví dụ: *Ngày nghỉ lễ* hoặc loại công việc nghỉ lễ hưởng lương tương đương). Hệ thống sẽ dùng trường này để sinh công cho nhân viên.
* **Công ty (Company)**: Gán ngày lễ cho công ty tương ứng (trong môi trường đa công ty).

:::note
Để hệ thống tự động sinh công nghỉ lễ cho toàn bộ nhân sự, bản ghi ngày nghỉ lễ **bắt buộc** phải chọn **Loại công việc (Work Entry Type)** và trường **Resource (Tài nguyên)** phải để trống (không chọn một nhân viên cụ thể).
:::

## 3. Cơ chế tự động hóa chấm công của hệ thống
Hệ thống **Kindoo Work Entry** sẽ tự động thực hiện các tác vụ sau dưới nền để giảm thiểu thao tác thủ công cho HR Admin:

* **Tự động sinh công khi tạo mới:** Ngay khi bạn lưu một Ngày nghỉ lễ mới, hệ thống sẽ tự động quét danh sách nhân viên đang hoạt động của công ty/lịch làm việc tương ứng để tạo các bản ghi công nghỉ lễ ở trạng thái nháp (`draft`).
* **Tự động cập nhật công khi chỉnh sửa:** Nếu bạn sửa khoảng ngày lễ, lịch làm việc, loại công hoặc công ty, hệ thống sẽ tự động hủy (xóa) các công nháp cũ và tạo lại các bản ghi công mới đúng thông tin.
* **Tự động xóa công khi xóa ngày lễ:** Khi bạn xóa bản ghi Ngày nghỉ lễ, toàn bộ công nháp liên quan đến ngày lễ đó sẽ được tự động xóa sạch trên bảng công của nhân viên.
* **Bảo vệ dữ liệu công đã chốt lương:** Đối với những ngày nghỉ lễ đã được khóa công và chuyển trạng thái thành **Đã hoàn thành (`done`)**, hệ thống sẽ **giữ nguyên, không tự động xóa hoặc chỉnh sửa** để tránh ảnh hưởng đến kỳ lương lịch sử đã tính xong. HR Admin sẽ phải điều chỉnh thủ công nếu thực sự cần thiết.
