import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import ProjectsJsonData from '../assets/json/project.json';

const ProjectsOrigin = ProjectsJsonData.projects;
const FilterOrigin = [
    { id: 0, title: 'web', seen: false },
    { id: 1, title: 'print', seen: false },
    { id: 2, title: 'mobile', seen: true },
    { id: 3, title: 'app', seen: false },
    { id: 4, title: 'etc', seen: false },
];

const WorkList = () => {
    const [filters, setFilter] = useState(FilterOrigin);
    const [projects, setProjects] = useState(ProjectsOrigin);
    const filteringProject = () => {
        const filterList = filters.reduce((acc,cur) => {
            if(cur.seen) {
                acc.push(cur.title)
            }
            return acc;
        },[])
        setProjects(ProjectsOrigin.filter((item) => filterList.includes(item.projectPlatform) ))
    }
    const filterChange = (filterId, nextSeen) => {
        const filtersNextList = [...filters];
        const filter = filtersNextList.find( item => item.id === filterId );
        filter.seen = nextSeen;
        setFilter(filtersNextList);
    }
    return (
        <section id="works" className="works">
            <h1 hidden>WorkList</h1>
            <button type="button" onClick={filteringProject}>클릭</button>
            {
                filters.map((filter) => {
                    return (
                        <label key={filter.id}>
                            <input type="checkbox" checked={filter.seen} onChange={e => filterChange(filter.id, e.target.checked)} value={filter.title}/>
                            <span>{filter.title}</span>
                        </label>
                    )
                })
            }
            <ul className="projects">
                {
                    projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <Link to={`/detail/${project.id}`} className="project">
                                    <div className="project__thumbnail">
                                        <div>
                                            {/*<img src={`/assets/thumnail/${project.thumbnail}`} alt={`${project.projactName}의 썸네일`}/>*/}
                                        </div>
                                    </div>
                                    <div className="project__info">
                                        <div className="project__info__important">
                                            <h2>
                                                <span>{project.projectName}</span>
                                            </h2>

                                            {project.projectPlatform &&
                                                <div className="tags">
                                                    <span key={project.projectPlatform}
                                                          className="tags__item">{project.projectPlatform}</span>
                                                </div>
                                            }
                                        </div>
                                        <div className="project__info__detail">
                                            <div className="type">
                                                {project.projectType}
                                            </div>
                                            {project.date.start &&
                                                <div className="start-date">
                                                    <time>{project.date.start}</time>
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

export default WorkList;