import { Container, Title, Accordion, createStyles, rem } from "@mantine/core";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const temp = await fetch("http://localhost:5000/articles");
      const tempJson = await temp.json();
      console.log(tempJson.article);
      setArticles(tempJson.article);
    };
    getArticles();
  }, []);

  const { classes } = useStyles();
  return (
    <>
      <Navbar />
      <Container size="sm" className={classes.wrapper}>
        <Title align="center" className={classes.title}>
          Recent Articles
        </Title>

        <Accordion variant="separated">
          <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control>How can I reset my password?</Accordion.Control>
            <Accordion.Panel>{placeholder}</Accordion.Panel>
          </Accordion.Item>
          {articles.map((article) => {
            return (
              <Accordion.Item className={classes.item} value={article._id}>
                <Accordion.Control>{article.title}</Accordion.Control>
                <Accordion.Panel>
                  {article.desc}
                  <br />
                  <a href={article.source} target="__blank">
                    Source
                  </a>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Container>
    </>
  );
}
