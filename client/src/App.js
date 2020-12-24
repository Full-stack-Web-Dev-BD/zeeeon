import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { Provider } from 'react-redux';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';



import validators from './common/validators';
import store from './store';
import {
  SignUp as SignUpView,
} from './views';
import { Main as MainLayout } from './layouts';
import { RouteWithLayout } from './components';
import Login from 'views/Login/Login';
import Create from 'views/Create/Create'


import './updatedcss.css'
import UpgradePlan from 'views/UpgradePlan/UpgradePlan';
import ManageUser from 'views/ManageUser/ManageUser';
import AboutUs from 'views/AboutUs/AboutUs';
import UpdateUser from 'views/Update/Update';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    // store.dispatch(logoutUser());
    // // Redirect to login
    // window.location.href = '/';
  }
}


const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {

    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      setUser(decoded)
    }
  }, [])




  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUpView} />          
          
          <Switch>
            <RouteWithLayout
              component={UpdateUser}
              exact
              layout={MainLayout}
              path="/update"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={Create}
              exact
              layout={MainLayout}
              path="/add-user"
            />
          </Switch>
          
          <Switch>
            <RouteWithLayout
              component={ManageUser}
              exact
              layout={MainLayout}
              path="/manage-users"
            />
          </Switch>
          <Switch>
            <RouteWithLayout
              component={AboutUs}
              exact
              layout={MainLayout}
              path="/about"
            />
          </Switch>
          {/* <Switch>
            <RouteWithLayout
              component={UpgradePlan}
              exact
              layout={MainLayout}
              path="/upgrade"
            />
          </Switch> */}
        </Router>
      </Provider>
    </ThemeProvider>
  );
}
export default App;