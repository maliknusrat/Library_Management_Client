import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import GetUserInfo from "../../../utils/GetUserInfo";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { MdArticle } from "react-icons/md";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "black",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function StaffSidebar() {
  const [open, setOpen] = React.useState(true);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const dropDownRef = React.useRef(null);
  const user = GetUserInfo();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;


  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDropdownToggle = () => setOpenDropdown((prev) => !prev);

  const handleDropdownItemClick = (item) => {
    setOpenDropdown(false);
    switch (item) {
      case "Profile":
        navigate("/staff/profile");
        break;
      case "Dashboard":
        navigate("/staff/dashboard");
        break;
      case "Log Out":
        localStorage.removeItem("type");
        localStorage.removeItem("email");
        navigate("/");
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const closeDropdown = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);
  const menuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Dashboard', path: '/staff/dashboard', icon: <DashboardIcon /> },
    { label: 'Offline Books', path: '/staff/getOfflineBooks', icon: <HomeIcon /> },
    { label: 'Online Books', path: '/staff/getOnlineBooks', icon: <LibraryBooksIcon /> },
    { label: 'Request Books', path: '/staff/requestbook', icon: <BookmarkAddIcon /> },
    { label: 'Offline Books Issue', path: '/staff/offlineBook', icon: <BookmarkAddIcon /> },
    { label: 'Book Issues List', path: '/staff/booklists', icon: <MdArticle /> },
    { label: 'Book Summary', path: '/staff/bookSummary', icon: <SummarizeIcon /> },
    { label: 'Profile', path: '/staff/profile', icon: <AccountCircleIcon /> }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          {/* Dropdown */}
          <div className="mr-5">
            <div
              ref={dropDownRef}
              className="relative mx-auto w-fit text-black"
            >
              <button onClick={handleDropdownToggle}>
                <img
                  width={40}
                  height={40}
                  className="size-10 rounded-full bg-slate-500 object-cover duration-500 hover:scale-x-[98%] hover:opacity-80"
                  src={user[0]?.Image}
                  alt="avatar drop down navigate ui"
                />
              </button>
              <ul
                className={`${
                  openDropdown ? "visible duration-300" : "invisible"
                } absolute left-0 top-12 z-50 w-fit rounded-sm bg-slate-200 shadow-md`}
              >
                {["Profile", "Dashboard", "Log Out"].map((item, idx) => (
                  <li
                    key={idx}
                    className={`rounded-sm px-6 py-2 ${
                      openDropdown ? "opacity-100 duration-300" : "opacity-0"
                    } ${
                      item === "Log Out"
                        ? "text-red-500 hover:bg-red-600 hover:text-white"
                        : "hover:bg-slate-300"
                    }`}
                    onClick={() => handleDropdownItemClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Typography variant="h6" noWrap component="div">
            STAFF
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
  {menuItems.map(({ label, path, icon }, idx) => (
    <ListItem key={idx} disablePadding sx={{ display: 'block' }} onClick={() => navigate(path)}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          backgroundColor: isActive(path) ? '#000000' : 'inherit',
          color: isActive(path) ? '#ffffff' : 'inherit',
          '& .MuiListItemIcon-root': {
            color: isActive(path) ? '#ffffff' : 'inherit',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  ))}
</List>

      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
