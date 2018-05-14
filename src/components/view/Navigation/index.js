import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar'
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';

import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import EventNoteIcon from 'material-ui/svg-icons/notification/event-note';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import PersonIcon from 'material-ui/svg-icons/social/person';
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline';

// Unused icons; some are good candidates if we need more.
//
// import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
// import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
// import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
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
        this.state = { drawerOpen: false };
    }

    handleToggle () {
        // doesn't show navigation unless logged in.
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
        const { user, muiTheme } = this.props;

        const avatarSize = 60,
            paddingSize = 15,
            drawerWidth = Math.min(450, window.outerWidth * .8);

        return (
            <div>
                <AppBar onLeftIconButtonTouchTap={this.handleToggle} title={'Welcome, ' + user.displayName}>
                </AppBar>
                <Drawer docked={false} width={drawerWidth} open={this.state.drawerOpen} onRequestChange={() => this.setState({drawerOpen : false})}>
                    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <div style={{backgroundColor: muiTheme.palette.primary1Color, padding: paddingSize }}>
                            <Avatar size={avatarSize} icon={<PersonOutlineIcon/>}/>
                            <MenuItem
                                style={{ color: muiTheme.palette.alternateTextColor, paddingTop: paddingSize }}
                                primaryText={user.email}
                                rightIcon={<ArrowDownIcon color={muiTheme.palette.alternateTextColor}/>}
                            />
                        </div>
                        <MenuItem onTouchTap={this.getMenuItemHandler('/contact')} primaryText='Contact' leftIcon={<PersonIcon/>}/>
                        <MenuItem onTouchTap={this.getMenuItemHandler('/reports')} primaryText='Report' leftIcon={<EventNoteIcon/>}/>
                        <div style={{marginTop: 'auto'}}>
                            <MenuItem
                                onTouchTap={this.handleLogout}
                                primaryText='Logout'
                                leftIcon={<ExitToAppIcon/>}
                            />
                        </div>
                        </div>
                </Drawer>
            </div>
        );
    }
}

export default muiThemeable()(Navigation);
