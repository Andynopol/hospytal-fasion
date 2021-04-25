import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from '../../ProductCard';

interface Props
{
    _id: string;
    name: string;
    description: string;
    details: string;
    promotion: string | number;
    price: number;
    piecesLeft: number;
    src: string;
}

//* So far is not in use.

const Items = ( props: Props ) =>
{

    const { name, description, details, promotion, price, piecesLeft, src, _id } = props;


    return (
        <Grid container spacing={ 2 }>
            <ProductCard
                _id={ _id }
                name={ name }
                description={ description }
                details={ details }
                promotion={ promotion }
                price={ price }
                piecesLeft={ piecesLeft }
                src={ src }
                active={ false }
            />
        </Grid>
    );
};

export default Items;
