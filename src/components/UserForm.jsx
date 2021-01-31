import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

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

const UserForm = props => {
    // Zdefiniowanie domyslnych informacji o stanie formularza
    const [values, setValues] = useState();

    // Uaktualnienie informacji o stanie, gdy uzytkownik wpisze cos w formularzu
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            {props.formType === 'signup' ? <h2>Rejestracja</h2> : <h2>Logowanie</h2>}
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor="username">Nazwa uzytkownika</label>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Nazwa uzytownika"
                            onChange={onChange}
                        />
                    </React.Fragment>
                )}
                <label htmlFor="email">Adres e-mail:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adres e-mail"
                    onChange={onChange}
                />
                <label htmlFor="password">Haslo:</label>
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

export default UserForm;
