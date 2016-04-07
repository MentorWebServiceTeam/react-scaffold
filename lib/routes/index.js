import express from 'express';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';

import configureStore from '../../app/store';
import routes from '../../app/routes';

export default function (server) {
  server.use('/public', express.static(join(__dirname, '../../public')));

  server.get('/api/v1/test', (req, res) => {
    res.json([
      'test'
    ]);
  });

  server.use('*', (req, res) => {
    const memoryHistory = createMemoryHistory(req.url);
    const store = configureStore(undefined, memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store);

    match(
      { history, location: req.url, routes },
      (err, redirectLocation, renderProps) => {
        if (err) {
          return res.status(500).end('Internal server error');
        } else if (redirectLocation) {
          return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        if (!renderProps) return res.status(404).end('Not found.');
        const renderView = () => {
          const InitialComponent = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          const componentHTML = renderToString(InitialComponent);
          const title = DocumentTitle.rewind();
          const initialState = store.getState();
          const html = `
            <!DOCTYPE html>
            <!--[if lte IE 8]> <html class="no-js ie-lt9"> <![endif]-->
            <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="https://static.mentor-cdn.com/common/css/mgc-website.css" />
                <link rel="stylesheet" href="https://static.mentor-cdn.com/common/lib/font-awesome/4.2.0/css/font-awesome.min.css" data-norem />
                <script src="https://static.mentor-cdn.com/common/lib/typekit/lyl8dsg.js" type="text/javascript"></script>
                <script type="application/javascript">
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
            </head>
            <body class="fixed-top">
                <div id="app">${componentHTML}</div>
                <script>
                    var ajax = new XMLHttpRequest();
                    ajax.open("GET", "https://static.mentor-cdn.com/common/icons/icons.svg", true);
                    ajax.onload = function(e) {
                      try {
                          var div = document.createElement("div");
                          div.innerHTML = ajax.responseText;
                          document.body.insertBefore(div, document.body.childNodes[0]);
                      }
                      catch(e){
                          console.log(e);
                      }
                    }
                    ajax.send();
                </script>
                <script src="/public/vendor.js" defer></script>
                <script src="/public/bundle.js" defer></script>
            </body>
            </html>
            `;
          return html;
        };

        res.send(renderView());
      }
    );
  });
}
