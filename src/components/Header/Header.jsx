import React, {
  useState,
  useContext,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Badge from '@material-ui/core/Badge';
import AuthContext from '../../context/AuthContext';
import useAuth from '../../hooks/auth.hook';
import ValidationModal from '../ValidationModal/ValidationModal';
import DropDown from '../DropDown/DropDown';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 'auto',
    color: '#ffffff',
    textDecoration: 'none',
  },
  avatarBtn: {
    marginLeft: '10px',
  },
  avatar: {
    backgroundColor: '#ffd600',
  },
  infoIcon: {
    color: '#ffffff',
  },
  navigation: {
    position: 'relative',
  },
}));

function Header() {
  const classes = useStyles();
  const { logout } = useAuth();
  const {
    isAuthenticated,
    fullName,
    getNotifications,
  } = useContext(AuthContext);
  const [openInfo, setOpenInfo] = useState(false);
  const [openNots, setOpenNots] = useState(false);
  const notifications = getNotifications();
  const [badge, setBadge] = useState(!notifications.length);

  let avatarName = null;

  if (fullName) {
    avatarName = fullName.split(' ').map((word) => word[0].toUpperCase()).join('');
  }

  const close = () => {
    setOpenInfo(false);
  };

  const infoHandler = () => {
    setOpenInfo(true);
  };

  const avatarHandler = () => {
    setOpenNots((prev) => !prev);
    setBadge(true);
  };

  const logoutNow = async () => {
    await logout();
    window.location.reload();
  };

  const RenderHeaderBar = () => {
    if (isAuthenticated) {
      return (
        <div className={classes.navigation}>
          <ButtonGroup color="primary">
            <Button color="inherit">Settings</Button>
            <Button onClick={logoutNow} color="inherit">logout</Button>
          </ButtonGroup>
          <IconButton onClick={avatarHandler} className={classes.avatarBtn}>
            <Badge
              badgeContent={notifications.length}
              color="error"
              invisible={badge}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Avatar
                color="primary"
                className={classes.avatar}
              >
                {avatarName}
              </Avatar>
            </Badge>
          </IconButton>
          <DropDown isOpen={openNots} />
        </div>
      );
    }

    return (
      <IconButton
        className={classes.infoIcon}
        onClick={infoHandler}
      >
        <HelpIcon />
      </IconButton>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            component="a"
            href="/home"
            className={classes.title}
          >
            RS Tasktracker
          </Typography>
          <RenderHeaderBar />
        </Toolbar>
      </AppBar>
      <ValidationModal
        isOpen={openInfo}
        close={close}
      />
    </>
  );
}

export default Header;
