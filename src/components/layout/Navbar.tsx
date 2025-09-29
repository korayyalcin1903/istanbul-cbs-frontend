import React from "react";
import IlceMahalleSorgu from "../navbar/IlceMahalleSorgu";
import { Col } from "react-bootstrap";
import CevreSorgu from "../navbar/CevreSorgu";

const Navbar: React.FC = () => {

  return (
    <Col md={2} className="h-100 overflow-auto">
      <IlceMahalleSorgu />
      <CevreSorgu />
    </Col>
  );
};

export default Navbar;
