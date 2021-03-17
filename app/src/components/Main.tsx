import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PageNotFound from './NotFountComponent';
import Home from './Home';
import Nav from './Navigation';


const Main: React.FC = () =>
{

    const [ navVisibility, setNavVisibility ] = useState( true );

    return (
        <Router>
            <Nav isVisible={ navVisibility } />
            <Grid container>
                <Grid item xs={ false } md={ 1 } lg={ 2 } />
                <Grid item xs={ 12 } md={ 10 } lg={ 8 }>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route>
                            <PageNotFound showNav={ setNavVisibility } />
                        </Route>
                    </Switch>
                </Grid>
                <Grid item xs={ false } md={ 1 } lg={ 2 } />
            </Grid>
        </Router>
    );
};

export default Main;
