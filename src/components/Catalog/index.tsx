import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../services/api';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { IProduct } from '../../store/modules/cart/types';

export const Catalog: React.FC = () => {
	const [catalog, setCatalog] = useState<IProduct[]>([]);
	const dispatch = useDispatch();
	const outOfStockItems = useSelector<IState, number[]>(
		(state) => state.cart.outOfStockItems
	);

	const handleAddProductToCart = useCallback(
		(product: IProduct) => {
			dispatch(addProductToCartRequest(product));
		},
		[dispatch]
	);

	useEffect(() => {
		api.get('/products').then((response) => setCatalog(response.data));
	}, []);

	return (
		<main>
			<h1>Catalog</h1>
			{catalog.map((item) => (
				<article key={item.id}>
					<strong>{item.title}</strong>
					{' - '}
					<span>
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						}).format(item.price)}
					</span>{' '}
					<button type='button' onClick={() => handleAddProductToCart(item)}>
						Adicionar no carrinho
					</button>
					{outOfStockItems.includes(item.id) && (
						<span style={{ color: 'red' }}>Fora de estoque</span>
					)}
				</article>
			))}
		</main>
	);
};
