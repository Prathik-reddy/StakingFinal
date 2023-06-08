import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";
import StakeForm from "../components/StakeForm";
import WithdrawForm from "../components/WithdrawForm";
import Footer from "../components/Footer";
import ChicNFTMinter from "../components/ChicNFTMinter";
export default function Home() {
  return (
    <>
      <main>
        <div className="bg-[url('../public/images/stars.png')] bg-blue-950 z-50">
          <Header />
          <StakeDetails />
          <ChicNFTMinter />
          <Footer></Footer>
          <NotificationContainer />
        </div>
      </main>
    </>
  );
}
