import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { ExpandMore } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Input } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuid } from "uuid";
import { auth } from "../../config/firebase.config";
import { login, logout, selectUser } from "../../features/userSlice";
import { postData } from "../../api/postData";
import { Search } from "./search/Search";
import styled from "styled-components";

import "./navbar.css";
import logo from "./svg/q-logo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Navbar = () => {
  // const [IsmodalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [input2, setinput2] = useState(false);
  const [que, setQue] = useState(false);
  const [question, setQuestion] = useState(""); //state for finally added question
  const [tag, setTag] = useState([]); // state for all the topics{tags} that are finally added
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  // const [profile,setProfile]=useState(false);

  const handleQuestion = (e) => {
    if (input === "") {
      handleClick2();
      return;
    }
    setQuestion(input);
    setQue(true);
    setTopic([]);
  };

  //for topic section
  const [value, setValue] = React.useState("");
  const [topic, setTopic] = React.useState([]);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setQue(false);
    setValue("");
    setInput("");
    setTopic([]);
    setinput2(false);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Adding question to the database

  const handleTopic = () => {
    if (topic.length === 0) {
      setinput2(true);
      handleClick3();
      return;
    }

    setTag(topic);

    postData("questions/", {
      question: question,
      tags: topic.map((el) => el.value),
      created_at: Date.now(),
      admin_name: user.displayName || null,
      admin_email: user.email || null,
      admin_img: user.photoURL || null,
      q_user_id: user.uid,
      isAnswered: false,
    });
    setQue(false);
    setValue("");
    setInput("");
    setTopic([]);
    handleClose();
  };
  const handleDelete = (e) => {
    let updatedtopic = topic.filter((item) => item.id !== e);
    setTopic(updatedtopic);
  };
  React.useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        // callMyFunction();
        const data = { value: value, id: uuid() };
        setTopic([data, ...topic]);
        setValue("");
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [topic, value]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  // for profile menu section
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  ///for pop up alert

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  //for topic alert
  const handleClick3 = () => {
    setOpen3(true);
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen3(false);
  };

  const Logo = styled.div`
    width: 95px;
    float: left;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: auto;
    }
  `;
  return (
    <div className="Nav">
      <NavLink to="/home">
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
      </NavLink>
      {/* <div className="feed">
        <Link to="/home"> Your Feed</Link>
      </div> */}
      <div className="qNav">
        <div>
          <div className="qNav_input">
            <div className="svgIcon">
              <SearchIcon />
            </div>
            <input
              className="NavSearch"
              type="text"
              placeholder="Search Quora-JUIT"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Search
              handleOpen={handleOpen}
              setSearch={setSearch}
              search={search}
            />
          </div>
        </div>
        <div className="qNav_Rem">
          <Button
            sx={{
              width: "115px",
              height: "30px",
              fontSize: "13px",
              fontWeight: "500",
            }}
            onClick={handleOpen}
          >
            Add question
          </Button>

          <div>
            {open2 ? (
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
              >
                <Alert
                  onClose={handleClose2}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  This question needs more detail. Add more information to ask a
                  clear question, written as a complete sentence..
                </Alert>
              </Snackbar>
            ) : (
              ""
            )}

            {input2 && topic.length === 0 ? (
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={open3}
                autoHideDuration={6000}
                onClose={handleClose3}
              >
                <Alert
                  onClose={handleClose3}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Please add at least one topic.{" "}
                </Alert>
              </Snackbar>
            ) : (
              ""
            )}
            <Modal
              open={open}
              onClose={handleClose}
              className="modal"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="closeIcon" onClick={() => handleClose()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      id="close"
                      className="icon_svg-stroke"
                      stroke="#666"
                      strokeWidth="1.5"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                    >
                      <path d="M5.5,5.5 L18.5,18.5" />
                      <path d="M5.5,18.5 L18.5,5.5" />
                    </g>
                  </svg>
                </div>
                {!que ? (
                  <>
                    <div className="modal__title">
                      <div className="add_btn">
                        {" "}
                        <p>Add question </p>
                        <ExpandMore />
                      </div>
                    </div>
                    <div className="modal__info">
                      <Avatar
                        sx={{ width: 24, height: 24 }}
                        className="avatar"
                        src={
                          user
                            ? user.photoURL
                            : "https://qsfs.fs.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
                        }
                      />
                      <p>{user?.displayName} asked</p>
                      <div className="modal__scope">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                          <g stroke="none" fill="none" fillRule="evenodd">
                            <g
                              className="icon_svg-stroke"
                              transform="translate(4.000000, 4.000000)"
                              stroke="#666666"
                              strokeWidth="1.5"
                            >
                              <path d="M10,15.5 C10,12.7385763 7.76142375,10.5 5,10.5 C2.23857625,10.5 0,12.7385763 0,15.5"></path>
                              <path d="M17,15.5 C17,12.7385763 14.7614237,10.5 12,10.5 C11.2764674,10.5 10.588829,10.6536817 9.96794692,10.930183"></path>
                              <circle cx="5" cy="4" r="4"></circle>
                              <path d="M9.67845014,7.25774619 C10.3330402,7.72505997 11.1344123,8 12,8 C14.209139,8 16,6.209139 16,4 C16,1.790861 14.209139,0 12,0 C11.183578,0 10.424284,0.24459363 9.79139875,0.664499992"></path>
                            </g>
                          </g>
                        </svg>
                        <p>Public</p>
                        <ExpandMore />
                      </div>
                    </div>
                    <div className="modal__Field">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Start your question with 'What', 'How', 'Why', etc. "
                      />
                    </div>

                    <div className="modal__buttons">
                      <br />
                      <button
                        className="cancle"
                        onClick={() => {
                          handleClose();
                          setInput("");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="sumbit"
                        className="add"
                        onClick={handleQuestion}
                      >
                        Add Question
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3>Edit Topics</h3>
                    <div>
                      Make sure this question has the right topics:
                      <br />
                      <span className="question">{question}</span>
                    </div>

                    <div className="qNav_input input2">
                      <div className="svgIcon">
                        <SearchIcon />
                      </div>
                      <input
                        type="text"
                        className="placeholder"
                        value={value}
                        onChange={handleChange}
                        placeholder="Add topics that best describe your question "
                      />
                    </div>

                    {topic.map((e) => {
                      return (
                        <div className="topics" key={e.id}>
                          <div>{e.value} </div>
                          <div className="topic_close">
                            <svg
                              marginLeft="15px"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 -3 25 25"
                              onClick={() => handleDelete(e.id)}
                            >
                              <g
                                id="small_close"
                                className="icon_svg-stroke"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                stroke="#666666"
                                strokeWidth="1.5"
                              >
                                <path
                                  d="M12,6 L12,18"
                                  transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "
                                />
                                <path
                                  d="M18,12 L6,12"
                                  transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000) "
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                    <div className="modal__buttons">
                      <br />
                      <button className="cancle" onClick={() => handleClose()}>
                        Cancel
                      </button>
                      <button
                        type="sumbit"
                        className="add"
                        onClick={handleTopic}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </Box>
            </Modal>
          </div>
          {/* </Modal> */}
        </div>
      </div>
    </div>
  );
};
