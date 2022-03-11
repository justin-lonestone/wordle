import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Wordle from './Wordle';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route index element={<Wordle />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
