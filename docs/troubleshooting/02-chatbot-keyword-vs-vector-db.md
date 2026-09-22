# AI 챗봇: 벡터 DB 대신 키워드 매칭으로 구현 범위를 좁힌 이유

## 배경

인턴십 멘토(대표)로부터 벡터 DB와 임베딩 기반 유사도 검색 개념을 소개받고, 게시판에 누적된 게시글 데이터를 기반으로 답변하는 챗봇을 만들어보라는 과제를 받았습니다.

## 실제 구현

4주라는 짧은 기간과 당시 역량을 고려해, 임베딩 기반 유사도 검색 대신 **키워드 매칭 기반 컨텍스트 필터링**으로 구현 범위를 좁혔습니다.

처리 흐름:

1. 사용자 질문에서 불용어를 제거해 키워드 추출 (`extractKeywords`)
2. MySQL에서 전체 게시글을 조회한 뒤, 추출한 키워드가 포함된 게시글만 필터링 (`getPostsContent`)
3. 필터링된 게시글 본문을 `html-to-text`로 정제해 하나의 컨텍스트 문자열로 합침
4. 이 컨텍스트와 질문을 Python(Flask) AI 서버(`langchain_service.py`, 내부 포트 5001)로 전달
5. LangChain 체인이 OpenAI API를 호출해 답변 생성
6. 사용자별 JWT 세션으로 대화 요청의 유효성을 검증 (단, 이전 답변을 다음 질문의 컨텍스트로 재사용하지는 않음)

```js
// garela-backend/routes/chat.js
function extractKeywords(question) {
  const words = question.split(" ");
  return words.filter(word => !stopWords.includes(word));
}

async function getPostsContent(keywords) {
  const query = "SELECT post_id, content FROM posts";
  // 키워드가 본문에 포함된 게시글만 필터링 (SQL 조건절이 아닌 애플리케이션 레벨 필터)
  const filteredPosts = results.filter(row =>
    keywords.some(keyword => row.content.includes(keyword))
  );
  ...
}

async function getAnswer(question) {
  const keywords = extractKeywords(question);
  const { content, postIds } = await getPostsContent(keywords);
  const response = await axios.post('http://ai:5001/generate-answer', {
    context: content,
    question: question
  });
  return { answer: response.data.answer, references: postIds };
}
```

## 한계

정확히 같은 단어가 게시글에 포함되어 있어야만 컨텍스트로 잡히기 때문에, 동의어나 문맥을 이해하지 못합니다. 처음 소개받았던 "벡터 DB" 방식과는 다른, 훨씬 단순한 접근입니다.

## 결과 및 배운 점

완벽한 검색은 아니었지만, 짧은 기간 안에 "게시글 데이터를 참고해 답변하는 챗봇"이라는 요구사항 자체는 엔드투엔드로 완성했습니다. 이후 벡터 검색으로 고도화한다면 어떤 임베딩 모델과 유사도 지표를 쓸지가 다음 과제로 남아있습니다.

또한 LangChain 연동 로직만 별도 Python(Flask) 프로세스로 분리한 것에는 뚜렷한 기술적 근거가 있었던 것은 아니며, 당시 JS보다 Python 쪽 LangChain 자료가 더 많다고 느껴 선택한 실용적 판단에 가까웠습니다. 그 결과 서비스가 2개 프로세스로 나뉘어 로컬에서 함께 띄워야 하는 번거로움이 있었습니다.

## 참고

- 관련 코드: `garela-backend/routes/chat.js`, `garela-backend/langchain_service.py`
- 인턴십 회고 원문: [../회고-러프.md](../회고-러프.md)
