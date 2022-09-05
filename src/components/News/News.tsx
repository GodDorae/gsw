import { useEffect } from "react";
import * as cheerio from "cheerio";
import * as iconv from "iconv";

function News() {
  useEffect(() => {
    fetch(
      " https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/news.json?query=%EA%B3%A8%EB%93%A0%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B8",
      {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "X-Naver-Client-Id": "w3zCdqdjo3apSpfoa53F",
          "X-Naver-Client-Secret": "syWW4IoS7X",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  return <></>;
}

export default News;
