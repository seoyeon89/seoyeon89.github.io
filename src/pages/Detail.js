import { useParams, useSearchParams } from 'react-router-dom';
import { Popup } from '../components/Popup';
import Error from '../components/Error';
import ProjectsJsonData from '../assets/json/project.json';

const Projects = ProjectsJsonData.projects.reverse();

const DetailPopup = ({Project}) => {
    return (
        <Popup title={Project.name}>
            <div className="detail">
                <div className="detail__info">
                    <div className="ul-table">
                        <div className="ul-table__row">
                            <h2 className="title">작업 종류</h2>
                            <div className="content">{Project.category}</div>
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
                            <div className="content participation">
                                {Object.entries(Project.participation).map(([key, value]) => {
                                    const RADIUS = 54;
                                    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
                                    const progress = value / 100;
                                    const dashoffset = CIRCUMFERENCE * (1 - progress);

                                    return (
                                        <div className="participation__item" key={key}>
                                            <div className="circle-progress">
                                                <svg width="120" height="120" viewBox="0 0 120 120">
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stop-color="var(--theme-secondary)"/>
                                                            <stop offset="100%" stop-color="var(--theme-primary)"/>
                                                        </linearGradient>
                                                    </defs>
                                                    <circle className="circle-progress__frame" cx="60" cy="60" r="54"
                                                            stroke-width="12"/>
                                                    <circle className="circle-progress__bar" cx="60" cy="60" r="54"
                                                            stroke-width="12"
                                                            style={{
                                                                strokeDasharray: CIRCUMFERENCE,
                                                                strokeDashoffset: dashoffset
                                                            }}/>
                                                </svg>
                                                <div className="circle-progress__value">
                                                    <strong>{key}</strong>
                                                    <span>{value}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                        <div className="ul-table__row">
                            <h2 className="title">사용 기술</h2>
                            <div className="content skills">
                                {
                                    Project.skills.map((skill, index) => {
                                        return (
                                            <div key={index}>{skill}</div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div class="ui-callout discription">
                        {
                            Project.discription.map((discription, index) => {
                                return (
                                    <p key={index}>{discription}</p>
                                );
                            })
                        }
                    </div>

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
                                    <img src={`/assets/thumnail/${image}`} alt={`${Project.name}의 썸네일`}/>
                                </div>
                            )
                        })
                        }
                    </div>
                }
            </div>
        </Popup>
    )
}
const Detail = () => {
    const [searchParams] = useSearchParams();
    const {id} = useParams();
    const Project = Projects.find(item => item.id === Number(id));
    let isShow = false;

    switch (Project.isOpen) {
        case 1:
            isShow = searchParams.get('resume') ? true : false;
            break;
        case 2:
            isShow = true;
            break;
        default:
            isShow = false;
    }


    return (
        <>
            {
                isShow
                ? <DetailPopup Project={Project}/>
                : <Popup title="ERROR">
                        <Error/>
                  </Popup>
            }
        </>
    )
};


export default Detail;