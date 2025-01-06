import { ArchiveBoxIcon, MapIcon, MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface IChatPlusModalProps {
  chatRoomId: number;
  productId: bigint | undefined;
  isHost: boolean;
  userId: number;
  participants: {
    userId: number;
    chatRoomId: number;
    productId: bigint | undefined;
    isHost: boolean;
    username: string | null;
  }[];
}

const ChatPlusModal = ({ chatRoomId, productId, isHost, userId, participants }: IChatPlusModalProps) => {
  const [clicked, setClicked] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingLocation, setMeetingLocation] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const modifiedParticipants = participants.map((participant) => ({
    id: participant.userId, // userId를 id로 변환
    name: ` ${participant.username}`,
  }));

  // 송장 등록 핸들러
  const handleInvoiceSubmit = async () => {
    if (!selectedUser) {
      alert('송장을 등록할 사용자를 선택해주세요.');
      return;
    }
    if (!selectedCourier || !trackingNumber) {
      alert('택배사와 송장 번호를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('택배사:', selectedCourier);
      console.log('송장 번호:', trackingNumber);
      console.log('선택된 사용자 ID:', selectedUser);
      // 송장 등록 로직
      alert('송장이 등록되었습니다!');
    } catch (error) {
      console.error('송장 등록 실패:', error);
      alert('송장 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 약속 설정 핸들러
  const handleMeetingSubmit = async () => {
    if (!meetingLocation || !meetingTime) {
      alert('장소와 시간을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 약속 설정 로직
      alert(`약속이 등록되었습니다!\n장소: ${meetingLocation}\n시간: ${meetingTime}`);
    } catch (error) {
      console.error('약속 등록 실패:', error);
      alert('약속 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHost) return null;

  return (
    <div className="relative">
      <PlusIcon className="size-8 text-darkPink" onClick={() => setClicked((prev) => !prev)} />

      {clicked && (
        <div className="absolute -top-[75px]  bg-white flex flex-row gap-4">
          <MapPinIcon className="size-10 bg-orange-600 rounded-full p-2" onClick={() => setIsMeetingModalOpen(true)} />
          <ArchiveBoxIcon
            className="size-10 bg-green-600 rounded-full p-2"
            onClick={() => setIsInvoiceModalOpen(true)}
          />
        </div>
      )}

      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">송장 등록</h2>

            <div className="mt-4">
              <label>송장 등록할 사용자 선택</label>
              <select
                value={selectedUser ?? ''}
                onChange={(e) => setSelectedUser(Number(e.target.value))}
                className="w-full p-2 border rounded mt-2">
                <option value="">사용자 선택</option>
                {modifiedParticipants
                  .filter((participant) => participant.id !== userId) // 호스트 제외
                  .map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-4">
              <label>택배사 선택</label>
              <select
                value={selectedCourier}
                onChange={(e) => setSelectedCourier(e.target.value)}
                className="w-full p-2 border rounded mt-2">
                <option value="">택배사 선택</option>
                <option value="CJ대한통운">CJ대한통운</option>
                <option value="롯데택배">롯데택배</option>
                <option value="우체국">우체국</option>
              </select>
            </div>

            <div className="mt-4">
              <label>송장 번호</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="송장 번호 입력"
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setIsInvoiceModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                닫기
              </button>
              <button
                onClick={handleInvoiceSubmit}
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-2 px-4 rounded">
                {isSubmitting ? '등록 중...' : '송장 등록'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 약속 설정 모달 */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">약속 설정</h2>

            <div className="mt-4">
              <label>만날 장소</label>
              <input
                type="text"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                placeholder="장소 입력"
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-4">
              <label>만날 시간</label>
              <input
                type="datetime-local"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setIsMeetingModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                닫기
              </button>
              <button onClick={handleMeetingSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
                약속 설정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPlusModal;
