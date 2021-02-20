import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
    const levels = [
        {
            "title": "educacion infantil",
            "key": "infantil"
        },
        {
            "title": "educacion primaria",
            "key": "primaria"
        },
        {
            "title": "educacion secundaria",
            "key": "e.s.o."
        },
        {
            "title": "bachillerato",
            "key": "bachiller"
        }
    ]

    return (
        <div className="home" >
            {levels.map(level =>
                <Link key={level.key} to={"/search/" + level.key} className="level" >
                    {level.title.toUpperCase()}
                </Link>
            )}
        </div>
    );
}

export default Home;

