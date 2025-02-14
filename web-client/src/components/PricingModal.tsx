import { useQuery, gql } from "@apollo/client";
import { Modal, Button, Card, Spinner, Alert, Row, Col } from "react-bootstrap";

const GET_PRICING_PLANS = gql`
  query PricingPlans($countryCode: String!) {
    pricingPlans(countryCode: $countryCode) {
      _id
      billingFrequency
      trialPeriodDays
      isRecommended
      price
      currency
    }
  }
`;

type PricingPlan = {
  _id: string;
  billingFrequency: "monthly" | "yearly";
  trialPeriodDays: number;
  isRecommended: boolean;
  price: number;
  currency: string;
};

function PricingModal({ show, onHide }: { show: boolean; onHide: () => void }) {
  const { loading, error, data } = useQuery(GET_PRICING_PLANS, {
    variables: { countryCode: "US" },
  });

  console.log(data);

  const pricingPlans = data?.pricingPlans;

  if (loading || !pricingPlans) return <Spinner animation="border" />;
  if (error)
    return (
      <Alert variant="danger">Error loading pricing: {error.message}</Alert>
    );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Choose Your Plan</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted">
          Select a plan that fits your learning journey.
        </p>
        <Row>
          {pricingPlans.map((plan: PricingPlan) => (
            <Col key={plan._id} md={6}>
              <Card
                className={`mb-3 ${plan.isRecommended ? "border-primary" : ""}`}
              >
                <Card.Body>
                  <Card.Title>
                    {plan.billingFrequency === "monthly"
                      ? "Monthly Plan"
                      : "Yearly Plan"}
                  </Card.Title>
                  <Card.Text>
                    <strong>
                      ${plan.price} {plan.currency}
                    </strong>
                  </Card.Text>
                  {plan.trialPeriodDays && (
                    <p className="text-muted">
                      Includes {plan.trialPeriodDays}-day trial
                    </p>
                  )}
                  <Button variant="primary">
                    {plan.trialPeriodDays ? "Start Trial" : "Subscribe"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PricingModal;
