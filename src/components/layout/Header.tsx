import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import ibbLogo from "../../assets/Ibb_logo.png"

const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <Navbar expand="lg" sticky="top" className="app-navbar">
      <Container fluid className="py-2">
        <Navbar.Brand className={`d-flex align-items-center gap-3 text-${!theme}`}>
          <img src={ibbLogo} alt="" width='30px'/>
          <strong>Istanbul CBS</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="topbar" className="border-0" />
        <Navbar.Collapse id="topbar">
          <Nav className="mx-auto my-2 my-lg-0">
            <Nav.Link className="top-link" href="#">Harita</Nav.Link>
            <Nav.Link className="top-link" href="#">Analiz</Nav.Link>
            <Nav.Link className="top-link" href="#">Veri</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" className="fw-semibold">
                Katmanlar
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>OSM</Dropdown.Item>
                <Dropdown.Item>Uydu</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant={`outline-${!theme}`}
              className="fw-semibold"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title="Tema değiştir"
            >
              {theme === "light" ? "Koyu" : "Açık"}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
