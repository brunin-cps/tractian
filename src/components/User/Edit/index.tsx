import "./style.scss";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

type EditProps = {
  id: number,
  name: string,
  email: string,
  companyId: number,
  unityId: number
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  show: boolean
}

const EditUser = (props: EditProps) => {
  const [showSucess, setShowSucess] = useState(false);
  const handleCloseEdit = () => props.setShow(false);
  const handleCloseSucess = () => setShowSucess(false);

  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)
  const [companyId, setCompanyId] = useState(props.companyId)
  const [unityId, setUnityId] = useState(props.unityId)

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

  const updateUser = async (id: number) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        companyId: companyId,
        unityId: unityId
      })
    };
    await fetch("https://my-json-server.typicode.com/tractian/fake-api/users/" + id, requestOptions).then((res) => {
      console.log(res);
      props.setShow(false)
      setShowSucess(true)
    });
  }

  return (
    <>
      <Modal show={props.show} onHide={handleCloseEdit} centered>
        <Modal.Header closeButton className="headerEdit">
          <Modal.Title>EDIT USER INFO</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => onChangeEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Unit Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 1"
                value={unityId}
                onChange={e => onChangeUnityId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Id</Form.Label>
              <Form.Control
                type="number"
                placeholder="example: 1"
                value={companyId}
                onChange={e => onChangeCompanyId(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateUser(props.id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSucess} onHide={handleCloseSucess} centered>
        <Modal.Header closeButton>
          Usuario editado com sucesso.
        </Modal.Header>
      </Modal>
    </>
  );
};

export default EditUser;