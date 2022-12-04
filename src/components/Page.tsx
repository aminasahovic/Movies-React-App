import React, { useEffect, useState } from "react";
import Button from "./Button";
import Movies from "./Movies";
import axios from "axios";
import { DivInput, Input, Line, PageBackground, SearchDiv, TabName, TabNameWrapper } from "./Page.style";
export interface IApp {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchParams {
  title: string;
  type: string;
  page: number;
}
const Page: React.FC = () => {
  let tip: SearchParams = {
    title: "Mummy",
    type: "movie",
    page: 1,
  };

  const [dataApi, setDataApi] = useState<IApp[]>([]);
  const [search, setSearch] = useState<SearchParams>(tip);
  const [typeApi, setTypeApi] = useState("movie");

  function fetchData() {
    axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "2b71524",
          s: search.title,
          type: search.type,
          page: search.page,
        },
      })
      .then((r) => {
        const newMovies: IApp[] = [];

        r.data.Search.forEach((p: IApp) => newMovies.push(p));

        setDataApi((oldMovies: any) =>
          search.page === 1 ? newMovies : [...oldMovies, ...newMovies]
        );
        console.log("data:", r.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  const handleScroll = (e: any) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      const searchTemp = {
        title: search.title,
        page: search.page + 1,
        type: search.type,
      };
      setSearch(searchTemp);
    }
  };

  function ChangeTabMovies() {
    setTypeApi("movie");
    setTabName("Movies")
  }
  function ChangeTabSeries() {
    setTypeApi("series");
    console.log(typeApi);
    setTabName("Series")

  }

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, [search]);

  const [tabName,setTabName]=useState("Movies");
  return (
    <PageBackground>
      <Button tabName="Movie" onClick={() => ChangeTabMovies()}></Button>
      <Button tabName="Series" onClick={() => ChangeTabSeries()}></Button>
      <Line />
      <DivInput>
        <SearchDiv>
          <TabNameWrapper>
        <TabName>{tabName}</TabName>
        </TabNameWrapper>
        <Input
          type="text"
          placeholder="   Search"
          id="inputSerach"
          onChange={(e) => {
            setSearch({
              title: e.target.value,
              type: typeApi,
              page: 1,
            });
          }}
        />
        </SearchDiv>
        
        {dataApi && dataApi.length && <Movies moviesData={dataApi} />}
      </DivInput>
    </PageBackground>
  );
};
export default Page;
