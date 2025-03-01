import styled from 'styled-components';
import { darken } from 'polished';

import { colors } from '../../styles/variables';

export const Container = styled.div`
  padding: 30px;
  border-radius: 4px;
  background: #fff;

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    button {
      padding: 12px 20px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #1d4fc3;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#1d4fc3')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    padding: 12px;
    color: #999;
    text-align: left;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  img {
    height: 100px;
  }

  strong {
    display: block;
    color: #333;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      width: 50px;
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: #666;
    }
  }

  button {
    padding: 6px;
    border: 0;
    background: none;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    margin-left: 5px;
    font-size: 28px;
  }
`;

// Modal
export const VoucherModal = styled.div`
  background: ${colors.primary};
  color: ${colors.light};
  position: relative;
  width: 100%;
  max-width: 850px;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 0 auto;
  @media (max-width: 465px) {
    padding: 1.5rem 0.8rem;
  }
`;
