import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Form } from 'reactstrap';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Samurai X" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "FullMetal Alchemist" },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];

class App extends React.Component {

  state = {
    data: data,
    form:{
      id:'',
      personaje:'',
      anime:''
    },
    modalInsertar: false,
  };

  handleChange = (event) =>{
    this.setState({
      form:{
        ...this.state.form,
        [event.target.name]: event.target.value,  
      }
    })
  }

  mostrarModalInsertar = () => {
    this.setState({modalInsertar: true});
  }

  cerrarModalInsertar = () => {
    this.setState({modalInsertar: false});
  }
  
  mostrarModalEditar = (registro) => {
    this.setState({modalEditar: true, form: registro});
  }

  cerrarModalEditar = () => {
    this.setState({modalEditar: false});
  }

  insertar = () => {
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({
      data: lista,
      modalInsertar: false,
      modalEditar: false,
    });
  }

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id){
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminar = (dato) => {
    var opcion = window.confirm("Está a punto de eliminar el registro " + dato.id);
    if (opcion){
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id == dato.id){
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({data: lista});
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color='success' onClick={() => this.mostrarModalInsertar()}>
            Insertar nuevo personaje
          </Button>
          <br /><br />

          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Personaje</th>
                <th>Anime</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.anime}</td>
                  <td>
                    <Button color='primary' onClick={() => this.mostrarModalEditar(elemento)}>
                      Editar</Button> {"  "}
                    <Button color='danger' onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar nuevo personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                id:
              </label>

              <input
                className='form-control'
                readOnly
                type='text'
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Personaje:
              </label>
              <input
                className='form-control'
                name='personaje'
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Anime:
              </label>
              <input
                className='form-control'
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color='danger' onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar registro</h3>
              </div>
            </ModalHeader>

            <ModalBody>
              <FormGroup>
                <label>
                  id:
                </label>

                <input
                  className='form-control'
                  readOnly
                  type='text'
                  value={this.state.form.id}
                />
              </FormGroup>
              <FormGroup>
                <label>
                  Personaje:
                </label>
                <input
                  className='form-control'
                  name='personaje'
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.personaje}
                />
              </FormGroup>

              <FormGroup>
                <label>
                  Anime:
                </label>
                <input
                  className='form-control'
                  name="anime"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.anime}
                />
              </FormGroup>
            </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color='danger' onClick={() => this.cerrarModalEditar()}>
              Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default App;
