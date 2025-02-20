import Image from "next/image";
import Header from './components/header'
import MainSlider from "./components/slider";
import Trending from "./components/trending";
import MostPopular from "./components/listMovie";

const Home=()=> {
  return (
    <>
      <div className={``}>
        {/* Home */}
        <MainSlider/>
        <Trending/>
        <MostPopular/>
      </div>
    </>
  );
}
export default Home;