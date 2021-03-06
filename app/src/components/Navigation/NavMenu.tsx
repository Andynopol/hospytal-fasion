import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import { useSelector } from 'react-redux';

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

    icon: {
        position: 'relative',
        top: '5px',
    }
} ) );

interface Props
{

}


//@routing menu component: here you find all the link in the nav menu
const NavMenu: React.FC<Props> = () =>
{
    const profile = useSelector( ( state: any ) => state.profile );
    const classes = useStyles();
    return (
        <Grid container>
            <ul className={ classes.List }>
                <Link className={ classes.Link } to='/'>
                    <li><span><HomeRoundedIcon className={ classes.icon } /></span> Home</li>
                </Link>
                {
                    /**
                     * @param profile the user logged in or null
                     */
                    profile && profile.admin ?
                        <Link className={ classes.Link } to='/admin/add-product'>
                            <li><span><QueueRoundedIcon className={ classes.icon } /></span> Add Product</li>
                        </Link> : null
                }

            </ul >
        </Grid>
    );
};

export default NavMenu;