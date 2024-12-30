const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// تفعيل CORS لجميع النطاقات
app.use(cors({
    origin: 'https://admin.smarterp.top',  // تحديد النطاق الذي يسمح بالوصول
    methods: ['GET', 'POST'],  // تحديد الطرق المسموح بها
    allowedHeaders: ['Content-Type'],  // السماح بالهيدر Content-Type
}));

// تفسير محتوى JSON القادم من الطلبات
app.use(express.json());

// عنوان Google Apps Script
const scriptUrl = 'https://script.google.com/macros/s/AKfycbwj3yGjnKhlxufV4IVQn1mTcUKrDcw0lcfNaPp9zaNVXTQBzG7qod_-kyvpudZGs7QQ/exec';

// نقطة استقبال البيانات
app.post('/proxy', async (req, res) => {
    console.log('Received data:', req.body);

    try {
        // إرسال البيانات إلى Google Apps Script
        const response = await axios.post(scriptUrl, req.body);

        console.log('Response from Google Apps Script:', response.data);

        // إعادة الرد من Google Apps Script إلى العميل
        res.send(response.data);
    } catch (error) {
        console.error('Error sending data to Google Apps Script:', error.message);

        // إرسال رسالة خطأ إلى العميل
        res.status(500).send({
            status: 'error',
            message: 'Failed to send data to Google Apps Script.',
            error: error.message
        });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
