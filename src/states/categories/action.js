const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: { categories },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
};
