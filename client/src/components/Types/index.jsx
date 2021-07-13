import { List, Button, Skeleton, Switch } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTypes } from '../../hooks/useTypes';
import './styles.css'

const buttonAction = {
    backgroundColor: '#FF0000',
    color: '#FFF',
    borderRadius: '3px',
    border: 'none'
}

export function Types() {
    const { initLoading, list, deleteType, setDisabledType } = useTypes();

    function handleSwitch(id, checked) {
        setDisabledType(id, checked)
    }

    return (
        <>
        <ToastContainer />
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[
                        <Switch checked={item.enabled} onChange={c => handleSwitch(item.id, c)} />,
                        <Button onClick={() => deleteType(item.id)}style={buttonAction}><DeleteOutlined /></Button>
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            title={<span>{item.description}</span>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
        </>
    );
}