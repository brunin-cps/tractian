import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

type EditProps = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const CreateUser = (props: EditProps) => {
  const [showSucess, setShowSucess] = useState(false);
  const handleCloseEdit = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [companyId, setCompanyId] = useState<number>();
  const [unityId, setUnityId] = useState<number>()

  function onChangeName(value: string) {
    setName(value);
  }
  function onChangeEmail(value: string) {
    setEmail(value);
  }
  function onChangeUnityId(value: string) {
    setUnityId(Number(value));
  }
  function onChangeCompanyId(value: string) {
    setCompanyId(Number(value));
  }

  const createUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        companyId: companyId,
        unityId: unityId
      })
    };
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/users/", requestOptions).then((res) => {
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="example: bruno"
                autoFocus
                onChange={e => onChangeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={e => onChangeEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Unit Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 1"
                onChange={e => onChangeUnityId(e.target.value)}
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
          <Button variant="primary" onClick={createUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          Usuario criado com sucesso.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default CreateUser;