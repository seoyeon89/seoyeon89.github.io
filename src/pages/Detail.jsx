import {useParams, useSearchParams} from 'react-router-dom';
import {Popup} from '../components/Popup';
import {Progress} from '../components/Progress';
import Error from '../components/Error';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects.reverse();

const mappingParticipation = (str) => {
    switch (str.toLowerCase()) {
        case 'publish':
            return "퍼블리싱"
        case 'design':
            return '디자인'
        case 'development':
            return '개발'
        case 'planning':
            return '기획'
        default:
            return '기타'
    }
}

const DetailPopup = ({Project}) => {
    return (
        <Popup title={Project.name}>
            <div className="detail">
                <div className="detail__info">
                    <div className="sy-table">
                        <div className="sy-table__row">
                            <h2 className="title">작업 종류</h2>
                            <div className="content">{Project.category}</div>
                        </div>

                        {(Project.date.start || Project.date.end) &&
                            <div className="sy-table__row">
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

                        <div className="sy-table__row">
                            <h2 className="title">참여 부분</h2>
                            <div className="content participation">
                                {Object.entries(Project.participation).map(([key, value]) => {
                                    return (
                                        <div className="participation__item" key={key}>
                                            <Progress type="bar"  title={mappingParticipation(key)} percent={value}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="sy-table__row">
                            <h2 className="title">사용 기술</h2>
                            <div className="content skills">
                                {Project.skills.map((skill, index) => (
                                    <span key={index}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="sy-callout discription">
                        {Project.discription.map((discription, index) => (
                            <p key={index}>{discription}</p>
                        ))}
                    </div>

                    {Project.publicUrl &&
                        Project.publicUrl.map((link, index) => (
                            <a key={index}
                               href={link}
                               rel="noopener noreferrer"
                               target="_blank"
                            >
                                {link}
                            </a>
                        ))
                    }
                </div>

                {Project.thumbnail &&
                    <div className="detail__thumbnail">
                        {Project.images.map((image, index) => (
                            <div className="detail__thumbnail__item" key={index}>
                                <img src={`/assets/thumnail/${image}`} alt={`${Project.name}의 썸네일`}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </Popup>
    );
}

const Detail = () => {
    const [searchParams] = useSearchParams();
    const {id} = useParams();
    const Project = Projects.find(item => item.id === Number(id));

    const resumeParam = searchParams.get('resume');
    const isDev = resumeParam === 'dev';
    const isResumeYes = resumeParam === 'yes';

    let isShow = false;

    if (isDev) {
        isShow = true;
    } else {
        switch (Project.isOpen) {
            case 1:
                isShow = isResumeYes ? true : false;
                break;
            case 2:
                isShow = true;
                break;
            default:
                isShow = false;
        }
    }

    return (
        <>
            {isShow ? (
                <DetailPopup Project={Project} />
            ) : (
                <Popup title="ERROR">
                    <Error />
                </Popup>
            )}
        </>
    );
};

export default Detail;
