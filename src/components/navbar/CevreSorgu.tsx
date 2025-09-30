import { Accordion } from 'react-bootstrap'
import ParkYesilAlanSorgu from './CevreComponent/ParkYesilAlanSorgu'
import { useMapContext } from '../../context/MapContext'

const CevreSorgu = () => {
    const {selectedIlceId} = useMapContext();
    return (
        <Accordion defaultActiveKey={null}>
            <Accordion.Item eventKey="ilce">
                <Accordion.Header>Çevre Sorgu</Accordion.Header>
                <ParkYesilAlanSorgu id={Number(selectedIlceId)} />
            </Accordion.Item>
        </Accordion>
    )
}

export default CevreSorgu