import Sponsers from "./MainPage/Sponsers";
import TopSection from "./MainPage/TopSection";
import AboutJoin from "./MainPage/AboutJoin";
import "./css/style.css";
import WhyUs from "./MainPage/WhyUs";
import Services from "./MainPage/Services";
import Statistics from "./MainPage/Statistics";
import Openion from "./MainPage/Openion";
import ContactUs from "./MainPage/ContactUs";
import Footer from "./MainPage/Footer";

function Main(props) {
  try {
    return (
      <>
        <div className="main-page">
          <TopSection />
          <Sponsers />
          <AboutJoin />
          <WhyUs />
          <Services />
          <Statistics />
          <Openion />
          <ContactUs />
          <Footer />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Main;
