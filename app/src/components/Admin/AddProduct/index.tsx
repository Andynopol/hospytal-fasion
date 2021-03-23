import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Item from './Item';
import Form from './Form';
import ProductCard from '../../ProductCard';
import { useDispatch } from 'react-redux';
import { productsActions } from '../../../actions';

import FieldSelector from '../constants';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: '3rem',
    }
} ) );

interface Props
{

}



const ProductAdder = ( props: Props ) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();

    // const [ items, setItems ] = useState( [] );
    const [ cardName, setCardName ] = useState( '' );
    const [ cardDescription, setCardDescription ] = useState( '' );
    const [ cardDetails, setCardDetails ] = useState( '' );
    const [ cardPromotion, setCardPromotion ] = useState( 0 );
    const [ cardPrice, setCardPrice ] = useState( 0 );
    const [ cardPieces, setCardPieces ] = useState( 0 );
    const [ cardSrc, setCardSrc ] = useState( '' );




    // handles all changes in the form and updates the fake product card
    // @params: @ev: the event that provides us the target input
    // @params: @identifier: the string that feeds switch structure witch selects the setState function
    // @params: @forced: a boolean that can bypass in some cases the target grabbing from the eveny(mainly used on src)
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

    // TODO make it abe to send multiple items
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

        dispatch( productsActions.multipost( [ newProduct ] ) );
    };

    const clearProductDetails = () =>
    {
        setCardName( '' );
        setCardPrice( 0 );
        setCardPieces( 0 );
        setCardPromotion( 0 );
        setCardDescription( '' );
        setCardDetails( '' );
        setCardSrc( '' );
    };


    return (
        <Grid container spacing={ 3 } className={ classes.root }>
            <Grid item xs={ 12 } md={ 7 }>
                <ProductCard
                    _id=''
                    name={ cardName }
                    description={ cardDescription }
                    details={ cardDetails }
                    promotion={ cardPromotion }
                    price={ cardPrice }
                    piecesLeft={ cardPieces }
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
                    clear={ clearProductDetails }
                    send={ handleSubmit }
                />
            </Grid>

        </Grid>
    );
};

export default ProductAdder;
