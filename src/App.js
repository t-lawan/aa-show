import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Store/reducer';
import Home from './Pages/Home';
import Test from './Pages/Test';
import AR from './Pages/AR';
import Real from './Pages/Real';
import Location from './Pages/Location';
import ModelViewerExample from './Pages/ModelViewerExample';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/test" exact component={Test} /> */}
          <Route path="/ar" exact component={AR} />
          <Route path="/bedford-square" exact component={Real} />
          <Route path="/ar-at-home" exact component={ModelViewerExample} />
          <Route path="/location" exact component={Location} />
          <Route component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
