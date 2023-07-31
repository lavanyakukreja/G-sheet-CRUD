import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Example() {
  const [show, setShow] = useState(false);
  const [technology, setTechnology] = useState("");
  const [status, setStatus] = useState("");
  const [applications, setApplications] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [rowDataId, setRowDataId] = useState(null); // Add state to store the row data ID

  const handleClose = () => {
    setShow(false);
    setRowDataId(null); // Reset row data ID when closing the modal
  };

  const handleShow = () => setShow(true);

  const onSubmit = () => {
    console.log("The data has been submitted");
    console.log(technology, status, applications);

    setIsSaving(true);
    if (rowDataId) {
      // If rowDataId exists, update the existing row data
      axios
        .put(
          `https://sheet.best/api/sheets/05d5e14e-a6e3-4921-b0fa-113025b4a124/${rowDataId}`,
          {
            technology,
            status,
            applications,
          }
        )
        .then(() => {
          setIsSaving(false);
          setShow(false); // Close the modal after successful submission
        })
        .catch((error) => {
          setIsSaving(false);
          console.error("Error updating data:", error);
        });
    } else {
      // If rowDataId does not exist, add a new row
      axios
        .post(
          "https://sheet.best/api/sheets/05d5e14e-a6e3-4921-b0fa-113025b4a124",
          {
            technology,
            status,
            applications,
          }
        )
        .then(() => {
          setIsSaving(false);
          setShow(false); // Close the modal after successful submission
        })
        .catch((error) => {
          setIsSaving(false);
          console.error("Error submitting data:", error);
        });
    }
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <span>✎</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Emerging Technology</Form.Label>
              <Form.Control
                type="text"
                placeholder="technology"
                autoFocus
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="status "
                autoFocus
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Potential Applications</Form.Label>
              <Form.Control
                type="text"
                placeholder="applications "
                autoFocus
                value={applications}
                onChange={(e) => setApplications(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit} disabled={isSaving}>
            {isSaving ? "Updating..." : "updated"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
