import "./style.scss";
import companyPic from '../../assets/company-vision.png'
import deleteIcon from '../../assets/lixeira.png'
import Delete from "./Delete";
import { useState } from 'react';
import Edit from "./Edit";



type UserProps = {
  id: number,
  name: string,
  email: string,
  companyId: number,
  unityId: number
}

const Company = (props: UserProps) => {
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
              <img src={companyPic} alt="User" className="userImage" />
            </div>
            <div className="mainInfo">
              <span className="widget-49-pro-title">{props.name}</span>
              <span className="widget-49-meeting-time">{props.email}</span>
            </div>
          </div>
          <div className="buttonBox">
            <button type="button" className="btn btn-secondary" onClick={handleShowEdit}>EDIT</button>
            <button type="button" className="btn btn-danger" onClick={handleShowDelete}>
              <img src={deleteIcon} alt="Delete Icon" className="userImage" />
            </button>
            <Delete id={props.id} name={props.name} setShow={setShowDeleted} show={showDeleted} />
            <Edit id={props.id} name={props.name} setShow={setShowEdit} show={showEdit} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Company;
