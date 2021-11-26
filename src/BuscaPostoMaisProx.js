import React, {useEffect, useState} from 'react';
import api from './services/api'
import {Card, ListGroup, Form, Button, Dropdown, DropdownButton, Spinner} from 'react-bootstrap'

export default function BuscaPostoMaisProx() {
    const [posto, setPostos] = useState([]);
    const [combustivel, setCombustivel] = useState([]);
    const [postoFiltro, setPostoFiltro] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        setPostoFiltro({...postoFiltro, [name]: value})
    }

    function handleSubmit() {
        setLoading(true)
        const payload = {
            endereco: postoFiltro?.endereco,
            numeroEndereco: postoFiltro?.numeroEndereco,
            cidade: postoFiltro?.cidade,
            estado: postoFiltro?.estado,
            combustivelId: postoFiltro?.combustivelId,
            ordemBusca: postoFiltro?.ordemBusca
        };
        api.get('/posto/buscar', {
            params: payload,
            headers: {
                "Content-type": "application/json",
            }
        }).then(res => {
            setLoading(false)
            console.log({res})
            setPostos(res.data)
        }).catch(err => {
            setLoading(false)
            console.log({err})
        })
    }

    useEffect(() => {
        async function loadPostos() {
            const res = await api.get('/combustivel/tipo', {
                headers: {
                    "Content-type": "application/json",
                }
            })
            setCombustivel(res.data)
        }
        loadPostos()
    }, [])


    return(
        <div className="mt-5 d-flex justify-content-left" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereco</Form.Label>
                    <Form.Control name='endereco' onChange={e => handleChange(e)} type="text" placeholder="Endereco" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control name='numeroEndereco' onChange={e => handleChange(e)}  type="number" placeholder="Insira o numero" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control name='cidade' onChange={e => handleChange(e)}  type="text" placeholder="Insira a cidade" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control name='estado' onChange={e => handleChange(e)}  type="text" placeholder="Insira o estado" />
                </Form.Group>
                <DropdownButton style={{margin: 5}} title='Tipo do Combustivel' onSelect={e => setPostoFiltro({...postoFiltro, combustivelId: e})}>
                    {combustivel.map(c => (
                        <Dropdown.Item eventKey={c?.id}>{c?.descricao}</Dropdown.Item>
                    ))}
                </DropdownButton>
                <DropdownButton style={{margin: 5}} title='Ordem' onSelect={e => setPostoFiltro({...postoFiltro, ordemBusca: e})}>
                    <Dropdown.Item eventKey='DISTANCIA'>Distancia</Dropdown.Item>
                    <Dropdown.Item eventKey='COMBUSTIVEL'>Combustivel</Dropdown.Item>
                </DropdownButton>
                {!loading ? (
                    <Button style={{margin: 5}} variant="primary" onClick={handleSubmit}>
                        Buscar
                    </Button>
                ) : (
                    <Button style={{margin: 5}} variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>
                )}
            </Form>
            {posto.map(p => {
                return (
                <>
                    <Card key={p?.name} style={{ width: '18rem', margin: 5 }}>
                        <Card.Body>
                            <Card.Title>{p?.nome}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Avaliacao: {p?.avaliacao?.media?.toFixed(2)}</Card.Subtitle>
                            <Card.Text>
                                {p?.endereco} - {p?.numeroEndereco}
                            </Card.Text>
                            <Card.Text>
                                {p?.bairro}
                            </Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Distancia: {p?.distancia?.toFixed(2)}km</ListGroup.Item>
                                <ListGroup.Item>{p?.combustiveis[0]?.descricao}: <span>R${p?.combustiveis[0]?.valor}</span></ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </>
            )})}
        </div>
    )
}