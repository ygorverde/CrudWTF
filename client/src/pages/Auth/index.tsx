import { Input, Button } from 'antd';
import { useAuth } from '../../hooks/useAuth';

import './styles.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export function Auth() {
    const history = useHistory();
    const { user, signIn } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function handleLogin() {
        if(user === undefined){
            await signIn(email, password)
        }
        history.push('/')
    }

    return (
        <div className="auth-content">
            <div className="auth-modal">
                <div className="auth-title">Login</div>
                <hr />
                <br />
                <span>E-mail</span>
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <span>Senha</span>
                <Input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)}/>
                <br />
                <br />
                <Button type="primary" onClick={handleLogin}>ENTRAR</Button>
            </div>
        </div>
    )
}