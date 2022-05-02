import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import animationData from "../../utils/animation.json";
import { Message } from "../message/Message";
import { HomeMain } from "./HomeMain";

const Home = () => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 1200);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {flag ? (
        <>
          <HomeMain />
          <Message />
        </>
      ) : (
        <LottieContainer>
          <Lottie options={defaultOptions} height={200} width={200} />
        </LottieContainer>
      )}
    </>
  );
};

export default Home;

const LottieContainer = styled.div`
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
