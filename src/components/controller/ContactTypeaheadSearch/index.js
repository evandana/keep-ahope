import { connect } from 'react-redux';
import { searchContacts } from 'actions';
import ContactTypeaheadSearch from 'components/view/ContactTypeaheadSearch';

const mapStateToProps = (state) => {
    return {
        dataSource: state.contacts.searchResults,
    };
};

const mapDispatchToProps = {
    typeaheadSearch: searchContacts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ContactTypeaheadSearch);
