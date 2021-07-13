import { Tabs } from 'antd';
import { UserSwitchOutlined, ToolOutlined } from '@ant-design/icons';
import { Types } from '../../components/Types';

const { TabPane } = Tabs;


export function Management() {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane
        tab={
          <span>
            <UserSwitchOutlined />
            Colaboradores
          </span>
        }
        key="1"
      >
        Colaboradores
      </TabPane>
      <TabPane
        tab={
          <span>
            <ToolOutlined />
            Tipos de atendimento
          </span>
        }
        key="2"
      >
        <Types />
      </TabPane>
    </Tabs>
  )
}