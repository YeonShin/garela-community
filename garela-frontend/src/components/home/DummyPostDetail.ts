export interface CommentType {
  userId: number;
  commentId: number;
  userName: string;
  userImg: string | null;
  createdAt: Date;
  content: string;
  myComment: boolean;
}

export interface PostDetailType {
  postId: number;
  userId: number;
  userImg: string | null;
  userName: string;
  userInfo: string;
  category: string;
  createdAt: Date;
  title: string;
  postImg: string | null;
  content: string;
  comments: number;
  likes: number;
  views: number;
  liked: boolean;
  myPost: boolean;
  comment: CommentType[];
}

const DummyPostDetail: PostDetailType = {
  postId: 1,
  userId: 1,
  userImg: "https://via.placeholder.com/40",
  userName: "user1",
  userInfo: "User Information",
  category: "Study",
  createdAt: new Date("2023-07-01T12:00:00Z"),
  title: "test",
  postImg: "https://via.placeholder.com/150",
  content: `<h1 class="ql-align-center">제목</h1><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><ol><li><s>123213213213</s></li><li><s>123213123</s></li><li><s>123</s></li></ol><p class="ql-align-center"><br></p><p class="ql-align-center"><span style="background-color: rgb(255, 153, 0);">ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ</span></p><p><br></p><p><a href="http://naver.com" rel="noopener noreferrer" target="_blank">ㅀ롷롷</a></p><p class="ql-align-center"><br></p><p class="ql-indent-1">sdfsdfsdfsdf</p><p class="ql-align-center"><br></p><blockquote>우리는 진화한다</blockquote><blockquote>고로 인간이다.</blockquote><hr style="width: 70%;"><p class="ql-align-center"><br></p><p class="ql-align-center"><strong class="ql-font-monospace"><em>We got First One. So You're the winner!</em></strong></p><p class="ql-align-center"><br></p><hr style="width: 70%;"><p class="ql-align-center">앙녕하세요 저는 김연신입니다</p><p class="ql-align-center">제가 이번에 게시판 사이트를 개ㅔ발하게 되었는데 어떠신가요?</p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><pre class="ql-syntax" spellcheck="false">ㅇㄴㄹㄴㅇㄹㄴㅇㄹ
ㅁㅁㅇㄴㅁㅇㅇ
</pre><p class="ql-align-center"><br></p>
`,
  comments: 2,
  likes: 4,
  views: 32,
  liked: true,
  myPost: true,
  comment: [
    {
      userId: 2,
      commentId: 1,
      userName: "commenter1",
      userImg: "https://via.placeholder.com/40",
      createdAt: new Date("2023-07-01T14:00:00Z"),
      content: "This is a comment",
      myComment: true,
    },
    {
      userId: 3,
      commentId: 2,
      userName: "commenter2",
      userImg: "https://via.placeholder.com/40",
      createdAt: new Date("2023-07-01T15:00:00Z"),
      content: "This is another comment",
      myComment: true,
    },
  ],
};

export default DummyPostDetail;
