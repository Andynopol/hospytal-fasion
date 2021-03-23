import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import PageNotFound from './NotFountComponent';
import Home from './Home';
import Nav from './Navigation';
import AddProduct from './Admin/AddProduct';
import UpdateProduct from './Admin/UpdateProduct';
import { useSelector, useDispatch } from 'react-redux';


//@snackbar imports
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from './Admin/alerts';
import { snackbarActionManager } from '../actions';

//@main component that defines the routes
const Main: React.FC = () =>
{

    //@snackbar controllers
    const dispatch = useDispatch();

    const snackInfo = useSelector( ( state: any ) => state.snackbar );

    const handleSnackbarClose = ( event?: React.SyntheticEvent, reason?: string ) =>
    {
        if ( reason === 'clickaway' )
        {
            return;
        }
        dispatch( snackbarActionManager.hide() );
    };


    const [ navVisibility, setNavVisibility ] = useState( true );

    return (
        <Router>
            <Nav isVisible={ navVisibility } />
            <Grid container>
                <Grid item xs={ false } md={ 1 } lg={ 2 } />
                <Grid item xs={ 12 } md={ 10 } lg={ 8 }>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route exact path={ '/admin' } component={ Home } />
                        <Route exact path='/admin/add-product' component={ AddProduct } />
                        <Route path='/admin/product/:id' component={ UpdateProduct } />
                        <Route path='*'>
                            <PageNotFound showNav={ setNavVisibility } />
                        </Route>
                    </Switch>


                    <Snackbar
                        open={ snackInfo.open }
                        autoHideDuration={ 4000 }
                        onClose={ handleSnackbarClose }
                        anchorOrigin={ {
                            vertical: 'bottom',
                            horizontal: 'right'
                        } }>
                        <Alert onClose={ handleSnackbarClose } severity={ snackInfo.variant }>
                            { snackInfo.message }
                        </Alert>
                    </Snackbar>
                </Grid>
                <Grid item xs={ false } md={ 1 } lg={ 2 } />


            </Grid>

        </Router>
    );
};

export default Main;
