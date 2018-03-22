import { connect } from 'react-redux';
import Contacts from 'components/view/Contacts';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        contacts: state.contacts,
        events: state.events,
    };
};

const ContactsController = connect(
    mapStateToProps,
)(Contacts);

export default ContactsController;