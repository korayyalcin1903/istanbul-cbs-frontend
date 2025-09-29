import React from "react";
import { Accordion } from "react-bootstrap";
import IlceSorgu from "./IlceMahalleComponent/IlceSorgu";
import MahalleSorgu from "./IlceMahalleComponent/MahalleSorgu";
import { useMapContext } from "../../context/MapContext";

const IlceMahalleSorgu: React.FC = () => {
  const {selectedIlceId} = useMapContext();

  return (
    <>
      <Accordion defaultActiveKey={null}>
        <Accordion.Item eventKey="ilce">
          <Accordion.Header>İlçe / Mahalle Sorgu</Accordion.Header>
          <IlceSorgu />
          <MahalleSorgu id={Number(selectedIlceId)}/>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default IlceMahalleSorgu;
