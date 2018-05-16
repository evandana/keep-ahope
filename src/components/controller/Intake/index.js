import { connect } from 'react-redux';
import Intake from 'components/view/Intake';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.intakeForm,
    }
};
  
export default connect(
    mapStateToProps
)(Intake);