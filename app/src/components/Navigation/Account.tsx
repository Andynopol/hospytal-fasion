import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';

interface StyleMenuProps
{
  id: string;
  anchorEl: any;
  keepMounted: any;
  open: boolean;
  onClose: () => void;
  PaperProps: {};

}

const useStyles = makeStyles( ( theme ) => ( {
  icon: {
    color: '#fafafa',
  }
} ) );

const options = [
  'Tube',
  'Cams'
];

const ITEM_HEIGHT = 48;

const LongMenu: React.FC = () =>
{
  const [ anchorEl, setAnchorEl ] = React.useState( null );
  const open = Boolean( anchorEl );

  const classes = useStyles();

  const handleClick = ( event: any ) =>
  {
    console.log( typeof event.currentTarget );
    setAnchorEl( event.currentTarget );
  };

  const handleClose = () =>
  {
    setAnchorEl( null );
  };

  const StyledMenu = withStyles( {
    paper: {
      border: '1px solid #d3d4d5',
    },
  } )( ( props: StyleMenuProps ) => (
    <Menu
      elevation={ 0 }
      getContentAnchorEl={ null }
      anchorOrigin={ {
        vertical: 'bottom',
        horizontal: 'center',
      } }
      transformOrigin={ {
        vertical: 'top',
        horizontal: 'center',
      } }
      open={ false }
      { ...props }
    />
  ) );

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={ handleClick }
      >
        <AccountCircleIcon className={ classes.icon } />
      </IconButton>
      <StyledMenu
        id="long-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ open }
        onClose={ handleClose }
        PaperProps={ {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        } }
      >
        { options.map( ( option ) => (
          <MenuItem key={ option } selected={ option === 'Pyxis' } onClick={ handleClose }>
            {option }
          </MenuItem>
        ) ) }
      </StyledMenu>
    </div>
  );
};

export default LongMenu;