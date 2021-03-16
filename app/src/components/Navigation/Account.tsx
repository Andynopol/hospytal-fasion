import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { authentificationAction } from '../../actions';

interface StyleMenuProps
{
  id: string;
  anchorEl: any;
  keepMounted: any;
  open: boolean;
  onClose: () => void;
  PaperProps: {};

}

type OptionsInterface = [ string, string ];

const useStyles = makeStyles( ( theme ) => ( {
  icon: {
    color: '#fafafa',
  }
} ) );



const ITEM_HEIGHT = 48;


const LongMenu: React.FC = () =>
{

  const isLogged = useSelector( ( state: any ) => state.isLogged );
  const dispatch = useDispatch();

  const options: OptionsInterface = isLogged ? [ 'Account', 'Logout' ] : [ 'Login', 'Sign up' ];

  const [ anchorEl, setAnchorEl ] = React.useState( null );
  const open = Boolean( anchorEl );

  const classes = useStyles();

  const handleClick = ( event: any ) =>
  {
    setAnchorEl( event.currentTarget );
  };


  const handleAccountMenuClick = ( event: any ) =>
  {
    handleClose();
    // switch ( event.target.innerText )
    // {
    //   case 'Login':
    //     dispatch( authentificationAction.login() );
    //     break;
    //   case 'Logout':
    //     dispatch( authentificationAction.logout() );
    //     break;
    // }
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
          <MenuItem value={ option } key={ option } selected={ option === 'Pyxis' } onClick={ handleAccountMenuClick }>
            {option }
          </MenuItem>
        ) ) }
      </StyledMenu>
    </div>
  );
};

export default LongMenu;