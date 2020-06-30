import './index.less';
import Input from '../../../../../commons/atoms/Input';
import { useUserStore, useUsersArray } from '../../../stores/user.store';
import { useRouter } from 'next/router';

const UserSearch = ({
    children,
    ...props
}) => {
    const router = useRouter();
    const { search, remove } = useUserStore();
    const users = useUsersArray();
    return (
        <div className='UserSearch-wrapper'>
            <section className="todoapp">
                <h1>users</h1>
                <header className="header">
                    <Input
                        onEnter={search}
                        placeholder="Search..."
                        autoFocus />
                </header>
                <button onClick={() => router.push('/user/form')}>ADD</button>

                <section className="main" style={{ display: 'block' }}>
                    <ul className="todo-list">
                        {users.map(({ name, _id }) => {
                            return <li key={_id} style={{
                                cursor: 'pointer'
                            }} onClick={(e) => {
                                e.stopPropagation();
                                router.push('/user/form/' + _id);
                            }}>
                                <div className="view">
                                    <label>{name}</label>
                                    <button className="destroy" onClick={() => remove(_id)}></button>
                                </div>
                            </li>
                        })}
                    </ul>
                </section>
            </section>

        </div>
    );
}

export default UserSearch;