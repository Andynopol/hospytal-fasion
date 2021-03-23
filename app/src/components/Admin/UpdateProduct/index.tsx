import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { productsActions } from '../../../actions';
import axios from 'axios';

import Form from './Form';
import Card from '../../ProductCard';
import FieldSelector from '../constants';


interface Product
{
    name: string;
    price: number;
    description?: string;
    details?: string;
    sale?: number;
    stock?: number;
    src: string;
}

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        marginTop: '4rem'
    },
    loading: {
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
} ) );

interface Props
{
    match: any;
}

const UpdateProduct = ( props: Props ) =>
{
    const { match } = props;
    // const product = useSelector( ( state: any ) => state.products.filter( ( item: any ) => item._id === match.params.id )[ 0 ] );
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ product, setProduct ] = useState( useSelector( ( state: any ) => state.products.filter( ( item: any ) => item._id === match.params.id )[ 0 ] ) );
    const [ cardName, setCardName ] = useState( product ? product.name : '' );
    const [ cardPrice, setCardPrice ] = useState( product ? product.price : 0 );
    const [ cardDescription, setCardDescription ] = useState( product ? product.description : '' );
    const [ cardDetails, setCardDetails ] = useState( product ? product.details : '' );
    const [ cardPromotion, setCardPromotion ] = useState( product ? product.sale : 0 );
    const [ cardPieces, setCardPieces ] = useState( product ? product.stock : 0 );
    const [ cardSrc, setCardSrc ] = useState( product ? product.src : '' );

    const getProduct = async () =>
    {
        const response = await axios.get( `/products/${ match.params.id }` );
        return response.data.product;
    };

    useEffect( () =>
    {
        ( async () =>
        {
            if ( !product )
            {
                const newProduct = await getProduct();
                setProduct( newProduct );
                setCardName( newProduct.name );
                setCardPrice( newProduct.price );
                setCardDescription( newProduct.description );
                setCardDetails( newProduct.details );
                setCardPromotion( newProduct.sale );
                setCardPieces( newProduct.stock );
                setCardSrc( newProduct.src );
            }
        } )();
    }, [] );




    // handles all changes in the form and updates the fake product card
    const handleChanges = ( ev: any, identifier: FieldSelector, forced?: boolean ) =>
    {
        switch ( identifier )
        {
            case FieldSelector.name:
                setCardName( ev.target.value );
                break;
            case FieldSelector.desc:
                setCardDescription( ev.target.value );
                break;
            case FieldSelector.details:
                setCardDetails( ev.target.value );
                break;
            case FieldSelector.prom:
                if ( ev.target.value === '' )
                {
                    setCardPromotion( 0 );
                    break;
                }
                setCardPromotion( parseInt( ev.target.value ) );
                break;
            case FieldSelector.price:
                if ( ev.target.value === '' )
                {
                    setCardPrice( 0 );
                    break;
                }
                setCardPrice( parseInt( ev.target.value ) );
                break;
            case FieldSelector.stock:
                if ( ev.target.value === '' )
                {
                    setCardPieces( 0 );
                    break;
                }
                setCardPieces( parseInt( ev.target.value ) );
                break;
            case FieldSelector.src:
                if ( forced )
                {
                    if ( ev )
                        setCardSrc( ev );
                    break;
                }
                if ( ev.target.value )
                    setCardSrc( ev.target.value );
                break;

        }

    };


    const handleUpdate = ( ev: any ) =>
    {
        ev.preventDefault();
        const updatedProduct: Product = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        if ( product )
        {
            dispatch( productsActions.update( product._id, updatedProduct ) );
        } else
        {
            dispatch( productsActions.post( updatedProduct ) );
        }
    };

    const resetProduct = () =>
    {
        setCardName( product.name );
        setCardPrice( product.price );
        setCardPieces( product.stock );
        setCardPromotion( product.sale );
        setCardDescription( product.description );
        setCardDetails( product.details );
        setCardSrc( product.src );
    };


    return (
        <>
            {
                product ?
                    <Grid container spacing={ 2 } className={ classes.root }>
                        <Grid item xs={ 12 } md={ 7 }>
                            <Card
                                _id={ product._id }
                                name={ cardName }
                                price={ cardPrice }
                                description={ cardDescription }
                                details={ cardDetails }
                                piecesLeft={ cardPieces }
                                promotion={ cardPromotion }
                                src={ cardSrc }
                                active={ false }
                            />
                        </Grid>

                        <Grid item xs={ 12 } md={ 5 }>
                            <Form
                                name={ cardName }
                                description={ cardDescription }
                                details={ cardDetails }
                                promotion={ cardPromotion }
                                price={ cardPrice }
                                pieces={ cardPieces }
                                src={ cardSrc }
                                change={ handleChanges }
                                reset={ resetProduct }
                                update={ handleUpdate }
                            />
                        </Grid>
                    </Grid> :
                    <Grid container className={ classes.loading }>
                        <CircularProgress />
                    </Grid>
            }
        </>
    );
};

export default UpdateProduct;
