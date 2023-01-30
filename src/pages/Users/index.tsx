import "./style.scss";
import NavBar from '../../components/Navbar';
import User from "../../components/User";
import Title from "../../components/Title";
import CreateUser from "../../components/User/Create";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import addIcon from '../../assets/add-user.png'


const animations = {
  initial: { width: 0 },
  animate: { width: "100%" },
  exit: { x: window.innerHeight, trasition: { duration: 0.1 } },
}
const Users = () => {

  const [itens, setItens] = useState<any[]>([]);
  const [createUser, setCreateUser] = useState(false);
  const handleCreateUser = () => setCreateUser(true);

  useEffect(() => {

    const fetchItens = async () => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/users");
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
          <Title title="USERS" subtitle="Check all the users registered on the system below:" />
          <div className="componentBox">
            <div className="componentBody">
              {itens.map((user, id) => (
                <User id={user.id} name={user.name} email={user.email} companyId={user.companyId} unityId={user.unitId} key={id}></User>
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
            Add User
          </Tooltip>
        }
      >
        <div className="fixedBtn">
          <img src={addIcon} alt="Delete Icon" className="userImageUser" onClick={handleCreateUser} />
        </div>
      </OverlayTrigger>
      <CreateUser setShow={setCreateUser} show={createUser}></CreateUser>
      <div className="footer">Made by Bruno</div>
    </motion.div >
  );
};

export default Users;
