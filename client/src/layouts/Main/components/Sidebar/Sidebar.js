import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, Drawer, Typography } from '@material-ui/core';
import { SidebarNav } from './components';
import { connect } from 'react-redux';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const {user}=props.auth
  const classes = useStyles();

  
  const UserPages = [
    {
      title: 'Add User',
      href: '/add-user',
      icon: <AddCircleIcon />
    },
    {
      title: 'Manage User',
      href: '/manage-users',
      icon: <PersonAddDisabledIcon style={{color:'#E4A157',border:'2px  solid #E4A157' ,padding:'2px ',borderRadius:'100%'}} />
    },
    {
      title: 'About ',
      href: '/about',
      icon: <InfoIcon />
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
          <SidebarNav
            className={classes.nav}
            pages={UserPages}
          />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};
const mapStateToProps=state=>({
  auth:state.auth
})
export default connect(mapStateToProps,null)(Sidebar);
