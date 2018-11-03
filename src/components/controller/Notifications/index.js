import { connect } from 'react-redux';
import Notifications from 'components/view/Notifications';

const mapStateToProps = (state) => {
    return {
        newNotification: state.newNotification
    };
};

const NotificationsController = connect(
    mapStateToProps,
)(Notifications);

export default NotificationsController;