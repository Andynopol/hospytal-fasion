import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';


//redux
import { useSelector, useDispatch } from 'react-redux';

//links
import PageNotFound from './NotFountComponent';
import Home from './Home';
import Nav from './Navigation';
import AddProduct from './Admin/AddProduct';
import UpdateProduct from './Admin/UpdateProduct';
import { AccountInfo, Login, Register } from './User';



//@snackbar imports
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from './Alert';
import { snackbarActionManager } from '../actions';


//@main component that defines the routes
const Main: React.FC = () =>
{

    /**
     * TODO: Make a single From component
     * TODO: Make the promotion and stock funtionality
     * TODO: Make the cart
     * TODO: !!!Make the payment functionality!!!
     * TODO: Improve design
     */


    const dispatch = useDispatch();


    //@redux state for snackbar dinamic data
    const snackInfo = useSelector( ( state: any ) => state.snackbar );

    /**  @profile redux state for logged in user */
    const profile = useSelector( ( state: any ) => state.profile );

    //@callback for snackbar hide function
    const handleSnackbarClose = ( event?: React.SyntheticEvent, reason?: string ) =>
    {
        if ( reason === 'clickaway' )
        {
            dispatch( snackbarActionManager.hide() );
            return;
        }
        dispatch( snackbarActionManager.hide() );
    };

    /**visibility of navbar
     * ! false only on PageNotFound
    */
    const [ navVisibility, setNavVisibility ] = useState( true );





    /**
     * @param path string that coresponds to the main path(excludes ids)
     * @param match match object contains information about how a <Route path> matched the URL
     * @returns the component if the user is logged and is considered admin or PageNotFound if the user is not logged or is
     * not considered admin
     */

    const restrictAdminPages = ( path: string, match?: any ) =>
    {
        if ( profile && profile.admin )
        {
            switch ( path )
            {
                case '/admin/add-product':
                    return <AddProduct />;
                case '/admin/product':
                    return <UpdateProduct match={ match } />;
            }
        }
        return <PageNotFound showNav={ setNavVisibility } />;
    };

    return (
        <Router>
            <Nav isVisible={ navVisibility } />
            <Grid container>
                <Grid item xs={ 1 } md={ 1 } lg={ 2 } />
                <Grid item xs={ 10 } lg={ 8 }>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route exact path={ '/admin' } component={ Home } />
                        <Route exact path='/admin/add-product' render={ () => restrictAdminPages( '/admin/add-product' ) } />
                        <Route path='/admin/product/:id' render={ ( { match } ) => restrictAdminPages( '/admin/product', match ) } />
                        <Route path='/account' component={ AccountInfo } />
                        <Route path='/login' component={ Login } />
                        <Route path='/register' component={ Register } />
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
                <Grid item xs={ 1 } lg={ 2 } />


            </Grid>

        </Router>
    );
};

export default Main;
