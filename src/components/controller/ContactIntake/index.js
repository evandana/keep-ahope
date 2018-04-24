import { connect } from 'react-redux';
import ContactIntake from 'components/view/ContactIntake';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.intakeForm,
    }
};
  
export default connect(
    mapStateToProps
)(ContactIntake);