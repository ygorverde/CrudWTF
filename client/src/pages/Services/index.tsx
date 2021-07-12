import { Divider } from 'antd';
import { TableAntd } from '../../components/Table/index.jsx';

export function Services() {
    return (
        <div className="services">
            <Divider orientation="left">Atendimentos</Divider>
            <TableAntd />
        </div>
    );
}