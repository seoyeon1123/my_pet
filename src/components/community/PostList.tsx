import React, { useEffect, useState } from 'react';
import CommunityActions from '@/app/home/community/actions';

interface PostListProps {
  isFor: string; // '견주' 또는 '애완견'
  type?: string; // '강아지' 또는 '고양이'
}

const PostList = ({ isFor, type }: PostListProps) => {
  const [community, setCommunity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 13;

  useEffect(() => {
    const getCommunity = async () => {
      const communityData = await CommunityActions(isFor, type);
      setCommunity(communityData);
    };

    getCommunity();
  }, [isFor, type]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = community.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(community.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-[1000px]">
      {community.length === 0 ? (
        <p className="text-center text-lg text-orange-500">게시글이 없습니다.</p>
      ) : (
        <>
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b bg-orange-100">
                <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 w-1/6">제목</th>
                <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 w-1/2">내용</th>
                <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 w-1/6">작성자</th>
                {isFor === '애완견' && (
                  <th className="px-4 py-2 text-left text-base font-semibold text-gray-700 w-1/6">종류</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={index} className="border-b hover:bg-orange-50">
                  <td className="px-4 py-2 text-sm truncate w-1/6">{post.title}</td>
                  <td className="px-4 py-2 text-sm truncate w-1/2">{post.content}</td>
                  <td className="px-4 py-2 text-sm w-1/6">{post.user.username}</td>
                  {post.pet?.type && <td className="px-4 py-2 text-sm w-1/6">{post.pet?.type}</td>}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageIndex + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-orange-500 border-orange-500'
                }`}>
                {pageIndex + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
