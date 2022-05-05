import styled from "styled-components";
import { QandA } from "./QandA";

export const HomeMain = () => {
  return (
    <Home>
      <StyledHome>
        <div className="QandA">
          <QandA />
        </div>
      </StyledHome>
    </Home>
  );
};

const StyledHome = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 80%;
  margin: auto;
  background-color: var(--primary-body-background-color);
  .space {
    position: fixed;
    top: 20px;
    height: fit-content;
  }
  .QandA {
    margin-top: 1rem;
  }

  .follow {
    height: fit-content;
  }
`;

const Home = styled.div`
  background-color: var(--primary-body-background-color);
`;
