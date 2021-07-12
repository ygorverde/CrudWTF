import { BrowserRouter } from 'react-router-dom';

import { Template } from './components/Template';

import Routes from './Routes';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Template>
          <Routes />
        </Template>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
