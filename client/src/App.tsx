import { BrowserRouter } from 'react-router-dom';

import { Template } from './components/Template';

import { Routes } from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Routes />
      </Template>
    </BrowserRouter>
  );
}

export default App;
