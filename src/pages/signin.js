import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const SignIn = props => {
    useEffect(() => {
        // Uaktualnienie tytulu strony
        document.title = 'Logowanie - Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // Przechowywanie tokena
            localStorage.setItem('token', data.signIn);

            // Uaktualnienie bufora lokalnego
            client.writeData({ data: { isLoggedIn: true } });

            // Przekierowanie uzytkownika na strone glowna
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {loading && <p>Wczytywanie...</p>}
            {error && <p>Blad podczas logowania!</p>}
        </React.Fragment>
    );
};

export default SignIn;
