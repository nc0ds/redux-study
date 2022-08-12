import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { ICartItem } from '../../store/modules/cart/types';

export const Cart: React.FC = () => {
	const cart = useSelector<IState, ICartItem[]>((state) => state.cart.items);

	return (
		<table>
			<thead>
				<tr>
					<th>Produto</th>
					<th>Quantidade</th>
					<th>Preço</th>
					<th>Subtotal</th>
				</tr>
			</thead>
			<tbody>
				{cart.map((item) => (
					<tr key={item.product.id}>
						<td>{item.product.title}</td>
						<td>{item.quantity}</td>
						<td>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(item.product.price)}
						</td>
						<td>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							}).format(item.product.price * item.quantity)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
