import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Item from './Item';
import Form from './Form';
import Card from '../../ProductCard';
import { useDispatch } from 'react-redux';
import AddProductMessages from '../../../api/constants';
import Dialog from '../../AlertDialog';


//@object that contains all global state product actions(including API calls)
import { productsActions } from '../../../actions';

//@enum of commands for form fileds
import { FieldSelector } from '../constants';
import { isElementAccessExpression } from 'typescript';


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



const ProductAdder: React.FC = () =>
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

    // From alerts
    const [ alerts, setAlerts ] = useState( { name: false, description: false, price: false } );



    //Dialog states

    const [ openAlert, setOpenAlert ] = useState( false );
    const [ titleAlert, setTitleAlert ] = useState( '' );
    const [ contentAlert, setContentAlert ] = useState( '' );

    const openDialog = ( title: string, content: string ) =>
    {
        setTitleAlert( title );
        setContentAlert( content );
        setOpenAlert( true );
    };


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
                if ( alerts.name )
                {
                    setAlerts( { ...alerts, name: false } );
                }
                break;
            case FieldSelector.desc:
                setCardDescription( target.value );
                if ( alerts.description )
                {
                    setAlerts( { ...alerts, description: false } );
                }
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
                if ( alerts.price )
                {
                    setAlerts( { ...alerts, price: false } );
                }
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


    const checkFields = () =>
    {
        if ( cardName && cardDescription && cardPrice )
        {
            return true;
        }
        const tempAlerts = { ...alerts };
        if ( !cardName )
        {
            tempAlerts.name = true;
        }

        if ( !cardDescription )
        {
            tempAlerts.description = true;
        }

        if ( !cardPrice )
        {
            tempAlerts.price = true;
        }

        setAlerts( tempAlerts );
        return false;
    };

    const handleSubmit = ( ev: any ) =>
    {
        // ev.preventDefault();



        const newProduct: Product = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };


        dispatch( productsActions.multipost( [ newProduct ] ) );


        //marking the mandatory fields that are not completed




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
        setAlerts( { name: false, price: false, description: false } );
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

                    //fields checkers
                    alerts={ alerts }
                    checkFields={ checkFields }

                    //dialog params
                    openDialog={ openDialog }
                />
            </Grid>


            <Dialog
                open={ openAlert }
                title={ titleAlert }
                content={ contentAlert }
                yes={ handleSubmit }
                setOpen={ setOpenAlert }
            />
        </Grid>
    );
};

export default ProductAdder;
