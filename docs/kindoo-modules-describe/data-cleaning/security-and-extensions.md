---
sidebar_position: 5
title: Bảo mật & Extension Modules
---

# Bảo mật & Extension Modules

## Bảo mật

| Khía cạnh | Mô tả |
|-----------|-------|
| **Access control** | `security/ir.model.access.csv` + `security/ir_rule.xml` |
| **Multi-company** | Users chỉ thấy dữ liệu của company mình |
| **Contextual merge** | Kiểm tra `check_access('read')` trên model target |
| **SQL injection prevention** | Sử dụng `odoo.tools.SQL` builder cho tất cả query |
| **Merge protection** | Model có thể set `_prevent_merge = True` để chặn deduplication |

## Extension Modules

Odoo cung cấp thêm các module mở rộng tương tự `data_merge_crm` cho các domain khác:

| Module | Target Models |
|--------|--------------|
| `data_merge_crm` | `crm.lead`, `crm.tag`, `crm.lost.reason` |
| `data_merge_helpdesk` | Helpdesk models |
| `data_merge_project` | Project models |
| `data_merge_stock_account` | Stock/Account models |
| `data_merge_utm` | UTM models |

## Frontend & Tests

### Custom Views

Module cung cấp custom views tại:
- `data_cleaning/static/src/views/` — Custom list view cho cleaning records
- `data_cleaning/static/src/views/` — Custom list view cho merge records

### Test Files

| Test File | Mô tả |
|-----------|-------|
| `test_common.py` | Base test utilities |
| `test_deduplication.py` | Test dedup logic |
| `test_filter.py` | Test filtering |
| `test_merge_account.py` | Test merge cho account |
| `test_merge.py` | Test generic merge |
