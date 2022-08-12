import { Reducer } from 'redux';
import { ActionTypes, ICartState } from './types';

import produce from 'immer';

const INITIAL_STATE: ICartState = {
	items: [],
	outOfStockItems: [],
};

export const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case ActionTypes.addProductToCartSuccess: {
				const { product } = action.payload;

				const productInCartIndex = state.items.findIndex(
					(item) => item.product.id === product.id
				);

				if (productInCartIndex >= 0) {
					draft.items[productInCartIndex].quantity++;
				} else {
					draft.items.push({
						product,
						quantity: 1,
					});
				}

				break;
			}

			case ActionTypes.addProductToCartFailure: {
				const { productId } = action.payload;

				const productAlreadyOutOfStock = state.outOfStockItems.find(
					(item) => item === productId
				);

				if (productAlreadyOutOfStock === undefined) {
					draft.outOfStockItems.push(productId);
				}

				break;
			}

			default:
				return draft;
		}
	});
};
