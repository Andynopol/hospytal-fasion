import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from '../ProductCard';

interface Props
{
    name: string;
    description: string;
    details: string;
    promotion: string | number;
    price: number;
    piecesLeft: number;
    src: string;
}

const Items = ( props: Props ) =>
{

    const { name, description, details, promotion, price, piecesLeft, src } = props;


    return (
        <Grid container spacing={ 2 }>
            <ProductCard
                name={ name }
                description={ description }
                details={ details }
                promotion={ promotion }
                price={ price }
                piecesLeft={ piecesLeft }
                src={ src }
            />
        </Grid>
    );
};

export default Items;
