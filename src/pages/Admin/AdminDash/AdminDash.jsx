import { HomeFilled, FileAddFilled, BookFilled, UserOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Dropdown, theme } from 'antd';
import { useState } from 'react';
import { NavLink, Outlet, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GetUserInfo from '../../../utils/GetUserInfo';

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: '/',
    label: <NavLink className='font-oswald flex items-center gap-10' to="/" ><HomeFilled /> Home </NavLink>
  },
  {
    key: 'addBook',
    label: <NavLink className=' font-oswald flex items-center gap-10' to="/admin/addbook" ><FileAddFilled />Add Book </NavLink>
  },
  {
    key: 'book',
    label: <NavLink className='font-oswald  flex items-center gap-10' to="/admin/book" ><BookFilled />All Books</NavLink>
  },
  {
    key: 'addStaff',
    label: <NavLink className='font-oswald  flex items-center gap-10' to="/admin/Staff" ><UserOutlined />Staffs</NavLink>
  },
  {
    key: 'allUsers',
    label: <NavLink className='font-oswald  flex items-center gap-10' to="/admin/allUsers" ><UsergroupAddOutlined />All Users</NavLink>
  },
];

const AdminDash = () => {

  const navigate = useNavigate();

  const user = GetUserInfo();
  console.log(user);


  const logoutHandler = () => {
        localStorage.removeItem('type');
        localStorage.removeItem('email');
        navigate('/');
  };

  const dropItems = [
    {
      label: <NavLink className='flex items-center gap-10' to="/admin/adminProfile" >Profile</NavLink>,
      key: '1',
    },
    {
      label: <button onClick={logoutHandler} > Log out </button>,
      key: '2',
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    console.log('Clicked on menu item:', e);
  };

  const menu = (
    <Menu onClick={handleMenuClick} className='w-40'>
      {dropItems.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}> 
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding:0, background: colorBgContainer }}>
          <div className='flex items-center justify-end' >
            <Dropdown overlay={menu} placement="bottomRight">
              <span className=' place-items-center mr-10 py-2'>
                <img className='border size-[50px] rounded-full' src={user[0]?.Image} alt="Profile" />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{
            padding: 20,
            minHeight: 500,
            background: colorBgContainer,
            borderRadius: 3,
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDash;
