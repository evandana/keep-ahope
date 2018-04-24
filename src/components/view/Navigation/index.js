import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import { blueGrey600, cyan600 } from 'material-ui/styles/colors'

import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ChromeReaderModeIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import CreditCardIcon from 'material-ui/svg-icons/action/credit-card';
import RedeemIcon from 'material-ui/svg-icons/action/redeem';
// import TimelineIcon from 'material-ui/svg-icons/action/timeline';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
// import LocalOfferIcon from 'material-ui/svg-icons/maps/local-offer';
// import MoodIcon from 'material-ui/svg-icons/social/mood';
import PollIcon from 'material-ui/svg-icons/social/poll';
// import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';
// import WhatsHotIcon from 'material-ui/svg-icons/social/whatshot';
// import StarIcon from 'material-ui/svg-icons/toggle/star';
// import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';

import { getImageForEnv } from 'static/images/index'

import './styles.css';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.navigateToRoute = this.navigateToRoute.bind(this);
        this.themePalette = this.props.muiTheme.palette;
    }
    
    buildIconMenu (actions) {
        const { logout } = actions;
        return (
            <IconMenu
                iconButtonElement={<IconButton><ExpandMoreIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <MenuItem onTouchTap={logout} primaryText="Logout" />
            </IconMenu>
        );
    };

    navigateToRoute (someArg, evt, tabEl) {
        // close any open event item
        // this.toggleEventDetail();
        // navigate
        this.props.history.push(tabEl.props['data-route']);
    };

    render () {
        const { user, logout } = this.props;
        
        const iconMenu = this.buildIconMenu({ logout });

        return (
            <div>
                
                {<AppBar
                    title={'Welcome, ' + user.displayName}
                    iconElementRight={iconMenu}
                >
                </AppBar>}

            </div>
        );  
    }
}

export default muiThemeable()(Navigation);