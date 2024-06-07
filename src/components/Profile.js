import FeatherIcon from 'feather-icons-react';
import { Accordions, Accordion} from './Accordion';
import MyJsonData from '../assets/json/mydata.json';
import { ReactComponent as IconHtml } from '../assets/images/icon_html.svg';
import { ReactComponent as IconCss3 } from '../assets/images/icon_css3.svg';
import { ReactComponent as IconSass } from '../assets/images/icon_scss.svg';
import { ReactComponent as IconFigma } from '../assets/images/icon_figma.svg';
import { ReactComponent as IconXd } from '../assets/images/icon_xd.svg';
import { ReactComponent as IconPhotoshop } from '../assets/images/icon_photoshop.svg';
import { ReactComponent as IconJs } from '../assets/images/icon_js.svg';
import { ReactComponent as IconJquery } from '../assets/images/icon_jquery.svg';
import { ReactComponent as IconVue } from '../assets/images/icon_vue.svg';
import { ReactComponent as IconReact } from '../assets/images/icon_react.svg';
import { ReactComponent as IconPhp } from '../assets/images/icon_php.svg';
import { ReactComponent as IconSvn } from '../assets/images/icon_svn.svg';
import { ReactComponent as IconGit } from '../assets/images/icon_git.svg';
import { ReactComponent as IconVscode } from '../assets/images/icon_vscode.svg';
import { ReactComponent as IconWebstrom } from '../assets/images/icon_webstorm.svg';

const MyInfo = MyJsonData;

