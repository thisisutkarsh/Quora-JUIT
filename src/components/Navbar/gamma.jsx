{
  /* <Menu
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
            {/* <Paper sx={{ width: 228, maxWidth: '100%' }}  anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}> */
}

<Avatar
  style={{ marginLeft: "20px" }}
  src={
    user
      ? user.photoURL
      : "https://qsfs.fs.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
  }
/>;
//     <MenuItem>
//       <div className="text-menu-name">
//         <div>{user?.displayName}</div>
//         <div>
//           <svg width="24px" height="24px" viewBox="0 0 24 24">
//             <g
//               id="chevron_right"
//               class="icon_svg-stroke"
//               stroke="#666"
//               stroke-width="1.5"
//               fill="none"
//               fill-rule="evenodd"
//               stroke-linecap="round"
//             >
//               <polyline
//                 id="chevron"
//                 transform="translate(12.500000, 12.002415) scale(1, -1) rotate(-90.000000) translate(-12.500000, -12.002415) "
//                 points="5.49758463 8.50241537 12.4975846 15.5024154 19.5024154 8.50241537"
//               ></polyline>
//             </g>
//           </svg>
//         </div>
//       </div>
//     </MenuItem>
//     <Divider />
//     <MenuItem>
//       <ListItemIcon>
//         <svg width="24" height="24" viewBox="0 0 24 24">
//           <g fill="none" fill-rule="evenodd">
//             <path
//               d="M7 4.5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3.5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Zm13 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2l-2-2h-2"
//               class="icon_svg-stroke"
//               stroke-width="1.5"
//               stroke="#666"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             ></path>
//             <g class="icon_svg-fill_as_stroke" fill="#666">
//               <circle cx="8" cy="10.5" r="1"></circle>
//               <circle cx="11" cy="10.5" r="1"></circle>
//               <circle cx="14" cy="10.5" r="1"></circle>
//             </g>
//           </g>
//         </svg>
//       </ListItemIcon>
//       <Link to="/chat">
//         <div className="text-menu"> Messages</div>
//       </Link>
//     </MenuItem>
//   </Menu> */}
