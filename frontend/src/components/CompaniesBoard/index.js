import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
  CompaniesBoard,
  CompaniesBoardItem,
  CompaniesBoardItemImage,
} from './styles';

export default function CompaniesBoardComponent(props) {
  const history = useHistory();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function loadCompanies() {
      const response = await api.get('companies');
      console.log(response);
      if (response.data.length > 0) {
        const data = response.data.map(company => ({
          ...company,
        }));

        setCompanies(data);
      }
      // toast.error('Não foi possível conectar na nossa API');
    }

    loadCompanies();
  }, []);
  const handleClick = (event, route, itemLink) => {
    history.push(route);
    setMenuItemActived(itemLink);
  };

  const setMenuItemActived = itemLink => {
    const menuItems = document.querySelectorAll('li a');
    menuItems.forEach(item => {
      if (item.href.indexOf(itemLink) !== -1) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  return (
    <CompaniesBoard>
      {companies.map((company, index) => {
        return (
          <CompaniesBoardItem
            onClick={ev =>
              handleClick(ev, `/empresas/${company.slug}`, 'companies')
            }
            key={index}
          >
            <CompaniesBoardItemImage
              src={company?.user?.avatar?.url}
              alt={company.name}
              title={company.name}
            />
          </CompaniesBoardItem>
        );
      })}
    </CompaniesBoard>
  );
}
