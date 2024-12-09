'use client';

import React from 'react';
import { ICommentProps } from './CommentList';
import CommentItem from './CommentItem';

const ReplyCommentList = ({
  replies,
  onRefresh,
}: {
  replies: ICommentProps[];
  onRefresh: () => void;
  postId: number;
  userId: number;
}) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="p-3">
      {replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} isReply={true} onRefresh={onRefresh} />
      ))}
    </div>
  );
};

export default ReplyCommentList;
