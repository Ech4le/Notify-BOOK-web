import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';

// Szerokosc notatki nie moze przekroczyc 800 pikseli
const StyledNote = styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// Nadanie stylu metadanym notatki
const MetaData = styled.div`
    @media (min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;

// Dodanie wolnego miejsca miedzy awatarami a informacjami
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// Na duzym ekranie element 'UserActions' ma byc dosuniety do prawej strony
const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Wczytywanie...</p>
    if (error) return <p>Blad!</p>

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt="{note.author.username} avatar"
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>autor</em> {note.author.username} <br />
                    {format(note.createdAt, 'Do MMM YYYY')}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Ulubione:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;
