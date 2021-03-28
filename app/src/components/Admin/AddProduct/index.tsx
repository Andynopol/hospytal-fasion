import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Item from './Item';
import Form from './Form';
import Card from '../../ProductCard';
import { useDispatch } from 'react-redux';
import AddProductMessages from '../../../api/constants';
import AlertDialog from '../../AlertDialog';


import { addProductAlertInfo } from './AlertMessages';


//@object that contains all global state product actions(including API calls)
import { productsActions } from '../../../actions';

//@enum of commands for form fileds
import FieldSelector from '../constants';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: '3rem',
    }
} ) );

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

interface Props
{

}



const ProductAdder: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();

    // Form states
    const [ cardName, setCardName ] = useState( '' );
    const [ cardDescription, setCardDescription ] = useState( '' );
    const [ cardDetails, setCardDetails ] = useState( '' );
    const [ cardPromotion, setCardPromotion ] = useState( 0 );
    const [ cardPrice, setCardPrice ] = useState( 0 );
    const [ cardPieces, setCardPieces ] = useState( 0 );
    const [ cardSrc, setCardSrc ] = useState( '' );

    const [ alerts, setAlerst ] = useState( { name: false, description: false, price: false } );


    //Alert states

    const [ openAlert, setOpenAlert ] = useState( false );
    const [ titleAlert, setTitleAlert ] = useState( '' );
    const [ contentAlert, setContentAlert ] = useState( '' );
    const [ yesAlert, setYesAlert ] = useState( null );

    const setSrc = ( file: File ) =>
    {
        const reader = new FileReader();
        if ( file )
        {
            reader.readAsDataURL( file );
            reader.onload = () =>
            {
                const base64 = reader.result;
                setCardSrc( base64.toString() );
            };
        }

    };

    // handles all changes in the form and updates the fake product card
    // @params: @ev: the event that provides us the target input
    // @params: @identifier: the string that feeds switch structure witch selects the setState function
    // @params: @forced: a boolean that can bypass in some cases the target grabbing from the eveny(mainly used on src)
    const handleChanges = ( target: HTMLInputElement | HTMLTextAreaElement, identifier: FieldSelector ) =>
    {
        switch ( identifier )
        {
            case FieldSelector.name:
                setCardName( target.value );
                break;
            case FieldSelector.desc:
                setCardDescription( target.value );
                break;
            case FieldSelector.details:
                setCardDetails( target.value );
                break;
            case FieldSelector.prom:
                if ( target.value === '' )
                {
                    setCardPromotion( 0 );
                    break;
                }
                setCardPromotion( parseInt( target.value ) );
                break;
            case FieldSelector.price:
                if ( target.value === '' )
                {
                    setCardPrice( 0 );
                    break;
                }
                setCardPrice( parseInt( target.value ) );
                break;
            case FieldSelector.stock:
                if ( target.value === '' )
                {
                    setCardPieces( 0 );
                    break;
                }
                setCardPieces( parseInt( target.value ) );
                break;
            case FieldSelector.src:
                if ( 'files' in target )
                    setSrc( target.files[ 0 ] );
                break;
        }

    };

    // TODO make it abe to send multiple items
    const handleSubmit = ( ev: any ) =>
    {
        ev.preventDefault();



        const newProduct: Product = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        if ( !newProduct.name )
        {
            setTitleAlert( '' );
        }

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
                {/* PROTO-DISPLAY */ }
                <Card
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


            <AlertDialog
                open={ openAlert }
                title={ titleAlert }
                content={ contentAlert }
                yes={ yesAlert }
                setOpen={ setOpenAlert }
            />
        </Grid>
    );
};

export default ProductAdder;
