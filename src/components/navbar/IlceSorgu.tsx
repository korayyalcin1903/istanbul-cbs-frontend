import React, { useEffect, useState } from "react";
import { Accordion, Button, Form, InputGroup } from "react-bootstrap";
import { fetchIlceById, fetchIlceler } from "../../api/genelApi";
import type { ResultIlceler } from "../../types/GenelIstanbulTypes";
import { useMapContext } from "../../context/MapContext";

const IlceSorgu: React.FC = () => {
  const { setSelectedWkt } = useMapContext();
  const [ilceler, setIlceler] = useState<ResultIlceler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIlce, setSelectedIlce] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchIlceler();
        if (alive) setIlceler(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Veri alınamadı");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedIlce(e.target.value);

    if (!id) {
      setSelectedWkt(null);
      return;
    }

    try {
      const data = await fetchIlceById(id);
      setSelectedWkt(data.geometry ?? null);
    } catch (err) {
      console.error("fetchIlceById hata:", err);
      setSelectedWkt(null);
    }
  };


  const clearSelection = () => {
    setSelectedIlce("");
    setSelectedWkt(null);
  };

  return (
    <>
      <Accordion defaultActiveKey="ilce">
        <Accordion.Item eventKey="ilce">
          <Accordion.Header>İlçe Sorgu</Accordion.Header>
          <Accordion.Body>
            {loading && <div>Yükleniyor…</div>}
            {error && <div className="text-danger">{error}</div>}
            {!loading && !error && (
              <InputGroup>
                <Form.Select
                  value={selectedIlce}
                  onChange={handleSelectChange}
                >
                  <option value="">Bir ilçe seçin…</option>
                  {ilceler.map((ilce) => (
                    <option value={ilce.id} key={ilce.id}>
                      {ilce.ilceAdi}
                    </option>
                  ))}
                </Form.Select>
                <Button type="button" variant="outline-secondary" onClick={clearSelection}>
                  X
                </Button>
              </InputGroup>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default IlceSorgu;
