import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Layout } from "./components/layout";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from 'react-apollo';
import client from './graphql'
const App = () => (
  <Router>
    <Layout/>
  </Router>
)

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,document.getElementById('root')
);
