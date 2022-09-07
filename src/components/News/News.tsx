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
  summary: string;
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "82d2ed85d6msh851bbd57345cd11p16a6fajsn2270f42277cd",
    "X-RapidAPI-Host": "free-news.p.rapidapi.com",
  },
};

function News() {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      "https://free-news.p.rapidapi.com/v1/search?q=golden%20state%20warriors&lang=en&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const givenItems: IItem[] = [];
        const finalItems: IItem[] = [];
        for (const item of res.articles) {
          givenItems.push(item);
        }
        for (const item of givenItems) {
          const title = item.title;
          const summary = item.summary;
          const link = item.link;
          const data = {
            title,
            link,
            summary,
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
              <EachNewsDesc>{item.summary}</EachNewsDesc>
            </EachNews>
          ))
        )}
      </NewsContainer>
    </WholeContainer>
  );
}

export default News;
