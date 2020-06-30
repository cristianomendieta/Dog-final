import './index.less';
import { Form } from 'react-final-form';
import { requiredFields } from '../../../../commons/util';
import FieldInput from '../../../../commons/atoms/FieldInput';
import { message } from 'antd';
import { useLogin } from '../../stores/login.store';
import { useEffect } from 'react';
import { useApolloClient } from 'react-apollo';

const LoginForm = ({
    children,
    ...props
}) => {
    const { login } = useLogin();

    return (
        <div className='LoginForm-wrapper'>
            <section className="todoapp">
                <h1>login</h1>
                <section className="main" style={{ display: 'block' }}>
                    <Form
                        key="loginForm"
                        onSubmit={(values) => {
                            login({
                                login: values.login,
                                password: values.password
                            }).then((r) => {
                                console.log(r);
                            }).catch((e) => {
                                message.error('Invalid login.');
                            });
                        }}
                        validate={(values) => {
                            return requiredFields(['login', 'password'])(values)
                        }}
                        render={({ handleSubmit, form, submitting, pristine, values }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <FieldInput
                                        autoFocus
                                        label="Login:"
                                        placeholder="login..."
                                        name="login"
                                    />
                                    <FieldInput
                                        label="Password:"
                                        placeholder="password..."
                                        type="password"
                                        name="password"
                                    />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: 40,
                                    }}>
                                        <button style={{
                                            fontSize: 'x-large',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }} type="submit">login</button>
                                    </div>
                                </form>
                            )
                        }}
                    />

                </section>
            </section>
        </div>
    );
}

export default LoginForm;