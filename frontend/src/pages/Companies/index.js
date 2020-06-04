import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import history from '../../services/history';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce(
      (sumAmount, product) => ({ ...sumAmount, [product.id]: product.amount }),
      {}
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('companies');

      const data = response.data.map(product => ({
        ...product,
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    history.push(`/empresas/${id}`);
  }

  /*function handleAddProduct(id) {
    dispatch(addToCartRequest(id));
  }*/

  return (
    <ProductList>
      {products.map(company => (
        <li key={company.id}>
          <img src={company?.user?.avatar?.url} alt={company.name} />
          <span>{company.name}</span>
          <strong>{company.description}</strong>

          <button type="button" onClick={() => handleAddProduct(company.slug)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
              {amount[company.id] || 0}
            </div>

            <span>Vourchers no carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
