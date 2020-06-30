import './index.less';
import Menu from '../../organisms/Menu';
import Profile from '../../organisms/Profile';
import { Divider } from 'antd';

const Navigator = ({
    children,
    ...props
}) => {
    return (
        <div className='Navigator-wrapper'>
            <Menu />
            <Divider className="divider" type="vertical"/>
            <Profile />
        </div>
    );
}

export default Navigator;