import * as types from '../constants/actions';

export const updatePageNumber = page => ({
  type: types.UPDATE_PAGE_NUMBER,
  page,
});

export const updateItemsPerPage = itemsPerPage => ({
  type: types.UPDATE_ITEMS_PER_PAGE,
  itemsPerPage,
});
