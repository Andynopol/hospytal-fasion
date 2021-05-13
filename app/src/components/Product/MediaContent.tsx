import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {

    },
    image: {
        width: '100%',
        height: '100%',
    }
} ) );

interface Props
{
    src: string;
}

const MediaContent: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    const { src } = props;

    return (
        <img
            className={ classes.image }
            src={ src } alt=""
        />
    );
};

export default MediaContent;
