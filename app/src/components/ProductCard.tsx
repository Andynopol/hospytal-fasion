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
const ProductCard = ( props: Props ) =>
{

    const dispatch = useDispatch();
    const isLogged = useSelector( ( state: any ) => state.isLogged );
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
        src
    } = props;
    const [ expanded, setExpanded ] = useState( false );


    const handleExpandClick = () =>
    {
        setExpanded( !expanded );
    };

    const deteleItemHandler = ( id: string ) =>
    {
        if ( active )
        {
            dispatch( productsActions.delete( id ) );
        }
    };

    return (
        <Card className={ classes.root }>
            <CardHeader
                action={
                    active ?
                        <Link to={ `/admin/product/${ _id }` }>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </Link> :
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
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
                { isLogged ?
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> :
                    null }
                <IconButton aria-label="delete" onClick={ () => deteleItemHandler( _id ) }>
                    <DeleteIcon />
                </IconButton>
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
