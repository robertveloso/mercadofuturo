import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdDelete } from 'react-icons/md';

import { toast } from 'react-toastify';

import { formatPrice, sleep } from '../../util/format';
import { removeFromCart, clearCart } from '../../store/modules/cart/actions';

import api, { picpay } from '../../services/api';

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
        sumTotal +
        (voucher.price + (voucher.price - voucher.discount)) * voucher.amount,
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
        client_id: 1,
      });
      console.log(order);
      // Create Vouchers
      cart.map(async voucher => {
        try {
          {
            const response = await api.post('/vouchers', {
              value: voucher.price,
              bonus: parseFloat(voucher.price - voucher.discount).toPrecision(
                12
              ),
              month: `${voucher.month}/2020`,
              order_id: order.data.id,
              client_id: 1,
              company_id: 1,
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
          expiresAt: '2022-05-01T16:00:00-03:00',
          buyer: {
            firstName: order.data.client.first_name,
            lastName: order.data.client.last_name,
            document: order.data.client.document,
            email: order.data.client.email,
            phone: order.data.client.phone,
          },
        });
        console.log(response);
        if (response.data.paymentUrl) {
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
                <img src={voucher?.user?.avatar?.url} alt={voucher.title} />
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
                  {formatPrice(
                    voucher.price + (voucher.price - voucher.discount)
                  )}
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
                    {voucher.month}%
                  </span>
                  {formatPrice(voucher.price - voucher.discount)}
                </span>
              </td>
              <td>
                <span>{voucher.month}/2020</span>
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
