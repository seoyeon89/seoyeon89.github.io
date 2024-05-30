import {Link} from 'react-router-dom';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects;

const WorkSection = (props) => {
    const projectSection = props.projects;
    return (
        <section id="works" className="works" >
            <h1 hidden>WorkList</h1>
            <ul className="projects">
                {
                    projectSection.map((Project) => {
                        return (
                            <li key={Project.id} >
                                <Link to={`/detail/${Project.id}`}
                                      className="project"
                                >
                                    <div className="project__thumbnail">
                                        <div>
                                            <img src={`/assets/thumnail/${Project.thumbnail[0]}`}/>
                                        </div>
                                    </div>
                                    <div className="project__info">
                                        <div className="project__info__important">
                                            <h2>
                                                <span>{Project.projectName}</span>
                                            </h2>
                                            { Project.projectType == '외주' &&
                                                <div className="tags">
                                                    <span class="tags__item">{Project.projectType}</span>
                                                </div>
                                            }
                                        </div>
                                        <div className="project__info__detail">
                                            <div className="type">
                                                {Project.projectType}
                                            </div>
                                            {Project.date.start &&
                                                <div className="start-date">
                                                    <time>{Project.date.start}</time>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
};

const WorkList = () => {
    return (
        <WorkSection projects={Projects}/>
    );
};

export default WorkList;