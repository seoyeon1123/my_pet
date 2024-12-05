// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const query = url.searchParams.get('q'); // 검색 쿼리 파라미터
//   const apiKey = '53e0ae22467568dd7ffeb108ed21bb47';
//   const encodedQuery = encodeURIComponent(query || ''); // 쿼리 파라미터 인코딩
//   const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodedQuery}`;

//   // 디버깅을 위한 로그 출력
//   console.log('인코딩된 쿼리:', encodedQuery);
//   console.log('카카오 API 요청 URL:', apiUrl);

//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         Authorization: `KakaoAK ${apiKey}`,
//       },
//     });

//     // 응답 상태 확인
//     console.log('카카오 응답 상태:', response.status);

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('카카오 응답 오류:', errorData); // 오류 응답 출력
//       throw new Error('주소 검색에 실패했습니다.');
//     }

//     const data = await response.json();
//     return NextResponse.json(data); // 카카오 API 응답 반환
//   } catch (error) {
//     console.error('서버 오류:', error); // 서버 오류 출력
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
