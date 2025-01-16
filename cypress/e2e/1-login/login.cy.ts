describe('로그인 테스트', () => {
  it('사용자는 로그인할 수 있어야 한다.', () => {
    cy.visit('/login');

    // 아이디와 비밀번호 입력
    cy.get('[data-cy=login-username]').should('be.visible').type('test1');
    cy.get('[data-cy=login-password]').should('be.visible').type('lee355400!');

    // 로그인 버튼 클릭
    cy.get('[data-cy=loginBtn]').should('be.visible').click();

    // 로그인 후 URL 확인
    cy.url().should('include', '/friends');
  });
});
