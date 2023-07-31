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
  // const [APIdata, setAPIdata] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = () => {
    console.log("The data has been submitted");
    console.log(technology, status, applications);
    setIsSaving(true);
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
        // Handle any error during submission
        console.error("Error submitting data:", error);
        // You can show an error message to the user here if needed
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("https://sheet.best/api/sheets/fef36f12-afa1-4614-b951-7b1d486152e5")
  //     .then((incomingData) => {
  //       // setAPIdata(incomingData.data);
  //     });
  // }, []);

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <span>➕</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
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
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
