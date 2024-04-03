import React, { useContext } from "react";
import {
  Collapsible,
  CollapsibleItem,
  Container,
  Icon,
} from "react-materialize";
import { ThemeContext } from "./ThemeContext";

export default function About() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="about5" style={{ backgroundColor: theme.backgroundColor }}>
      <h3 style={{ color: theme.color }}>About</h3>
      <Container>
        <Collapsible accordion popout className="about6">
          <CollapsibleItem
            expanded={false}
            header="About Our Site"
            icon={<Icon>web</Icon>}
            node="div"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            <span
              style={{
                color: theme.color,
              }}
            >
              At our site, we are passionate about movies and providing the best
              possible experience for our users. Explore our site to discover a
              wide variety of movies in your favorite genres!
            </span>
          </CollapsibleItem>
          <CollapsibleItem
            expanded={false}
            header="How to Watch a Movie"
            icon={<Icon>movie</Icon>}
            node="div"
          >
            <span
              style={{
                color: theme.color,
              }}
            >
              Watching a movie on our site is easy. Simply search for the movie
              you want to watch or browse through our extensive selection. Once
              you have found the perfect movie, choose whether to rent or buy it
              or subscribe to our premium service for unlimited access to all of
              our movies.
            </span>
          </CollapsibleItem>
          <CollapsibleItem
            expanded={false}
            header="Getting Help"
            icon={<Icon>help</Icon>}
            node="div"
          >
            <span
              style={{
                color: theme.color,
              }}
            >
              We were here to help! If you have any questions or experience
              issues with our site, please do not hesitate to contact our
              friendly customer support team. You can reach us by phone, email,
              or live chat at any time.
            </span>
          </CollapsibleItem>
        </Collapsible>
      </Container>
    </div>
  );
}
