import {useParams} from 'react-router-dom';
import { Popup } from '../components/Popup';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects.reverse();

const Detail = () => {
    const {id} = useParams();
    const Project = Projects.find(item => item.id === Number(id));
    return (
        <Popup title={Project.projectName}>
            <div className="detail">
                <div className="detail__info">
                    <div className="ul-table">

                        <div className="ul-table__row">
                            <h2 className="title">작업 종류</h2>
                            <div className="content">{Project.projectType}</div>
                        </div>

                        {(Project.date.start || Project.date.end) &&
                            <div className="ul-table__row">
                                <h2 className="title">작업 시기</h2>
                                <div className="content">
                                    {Project.date.start &&
                                        <time>{Project.date.start}</time>
                                    }

                                    {Project.date.end &&
                                        <>
                                            <span>~</span>
                                            <time>{Project.date.end}</time>
                                        </>
                                    }
                                </div>
                            </div>
                        }

                        <div className="ul-table__row">
                            <h2 className="title">참여 부분</h2>
                            <div className="content">
                                {Object.entries(Project.participation).map(([key, value]) => {
                                    return (
                                        <div key={key}>
                                            <div>{key}</div>
                                            <div>{value}</div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <p></p>

                    <article>
                        <h2></h2>
                        {
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
                                <a key={index}
                                   href={link}
                                   rel="noopener noreferrer"
                                   target="_blank"
                                >{link}</a>
                            );
                        })
                    }
                </div>
                {Project.thumbnail &&
                    <div className="detail__thumbnail">
                        { Project.images.map((image, index) => {
                                return (
                                    <div className="detail__thumbnail__item" key={index}>
                                        <img src={`/assets/thumnail/${image}`} alt={`${Project.projectName}의 썸네일`}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </Popup>
    )
};

export default Detail;