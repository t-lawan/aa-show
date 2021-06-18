import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import AR from './Pages/AR';
import Real from './Pages/Real';
import ModelViewerExample from './Pages/ModelViewerExample';
import { PageURls } from './Utility/Misc';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={PageURls.HOME.url} exact component={Home} />
          <Route path={"/ar"} exact component={AR} />
          <Route path={PageURls.BEDFORD_SQUARE.url} exact component={Real} />
          <Route path={PageURls.AR_AT_HOME.url} exact component={ModelViewerExample} />
          <Route component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
