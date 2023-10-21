import './App.css'
import { HeaderNav } from './components/HeaderNav'
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { Footer } from './components/Footer'
import { MyRoutes } from './router/MyRoutes';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <FloatingWhatsApp
        phoneNumber="598092037009"
        accountName="Aduloty lingerie"
        statusMessage="Responderemos a la brevedad"
        avatar="./logowp.jpg"
        chatMessage="Hola, en que podemos ayudarte?"
        placeholder="Escribe tu mensaje..."
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
     
        <HeaderNav/>
        
          <MyRoutes/>
       
        
        <Footer/> 
      </Router>     
    </>
  )
}

export default App