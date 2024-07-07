'use server';
import { connectDB } from '@/util/db';
import { redirect } from 'next/navigation';
// 파일쓰기 라이브러리 import
import fs from 'node:fs/promises';
import path from 'node:path';
import slugify from 'slugify';
import {v4 as uuidv4} from 'uuid';

export default async function shareAction(formData) {
    // input에 입력된 name과 값을 객체로 만들어준다
    const data = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    console.log(data);
    await saveData(data);
    redirect('/group') // 끝났으면 group페이지로
}

// 이미지 파일과 DB에 데이터를 저장
async function saveData(data) {
    data.slug = slugify(data.title, {lower:true}); // 특수문자 방지

    if(data.image) {
        // 이미지 이름을 결정, 확장자 파악
        const extension = data.image.name.split('.').pop(); // 확장자만 추출(png, jpg, jpeg, ??)
        // import {v4 as uuidv4} from 'uuid';
        const fileName = `${uuidv4()}.${extension}`; // 이미지명 결정 
        // public/images에 저장
        const filePath = path.join('public', 'images', fileName); // 이미지 경로 및 이름 설정
        if(extension == 'png' || extension == 'jpg' || extension == 'jpeg') {
            // 해당 확장자에 대해 파일로 저장
            const BufImage = await data.image.arrayBuffer(); // 이미지를 바이너리로 변환
            await fs.writeFile(filePath, Buffer.from(BufImage)); // 이미지 파일 저장
            data.image = `/images/${fileName}` // public 폴더의 해당 파일에 대해 정보저장
        }

    }else {
        data.image = '';
    }

    // DB에 내용 저장
    const db = (await connectDB).db('mydb'); // 데이터베이스명
    let result = await db.collection('group').insertOne(data); // group 컬렉션에 입력
}

// 업로드하는 이미지 이름이 곂칠수도 있으니깐 랜덤하게 설정
// npm install uuid slugify xss