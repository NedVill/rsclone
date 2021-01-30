import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  auth__title: {
    textAlign: 'center',
    margin: '20px 0',
  },
  flex: {
    display: 'flex',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  paddingTopBig: {
    paddingTop: '100px',
  },
  paddingTopMiddle: {
    paddingTop: '50px',
  },
  marginBottomSmall: {
    marginBottom: '20px',
  },
  marginBottomMiddle: {
    marginBottom: '50px',
  },
  MarginLeftSmall: {
    marginLeft: '15px',
  },
  MarginRightSmall: {
    marginRight: '15px',
  },
  navColor: {
    color: '#3e3a3a',
    textDecoration: 'none',
  },
  contentContainer: {
    paddingLeft: '50px',
  },
  popup: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      maxWidth: '500px',
    },
  },
  innerPage: {
    paddingRight: '30px',
    paddingLeft: '30px',
    minHeight: 'calc(100vh - 64px)',
  },
});

export default useStyles;
