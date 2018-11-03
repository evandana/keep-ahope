import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.themePalette = this.props.muiTheme.palette;
    }

    render () {
        const { notificationSingleton } = this.props;

        return (
            <div>
                <pre>{JSON.stringify(notificationSingleton)}</pre>
            </div>
        );  
    }
}

export default muiThemeable()(Notifications);