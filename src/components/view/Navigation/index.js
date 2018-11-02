import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import ArrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ContactTypeaheadSearch from 'components/controller/ContactTypeaheadSearch';
import EventNoteIcon from 'material-ui/svg-icons/notification/event-note';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline';
import PersonIcon from 'material-ui/svg-icons/social/person';

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.setCurrentSearchQuery = props.setCurrentSearchQuery.bind(this);
        this.state = { drawerOpen: false };

        console.log('search query', props.match.params.uid)
        this.setCurrentSearchQuery(props.match.params.uid);
        props.getContact(props.match.params.uid); // TODO: make sure this isn't called too often
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

    displayForAppBarTitle({match, location}) {
        const path = location.pathname;

        console.log('path', path);
        // TODO: see https://github.com/ReactTraining/react-router/issues/5870
        // so that we can use match instead of includes
        if(path.startsWith('/contact')) {
            if(path.includes('/intake') || path.includes('/info')) {

                return (<ContactTypeaheadSearch/>);
            }
            return (<ContactTypeaheadSearch/>);
        }  else if (path.startsWith('/reports')) {
            return 'Reports';
        } else if (path === '/') {
            return (<ContactTypeaheadSearch/>);
        }
    };

    displayContactSearchEditButton() {
        if(this.props.location.pathname.includes('/intake') || this.props.location.pathname.includes('info')){
            return true;
        }
        return false;
    }

    render () {
        const { user, muiTheme, match, location } = this.props;

        const avatarSize = 60,
            paddingSize = 15,
            drawerWidth = Math.min(450, window.outerWidth * .8);

        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleToggle}
                    title={this.displayForAppBarTitle({match, location})}
                    titleStyle={{
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem',
                        height: 'auto' //override
                    }}
                />
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
                        <MenuItem onTouchTap={this.getMenuItemHandler('/reports')} primaryText='Reports' leftIcon={<EventNoteIcon/>}/>
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
