describe('커뮤니티 글 작성 테스트', () => {
  it('사용자는 글을 작성하고 등록할 수 있어야 한다.', () => {
    // 로그인 세션 재사용
    cy.session('loggedIn', () => {
      cy.visit('/login');
      cy.get('[data-cy=login-username]').should('be.visible').type('test1');
      cy.get('[data-cy=login-password]').should('be.visible').type('lee355400!');
      cy.get('[data-cy=loginBtn]').should('be.visible').click();
      cy.url().should('include', '/friends');
    });

    // 커뮤니티 페이지로 이동
    cy.visit('/community');
    cy.get('[data-cy=communityCreate]').should('be.visible').click();

    // 글 작성 페이지로 이동 확인
    cy.url().should('include', '/community/post/create');

    // 작성자 유형 선택
    cy.get('[data-cy=isForPerson]').should('be.visible').check();
    cy.get('[data-cy=isForPet]').should('be.visible').check();

    const filePath = 'sample-image.jpg'; // 이미지 파일 경로
    cy.get('[data-cy=imageFile]').attachFile(filePath);

    // 업로드된 이미지 미리보기 확인
    cy.get('img').should('be.visible');
    cy.get('[data-cy=title]').should('be.visible').as('title');
    cy.get('@title').type('테스트 제목');

    // 내용 입력
    cy.get('[data-cy=content]').should('be.visible').type('테스트 내용입니다.');

    // API 요청 가로채기
    cy.intercept('POST', '/api/community', (req) => {
      req.reply((res) => {
        // 응답 데이터 수정 (필요한 경우)
        res.send({ statusCode: 200, body: { success: true } });
      });
    }).as('createPost');

    // 완료 버튼 클릭
    cy.get('button[type="submit"]').should('be.visible').click();

    // 글 등록 후 커뮤니티 페이지로 리디렉션 확인
    cy.url().should('include', '/community');
  });
});
