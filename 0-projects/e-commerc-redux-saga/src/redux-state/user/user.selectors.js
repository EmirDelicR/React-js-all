import { createSelector } from 'reselect';

const currentUser = state => state.user;

const selectCurrentUser = createSelector(
  [currentUser],
  user => user.currentUser
);

export { selectCurrentUser };
