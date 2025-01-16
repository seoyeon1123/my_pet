import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Node 이벤트 리스너 설정
    },
    baseUrl: 'http://localhost:3000', // baseUrl 설정
  },
});
