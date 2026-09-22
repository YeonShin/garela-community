USE garela_db;

-- mysql 클라이언트의 세션 기본 문자셋이 latin1이라, 이 SET NAMES 없이 실행하면
-- 아래 한글 리터럴이 latin1로 잘못 해석된 뒤 utf8mb4 컬럼에 깨진 채로 저장된다(이중 인코딩).
-- 테이블 자체는 utf8mb4라 문제없어 보이지만 실제로는 클라이언트 세션 단계에서 깨지므로 반드시 필요.
SET NAMES utf8mb4;

-- 둘러보기용 데모 계정 (비밀번호: demo1234)
-- 백엔드(routes/users.js)가 bcrypt로 해시를 저장/비교하므로, 아래 값은 'demo1234'를 bcrypt(10 rounds)로 미리 해시한 값이다.
-- 평문 'demo1234' 그대로 로그인하면 된다.
INSERT INTO users (email, password, name, info) VALUES
  ('demo@garela.dev', '$2b$10$SLrlkbwJhZbki0GuwGno0OxJFrlMWUEPrpxjA4bHVAijQyGJeLUmS', '데모 계정', '둘러보기용 데모 계정입니다.');

-- 데모 게시글
INSERT INTO posts (user_id, category, title, summary, content, thumbnail_img, likes, views) VALUES
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Study',
  'Garela Community에 오신 것을 환영합니다',
  '템플릿을 스크랩하고 적용해서 글쓰기 허들을 낮춰보세요.',
  '<p>Garela Community는 커뮤니티에 공유된 템플릿을 스크랩해 글쓰기 에디터에 바로 적용할 수 있는 게시판입니다.</p><p>마이페이지에서 마음에 드는 템플릿을 스크랩하고, 글쓰기 화면에서 불러와 내용만 채워보세요.</p>',
  NULL, 12, 87
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Study',
  '백지 증후군 없이 글 쓰는 법',
  '빈 에디터가 막막할 땐 남이 먼저 잡아둔 구조를 빌려오면 됩니다.',
  '<p>텅 빈 에디터 앞에서 무엇부터 써야 할지 막막했던 경험, 다들 있으실 거예요.</p><p>이미 검증된 템플릿의 구조를 그대로 가져와 내용만 채우면, 글쓰기 시작이 훨씬 쉬워집니다.</p>',
  NULL, 8, 41
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Cooking',
  '자취 요리 3주 후기 - 실패 없는 레시피 모음',
  '자취 3주 차, 실패 없이 해먹은 요리들을 정리해봤어요.',
  '<p>자취를 시작하고 3주간 실패 없이 해먹었던 요리들을 정리해봤습니다.</p><p>1. 계란볶음밥 2. 된장찌개 3. 김치볶음밥 — 순서대로 난이도가 낮아서 처음 자취하시는 분들께 추천드려요.</p>',
  NULL, 23, 150
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Travel',
  '주말 당일치기 여행지 추천',
  '멀리 안 가도 충분한 근교 당일치기 코스 3곳을 소개합니다.',
  '<p>거창한 계획 없이도 훌쩍 다녀올 수 있는 근교 당일치기 코스를 소개합니다.</p><p>이동 시간이 짧아서 주말 하루만으로도 충분히 기분전환이 됩니다.</p>',
  NULL, 15, 92
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Fitness',
  '헬린이 첫 3개월, 뭐부터 해야 할까',
  '운동 초보 기준으로 첫 3개월 루틴을 어떻게 짰는지 공유합니다.',
  '<p>헬스 시작한 지 3개월 된 초보 입장에서, 처음에 뭐부터 해야 할지 몰라 헤맸던 경험을 공유합니다.</p><p>무게보다 자세, 그리고 꾸준함이 가장 중요했던 것 같아요.</p>',
  NULL, 19, 133
);

-- 데모 템플릿
INSERT INTO templates (user_id, category, title, content, thumbnail_img, likes, views) VALUES
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Travel',
  '여행 후기 템플릿',
  '<h3>📍 여행지 소개</h3><p>어디를, 언제, 누구와 다녀왔는지 간단히 적어보세요.</p><h3>🚗 이동 경로</h3><p>어떻게 이동했는지, 걸린 시간은 얼마나 됐는지 적어보세요.</p><h3>🍽️ 맛집 / 볼거리</h3><p>기억에 남는 장소나 음식을 정리해보세요.</p><h3>⭐ 총평</h3><p>다음에 또 가고 싶은지, 누구에게 추천하고 싶은지 적어보세요.</p>',
  NULL, 6, 34
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Cooking',
  '레시피 템플릿',
  '<h3>🥘 재료</h3><p>필요한 재료와 양을 나열해보세요.</p><h3>👩‍🍳 조리 순서</h3><p>1. 2. 3. 순서대로 조리 과정을 적어보세요.</p><h3>💡 꿀팁</h3><p>실패하지 않으려면 어떤 점을 주의해야 하는지 적어보세요.</p>',
  NULL, 9, 52
),
(
  (SELECT user_id FROM users WHERE email = 'demo@garela.dev'),
  'Movies',
  '책 · 영화 리뷰 템플릿',
  '<h3>📖 기본 정보</h3><p>제목, 저자/감독, 장르를 적어보세요.</p><h3>✏️ 줄거리 요약</h3><p>스포일러 없이 간단히 요약해보세요.</p><h3>💭 인상 깊었던 점</h3><p>가장 기억에 남는 장면이나 문장을 적어보세요.</p><h3>⭐ 별점</h3><p>5점 만점 기준으로 별점과 한줄평을 남겨보세요.</p>',
  NULL, 11, 63
);

-- 작성자 본인의 템플릿 라이브러리에도 추가 (실제 POST /templates 라우트와 동일한 동작)
INSERT INTO template_library (user_id, template_id)
SELECT (SELECT user_id FROM users WHERE email = 'demo@garela.dev'), template_id
FROM templates
WHERE user_id = (SELECT user_id FROM users WHERE email = 'demo@garela.dev');
