import fs from 'fs';
import path from 'path';

const docsRoot = path.resolve('docs');
const targetRoot = path.join(docsRoot, 'odoo-user-document-station', 'hr');

function convertAdmonitions(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^(\s*)> \[!(WARNING|IMPORTANT|NOTE|TIP)\]\s*(.*)$/);

    if (match) {
      const [, indent, type, inlineTitle] = match;
      const body = [];
      if (inlineTitle.trim()) {
        body.push(inlineTitle.trim());
      }
      i++;
      while (i < lines.length) {
        const next = lines[i];
        if (next.startsWith(`${indent}> `)) {
          body.push(next.slice(indent.length + 2));
          i++;
        } else if (next.trim() === `${indent}>`) {
          body.push('');
          i++;
        } else {
          break;
        }
      }
      result.push(`${indent}:::${type.toLowerCase()}`);
      result.push(...body.map((b) => `${indent}${b}`));
      result.push(`${indent}:::`);
      continue;
    }

    result.push(line);
    i++;
  }

  return result.join('\n');
}

function toDocusaurus(content, { title, sidebarPosition, fixPartHeadings = false }) {
  let body = content.trim();

  if (fixPartHeadings) {
    body = body.replace(/^# (PHẦN [IVX]+:)/gm, '## $1');
  }

  body = convertAdmonitions(body);

  return `---
sidebar_position: ${sidebarPosition}
title: ${title}
---

${body}
`;
}

const mappings = [
  {
    source: 'setup_work_entry.md',
    target: 'intro.md',
    title: 'Kindoo Work Entry - Hướng dẫn vận hành',
    sidebarPosition: 1,
    linkReplacements: {
      'setup_work_entry.md': './intro',
      'setup_work_entry_type.md': './Configuration/work-entry-types',
      'setup_resource_calendar.md': './Configuration/resource-calendar',
      'setup_leave_and_holiday.md': './Configuration/leave-and-holiday',
      'setup_attendance.md': './Configuration/attendance',
    },
  },
  {
    source: 'setup_work_entry_type.md',
    target: 'Configuration/work-entry-types.md',
    title: 'Cấu hình Loại Công việc',
    sidebarPosition: 1,
  },
  {
    source: 'setup_resource_calendar.md',
    target: 'Configuration/resource-calendar.md',
    title: 'Cấu hình Lịch làm việc',
    sidebarPosition: 2,
  },
  {
    source: 'setup_leave_and_holiday.md',
    target: 'Configuration/leave-and-holiday.md',
    title: 'Cấu hình Nghỉ phép & Ngày nghỉ lễ',
    sidebarPosition: 3,
    fixPartHeadings: true,
  },
  {
    source: 'setup_attendance.md',
    target: 'Configuration/attendance.md',
    title: 'Cấu hình Chấm công & Tăng ca',
    sidebarPosition: 4,
    fixPartHeadings: true,
  },
];

const categories = [
  {
    file: path.join(docsRoot, 'odoo-user-document-station', '_category_.json'),
    data: {
      label: 'Odoo User Document Station',
      position: 3,
      link: {
        type: 'generated-index',
        description: 'Tài liệu hướng dẫn người dùng các module Odoo tùy chỉnh',
      },
    },
  },
  {
    file: path.join(targetRoot, '_category_.json'),
    data: {
      label: 'HR',
      position: 1,
      link: {
        type: 'generated-index',
        description: 'Tài liệu module Nhân sự - Kindoo Work Entry',
      },
    },
  },
  {
    file: path.join(targetRoot, 'Configuration', '_category_.json'),
    data: {
      label: 'Configuration',
      position: 2,
      link: {
        type: 'generated-index',
        description: 'Hướng dẫn cấu hình nền tảng cho Kindoo Work Entry',
      },
    },
  },
];

for (const category of categories) {
  fs.mkdirSync(path.dirname(category.file), { recursive: true });
  fs.writeFileSync(category.file, `${JSON.stringify(category.data, null, 2)}\n`, 'utf8');
}

for (const mapping of mappings) {
  const sourcePath = path.join(docsRoot, mapping.source);
  const targetPath = path.join(targetRoot, mapping.target);
  let content = fs.readFileSync(sourcePath, 'utf8');

  if (mapping.linkReplacements) {
    for (const [from, to] of Object.entries(mapping.linkReplacements)) {
      content = content.replaceAll(`](${from})`, `](${to})`);
    }
  }

  const output = toDocusaurus(content, {
    title: mapping.title,
    sidebarPosition: mapping.sidebarPosition,
    fixPartHeadings: mapping.fixPartHeadings ?? false,
  });

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, output, 'utf8');
  fs.unlinkSync(sourcePath);
  console.log(`Migrated ${mapping.source} -> ${mapping.target}`);
}

const qrCodePath = path.join(
  docsRoot,
  'odoo-modules-describe',
  'QRCode',
  'qr_code_system_design_module.md',
);
let qrContent = fs.readFileSync(qrCodePath, 'utf8');
qrContent = qrContent.replace(
  '> [!NOTE] > **Tại sao cần field `current_scans` trong khi đã có bảng Log?**',
  ':::note Tại sao cần field `current_scans` trong khi đã có bảng Log?',
);
qrContent = qrContent.replace(
  /:::note Tại sao cần field `current_scans` trong khi đã có bảng Log\?\n> Nếu mỗi lần quét mã[\s\S]*?trong mili-giây\./,
  (block) =>
    block
      .replace(/^> /gm, '')
      .replace(
        /Giải pháp tối ưu: Dùng field `current_scans` như một \*\*bộ nhớ đệm \(Cache\)\*\*\. Mỗi lần có lượt quét mới, hệ thống chỉ việc `\+1` vào số này\. Việc đọc giá trị này là tức thì, giúp kiểm tra giới hạn \(`max_scans`\) trong mili-giây\./,
        'Giải pháp tối ưu: Dùng field `current_scans` như một **bộ nhớ đệm (Cache)**. Mỗi lần có lượt quét mới, hệ thống chỉ việc `+1` vào số này. Việc đọc giá trị này là tức thì, giúp kiểm tra giới hạn (`max_scans`) trong mili-giây.\n:::',
      ),
);
fs.writeFileSync(qrCodePath, qrContent, 'utf8');
console.log('Fixed QRCode admonition');
