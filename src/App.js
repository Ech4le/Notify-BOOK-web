// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';

// Import stylow globalnych
import GlobalStyle from '/components/GlobalStyle';

// Import tras
import Pages from '/pages';

// Import bibliotek klienta Apollo
import { 
    ApolloClient, 
    ApolloProvider, 
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// Konfiguracja adresu URI naszego API i bufora
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            credentials: 'same-origin',
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Konfiguracja klienta Apollo
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
})

// Sprawdzenie pod katem lokalnego tokena
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

// Zapis danych bufora podczas poczatkowego wczytywania strony
cache.writeData({ data });

// Zapis danych bufora po jego wyzerowaniu
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));