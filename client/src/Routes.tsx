import { Switch } from 'react-router-dom';

import { Services } from './pages/Services';
import { NewService } from './pages/NewService';
import { Auth } from './pages/Auth'
import PrivateRoute from './components/PrivateRoute';

const Routes = () => {

    return (
        <Switch>
            <PrivateRoute exact path="/" component={NewService} />
            <PrivateRoute exact path="/auth" component={Auth} />
            <PrivateRoute  exact path="/services" component={Services} />
        </Switch>
    )
}

export default Routes;