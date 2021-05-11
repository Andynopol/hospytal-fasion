import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import classes from '*.module.css';

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: theme.spacing( 3 )
    },
    imageWrapper: {

    },
    image: {
        width: '100%',
        height: '100%'
    }

} ) );

interface Props
{
    match: any;
}

const Product: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    const { match } = props;
    const [ product, setProduct ] = useState( useSelector( ( state: any ) => state.products.filter( ( product: any ) => product._id === match.params.id ) )[ 0 ] );



    const getProduct = async () =>
    {
        // TODO: refactor to fetch
        const newProduct = await ( await axios.get( `/products/${ match.params.id }` ) ).data.product;
        setProduct( newProduct );

    };

    useEffect( () =>
    {
        console.log( product );
    }, [ product ] );

    useEffect( () =>
    {
        ( async () =>
        {
            if ( !product )
            {
                await getProduct();
            }
        } )();
    }, [] );

    return (
        <Grid container className={ classes.root }>
            {/* image wrapper */ }
            <Grid item sm={ 12 } md={ 5 }>
                <img src={ product.src } className={ classes.image } alt="" />
            </Grid>
            {/* description wrapper
             */ }
        </Grid>
    );
};

export default Product;
