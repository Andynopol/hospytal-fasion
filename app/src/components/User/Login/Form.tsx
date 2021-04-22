import React from 'react';
import { TextField, FormControlLabel, Button, Grid, Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import Icon from "./GoogleIcon";


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

    }
} ) );
interface Props
{

}

const From = ( props: Props ) =>
{

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

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

    return (
        <div className={ classes.form }>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={ <Checkbox value="remember" color="primary" /> }
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={ classes.submit }
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

            {/* <GoogleLogin
                clientId="168208016917-nqhlde2rhcavae7jkvje20jvpeho1v56.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={ googleSuccess }
                onFailure={ googleError }
                cookiePolicy={ 'single_host_origin' }
            /> */}

            {/* <GoogleLogin
                clientId={ "168208016917-nqhlde2rhcavae7jkvje20jvpeho1v56.apps.googleusercontent.com" }
                buttonText='Login'
                onSuccess={ googleSuccess }
                onFailure={ googleSuccess }
                cookiePolicy={ 'single_host_origin' }
                responseType='code,token'
                render={ renderProps => (
                    <Button className={ classes.googleButton } color="primary" fullWidth onClick={ renderProps.onClick } disabled={ renderProps.disabled } startIcon={ <Icon /> } variant="contained">
                        Google Sign In
                    </Button> ) }
            /> */}



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
