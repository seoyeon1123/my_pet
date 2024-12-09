import React, { useState } from 'react';
import createComment from './actions';
import CommentList from './CommentList';

const CommentInput = ({ userId, postId }: { userId: number; postId: number }) => {
  const [content, setContent] = useState('');
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const newComment = await createComment({
        userId,
        postId,
        content,
      });
      console.log('댓글이 생성되었습니다:', newComment);
      setContent('');
      setShouldRefresh(true);

      setTimeout(() => {
        setShouldRefresh(false);
      }, 500);
    } catch (error) {
      console.error('댓글 생성 오류:', error);
      alert('댓글을 생성하는 데 오류가 발생했습니다.');
    }
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
