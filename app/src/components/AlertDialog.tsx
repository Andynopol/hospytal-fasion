import React, { useState, Dispatch, SetStateAction } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props
{
    title: string,
    content: string,
    yes: ( ev: any ) => void;
    no?: () => void | null;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}


const AlertDialog: React.FC<Props> = ( props: Props ) =>
{
    // const [ open, setOpen ] = useState( false );

    const { title, content, yes, no, open, setOpen } = props;

    // const handleClickOpen = () =>
    // {
    //     setOpen( true );
    // };

    const handleClose = () =>
    {
        setOpen( false );
    };

    return (
        <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { content }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ no ? () => { no(); handleClose(); } : handleClose } color="primary">
                    No
          </Button>
                <Button onClick={ yes ? ( ev ) => { yes( ev ); handleClose(); } : handleClose } color="primary" autoFocus>
                    Yes
          </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;