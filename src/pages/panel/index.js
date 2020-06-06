import React from "react";
import { userContext } from "../../context/userContext";
import { Redirect } from "react-router-dom";
import GenericCard from "../../components/GenericCard";

const array = [
  { name: "Proyectos", description: "Descripcion de los proyectos", url: "/proyectos"},
  { name: "Usuarios", description:"Descripcion de los Usuarios", url: "/usuarios" },
];
export class Panel extends React.Component {
  static contextType = userContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: { email: "", password: "", message: "", isSuccess: true },
      redirect: true,
      search: "",
      entities: [],
    };
  }

  componentWillMount() {

    if (this.context.user.isSuccess == true) {

      this.setState({ redirect: false });
      this.setState({ entities: array });
    
    }
  }


  filterEntity = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  searchEntity = () => {
    const { search } = this.state;

    let copyArray = array;
    if (search.length == 0) {
      this.setState({ entities: array });
    }
    if (search.length > 0) {
      let result = copyArray.filter((entity) => entity.name.toLocaleLowerCase() === search.toLocaleLowerCase());
      this.setState({ entities: result });
    }
  };



  render() {
    const entities = this.state.entities.map((entity) => {
      return <GenericCard entity={true} title={entity.name} description={entity.description} url={entity.url}/>;
    });
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row" style={{ marginTop: "50px" }}>
          <input
            style={{ width: "300px", marginRight: "10px" }}
            className="form-control"
            placeholder="Busqueda"
            onChange={this.filterEntity}
          />
          <button
            style={{ marginRight: "10px" }}
            type="button"
            onClick={() => this.searchEntity()}
            class="btn btn-primary"
          >
            Buscar
          </button>
        </div>

        <div className="d-flex flex-wrap">{entities}</div>
      </div>
    );
  }
}
