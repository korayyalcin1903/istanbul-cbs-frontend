import React from "react";
import IlceMahalleSorgu from "../navbar/IlceMahalleComponent/IlceMahalleSorgu";
import { Col } from "react-bootstrap";

const Navbar: React.FC = () => {

  return (
    <Col md={2} className="h-100 overflow-auto">
      <IlceMahalleSorgu />
    </Col>
  );
};

export default Navbar;
