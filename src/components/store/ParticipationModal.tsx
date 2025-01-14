import { useSession } from 'next-auth/react';
import Input from '../shared/Input';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { CreateGroupPurchaseParticipant } from '@/app/(layout)/store/group_purchase/[productId]/[listId]/actions';
import { sendEmail } from '@/services/emailService';

interface IModalProps {
  closeModal: () => void;
  groupPurchaseId: number;
  userId: string | undefined;
  productName: string;
  deadline: string;
}

const ParticipationModal = ({ closeModal, groupPurchaseId, userId, productName, deadline }: IModalProps) => {
  const { data } = useSession();
  const [email, setEmail] = useState('');

  const mutation = useMutation(
    (email: string) => CreateGroupPurchaseParticipant(email, groupPurchaseId, Number(userId)),
    {
      onSuccess: async () => {
        alert('신청이 완료되었습니다!');
        try {
          await sendEmail(email, productName, deadline);
        } catch (error) {
          console.log(error);
          alert('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        }
        closeModal();
      },
      onError: () => {
        alert('신청 실패. 다시 시도해주세요.');
      },
    },
  );

  const handleSubmit = () => {
    if (!email) {
      alert('이메일을 입력해주세요!');
      return;
    }
    mutation.mutate(email);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-5xl">
          <h2 className="text-xl font-bold mb-4 text-center">공동구매를 신청합니다!</h2>
          <p className="text-gray-700 mb-6">
            <span className="block mb-2 font-semibold">⭐️ 유의사항을 꼭 확인해주세요 ⭐️</span>
            <span className="block mb-2">1. 공동구매에 참여 완료 후, 취소가 불가능합니다.</span>
            <span className="block mb-2">2. 공동구매 인원이 충분하지 않으면, 취소될 수 있습니다.</span>
            <span className="block mb-2">3. 공동구매 인원 달성이 완료되면, 채팅방이 열립니다. 확인해주세요 🙂</span>

            <span className="block mb-2">
              4. 공동구매 실패 시, <strong className="font-bold text-red-600">이메일</strong>로 알림이 발송됩니다.
              메일을 꼭 확인해주세요 :)
            </span>
            <span className="block mb-2">5. 이메일을 정확하게 입력해주세요 :)</span>
          </p>
          <h1 className="text-xl font-bold  text-center mb-2">신청자 정보</h1>
          <div className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold">
                이름
              </label>
              <p className="text-gray-700">{data?.user.name}</p>
            </div>
            <div className="mb-2">
              <label htmlFor="contact" className="block font-semibold mb-2">
                이메일
              </label>
              <Input
                name="email"
                type="text"
                placeholder="연락처를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 처리
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              닫기
            </button>
            <button
              onClick={handleSubmit}
              className={`${
                mutation.isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-darkPink hover:bg-mediumPink'
              } text-white px-6 py-2 rounded-lg`}
              disabled={mutation.isLoading}>
              {mutation.isLoading ? '신청 중...' : '신청하기'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipationModal;
