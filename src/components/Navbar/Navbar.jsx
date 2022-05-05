// import Modal from "react-modal";
import { ExpandMore } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, Input } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
// import { Dropdown } from "./Dropdown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
// import { Topic } from "./Topic";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { auth } from "../../config/firebase.config";
import { login, logout, selectUser } from "../../features/userSlice";
import { postData } from "../../utils/api/postData";
import "./navbar.css";
import { Search } from "./search/Search";
import logo from "./data/q-logo.png";
import styled from "styled-components";

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
      {/* <div class="feed">
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
          {/* <Menu
            anchorEl={anchorEl1}
            open={open1}
            onClose={handleClose1}
            onClick={handleClose1}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 228,
                maxWidth: "100%",
                overflow: "visible",
                filter: "drop-shadow(rgba(0, 0, 0, 0.24) 0px 3px 8px;)",
                mt: 2.7,
                ml: 12,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 102,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <Avatar
              style={{ marginLeft: "20px" }}
              src={
                user
                  ? user.photoURL
                  : "https://qsfs.fs.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
              }
            />

            <MenuItem>
              <div className="text-menu-name">
                <div>{user?.displayName}</div>
                <div>
                  <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <g
                      id="chevron_right"
                      class="icon_svg-stroke"
                      stroke="#666"
                      stroke-width="1.5"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                    >
                      <polyline
                        id="chevron"
                        transform="translate(12.500000, 12.002415) scale(1, -1) rotate(-90.000000) translate(-12.500000, -12.002415) "
                        points="5.49758463 8.50241537 12.4975846 15.5024154 19.5024154 8.50241537"
                      ></polyline>
                    </g>
                  </svg>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" fill-rule="evenodd">
                    <path
                      d="M7 4.5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3.5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Zm13 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2l-2-2h-2"
                      class="icon_svg-stroke"
                      stroke-width="1.5"
                      stroke="#666"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <g class="icon_svg-fill_as_stroke" fill="#666">
                      <circle cx="8" cy="10.5" r="1"></circle>
                      <circle cx="11" cy="10.5" r="1"></circle>
                      <circle cx="14" cy="10.5" r="1"></circle>
                    </g>
                  </g>
                </svg>
              </ListItemIcon>
              <Link to="/chat">
                <div className="text-menu"> Messages</div>
              </Link>
            </MenuItem>
            {/* <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M3 9.5 17 5v12L3 12.5v-3Zm4.853 4.56L9.5 19H7l-1.947-5.84 2.8.9ZM19.5 7.5l2-1-2 1Zm0 3.5H22h-2.5Zm0 3.5 2 1-2-1ZM8 10.4l6-1.9-6 1.9Z"
                    class="icon_svg-stroke"
                    stroke="#666"
                    stroke-width="1.5"
                    fill="none"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </ListItemIcon>
              <div className="text-menu"> Create Ad</div>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M11.5 4v16m3.75-13H9.625C8.175 7 7 8.12 7 9.5S8.175 12 9.625 12h3.75C14.825 12 16 13.12 16 14.5S14.825 17 13.375 17H7"
                    class="icon_svg-stroke"
                    stroke="#666"
                    stroke-width="1.5"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </ListItemIcon>
              <div className="text-menu"> Monetization</div>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M5 12h3v8H5v-8Zm5.5-8h3v16h-3V4ZM16 7h3v13h-3V7Z"
                    class="icon_svg-stroke icon_svg-fill"
                    stroke-width="1.5"
                    stroke="#666"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </ListItemIcon>
              <div className="text-menu"> Your Content {"&"} stats</div>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g
                    class="icon_svg-stroke"
                    stroke-width="1.5"
                    stroke="#666"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      class="icon_svg-fill"
                      d="m10.501 16-5.499 4L5 8h11v12z"
                    ></path>
                    <path d="M8 5.923V5h11v12l-.997-.725"></path>
                  </g>
                </svg>
              </ListItemIcon>
              <div className="text-menu"> Bookmarks</div>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M20.743 10.757h0a1.5 1.5 0 0 1 0 2.122l-5.728 5.727-2.756.638.635-2.76 5.727-5.727a1.5 1.5 0 0 1 2.122 0Zm-3.182 1.061 2.121 2.121M9 19H5V5h13v3M8 9h7m-7 3h5.5M8 15h2.5"
                    class="icon_svg-stroke"
                    stroke-width="1.5"
                    stroke="#666"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </ListItemIcon>
              <div className="text-menu"> Drafts</div>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ height: 30, fontSize: "5", width: "100%" }}>
              <div className="sub-flex">
                <div className="text-sub-menu "> Dark mode</div>
                <Typography
                  className="darkmode"
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "xx-small" }}
                >
                  OFF
                </Typography>
              </div>
            </MenuItem>
            <MenuItem sx={{ height: 30, fontSize: "5" }}>
              <div className="text-sub-menu "> Settings</div>
            </MenuItem>
            <MenuItem sx={{ height: 30, fontSize: "5" }}>
              <div className="text-sub-menu ">Languages</div>
            </MenuItem>
            <MenuItem sx={{ height: 30, fontSize: "5" }}>
              <div className="text-sub-menu "> Help</div>
            </MenuItem> */}
          {/* <MenuItem
              onClick={() => auth.signOut()}
              sx={{ height: 30, fontSize: "5" }}
            >
              <ListItemIcon>
                <img src={log} width="25px" height="25px"></img>
              </ListItemIcon>
              <div className="text-sub-menu "> Logout</div>
            </MenuItem> */}
          {/* </Menu> */}

          {/* <div className="svgIcon">
            <LanguageIcon sx={{ width: 26, height: 26 }} />
          </div> */}
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
                      class="icon_svg-stroke"
                      stroke="#666"
                      stroke-width="1.5"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
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
                          <g stroke="none" fill="none" fill-rule="evenodd">
                            <g
                              class="icon_svg-stroke"
                              transform="translate(4.000000, 4.000000)"
                              stroke="#666666"
                              stroke-width="1.5"
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
                                class="icon_svg-stroke"
                                fill="none"
                                fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke="#666666"
                                stroke-width="1.5"
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
