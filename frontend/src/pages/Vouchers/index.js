import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdVisibility, MdCancel, MdPrint } from 'react-icons/md';

import { toast } from 'react-toastify';

import { Modal } from 'react-bootstrap';

import { formatPrice } from '../../util/format';

import api from '../../services/api';

import { Container, ProductTable, VoucherModal } from './styles';

export default function Cart() {
  const [vouchers, setVouchers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('/vouchers');
        setVouchers(response.data);
        console.log(response);
      } catch (e) {
        console.log(e.message);
      }
    }

    getData();
  }, []);

  return (
    <>
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>Empresa</th>
              <th>Valor</th>
              <th>Bônus</th>
              <th>Mês</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {vouchers.map(voucher => (
              <tr>
                <td />
                <td>
                  {/* <img
                  src={voucher?.company?.user?.avatar?.url}
                  alt={voucher?.company?.name}
                /> */}
                  <Link to={`/empresas/${voucher?.company?.user?.handle}`}>
                    <strong>{voucher?.company?.name}</strong>
                  </Link>
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
                      {formatPrice(voucher?.value)}
                    </span>
                    {formatPrice(
                      //voucher.price + (voucher.price - voucher.discount)
                      voucher?.value * (1 + voucher?.bonus / 100)
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
                      {voucher?.bonus}%
                    </span>
                    {formatPrice(
                      voucher?.value * (1 + voucher?.bonus / 100) -
                        voucher?.value
                    )}
                  </span>
                </td>
                <td>
                  <span>{voucher?.month}</span>
                </td>

                <td>
                  <span>{voucher?.status}</span>
                </td>

                <td>
                  <button type="button" onClick={() => console.log()}>
                    <MdCancel size={20} color="#1d4fc3" />
                  </button>
                  {voucher?.status === 'PAGO' && (
                    <>
                      <button type="button" onClick={() => handleShow()}>
                        <MdVisibility size={20} color="#1d4fc3" />
                      </button>
                      <button type="button" onClick={() => console.log()}>
                        <MdPrint size={20} color="#1d4fc3" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        {/* <footer>
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
            {total}
          </strong>
          <strong style={{ fontSize: '18px' }}>por um voucher de </strong>
          <strong>{totalDiscount}</strong>
        </Total>
      </footer> */}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <VoucherModal>
          Seu código para retirada no estabelecimento é: {672341}
        </VoucherModal>
      </Modal>
    </>
  );
}
