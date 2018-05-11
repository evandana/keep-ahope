import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import { white } from 'material-ui/styles/colors'

import ContactTypeaheadSearch from 'components/controller/ContactTypeaheadSearch';

import PersonIcon from 'material-ui/svg-icons/social/person';
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline';
import EventNoteIcon from 'material-ui/svg-icons/notification/event-note';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';

// Unused icons; some are good candidates if we need more.
//
// import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
// import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import GroupAddIcon from 'material-ui/svg-icons/social/group-add';
// import GroupIcon from 'material-ui/svg-icons/social/group';
// import PeopleIcon from 'material-ui/svg-icons/social/people';
// import PersonAddIcon from 'material-ui/svg-icons/social/person-add';


import { getImageForEnv } from 'static/images/index'

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.themePalette = this.props.muiTheme.palette;
        this.state = { drawerOpen: false };
    }

    search(event, newVal) {
        window._FIREBASE_DB_.ref('/users/').once('value').then(function(snapshot) {

            Object.keys(snapshot.val()).forEach(key => {
                if (snapshot.val()[key].displayName.startsWith(newVal)){
                    console.log(snapshot.val()[key].displayName);
                }
            });
        });
    }



    handleToggle () {
        // doesn't show nevigation unless logged in.
        const { user } = this.props;
        if (user.uid && user.uid.length > 0) {
            this.setState({drawerOpen: !this.state.drawerOpen});
        }
    }

    getMenuItemHandler (routeName) {
        return function () {
            this.setState({drawerOpen: false});
            this.props.history.push(routeName);
        }.bind(this);
    }

    handleLogout () {
        this.setState({drawerOpen: false});
        this.props.logout();
    }

    render () {
        const { user } = this.props;
        const avatarSize = 60,
            paddingSize = 15,
            drawerWidth = Math.min(450, window.outerWidth * .8);

        return (
            <div>
                <Toolbar style={{backgroundColor: this.themePalette.primary1Color}}>
                    <ToolbarGroup firstChild={true}>
                        <IconButton onTouchTap={this.handleToggle}>
                            <MenuIcon color={white}  />
                        </IconButton>
                        <ContactTypeaheadSearch />

                    </ToolbarGroup>
                </Toolbar>

                <Drawer docked={false} width={drawerWidth} open={this.state.drawerOpen} onRequestChange={() => this.setState({drawerOpen : false})}>
                    <div style={{backgroundColor: this.props.muiTheme.appBar.color, padding: paddingSize }}>
                        <Avatar size={avatarSize} icon={<PersonOutlineIcon/>}/>
                        <div style={{ color: this.props.muiTheme.appBar.textColor, paddingTop: paddingSize, paddingBottom: paddingSize }}>
                            {'Welcome, ' + user.displayName}
                        </div>
                    </div>
                    <MenuItem onTouchTap={this.getMenuItemHandler('/contact')} primaryText='Contact' leftIcon={<PersonIcon/>}/>
                    <MenuItem onTouchTap={this.getMenuItemHandler('/reports')} primaryText='Report' leftIcon={<EventNoteIcon/>}/>
                    <MenuItem onTouchTap={this.handleLogout} primaryText='Logout' leftIcon={<ExitToAppIcon/>}/>
                </Drawer>

            </div>
        );
    }
}

export default muiThemeable()(Navigation);
