import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './NotFountComponent';
import Home from './Home';


const Main = () =>
{

    const [ navVisibility, setNavVisibility ] = useState( true );

    return (
        <Router>
            <nav style={ navVisibility ? {} : { display: 'none' } }>Navbar here</nav>
            <Switch>
                <Route exact path='/' component={ Home } />
                <Route>
                    <PageNotFound showNav={ setNavVisibility } />
                </Route>
            </Switch>
        </Router>
    );
};

export default Main;
