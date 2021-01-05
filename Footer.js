import React from "react";
import "./Footer.css";
import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

export default function SimpleBottomNavigation({ home, chat }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="footer"
    >
      <Link to="/profile">
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </Link>
      <Link to={`/${home}`}>
        <BottomNavigationAction label="Matches" icon={<VisibilityOutlinedIcon />} />
      </Link>
      <Link to={`/${chat}`}>
        <BottomNavigationAction label="Chat" icon={<ModeCommentOutlinedIcon />} />
      </Link>
    </BottomNavigation>
  );
}


function Footer({ home, chat }) {
  return (
    <div className="footer">
      <Link to="/profile">
        <IconButton>
          <AccountCircleIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>

      <Link to={`/${home}`}>
        <IconButton>
          <VisibilityOutlinedIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>

      {/* <Link to={`/chat/${name}`}> */}
      <Link to={`/${chat}`}>
        <IconButton>
          <ModeCommentOutlinedIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>
    </div>
  );
}
