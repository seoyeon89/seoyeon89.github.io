import AppHeader from '../components/AppHeader';
import {Link} from "react-router-dom";

const NoPage = () => {
    return (
        <>
            <AppHeader/>
            <div className="no-page">
                <div className="no-page__box">
                    <h1>404 NOT FOUND</h1>
                    <p>죄송합니다. 페이지를 찾을 수 없습니다.<br/> 존재하지 않는 주소를 압력하셨거나<br/>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
                    <Link to="/">
                        <div className="ui-button ui-button--primary">
                            홈으로가기
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NoPage;