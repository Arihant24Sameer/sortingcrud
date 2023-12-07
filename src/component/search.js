// Modal.js

import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, onClose, children }) => {
  return (
    <BootstrapModal show={show} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Search Result</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
