import { useEffect, useState } from 'react';
import PostUpdatedAt from '../shared/GetRelativeTime';
import { getComments } from './actions';

interface ICommentProps {
  content: string;
  createdAt: Date;
  userId: number;
  user: {
    username: string | null;
  };
  post: {
    user: {
      username: string | null;
    };
  };
}

const CommentList = ({ postId, shouldRefresh }: { postId: number; shouldRefresh: boolean }) => {
  const [comments, setComments] = useState<ICommentProps[]>([]);

  const fetchComments = async () => {
    try {
      const commentData = await getComments(postId);
      setComments(commentData);
    } catch (error) {
      console.error('댓글 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, shouldRefresh]); // shouldRefresh가 변경될 때마다 새로고침

  return (
    <div className="space-y-2">
      {comments.map((comment, index) => (
        <>
          <div key={index} className="flex flex-col p-4 ">
            <div className="flex justify-between items-center mb-2">
              <p
                className={`${comment.user.username === comment.post.user.username ? 'text-orange-400' : 'text-black'} font-medium text-sm text-gray-800`}>
                {comment.user.username === comment.post.user.username ? '글쓴이' : comment.user.username}
              </p>
              <p className="text-xs text-gray-400">
                <PostUpdatedAt updatedAt={comment.createdAt} />
              </p>
            </div>
            <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
            <div className="flex space-x-3 text-sm text-gray-600">
              <button className="bg-neutral-200 text-xs rounded-2xl px-2 py-1">댓글</button>
            </div>
          </div>
          <hr className="border-spacing-0.5 border-neutral-200 mt-5 last:hidden" />
        </>
      ))}
    </div>
  );
};

export default CommentList;
