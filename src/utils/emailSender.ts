import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (toEmail: string, code: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"댕냥살롱" <${process.env.GMAIL_EMAIL}>`,
      to: toEmail,
      subject: '댕냥살롱 인증번호',
      html: `안녕하세요. 댕냥살롱입니다. 인증번호는 <b>${code}</b>입니다.`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: '인증번호가 전송되었습니다.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('이메일 전송에 실패했습니다.');
  }
};
