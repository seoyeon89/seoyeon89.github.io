import FeatherIcon from 'feather-icons-react';
import {Accordion, Accordions} from './Accordion';
import MyJsonData from '../assets/json/mydata.json';
import {ReactComponent as IconHtml} from '../assets/images/icon_html.svg';
import {ReactComponent as IconCss3} from '../assets/images/icon_css3.svg';
import {ReactComponent as IconSass} from '../assets/images/icon_scss.svg';
import {ReactComponent as IconFigma} from '../assets/images/icon_figma.svg';
import {ReactComponent as IconXd} from '../assets/images/icon_xd.svg';
import {ReactComponent as IconPhotoshop} from '../assets/images/icon_photoshop.svg';
import {ReactComponent as IconJs} from '../assets/images/icon_js.svg';
import {ReactComponent as IconJquery} from '../assets/images/icon_jquery.svg';
import {ReactComponent as IconVue} from '../assets/images/icon_vue.svg';
import {ReactComponent as IconReact} from '../assets/images/icon_react.svg';
import {ReactComponent as IconPhp} from '../assets/images/icon_php.svg';
import {ReactComponent as IconSvn} from '../assets/images/icon_svn.svg';
import {ReactComponent as IconGit} from '../assets/images/icon_git.svg';
import {ReactComponent as IconVscode} from '../assets/images/icon_vscode.svg';
import {ReactComponent as IconWebstrom} from '../assets/images/icon_webstorm.svg';

const MyInfo = MyJsonData;
const skillIcons = [
    <IconHtml />,
    <IconCss3 />,
    <IconSass />,
    <IconJs />,
    <IconJquery />,
    <IconVue />,
    <IconReact />,
    <IconPhp />,
    <IconVscode />,
    <IconWebstrom />,
    <IconSvn />,
    <IconGit />,
    <IconFigma />,
    <IconXd />,
    <IconPhotoshop />
];
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
    const joinDateObj = new Date(`${joinDate}/01`);
    let leaveDateObj = (typeof leaveDate !== 'undefined') ? new Date(`${leaveDate}/${new Date(joinDateObj.getFullYear(), joinDateObj.getMonth() + 1, 0).getDate()}`) : new Date();
    return (leaveDateObj.getFullYear() * 12 + leaveDateObj.getMonth()) - (joinDateObj.getFullYear() * 12 + joinDateObj.getMonth());
}

const totalCareerMonth = Number(MyInfo.experience.map(item => {
    return getMonthGap(item.dateStart, item.dateEnd);
}).reduce((acc, cur) => {
    return acc + cur;
}, 0));

