import React from 'react';
import logo from './logo.svg';
import './App.css';
import QrcodeScanner from './components/qrcode-scanner';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <QrcodeScanner>
          <button>扫一扫</button>
        </QrcodeScanner>
      </header>
    </div>
  );
}

export default App;
