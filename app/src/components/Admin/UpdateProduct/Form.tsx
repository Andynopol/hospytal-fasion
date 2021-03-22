import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    textFieldWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    textField: {
        width: '95%',
        [ theme.breakpoints.up( 'md' ) ]: {
            width: '100%'
        }
    },
    button: {
        margin: theme.spacing( 1 ),
        width: 200
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
    }
} ) );

interface Props
{
    name: string;
    description: string;
    details: string;
    promotion: string | number;
    price: number;
    pieces: number;
    src: string;
    change: ( ev: any, id: 'NAME' | 'DESCRIPTION' | 'DETAILS' | 'PROMOTION' | 'PIECES' | 'PRICE' | 'SRC', forced?: boolean ) => void;
    reset: () => void;
    send: ( ev: any ) => void;

}

const Form = ( props: Props ) =>
{
    const { name, description, details, promotion, pieces, price, change, reset, send } = props;

    const classes = useStyles();


    const setSrc = ( file: any ) =>
    {
        const reader = new FileReader();
        if ( file )
        {
            reader.readAsDataURL( file );
            reader.onload = () =>
            {
                const base64 = reader.result;
                change( base64, "SRC", true );
            };

        }
    };


    return (
        <Grid container spacing={ 1 } justify="center">
            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Name"
                    type="text"
                    value={ name }
                    onChange={ ev => change( ev, 'NAME' ) }
                />
            </Grid>
            <Grid item xs={ 12 } md={ 6 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Price(RON)"
                    type="number"
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    value={ price }
                    onFocus={ ( ev ) => ev.target.select() }
                    onChange={ ev => change( ev, 'PRICE' ) }
                />
            </Grid>

            <Grid item xs={ 12 } md={ 6 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Promotion(%)"
                    type="number"
                    value={ promotion }
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    onFocus={ ( ev ) => ev.target.select() }
                    onChange={ ev => change( ev, 'PROMOTION' ) }
                />
            </Grid>

            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Pieces"
                    type="number"
                    value={ pieces }
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    onFocus={ ( ev ) => ev.target.select() }
                    onChange={ ev => change( ev, 'PIECES' ) }
                />
            </Grid>


            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Description"
                    value={ description }
                    onChange={ ev => change( ev, 'DESCRIPTION' ) }
                    rows={ 3 }
                    multiline
                />
            </Grid>

            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Details"
                    value={ details }
                    onChange={ ev => change( ev, 'DETAILS' ) }
                    rows={ 3 }
                    multiline
                />
            </Grid>

            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                {/* <TextField
                    className={ classes.textField }
                    label="Image"
                    type="text"
                    value={ src }
                    onChange={ ev => change( ev, 'SRC' ) }
                /> */}

                <Button
                    variant="contained"
                    component="label"
                >
                    Select File
                    <input
                        type="file"
                        accept="image/*"
                        onChange={ ev => setSrc( ev.target.files[ 0 ] ) }
                        hidden
                    />
                </Button>
            </Grid>

            <Grid container>
                <Grid item xs={ 6 } className={ classes.buttonWrapper }>
                    <Button
                        variant="contained"
                        color="primary"
                        className={ classes.button }
                        startIcon={ <SaveIcon /> }
                        onClick={ ( ev ) => { send( ev ); } }
                    >
                        Save
                    </Button>
                </Grid>

                <Grid item xs={ 6 } className={ classes.buttonWrapper }>
                    <Button
                        variant="contained"
                        color="default"
                        className={ classes.button }
                        startIcon={ <RestoreRoundedIcon /> }
                        onClick={ reset }
                    >
                        Reset
                    </Button>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;