const MyInfoSection = ({ item, title = null}) => {
    return (
        <div className="info-box">
            {title && (
            <div className="info-box__head">
                <div className="info-box__label">
                    <strong>{item.title}</strong>
                </div>
            </div>
            )}
            <div className="info-box__content">
                <div className="info-box__date">
                    <i><FeatherIcon icon="calendar" size="12" /></i>
                    <span>{item.dateStart}</span>
                    <span>-</span>
                    <span>{item.dateEnd ?? `NOW`}</span>
                </div>

                <ul className="info-box__list list-bullet">
                    {item.description.map((desc, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: desc }} />
                    ))}
                </ul>
            </div>
        </div>
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
                    <Accordion title="Hello World!" extraClass={"primary"}>
                        <div className="introduce">
                            <div className="introduce__title">
                                <strong>열정적인 탐험가,</strong><br/>
                                웹퍼블리셔 <strong>장서연</strong>입니다.
                            </div>
                            <p>다양한 직군과 함께 <strong>효율적인 UIUX를 만드는 데</strong> 관심이 많습니다.</p>
                            <p>레거시 소스의 문제를 분석하고, 최신 기술 트렌드에 맞춰 <strong>구조적으로 개선</strong>하는 작업에 능숙합니다.</p>
                        </div>
                    </Accordion>
                    <Accordion title="Work Experience" extraClass={"primary"}>
                        <div className="experience">
                            <Accordions mode="multiple" initOpen={[0]}>
                            {MyInfo.experience.map((item) => (
                                <Accordion
                                    key={item.order}
                                    extraClass={"secondary"}
                                    iconOpen={"minus"}
                                    iconClosed={"plus"}
                                    title={
                                        <>
                                            {!item.dateEnd && <div className="sy-chip">NOW</div>}
                                            <strong>{item.title}</strong>
                                            <em>{formatMonthsToYearMonth(getMonthGap(item.dateStart, item.dateEnd))}</em>
                                        </>
                                    }
                                >
                                    <MyInfoSection item={item} />
                                </Accordion>
                            ))}
                            </Accordions>
                        </div>
                    </Accordion>
                    <Accordion title="Skills & Tools" extraClass={"primary"}>
                        <div className="skills">
                            <div className="skills__item">
                                <div className="skills__item__title">
                                    <i><FeatherIcon icon="edit" size="12"/></i>
                                    <span>MY</span><strong>SKILLS</strong>
                                </div>
                                <div className="skills__item__box">
                                    <ul className="list-bullet">
                                        <li><strong>웹 표준·웹 접근성</strong>에 맞춰 HTML/CSS 마크업을 작성합니다.</li>
                                        <li> Chrome, Firefox, Edge, Safari 등 주요 브라우저에서의 크로스 브라우징을 맞춰 구현합니다.</li>
                                        <li><strong>웹 표준, 웹 접근성, 크로스 브라우징</strong> 마크업이 가능합니다.</li>
                                        <li>데스크톱·태블릿·모바일 환경에 맞춘 <strong>반응형/적응형</strong> 레이아웃을 구현할 수 있습니다.</li>
                                        <li>CSS 전처리기(SCSS, LESS)로 스타일 코드를 구조화해 작성할 수 있습니다.</li>
                                        <li>ES5, ES6문법 차이를 이해하며, 상황에 맞게 JavaScript와 jQuery 코드를 작성할 수 있습니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <ul className="list-bullet">
                                        <li>Vue, React 구조를 이해하며, 해당 환경에서의 퍼블리싱 경험이 있습니다.</li>
                                        <li>PHP 기본 구조를 이해하며, PHP 기반 프로젝트에서 퍼블리싱 경험이 있습니다.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="skills__item">
                                <div className="skills__item__title">
                                    <i><FeatherIcon icon="tool" size="12"/></i>
                                    <span>used</span><strong>TOOLS</strong>
                                </div>
                                <div className="skills__item__box">
                                    <ul className="list-bullet">
                                        <li>Visual Studio Code, WebStrom을 활용할 수 있습니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <ul className="list-bullet">
                                        <li>GIT/SVN의 형상관리 툴을 사용 가능합니다.</li>
                                        <li>회사 환경에 맞는 Git Flow 브랜치 전략을 직접 구상해본 경험이 있습니다.</li>
                                    </ul>
                                </div>
                                <div className="skills__item__box">
                                    <ul className="list-bullet">
                                        <li>Figma, XD 툴을 이용한 프로토 타이핑 작업, 컴포넌트(에셋)을 활용한 디자인 시스템 셋팅이 가능합니다.</li>
                                        <li>Photoshop을 이용한 이미지 가공 작업이 가능합니다.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="skills__icons">
                                <div className="sy-marquee">
                                    <div className="marquee__track">
                                        {[...Array(2)].map((_, idx) =>
                                            skillIcons.map((icon, i) => (
                                                <span className="skills__icon" key={`${idx}-${i}`}>
                                                    {icon}
                                                  </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                    <Accordion title="Education" extraClass={"primary"}>
                        {MyInfo.education.map((item) => (
                            <MyInfoSection  key={item.order} title={item.title}  item={item} />
                        ))}
                    </Accordion>
                </Accordions>
            </div>
        </section>
    );
};

export default Profile;