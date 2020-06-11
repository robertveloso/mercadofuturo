import styled from 'styled-components';

export const SignInContainer = styled.div`
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
