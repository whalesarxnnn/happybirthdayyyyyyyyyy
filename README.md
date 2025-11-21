# Happy Birthday Surprise (React + Tailwind)

โครงโปรเจกต์เล็กๆ สำหรับหน้าเซอร์ไพรส์วันเกิด ทำด้วย React + Vite + Tailwind CSS

วิธีรัน (PowerShell) — เปิดที่โฟลเดอร์โปรเจกต์ `c:\Users\วาฬ\Desktop\webbbbb` แล้วรัน:

```powershell
npm install
npm run dev
```

จากนั้นเปิดเบราเซอร์ที่ลิงก์ที่ Vite แสดง (ปกติ http://localhost:5173)

ไฟล์สำคัญ:
- `index.html` — entry HTML
- `src/main.jsx` — React entry
- `src/App.jsx` — หน้าเซอร์ไพรส์หลัก (hero, modal, hearts)
- `src/styles.css` — Tailwind directives และสไตล์เล็กน้อย
- `tailwind.config.cjs` / `postcss.config.cjs` — config สำหรับ Tailwind

การปรับแต่งเพิ่มเติม:
- เปลี่ยนข้อความใน `src/App.jsx` ให้เป็นชื่อหรือข้อความที่ต้องการ
- เพิ่มรูปภาพหรือเพลงประกอบโดยใส่ใน `public/` แล้วเชื่อมลิงก์จาก `index.html` หรือคอมโพเนนต์