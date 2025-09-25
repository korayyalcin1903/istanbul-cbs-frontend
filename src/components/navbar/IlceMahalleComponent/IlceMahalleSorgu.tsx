import React from "react";
import { Accordion } from "react-bootstrap";
import IlceSorgu from "../IlceSorgu";

const IlceMahalleSorgu: React.FC = () => {

  return (
    <>
      <Accordion defaultActiveKey="ilce">
        <Accordion.Item eventKey="ilce">
          <Accordion.Header>İlçe / Mahalle Sorgu</Accordion.Header>
          <IlceSorgu />
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default IlceMahalleSorgu;
