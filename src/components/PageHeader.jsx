import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const PageHeader = ({ title, subtitle }) => {
  useDocumentTitle(title, subtitle);

  return (
    <header className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
};

export default PageHeader;
