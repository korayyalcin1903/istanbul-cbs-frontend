import React, { useEffect, useState } from 'react'
import { fetchMahalleByMahalleId, fetchMahalleListByIlceId } from '../../../api/genelApi';
import type { ResultMahalleListByIlceId } from '../../../types/GenelIstanbulTypes';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { useMapContext } from '../../../context/MapContext';

interface MahalleSorguProps {
    id: number;
}

const MahalleSorgu = ({ id }: MahalleSorguProps) => {
    const { setSelectedWkt } = useMapContext();
    const [mahalleler, setMahalleler] = useState<ResultMahalleListByIlceId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMahale, setSelectedMahale] = useState<string>("");

    useEffect(() => {
        let alive = true;
        if (id > 0) {
            (async () => {
                try {
                    const data = await fetchMahalleListByIlceId(id);
                    if (alive) setMahalleler(data);
                } catch (e: any) {
                    if (alive) setError(e?.message ?? "Veri alınamadı");
                } finally {
                    if (alive) setLoading(false);
                }
            })();
            return () => { alive = false; };
        } else {
            setMahalleler([])
            setLoading(false)
        }
    }, [id]);

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;

        if (!id) {
            setSelectedWkt(null);
            return;
        }

        setSelectedMahale(e.target.value)

        try {
            const data = await fetchMahalleByMahalleId(Number(id))
            setSelectedWkt(data ?? null)
        } catch (err) {
            console.error("fetchMahalleByMahalleId hata:", err);
            setSelectedWkt(null);
        }
    };

    const clearSelection = () => {
        setSelectedMahale("");
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
                            value={selectedMahale}
                            onChange={handleSelectChange}
                        >
                            <option value="">Bir mahalle seçin…</option>
                            {(
                                mahalleler.map((mahalle) => (
                                    <option value={mahalle.id} key={mahalle.id}>
                                        {mahalle.mahalleAdi}
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

export default MahalleSorgu