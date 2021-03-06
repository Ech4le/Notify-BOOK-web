import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    useEffect(() => {
        // Uaktualnienie tytulu strony
        document.title = 'Rejestracja - Notedly';
    });

    // Klient Apollo
    const client = useApolloClient();
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // Przechowywanie tokena
            localStorage.setItem('token', data.signUp);

            // Uaktualnienie bufora lokalnego
            client.writeData({ data: { isLoggedIn: true } });

            // Przekierowanie uzytkownika na strone glowna
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {loading && <p>Wczytywanie...</p>}
            {error && <p>Blad podczas tworzenia konta!</p>}
        </React.Fragment>
    );
};

export default SignUp;
