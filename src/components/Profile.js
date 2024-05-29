// import FeatherIcon from 'feather-icons-react';
import { AccordionItem } from "./Accordion";
import MyJsonData from '../assets/json/mydata.json';

const MyInfo = MyJsonData;
const MyInfoSection = (props) => {
    return (
        <AccordionItem
            key={props.number}
            initOpen={true}
            title={props.title}
            extraClass="profile-item"
        >
            {
                MyInfo[props.title].map((list) => {
                        return (
                            <>
                                <div key={list.title}>
                                    <span>{list.title}</span>
                                </div>
                                <ul>
                                    {
                                        list['description'].map((item, index) =>
                                            <>
                                                <li key={index}>{item}</li>
                                            </>
                                        )
                                    }
                                </ul>
                            </>
                        );
                    }
                )
            }
        </AccordionItem>
    );
};

const Profile = () => {
    return (
        <section id="profile" className="profile">
            <h1 hidden>Profile</h1>
            <div className="avatar"></div>
            <div className="profile-list">
                <MyInfoSection number="1" title="About Who Am I"/>
                <MyInfoSection number="2" title="Work Experience"/>
                <MyInfoSection number="3" title="Education"/>
            </div>
        </section>
    );
};

export default Profile;