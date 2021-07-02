import { ClientSection } from '../../components/ClientSection';
import { Divider } from 'antd';

import './styles.css';

export function NewService() {
    return (
        <div className="newService">
            <Divider type="horizontal" orientation="left">Dados do atendimento</Divider>
            <div className="clientSection">
                <ClientSection />
            </div>
        </div>
    );
}