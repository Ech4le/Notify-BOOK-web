import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    // Umieszczenie w zmiennej identyfikatora znalezionego w adresie URL
    const id = props.match.params.id;

    // Zdefiniowanie zapytania
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // Pobranie danych biezacego uzytkownika
    const { data: userdata } = useQuery(GET_ME);

    // Zdefiniowanie mutacji
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if (loading) return 'Wczytywanie...';
    if (error) return <p>Blad! Nie znaleziono notatki!</p>
    if (userdata.me.id !== data.note.author.id) {
        return <p>Nie mozesz edytowac tej notatki.</p>;
    }
    return <NoteForm content={data.note.content} action={editNote}/>; 
};

export default EditNote;
