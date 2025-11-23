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
    {id: 0, title: 'web', seen: true},
    {id: 1, title: 'mobile', seen: true},
    {id: 2, title: 'app', seen: false},
    {id: 3, title: 'print', seen: false},
    {id: 4, title: 'etc', seen: false},
];
const featuredInit = true;
const allInit = false;
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
    const isResume = searchParams.get('resume') === 'yes';
    const isDev = searchParams.get('resume') === 'dev';  // ★ 추가됨

    // ★ dev가 아닐 때만 기존처럼 isOpen > 1 필터 적용
    if (!isResume && !isDev) {
        projectInit = projectInit.filter((a) => a.isOpen > 1);
    }

    // ★ 초기 상태: dev일 경우 전체 오픈 + 전체 보기 + 모든 필터 활성화
    const [seeAll, setSeeAll] = useState(isDev ? true : (isResume ? false : allInit));
    const [seeFeatured, setSeeFeatured] = useState(isDev ? false : (isResume ? true : featuredInit));

    const [filters, setFilter] = useState(
        isDev
            ? filterInit.map(f => ({ ...f, seen: true }))
            : (isResume ? filterInit.map(f => ({ ...f, seen: true })) : filterInit)
    );

    const [categories, setCategories] = useState(
        isDev
            ? categoriesInit.map(c => ({ ...c, seen: true }))
            : (isResume ? categoriesInit.map(c => ({ ...c, seen: true })) : categoriesInit)
    );

    const [projects, setProjects] = useState(
        isDev
            ? projectInit   // ★ dev는 필터 없이 전체 프로젝트 그대로
            : (
                isResume
                    ? getProjectList(
                        filterInit.map(f => ({ ...f, seen: true })),
                        true,
                        categoriesInit.map(c => ({ ...c, seen: true }))
                    )
                    : getProjectList(filterInit, featuredInit, categoriesInit)
            )
    );

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

    const seeAllChange = (checked) => {
        setSeeAll(checked);

        if (checked) {
            const allFilters = filters.map(item => ({...item, seen: true}));
            const allCategories = categories.map(item => ({...item, seen: true}));

            setFilter(allFilters);
            setCategories(allCategories);
            setSeeFeatured(false);
            setProjects(projectInit);
        } else {
            setFilter(filterInit);
            setCategories(categoriesInit);
            setSeeFeatured(featuredInit);
            setProjects(getProjectList(filterInit, featuredInit, categoriesInit));
        }
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
                                <div className="flex-box__item__title">전체보기</div>
                                <label className="switch">
                                    <input type="checkbox"
                                           onChange={e => seeAllChange(e.target.checked)}
                                           checked={seeAll}/>
                                    <span className="switch__button"></span>
                                </label>
                            </div>

                            {
                                seeAll === false && (
                                    <>
                                        <div className="flex-box__item">
                                            <div className="flex-box__item__title">중요 프로젝트만 보기</div>
                                            <label className="switch">
                                                <input type="checkbox"
                                                       onChange={e => featuredChange(e.target.checked)}
                                                       checked={seeFeatured}/>
                                                <span className="switch__button"></span>
                                            </label>
                                        </div>

                                        <div className="flex-box__item">
                                            <div className="flex-box__item__title">Category</div>
                                            <ul>
                                                {
                                                    categories.map((category) => (
                                                        <li key={category.id}>
                                                            <label className="sy-checkbox">
                                                                <input type="checkbox" checked={category.seen}
                                                                       onChange={e => categoryChange(category.id, e.target.checked)}
                                                                       value={category.title}/>
                                                                <em>{category.title}</em>
                                                            </label>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div className="flex-box__item">
                                            <div className="flex-box__item__title">Platform</div>
                                            <ul>
                                                {
                                                    filters.map((filter) => (
                                                        <li key={filter.id}>
                                                            <label className="sy-checkbox">
                                                                <input type="checkbox" checked={filter.seen}
                                                                       onChange={e => filterChange(filter.id, e.target.checked)}
                                                                       value={filter.title}/>
                                                                <em>{filter.title}</em>
                                                            </label>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                    </Dropdown>

                    <div className="filter__result">
                        {
                            seeAll === true ? (
                                <div className="filter__result__item">
                                    <button type="button" onClick={() => seeAllChange(false)}>
                                        <div><i><FeatherIcon icon="x" /></i></div>
                                        <em>전체보기</em>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {
                                        seeFeatured === true &&
                                        <div className="filter__result__item">
                                            <button type="button" onClick={() => featuredChange(!seeFeatured)}>
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
                                </>
                            )
                        }
                    </div>

                </div>
                <div className="counter">
                    <div className="current"><span>선택</span> <strong>{projects.length}</strong>개</div>
                    <div className="bar"><span>/</span></div>
                    <div className="total"><span>전체 </span>{projectInit.length}개</div>
                </div>
            </div>

            {projects.length > 0 ? (
                <ul className="projects">
                    {
                        projects.map((project) => {
                            const url = searchParams.get('resume') === 'yes'
                                ? `/detail/${project.id}?resume=yes`
                                : (isDev ? `/detail/${project.id}?resume=dev` : `/detail/${project.id}`);

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
            )}

        </section>
    );
};

export default WorkList;
