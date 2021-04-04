import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '../ProductCard';

interface Props
{
    _id: string;
    name: string,
    price: number,
    description?: string,
    details?: string,
    sale?: number,
    stock: number,
    src: string,
    active?: boolean;
}

const Item = ( props: Props ) =>
{

    const { _id, name, price, description, details, sale, stock, src, active } = props;

    return (
        <Grid item xs={ 12 } md={ 4 }>
            <Card
                _id={ _id }
                name={ name }
                price={ price }
                description={ description }
                details={ details }
                piecesLeft={ stock }
                promotion={ sale }
                src={ src }
                active={ active }
            />
        </Grid>
    );
};

export default Item;
