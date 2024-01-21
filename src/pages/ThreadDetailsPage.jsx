import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { asyncPopulateThreadDetailsAndComments } from '../states/shared/action';
import { asyncAddCommment } from '../states/comments/action';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import postedAt from '../utils';

function ThreadDetailsPage() {
  const { id } = useParams();

  const thread = useSelector((state) => state.threadDetails);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadDetailsAndComments(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddCommment({ threadId: id, content }));
  };

  if (!thread) {
    return null;
  }

  const { title, createdAt, body } = thread;
  const { avatar, name } = thread.owner;

  const parsedBody = parse(body);
  const formattedDate = postedAt(createdAt);
  const commentsCount = comments.length;

  return (
    <div className="h-full bg-white pt-4 pb-8 px-8 mb-16">

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-3">
          <p className="text-sm text-blue-950 font-medium">{name}</p>
          <p className="text-xs text-gray-400 ">{formattedDate}</p>
        </div>
      </div>

      <h1 className="text-blue-950 text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-6">{parsedBody}</p>
      <h2 className="text-blue-950 text-xl font-bold">{`${commentsCount} Komentar`}</h2>

      <CommentInput addComment={onAddComment} />
      <CommentsList comments={comments} />
    </div>
  );
}

export default ThreadDetailsPage;
