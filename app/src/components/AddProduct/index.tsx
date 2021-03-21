import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Item from './Item';
import Form from './Form';
import ProductCard from '../ProductCard';
import { useDispatch } from 'react-redux';
import { productsActions } from '../../actions';


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

        dispatch( productsActions.post( newProduct ) );
    };


    // TODO try to scale this shit!
    // const addNewItem = () =>
    // {
    //     items.push(
    //         <Grid item xs={ 12 } md={ 6 }>
    //             <ProductCard
    //                 name={ cardName }
    //                 description={ cardDescription }
    //                 details={ cardDetails }
    //                 promotion={ cardPromotion }
    //                 price={ cardPrice }
    //                 piecesLeft={ cardPieces }
    //                 src={ cardSrc }
    //             />
    //         </Grid>
    //     );
    // };

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
        setCardName( '' );
        setCardPrice( 0 );
        setCardPieces( 0 );
        setCardPromotion( 0 );
        setCardDescription( '' );
        setCardDetails( '' );
        setCardSrc( '' );
    };

    // useEffect( () =>
    // {
    //     console.log( cardSrc );
    // }, [ cardSrc ] );

    return (
        <Grid container spacing={ 3 } className={ classes.root }>
            <Grid item xs={ 12 } md={ 7 }>
                <ProductCard
                    name={ cardName }
                    description={ cardDescription }
                    details={ cardDetails }
                    promotion={ cardPromotion }
                    price={ cardPrice }
                    piecesLeft={ cardPieces }
                    src={ cardSrc }
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
