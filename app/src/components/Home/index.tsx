import React, { useEffect } from 'react';
import Card from '../ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
// import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { productsActions } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../api';

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
    }
} ) );


const Home = () =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    let products = useSelector( ( state: any ) =>
    {
        return state.products;
    } );

    useEffect( () =>
    {
        dispatch( productsActions.get() );
    }, [] );

    console.log( products );

    const items = products.map( ( product: Product ) =>
        <Grid item xs={ 12 } md={ 4 } key={ product._id }>
            <Card
                name={ product.name }
                price={ product.price }
                description={ product.description }
                details={ product.details }
                piecesLeft={ product.stock }
                promotion={ product.sale }
                src={ product.src }
            />
        </Grid>
    );

    return (
        <>
            {
                !products.length ?
                    ( <Grid className={ classes.loading } container justify='center' alignItems='center' spacing={ 2 }>
                        <CircularProgress />
                    </Grid> ) :
                    ( <Grid className={ classes.root } container spacing={ 2 }>
                        { items }
                    </Grid> )
            }
        </>

    );
};

export default Home;
