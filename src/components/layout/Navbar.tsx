import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup } from "react-bootstrap";
import { fetchIlceById, fetchIlceler } from "../../api/genelApi";
import type { ResultIlceById, ResultIlceler } from "../../types/GenelIstanbulTypes";
import { useMapContext } from "../../context/MapContext";
import IlceSorgu from "../navbar/IlceSorgu";

const Navbar: React.FC = () => {

  return (
    <Col md={2} className="h-100 overflow-auto">
      <IlceSorgu />
    </Col>
  );
};

export default Navbar;
