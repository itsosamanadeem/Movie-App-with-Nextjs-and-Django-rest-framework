import Image from "next/image";
import Header from './components/header'
import MainSlider from "./components/slider";
import Trending from "./components/trending";
import MostPopular from "./components/listMovie";
import TVShows from "./components/tv_shows";

const Home=()=> {
  return (
    <>
      <div className={``}>
        {/* Home */}
        <MainSlider/>
        <Trending/>
        <MostPopular/>
        <TVShows/>
      </div>
    </>
  );
}
export default Home;