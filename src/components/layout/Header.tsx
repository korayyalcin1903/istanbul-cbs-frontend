import { Col, Container, Row } from "react-bootstrap"

const Header = () => {
    return (
        <Container fluid className="py-3 bg-info">
            <Row>
                <Col md={4}>Istanbul CBS</Col>
                <Col md={4}>b</Col>
                <Col md={4}>c</Col>
            </Row>
        </Container>
    )
}

export default Header;