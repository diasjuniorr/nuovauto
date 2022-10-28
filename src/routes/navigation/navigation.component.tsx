import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const pages = [
  { name: "Home", path: "/" },
  { name: "Perícias", path: "/pericias/list" },
  { name: "Clientes", path: "/costumers/list" },
  { name: "Add Cliente", path: "/costumers/add" },
  { name: "Add Usuário", path: "/users/add" },
];

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {pages.map((page, index) => {
                return (
                  <MenuItem onClick={handleClose} key={index}>
                    <Link to={page.path} style={{ textDecoration: "none" }}>
                      {page.name}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Nuovauto
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "15vh",
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1" textAlign="center">
              Nuovauto © 2022
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
