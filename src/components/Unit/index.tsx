import "./style.scss";
import networkPic from '../../assets/conexao.png'
import deleteIcon from '../../assets/lixeira.png'
import DeleteUnit from "./Delete";
import { useState, useEffect } from 'react';
import EditUnit from "./Edit";

type UserProps = {
  id: number,
  name: string,
  companyId: number,
}

const Unit = (props: UserProps) => {
  const [showDeleted, setShowDeleted] = useState(false);
  const handleShowDelete = () => setShowDeleted(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);

  const [company, setCompany] = useState<string>();

  useEffect(() => {

    const getUsers = async (id: number) => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/companies/" + id);
      const listItens = await res.json();
      setCompany(listItens.name);
    }
    getUsers(props.companyId)
  }, [props.companyId])

  return (
    <div className="card unit" >
      <div className="card-body pt-0">
        <div className="infoBox">
          <div className="topBox">
            <div className="imageBox">
              <img src={networkPic} alt="User" className="userImage" />
            </div>
            <div className="mainInfo">
              <span className="widget-49-pro-title">{props.name}</span>
              <span className="widget-49-meeting-time">Company: {company}</span>
            </div>
          </div>
          <div className="buttonBox">
            <button type="button" className="btn btn-secondary" onClick={handleShowEdit}>EDIT</button>
            <button type="button" className="btn btn-danger" onClick={handleShowDelete}>
              <img src={deleteIcon} alt="Delete Icon" className="userImage" />
            </button>
            <DeleteUnit id={props.id} name={props.name} setShow={setShowDeleted} show={showDeleted} />
            <EditUnit id={props.id} name={props.name} companyId={props.companyId} setShow={setShowEdit} show={showEdit} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Unit;
