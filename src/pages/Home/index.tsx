import "./style.scss";
import logo from '../../assets/thumb-tractian.png'
import NavBar from '../../components/Navbar';
import { motion } from "framer-motion";

const animations = {
  initial: { y: window.innerHeight },
  animate: { y: 0, transition: { duration: .2 } },
  exit: { y: window.innerHeight },
}


const Home = () => {
  return (
    <motion.div variants={animations} exit="exit" initial="initial" animate="animate" transition={{ velocity: 10 }}>
      <NavBar></NavBar>
      <div className='homeContainer'>
        <div className='homeBox'>
          <div className="boxContent">
            <h1 className="title">TRACTIAN</h1 ><br /><br /><br />
            <h3>Olá, seja bem vindo ao site do processo seletivo da Tractian feito por Bruno dos Santos</h3><br />
            <h5>Confira as funcionalidades disponibilizadas na barra de navegação abaixo</h5>
          </div>
          <div className="boxImg"><img className="imageHome" src={logo} alt="logo" /></div>
        </div>
      </div>
      
    </motion.div >
  );
};

export default Home;
