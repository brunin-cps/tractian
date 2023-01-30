import "./style.scss";
import NavBar from '../../components/Navbar';
import Title from "../../components/Title";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AssetsCard from "../../components/AssetsCard";


const animations = {
  initial: { width: 0 },
  animate: { width: "100%" },
  exit: { x: window.innerHeight, trasition: { duration: 0.1 } },
}

const Assets = () => {

  const [itens, setItens] = useState<any[]>([]);

  useEffect(() => {

    const fetchItens = async () => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/assets");
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
          <Title title="ASSETS" subtitle="Check all the system assets below" />
          <div className="componentBoxAtivos">
            <div className="componentBodyAtivos">
              {itens.map((assets, id) => (
                <>
                  <AssetsCard
                    id={assets.id}
                    image={assets.image}
                    model={assets.model}
                    status={assets.status}
                    healthScore={assets.healthscore}
                    name={assets.name}
                    companyId={assets.companyId}
                    unityId={assets.unitId}
                    assignedUserIds={assets.assignedUserIds}
                    specifications={assets.specifications}
                    healthHistory={assets.healthHistory}
                    sensors={assets.sensors}
                    key={id}
                  ></AssetsCard>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer">Made by Bruno</div>
    </motion.div >

  );
};

export default Assets;
