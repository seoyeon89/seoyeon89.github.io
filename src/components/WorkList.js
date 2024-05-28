import { Link } from "react-router-dom";
import ProjectsJsonData from '../assets/json/project.json';
const Projects = ProjectsJsonData.projects;

const WorkSection = (props) => {
    const projectSection = props.projects;
    return (
        <section id="works">
                <h1>WorkList</h1>
                <ul>
                {
                    projectSection.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={`/detail/${item.id}`}>
                                    <div><img src={item.thumbnail}/></div>
                                    <div>
                                        <h2>{item.projectName}</h2>
                                        <p>{item.projectType}</p>
                                        {item.date.start &&
                                            <time >{item.date.start}</time>
                                        }

                                        { item.date.end &&
                                            <time >{item.date.end}</time>
                                        }
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
                </ul>
            </section>
    )
}

const WorkList = () => {
    return (
        <WorkSection projects={Projects} />
    )
};

export default WorkList;