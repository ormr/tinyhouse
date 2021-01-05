import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Affix, Layout } from 'antd';
import {
  AppHeader,
  Home,
  Host,
  Login,
  Listing,
  Listings,
  NotFound,
  User,
} from './sections';
import { Viewer } from './lib/types';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';

const client = new ApolloClient({
  uri: '/api',
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App: React.FC = () => {
  const [viewer, setViewer] = React.useState<Viewer>(initialViewer);

  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/host" component={Host} exact />
          <Route
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
            exact
          />
          <Route path="/listing/:id" component={Listing} exact />
          <Route path="/listings/:location?" component={Listings} exact />
          <Route path="/user/:id" component={User} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
