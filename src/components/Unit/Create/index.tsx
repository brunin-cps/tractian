import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

type EditProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const CreateUnit = (props: EditProps) => {
  const [showSucess, setShowSucess] = useState(false);
  const handleCloseEdit = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const [name, setName] = useState("")
  const [companyId, setCompanyId] = useState<number>();


  function onChangeName(value: string) {
    setName(value);
  }

  function onChangeCompanyId(value: string) {
    setCompanyId(Number(value));
  }

  const createUnity = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        companyId: companyId,
      })
    };
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/units/", requestOptions).then((res) => {
      console.log(res);
      props.setShow(false)
      setShowSucess(true)
    });
  }

  return (
    <>
      <Modal show={props.show} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton className="headerCreate">
          <Modal.Title>Add Unity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="example: Jaguar"
                autoFocus
                onChange={e => onChangeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 1"
                onChange={e => onChangeCompanyId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={createUnity}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          Unity created with sucess.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default CreateUnit;