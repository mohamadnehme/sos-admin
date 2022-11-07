import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../../index.css";

export default function Popup(props) {
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Details {props.detail?.device_id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Name: {props.detail?.name}
        <br />
        <br />
        Type: {props.detail?.type}
        <br />
        <br />
        User: {props.detail?.user.email}
        <br />
        <br />
        Status: {props.detail?.status === 1
          ? "active"
          : props.detail?.status === 0
          ? "inactive"
          : "pending"}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
