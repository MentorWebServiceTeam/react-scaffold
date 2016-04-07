import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

function Layout({ children }) {
  return (
    <DocumentTitle title="Example Application">
      <div className="container-main container-grey">
        <div className="container-full">
          <h1>Example application</h1>
          <div className="row">
            <div className="col-md-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
