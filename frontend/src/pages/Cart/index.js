import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';

import { formatPrice } from '../../util/format';
import { removeFromCart, clearCart } from '../../store/modules/cart/actions';
import { store } from '../../store';

import api, { picpay } from '../../services/api';

import noMedia from '../../assets/images/no_photography-black-48dp.svg';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const total = useSelector(state =>
    state.cart.reduce(
      (sumTotal, voucher) => sumTotal + voucher.price * voucher.amount,
      0
    )
  );
  const totalDiscount = useSelector(state =>
    state.cart.reduce(
      (sumTotal, voucher) =>
        sumTotal + voucher.price * (1 + voucher.bonus / 100) * voucher.amount,
      0
    )
  );
  const cart = useSelector(state =>
    state.cart.map(voucher => ({
      ...voucher,
    }))
  );

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      // Create Order
      const order = await api.post('/orders', {
        value: total,
        user_id: store.getState().auth.user_id,
      });
      console.log(order);
      // Create Vouchers
      cart.map(async voucher => {
        try {
          {
            const response = await api.post('/vouchers', {
              value: voucher.price,
              bonus: voucher.bonus,
              month: voucher.date,
              order_id: order.data.id,
              user_id: store.getState().auth.user_id,
              company_id: voucher.company_id,
            });
            console.log(response);
          }
        } catch (e) {
          console.log(e.message);
        }
      });
      // Send order to Picpay
      try {
        const response = await picpay.post('/payments', {
          referenceId: order.data.reference,
          callbackUrl: 'http://api.mercado-futuro.com/callback',
          //returnUrl: `http://www.mercado-futuro.com/cliente/pedido/${order.data.reference}`,
          returnUrl: `http://www.mercado-futuro.com/vouchers`,
          value: order.data.value,
          expiresAt: '2022-05-01T16:00:00-03:00', // TODO
          buyer: {
            firstName: order.data.client.first_name,
            lastName: order.data.client.last_name,
            document: order.data.user.document,
            email: order.data.user.email,
            phone: order.data.client.phone,
          },
        });
        console.log(response);
        if (response.data.paymentUrl) {
          // Update Order with PaymentUrl
          const orderUpdate = await api.put(`/orders/${order.data.id}`, {
            payment_url: response.data.paymentUrl,
          });
          console.log(orderUpdate);
          toast.success('Você será redirecionado para a página de pagamento.', {
            toastId: 'redirect-picpay',
            autoClose: 2000,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            onClose: () => window.location.replace(response.data.paymentUrl),
          });
        }
      } catch (e) {
        console.log(e.message);
        toast.error(
          'Algo deu errado, tente novamente mais tarde, e se o problema persistir entre em contato.'
        );
      }
    } catch (e) {
      console.log(e.error);
    } finally {
      dispatch(clearCart());
    }
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Voucher</th>
            <th>Meu Bônus</th>
            <th>Mês</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {cart.map(voucher => (
            <tr>
              <td>
                {voucher?.user?.avatar?.url ? (
                  <img src={voucher?.user?.avatar?.url} alt={voucher.title} />
                ) : (
                  <img src={noMedia} alt={'Sem foto'} width={100} />
                )}
                <strong>{voucher.name}</strong>
              </td>

              <td>
                <span>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#999',
                      fontSize: '14px',
                    }}
                  >
                    {formatPrice(voucher.price)}
                  </span>
                  {formatPrice(voucher.price * (1 + voucher.bonus / 100))}
                </span>
              </td>

              <td>
                <span>
                  <span
                    style={{
                      color: '#999',
                      fontSize: '14px',
                    }}
                  >
                    {voucher.bonus}%
                  </span>
                  {formatPrice(
                    voucher.price * (1 + voucher.bonus / 100) - voucher.price
                  )}
                </span>
              </td>
              <td>
                <span>{voucher.date}</span>
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(voucher.id))}
                >
                  <MdDelete size={20} color="#1d4fc3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={() => handleClick()}>
          Finalizar pedido
        </button>

        <Total>
          <span>Total: </span>
          <strong style={{ fontSize: '18px' }}>Pague, </strong>
          <strong
            style={{
              textDecoration: 'line-through',
              color: '#999',
              fontSize: '18px',
            }}
          >
            {formatPrice(total)}
          </strong>
          <strong style={{ fontSize: '18px' }}>por um voucher de </strong>
          <strong>{formatPrice(totalDiscount)}</strong>
        </Total>
      </footer>
    </Container>
  );
}
