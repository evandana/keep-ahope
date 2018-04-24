import { connect } from 'react-redux';
import ContactInfo from 'components/view/ContactInfo';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        contacts: state.contacts,
        events: state.events,
    };
};

const ContactInfoController = connect(
    mapStateToProps,
)(ContactInfo);

export default ContactInfoController;