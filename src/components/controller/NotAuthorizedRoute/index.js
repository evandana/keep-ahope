import { connect } from 'react-redux';
import NotAuthorizedRoute from 'components/view/NotAuthorizedRoute';

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
};

export default connect(
    mapStateToProps
)(NotAuthorizedRoute);;