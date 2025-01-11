import React, { useState } from 'react';

import { ICommentProps } from './CommentList';
import PostUpdatedAt from '../shared/GetRelativeTime';
import { EditComment, DeleteComment } from './actions';
import { ArrowTurnDownRightIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useMutation } from 'react-query';
import Loading from '../Loading';

interface CommentItemProps {
  comment: ICommentProps;
  isReply?: boolean;
  onRefresh: () => void;
}

const CommentItem = ({ comment, isReply = false, onRefresh }: CommentItemProps) => {
  const { data } = useSession();
  const userId = Number(data!.user.id);
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mutation for editing a comment
  const editMutation = useMutation({
    mutationFn: async (newContent: string) => EditComment(comment.id, newContent),
    onSuccess: () => {
      setEditMode(false);
      onRefresh();
    },
    onError: (error) => {
      console.error('댓글 수정 실패:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => DeleteComment(comment.id),
    onSuccess: () => {
      onRefresh();
    },
    onError: (error) => {
      console.error('댓글 삭제 실패:', error);
    },
  });

  const handleEditSubmit = () => {
    editMutation.mutate(editContent);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  if (editMutation.isLoading || deleteMutation.isLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`flex flex-col ${isReply ? 'p-4 pr-0 pb-2 bg-gray-50 bg-opacity-50 rounded-lg ml-8 mb-2' : 'p-4 pr-0 pb-2 '}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-row gap-2">
          {isReply && <ArrowTurnDownRightIcon className="size-5 text-gray-500" />}
          <p
            className={`${
              comment.user.username === comment.post.user.username ? 'text-orange-400' : 'text-black'
            } font-medium text-sm`}>
            {comment.user.username === comment.post.user.username ? '글쓴이' : comment.user.username}
          </p>
        </div>
        {comment.userId === userId && (
          <div className="relative">
            <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer" onClick={() => setDropdownOpen((prev) => !prev)} />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-lg text-sm z-10">
                <p
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setEditMode(true);
                    setDropdownOpen(false);
                  }}>
                  수정
                </p>
                <p className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleDelete}>
                  삭제
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {editMode ? (
        <div className="relative p-2">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="absolute bottom-5 right-3 flex space-x-1">
            <button className="bg-darkPink text-white px-4 py-2 rounded-lg text-sm" onClick={handleEditSubmit}>
              저장
            </button>
            <button className="bg-neutral-200 px-4 py-2 rounded-lg text-sm" onClick={() => setEditMode(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className={`flex flex-row gap-2 text-sm text-neutral-600 ${isReply ? 'ml-8' : ''}`}>{comment.content}</p>
      )}
      <div className={`flex flex-row gap-2 text-xs  text-neutral-400 mt-2 ${isReply ? 'ml-8' : ''}`}>
        <PostUpdatedAt updatedAt={comment.createdAt} />
      </div>
    </div>
  );
};

export default CommentItem;
