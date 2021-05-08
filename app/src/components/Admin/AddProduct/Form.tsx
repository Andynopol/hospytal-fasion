import React from 'react';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';


import { FieldSelector, NoSrcAlert } from '../../../constants';


const useStyles = makeStyles( ( theme: Theme ) => ( {
    root: {
        paddingTop: '2em',
        [ theme.breakpoints.up( 'md' ) ]: {
            paddingTop: 0,
        }
    },
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
    },
    alertField: {
        '&>label': {
            color: 'red'
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid red'
        }
    },
    activeButton: {
        color: 'rgba( 0, 0, 0, 1 ) !important'
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
    removeImage: () => void;
    change: ( target: ( HTMLInputElement | HTMLTextAreaElement ), id: FieldSelector ) => void;
    clear: () => void;
    send: ( ev: any ) => void;

    //fields checkers
    fieldWarnings: { name: boolean, price: boolean, description: boolean; };
    checkFields: () => boolean;

    //dialog props

    openDialog: ( title: string, content: string ) => void;
}

const Form: React.FC<Props> = ( props: Props ) =>
{
    const { name,
        description,
        details,
        promotion,
        pieces,
        price,
        change,
        clear,
        send,
        fieldWarnings,
        src,
        openDialog,
        checkFields,
        removeImage,
    } = props;

    const classes = useStyles();



    return (
        <Grid container className={ classes.root } spacing={ 1 } justify="center">
            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ `${ classes.textField } ${ fieldWarnings.name ? classes.alertField : '' }` }
                    label="Name*"
                    type="text"
                    value={ name }
                    onChange={ ev => change( ev.target, FieldSelector.name ) }
                />
            </Grid>
            <Grid item xs={ 12 } md={ 6 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ `${ classes.textField } ${ fieldWarnings.price ? classes.alertField : '' }` }
                    label="Price*(RON)"
                    type="number"
                    InputLabelProps={ {
                        shrink: true,
                    } }
                    value={ price }
                    onFocus={ ( ev ) => ev.target.select() }
                    onChange={ ev => change( ev.target, FieldSelector.price ) }
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
                    onChange={ ev => change( ev.target, FieldSelector.prom ) }
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
                    onChange={ ev => change( ev.target, FieldSelector.stock ) }
                />
            </Grid>


            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ `${ classes.textField } ${ fieldWarnings.description ? classes.alertField : '' }` }
                    label="Description*"
                    value={ description }
                    onChange={ ev => change( ev.target, FieldSelector.desc ) }
                    rows={ 3 }
                    multiline
                />
            </Grid>

            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <TextField
                    className={ classes.textField }
                    label="Details"
                    value={ details }
                    onChange={ ev => change( ev.target, FieldSelector.details ) }
                    rows={ 3 }
                    multiline
                />
            </Grid>

            <Grid item xs={ 12 } className={ classes.textFieldWrapper }>
                <Grid container spacing={ 1 } justify="center">
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Select File
                            <input
                            type="file"
                            accept="image/*"
                            onChange={ ev => change( ev.target, FieldSelector.src ) }
                            hidden
                        />
                    </Button>
                    <IconButton disabled={ src ? false : true } onClick={ removeImage } className={ `${ src ? classes.activeButton : '' }` }>
                        <BrokenImageIcon />
                    </IconButton>

                </Grid>

            </Grid>

            <Grid container>
                <Grid item xs={ 6 } className={ classes.buttonWrapper }>
                    <Button
                        variant="contained"
                        color="primary"
                        className={ classes.button }
                        startIcon={ <PublishIcon /> }
                        onClick={ ( ev ) =>
                        {
                            if ( checkFields() )
                            {
                                if ( src ) { send( ev ); }
                                else { openDialog( NoSrcAlert.title, NoSrcAlert.content ); }
                            }

                        } }
                    >
                        Upload
                    </Button>
                </Grid>

                <Grid item xs={ 6 } className={ classes.buttonWrapper }>
                    <Button
                        variant="contained"
                        color="default"
                        className={ classes.button }
                        startIcon={ <DeleteIcon /> }
                        onClick={ clear }
                    >
                        Clear
                    </Button>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;
