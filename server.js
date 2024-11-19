// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = 'guestbook.json'; // 방명록 데이터를 저장할 파일 경로

// 방명록 데이터 읽기
const readEntries = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return []; // 파일이 없으면 빈 배열 반환
};

// 방명록 데이터 저장
const saveEntries = (entries) => {
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
};

// 방명록 엔드포인트
app.post('/api/entries', (req, res) => {
    const entries = readEntries(); // 기존 방명록 데이터 읽기
    entries.push(req.body); // 새로운 항목 추가
    saveEntries(entries); // 수정된 데이터 저장
    res.status(201).send(req.body); // 추가된 데이터 응답
});

// 방명록 조회 엔드포인트
app.get('/api/entries', (req, res) => {
    const entries = readEntries(); // 방명록 데이터 읽기
    res.send(entries); // 데이터 응답
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});