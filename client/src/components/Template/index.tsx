import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';

import 'antd/dist/antd.css';

import './styles.css';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusOutlined,
    BookOutlined,
    UserOutlined
} from '@ant-design/icons';

type LayoutProps = {
    children: ReactNode;
}

const { Header, Sider, Content } = Layout;

export function Template({ children }: LayoutProps) {
    const [collapsed, setCollapsed] = useState(false);

    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <Avatar size={40} icon={<UserOutlined />} />
                        <span> Olá, Ygor.</span>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<PlusOutlined />} title={false}>
                        <Link to="/">Novo atendimento</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BookOutlined />} title={false}>
                        <Link to="/orders">Atendimentos</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {collapsed ?
                        <MenuUnfoldOutlined className="trigger" onClick={toggle} /> :
                        <MenuFoldOutlined className="trigger" onClick={toggle} />
                    }
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}