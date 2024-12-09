'use client';

import React, { useState } from 'react';
import { ICommentProps } from './CommentList';
import CommentItem from './CommentItem';
import { createReplyComment } from './actions';

const ReplyCommentList = ({
  replies,
  onRefresh,
  postId,
  userId,
}: {
  replies: ICommentProps[];
  onRefresh: () => void;
  postId: number;
  userId: number;
}) => {
  if (!replies || replies.length === 0) return null;

  const [replyContent, setReplyContent] = useState<string>('');
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  const handleReplySubmit = async () => {
    if (replyContent.trim() === '') return;

    try {
      // 부모 댓글의 postId를 사용하여 대댓글 생성
      await createReplyComment(replyContent, userId, postId, replyToCommentId!);
      setReplyContent('');
      setReplyToCommentId(null);
    } catch (error) {
      console.error('대댓글 등록 실패:', error);
    }
  };

  return (
    <div className="p-3">
      {replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} onRefresh={onRefresh} />
      ))}
    </div>
  );
};

export default ReplyCommentList;
