import React, {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {Dropdown} from './Dropdown';
import ProjectsJsonData from '../assets/json/project.json';
import FeatherIcon from 'feather-icons-react';

let projectInit = ProjectsJsonData.projects
    .filter((a) => a.isOpen > 0)
    .sort((a, b) => {
        return new Date(b.date.start) - new Date(a.date.start)
    })

const filterInit = [
    {id: 1, title: 'mobile', seen: true},
    {id: 0, title: 'web', seen: true},
    {id: 2, title: 'app', seen: false},
    {id: 3, title: 'print', seen: false},
    {id: 4, title: 'etc', seen: false},
];
const featuredInit = true;
const categoriesInit = [
    {id: 0, title: '신규구축', seen: true},
    {id: 1, title: '유지보수', seen: true},
    {id: 2, title: '외주', seen: true},
    {id: 3, title: '개인프로젝트', seen: true},
    {id: 4, title: '기타', seen: false},
]

const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    return `${year}/${month}`;
}
const getSelected = (FilterObject) => {
    return FilterObject.reduce((acc, cur) => {
        if (cur.seen) {
            acc.push(cur.title)
        }
        return acc;
    }, [])
}

const countingSeen = (filterObject) => {
    return filterObject.filter(item => item.seen === true).length;
}
const getProjectList = (filters, featured, categories) => {
    const selectedFilter = getSelected(filters);
    const selectedCategories = getSelected(categories);
    const nextFeatured = featured;
    return projectInit
        .filter((a) => {
            return selectedFilter.includes(a.platform)
        })
        .filter((a) => {
            return selectedCategories.includes(a.category)
        })
        .filter((a) => {
            return nextFeatured ? a.isFeatured : true;
        })
        .sort((a, b) => {
            return new Date(b.date.start) - new Date(a.date.start)
        })
}

const WorkList = () => {
    const [searchParams] = useSearchParams();
    if (!searchParams.get('resume')) {
        projectInit = projectInit.filter((a) => a.isOpen > 1)
    }

    const [filters, setFilter] = useState(filterInit);
    const [categories, setCategories] = useState(categoriesInit);
    const [seeFeatured, setSeeFeatured] = useState(featuredInit);
    const [projects, setProjects] = useState(getProjectList(filterInit, featuredInit, categoriesInit));

    const filterChange = (filterId, nextSeen) => {
        const nextFilters = [...filters];
        const targetFilter = nextFilters.find(item => item.id === filterId);
        targetFilter.seen = nextSeen;

        setFilter(nextFilters);
        setProjects(getProjectList(nextFilters, seeFeatured, categories));
    }
    const categoryChange = (CategoryId, nextSeen) => {
        const nextCategories = [...categories];
        const targetCategory = nextCategories.find(item => item.id === CategoryId);
        targetCategory.seen = nextSeen;

        setCategories(nextCategories);
        setProjects(getProjectList(filters, seeFeatured, nextCategories));
    }
    const featuredChange = (checked) => {
        setSeeFeatured(checked);
        setProjects(getProjectList(filters, checked, categories));
    }
    const getFilterCounter = () => {
        let num = seeFeatured === true ? 1 : 0;
        num += countingSeen(filters);
        num += countingSeen(categories);
        return num;
    }
    return (
        <section id="works" className="works">
            <h1 hidden>WorkList</h1>
            <div className="works-top">
                <div className="filter">
                    <Dropdown title="filter-list" titleIcon="filter" label={`${getFilterCounter()}개의 필터 활성화`}
                              extraClass="filter__dropdown">
                        <div className="flex-box">
                            <div className="flex-box__item">
                                <div className="flex-box__item__title">Category</div>
                                <ul>
                                    {
                                        categories.map((category) => {
                                            return (
                                                <li key={category.id}>
                                                    <label className="ui-checkbox">
                                                        <input type="checkbox" checked={category.seen}
                                                               onChange={e => categoryChange(category.id, e.target.checked)}
                                                               value={category.title}/>
                                                        <em>{category.title}</em>
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="flex-box__item">
                                <div className="flex-box__item__title">Platform</div>
                                <ul>
                                    {
                                        filters.map((filter) => {
                                            return (
                                                <li key={filter.id}>
                                                    <label className="ui-checkbox">
                                                        <input type="checkbox" checked={filter.seen}
                                                               onChange={e => filterChange(filter.id, e.target.checked)}
                                                               value={filter.title}/>
                                                        <em>{filter.title}</em>
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="flex-box__item">
                                <div className="flex-box__item__title">중요 프로젝트만 보기</div>
                                <label className="ui-switch" role="switch">
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
                            seeFeatured === true &&
                            <div className="filter__result__item">
                                <button type="button" onClick={e => featuredChange(!seeFeatured)}>
                                    <div><i><FeatherIcon icon="x"/></i></div>
                                    <em>중요프로젝트만 보기</em>
                                </button>
                            </div>
                        }
                        {
                            categories.map((category) => {
                                return category.seen === true &&
                                    <div key={category.id} className="filter__result__item">
                                        <button type="button" onClick={() => {
                                            categoryChange(category.id, !category.seen)
                                        }}>
                                            <div><i><FeatherIcon icon="x"/></i></div>
                                            <span>범주</span>
                                            <em>{category.title}</em>
                                        </button>
                                    </div>
                            })
                        }
                        {
                            filters.map((filter) => {
                                return filter.seen === true &&
                                    <div key={filter.id} className="filter__result__item">
                                        <button type="button" onClick={() => {
                                            filterChange(filter.id, !filter.seen)
                                        }}>
                                            <div><i><FeatherIcon icon="x"/></i></div>
                                            <span>플랫폼</span>
                                            <em>{filter.title}</em>
                                        </button>
                                    </div>
                            })
                        }
                    </div>
                </div>
                <div className="counter">
                    <div className="total"><span>전체 </span>{projectInit.length}개</div>
                    <div className="bar"><span>중에서</span></div>
                    <div className="current"><strong>{projects.length}</strong>개<span> 보는 중</span></div>
                </div>
            </div>
            {projects.length > 0 ?
                (
                    <ul className="projects">
                        {
                            projects.map((project) => {
                                const url = searchParams.get('resume') === 'yes' ? `/detail/${project.id}?resume=yes` : `/detail/${project.id}`
                                return (
                                    <li key={project.id}>
                                        <Link to={url} className="project">
                                            <div className="project__thumbnail">
                                                <div>
                                                    <img src={`/assets/thumnail/${project.thumbnail}`}
                                                         alt={`${project.projactName}의 썸네일`}/>
                                                </div>
                                            </div>
                                            <div className="project__info">
                                                <div className="project__info__important">
                                                    <h2>
                                                        <span>{project.name}</span>
                                                    </h2>

                                                    {project.platform &&
                                                        <div className="tags">
                                                        <span key={project.platform}
                                                              className="tags__item">{project.platform}</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="project__info__detail">
                                                    <div className="type">
                                                        {project.category}
                                                    </div>
                                                    {project.date.start &&
                                                        <div className="start-date">
                                                            <time>{formatDate(project.date.start)}</time>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="project__info__skills skills">
                                                    {
                                                        project.skills.map((skill, index) => {
                                                            return <span key={index}>{skill}</span>
                                                        })
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