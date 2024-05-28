import MyJsonData from '../assets/json/mydata.json';
const MyInfo = MyJsonData;
const MyInfoSection = (props) => {
    return (
        <article key={props.title}>
            <h1>{props.title}</h1>
            {
                MyInfo[props.title].map((list) => {
                        return (
                            <>
                                <div key={list.title}>{list.title}</div>
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
                        )
                    }
                )
            }
        </article>
    )
}

const Profile = () => {
    return (
        <section>
            <h1>Profile</h1>
            <div className="avatar"></div>
            <MyInfoSection title="About Who Am I"/>
            <MyInfoSection title="Work Experience"/>
            <MyInfoSection title="Education"/>
        </section>
    )
};

export default Profile;