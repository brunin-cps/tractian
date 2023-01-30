import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

type EditProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const AddUser = (props: EditProps) => {
  const [showSucess, setShowSucess] = useState(false);
  const handleCloseEdit = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const addUser = async () => {
    const requestOptions = {
      method: 'GET',
    };
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/workorders/", requestOptions).then((res) => {
      console.log(res);
      props.setShow(false)
      setShowSucess(true)
    });
  }

  return (
    <>
      <Modal show={props.show} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton className="headerCreate">
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type user id"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          User added with success.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default AddUser;