import { configureStore } from '@reduxjs/toolkit';
import { ICartState } from './modules/cart/types';
import rootReducers from './modules/rootReducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

export interface IState {
	cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = configureStore({
	reducer: rootReducers,
	middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export default store;
