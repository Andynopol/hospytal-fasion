import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './NotFountComponent';
import Home from './Home';
import Nav from './Nav';


const Main: React.FC = () =>
{

    const [ navVisibility, setNavVisibility ] = useState( true );

    return (
        <Router>
            <Nav isVisible={ navVisibility } />
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
