// CommentList.tsx
import { useEffect, useState } from 'react';
import { getComments, createReplyComment } from './actions';

import ReplyComment from './ReplyComment';
import ReplyCommentList from './ReplyCommentList';

export interface ICommentProps {
  id: number;
  content: string;
  createdAt: Date;
  userId: number;
  parentId: number | null;
  user: {
    username: string | null;
    id: number;
  };
  post: {
    user: {
      username: string | null;
    };
  };
  replies?: ICommentProps[];
}

import CommentItem from './CommentItem';

const CommentList = ({ postId, userId, shouldRefresh }: { postId: number; userId: number; shouldRefresh: boolean }) => {
  const [comments, setComments] = useState<ICommentProps[]>([]);
  const [replyContent, setReplyContent] = useState<string>('');
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  const fetchComments = async () => {
    const commentData = await getComments(postId);
    setComments(commentData);
  };

  const toggleEditMode = (id: number) => {
    setReplyToCommentId((prev) => (prev === id ? null : id));
  };

  const handleReplySubmit = async () => {
    if (replyContent.trim() === '') return;

    try {
      await createReplyComment(replyContent, userId, postId, replyToCommentId!);
      setReplyContent('');
      setReplyToCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('대댓글 등록 실패:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, shouldRefresh]);

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} onRefresh={fetchComments} />
          <div className="flex flex-col px-4 text-xs text-gray-400">
            <button
              className="bg-neutral-200 text-xs rounded-sm px-1 py-1 w-10"
              onClick={() => toggleEditMode(comment.id)}>
              댓글
            </button>
          </div>

          {replyToCommentId === comment.id && (
            <div className="mt-4">
              <ReplyComment
                comment={comment}
                content={replyContent}
                setContent={setReplyContent}
                onSubmit={handleReplySubmit}
              />
            </div>
          )}
          <ReplyCommentList replies={comment.replies || []} onRefresh={fetchComments} postId={postId} userId={userId} />
          <hr className="border border-b border-neutral-100 mt-4" />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
