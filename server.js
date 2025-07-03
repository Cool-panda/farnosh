// فایل: server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// مسیر فایل دیتابیس ساده
const dbPath = path.join(__dirname, 'poems.json');

// خواندن شعرها
app.get('/api/poems', (req, res) => {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('خطا در خواندن داده‌ها');
        res.json(JSON.parse(data));
    });
});

// اضافه کردن شعر جدید
app.post('/api/poems', (req, res) => {
    const newPoem = req.body.poem;
    if (!newPoem) return res.status(400).send('شعر نمی‌تواند خالی باشد');

    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send('خطا در خواندن داده‌ها');

        let poems = JSON.parse(data);
        poems.push(newPoem);

        fs.writeFile(dbPath, JSON.stringify(poems), (err) => {
            if (err) return res.status(500).send('خطا در ذخیره داده‌ها');
            res.status(201).send('شعر با موفقیت اضافه شد');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
