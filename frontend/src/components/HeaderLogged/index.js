import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MdShoppingCart } from 'react-icons/md';

import { signOut } from '../../store/modules/auth/actions';

// import logo from '../../assets/images/logo.svg';
import logo from '../../assets/images/LOGO_BRANCA.png';

import * as S from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const cartSize = useSelector(state => state.cart.length);
  const profile = useSelector(state => state.user.profile);

  function handleSingOut() {
    dispatch(signOut());
  }

  return (
    <>
      <S.Container>
        <Link to="/empresas">
          <img src={logo} width={180} alt="Mercado Futuro" />
        </Link>
        <header>
          <S.Links to="/empresas">
            <div>
              <strong>Empresas</strong>
            </div>
          </S.Links>
          <S.Links to="/vouchers">
            <div>
              <strong>Meus vouchers</strong>
            </div>
          </S.Links>

          <S.Cart to="/carrinho">
            <div>
              <strong>Meu carrinho</strong>
              <span>{`${cartSize} itens`}</span>
            </div>

            <MdShoppingCart size={36} color="#fff" />
          </S.Cart>

          <aside>
            <S.Profile>
              <strong>{profile?.handle}</strong>
              <button type="button" onClick={handleSingOut}>
                sair do sistema
              </button>
            </S.Profile>
          </aside>
        </header>
      </S.Container>
    </>
  );
}
