import ApolloClient  from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api-panel-web.herokuapp.com/graphql',
});

export default client;