import { useEffect, useState } from "react";
import styled from "styled-components";

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
`;

const NewsTitle = styled.div`
  width: 80%;
  padding: 3rem 0;
  font-size: 3rem;
  font-weight: 700;
  text-align: left;
`;

const NewsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const EachNews = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.25);
  }
`;

const EachNewsTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: darkblue;
`;

const EachNewsDesc = styled.div`
  font-size: 1.5rem;
`;

interface IItem {
  title: string;
  link: string;
  description: string;
}

function News() {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/news.json?query=골든스테이트&sort=sim",
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": "w3zCdqdjo3apSpfoa53F",
          "X-Naver-Client-Secret": "syWW4IoS7X",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const givenItems: IItem[] = [];
        const finalItems: IItem[] = [];
        for (const item of res.items) {
          givenItems.push(item);
        }
        for (const item of givenItems) {
          const title = item.title
            .replaceAll("<b>", "")
            .replaceAll("</b>", "")
            .replaceAll("&quot;", "");
          const desc = item.description
            .replaceAll("<b>", "")
            .replaceAll("</b>", "")
            .replaceAll("&quot;", "");
          const data = {
            title,
            link: item.link,
            description: desc,
          };
          finalItems.push(data);
        }
        setItems(finalItems);
        setIsLoading(false);
      });
  }, []);
  return (
    <WholeContainer>
      <NewsTitle>News</NewsTitle>
      <NewsContainer>
        {isLoading ? (
          <div style={{ fontSize: "2rem" }}>Loading news...</div>
        ) : (
          items.map((item: IItem) => (
            <EachNews key={item.title} href={item.link}>
              <EachNewsTitle>{item.title}</EachNewsTitle>
              <EachNewsDesc>{item.description}</EachNewsDesc>
            </EachNews>
          ))
        )}
      </NewsContainer>
    </WholeContainer>
  );
}

export default News;
