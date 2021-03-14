import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( ( theme ) => ( {
    List: {
        padding: 0,
        display: 'none',
        [ theme.breakpoints.up( 'md' ) ]: {
            display: 'flex',
        },
        listStyle: 'none',
        margin: 0,
    },
    navLink: {
        '&:hover': {
            padding: '12px 12px 10px 12px',
            borderBottom: '2px solid #262626',
            cursor: 'pointer',
        }
    },
    Link: {
        color: '#fafafa',
        textDecoration: 'none',
        userSelect: 'none',
        padding: '12px',
        '&:hover': {
            padding: '12px 12px 10px 12px',
            borderBottom: '2px solid #fafafa',
            cursor: 'pointer',
        }
    },
} ) );

const NavMenu = () => {
    const classes = useStyles();
    return (
        <Grid container>
            <ul className={classes.List}>
                <Link className={classes.Link} to='/'>
                    <li>Home</li>
                </Link>
                <Link className={classes.Link} to='/services'>
                    <li>Services</li>
                </Link>
                <Link className={classes.Link} to='/websites'>
                    <li>Websites</li>
                </Link>
            </ul >
        </Grid>
    );
};

export default NavMenu;