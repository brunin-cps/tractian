import "./style.scss";
import NavBar from '../../components/Navbar';
import Unit from "../../components/Unit";
import Title from "../../components/Title";
// import CreateUnit from "../../components/User/Create";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import addNetwork from '../../assets/team.png'
import CreateUnit from "../../components/Unit/Create";


const animations = {
  initial: { width:0 },
  animate: { width:"100%" },
  exit: { x: window.innerHeight,trasition:{duration:0.1} },
}

const Units = () => {

  const [itens, setItens] = useState<any[]>([]);
  const [createUser, setCreateUser] = useState(false);
  const handleCreateUser = () => setCreateUser(true);

  useEffect(() => {

    const fetchItens = async () => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/units");
      const listItens = await res.json();
      setItens(listItens)
    }

    fetchItens()
  }, [])

  return (
    <motion.div variants={animations} initial="initial" exit="exit" animate="animate">
      <NavBar></NavBar>
      <div className='usersContainer'>
        <div className='usersBox'>
          <Title title="UNITS" subtitle="Check all the units registered on the system below:" />
          <div className="componentBox">
            <div className="componentBody">
              {itens.map((unit, id) => (
                <Unit id={unit.id} name={unit.name} companyId={unit.companyId} key={id}></Unit>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OverlayTrigger
        key={'top'}
        placement={'top'}
        overlay={
          <Tooltip id={`tooltip-${'top'}`}>
            Add Unit
          </Tooltip>
        }
      >
        <div className="fixedBtn">
          <img src={addNetwork} alt="Delete Icon" className="userImageUser" onClick={handleCreateUser} />
        </div>
      </OverlayTrigger>
      <CreateUnit setShow={setCreateUser} show={createUser}></CreateUnit>
      <div className="footer">Made by Bruno</div>
    </motion.div >
  );
};

export default Units;
