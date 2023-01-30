import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

type EditProps = {
  id: number,
  name: string,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const Edit = (props: EditProps) => {
  const [showSucess, setShowSucess] = useState(false);
  const handleCloseEdit = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const [name, setName] = useState(props.name)

  function onChangeName(value: string) {
    setName(value);
  }

  const updateCompany = async (id: number) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        id: id
      })
    };
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/companies/" + id, requestOptions).then((res) => {
      console.log(res);
      props.setShow(false)
      setShowSucess(true)
    });
  }

  return (
    <>
      <Modal show={props.show} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton className="headerEdit">
          <Modal.Title>EDIT COMPANY INFO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="example: bruno"
                autoFocus
                value={name}
                onChange={e => onChangeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateCompany(props.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          Empresa editada com sucesso.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default Edit;