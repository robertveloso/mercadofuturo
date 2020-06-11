import styled from 'styled-components';
import { darken } from 'polished';

import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

export const ButtonMF = styled(Button)`
&& {
  margin: 20px
  color: #fff;
  background: #1d4fc3;
  font-weight: bold;
  text-align: left;
  text-transformation: uppercase;

  &:hover {
    background: ${darken(0.03, '#1d4fc3')};
  }
}
`;

export const LinkType = styled(Button)`
&& {
  margin: 20px
  color: #fff;
  background: #1d4fc3;
  font-weight: bold;
  text-align: left;
  text-transformation: uppercase;
}
`;

export const SignUpContainer = styled.div`
  & section {
    justify-content: center;
    margin: 0 auto;
    height: 100%;
  }
  @media (max-width: 1280px) {
    height: 90vh;
  }
  @media (max-width: 1024px) {
    background: none;
    height: auto;
  }
`;
