import React, { useState, useEffect } from 'react';
import Card from '../ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { productsActions } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import SignalCellularNoSimOutlinedIcon from '@material-ui/icons/SignalCellularNoSimOutlined';

interface Product extends Document
{
    _id: string;
    name: string,
    price: number,
    description?: string,
    details?: string,
    sale?: number,
    stock: number,
    src: string,
}

const useStyles = makeStyles( () => ( {
    root: {
        paddingTop: 20,
    },
    item: {
        textAlign: 'center'
    },
    loading: {
        height: '90vh',
    },
    icon: {
        fontSize: '25rem',
        opacity: '.3',
    }
} ) );

//@main overview component, the startpoint of the website
const Home = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const areProductsLoaded = useSelector( ( state: any ) =>
    {
        return state.productsAreLoaded;
    } );
    const products = useSelector( ( state: any ) =>
    {
        return state.products;
    } );


    //@fetch products API call
    useEffect( () =>
    {
        /*
        @productsActions = object that contains all redux actions that interacts with products
        including API calls that return products objects
        */
        if ( !areProductsLoaded )
            dispatch( productsActions.get() );

    }, [] );

    console.log( products );

    //@list of the products presented in main menu
    const items = products.map( ( product: Product ) =>
        <Grid item xs={ 12 } md={ 4 } key={ product._id }>
            <Card
                _id={ product._id }
                name={ product.name }
                price={ product.price }
                description={ product.description }
                details={ product.details }
                piecesLeft={ product.stock }
                promotion={ product.sale }
                src={ product.src }
                active={ true }
            />
        </Grid>
    );

    return (
        <>
            {
                !areProductsLoaded
                    ?
                    ( products.length
                        ?
                        <Grid className={ classes.root } container justify='center' alignItems='center' spacing={ 2 }>
                            { items }
                            {/* loading animation after last product in the list until the new array of products is loaded */ }
                            <Grid item xs={ 12 } md={ 4 }>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                        :
                        // loading animation for all products
                        <Grid className={ classes.loading } container justify='center' alignItems='center' spacing={ 2 }>
                            <CircularProgress />
                        </Grid> )
                    :
                    products.length
                        ?
                        //displaying all products with no loading involved
                        ( <Grid className={ classes.root } container spacing={ 2 }>
                            { items }
                        </Grid> )
                        :
                        (
                            //when the products array is empty(or maybe when you have a connection issue)
                            <Grid className={ classes.loading } container justify='center' alignContent='center'>
                                <SignalCellularNoSimOutlinedIcon className={ classes.icon } />
                            </Grid>
                        )
            }
        </>

    );
};

export default Home;
