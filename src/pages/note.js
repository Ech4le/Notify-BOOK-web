import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Note from '../components/Note';

// Zapytanie notatki pobierajace zmienna identyfikatora
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const NotePage = props => {
    // Identyfikator z adresu URL jest przechowywany w zmiennej
    const id = props.match.params.id;

    // Zaczep zapytania, przekazanie wartosci id jako zmiennej
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});

    // Jezeli dane sa wczytywane nalezy wyswietlic odpowiedni komunikat
    if (loading) return <p>Wczytywanie...</p>;

    // Jezeli podczas pobierania danych wystapi blad, nalezy wyswietlic komunikat bledu
    if (error) return <p>Blad! Notatka nie zostala znaleziona.</p>;

    // Jezeli pobieranie danych zakonczylo sie sukcesem, nalezy wyswietlic te dane
    return <Note note={data.note} />;
};

export default NotePage;
