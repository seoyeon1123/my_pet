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
  } catch {
    throw new Error('이메일 전송에 실패했습니다.');
  }
};

export const sendConfirmationEmail = async (toEmail: string, product: string, deadline: string) => {
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
      subject: '댕냥살롱 공동구매 신청 확인 이메일입니다.',
      html: `안녕하세요. 댕냥살롱입니다. <br/> ${product} 공동구매 신청을 완료하였습니다. 
      <br/>${deadline}에 공동구매 진행 결과를 알려드릴게요 :)
      <br/>댕냥살롱을 사랑해주셔서 감사합니다.`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: '이메일이 전송되었습니다.' };
  } catch (error) {
    console.log(error);
    throw new Error('이메일 전송에 실패했습니다.');
  }
};

export const sendFailGroupPurchase = async (toEmail: string, product: string) => {
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
      subject: '댕냥살롱 공동 구매 취소 메일입니다.',
      html: `안녕하세요. 댕냥살롱입니다. <br/> ${product} 공동구매 인원이 부족하여 취소되었습니다.
      <br/>다양한 공동구매가 기다리고 있습니다. 다음에는 꼭 참여해주세요.
      <br/>댕냥살롱을 사랑해주셔서 감사합니다.`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: '이메일이 전송되었습니다.' };
  } catch (error) {
    console.log(error);
    throw new Error('이메일 전송에 실패했습니다.');
  }
};
