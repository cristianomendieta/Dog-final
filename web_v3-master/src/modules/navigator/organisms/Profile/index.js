import './index.less';
import {
    CaretDownOutlined
} from '@ant-design/icons';
import { useMe } from '../../../../commons/stores/me/me.store';


const Profile = ({
    children,
    ...props
}) => {
    const { logout, firstName } = useMe();
    return (
        <div className='Profile-wrapper'>
            Hi, {firstName()} <a className='logout' onClick={logout}>logout</a>
        </div>
    );
}

export default Profile;