import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Account from './AccountButton';
import Logo from './Logo';
import NavMenu from './NavMenu';
import DrowerMenuButton from './DrowerMenuButton';
import DrowerMenu from './DrowerMenu';
import Spacer from './Spacer';
import { authentificationAction } from '../../actions';


const useStyles = makeStyles( ( theme ) => ( {
  relative: {
    position: 'relative',
    [ theme.breakpoints.up( 'lg' ) ]: {
      minHeight: '48px'
    },
  },
  grow: {
    flexGrow: 1,
  },
  growMobile: {
    display: 'flex',
    [ theme.breakpoints.up( 'lg' ) ]: {
      display: 'none',
    },
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing( 2 ),
  },

  sectionDesktop: {
    display: 'none',
    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [ theme.breakpoints.up( 'md' ) ]: {
      display: 'none',
    },
  },
  invisible: {
    display: 'none',
  }
} ) );

const GoldAppBar = withStyles( ( theme ) => ( {
  root: {
    color: '#fafafa',
    backgroundColor: '#02203c',
    boxShadow: 'none',
  },
} ) )( AppBar );

interface Props
{
  isVisible: boolean;
}

//@entrypoint of the navbar component 
const ButtonAppBar: React.FC<Props> = ( props: Props ) =>
{
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isVisible } = props;
  const [ open, setOpen ] = React.useState( false );

  const handleDrawerOpen = () =>
  {
    setOpen( true );
  };

  const handleDrawerClose = () =>
  {
    setOpen( false );
  };

  const logout = () =>
  {
    dispatch( authentificationAction.logout() );
    history.push( '/auth' );
  };


  //sets the profile golbat state to the user if a profile is saved in local storage and the token has not expired
  useEffect( () =>
  {
    if ( localStorage.getItem( 'profile' ) )
    {
      const profile = JSON.parse( localStorage.getItem( 'profile' ) );
      const token = profile?.token;
      if ( token )
      {
        const decodedToken: any = decode( token );

        if ( decodedToken.exp * 1000 < new Date().getTime() ) logout();
        dispatch( authentificationAction.relog( profile.result ) );
      }

    }
  }, [ location ] );

  return (
    <div className={ isVisible ? '' : classes.invisible } color="primary">
      <GoldAppBar position="sticky">
        <Toolbar className={ classes.relative }>
          <DrowerMenuButton open={ open } drowerOpen={ handleDrawerOpen } />
          <Logo />
          <NavMenu />
          <Spacer />
          <Account />
        </Toolbar>
        <DrowerMenu open={ open } closeMenu={ handleDrawerClose } />
      </GoldAppBar>
    </div >
  );
};

export default ButtonAppBar;