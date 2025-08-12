import BigGrid from "../../components/BigGrid/BigGrid";
import Grid from "../../components/Grid/Grid";
import Header from "../../components/Header/Header";
import HomeContentImage from "../../components/HomeContentImage/HomeContentImage";
import Footer from "../../components/Footer/Footer";

// АЙПИШКА 
import kinopoiskApi from "../../api/kinopoiskApi";
export default function Home() {
  return (
    <div>
      {/* ################## HEADER #################### */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "65%", marginBottom: "20px", marginTop: "5px" }}>
          <Header />
        </div>
      </div>
      {/* ################## END HEADER #################### */}

      {/* ################## HomeContentImage #################### */}
      <div style={{ marginBottom: "120px" }}>
        <HomeContentImage />
      </div>
      {/* ################## END HomeContentImage #################### */}

      {/* ################## Grid #################### */}
      <div>
        <Grid title="Recently Updated" />
      </div>
      {/* ################## END Grid #################### */}

      {/* ################## BigGrid #################### */}
      <div className="flex flex-col gap-25 mt-10">
        <div>
          <BigGrid
            count={5}
            title="Trending"
            fetchFunction={kinopoiskApi.getTrending}
          />
        </div>

        <div>
          <BigGrid
            count={5}
            title="New Release - Movies"
            fetchFunction={kinopoiskApi.getNewRelease}
          />
        </div>

        <div>
          <BigGrid
            count={5}
            title="Recommended"
            fetchFunction={kinopoiskApi.getRecommendedMovies}
          />
        </div>
      </div>
      {/* ################## END BigGrid #################### */}
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
