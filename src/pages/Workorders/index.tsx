import "./style.scss";
import NavBar from '../../components/Navbar';
import Title from "../../components/Title";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WorkorderCart from "../../components/WorkorderCard";


const animations = {
  initial: { width: 0 },
  animate: { width: "100%" },
  exit: { x: window.innerHeight, trasition: { duration: 0.1 } },
}

const Workorders = () => {

  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {
    const fetchItens = async () => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/workorders");
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
          <Title title="WORKORDERS" subtitle="Check all the system workorders below" />
          <div className="componentBoxAtivos">
            <div className="componentBodyAtivos">
              {itens.map((workorder, id) => (
                <WorkorderCart
                  assetId={workorder.assetId}
                  assignedUserIds={workorder.assignedUserIds}
                  checklist={workorder.checklist}
                  description={workorder.description}
                  id={workorder.id}
                  priority={workorder.priority}
                  status={workorder.status}
                  title={workorder.title}
                  key={id}
                ></WorkorderCart>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">Made by Bruno</div>
    </motion.div >
  );
};

export default Workorders;
