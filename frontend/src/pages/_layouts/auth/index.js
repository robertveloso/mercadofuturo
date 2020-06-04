import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/HeaderLogged';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
