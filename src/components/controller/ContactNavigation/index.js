import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUserRequest } from 'actions';
import ContactNavigationView from 'components/view/ContactNavigation';

const mapStateToProps = (state) => {

    return {
        user: state.user,
        config: state.config,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUserRequest()),
    }
};

const ContactNavigationViewWithRouter = withRouter(ContactNavigationView);

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactNavigationViewWithRouter);

export default NavigationController;