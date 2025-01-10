'use client';

import { useEffect, useState } from 'react';
import getPostDetail, { deletePost } from './actions';
import Image from 'next/image';
import CommentInput from '@/components/comment/CommentInput';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

interface IPostDetail {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  petName: string | null;
  isFor: string;
  imageUrl: string | null;
  pet: {
    type: string;
  } | null;
  user: {
    username: string | null;
    id: number;
  };
}

const PostDetail = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const [post, setPost] = useState<IPostDetail | null>(null);
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    const getDetail = async () => {
      const postDetail = await getPostDetail(id);
      setPost(postDetail);
    };

    getDetail();
  }, [id]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    await deletePost(id);
    alert('게시물을 삭제하였습니다. ');
    router.push('/home/community');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col gap-2">
        <div className="flex-1 min-h-[500px]">
          <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-md">
            {post.pet?.type || '견주'}의 고민입니다!
          </span>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">{post.title}</h3>

          <hr className="border-spacing-0.5 border-neutral-300 my-5" />
          <div>
            {/* 이미지와 내용 부분 */}
            {post.imageUrl && (
              <div className="flex justify-center">
                <Image
                  src={post.imageUrl}
                  alt="게시글 이미지"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-md aspect-square object-cover"
                />
              </div>
            )}

            <p className="mt-4 text-gray-700 text-base leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* username과 createdAt을 아래에 배치 */}
        <div className="flex justify-between items-center text-xs text-gray-500 gap-6 mt-6">
          <div className="flex flex-row gap-2">
            <span>{post.user.username}</span>
            <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {Number(data?.user.id) === post.user.id && <button onClick={() => handleDelete(post.id)}>삭제하기</button>}
        </div>

        <hr className="border-spacing-0.5 border-neutral-300 my-5" />
        <CommentInput userId={post.user.id} postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetail;
