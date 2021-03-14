import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles( ( theme ) => ( {
    menuButton: {
        marginRight: theme.spacing( 2 ),
        display: 'block',
        [ theme.breakpoints.up( 'md' ) ]: {
            display: 'none'
        }
    },
    hide: {
        display: 'none',
    },

} ) );

interface Props
{
    onClick: () => void;
    open: boolean;
}

const DrowerMenuButton: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    return (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ props.onClick }
            edge="start"
            className={ clsx( classes.menuButton, props.open && classes.hide ) }
        >
            <MenuIcon />
        </IconButton>
    );
};

export default DrowerMenuButton;