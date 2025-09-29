import { Accordion } from 'react-bootstrap'
import ParkYesilAlanSorgu from './CevreComponent/ParkYesilAlanSorgu'
import IlceSorgu from './IlceMahalleComponent/IlceSorgu'

const CevreSorgu = () => {
    return (
        <Accordion defaultActiveKey={null}>
            <Accordion.Item eventKey="ilce">
                <Accordion.Header>Çevre Sorgu</Accordion.Header>
                <IlceSorgu />
                <ParkYesilAlanSorgu />
            </Accordion.Item>
        </Accordion>
    )
}

export default CevreSorgu