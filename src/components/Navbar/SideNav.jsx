import React, { useState } from "react";

//All the svg files
// import logo from "./svg/q-logo.png";
import Home from "./svg/home-solid.svg";
import Projects from "./svg/starred.svg";
import PowerOff from "./svg/power-off-solid.svg";
// import chatIco from "./svg/chat.svg";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { auth } from "../../config/firebase.config";
import { Avatar } from "@mui/material";

const Container = styled.div`
  position: fixed;

  .activem {
    border-right: 4px solid var(--white);

    img {
      ${
        "" /* filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%); */
      }

      ${
        "" /* filter: invert(3%) sepia(38%) saturate(6550%) hue-rotate(227deg)
        brightness(87%) contrast(99%); */
      }
      filter: invert(46%) sepia(76%) saturate(4340%) hue-rotate(199deg)
        brightness(101%) contrast(102%);
    }
  }
`;

// const Button = styled.button`
//   background-color: var(--white);
//   border: none;
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 50%;
//   margin: 0.5rem 0 0 0.5rem;
//   cursor: pointer;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   position: relative;

//   &::before,
//   &::after {
//     content: "";
//     background-color: var(--black);
//     height: 2px;
//     width: 1rem;
//     position: absolute;
//     transition: all 0.3s ease;
//   }

//   &::before {
//     top: ${(props) => (props.clicked ? "1.5" : "1rem")};
//     transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
//   }

//   &::after {
//     top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
//     transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
//   }
// `;

const SidebarContainer = styled.div`
  background-color: var(--white);
  width: 3.8rem;
  height: 86vh;
  margin-top: 25px;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${"" /* position: relative; */}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Logo = styled.div`
  width: 50px;

  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--black);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);

  padding: 2rem 0;

  ${"" /* position: absolute; */}
  top: 6rem;
  left: 0;

  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: var(--black);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  ${"" /* margin-top: 60px; */}

  &:hover {
    border-right: 4px solid #1a83ff;

    img {
      ${
        "" /* filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%); */
      }
      ${
        "" /* filter: invert(46%) sepia(76%) saturate(4340%) hue-rotate(199deg)
        brightness(101%) contrast(102%); */
      }
    }
  }
  &:focus {
    ${"" /* border-right: 4px solid #1a83ff; */}
    img {
      ${
        "" /* filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%); */
      }
      ${
        "" /* filter: invert(46%) sepia(76%) saturate(4340%) hue-rotate(199deg)
        brightness(101%) contrast(102%); */
      }
    }
  }

  img {
    width: 2rem;
    height: auto;
    ${
      "" /* filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%); */
    }
    ${
      "" /* filter: invert(10%) sepia(7%) saturate(911%) hue-rotate(191deg) brightness(91%) contrast(93%); */
    }
    filter: invert(46%) sepia(76%) saturate(4340%) hue-rotate(199deg)
        brightness(101%) contrast(102%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

// const Profile = styled.div`
//   width: ${(props) => (props.clicked ? "14rem" : "3rem")};
//   height: 3rem;

//   padding: 0.5rem 1rem;
//   /* border: 2px solid var(--white); */
//   border-radius: 20px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: ${(props) => (props.clicked ? "9rem" : "0")};

//   background-color: var(--white);
//   color: var(--black);

//   transition: all 0.3s ease;

//   img {
//     width: 2.5rem;
//     height: 2.5rem;
//     border-radius: 50%;
//     cursor: pointer;

//     &:hover {
//       border: 2px solid var(--grey);
//       padding: 2px;
//     }
//   }
// `;

// const Details = styled.div`
//   display: ${(props) => (props.clicked ? "flex" : "none")};
//   justify-content: space-between;
//   align-items: center;
// `;

// const Name = styled.div`
//   padding: 0 1.5rem;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   h4 {
//     display: inline-block;
//   }

//   a {
//     font-size: 0.8rem;
//     text-decoration: none;
//     color: var(--grey);

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Logout = styled.button`
//   border: none;
//   width: 2rem;
//   height: 2rem;
//   background-color: transparent;

//   img {
//     width: 100%;
//     height: auto;
//     filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
//       brightness(100%) contrast(126%);
//     transition: all 0.3s ease;
//     &:hover {
//       border: none;
//       padding: 0;
//       opacity: 0.5;
//     }
//   }
// `;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  // const handleClick = () => setClick(!click);
  const user = useSelector(selectUser);

  // const [profileClick, setprofileClick] = useState(false);
  // const handleProfileClick = () => setprofileClick(!profileClick);

  // profile section
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  // const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <Container>
      {/* <Button clicked={click} onClick={() => handleClick()}></Button> */}
      {/* <NavLink to="/home">
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
      </NavLink> */}
      <SidebarContainer>
        <SlickBar clicked={click}>
          <div className="qNav_avatar" onClick={handleClick1}>
            <Avatar
              className="Avatar"
              // sx={{ width: 24, height: 24 }}
              src={
                user
                  ? user.photoURL
                  : "https://qsfs.fs.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
              }
            />
          </div>

          <Item
            onClick={() => setClick(false)}
            exact
            activeClassName="activem"
            to="/home"
          >
            <img src={Home} alt="Home" />
            <Text clicked={click}>Home</Text>
          </Item>

          <Item
            onClick={() => setClick(false)}
            activeClassName="activem"
            to="/answers"
          >
            <img src={Projects} alt="Answers" />
            <Text clicked={click}>Answers</Text>
          </Item>
          <Item
            onClick={() => auth.signOut()}
            // sx={{ height: 30, fontSize: "5" }}
            activeClassName="activem"
            to="/"
          >
            <img src={PowerOff} alt="logout" />
            <Text clicked={click}>Log Out</Text>
          </Item>
        </SlickBar>
        {/* <Profile clicked={profileClick}>
          <Logout>
            <img src={PowerOff} alt="logout" />
          </Logout>
          <Details clicked={profileClick}>
            <Name>
              <h4>Jhon&nbsp;Doe</h4>
              <a href="/#">view&nbsp;profile</a>
            </Name>

            <Logout>
              <img src={PowerOff} alt="logout" />
            </Logout>
          </Details>
        </Profile> */}
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;
