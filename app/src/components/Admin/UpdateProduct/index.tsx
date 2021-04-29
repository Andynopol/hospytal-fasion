import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { productsActions, snackbarActionManager } from '../../../actions';
import axios from 'axios';

import Form from './Form';
import Card from '../../ProductCard';
import { FieldSelector, NoSrcAlert, SnackBarVariants } from '../../../constants';
import Dialog from '../../AlertDialog';


interface Product {
    name: string;
    price: number;
    description?: string;
    details?: string;
    sale?: number;
    stock?: number;
    src: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: '4rem'
    },
    loading: {
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
}));

interface Props {
    match: any;
}

const UpdateProduct = (props: Props) => {
    const { match } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(useSelector((state: any) => state.products.filter((item: any) => item._id === match.params.id)[0]));
    const [cardName, setCardName] = useState(product ? product.name : '');
    const [cardPrice, setCardPrice] = useState(product ? product.price : 0);
    const [cardDescription, setCardDescription] = useState(product ? product.description : '');
    const [cardDetails, setCardDetails] = useState(product ? product.details : '');
    const [cardPromotion, setCardPromotion] = useState(product ? product.sale : 0);
    const [cardPieces, setCardPieces] = useState(product ? product.stock : 0);
    const [cardSrc, setCardSrc] = useState(product ? product.src : null);
    const [fakeSrc, setFakeSrc] = useState(product ? product.src : '');


    // Mandatory field alerts
    const [fieldWarnings, setFieldWarnings] = useState({ name: false, description: false, price: false });



    const loadProduct = async () => {
        try {
            console.log(match.params.id);
            const { data } = await axios.get(`/products/${match.params.id}`);
            if (data.status === 'success')
                setProduct(data.product);
        } catch (error) {
            dispatch(snackbarActionManager.show({ variant: SnackBarVariants.fail, message: 'Something went wrong' }));
        }

    }



    //Dialog states

    const [openAlert, setOpenAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');
    const [contentAlert, setContentAlert] = useState('');


    const getProduct = async () => {
        // TODO: refactor to fetch
        const newProduct = await (await axios.get(`/products/${match.params.id}`)).data.product;
        setProduct(newProduct);
        setCardName(newProduct.name);
        setCardPrice(newProduct.price);
        setCardDescription(newProduct.description);
        setCardDetails(newProduct.details);
        setCardPromotion(newProduct.sale);
        setCardPieces(newProduct.stock);
        setCardSrc(newProduct.src);
        setFakeSrc(newProduct.src);
    };

    useEffect(() => {
        (async () => {
            if (!product) {
                await getProduct();
            }
        })();
    }, []);

    useEffect(() => {
        console.log(product);
        console.log(product?.src);
        console.log(cardSrc);
        console.log(fakeSrc);
    }, [product, cardSrc, fakeSrc]);


    //checks the mandatory fields
    const checkFields = () => {
        if (cardName && cardDescription && cardPrice) {
            return true;
        }
        const tempWarnings = { ...fieldWarnings };
        if (!cardName) {
            tempWarnings.name = true;
        }

        if (!cardDescription) {
            tempWarnings.description = true;
        }

        if (!cardPrice) {
            tempWarnings.price = true;
        }

        setFieldWarnings(tempWarnings);
        return false;
    };


    /**
     * @param file image file form the input
     * the file is saved in the scr state and than transformed in base64 string to populate the fakeSrc state
     */
    const setImage = (file: any) => {
        const reader = new FileReader();
        if (file) {
            setCardSrc(file);
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result;
                setFakeSrc(base64);
            };

        }
    };

    //removes the image from the scr and fakeSrc state
    const removeImage = () => {
        setCardSrc('');
        setFakeSrc('');
    };


    /** 
    * Handles all changes in the form and updates the fake product card including the removal of warnings if you change the input 
    * value of that corresponding field
    */
    const handleChanges = (target: HTMLInputElement | HTMLTextAreaElement, identifier: FieldSelector) => {
        switch (identifier) {
            case FieldSelector.name:
                setCardName(target.value);
                if (fieldWarnings.name) {
                    setFieldWarnings({ ...fieldWarnings, name: false });
                }
                break;
            case FieldSelector.desc:
                setCardDescription(target.value);
                if (fieldWarnings.description) {
                    setFieldWarnings({ ...fieldWarnings, description: false });
                }
                break;
            case FieldSelector.details:
                setCardDetails(target.value);
                break;
            case FieldSelector.prom:
                if (target.value === '') {
                    setCardPromotion(0);
                    break;
                }
                setCardPromotion(parseInt(target.value));
                break;
            case FieldSelector.price:
                if (target.value === '') {
                    setCardPrice(0);
                    break;
                }
                setCardPrice(parseInt(target.value));
                if (fieldWarnings.price) {
                    setFieldWarnings({ ...fieldWarnings, price: false });
                }
                break;
            case FieldSelector.stock:
                if (target.value === '') {
                    setCardPieces(0);
                    break;
                }
                setCardPieces(parseInt(target.value));
                break;
            case FieldSelector.src:
                if ('files' in target)
                    setImage(target.files[0]);
                break;
        }

    };

    /** 
     * ! This function updates the product without any filters! Use it with caution! 
     * ! Use it only as dialog YES button callback 
     * */
    const forcedUpdate = () => {
        const updatedProduct: Product = {
            name: cardName,
            price: cardPrice,
            description: cardDescription,
            details: cardDetails,
            sale: cardPromotion,
            stock: cardPieces,
            src: cardSrc,
        };

        dispatch(productsActions.update(product._id, getFormData(updatedProduct)));
        getProduct();
    };

    const getFormData: (obj: any) => FormData = (updatedProduct) => {
        const form = new FormData();

        for (let key of Object.keys(updatedProduct)) {
            form.append(key, updatedProduct[key]);
        }

        return form;
    };


    // product update handler
    const handleUpdate = (ev: any) => {
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

        if (product) {
            const trim: Product = (({ name, price, description, details, sale, stock, src }) =>
                ({ name, price, description, details, sale, stock, src }))(product);

            if (JSON.stringify(trim) == JSON.stringify(updatedProduct)) {
                dispatch(snackbarActionManager.hide());
                dispatch(snackbarActionManager.show({ message: 'No updates registered', variant: SnackBarVariants.info }));
            }
            else {
                if (cardSrc) {
                    dispatch(productsActions.update(product._id, getFormData(updatedProduct)));
                    getProduct();
                }
                else {
                    openDialog(NoSrcAlert.title, NoSrcAlert.content);
                }

            }

        } else {
            //? why is this else branch still here???
            // dispatch( productsActions.post( updatedProduct ) );
        }
    };


    // resets the fields back to their product state values
    const resetProduct = () => {
        setCardName(product.name);
        setCardPrice(product.price);
        setCardPieces(product.stock);
        setCardPromotion(product.sale);
        setCardDescription(product.description);
        setCardDetails(product.details);
        setCardSrc(product.src);
        setFakeSrc(product.src);
        setFieldWarnings({ name: false, price: false, description: false });
    };

    /**
     * 
     * @param title title of the dialog
     * @param content content of the dialog
     */

    const openDialog = (title: string, content: string) => {
        setTitleAlert(title);
        setContentAlert(content);
        setOpenAlert(true);
    };


    return (
        <>
            {
                product ?
                    <Grid container spacing={2} className={classes.root}>
                        <Grid item xs={12} md={7}>
                            {/* PROTO-DISPLAY */}
                            <Card
                                _id={product._id}
                                name={cardName}
                                price={cardPrice}
                                description={cardDescription}
                                details={cardDetails}
                                piecesLeft={cardPieces}
                                promotion={cardPromotion}
                                src={fakeSrc}
                                active={false}
                            />
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Form
                                name={cardName}
                                description={cardDescription}
                                details={cardDetails}
                                promotion={cardPromotion}
                                price={cardPrice}
                                pieces={cardPieces}
                                src={cardSrc}
                                removeImage={removeImage}
                                change={handleChanges}
                                reset={resetProduct}
                                update={handleUpdate}
                                fieldWarnings={fieldWarnings}
                                checkFields={checkFields}
                                openDialog={openDialog}

                            />
                        </Grid>
                    </Grid> :
                    <Grid container className={classes.loading}>
                        <CircularProgress />
                    </Grid>

            }
            <Dialog
                open={openAlert}
                title={titleAlert}
                content={contentAlert}
                yes={forcedUpdate}
                setOpen={setOpenAlert}
            />
        </>
    );
};

export default UpdateProduct;
