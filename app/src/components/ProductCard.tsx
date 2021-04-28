import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import
{
    Card,
    CardHeader,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Collapse,

} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import { productsActions } from '../actions';

const useStyles = makeStyles( ( theme ) => ( {
    root: {
        width: '100%',
        [ theme.breakpoints.up( 'md' ) ]: {
            maxWidth: 345,
        }
    },
    media: {
        display: 'flex',
        height: 0,
        paddingTop: '56.25%', // 16:9
        justifyContent: 'center',
        alignItems: 'center'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create( 'transform', {
            duration: theme.transitions.duration.shortest,
        } ),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[ 500 ],
    },
    description: {
        overflow: 'hidden',
        // wordWrap: 'normal'
    },
    icon: {
        top: '-90px',
        position: 'relative',
    }
} ) );

//@params: @active = activates the action buttons when #PROTO-DISPLAY
interface Props
{
    _id: string;
    name: string;
    description?: string;
    details?: string;
    promotion?: string | number;
    price: number;
    piecesLeft?: number;
    src?: string;
    active: boolean;
}


//TODO documnet this component
//@component that renders the card component of a product
const ProductCard = ( props: Props ) =>
{

    const dispatch = useDispatch();
    //bruteforce state of login
    const profile = useSelector( ( state: any ) => state.profile );
    const classes = useStyles();
    const {
        _id,
        name,
        description,
        details,
        promotion,
        price,
        piecesLeft,
        active,
        src,
    } = props;

    //@details block expand state
    const [ expanded, setExpanded ] = useState( false );


    //@expands the details block inside card
    const handleExpandClick = () =>
    {
        setExpanded( !expanded );
    };

    //@deletes the current item using the ID only if the card is active(in admin/ only)
    const deteleItemHandler = ( id: string ) =>
    {
        if ( active )
        {
            dispatch( productsActions.delete( id ) );
        }
    };

    const headerAction = () =>
    {
        if ( profile )
        {
            console.log( profile );
            if ( profile.admin )
            {
                if ( active )
                {
                    return ( <Link to={ `/admin/product/${ _id }` }>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    </Link> );
                }
                return ( <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton> );
            }
        }
        return null;
    };

    return (
        <Card className={ classes.root }>
            <CardHeader
                action={
                    headerAction()
                }
                title={ name }
                subheader={ `${ price } RON` }
            />


            <CardMedia
                className={ classes.media }
                children={ src ? null : <BrokenImageIcon className={ classes.icon } /> }
                image={ src }
                title="asd"
            />


            <CardContent className={ classes.description }>
                <Typography variant="body2" display='block' color="textSecondary" component="p">
                    { description }
                </Typography>
            </CardContent>


            <CardActions disableSpacing>

                {
                    profile && profile.admin ?
                        <IconButton aria-label="delete" onClick={ () => deteleItemHandler( _id ) }>
                            <DeleteIcon />
                        </IconButton> :
                        null
                }

                { profile ?
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> :
                    null
                }

                <IconButton aria-label="share">
                    <AddShoppingCartIcon />
                </IconButton>


                { details ?
                    <IconButton
                        className={ clsx( classes.expand, {
                            [ classes.expandOpen ]: expanded,
                        } ) }
                        onClick={ handleExpandClick }
                        aria-expanded={ expanded }
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> : null }


            </CardActions>


            <Collapse in={ expanded } timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2" component='p' gutterBottom display='block' color="textSecondary">
                        { details }
                    </Typography>
                </CardContent>
            </Collapse>


        </Card>
    );
};

export default ProductCard;
