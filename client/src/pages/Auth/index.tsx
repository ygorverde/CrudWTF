import { Input, Button } from 'antd';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';

import './styles.css';
import { useHistory } from 'react-router-dom';

export function Auth() {
    const history = useHistory();
    const { user, signIn } = useAuth();

    async function handleLogin() {
        if(user === undefined){
            await signIn()
        }
        history.push('/')
    }
    

    function getTypes() {
        api.get('/types')
        .then(res => {
            console.log(res)
        })
    }

    return (
        <div className="auth-content">
            <div className="auth-modal">
                <div className="auth-title">Login</div>
                <hr />
                <br />
                <span>E-mail</span>
                <Input placeholder="Email"/>
                <span>Senha</span>
                <Input placeholder="Senha"/>
                <br />
                <br />
                <Button type="primary" onClick={handleLogin}>ENTRAR</Button>
                <Button type="dashed" onClick={getTypes}>PEGAR TYPES</Button>
                <Button type="default" onClick={() => {}}>Setar usuário</Button>
            </div>
        </div>
    )
}