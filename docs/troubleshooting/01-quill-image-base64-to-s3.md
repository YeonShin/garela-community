# Quill 에디터 이미지 Base64 저장 한계 → S3 URL 참조 전환

## 문제 상황

Quill 에디터에서 이미지를 첨부하면 기본 동작상 이미지가 Base64 문자열로 인코딩되어 게시글 본문(HTML)에 그대로 삽입됩니다. 이 상태로 이미지가 포함된 게시글을 저장하면 MySQL 저장 오류가 발생했습니다.

## 원인 분석

게시글 본문 컬럼(`posts.content`)이 MySQL `TEXT` 타입(최대 65,535바이트)으로 정의돼 있었는데, 이미지를 Base64로 인코딩하면 원본 대비 데이터 크기가 커지면서(약 1.33배) 이 한도를 쉽게 초과했습니다.

## 해결 과정

컬럼 타입을 `LONGTEXT`로 확장하는 방법도 있었지만, 이미지가 많아질수록 다시 같은 한계에 부딪히는 임시방편이라 판단해 이미지를 본문과 분리해 별도 스토리지에 저장하는 방향을 선택했습니다.

1. Quill의 이미지 삽입 핸들러(`imageHandler`)를 오버라이드해, 파일 선택 시 자동으로 서버에 업로드하도록 구현
2. 백엔드 `/upload/upload-image` API에서 Multer로 파일을 받아 로컬(`public/uploads`)에 임시 저장
3. 임시 저장된 파일을 읽어 AWS S3에 업로드
4. 업로드 완료 후 로컬 임시 파일은 즉시 삭제하고, S3 URL만 응답으로 반환
5. 프론트에서는 반환받은 S3 URL을 `quill.insertEmbed()`로 본문에 다시 삽입

```js
// garela-backend/routes/upload.js
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

router.post('/upload-image', upload.single('image'), async (req, res) => {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `images/${Date.now()}${path.extname(file.originalname)}`,
    Body: fs.createReadStream(file.path),
  };
  const result = await new Upload({ client: s3, params: uploadParams }).done();
  fs.unlinkSync(file.path); // 로컬 임시 파일 삭제
  const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
  res.status(200).json({ url: imageUrl });
});
```

```tsx
// garela-frontend/src/components/home/CreatePost.tsx
const imageHandler = () => {
  input.onchange = async () => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post("http://localhost:5000/upload/upload-image", formData);
    const imageUrl = response.data.url;

    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", imageUrl);
  };
};
```

## 결과 및 배운 점

이미지가 포함된 게시글도 본문 크기와 무관하게 정상적으로 저장·렌더링되도록 만들었습니다. 에디터에 들어오는 미디어는 본문 텍스트와 분리해서 관리해야 한다는 점을 체득했습니다.

다만 게시글이 삭제될 때 해당 게시글이 참조하던 S3 이미지까지 함께 정리하는 로직은 구현하지 않았습니다 — 4주라는 과제 범위에서는 스코프 아웃한 지점입니다.

## 참고

- 당시 참고한 블로그 포스팅: https://12ahn22.tistory.com/entry/Quill-에디터-이미지-처리하기
- 관련 코드: `garela-backend/routes/upload.js`, `garela-frontend/src/components/home/CreatePost.tsx`, `EditPost.tsx`, `templates/CreateTemplate.tsx`
