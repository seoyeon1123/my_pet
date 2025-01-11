import React, { useState } from 'react';
import createComment from './actions';
import CommentList from './CommentList';
import { useSession } from 'next-auth/react';

const CommentInput = ({ postId }: { postId: number }) => {
  const [content, setContent] = useState('');
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const { data } = useSession();
  const userId = Number(data!.user.id);

  const handleSubmit = async () => {
    if (!content) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    await createComment({
      userId,
      postId,
      content,
    });
    setContent('');
    setShouldRefresh(true);

    setTimeout(() => {
      setShouldRefresh(false);
    }, 500);
  };

  return (
    <div className="mx-auto w-full ">
      <h2 className="text-lg font-semibold mb-4">답변</h2>
      <div className="relative ">
        <textarea
          placeholder="답변을 입력해주세요"
          value={content}
          onChange={handleChange}
          className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"></textarea>
        <button
          onClick={handleSubmit}
          className="absolute bottom-8 right-3 bg-darkPink text-white text-sm px-4 py-2 rounded-md">
          등록
        </button>
      </div>
      <CommentList postId={postId} shouldRefresh={shouldRefresh} userId={userId} />
    </div>
  );
};

export default CommentInput;
