import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


const drawerWidth = 240;



const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create( [ 'margin', 'width' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        } ),
    },
    appBarShift: {
        width: `calc(100% - ${ drawerWidth }px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create( [ 'margin', 'width' ], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
    },
    menuButton: {
        marginRight: theme.spacing( 2 ),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing( 0, 1 ),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing( 3 ),
        transition: theme.transitions.create( 'margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        } ),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create( 'margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        } ),
        marginLeft: 0,
    },
    Link: {
        color: '#262626',
        textDecoration: 'none',
        userSelect: 'none'
    }
} ) );

//@valid:mobile only / @params: open = state of open/close of the side menu() / closeMenu = closing the menu()
interface Props
{
    open: boolean;
    closeMenu: () => void;
}


// @menu that apears on mobile
const DrowerMenu: React.FC<Props> = ( props: Props ) =>
{
    const classes = useStyles();
    const theme = useTheme();
    const { open, closeMenu } = props;
    return (
        <Drawer
            className={ classes.drawer }
            variant="persistent"
            anchor="left"
            open={ open }
            classes={ {
                paper: classes.drawerPaper,
            } }
        >
            <div className={ classes.drawerHeader }>
                <IconButton onClick={ closeMenu }>
                    { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                </IconButton>
            </div>
            <Divider />
            <List>
                { [ 'Home', 'Add Product' ].map( ( text ) =>
                {
                    let path = '';
                    switch ( text )
                    {
                        case 'Home':
                            path = '/';
                            break;
                        case 'Add Product':
                            path = '/admin/add-product';
                            break;
                        default: {
                            path = '/nothing';
                        }
                    }
                    return (
                        <Link className={ classes.Link } to={ path } key={ text } onClick={ closeMenu }>
                            <ListItem button key={ text }>
                                <ListItemText primary={ text } />
                            </ListItem>
                        </Link>
                    );
                } ) }
            </List>
            <Divider />
            <List>
                { [ 'Send mail', 'Account' ].map( ( text ) => (
                    <ListItem button key={ text } onClick={ closeMenu }>
                        <ListItemText primary={ text } />
                    </ListItem>
                ) ) }
            </List>
        </Drawer>
    );
};

export default DrowerMenu;