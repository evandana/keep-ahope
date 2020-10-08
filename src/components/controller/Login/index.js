import { connect } from 'react-redux';
import { loginRequest } from 'actions';
import Login from 'components/view/Login';


const mapStateToProps = (state) => {
    return {
        showLoginSpinner: state.user.showLoginSpinner,
    }
};

const LoginController = connect(
    mapStateToProps, 
    { loginRequest }
)(Login);

export default LoginController;