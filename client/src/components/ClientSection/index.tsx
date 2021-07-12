
import { Row, Col, Input, DatePicker, Select, Button, Divider } from 'antd';
import { UserOutlined, ToolOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import { ModalWTF } from '../Modal';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const { TextArea } = Input;
const { Option } = Select;

type TypesType = {
    id: string;
    description: string;
}

export function ClientSection() {
    const { user } = useAuth();
    const [type, setType] = useState('');
    const [client, setClient] = useState('');
    const [observation, setObservation] = useState('');
    const [types, setTypes] = useState<TypesType[]>([]);
    const [creatingType, setCreatingType] = useState(false);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dateNow = dia + '/' + mes + '/' + ano;
    const dateNowSql = ano + '-' + mes + '-' + dia;

    useEffect(() => {
        api.get('/types').then(resp => {
            setTypes(resp.data)
        })
    }, [])

    function handleSelect(value: string) {
        if (value === '0') {
            setCreatingType(true)
        } else {
            setType(value)
        }
    };

    function submitService() {
        api.post('/services', { 
            date_exec: dateNowSql, 
            client: client, 
            observation: observation, 
            id_user: user?.id, 
            id_type: type }).then(resp => {
            toast.success('Atendimento realizado com sucesso!!');
            clear();
        }).catch((err) => {
            toast.error(err.response.data);
        })
    };

    function clear() {
        setType('');
        setClient('');
        setObservation('');
    }

    return (
        <div className="clientInfos">
            <ModalWTF setIsOpen={setCreatingType} modalIsOpen={creatingType}/>
            <ToastContainer />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="top">
                <Col className="gutter-row" span={5}>
                    <span>Data da execução</span>
                    <br />
                    <br />
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder={dateNow}
                        disabled
                    />
                </Col>
                <Col className="gutter-row" span={5}>
                    <span>Tipo de atendimento</span>
                    <br />
                    <br />

                        <Select
                            style={{ width: '100%' }}
                            onChange={handleSelect}
                            placeholder="Selecione um tipo"
                            value={type}
                        >
                            <Option key="newtype" value="0" style={{backgroundColor: '#ff0000', color: '#FFF'}}>+ Criar novo tipo</Option>
                            {types.map(type => {
                                return (
                                    <Option value={type.id} key={type.id}>{type.description}</Option>
                                )
                            })}
                        </Select>
                </Col>
                <Col className="gutter-row" span={6}>
                    <span>Cliente atendido</span>
                    <br />
                    <br />
                    <Input placeholder="Insira o nome do cliente" prefix={<UserOutlined />}
                        value={client}
                        onChange={(e) => setClient(e.target.value)} />
                </Col>
                <Col className="gutter-row" span={8}>
                    <span>Observações</span>
                    <br />
                    <br />
                    <TextArea
                        placeholder="Se necessário, informe as observações sobre o atendimento."
                        autoSize={{ minRows: 5 }}
                        showCount maxLength={600}
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                    />
                </Col>
            </Row>
            <Divider type="horizontal" orientation="left">
                <Button onClick={submitService} type="primary">Prestar atendimento</Button>
                {/* <Button onClick={() => console.log('User: ', user)} style={{ background: '#FF0000', color: '#FFF', marginLeft: '25px' }}>Adicionar novo tipo</Button> */}
                </Divider>
        </div>
    );
}
