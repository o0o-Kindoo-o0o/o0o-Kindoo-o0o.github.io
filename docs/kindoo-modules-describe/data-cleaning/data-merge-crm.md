---
sidebar_position: 4
title: Data Merge CRM — Gộp dữ liệu CRM
---

# Data Merge CRM — Gộp dữ liệu CRM

Module `data_merge_crm` mở rộng `data_cleaning` để hỗ trợ deduplication chuyên biệt cho các model CRM, với logic merge tuỳ chỉnh cho `crm.lead`.

## Đặc điểm

```python
class CrmLead(models.Model):
    _inherit = 'crm.lead'
    _disable_data_merge = True  # Chặn generic merge, chỉ dùng custom
```

:::note
`crm.lead` sử dụng custom merge method thay vì generic merge. Điều này đảm bảo logic merge tương thích với pipeline CRM của Odoo.
:::

## So sánh Generic Merge vs CRM Lead Merge

| | Generic Merge | CRM Lead Merge |
|---|---|---|
| **Merge method** | Foreign key redirect | `merge_opportunity()` (CRM built-in) |
| **Master election** | Oldest record (`create_date`) | Highest confidence level |
| **Restriction** | Không có | Không merge Won opportunities (`probability = 100`) |
| **Chatter logging** | Có (snapshot) | Không (`log_chatter: False`) |
| **Post merge** | Archive/Delete | Unlink records |

## Master election logic

```python
def _elect_master(self, records):
    return records._sort_by_confidence_level(reverse=True)[0]
```

Chọn lead có **mức độ tin cậy cao nhất** làm master record.

## Dữ liệu mặc định cho CRM Models

### `crm.lead` — Lead/Opportunity

| Field | Match Mode | Ghi chú |
|-------|-----------|---------|
| `partner_id` | exact | Khách hàng liên quan |
| `email_from` | accent | Email (nếu có unaccent) |
| `partner_name` | accent | Tên công ty |
| `contact_name` | accent | Tên liên hệ |

:::important
**Domain:** `['probability', '<', 100]` — chỉ áp dụng cho lead/opportunity chưa won.
:::

### `crm.tag`

| Field | Match Mode |
|-------|-----------|
| `name` | accent |

### `crm.lost.reason`

| Field | Match Mode |
|-------|-----------|
| `name` | accent |

## Contextual Merge Action

Module enable nút **"Merge"** trên tree view của:
- `crm.lead`
- `crm.tag`

Khi user chọn 2+ record và nhấn **"Merge"**:

1. Kiểm tra có ít nhất 2 record được chọn
2. Tạo hoặc tìm `data_merge.model` cho model đó (đánh dấu `is_contextual_merge_action = True`)
3. Tạo `data_merge.group` mới
4. Tạo `data_merge.record` cho mỗi record được chọn
5. Redirect sang Deduplication view để user xem và confirm merge
