import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
    Grid,
    Card,
    Avatar,
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
// import ShareIcon from '@material-ui/icons/Share';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
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
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

interface Props {
    name: string;
    description?: string;
    details?: string;
    promotion?: string | number;
    price: number;
    currency: string[];
    piecesLeft?: number;
    src?: string;
}

const ProductCard = (props: Props) => {

    const isLogged = useSelector((state: any) => state.isLogged);
    const classes = useStyles();
    const { name, description, details, promotion, price, currency, piecesLeft, src } = props;
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={`${price} ${currency[0]}`}
            />
            <CardMedia
                className={classes.media}
                children={<CropOriginalIcon />}
                image={src}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {isLogged ?
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton> :
                    null}
                <IconButton aria-label="share">
                    <ShoppingCartSharpIcon />
                </IconButton>
                {details ?
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> : null}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {details}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ProductCard;
