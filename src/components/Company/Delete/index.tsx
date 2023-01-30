import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

type DeleteProps = {
  id: number,
  name: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const Delete = (props: DeleteProps) => {

  const [showSucess, setShowSucess] = useState(false);

  const handleClose = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const removeCompany = async (id: number) => {
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/companies/" + id, {
      method: 'DELETE'
    }).then((res) => {
      console.log(res);
      props.setShow(false)
      setShowSucess(true)
    });
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose} centered>
        <Modal.Header closeButton className="headerDelete">
          <Modal.Title>Delete company</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete {props.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => removeCompany(props.id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          Empresa deletada com sucesso.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default Delete;
