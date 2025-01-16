import bcrypt from 'bcrypt';
import db from '@/lib/db';
import './commands';

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  // Prisma를 사용하여 데이터베이스에 유저 추가하는 task 정의
  on('task', {
    async createUser({ email, password, name }: CreateUserParams) {
      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 암호화된 비밀번호로 유저 생성
      return db.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // 암호화된 비밀번호 저장
        },
      });
    },
  });
};
