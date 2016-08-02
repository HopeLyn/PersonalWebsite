/**
 * Created by elemelyn on 16/8/2.
 *
 * 全局入口文件
 */

// 工具栏相关
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory } from 'history';

import * as reducers from './pages/reducers';

import App from './pages/containers/App';
import Home from './pages/containers/Home';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

// 调试工具栏
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

const store = createStore(
  reducer,
  DevTools.instrument(),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(createHashHistory)
    )
  )
);

const history = syncHistoryWithStore(useRouterHistory(createHashHistory)({
  queryKey: false,
}), store);

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home } />
        </Route>
      </Router>

      {/*<DevTools />*/}
    </div>
  </Provider>,
  document.getElementById('content')
);
