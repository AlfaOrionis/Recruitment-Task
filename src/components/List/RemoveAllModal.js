import { Button, Modal } from "react-bootstrap";

const RemoveAllModal = ({ show, onCloseModalHandler, onRemoveAllHandler }) => (
  <Modal show={show} centered onHide={onCloseModalHandler}>
    <Modal.Header closeButton>
      <Modal.Title>Wyczyść listę</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Czy napewno chcesz usunąć wszystkie swoje filmy? Ten proces jest
      nieodwracalny.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCloseModalHandler}>
        Anuluj
      </Button>
      <Button variant="primary" onClick={onRemoveAllHandler}>
        Usuń
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RemoveAllModal;
