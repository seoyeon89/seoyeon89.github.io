import FeatherIcon from 'feather-icons-react';
import { Accordion } from './Accordion';
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
                                    {(list.date && index == 0) &&
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
        <section id="profile" className="profile">
            <h1 hidden>Profile</h1>
            <div className="profile__avatar"></div>
            <div className="profile__info">
                <h2 className="profile__info__title">
                    <strong>장서연</strong>
                </h2>
                <div className="profile__info__sub-title">
                    <span>SEOYEON,JANG</span>
                </div>
                <p className="profile__info__content">
                    <i>
                        <FeatherIcon icon="smile" size="12" />
                    </i>
                    <span>1989년 3월 7일</span>
                </p>
                <a className="profile__info__content" href="mailto:seoyeon8937@gmail.com" >
                    <i>
                        <FeatherIcon icon="mail" size="12"/>
                    </i>
                    <span>seoyeon8937@gmail.com</span>
                </a>
            </div>
            <div className="profile__cards">
                <MyInfoSection title="Work Experience" open={true} />
                <MyInfoSection title="Education" open={false}/>
            </div>
        </section>
    );
};

export default Profile;