import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import ThreadItem from '../components/ThreadItem';

export default {
  title: 'ThreadItem',
  component: ThreadItem,
};

function Template(args) {
  return (
    <Router>
      <ThreadItem {...args} />
    </Router>
  );
}

export const Default = Template.bind({});
Default.args = {
  id: 'thread-1',
  title: 'Example Thread',
  category: 'General',
  createdAt: '2024-01-01T12:00:00Z',
  totalComments: 5,
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
  name: 'Jhon Doe',
  avatar: 'https://ui-avatars.com/api/?name=John Doe&background=random',
  upVote: action('Upvote clicked'),
  downVote: action('Downvote clicked'),
  userId: 'user-1',
};

export const WithoutUser = Template.bind({});
WithoutUser.args = {
  ...Default.args,
  userId: null,
};
