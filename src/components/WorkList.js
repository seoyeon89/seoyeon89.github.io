import { Link } from 'react-router-dom';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects;

const WorkSection = (props) => {
    const projectSection = props.projects;
    return (
        <section id="works" className="projects">
            <h1 hidden>WorkList</h1>
            <ul className="project-list">
                {
                    projectSection.map((Project) => {
                        return (
                            <li key={Project.id} className="project-item">
                                <Link to={`/detail/${Project.id}`} className="project-item-inner">
                                    {Project.thumbnail[0] &&
                                        <div className="thumbnail">
                                            <div><img src={`/assets/thumnail/${Project.thumbnail[0]}`}/></div>
                                        </div>
                                    }
                                    <div className="info">
                                        <div className="info-important">
                                            <h2><span>{Project.projectName}</span></h2>
                                            <div className="tags">

                                            </div>
                                        </div>
                                        <div className="info-detail">
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