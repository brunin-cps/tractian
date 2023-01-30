import "./style.scss";
import NavBar from '../../components/Navbar';
import Company from "../../components/Company";
import Title from "../../components/Title";
import Create from "../../components/Company/Create";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import addIcon from '../../assets/add-company.png'


const animations = {
  initial: { width:0 },
  animate: { width:"100%" },
  exit: { x: window.innerHeight,trasition:{duration:0.1} },
}

const Companies = () => {

  const [itens, setItens] = useState<any[]>([]);
  const [createCompany, setCreateCompany] = useState(false);
  const handleCreateCompany = () => setCreateCompany(true);

  useEffect(() => {

    const fetchItens = async () => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/companies");
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
          <Title title="COMPANIES" subtitle="Check all the companies registered on the system below:" />
          <div className="componentBox">
            <div className="componentBody">
              {itens.map((user, id) => (
                <Company id={user.id} name={user.name} email={user.email} companyId={user.companyId} unityId={user.unitId} key={id}></Company>
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
            Add Company
          </Tooltip>
        }
      >
        <div className="fixedBtn">
          <img src={addIcon} alt="Delete Icon" className="userImageUser" onClick={handleCreateCompany} />
        </div>
      </OverlayTrigger>
      <Create setShow={setCreateCompany} show={createCompany} />
      <div className="footer">Made by Bruno</div>

    </motion.div >
  );
};

export default Companies;