const formatMonthsToYearMonth = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let result = '';

    if (years > 0) {
        result += `${years}년`;
    }

    if (remainingMonths > 0) {
        if (result !== '') {
            result += ' ';
        }
        result += `${remainingMonths}개월`;
    }

    return result.trim();
}
const getMonthGap = (joinDate, leaveDate) => {
    // 입사일과 퇴사일을 Date 객체로 변환
    const joinDateObj = new Date(`${joinDate}.01`);
    const leaveDateObj = leaveDate
        ? new Date(`${leaveDate}.${new Date(joinDateObj.getFullYear(), joinDateObj.getMonth() + 1, 0).getDate()}`)
        : new Date();

    return (leaveDateObj.getFullYear() * 12 + leaveDateObj.getMonth()) - (joinDateObj.getFullYear() * 12 + joinDateObj.getMonth());
}
const MyInfoSection = (props) => {
    return (
            MyInfo[props.objectKey].map((list, index) => {
                return (
                    <div className="info-box" key={list.order}>
                        <div className="info-box__title" key={list.title}>
                            {(!list.dateEnd && index === 0) &&
                                <i>NOW</i>
                            }
                                <strong>{list.title}</strong>
                        </div>

                            <p className="info-box__date">
                                <i>
                                    <FeatherIcon icon="calendar" size="12"/>
                                </i>
                                <span>{list.dateStart}</span>
                                <span>- {list.dateEnd ?? `NOW`}</span>
                                <em>{formatMonthsToYearMonth(getMonthGap(list.dateStart, list.dateEnd))}</em>
                            </p>
                        <div className="info-box__content">
                            <ul className="list-bullet">
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
    );
};

const Profile = () => {
    const totalCareerMonth = MyInfo['experience'].map( item => {
        return getMonthGap(item.dateStart, item.dateEnd);
    }).reduce((acc, cur) => {
        return acc + cur;
    }, 0);
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
                    <ul className="profile__card__info__content">
                        <li>
                            <p>
                                <i>
                                    <FeatherIcon icon="briefcase" size="12"/>
                                </i>
                                <span>총경력 </span>
                                <strong>{formatMonthsToYearMonth(totalCareerMonth)}</strong>
                            </p>
                        </li>
                        <li>
                            <p className="profile__card__info__content">
                                <i>
                                    <FeatherIcon icon="smile" size="12"/>
                                </i>
                                <span>1989년 3월 7일</span>
                            </p>
                        </li>
                        <li>
                            <a className="profile__card__info__content" rel="noreferrer noopener"
                               href="mailto:seoyeon8937@gmail.com">
                                <i>
                                    <FeatherIcon icon="mail" size="12"/>
                                </i>
                                <span>seoyeon8937@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <a className="profile__card__info__content" rel="noreferrer noopener"
                               href="https://fool89.cafe24.com/" target="_blank">
                                <i>
                                    <FeatherIcon icon="monitor" size="12"/>
                                </i>
                                <span>예전 포트폴리오 사이트</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="profile__blocks">
                <Accordions>
                    <Accordion title="Hello World!">
                        <div className="introduce">
                            <div className="introduce__title">
                                <strong>열정적인 탐험가,</strong><br/>
                                웹퍼블리셔 <strong>장서연</strong>입니다.
                            </div>
                            <p>다양한 직군과 함께 <strong>효율적인 UIUX를 만드는 데</strong> 관심이 많습니다.</p>
                            <p>폭넓은 탐구를 통해 <strong>다양한 개발 스택을 쌓는 것을 좋아</strong>합니다. 신기술을 접목하여 레거시 소스를 리펙토링 하는데 능숙합니다.</p>
                        </div>
                    </Accordion>
                    <Accordion title="Skills & Tools">
                        <div className="skills">
                            <div className="skills__item">
                                <div className="skills__item__title">
                                    <i><FeatherIcon icon="edit" size="12"/></i>
                                    <span>MY</span><strong>SKILLS</strong>
                                </div>
                                <div className="skills__item__box">
                                    <div className="skills__item__box__icons">
                                        <span><IconHtml/></span>
                                        <span><IconCss3/></span>
                                        <span><IconSass/></span>
                                        <span><IconJs/></span>
                                        <span><IconJquery/></span>
                                    </div>
                                    <ul className="list-bullet">
                                        <li>웹 표준, 웹 접근성, 크로스 브라우징 마크업이 가능합니다.</li>
                                        <li>반응형, 모바일 웹 퍼블리싱이 가능합니다.</li>
                                        <li>CSS 전처리기(SCSS, LESS) 사용 가능합니다.</li>
                                        <li>ES5, ES6 및 jQuery의 차이를 이해하며 사용 가능합니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <div className="skills__item__box__icons">
                                        <span><IconSvn/></span>
                                        <span><IconGit/></span>
                                    </div>
                                    <ul className="list-bullet">
                                        <li>GIT/SVN의 형상관리 툴을 사용 가능합니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <div className="skills__item__box__icons">
                                        <span><IconVue/></span>
                                        <span><IconReact/></span>
                                        <span><IconPhp/></span>
                                    </div>
                                    <ul className="list-bullet">
                                        <li>Vue, React에 대한 간단한 이해가 있으며, Vue, React 환경에서의 퍼블리싱 경험이 있습니다.</li>
                                        <li>PHP에 대한 간단한 이해가 있으며, PHP환경에서의 퍼블리싱 경험이 있습니다.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="skills__item">
                                <div className="skills__item__title">
                                    <i><FeatherIcon icon="tool" size="12"/></i>
                                    <span>used</span><strong>TOOLS</strong>
                                </div>
                                <div className="skills__item__box">
                                    <div className="skills__item__box__icons">
                                        <span><IconVscode/></span>
                                        <span><IconWebstrom/></span>
                                    </div>
                                    <ul className="list-bullet">
                                        <li>Visual Studio Code, WebStrom을 활용할 수 있습니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <div className="skills__item__box__icons">
                                        <span><IconFigma/></span>
                                        <span><IconXd/></span>
                                        <span><IconPhotoshop/></span>
                                    </div>
                                    <ul className="list-bullet">
                                        <li>Figma, XD 툴을 이용한 프로토 타이핑 작업, 컴포넌트(에셋)을 활용한 디자인 시스템 셋팅이 가능합니다.</li>
                                        <li>Photoshop을 이용한 이미지 가공 작업이 가능합니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Work Experience">
                        <MyInfoSection objectKey="experience"/>
                    </Accordion>
                    <Accordion title="Education">
                        <MyInfoSection objectKey="education"/>
                    </Accordion>
                </Accordions>
            </div>
        </section>
    );
};

export default Profile;