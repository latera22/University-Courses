import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

interface Course {
  id: string;
  name: string;
}

function NavBar() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [drop, setDrop] = useState<Course[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false); // For mobile drawer

  useEffect(() => {
    axios
      .get("/api/course/courseDropDown")
      .then((response) => setDrop(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  if (!context) return null;

  const { isLoggedIn, setIsLoggedIn, userData, setUserData } = context;
  const open = Boolean(anchorEl);

  // Menu handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget); // More generic type for event target
  const handleClose = () => setAnchorEl(null);
  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setProfileMenuAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserData(null);
      handleProfileMenuClose();
      navigate("/function/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar sx={{ backgroundColor: "#FFFFFFFF", color: "black" }}>
      <Toolbar>
        {/* Logo / Title */}
        <Typography sx={{ flexGrow: 1, fontSize: 24, fontWeight: "bold" }}>
          Big Project
        </Typography>

        {/* Desktop Navigation */}
        {isLoggedIn ? (
          <>
            <div className="hidden md:flex items-center">
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", mr: 2 }}
                onClick={handleClick}
              >
                Courses
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {drop.length > 0 ? (
                  drop.map((course) => (
                    <MenuItem
                      key={course.id}
                      onClick={() => {
                        navigate(`/courses/${course.id}`);
                        handleClose();
                      }}
                    >
                      {course.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </Menu>

              <Button
                variant="contained"
                sx={{ backgroundColor: "black", mr: 2 }}
                onClick={() => navigate("/machine-learning")}
              >
                Machine Learning
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", mr: 2 }}
                onClick={() => navigate("/mobile-development")}
              >
                Mobile App Development
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", mr: 2 }}
                onClick={() => navigate("/web-development")}
              >
                Web Development
              </Button>

              <IconButton
                color="inherit"
                onClick={handleProfileMenuClick}
                sx={{ ml: 2 }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchorEl}
                open={Boolean(profileMenuAnchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>{userData?.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>

            {/* Mobile Navigation (Drawer) */}
            <div className="flex md:hidden">
              <IconButton onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
              >
                <List sx={{ width: 250 }}>
                  <ListItem button onClick={handleClick}>
                    <ListItemText primary="Courses" />
                  </ListItem>
                  {drop.map((course) => (
                    <ListItem
                      button
                      key={course.id}
                      onClick={() => {
                        navigate(`/courses/${course.id}`);
                        setMobileOpen(false);
                      }}
                    >
                      <ListItemText primary={course.name} />
                    </ListItem>
                  ))}
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/machine-learning");
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText primary="Machine Learning" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/mobile-development");
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText primary="Mobile App Development" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      navigate("/web-development");
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText primary="Web Development" />
                  </ListItem>
                  <ListItem button disabled>
                    {userData?.email}
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Drawer>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              component={Link}
              to="/auth/login"
              sx={{ backgroundColor: "black", mr: 2 }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/auth/signup"
              sx={{ backgroundColor: "black" }}
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
