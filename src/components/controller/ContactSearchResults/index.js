import { connect } from 'react-redux';
import ContactSearchResults from 'components/view/ContactSearchResults';

const mapStateToProps = (state) => {
    return {
        searchResults: state.contacts.searchResults,
    };
};

export default connect(
    mapStateToProps
)(ContactSearchResults);
