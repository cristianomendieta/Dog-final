import './index.less';
import Input from '../../../../../commons/atoms/Input';
import { Form } from 'react-final-form';
import FieldInput from '../../../../../commons/atoms/FieldInput';
import { requiredFields } from '../../../../../commons/util';
import { useUserStore } from '../../../stores/user.store';
import { useRouter } from 'next/router';
import { message } from 'antd';

const UserForm = ({
    children,
    ...props
}) => {
    const router = useRouter();
    const { save, user } = useUserStore();
    return (
        <div className='UserForm-wrapper'>
            <section className="todoapp">
                <h1>new user</h1>
                <section className="main" style={{ display: 'block' }}>
                    <Form
                        key="userForm"
                        onSubmit={(values) => {
                            save(values).then((r) => {
                                router.back();
                            }).catch((e) => {
                                message.error('Error.');
                            });
                        }}
                        validate={(values) => {
                            return requiredFields(['name', 'email', 'login', 'password'])(values)
                        }}
                        initialValues={user}
                        render={({ handleSubmit, form, submitting, pristine, values }) => {
                            return (
                                <form onSubmit={handleSubmit}>
                                    <FieldInput
                                        autoFocus
                                        label="Name:"
                                        placeholder="Name..."
                                        name="name"
                                    />
                                    <FieldInput
                                        label="Email:"
                                        placeholder="Email..."
                                        name="email"
                                    />
                                    <FieldInput
                                        label="Login:"
                                        placeholder="Login..."
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
                                        }} type="submit">done</button>
                                    </div>
                                </form>
                            )
                        }}
                    />
                </section>
            </section>
        </div >
    );
}

export default UserForm;