import { Route, Switch } from 'react-router-dom';

import { Services } from './pages/Services';
import { NewService } from './pages/NewService';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={ NewService }/>
            <Route exact path="/orders" component={ Services }/>
        </Switch>
    )
}