import React, { useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { useRecoilValue } from 'recoil';
import { placeState } from '@/state/PlaceState';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addPlaceReview, getPlaceReview, editPlaceReview, deletePlaceReview } from '@/app/(layout)/places/actions';
import { formatDateWeek } from '@/lib/utils';
import LoadingSpinner from '../LoadingSpinner';

interface placeReview {
  id: number;
  rating: number;
  comment: string;
  placeId: number;
  placename: string;
  createdAt: Date;
  user: {
    id: number;
    username: string | null;
  };
}

const PetFriendlyPlace = () => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [editReviewId, setEditReviewId] = useState<number | null>(null); // 수정 중인 리뷰의 ID 저장
  const [isEditing, setIsEditing] = useState<boolean>(false); // 수정 상태를 추적하는 변수
  const place = useRecoilValue(placeState);
  const { data: userData } = useSession();
  const queryClient = useQueryClient();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery<placeReview[]>(['placeReviews', place.id], () => getPlaceReview(Number(place.id)), {
    enabled: !!place.id,
  });

  const { mutate: addReview, isLoading: isAddingReview } = useMutation(
    (newReview: { placeId: number; userId: number; placename: string; rating: number; comment: string }) =>
      addPlaceReview(newReview),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['placeReviews', place.id]);
        setRating(0);
        setComment('');
        setOnClick(false);
        alert('리뷰가 성공적으로 추가되었습니다.');
      },
      onError: () => {
        alert('리뷰 추가에 실패했습니다.');
      },
    },
  );

  const { mutate: editReview } = useMutation(
    (updatedReview: { id: number; comment: string }) => editPlaceReview(updatedReview.id, updatedReview.comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['placeReviews', place.id]);
        alert('리뷰가 성공적으로 수정되었습니다.');
        setEditReviewId(null);
        setIsEditing(false);
      },
      onError: () => {
        alert('리뷰 수정에 실패했습니다.');
      },
    },
  );

  const { mutate: deleteReview } = useMutation((reviewId: number) => deletePlaceReview(reviewId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['placeReviews', place.id]);
      alert('리뷰가 성공적으로 삭제되었습니다.');
    },
    onError: () => {
      alert('리뷰 삭제에 실패했습니다.');
    },
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleAddPlaceReview = () => {
    if (!userData?.user?.id) {
      alert('로그인 후 리뷰를 작성할 수 있습니다.');
      return;
    }

    addReview({
      placeId: Number(place.id),
      userId: Number(userData.user.id),
      placename: place.name,
      rating: rating,
      comment: comment,
    });
  };

  const handleEditClick = (review: placeReview) => {
    setEditReviewId(review.id);
    setComment(review.comment);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditReviewId(null);
  };

  const handleSaveEdit = () => {
    if (editReviewId !== null) {
      editReview({ id: editReviewId, comment });
    }
  };

  const handleDeleteReview = (reviewId: number) => {
    deleteReview(reviewId);
  };

  if (isLoading) {
    return (
      <div className="my-10">
        <LoadingSpinner />;
      </div>
    );
  }

  if (isError) {
    return <p>리뷰를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <>
      <div className="w-full max-w-[1000px] flex flex-col p-5">
        <hr className="border border-b border-neutral-300 my-4" />
        <div className="flex flex-col w-full bp-6 mt-4 ">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl xs:text-base sm:text-base font-semibold text-gray-800">
              &quot;{place.name}&quot;에 대한 리뷰
            </h2>
            <button
              className="px-3 xs:text-sm sm:text-sm bg-[rgba(78,140,133,0.7)] text-white py-3 rounded-md hover:bg-[rgba(94,148,142,0.7)] transition duration-200"
              onClick={() => setOnClick(!onClick)}>
              리뷰 작성하기
            </button>
          </div>

          <div className="mb-2">
            {onClick && (
              <div className="mt-5 flex flex-col gap-3 bg-lightPink p-3 rounded-xl">
                <div className="flex space-x-1 mt-2 flex-row gap-2 justify-start items-center">
                  <span className="text-base text-gray-700 font-semibold">평점 :</span>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-3xl transition-all duration-200 ease-in-out transform ${
                        index < rating ? 'text-yellow-400 scale-110' : 'text-gray-400'
                      } hover:text-yellow-500 hover:scale-110`}
                      onClick={() => handleRatingChange(index + 1)}>
                      {index < rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <Input
                  name="comment"
                  type="text"
                  placeholder="리뷰 내용을 입력해주세요!"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <Button type="button" description="저장" onClick={handleAddPlaceReview} disabled={isAddingReview} />
              </div>
            )}
          </div>

          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review: placeReview, index) => (
              <div key={index} className="space-y-6 my-2">
                <div className="flex flex-row xs:flex-col sm:flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">
                        {[...Array(5)].map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={`text-2xl ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            {starIndex < review.rating ? '★' : '☆'}
                          </span>
                        ))}
                      </span>{' '}
                      <span className="text-gray-600 font-medium">{review.user.username}</span>
                    </div>
                    <p className="text-gray-800 text-lg">
                      {editReviewId === review.id ? (
                        <input
                          name="comment"
                          type="text"
                          placeholder="수정된 댓글을 입력해주세요!"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
        focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out 
                          w-[500px]"
                        />
                      ) : (
                        review.comment
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between text-end">
                    <p> {formatDateWeek(review.createdAt)}</p>
                    {Number(userData?.user.id) === review.user.id && (
                      <div className="flex flex-row gap-3 text-sm text-neutral-400">
                        {isEditing && editReviewId === review.id ? (
                          <span className="cursor-pointer" onClick={handleCancelEdit}>
                            취소하기
                          </span>
                        ) : (
                          <span className="cursor-pointer" onClick={() => handleEditClick(review)}>
                            수정하기
                          </span>
                        )}
                        {isEditing && editReviewId === review.id && (
                          <span className="cursor-pointer" onClick={handleSaveEdit}>
                            저장하기
                          </span>
                        )}
                        {/* 수정 중일 때만 삭제 버튼 숨기기 */}
                        {!isEditing && editReviewId !== review.id && (
                          <span className="cursor-pointer" onClick={() => handleDeleteReview(review.id)}>
                            삭제하기
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {index !== reviews.length - 1 && <hr className="border border-b border-neutral-200" />}
              </div>
            ))
          ) : (
            <>
              {!onClick && (
                <p className="text-2xl text-darkPink my-5 text-center">
                  리뷰가 없습니다! <br />
                  리뷰를 작성해주세요!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PetFriendlyPlace;
