import React, { useEffect, useState } from 'react';
import CommunityActions from '@/app/home/community/actions';
import Image from 'next/image';
import PostUpdatedAt from '../shared/GetRelativeTime';
import Link from 'next/link';

interface PostListProps {
  isFor: string; // '견주' 또는 '애완견'
  type?: string; // '강아지' 또는 '고양이'
}

const PostList = ({ isFor, type }: PostListProps) => {
  const [community, setCommunity] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 게시글 수

  useEffect(() => {
    const getCommunity = async () => {
      const communityData = await CommunityActions(isFor, type);

      // 최신 글 순으로 정렬 (updatedAt 기준 내림차순)
      const sortedData = communityData.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

      setCommunity(sortedData);
    };

    getCommunity();
  }, [isFor, type]);

  // 현재 페이지에 표시할 게시글 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = community.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(community.length / postsPerPage);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      {community.length === 0 ? (
        <p className="text-center text-lg text-orange-500">게시글이 없습니다.</p>
      ) : (
        <div>
          <ul className="space-y-6">
            {currentPosts.map((post, index) => (
              <Link href={`/home/community/${post.id}`} key={index} className="flex items-start gap-4 border-b pb-6">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    {post.category}
                    <span className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-md">
                      {post.pet?.type || '견주'}의 고민입니다!
                    </span>
                  </h4>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.content}</p>
                  <div className="flex items-center text-xs text-gray-500 gap-2 mt-2">
                    <span>{post.user.username}</span>
                    <span>답변: {post.replies || 0}</span>
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
