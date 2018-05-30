import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ContactIntake from 'components/view/ContactIntake';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.intakeForm,
    }
};

export default withRouter(connect(
    mapStateToProps
)(ContactIntake));
