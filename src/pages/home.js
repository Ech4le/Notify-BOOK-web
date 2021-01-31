import React from 'react';

// Import bibliotek do uzycia API
import { useQuery, gql } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import Note from '../components/Note';

// Zapytanie GraphQL przechowywane w formie zmiennej
const GET_NOTES = gql`
    query noteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
        cursor
        hasNextPage
        notes {
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
    }
`;

const Home = () => {
    // Zaczep zapytania
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    // Jezeli dane sa wczytywane, nalezy wyswietlic odpowiedni komunikat
    if (loading) return <p>Wczytywanie...</p>;

    // Jezeli podczas pobierania danych wystapi blad, nalezy wyswietlic komunikat bledu
    if (error) return <p>Blad!</p>

    // Jezeli pobieranie danych zakonczylo sie sukcesem, nalezy wyswietlic te dane w interfejsie
    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                    Wiecej
                </Button>
            )}
        </React.Fragment>
    );
};

export default Home;