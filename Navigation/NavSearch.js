import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: '10px',
        border: '.5px solid lightgrey',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(1),
            width: '650px',
        },
        display: 'flex',
        userSelect: 'none'

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const NavSearch = () => {
    const classes = useStyles();


    function onChangeHandler(ev) {
        if (ev.nativeEvent.inputType === 'insertText' && ev.target.value !== '') {
            console.log('show x button');
        }
        else if (ev.nativeEvent.inputType === 'deleteContentBackward' && ev.target.value === '') {
            console.log('hide x button');
        }
    }

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                id="navSearch"
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                onChange={onChangeHandler}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};

export default NavSearch;