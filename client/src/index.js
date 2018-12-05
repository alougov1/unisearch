import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import People from './components/People/People';
import School from './components/School/School';

const routing = (
  <Router>
    <div>
        <Header />

        <Switch>
            <Route exact path="/" component={App} />
            { localStorage.getItem('authenticated') === 'true' &&
            <Route path="/components/Search/Search.js" component={Search} />
          }
          { localStorage.getItem('authenticated') === 'true' &&
            <Route path="/components/Profile/Profile.js" component={Profile} />
          }
          { localStorage.getItem('authenticated') === 'true' &&
            <Route path="/components/Settings/Settings.js" component={Settings} />
          }
            <Route path="/components/Login/Login.js" component={Login} />
            { localStorage.getItem('authenticated') === 'true' &&
            <Route path="/components/People/People.js" component={People} />
          }
          { localStorage.getItem('authenticated') === 'true' &&
            <Route path="/components/School/School.js" component={School} />
          }
          }
        </Switch>

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
