import React, { useState, useEffect } from 'react';
import { TextField, FormControlLabel, Button, Grid, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import Icon from "./GoogleIcon";
import { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_REMEMBER } from '../../constants';

import { authentificationAction } from '../../../actions';


import { snackbarActionManager } from '../../../actions';
import { MAIL_FORMAT } from '../../constants';


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
    Link: {
        textDecoration: 'none',
        color: '#1976d2',
        "&:hover, &:focus": {
            textDecoration: 'underline',
        }
    },
    googleButton: {

    },
    alertField: {
        '&>label': {
            color: 'red'
        },
        '& fieldset': {
            borderColor: 'red'
        }
    },
} ) );
interface Props
{

}

const From = ( props: Props ) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ rememberMe, setRememberMe ] = useState( false );
    const [ emailWarning, setEmailWarning ] = useState( false );
    const [ passwordWarning, setPasswordWarning ] = useState( false );

    // useEffect( () =>
    // {
    //     console.log( email );
    //     console.log( password );
    //     console.log( rememberMe );
    // }, [ email, password, rememberMe ] );

    const googleSuccess = async ( res: any ) =>
    {
        console.log( res );
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log( result );
        console.log( token );


        try
        {
            dispatch( { type: 'LOGIN', payload: { result, token } } );

            history.push( '/' );
        } catch ( error )
        {
            console.log( error );
        }

    };

    const googleError = ( error: any ) =>
    {
        console.log( error );
    };

    const checkFields = () =>
    {
        if ( !MAIL_FORMAT.test( email ) )
        {
            setEmailWarning( true );
            dispatch( snackbarActionManager.show( { message: 'Email adress invalid', variant: "warning" } ) );
            return false;
        }
        if ( password.length < 8 )
        {
            setPasswordWarning( true );
            dispatch( snackbarActionManager.show( { message: 'Password needs to have at least 8 characters', variant: "warning" } ) );
            return false;
        }
        return true;
    };

    const login = async () =>
    {
        if ( !checkFields() )
        {
            return;
        }
        const form = new FormData();
        form.append( 'email', email );
        form.append( 'passowrd', password );
        form.append( 'rememberMe', rememberMe.toString() );


        console.log( form.get( 'email' ) );
        console.log( form.get( 'passowrd' ) );
        console.log( form.get( 'rememberMe' ) );
        console.log( form );

        // dispatch( authentificationAction.login( form ) );
        const response = await ( await fetch( '/user/login', { method: 'POST', body: form } ) ).json();
        console.log( response );


    };

    const onChange = ( id: string, value: string | boolean ) =>
    {
        switch ( id )
        {
            case LOGIN_EMAIL:
                if ( typeof value === 'string' )
                    setEmail( value );
                break;
            case LOGIN_PASSWORD:
                if ( typeof value === 'string' )
                    setPassword( value );
                break;
            case LOGIN_REMEMBER:
                if ( typeof value === 'boolean' )
                    setRememberMe( value );
                break;
        }
    };

    return (
        <div className={ classes.form }>
            <TextField
                className={ emailWarning ? classes.alertField : null }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ ( ev ) => onChange( LOGIN_EMAIL, ev.target.value ) }
                onFocus={ () => { if ( emailWarning ) setEmailWarning( false ); } }
            />
            <TextField
                className={ passwordWarning ? classes.alertField : null }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={ ( ev ) => onChange( LOGIN_PASSWORD, ev.target.value ) }
                onFocus={ () => { if ( passwordWarning ) setPasswordWarning( false ); } }
            />
            <FormControlLabel
                control={
                    <Checkbox value="remember" color="primary" onChange={ ( ev ) => onChange( LOGIN_REMEMBER, ev.target.checked ) } />
                }
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ classes.submit }
                onClick={ login }
            >
                Sign In
            </Button>


            <GoogleLogin
                clientId="168208016917-nqhlde2rhcavae7jkvje20jvpeho1v56.apps.googleusercontent.com"
                render={ ( renderProps ) => (
                    <Button className={ classes.googleButton } color="primary" fullWidth onClick={ renderProps.onClick } disabled={ renderProps.disabled } startIcon={ <Icon /> } variant="contained">
                        Google Sign In
                    </Button>
                ) }
                onSuccess={ googleSuccess }
                onFailure={ googleError }
                cookiePolicy="single_host_origin"
            />

            <Grid container>
                <Grid item xs>
                    <Link to="/" className={ classes.Link }>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/register" className={ classes.Link }>
                        { "Don't have an account? Sign Up" }
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default From;
