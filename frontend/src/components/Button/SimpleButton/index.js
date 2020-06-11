import styled from 'styled-components';

import { colors } from '../../../styles/colors';
export default styled.button`
  background: ${colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  border-radius: 4px;

  padding: 5px 20px;
  border: 0;
  margin: 5px;

  :disabled {
    background: #ccc;
  }
`;
