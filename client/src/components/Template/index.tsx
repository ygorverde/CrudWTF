import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar } from 'antd';
import { useAuth } from '../../hooks/useAuth';

import 'antd/dist/antd.css';

import './styles.css';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PlusOutlined,
    BookOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

type LayoutProps = {
    children: ReactNode;
}

const { Header, Sider, Content } = Layout;

export function Template({ children }: LayoutProps) {
    const { user, validating } = useAuth()
    const [collapsed, setCollapsed] = useState(false);

    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <Layout className="layout">
            {user &&
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <div className="userandtype">
                            <span> Olá, {user?.name}.</span>
                            <a> {user.type === 1 ? 'Gestor' : 'Técnico'} </a>
                        </div>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<PlusOutlined />} title={false}>
                            <Link to="/">Novo atendimento</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<BookOutlined />} title={false}>
                            <Link to="/services">Atendimentos</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<SettingOutlined />} title={false}>
                            <Link to="/management">Gerenciamento</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            }
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <div className="pitangueira">
                        
                        {collapsed ?
                            <MenuUnfoldOutlined className="trigger" onClick={toggle} /> :
                            <MenuFoldOutlined className="trigger" onClick={toggle} />
                        }
                        <div className="title">
                            <h1>PITANGUEIRA MANUTENÇÃO DE HARDWARE LTDA</h1>
                        </div>
                    </div>
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