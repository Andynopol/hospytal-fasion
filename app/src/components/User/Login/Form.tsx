import React, { useState } from 'react';
import { TextField, FormControlLabel, Button, Grid, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import Icon from "../GoogleIcon";
import { LOGIN_EMAIL, LOGIN_PASSWORD, LOGIN_REMEMBER, SnackBarVariants, MAIL_FORMAT } from '../../../constants';
import { authentificationAction, snackbarActionManager } from '../../../actions';


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

const From: React.FC<Props> = ( props: Props ) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ rememberMe, setRememberMe ] = useState( false );
    const [ warnings, setWarnings ] = useState( { email: false, password: false } );


    // the success google login callback
    const googleSuccess = async ( res: any ) =>
    {
        const result = res?.profileObj;
        const token = res?.tokenId;

        localStorage.setItem( "profile", JSON.stringify( { result: null, token } ) );

        const form = new FormData();

        form.append( 'email', result.email );
        form.append( 'password', result.googleId );
        form.append( 'firstName', result?.givenName );
        form.append( 'lastName', result?.familyName );
        form.append( 'icon', result?.imageUrl );

        dispatch( authentificationAction.googleLogin( form, successLogin, failedLogin ) );

    };

    // the fail google login callback
    const googleError = ( error: any ) =>
    {
        dispatch( snackbarActionManager.show( { variant: SnackBarVariants.fail, message: error.message } ) );
        console.log( error );
    };

    /**
     * checks all fields state and marks the coresponding input if the value is invalid
     * @returns true if all fields state have valid values
     */
    const checkFields: () => boolean = () =>
    {
        if ( !email || !MAIL_FORMAT.test( email ) )
        {
            setWarnings( { ...warnings, email: true } );
            dispatch( snackbarActionManager.show( { message: 'Email adress invalid', variant: SnackBarVariants.warning } ) );
            return false;
        }
        if ( password.length < 8 )
        {

            setWarnings( { ...warnings, password: true } );
            dispatch( snackbarActionManager.show( { message: 'Password needs to have at least 8 characters', variant: SnackBarVariants.warning } ) );
            return false;
        }
        return true;
    };

    /**
     * callback function for the authentificationAction.login action
     * @param variant the snackbar variant(a string that determines the color)
     * @param message the message displayed by the snackbar
     */
    const successLogin = ( variant: SnackBarVariants, message: string ) =>
    {
        dispatch( snackbarActionManager.show( {
            variant: variant,
            message: message
        } ) );
        history.push( '/' );
    };

    /**
     * callback function for the authentificationAction.login action
     * @param variant the snackbar variant(a string that determines the color)
     * @param message the message displayed by the snackbar
     */
    const failedLogin = ( variant: SnackBarVariants, message: string ) =>
    {
        dispatch( snackbarActionManager.show( {
            variant: variant,
            message: message
        } ) );

        setWarnings( { email: true, password: true } );
    };

    // fires the login request
    const login = () =>
    {
        if ( !checkFields() )
        {
            return;
        }
        const form = new FormData();
        form.append( 'email', email );
        form.append( 'password', password );
        form.append( 'rememberMe', rememberMe.toString() );


        dispatch( authentificationAction.login( form, successLogin, failedLogin ) );



    };

    /**
     * fires on any input change event
     * @param id identifier for each field's state
     * @param value the value that will be stored in the state value
     */
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
                className={ warnings.email ? classes.alertField : null }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={ ( ev ) => onChange( LOGIN_EMAIL, ev.target.value ) }
                onFocus={ () => { if ( warnings.email ) setWarnings( { ...warnings, email: false } ); } }
            />
            <TextField
                className={ warnings.password ? classes.alertField : null }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={ ( ev ) => onChange( LOGIN_PASSWORD, ev.target.value ) }
                onFocus={ () => { if ( warnings.password ) setWarnings( { ...warnings, password: false } ); } }
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
