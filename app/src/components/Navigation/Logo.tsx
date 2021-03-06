import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme ) => ( {
    title: {
        display: 'none',
        [ theme.breakpoints.up( 'sm' ) ]: {
            display: 'block',
            minWidth: '180px',
            marginRight: '30px',
        },
        userSelect: 'none',
        fontWeight: 'bold'
    },
} ) );

interface Props
{

}

//Just a display component
const Logo: React.FC<Props> = () =>
{
    const classes = useStyles();
    return (
        <Typography variant="h5" className={ classes.title }>
            Logo
        </Typography>
    );
};

export default Logo;