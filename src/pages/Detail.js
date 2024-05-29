import { useParams } from 'react-router-dom';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects;

const Detail = () => {
    const { id } = useParams();
    const Project = Projects.find(item => item.id === Number(id));
    return (
        <aside className="popup-wrap">
            <div>
                <h1>{Project.projectName}</h1>
                <p>{Project.projectType}</p>

                {(Project.date.start || Project.date.end) &&
                    <article>
                        <h2></h2>
                        <div>
                            {Project.date.start &&
                                <time>{Project.date.start}</time>
                            }

                            {Project.date.end &&
                                <time>{Project.date.end}</time>
                            }
                        </div>
                    </article>
                }

                <article>
                    <h2></h2>{Object.entries(Project.participation).map(([key, value]) => {
                    return (
                        <div key={key}>
                            <div>{key}</div>
                            <div>{value}</div>
                        </div>
                    );
                })
                }
                </article>

                <article>
                    <h2></h2>{
                    Project.skills.map((skill, index) => {
                        return (
                            <div key={index}>{skill}</div>
                        );
                    })
                }
                </article>

                <article>
                    <h2 hidden></h2>
                    <div>{Project.discription}</div>
                </article>

                {
                    Project.publicUrl &&
                    Project.publicUrl.map((link, index) => {
                        return (
                            <a key={index} href={link} rel="noopener noreferrer" target="_blank">{link}</a>
                        );
                    })
                }
            </div>
            <div>
                {Project.thumbnail &&
                    <div><img src={Project.thumbnail}/></div>
                }
            </div>
        </aside>
    );
};

export default Detail;