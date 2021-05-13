import React, { ReactNode } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {

    }
} ) );
interface Props
{
    children?: Array<ReactNode>;
}

const LeftContainer: React.FC<Props> = ( props: Props ) =>
{
    const { children } = props;
    const classes = useStyles();
    return (
        <Grid className={ classes.root } item xs={ 12 } md={ 5 }>
            { children }
        </Grid>
    );
};

export default LeftContainer;
