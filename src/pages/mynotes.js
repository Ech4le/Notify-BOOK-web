import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        //Uaktualnienie tytułu dokumentu
        document.title = 'Moje notatki - Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    if (loading) return 'Wczytywanie...';

    if (error) return `Blad! ${error.message}`;

    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>Nie ma jeszcze zadnych notatek.</p>;
    }
};

export default MyNotes;