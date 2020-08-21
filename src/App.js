import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar/NavBar';
import Explore from './containers/Explore/Explore';
import Compare from './containers/Compare';
import Rank from './containers/Rank/Rank';

import * as ROUTES from './routes';

function App() {
  return (
    <Router>
      <div className="main">
        <NavBar />

        <Switch>
          <Route exact path={ROUTES.HOME} component={Explore} />
          <Route exact path={ROUTES.EXPLORE} component={Explore} />
          <Route exact path={ROUTES.RANK} component={Rank} />
          <Route exact path={ROUTES.COMPARE} component={Compare} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
