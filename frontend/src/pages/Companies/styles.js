import styled from 'styled-components';
import { darken } from 'polished';

import bgImage from '../../assets/images/bg.png';
import companyBanner from '../../assets/images/company-banner.svg';

export const SectionHeader = styled.h1`
  font-size: 26px;
  font-weight: 300;
  margin: 15px 0 0 100px;
  color: #666;
  align-self: flex-start;
`;

export const CompaniesContainer = styled.div`
  background: url(${bgImage}) center top no-repeat;
  width: 100%;
  height: 700px;
  background-size: contain;

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

export const CompaniesBanner = styled.img.attrs({
  src: companyBanner,
})`
  width: 100%;
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  list-style: none;
  margin: 20px 100px;

  li {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 4px;
    background: #fff;

    img {
      align-self: center;
      max-width: 150px;
    }

    > strong {
      margin-top: 5px;
      line-height: 20px;
      color: #333;
      font-size: 13px;
    }

    > span {
      margin: 5px 0 20px;
      font-size: 21px;
      font-weight: bold;
    }

    button {
      display: flex;
      align-items: center;

      overflow: hidden;
      margin-top: auto;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #1d4fc3;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#1d4fc3')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;
