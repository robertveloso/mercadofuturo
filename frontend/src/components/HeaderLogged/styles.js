import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../../styles/colors';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  /*border-bottom: 1px solid #eaeaea;*/
  height: 90px;
  transition: all 0.25s ease-in-out;
  width: -webkit-fill-available;
  box-sizing: content-box;
  color: #1d4fc3;
  z-index: 997;

  background: #1d4fc3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px;

  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const Links = styled(Link)`
  display: flex;
  margin-right: 25px;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  margin-right: 25px;

  &:hover {
    opacity: 0.7;
  }

  div {
    margin-right: 10px;
    text-align: right;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  strong {
    font-weight: bold;
    color: #fff;
    margin-bottom: 5px;
  }

  button {
    border: 0;
    background: none;
    color: #fff;
    transition: color 0.2s;

    &:hover {
      color: ${colors.danger};
    }
  }
`;
