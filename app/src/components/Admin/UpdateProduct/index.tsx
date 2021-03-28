import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { productsActions, snackbarActionManager } from '../../../actions';
import axios from 'axios';

import Form from './Form';
import Card from '../../ProductCard';
import { FieldSelector, NoSrcAlert } from '../constants';
import Dialog from '../../AlertDialog';
import { start } from 'node:repl';


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
    const [ product, setProduct ] = useState( useSelector( ( state: any ) => state.products.filter( ( item: any ) => item._id === match.params.id )[ 0 ] ) );
    const classes = useStyles();
    const dispatch = useDispatch();

    // const [ product, setProduct ] = useState( useSelector( ( state: any ) => state.products.filter( ( item: any ) => item._id === match.params.id )[ 0 ] ) );
    const [ cardName, setCardName ] = useState( product ? product.name : '' );
    const [ cardPrice, setCardPrice ] = useState( product ? product.price : 0 );
    const [ cardDescription, setCardDescription ] = useState( product ? product.description : '' );
    const [ cardDetails, setCardDetails ] = useState( product ? product.details : '' );
    const [ cardPromotion, setCardPromotion ] = useState( product ? product.sale : 0 );
    const [ cardPieces, setCardPieces ] = useState( product ? product.stock : 0 );
    const [ cardSrc, setCardSrc ] = useState( product ? product.src : '' );


    // From alerts
    const [ alerts, setAlerts ] = useState( { name: false, description: false, price: false } );



    //Dialog states

    const [ openAlert, setOpenAlert ] = useState( false );
    const [ titleAlert, setTitleAlert ] = useState( '' );
    const [ contentAlert, setContentAlert ] = useState( '' );


    const getProduct = async () =>
    {
        const newProduct = await ( await axios.get( `/products/${ match.params.id }` ) ).data.product;
        setProduct( newProduct );
        setCardName( newProduct.name );
        setCardPrice( newProduct.price );
        setCardDescription( newProduct.description );
        setCardDetails( newProduct.details );
        setCardPromotion( newProduct.sale );
        setCardPieces( newProduct.stock );
        setCardSrc( newProduct.src );
    };

    useEffect( () =>
    {
        ( async () =>
        {
            if ( !product )
            {
                console.log( 'start' );
                await getProduct();
            }
        } )();
    }, [] );


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


    const setImage = ( file: any ) =>
    {
        const reader = new FileReader();
        if ( file )
        {
            reader.readAsDataURL( file );
            reader.onload = () =>
            {
                const base64 = reader.result;
                setCardSrc( base64 );
            };

        }
    };

    const removeImage = () =>
    {
        setCardSrc( '' );
    };


    // handles all changes in the form and updates the fake product card
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
                    setImage( target.files[ 0 ] );
                break;
        }

    };

    //! This function updates the product without any filters! Use it with caution!
    const forcedUpdate = () =>
    {
        const updatedProduct: Product = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        dispatch( productsActions.update( product._id, updatedProduct ) );
        getProduct();
    };


    // product update handler
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
            const trim: Product = ( ( { name, price, description, details, sale, stock, src } ) =>
                ( { name, price, description, details, sale, stock, src } ) )( product );

            if ( JSON.stringify( trim ) == JSON.stringify( updatedProduct ) )
            {
                dispatch( snackbarActionManager.hide() );
                dispatch( snackbarActionManager.show( { message: 'No updates registered', variant: 'info' } ) );
            }
            else
            {
                if ( cardSrc )
                {
                    dispatch( productsActions.update( product._id, updatedProduct ) );
                    getProduct();
                }
                else
                {
                    openDialog( NoSrcAlert.title, NoSrcAlert.content );
                }

            }

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
        setAlerts( { name: false, price: false, description: false } );
    };

    const openDialog = ( title: string, content: string ) =>
    {
        setTitleAlert( title );
        setContentAlert( content );
        setOpenAlert( true );
    };


    return (
        <>
            {
                product ?
                    <Grid container spacing={ 2 } className={ classes.root }>
                        <Grid item xs={ 12 } md={ 7 }>
                            {/* PROTO-DISPLAY */ }
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
                                removeImage={ removeImage }
                                change={ handleChanges }
                                reset={ resetProduct }
                                update={ handleUpdate }
                                alerts={ alerts }
                                checkFields={ checkFields }
                                openDialog={ openDialog }

                            />
                        </Grid>
                    </Grid> :
                    <Grid container className={ classes.loading }>
                        <CircularProgress />
                    </Grid>

            }
            <Dialog
                open={ openAlert }
                title={ titleAlert }
                content={ contentAlert }
                yes={ forcedUpdate }
                setOpen={ setOpenAlert }
            />
        </>
    );
};

export default UpdateProduct;
