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
                    projectSection.map((Project) => {
                        return (
                            <li key={Project.id}>
                                <Link to={`/detail/${Project.id}`}>
                                    {Project.thumbnail[0] &&
                                        <div><img src={Project.thumbnail[0]}/></div>
                                    }
                                    <div>
                                        <h2>{Project.projectName}</h2>
                                        <p>{Project.projectType}</p>
                                        {Project.date.start &&
                                            <time >{Project.date.start}</time>
                                        }

                                        { Project.date.end &&
                                            <time >{Project.date.end}</time>
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