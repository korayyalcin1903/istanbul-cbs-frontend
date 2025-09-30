import { useEffect, useState } from "react";
import { useMapContext } from "../../../context/MapContext";
import type { ResultParkVeYesilAlanByIlceId } from "../../../types/CevreTypes";
import { fetchGetParkVeYesilAlanDetay, fetchParkVeYesilAlanByIlceId } from "../../../api/cevreApi";
import { Accordion, Button, Form, InputGroup } from "react-bootstrap";

interface ParkVeYesilAlanProps {
    id: number
}

const ParkYesilAlanSorgu = ({ id }: ParkVeYesilAlanProps) => {
    const { setSelectedWkt } = useMapContext();
    const [parkVeYesilAlanlar, setParkVeYesilAlanlar] = useState<ResultParkVeYesilAlanByIlceId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedParkVeYesilAlan, setSelectedParkVeYesilAlan] = useState<string>("");

    useEffect(() => {
        let alive = true;
        if (id > 0) {
            (async () => {
                try {
                    const data = await fetchParkVeYesilAlanByIlceId(id);
                    if (alive) setParkVeYesilAlanlar(data);
                } catch (e: any) {
                    if (alive) setError(e?.message ?? "Veri alınamadı");
                } finally {
                    if (alive) setLoading(false);
                }
            })();
            return () => { alive = false; };
        } else {
            setParkVeYesilAlanlar([])
            setLoading(false)
        }
    }, [id]);

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;

        if (!id) {
            setSelectedWkt(null);
            return;
        }

        setSelectedParkVeYesilAlan(id)

        try {
            const data = await fetchGetParkVeYesilAlanDetay(Number(id))
            setSelectedWkt(data ?? null)
        } catch (err) {
            console.error("fetchGetParkVeYesilAlanDetay hata:", err);
            setSelectedWkt(null);
        }
    };

    const clearSelection = () => {
        setSelectedParkVeYesilAlan("");
        setSelectedWkt(null);
    };

    return (
        <>
            <Accordion.Body>
                {loading && <div>Yükleniyor…</div>}
                {error && <div className="text-danger">{error}</div>}
                {!loading && !error && (
                    <InputGroup>
                        <Form.Select
                            value={selectedParkVeYesilAlan}
                            onChange={handleSelectChange}
                        >
                            <option value="">Bir Park veya Yeşil seçin…</option>
                            {(
                                parkVeYesilAlanlar.map((parkVeYesilAlan) => (
                                    <option value={parkVeYesilAlan.id} key={parkVeYesilAlan.id}>
                                        {parkVeYesilAlan.adi}
                                    </option>
                                ))
                            )}
                        </Form.Select>
                        <Button type="button" variant="outline-secondary" onClick={clearSelection}>
                            X
                        </Button>
                    </InputGroup>
                )}
            </Accordion.Body>
        </>
    )
}

export default ParkYesilAlanSorgu
