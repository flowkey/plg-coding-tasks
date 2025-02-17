import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import PricingModal from "./components/PricingModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white">
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="mb-3">Welcome to Flowkey</h1>
        <p className="text-muted">Learn piano the easy way</p>

        <Button
          variant="primary"
          className="mt-auto mb-5"
          onClick={() => setShowModal(true)}
        >
          Show Pricing
        </Button>
      </Container>
      <PricingModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}

export default App;
