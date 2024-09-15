import { ReactNode } from 'react';
import { Aside } from './components/Aside';
import './styles/globals.css';

type AppProps = {
  Component: ReactNode;
};

function App({ Component }: AppProps) {
  return (
    <div className="flex flex-row h-full">
      <Aside />
      {Component}
    </div>
  );
}

export default App;
