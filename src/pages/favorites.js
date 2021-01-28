import React, { useEffect } from 'react';

const Favorites = () => {
    useEffect(() => {
        //Uaktualnienie tytulu dokumentu
        document.title = 'Ulubione - Notedly.'
    });

    return (
        <div>
            <h1>Notedly</h1>
            <p>To sa moje ulubione notatki</p>
        </div>
    );
};

export default Favorites;