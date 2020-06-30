import './index.less';
import { useRouter } from "next/router";

const Menu = ({
    children,
    ...props
}) => {
    const router = useRouter();

    return (
        <div className='Menu-wrapper'>
            <nav className='Menu-nav'>
                <a onClick={() => router.push('/user/search')} className={router.asPath.toLowerCase().includes('user') ? 'Menu-nav-item active' : 'Menu-nav-item'}>users</a>
                <a onClick={() => router.push('/todo')} className={router.asPath.toLowerCase().includes('todo') ? 'Menu-nav-item active' : 'Menu-nav-item'}>todos</a>
            </nav>
        </div>
    );
}

export default Menu;