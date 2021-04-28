import React, { useState, useEffect } from 'react';
import { Grid, TextField, FormControlLabel, Button, Checkbox } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { REGISTER_FIRST_NAME, REGISTER_LAST_NAME, REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_RE_PASSWORD, MAIL_FORMAT, SnackBarVariants } from '../../../constants';
import { authentificationAction, snackbarActionManager } from '../../../actions';

const useStyles = makeStyles( ( theme: Theme ) => ( {
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing( 3 ),
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

const Form = ( props: Props ) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    //fields state value binding
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ rePassword, setRePassword ] = useState( '' );

    //fields state warning bindings
    const [ warnings, setWarnings ] = useState( {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        rePassword: false,
    } );

    /**
     * fires on any input change event
     * @param id identifier for each fields state
     * @param value the value that will be stored in the state value
     */
    const onChange = ( id: string, value: string ) =>
    {
        switch ( id )
        {
            case REGISTER_FIRST_NAME:
                setFirstName( value );
                break;
            case REGISTER_LAST_NAME:
                setLastName( value );
                break;
            case REGISTER_EMAIL:
                setEmail( value );
                break;
            case REGISTER_PASSWORD:
                setPassword( value );
                break;
            case REGISTER_RE_PASSWORD:
                setRePassword( value );
                break;
        }
    };

    /**
     * checks all fields state and marks the coresponding input if the value is invalid
     * @returns true if all fields state have valid values
     */

    const checkFields: () => boolean = () =>
    {
        if ( !firstName )
        {
            setWarnings( { ...warnings, firstName: true } );
            return false;
        }
        if ( !lastName )
        {
            setWarnings( { ...warnings, lastName: true } );
            return false;
        }
        if ( !email || !MAIL_FORMAT.test( email ) )
        {
            setWarnings( { ...warnings, email: true } );
            return false;
        }
        if ( password.length < 8 )
        {
            setWarnings( { ...warnings, password: true } );
            return false;
        }
        if ( password !== rePassword )
        {
            setWarnings( { ...warnings, password: true, rePassword: true } );
            return false;
        }
        return true;
    };

    //fires the register request
    const signup = async () =>
    {
        if ( checkFields() )
        {
            const form = new FormData();

            form.append( 'firstName', firstName );
            form.append( 'lastName', lastName );
            form.append( 'email', email );
            form.append( 'password', password );

            dispatch( authentificationAction.register( form, registerSuccess, registerFail ) );
        }
    };

    /**
     * callback function for the authentificationAction.register action
     * @param variant the snackbar variant(a string that determines the color)
     * @param message the message displayed by the snackbar
     */
    const registerSuccess = ( variant: SnackBarVariants, message: string ) =>
    {
        dispatch( snackbarActionManager.show( {
            variant: variant,
            message: message
        } ) );
        history.push( '/' );
    };

    /**
     * callback function for the authentificationAction.register action
     * @param variant the snackbar variant(a string that determines the color)
     * @param message the message displayed by the snackbar
     */
    const registerFail = ( variant: SnackBarVariants, message: string ) =>
    {
        dispatch( snackbarActionManager.show( {
            variant: variant,
            message: message,
        } ) );
    };

    /**
     * similar to onChange, this function removes the warning marking on the input field on focus
     * @param id identifier for each field's state
     */
    const resetStyle = ( id: string ) =>
    {
        switch ( id )
        {
            case REGISTER_FIRST_NAME:
                if ( warnings.firstName )
                {
                    setWarnings( { ...warnings, firstName: false } );
                }
                break;
            case REGISTER_LAST_NAME:
                if ( warnings.lastName )
                    setWarnings( { ...warnings, lastName: false } );
                break;
            case REGISTER_EMAIL:
                if ( warnings.email )
                    setWarnings( { ...warnings, email: false } );
                break;
            case REGISTER_PASSWORD:
                if ( warnings.password )
                    setWarnings( { ...warnings, password: false } );
                break;
            case REGISTER_RE_PASSWORD:
                if ( warnings.rePassword )
                    setWarnings( { ...warnings, rePassword: false } );
                break;
        }
    };

    return (
        <Grid container className={ classes.form }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        className={ warnings.firstName ? classes.alertField : null }
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onFocus={ () => resetStyle( REGISTER_FIRST_NAME ) }
                        onChange={ ( ev ) => onChange( REGISTER_FIRST_NAME, ev.target.value ) }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={ warnings.lastName ? classes.alertField : null }
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onFocus={ () => resetStyle( REGISTER_LAST_NAME ) }
                        onChange={ ( ev ) => onChange( REGISTER_LAST_NAME, ev.target.value ) }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={ warnings.email ? classes.alertField : null }
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onFocus={ () => resetStyle( REGISTER_EMAIL ) }
                        onChange={ ( ev ) => onChange( REGISTER_EMAIL, ev.target.value ) }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={ warnings.password ? classes.alertField : null }
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onFocus={ () => resetStyle( REGISTER_PASSWORD ) }
                        onChange={ ( ev ) => onChange( REGISTER_PASSWORD, ev.target.value ) }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        className={ warnings.rePassword ? classes.alertField : null }
                        name="re-password"
                        label="Re-Password"
                        type="password"
                        onFocus={ () => resetStyle( REGISTER_RE_PASSWORD ) }
                        onChange={ ( ev ) => onChange( REGISTER_RE_PASSWORD, ev.target.value ) }
                    />
                </Grid>
                {/* <Grid item xs={ 12 }>
                    <FormControlLabel
                        control={ <Checkbox value="allowExtraEmails" color="primary" /> }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid> */}
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ classes.submit }
                onClick={ signup }
            >
                Sign Up
                    </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link to="/login" className={ classes.Link }>
                        Already have an account? Sign in
                            </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;
