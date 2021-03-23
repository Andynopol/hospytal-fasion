import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Item from './Item';
import Form from './Form';
import Card from '../../ProductCard';
import { useDispatch } from 'react-redux';
import AddProductMessages from '../../../api/constants';
import { useSnackbar } from 'notistack';

// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

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

    // const [ items, setItems ] = useState( [] );
    const [ cardName, setCardName ] = useState( '' );
    const [ cardDescription, setCardDescription ] = useState( '' );
    const [ cardDetails, setCardDetails ] = useState( '' );
    const [ cardPromotion, setCardPromotion ] = useState( 0 );
    const [ cardPrice, setCardPrice ] = useState( 0 );
    const [ cardPieces, setCardPieces ] = useState( 0 );
    const [ cardSrc, setCardSrc ] = useState( '' );

    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();







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

    const sendRequest = async ( product: Product ) =>
    {
        const response = await dispatch( productsActions.multipost( [ product ] ) );
        console.log( response );
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

        sendRequest( newProduct );
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

            {/* <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity="success">
                    This is a success message!
                </Alert>
            </Snackbar> */}

        </Grid>
    );
};

export default ProductAdder;
