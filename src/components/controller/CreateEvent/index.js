import { connect } from 'react-redux';
import CreateEvent from 'components/view/CreateEvent';

const mapStateToProps = (state) => {
    console.log('stating')
    return {
        user: state.user,
        form: state.events.createEventForm,
        eventsOwned: state.events.eventsOwned,
    }
};

export default connect(
    mapStateToProps
)(CreateEvent);
