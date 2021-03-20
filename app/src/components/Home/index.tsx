import React, { useEffect } from 'react';
import Card from './ProductCard';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';


const useStyles = makeStyles(() => ({
    root: {
        paddingTop: 20,
    },
    item: {
        textAlign: 'center'
    }
}));

interface Props {

}

const Home = (props: Props) => {


    const classes = useStyles();

    let items = [];

    const getItem = () => {

    }



    return (
        <Grid className={classes.root} container spacing={2}>
            <Grid item xs={12} md={4} className={classes.item} >
                <Card name={`test`} price={100} currency={['lei']} details="asd" />
            </Grid>

            <Grid item xs={12} md={4} className={classes.item} >
                <Card name={`test`} price={100} currency={['lei']} details="asd" />
            </Grid>

            <Grid item xs={12} md={4} className={classes.item} >
                <Card name={`test`} price={100} currency={['lei']} details="asd" />
            </Grid>
            {/* {items} */}
        </Grid>
    );
};

export default Home;
