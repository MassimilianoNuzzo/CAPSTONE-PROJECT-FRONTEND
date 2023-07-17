import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Card, Spinner, Table } from "react-bootstrap";
import { getlistaOperazioni } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const MyListaOperazioni = ({ utenteCorrente }) => {

    const dispatch = useDispatch();

    const listaOperazioni = useSelector(state => state.listaOperazioni.listaOperazioni);

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(getlistaOperazioni(utenteCorrente.jwtToken, currentPage));
        console.log(listaOperazioni);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [utenteCorrente, currentPage]);

    return (
        <>
            {!listaOperazioni || !listaOperazioni.content ? (
                <div className="d-flex justify-content-center align-items-center" >
                    <Spinner animation="grow" variant="warning" />
                </div>
            ) : (
                <Card className="mb-5 d-none d-sm-none d-md-block" style={{ background: "#2d2d2d" }}>
                    <Card.Body>
                        <Card.Title className="mb-3">Storico operazioni</Card.Title>
                        <Table className='text-light m-0 table table-dark table-striped'>
                            <thead>
                                <tr>
                                    <th>Data operazione</th>
                                    <th>Tipo operazione</th>
                                    <th>Crypto</th>
                                    <th>Quantità</th>
                                    <th>Prezzo acquisto</th>
                                    <th>Prezzo vendita</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaOperazioni && listaOperazioni.content.map((operazione) => (
                                    <tr key={operazione.id} className="border-1">
                                        <td>{moment(operazione.dataOperazione).format('DD/MM/YYYY HH:mm:ss')}</td>
                                        <td>{operazione.tipoOperazione}</td>
                                        <td>{operazione.crypto.simbolo}</td>
                                        <td>{operazione.quantita}</td>
                                        <td>{operazione.prezzoAcquisto !== 0 ? operazione.prezzoAcquisto.toFixed(4) : '-'}</td>
                                        <td>{operazione.prezzoVendita !== 0 ? operazione.prezzoVendita.toFixed(4) : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className='my-3 d-flex justify-content-center'>
                            {listaOperazioni && (
                                <>
                                    <Button
                                        className="text-white"
                                        variant="outline-secondary"
                                        disabled={listaOperazioni.first}
                                        onClick={() => setCurrentPage(currentPage - 1)}>
                                        Pagina precedente
                                    </Button>
                                    <Button
                                        className="text-white"
                                        variant="outline-secondary"
                                        disabled={listaOperazioni.last}
                                        onClick={() => setCurrentPage(currentPage + 1)}>
                                        Pagina successiva
                                    </Button>
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}
export default MyListaOperazioni;