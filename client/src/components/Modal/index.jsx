import { Input } from 'antd';

import { Modal, Button } from 'antd';
import { ToolOutlined } from '@ant-design/icons';

export function ModalWTF ({...props})  {

  const handleOk = () => {
    props.setIsOpen(false);
  };

  const handleCancel = () => {
    props.setIsOpen(false);
  };

  return (
    <>

      <Modal title="Adicionar novo tipo de atendimento" visible={props.modalIsOpen} onOk={handleOk} onCancel={handleCancel}>
        <form>
        <Input prefix={<ToolOutlined />} maxLength={25} placeholder="Digite o novo tipo de atendimento"/>
        <Button onClick={handleCancel} style={{ background: '#FF0000', color: '#FFF', marginTop: '10px' }}>Adicionar</Button>
        </form>
      </Modal>
    </>
  );
};
