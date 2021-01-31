import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import styled from 'styled-components';
import Button from '../components/Button';

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp = props => {
    const [values, setValues] = useState();

    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        // Uaktualnienie tytulu strony
        document.title = 'Rejestracja - Notedly';
    });

    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            localStorage.setItem('token', data.signUp);
        }
    });

    return (
        <Wrapper>
            <h2>Rejestracja</h2>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    signUp({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                <label htmlFor="username">Nazwa uzytkownika: </label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nazwa uzytkownika"
                    onChange={onChange}
                />
                <label htmlFor="email">Adres e-mail: </label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adres e-mail"
                    onChange={onChange}
                />
                <label htmlFor="password">Haslo: </label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Haslo"
                    onChange={onChange}
                />
                <Button type="submit">Wyslij</Button>
            </Form>
        </Wrapper>
    );
};

export default SignUp;
