import { ICommentProps } from './CommentList';
import ReplyCommentList from './ReplyCommentList';

const ReplyComment = ({
  content,
  setContent,
  onSubmit,
}: {
  comment: ICommentProps;
  content: string;
  setContent: (content: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <>
      <div className="relative mx-4">
        <textarea
          placeholder="답변을 입력해주세요"
          className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="absolute bottom-4 right-3 bg-darkPink text-white text-sm px-4 py-2 rounded-md"
          onClick={onSubmit}>
          등록
        </button>
      </div>
    </>
  );
};

export default ReplyComment;
