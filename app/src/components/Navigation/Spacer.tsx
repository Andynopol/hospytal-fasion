import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme ) => ( {
    grow: {
        display: 'flex',
        [ theme.breakpoints.up( 'lg' ) ]: {
            display: 'none',
        },
        flexGrow: 1,
    }
} ) );

const Spacer = () =>
{
    const classes = useStyles();
    return (
        <div className={ classes.grow }></div>
    );
};

export default Spacer;