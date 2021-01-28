import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return(
        <nav>
            <ul>
                <li>
                    <span aria-hidden="true" role="img">
                        ASD 
                    </span>
                    <Link to="/">Strona główna</Link>
                </li>
                <li>
                    <Link to="/mynotes">Moje notatki</Link>
                </li>
                <li>
                    <Link to="/favorites">Ulubione</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;