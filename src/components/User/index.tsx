import "./style.scss";
import userPic from '../../assets/user.png'
import deleteIcon from '../../assets/lixeira.png'
import DeleteUser from "./Delete";
import { useState } from 'react';
import EditUser from "./Edit";



type UserProps = {
  id: number,
  name: string,
  email: string,
  companyId: number,
  unityId: number
}

const User = (props: UserProps) => {
  const [showDeleted, setShowDeleted] = useState(false);
  const handleShowDelete = () => setShowDeleted(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <div className="card" >
      <div className="card-body pt-0">
        <div className="infoBox">
          <div className="topBox">
            <div className="imageBox">
              <img src={userPic} alt="User" className="userImage" />
            </div>
            <div className="mainInfo">
              <span className="widget-49-pro-title">{props.name}</span>
              <span className="widget-49-meeting-time">{props.email}</span>
            </div>
          </div>
          <div className="extraUserInfo">
            <span className="idInfo">User id: {props.id}</span>
            <span className="idInfo">Unit id: {props.unityId}</span>
            <span className="idInfo">Company id: {props.companyId}</span>
          </div>
          <div className="buttonBox">
            <button type="button" className="btn btn-secondary" onClick={handleShowEdit}>EDIT</button>
            <button type="button" className="btn btn-danger" onClick={handleShowDelete}>
              <img src={deleteIcon} alt="Delete Icon" className="userImage" />
            </button>
            <DeleteUser id={props.id} name={props.name} setShow={setShowDeleted} show={showDeleted} />
            <EditUser id={props.id} name={props.name} email={props.email} companyId={props.companyId} unityId={props.unityId} setShow={setShowEdit} show={showEdit} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default User;
