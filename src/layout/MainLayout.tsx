import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import { MapProvider } from "../context/MapContext";


const MainLayout = () => {
    return (
        <MapProvider>
            <Container fluid className="d-flex flex-column min-vh-100 p-0">
                {/* Header */}
                <Header />

                <div className="flex-grow-1 overflow-hidden">
                    <Row className="h-100 g-0">
                        <Navbar />
                        <Col md={10} className="h-100 overflow-hidden">
                            <Outlet />
                        </Col>
                    </Row>
                </div>
            </Container>
        </MapProvider>
    );
};

export default MainLayout;
