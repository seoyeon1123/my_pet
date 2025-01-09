import React, { useState } from 'react';
import CommunityActions from '@/app/(layout)/community/actions';
import Image from 'next/image';
import PostUpdatedAt from '../shared/GetRelativeTime';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Loading from '../Loading';

interface PostListProps {
  isFor: string; // '견주' 또는 '애완견'
  type?: string; // '강아지' 또는 '고양이'
}

interface IcommunityDataProps {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
  petId: number | null;
  petName: string | null;
  imageUrl: string | null;
  user: {
    username: string | null;
  };
  pet: {
    type: string;
  } | null;
}

const PostList = ({ isFor, type }: PostListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const {
    data: community = [],
    isLoading,
    isError,
  } = useQuery<IcommunityDataProps[]>(['community', isFor, type], () => CommunityActions(isFor, type), {
    select: (data) => data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = community.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(community.length / postsPerPage);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-center text-lg text-red-500">게시글을 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      {community.length === 0 ? (
        <p className="text-center text-lg text-orange-500">게시글이 없습니다.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {currentPosts.map((post, index) => (
              <Link href={`/community/${post.id}`} key={index} className="flex items-start gap-4 border-b pb-6">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-md">
                      {post.pet?.type || '견주'}의 고민입니다!
                    </span>
                  </h4>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.content}</p>
                  <div className="flex items-center text-xs text-gray-500 gap-2 mt-2">
                    <span>{post.user.username}</span>

                    <span>
                      <PostUpdatedAt updatedAt={post.updatedAt} />
                    </span>
                  </div>
                </div>

                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt="게시글 이미지"
                    width={100}
                    height={100}
                    className="aspect-square rounded-md shadow-sm"
                  />
                )}
              </Link>
            ))}
          </ul>

          <div className="text-center mt-6">
            <ul className="inline-flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
