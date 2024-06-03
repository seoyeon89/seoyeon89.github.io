import FeatherIcon from 'feather-icons-react';
import { Accordion } from './Accordion';
import { CircleProgress } from './CircleProgress';
import MyJsonData from '../assets/json/mydata.json';

const MyInfo = MyJsonData;
const MyInfoSection = (props) => {
    return (
        <Accordion initOpen={props.open}
                   title={props.title}
        >
            {
                MyInfo[props.title].map((list, index) => {
                        return (
                            <div className="info-box" key={list.order}>
                                <div className="info-box__title" key={list.title}>
                                    {(list.date && index === 0) &&
                                        <i>NOW</i>
                                    }
                                        <strong>{list.title}</strong>
                                </div>

                                {list.date &&
                                    <p className="info-box__date">
                                        <i>
                                            <FeatherIcon icon="calendar" size="12"/>
                                        </i>
                                        <span>{list.date}</span>
                                    </p>
                                }
                                <div className="info-box__content">
                                    <ul >
                                        {
                                            list['description'].map((item, index) => {
                                                return(
                                                    <li key={index}>
                                                        <span>{item}</span>
                                                    </li>
                                                )}
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        );
                    }
                )
            }
        </Accordion>
    );
};

const Profile = () => {
    return (
        <section className="profile">
            <h1 hidden>Profile</h1>
            <div className="profile__card">
                <div className="profile__card__avatar">
                    <img src="/assets/images/profile.png" alt="장서연 프로필 이미지"/>
                </div>
                <div className="profile__card__info">
                    <h2 className="profile__card__info__title">
                        <strong>장서연</strong>
                    </h2>
                    <div className="profile__card__info__sub-title">
                        <span>SEOYEON,JANG</span>
                    </div>
                    <p className="profile__card__info__content">
                        <i>
                            <FeatherIcon icon="smile" size="12"/>
                        </i>
                        <span>1989년 3월 7일</span>
                    </p>
                    <a className="profile__card__info__content" rel="noreferrer noopener" href="https://github.com/seoyeon89" target="_blank">
                        <i>
                            <FeatherIcon icon="github" size="12"/>
                        </i>
                        <span>github.com/seoyeon89</span>
                    </a>
                    <a className="profile__card__info__content" rel="noreferrer noopener" href="mailto:seoyeon8937@gmail.com">
                        <i>
                            <FeatherIcon icon="mail" size="12"/>
                        </i>
                        <span>seoyeon8937@gmail.com</span>
                    </a>
                    <a className="profile__card__info__content" rel="noreferrer noopener" href="https://fool89.cafe24.com/" target="_blank">
                        <i>
                            <FeatherIcon icon="monitor" size="12"/>
                        </i>
                        <span>예전 포트폴리오 사이트</span>
                    </a>
                </div>
                <div className="profile__card__skills">
                    <CircleProgress title="HTML" percent="99" />
                    <CircleProgress title="CSS" percent="99" />
                    <CircleProgress title="JS" percent="70" />
                </div>
            </div>
            <div className="profile__blocks">
                <MyInfoSection title="Work Experience" open={true}/>
                <MyInfoSection title="Education" open={false}/>
            </div>
        </section>
    );
};

export default Profile;