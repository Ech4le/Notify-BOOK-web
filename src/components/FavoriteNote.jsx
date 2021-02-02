import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';

import { TOOGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query'

const FavoriteNote = props => {
    // Liczba ulubionych notatek jest przechowywana w postaci informacji o stanie
    const [count, setCount] = useState(props.favoriteCount);

    // Uwzglednienie notatki jesli uzytkownik oznaczyl ja jako ulubiona za pomoca
    // informacji o stanie
    const [favorited, setFavorited] = useState(
        // Sprawdzenie czy notatka znajduje sie na liscie ulubionych notatek uzytkownika
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );

    // Zaczep mutacji toogleFavorite
    const [toogleFavorite] = useMutation(TOOGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        // Ponowne pobranie zapytania GET_MY_FAVORITES, aby uaktualnic bufor
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    // Dwa rozne lacza jesli polubiono lub nie
    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toogleFavorite();
                        setFavorited(false);
                        setCount(count - 1);
                    }}
                >
                    Usun z listy ulubionych
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        toogleFavorite();
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                >
                    Dodaj jako ulubiona
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>
    );
};

export default FavoriteNote;
