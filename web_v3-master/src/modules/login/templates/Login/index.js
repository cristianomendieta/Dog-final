import './index.less';
import LoginForm from '../../organisms/LoginForm';

const Login = ({
    children,
    ...props
}) => {
    return (
        <div className='Login-wrapper'>
            <LoginForm />
        </div>
    );
}

export default Login;