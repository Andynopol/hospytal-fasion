import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { authentificationAction } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

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
  home = '/',
  accout = '/account',
}


const useStyles = makeStyles( ( theme: Theme ) => ( {
  icon: {
    color: '#fafafa',
  },
  Link: {
    textDecoration: 'none',
    color: '#000',
  },
  avatar: {
    width: theme.spacing( 3 ),
    height: theme.spacing( 3 ),
  }
} ) );



const ITEM_HEIGHT = 48;


const LongMenu: React.FC = () =>
{

  //brute force login state
  const profile = useSelector( ( state: any ) => state.profile );
  const dispatch = useDispatch();
  const history = useHistory();

  //@account menu items
  const options: OptionsInterface = profile ?
    [ [ OptionsNames.accout, OptionsLinks.accout ], [ OptionsNames.logout, OptionsLinks.home ] ] :
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
    menuItemClick( event );
  };

  // @brute force login
  // const sinteticalLogin = ( event: any ) =>
  // {
  //   switch ( event.target.innerText )
  //   {
  //     case 'Login':
  //       history
  //       break;
  //     case 'Logout':
  //       dispatch( authentificationAction.logout() );
  //       break;
  //   }
  // };

  const menuItemClick = ( event: any ) =>
  {
    switch ( event.target.innerText )
    {
      case OptionsNames.login:
        history.push( OptionsLinks.login );
        break;
      case OptionsNames.signup:
        history.push( OptionsLinks.signup );
        break;
      case OptionsNames.logout:
        dispatch( authentificationAction.logout() );
        history.push( OptionsLinks.home );
        break;
      case OptionsNames.accout:
        history.push( OptionsLinks.accout );
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
        { profile && profile.icon ? <Avatar className={ classes.avatar } src={ profile.icon } /> : <AccountCircleIcon className={ classes.icon } /> }
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
          <MenuItem value={ option[ 0 ] } selected={ option[ 0 ] === 'Pyxis' } onClick={ handleAccountMenuClick } key={ option[ 0 ] }>
            { option[ 0 ] }
          </MenuItem>
        ) ) }
      </StyledMenu>
    </div>
  );
};

export default LongMenu;