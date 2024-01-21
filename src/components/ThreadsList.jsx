import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          avatar={thread.user.avatar}
          name={thread.user.name}
          date={thread.createdAt}
          category={thread.category}
          title={thread.title}
          id={thread.id}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};

export default ThreadList;
