import React from 'react';
import PropTypes from 'prop-types';
import useInputHTML from '../hooks/useInputHTML';

function CommentInput({ addComment }) {
  const [content, handleContentChange] = useInputHTML('');

  const handleAddComment = () => addComment(content);

  return (
    <div>
      <div
        id="content"
        name="content"
        onInput={handleContentChange}
        contentEditable
        className="p-2 my-4 w-full border rounded-md h-16"
      />

      <button
        type="button"
        onClick={handleAddComment}
        className="bg-blue-600 text-white rounded p-1 mb-8 w-full hover:bg-blue-700"
      >
        Komen
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
