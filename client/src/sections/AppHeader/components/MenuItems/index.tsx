import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Menu } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { LOG_IN, LOG_OUT } from '../../../../lib/graphql/mutations';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../../../lib/utils';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Viewer } from '../../../../lib/types';

const { Item, SubMenu } = Menu;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems: React.FC<Props> = ({ viewer, setViewer }) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification('You have successfully logged out');
      }
    },
    onError: () => {
      displayErrorMessage('Something went wrong. Try later');
    },
  });

  const handleLogOut = () => {
    logOut();
  };
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item>
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key="/logout">
          <div onClick={handleLogOut}>
            <LogoutOutlined />
            Log out
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
