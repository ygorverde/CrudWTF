
import { Row, Col, Input, DatePicker, Select, Button } from 'antd';
import { UserOutlined, ToolOutlined } from '@ant-design/icons';
import api from '../../services/api';

import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { responsiveMap } from 'antd/lib/_util/responsiveObserve';

const { TextArea } = Input;
const { Option } = Select;

type TypesType = {
    id: string;
    description: string;
}

export function ClientSection() {
    const [type, setType] = useState('');
    const [client, setClient] = useState('');
    const [observation, setObservation] = useState('');
    const [user, setUser] = useState(1);
    const [types, setTypes] = useState<TypesType[]>([]);
    const [creatingType, setCreatingType] = useState(false);

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dateNow = dia + '/' + mes + '/' + ano;

    useEffect(() => {
        api.get('/').then(resp => {
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
        api.post('/api/insert', { type: type, client: client, observation: observation, user: user }).then(() => {
            alert('Inserido com sucesso!')
        })
    };

    return (
        <div className="clientInfos">
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
                    {!creatingType ?
                        <Select
                            style={{ width: '100%' }}
                            onChange={handleSelect}
                            placeholder="Selecione o tipo"
                            value={type}
                        >
                            <Option key="newtype" value="0">+ Criar novo tipo</Option>
                            {types.map(type => {
                                return (
                                    <Option value={type.id} key={type.id}>{type.description}</Option>
                                )
                            })}
                        </Select>
                        : <Input placeholder="Digite o novo tipo de atendimento" prefix={<ToolOutlined />}
                            onChange={(e) => setType(e.target.value)} />}
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
            <Button onClick={submitService} type="primary">Prestar atendimento</Button>
        </div>
    );
}
