'use server';

import db from '@/lib/db';

interface ICommentProps {
  content: string;
  postId: number; // postId는 Int 타입이므로, number로 설정
  userId: number; // userId도 Int 타입
}

const createComment = async (data: ICommentProps) => {
  try {
    const comment = await db.comment.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        content: data.content,
      },
    });

    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('댓글 생성 중 오류가 발생했습니다.');
  }
};

export const getComments = async (postId: number) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      parentId: true,
      id: true,
      postId: true,
      content: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      post: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc', // 댓글 생성 시간 순으로 정렬
    },
  });
  return comments
    .filter((comment) => comment.parentId === null) // 부모 댓글만 필터링
    .map((comment) => ({
      ...comment,
      replies: comments.filter((reply) => reply.parentId === comment.id), // 대댓글 연결
    }));
};

export const EditComment = async (id: number, content: string) => {
  try {
    const updatedComment = await db.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return updatedComment;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw new Error('댓글 수정 중 오류가 발생했습니다.');
  }
};

export const DeleteComment = async (id: number) => {
  try {
    const deleteComments = await db.comment.deleteMany({
      where: {
        OR: [
          { id }, // 부모 댓글
          { parentId: id }, // 대댓글
        ],
      },
    });

    return deleteComments;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw new Error('댓글 삭제 중 오류가 발생했습니다.');
  }
};

export const createReplyComment = async (content: string, userId: number, postId: number, parentId: number) => {
  try {
    await db.comment.create({
      data: {
        content,
        userId,
        postId,
        parentId,
      },
    });
  } catch (error) {
    console.error('대댓글 생성 실패:', error);
    throw new Error('대댓글 생성 실패');
  }
};

export default createComment;
