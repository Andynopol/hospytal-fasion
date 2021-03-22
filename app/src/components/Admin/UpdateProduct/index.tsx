import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Card from '../../ProductCard';

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        marginTop: '4rem'
    }
} ) );

interface Props
{
    match: any;
}

const UpdateProduct = ( props: Props ) =>
{
    const { match } = props;
    const product = useSelector( ( state: any ) => state.products.filter( ( item: any ) => item._id === match.params.id )[ 0 ] );
    const classes = useStyles();
    const dispatch = useDispatch();

    const [ cardName, setCardName ] = useState( product.name );
    const [ cardPrice, setCardPrice ] = useState( product.price );
    const [ cardDescription, setCardDescription ] = useState( product.description );
    const [ cardDetails, setCardDetails ] = useState( product.details );
    const [ cardPromotion, setCardPromotion ] = useState( product.sale );
    const [ cardPieces, setCardPieces ] = useState( product.stock );
    const [ cardSrc, setCardSrc ] = useState( product.src );



    const handleSubmit = ( ev: any ) =>
    {
        ev.preventDefault();
        const newProduct = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        // dispatch( productsActions.multipost( [ newProduct ] ) );
    };

    const handleChanges = ( ev: any, identifier: string, forced?: boolean ) =>
    {
        switch ( identifier )
        {
            case 'NAME':
                setCardName( ev.target.value );
                break;
            case 'DESCRIPTION':
                setCardDescription( ev.target.value );
                break;
            case 'DETAILS':
                setCardDetails( ev.target.value );
                break;
            case 'PROMOTION':
                if ( ev.target.value === '' )
                {
                    setCardPromotion( 0 );
                    break;
                }
                setCardPromotion( parseInt( ev.target.value ) );
                break;
            case 'PRICE':
                if ( ev.target.value === '' )
                {
                    setCardPrice( 0 );
                    break;
                }
                setCardPrice( parseInt( ev.target.value ) );
                break;
            case 'PIECES':
                if ( ev.target.value === '' )
                {
                    setCardPieces( 0 );
                    break;
                }
                setCardPieces( parseInt( ev.target.value ) );
                break;
            case 'SRC':
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

    const clearProductDetails = () =>
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
                />
            </Grid>
        </Grid>
    );
};

export default UpdateProduct;
