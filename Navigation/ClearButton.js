import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makesStyles } from '@material-ui/core/styles';

const useStyles = makesStyles( () => ( {
    invisible: {
        display: 'none'
    }
} ) );

const ClearButton = () => {
    const classes = useStyles();
    function handleOnClick ( ev ) {
        document.getElementById( 'navSearch' ).value = '';
        this.classList.add( classes.invisible );
    }
    return (
        <IconButton className={`${ classes.invisible }`} onClick={handleOnClick} >
            <CloseIcon />
        </IconButton >
    );
};

export default ClearButton;