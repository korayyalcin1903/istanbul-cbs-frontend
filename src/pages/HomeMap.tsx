import MapComponent from "../components/common/MapComponent";
import { useMapContext } from "../context/MapContext";

const HomeMap = ({ }) => {
    const { selectedWkt } = useMapContext();
    return <MapComponent data={selectedWkt} />;
}

export default HomeMap