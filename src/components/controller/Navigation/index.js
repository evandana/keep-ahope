import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUserRequest, toggleEventDetail } from 'actions';
import NavigationView from 'components/view/Navigation';

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

const NavigationViewWithRouter = withRouter(NavigationView);

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationViewWithRouter);

export default NavigationController;