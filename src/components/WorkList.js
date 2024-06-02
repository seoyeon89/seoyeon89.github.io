import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Dropdown } from './Dropdown';
import ProjectsJsonData from '../assets/json/project.json';
import FeatherIcon from 'feather-icons-react';

const projectInit = ProjectsJsonData.projects
    .filter((a) => a.isOpen > 0 )
    .sort((a, b) => { return new Date(b.date.start) - new Date(a.date.start) })

const filterInit = [
    { id: 0, title: 'web', seen: true },
    { id: 1, title: 'mobile', seen: true },
    { id: 2, title: 'app', seen: false },
    { id: 3, title: 'print', seen: false },
    { id: 4, title: 'etc', seen: false },
];
const featuredInit =  true;

const getSelectedFilters = (FilterObject) => {
    return FilterObject.reduce((acc,cur) => {
        if(cur.seen) {
            acc.push(cur.title)
        }
        return acc;
    },[])
}
const getProjectList = (filters, featured ) => {
    const selectedFilter = getSelectedFilters(filters);
    const nextFeatured = featured;
    console.log(nextFeatured);
    return projectInit
        .filter((a) => {
            return selectedFilter.includes(a.projectPlatform)
        })
        .filter((a) => {
            return nextFeatured ? a.isFeatured : true;
        })
        .sort((a, b) => {
            return new Date(b.date.start) - new Date(a.date.start)
        })
}

const WorkList = () => {
    const [filters, setFilter] = useState(filterInit);
    const [seeFeatured, setSeeFeatured] = useState(featuredInit);
    const [projects, setProjects] = useState(getProjectList(filterInit,featuredInit));

    const filterChange = (filterId, nextSeen) => {
        const nextFilters = [...filters];
        const targetFilter = nextFilters.find( item => item.id === filterId );
        targetFilter.seen = nextSeen;

        setFilter(nextFilters);
        setProjects(getProjectList(nextFilters, seeFeatured));
    }
    const featuredChange = (checked) =>{
        setSeeFeatured(checked);
        setProjects(getProjectList(filters, checked));
    }
    return (
        <section id="works" className="works">
            <h1 hidden>WorkList</h1>
            <div className="filter">
                <Dropdown title="filter-list" titleIcon="filter" extraClass="filter__dropdown">
                    <div className="flex-box">
                        <div className="flex-box__item">
                            <div className="flex-box__item__title">프로젝트 종류</div>
                            <ul>
                                {
                                    filters.map((filter) => {
                                        return (
                                            <li key={filter.id}>
                                                <label className="ui-checkbox">
                                                    <input type="checkbox" checked={filter.seen}
                                                           onChange={e => filterChange(filter.id, e.target.checked)}
                                                           value={filter.title}/>
                                                    <span>{filter.title}</span>
                                                </label>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="flex-box__item">
                            <div className="flex-box__item__title">중요 프로젝트만 보기</div>
                            <label className="ui-switch">
                                <input type="checkbox"
                                       onChange={e => featuredChange(e.target.checked)}
                                       checked={seeFeatured}/>
                                <span className="ui-switch__button"></span>
                            </label>
                        </div>
                    </div>
                </Dropdown>

                <div className="filter__result">
                    {
                        filters.map((filter) => {
                            return filter.seen === true &&
                                <div key={filter.id} className="filter__result__item">
                                    <button type="button" onClick={() => {
                                        filterChange(filter.id, !filter.seen)
                                    }}>
                                        <div><i><FeatherIcon icon="x"/></i></div>
                                        <span hidden>삭제</span>
                                    </button>
                                    <span>{filter.title}</span>
                                </div>
                        })
                    }
                </div>
            </div>
            {projects.length > 0 ?
                (
                    <ul className="projects">
                        {
                            projects.map((project) => {
                                return (
                                    <li key={project.id}>
                                        <Link to={`/detail/${project.id}`} className="project">
                                            <div className="project__thumbnail">
                                                <div>
                                                    <img src={`/assets/thumnail/${project.thumbnail}`}
                                                         alt={`${project.projactName}의 썸네일`}/>
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
                ) : (
                    <div className="projects--no-child">프로젝트가 없습니다.</div>
                )
            }
        </section>
    );
};

export default WorkList;