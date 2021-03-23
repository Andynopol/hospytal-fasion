import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Account from './Account';
import Logo from './Logo';
import NavMenu from './NavMenu';
import DrowerMenuButton from './DrowerMenuButton';
import DrowerMenu from './DrowerMenu';
import Spacer from './Spacer';


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

const ButtonAppBar: React.FC<Props> = ( props: Props ) =>
{
  const classes = useStyles();
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