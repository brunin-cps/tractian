import "./style.scss";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddUser from "./Create";


type UserProps = {
  assetId: number,
  assignedUserIds: Array<number>,
  checklist: {
    [key: string]: {
      completed: boolean,
      task: string,
    };
  },
  description: string,
  id: number,
  priority: string,
  status: string,
  title: string,
}



const WorkorderCart = (props: UserProps) => {

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);

  // const labels =   ["Total Health Score", "Health Score"]
  // const health = [props.healthScore, 100 - props.healthScore]

  const [user, setUser] = useState<string[]>([]);

  useEffect(() => {

    const getUsers = async (id: number) => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/users/" + id);
      const listItens = await res.json();
      setUser(current => [...current, listItens.name]);
    }

    for (let index in props.assignedUserIds) {
      getUsers(props.assignedUserIds[index])
    }

  }, [props.assignedUserIds])

  return (
    <Card className={`cardTasks ${props.status === "completed" ? "opacityCardTasks" : ""}`}>
      <div className="rowTitleWorkorders">
        <div className="colTitle">
          <h3 className="titleBoxTask">#{props.id}</h3>
          <h3 className="titleBoxTask removeMargin">{props.title} <span style={{ backgroundColor: "green", color: "white", padding: ".3rem", marginLeft: ".5rem" }} className={`${props.status === "completed" ? "" : "invisibleCompleted"}`} >{props.status === "completed" ? " (Completed) " : ""}</span></h3>
        </div>
        <div className="colPriority">
          <div className="priorityBoxTask">
            <h4 className="textPriority">Priority:<strong style={{ textTransform: "uppercase", fontSize: "22px", color: "#b25162", marginLeft: "0.3rem" }}>{props.priority}</strong></h4>
          </div>
        </div>
      </div>
      <div className="rowContentWorkorders">
        <div className="colTasks">
          <div className="boxTasks">
            <div className="tasksContent">
              <h6 className="descriptionTask"><strong style={{ color: "black" }}>Description:</strong> {props.description}</h6>
              {Object.keys(props.checklist).map(key => {
                return (
                  <div key={key} className="taskBox">
                    <strong className="taskText" >Task:</strong>
                    <span style={{ marginLeft: "0.5rem" }} className={`taskText ${props.checklist[key].completed === true ? "markTask" : ""}`}>{props.checklist[key].task}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="colTasksResponsability">
          <div className="taskResponsabily">
            <h6 className="titleTaskResponsabily">Responsible users:</h6>
            {user.map((assets, id) => (
              <div key={id} className="nameUser">
                {assets}
              </div>
            ))}
            <Button className="buttonAddResp" onClick={handleShowEdit}>Add User</Button>
            <AddUser setShow={setShowEdit} show={showEdit} />
          </div>
        </div>

      </div>
    </Card>

  );
};

export default WorkorderCart;
