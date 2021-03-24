import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { authentificationAction } from '../../actions';
import { Link } from 'react-router-dom';

interface StyleMenuProps
{
  id: string;
  anchorEl: any;
  keepMounted: any;
  open: boolean;
  onClose: () => void;
  PaperProps: {};

}

type OptionsInterface = [ string, string ][];

enum OptionsNames
{
  login = "Login",
  signup = "Sign up",
  logout = "Logout",
  accout = "Account"
}

enum OptionsLinks
{
  login = '/login',
  signup = '/register',
  logout = '/home',
  accout = '/account',
}


const useStyles = makeStyles( ( theme ) => ( {
  icon: {
    color: '#fafafa',
  },
  Link: {
    textDecoration: 'none',
    color: '#000',
  }
} ) );



const ITEM_HEIGHT = 48;


const LongMenu: React.FC = () =>
{

  //brute force login state
  const isLogged = useSelector( ( state: any ) => state.isLogged );
  const dispatch = useDispatch();

  //@account menu items
  const options: OptionsInterface = isLogged ?
    [ [ OptionsNames.accout, OptionsLinks.accout ], [ OptionsNames.logout, OptionsLinks.logout ] ] :
    [ [ OptionsNames.login, OptionsLinks.login ], [ OptionsNames.signup, OptionsLinks.signup ] ];

  const [ anchorEl, setAnchorEl ] = React.useState( null );
  const open = Boolean( anchorEl );

  const classes = useStyles();

  const handleAccoutClick = ( event: any ) =>
  {
    setAnchorEl( event.currentTarget );
  };


  const handleAccountMenuClick = ( event: any ) =>
  {
    handleAccountClose();
    // sinteticalLogin(event);
  };

  // @brute force login
  const sinteticalLogin = ( event: any ) =>
  {
    switch ( event.target.innerText )
    {
      case 'Login':
        dispatch( authentificationAction.login() );
        break;
      case 'Logout':
        dispatch( authentificationAction.logout() );
        break;
    }
  };

  const handleAccountClose = () =>
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
        onClick={ handleAccoutClick }
      >
        <AccountCircleIcon className={ classes.icon } />
      </IconButton>
      <StyledMenu
        id="long-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ open }
        onClose={ handleAccountClose }
        PaperProps={ {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        } }
      >
        { options.map( ( option ) => (
          <Link to={ option[ 1 ] } key={ option[ 0 ] } className={ classes.Link }>
            <MenuItem value={ option[ 0 ] } selected={ option[ 0 ] === 'Pyxis' } onClick={ handleAccountMenuClick }>
              { option[ 0 ] }
            </MenuItem>
          </Link>
        ) ) }
      </StyledMenu>
    </div>
  );
};

export default LongMenu;