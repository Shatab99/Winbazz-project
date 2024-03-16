import Games from "../Game/Games";
import Banner from "./Banner";
import Footer from "./Footer";
import Notice from "./Notice";
import SecondBanner from "./SecondBanner";


const Home = () => {
    return (
        <div>
            <Notice/>
            <Banner/>
            <Games/>
            <SecondBanner/>
            <Footer/>
        </div>
    );
};

export default Home;