import React from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';       
import { Button, CssBaseline, makeStyles, useTheme, AppBar, Toolbar, ListItemIcon,  IconButton, Divider, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import Folder from '@material-ui/icons/FolderOpenOutlined';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RecyleBin from '@material-ui/icons/DeleteForever'; 
import NoteIcon from '@material-ui/icons/Note'; 
import DrawIcon from '@material-ui/icons/ImageAspectRatio'


const drawerWidth = 240;  




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }, 

    button: {
        margin: theme.spacing(2)
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        })
    }, 

    menuButton: {
        marginRight: theme.spacing(2),
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
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },

    contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))




const HomePage  = () => {
    const classes = useStyles(); 
    const theme = useTheme(); 
    const [open, setOpen ] = React.useState(false)

    const handleDrawerOpen = () => {
        console.log('drawer Tab')
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar  position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} >
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap> Tuso </Typography>
                    <Link to="/note">
                        <Button className={classes.button} variant="contained"  color="primary" endIcon={<NoteIcon />}>Note</Button>
                    </Link>
                    <Link to="/sketch">
                        <Button variant="contained" color="primary" endIcon={<DrawIcon/>}>Diagram</Button>
                    </Link>  
            </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{
                paper: classes.drawerPaper,
                }}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        { theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                    <Divider />
                    <List>
                        {['Folder', 'Recycle'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <Folder /> :  <RecyleBin />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
            </Drawer>
            <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
                <div className={classes.drawerHeader}>
                    <Typography style={{ marginTop: 200, marginRight: 500, color: 'red'}}>
                        SHOW ALL DONE PROJECT
                    </Typography>
                </div>
            </main>
        </div>
    )
}


export default HomePage; 