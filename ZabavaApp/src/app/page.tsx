'use client'
import {useRouter } from 'next/navigation'
import PrimaryAppBar from "./components/AppBar";
import './page.css' 
import WovenImageList from './components/WovenImageList';
import Image from 'next/image';
import Footer from './components/Footer';


export default function Home() {
  const router = useRouter()

  return (
    <main className='home-main'>
      <PrimaryAppBar />
        <div className="home-body">
          <div className="home-top-content">
            <div className="home-call-to-action">
              <h2>O incrível universo dos eventos de espera!</h2>
              <p>Organize e participe de eventos incríveis. Viva e
                promova experiências inesquecíveis. Do presencial
                ao virtual, do pré ao pós-evento, tudo em um só lugar
              </p>
              <div className="home-call-to-action-buttons-container">
              <button className="organizar-evento" onClick={() => {router.push('/createEvent')}}>                  
                  <span className="text">ORGANIZAR EVENTOS</span>
                  <span className="circle"></span>
                </button>

                <button className="explorar-locais" onClick={() => {router.push('/venues')}}>
                  <svg viewBox="0 0 24 24" className="arr-22" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                  <span className="text2">EXPLORAR LOCAIS</span>
                  <span className="circle2"></span>
                  <svg viewBox="0 0 24 24" className="arr-12" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="home-top-image-box">
              <WovenImageList></WovenImageList>
            </div>
          </div>
          <div className="home-middle-content">
              <div id='fast-clock-container'>
                <Image
                    src="/fast-clock.png"
                    width={100}
                    height={100}
                    loading='lazy'
                    alt="Fast clock image"
                    id='fast-clock-image' />
                <p>MAIS RAPIDEZ PARA SEUS EVENTOS</p>
              </div>
              <div id='eficiency-icon-container'>
                <Image
                    src="/eficiency-icon.png"
                    width={100}
                    height={100}
                    loading='lazy'
                    alt="Eficiency icon image"
                    id='eficiency-icon-image' />
                <p>FLUIDEZ, EFICIÊNCIA E COMODIDADE PARA CRIAR SEUS EVENTOS</p>
              </div>
              <div id='security-icon-container'>
                <Image
                    src="/security-icon.png"
                    width={100}
                    height={100}
                    loading='lazy'
                    alt="Security icon image"
                    id='security-icon-image' />
                <p>SEGURANÇA NA HORA DE MONTAR SUA EXPERIÊNCIA</p>
              </div>              
          </div>
          <div className="home-botton-content">
            <h2>Quem usa aprova!</h2>
            <blockquote className="q-card q-card-color-1">
              <div className="content">Como produtor de eventos, sempre estou à procura de ferramentas que tornem o processo de organização mais eficiente e fluido. Recentemente, descobri um site incrível que revolucionou completamente a maneira como eu crio e gerencio meus eventos. Desde a facilidade de design e personalização até a comunicação!</div>
              <div className='author'>Alex Maciel, produtor de eventos</div>
            </blockquote>

            <blockquote className="q-card q-card-color-2">
              <div className="content">Descobrir este site foi uma verdadeira bênção! Com sua interface intuitiva e recursos eficazes, agora consigo gerenciar minhas propriedades e reservas de forma mais eficiente do que nunca. Desde a criação de listagens atrativas até a comunicação fluida com os organizadores de eventos, este site tornou a locação de meus espaços uma experiência sem complicações.</div>
              <div className='author'>Diego Bragança, dono de casa de evento</div>
            </blockquote>

            <blockquote className="q-card q-card-color-3">
              <div className="content">A facilidade de comunicação e a transparência nas transações me permitiram expandir significativamente minha agenda de trabalho, participando de mais eventos do que nunca.</div>
              <div className='author'>Samuel Castro, barman freelancer</div>
            </blockquote>
          </div>
        </div>
        <Footer />
    </main>
  );
}
