// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';

// Import stylow globalnych
import GlobalStyle from '/components/GlobalStyle';

// Import tras
import Pages from '/pages';

// Import bibliotek klienta Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Konfiguracja adresu URI naszego API i bufora
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// Konfiguracja klienta Apollo
const client = new ApolloClient({
    uri,
    cache,
    connectToDevTools: true
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));