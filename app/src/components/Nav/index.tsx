import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

interface Props
{
    isVisible: boolean;
}

const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        background: 'red',
        height: 100,
    },
    invisible: {
        display: 'none'
    }
} ) );

const Nav: React.FC<Props> = ( props: Props ) =>
{
    const { isVisible } = props;

    const classes = useStyles();

    return (
        <div className={ `${ classes.root } ${ isVisible ? '' : classes.invisible }` }>

        </div>
    );
};

export default Nav;
