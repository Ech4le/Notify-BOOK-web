import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            <h1>Notedly</h1>
            <p>To jest strona tytulowa</p>
            {/* Miejsce na liste laczy */}
            <ul>
                <li>
                    <Link to="/mynotes">Moje notatki</Link>
                </li>
                <li>
                    <Link to="/favorites">Ulubione</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;