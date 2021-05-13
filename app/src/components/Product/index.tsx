import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';

import LeftContainer from './LeftContainer';
import MediaContent from './MediaContent';

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: theme.spacing( 3 )
    },
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
            <LeftContainer children={ [ <MediaContent src={ product ? product.src : null } /> ] } />

        </Grid>
    );
};

export default Product;
