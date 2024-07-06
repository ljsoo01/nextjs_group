import ActivitiesGrid from "@/components/activities/activities-grid";
import { connectDB } from "@/util/db";
import Link from "next/link";
import styles from './page.module.css';
import { resolve } from "styled-jsx/css";

export default async function GroupPage() {

    // DB내용을 전체 조회해서 객체 배열로 변수에 저장
    const db = (await connectDB).db('mydb');
    let activities = await db.collection('group').find().toArray();
    console.log(activities);
    await new Promise(resolve=>setTimeout(resolve, 1500)) // 1.5초 대기

    // 몽고DB의 _id를 문자열로 변경해서 컴포넌트끼리 전달
    activities = activities.map((item, index)=>({
        ...item,
        _id: item._id.toString() // hexString에서 String으로 (props 전달을 위해)
    }))
    console.log(activities);

    return(
        <div>
            <header className={styles.header}>
                <h1>모임 활동 게시글</h1>
                <p className={styles.highlight}>
                    <Link href="/group/share">활동 공유</Link>
                </p>
            </header>
            <main className={styles.cta}>
                {/* 게시글을 보여주는 컴포넌트 */}
                <ActivitiesGrid activities={activities}/>
            </main>
        </div>
    )
}

// 리액트에서는 URL변경을 위해서
// <a></a>태그를 사용하지 않고 (새로고침방지)
// Link 컴포넌트를 이용