import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import StakeForm from "../components/StakeForm";
import WithdrawForm from "../components/WithdrawForm";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <>
      <main>
        <div className="bg-[url('../public/images/stars.png')] bg-blue-950 z-50">
          <Header />
          <StakeDetails />
          <Footer></Footer>
        </div>
      </main>

    </>
  );
}