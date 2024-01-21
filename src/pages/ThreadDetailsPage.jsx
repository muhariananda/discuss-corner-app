import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { asyncPopulateThreadDetailsAndComments } from '../states/shared/action';
import { asyncAddCommment, asyncDownVoteComment, asyncUpVoteComment } from '../states/comments/action';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import { postedAt } from '../utils/index';
import { asyncDownVoteThreadDetails, asyncUpVoteThreadDetails } from '../states/threadDetails/action';
import ThreadDetailsActions from '../components/ThreadDetailsActions';

function ThreadDetailsPage() {
  const { id } = useParams();

  const thread = useSelector((state) => state.threadDetails);
  const comments = useSelector((state) => state.comments);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadDetailsAndComments(id));
  }, [id, dispatch]);

  const onAddCommentHandler = (content) => {
    dispatch(asyncAddCommment({ threadId: id, content }));
  };

  const onUpVoteThreadHandler = () => {
    dispatch(asyncUpVoteThreadDetails(id));
  };

  const onDownVoteThreadHandler = () => {
    dispatch(asyncDownVoteThreadDetails(id));
  };

  const onUpVoteCommentHandler = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteCommentHandler = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  if (!thread) {
    return null;
  }

  const {
    title, category, createdAt, body, upVotesBy, downVotesBy,
  } = thread;
  const { avatar, name } = thread.owner;

  const userId = authUser?.id || null;

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

      <h1 className="text-blue-950 text-2xl font-semibold mb-4">{title}</h1>
      <p className="text-gray-500 text-sm mb-6">{parsedBody}</p>
      <p className="text-blue-600 font-semibold mb-6">{`#${category}`}</p>

      <div className="mb-6">
        <ThreadDetailsActions
          userId={userId}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          upVote={onUpVoteThreadHandler}
          downVote={onDownVoteThreadHandler}
        />
      </div>

      <h2 className="text-blue-950 text-xl font-bold">{`${commentsCount} Komentar`}</h2>
      <CommentInput
        addComment={onAddCommentHandler}
        userId={userId}
      />
      <CommentsList
        comments={comments}
        userId={userId}
        upVote={onUpVoteCommentHandler}
        downVote={onDownVoteCommentHandler}
      />
    </div>
  );
}

export default ThreadDetailsPage;
