import { Todos } from '../../organisms/Todos';
import { Footer } from '../../organisms/Footer';
import { Header } from '../../organisms/Header';
import './index.css';

const Index = () => {
    return (
        <section className="todoapp">
            <Header />
            <Todos />
            <Footer />
        </section>
    )
}

export default Index