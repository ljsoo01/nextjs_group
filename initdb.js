// 몽고DB
const { MongoClient } = require('mongodb');

// title, slug, image, summary, content, creator, creator_email
const initData = [
    {
        title: '월간 모임 공지',
        slug: 'monthly-meeting-announcement',
        image: '/images/photo1.jpg',
        summary: '이번 달 일정을 공지합니다',
        content: '이번 주말, 우리 동아리는 서울 근교의 공원으로 소풍을 떠납니다. 다양한 활동과 맛있는 도시락이 준비되어 있으니 많은 참여 바랍니다.',
        creator: '김철수',
        creator_email: 'chulsoo@example.com'
    },
    {
        title: '야외 촬영 후기',
        slug: 'movie-club-regular-meeting',
        image: '/images/photo2.jpg',
        summary: '매달 마지막 주 금요일에 모여 최신 영화를 감상하는 모임',
        content: '이번 달의 영화는 화제의 신작 "인셉션"입니다. 감상 후 자유롭게 토론하는 시간도 가질 예정이니, 많은 참석 바랍니다.',
        creator: '이영희',
        creator_email: 'younghee@example.com'
    },
    {
        title: '프로그래밍 동아리 워크샵',
        slug: 'programming-club-workshop',
        image: '/images/photo3.jpg',
        summary: '초보자를 위한 기초 프로그래밍 워크샵',
        content: '프로그래밍에 관심 있는 모든 분들을 환영합니다. 기초부터 차근차근 배우는 시간을 가질 예정이며, 노트북을 지참해 주시기 바랍니다.',
        creator: '박민준',
        creator_email: 'minjun@example.com'
    },
    {
        title: '요리 동아리 봄맞이 쿠킹 클래스',
        slug: '/images/photo4.jpg',
        image: '/images/photo4.jpg',
        summary: '봄철 제철 재료를 활용한 요리 클래스',
        content: '봄철 제철 재료를 활용한 다양한 요리를 배워보는 시간을 가집니다. 재료는 동아리에서 제공하니 편한 복장으로 오시면 됩니다.',
        creator: '김지혜',
        creator_email: 'jihey@example.com'
    },
    {
        title: '정기 워크숍 안내',
        slug: 'regular-workshop',
        image: '/images/photo5.jpg',
        summary: '봄 풍경을 담는 출사 모임',
        content: '따뜻한 봄날을 맞아 야외로 나가 봄 풍경을 사진에 담아보는 시간을 가집니다. 카메라를 지참해 주시고, 편안한 복장을 권장합니다.',
        creator: '최수연',
        creator_email: 'sooyeon@example.com'
    }
];

// mongodb+srv://admin:admin@cluster0.nlln2qm.mongodb.net/
async function connectDB() {
    const url = 'mongodb+srv://admin:admin@cluster0.nlln2qm.mongodb.net/?retryWrites=true&w=majority'
    const options = {};
    let connectDB;

    if(process.env.NODE_ENV === 'development') {
        if(!global._mongo) {
            global._mongo = new MongoClient(url, options).connect()
        }
        return connectDB = global._mongo
    } else {
        return connectDB = new MongoClient(url, options).connect()
    }
}

// 더미데이터 입력 (mydb 안에 group 안에 입력)
async function insertDummyData() {
    const client = await connectDB(); // url로 연결
    const db = client.db('mydb') // Database 이름으로 연결
    const collection = db.collection('group') // group 컬렉션에 접근

    const result = await collection.insertMany(initData); // 객체 배열을 전부 입력 (insertOne)
    console.log(`${result} 입력`);
}
insertDummyData()
// node 파일명