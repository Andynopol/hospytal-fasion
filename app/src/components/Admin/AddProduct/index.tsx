import React, { SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Item from './Item';
import Form from './Form';
import Card from '../../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
// import AddProductMessages from '../../../api/constants';
import Dialog from '../../AlertDialog';
import { useHistory } from 'react-router-dom';


//@object that contains all global state product actions(including API calls)
import { productsActions } from '../../../actions';

//@enum of commands for form fileds
import { FieldSelector } from '../../../constants';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: '3rem',
    },
} ) );

interface Product
{
    name: string;
    price: number;
    description?: string;
    details?: string;
    sale?: number;
    stock?: number;
    src: string | File;
}

interface Props
{

}

const ProductAdder: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const profile = useSelector( ( state: any ) => state.profile );

    // Form states
    const [ cardName, setCardName ] = useState( '' );
    const [ cardDescription, setCardDescription ] = useState( '' );
    const [ cardDetails, setCardDetails ] = useState( '' );
    const [ cardPromotion, setCardPromotion ] = useState( 0 );
    const [ cardPrice, setCardPrice ] = useState( 0 );
    const [ cardPieces, setCardPieces ] = useState( 0 );
    const [ cardSrc, setCardSrc ]: [ any, SetStateAction<any> ] = useState( '' );
    const [ fakeSrc, setFakeSrc ] = useState( '' );


    // Mandatory fields alerts
    const [ fieldWarnings, setFieldWarnings ] = useState( { name: false, description: false, price: false } );



    //Dialog states

    const [ openAlert, setOpenAlert ] = useState( false );
    const [ titleAlert, setTitleAlert ] = useState( '' );
    const [ contentAlert, setContentAlert ] = useState( '' );

    //opens the dialog and sets the title and content inside the componenet
    /**
     * @param title the dialog title
     * @param content the content of the dialog
     */
    const openDialog = ( title: string, content: string ) =>
    {
        setTitleAlert( title );
        setContentAlert( content );
        setOpenAlert( true );
    };

    /**
     * @param file image file form the input
     * the file is saved in the scr state and than transformed in base64 string to populate the fakeSrc state
     */
    const setImage = ( file: File ) =>
    {
        const reader = new FileReader();
        if ( file )
        {
            setCardSrc( file );
            reader.readAsDataURL( file );
            reader.onload = () =>
            {
                const base64 = reader.result;
                setFakeSrc( base64.toString() );
            };
        }

    };

    //resets src state
    const removeImage = () =>
    {
        setCardSrc( '' );
        setFakeSrc( '' );
    };

    /**  handles all changes in the form and updates the fake product card
    * @param ev: the event that provides us the target input
    * @param identifier: the string that feeds switch structure witch selects the setState function
    * @param forced: a boolean that can bypass in some cases the target grabbing from the eveny(mainly used on src)
    */
    const handleChanges = ( target: HTMLInputElement | HTMLTextAreaElement, identifier: FieldSelector ) =>
    {
        switch ( identifier )
        {
            case FieldSelector.name:
                setCardName( target.value );
                if ( fieldWarnings.name )
                {
                    setFieldWarnings( { ...fieldWarnings, name: false } );
                }
                break;
            case FieldSelector.desc:
                setCardDescription( target.value );
                if ( fieldWarnings.description )
                {
                    setFieldWarnings( { ...fieldWarnings, description: false } );
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
                if ( fieldWarnings.price )
                {
                    setFieldWarnings( { ...fieldWarnings, price: false } );
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
                    setImage( target.files[ 0 ] );
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
        const tempWarnings = { ...fieldWarnings };
        if ( !cardName )
        {
            tempWarnings.name = true;
        }

        if ( !cardDescription )
        {
            tempWarnings.description = true;
        }

        if ( !cardPrice )
        {
            tempWarnings.price = true;
        }

        setFieldWarnings( tempWarnings );
        return false;
    };

    const handleSubmit = ( ev: any ) =>
    {
        ev.preventDefault();

        const newProduct: any = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        const form = new FormData();

        for ( let key of Object.keys( newProduct ) )
        {
            form.append( key, newProduct[ key ] );
        }


        dispatch( productsActions.post( form ) );
    };


    //empties the form
    const clearProductDetails = () =>
    {
        setCardName( '' );
        setCardPrice( 0 );
        setCardPieces( 0 );
        setCardPromotion( 0 );
        setCardDescription( '' );
        setCardDetails( '' );
        setCardSrc( '' );
        setFakeSrc( '' );
        setFieldWarnings( { name: false, price: false, description: false } );
    };


    return (
        <Grid container className={ classes.root }>
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
                    src={ fakeSrc }
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
                    removeImage={ removeImage }

                    //fields checkers
                    fieldWarnings={ fieldWarnings }
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
