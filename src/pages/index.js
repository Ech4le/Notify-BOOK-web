import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Favorites from './Favorites';
import MyNotes from './Mynotes';

const Pages = () => {
    return(
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/mynotes" component={MyNotes} />
            <Route path="/favorites" component={Favorites} />
        </Router>
    );
};

export default Pages;