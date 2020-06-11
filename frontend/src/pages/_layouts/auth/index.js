import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/HeaderLogged';
import Footer from '../../../components/Footer';

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '90px' }}>{children}</div>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
