import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layout';

import Home from './home';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const Pages = () => {
    return(
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/new" component={NewNote} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </Router>
    );
};

// Dodanie komponentu PrivateRoute za komponentem Pages
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    // Jezeli dane sa wczytywane, nalezy wyswietlic odpowiedni komunikat
    if (loading) return <p>Wczytywanie...</p>;

    // Jezeli podczas pobierania danych wystapi blad, nalezy wyswietlic komunikat
    if (error) return <p>Blad!</p>

    // Jezeli uzytkownik jest zalogowany, trzeba przekierowac go do zadanego komponentu
    // W preciwnym razie nalezy przekierowac uzytkownika na strone logowania
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default Pages;
