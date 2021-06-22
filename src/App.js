import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import AR from './Pages/AR';
import Real from './Pages/Real';
import { PageURls } from './Utility/Misc';
import ARBedfordSquare from './Pages/ARBedfordSquare';
import ARAtHome from './Pages/ARAtHome';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={PageURls.THREE_JS.url} exact component={Real} />

          <Route path={PageURls.AR.url} exact component={Home} />
          <Route path={PageURls.AR_AT_HOME.url} exact component={ARAtHome} />
          <Route path={PageURls.AR_BEDFORD_SQUARE.url} exact component={ARBedfordSquare} />

          <Route component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
