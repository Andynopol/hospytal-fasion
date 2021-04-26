import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Form from './Form';

const useStyles = makeStyles( ( theme ) => ( {
    paper: {
        marginTop: theme.spacing( 8 ),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing( 1 ),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing( 1 ),
    },
    submit: {
        margin: theme.spacing( 3, 0, 2 ),
    },
} ) );

interface Props
{

}

const SignIn = ( props: Props ) =>
{
    const classes = useStyles();
    const user = useSelector( ( state: any ) => state.profile );
    const history = useHistory();

    useEffect( () =>
    {
        if ( user )
        {
            history.goBack();
        }
    }, [] );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={ classes.paper }>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Form />
            </div>
        </Container>
    );
};

export default SignIn;