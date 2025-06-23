import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

interface Course {
  id: string;
  name: string;
}
function NavBar() {
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } =
    useContext(AppContext)!; // Consume context
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drop, setDrop] = useState<Course[]>([]);
  const dropNavigation = useNavigate();

  const open = Boolean(anchorEl);

  ////
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/courseDropDown")
      .then((response) => {
        setDrop(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //////

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUserData(null);
      navigate("/function/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <AppBar sx={{ backgroundColor: "#EFB27DFF", color: "black" }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1, fontSize: 34 }}>Big Project</Typography>
        {isLoggedIn ? (
          <>
            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor: "black", marginRight: 4 }}
                onClick={handleClick}
              >
                Courses
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {drop.length > 0 ? (
                  drop.map((course) => (
                    <MenuItem
                      key={course.id}
                      onClick={() => alert(course.name)}
                    >
                      {course.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </Menu>
            </div>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", marginRight: 4 }}
              onClick={handleLogout}
            >
              Machine Learning
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", marginRight: 4 }}
              onClick={handleLogout}
            >
              Mobile App Development
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", marginRight: 4 }}
              onClick={handleLogout}
            >
              Web Development
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "black", marginRight: 4 }}
              onClick={handleLogout}
            >
              Logout
            </Button>

            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              component={Link}
              to="/auth/login"
              sx={{ backgroundColor: "black" }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/auth/signup"
              sx={{ backgroundColor: "black", marginLeft: 4 }}
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
