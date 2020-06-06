import React from "react";


export default class GenericCard extends React.Component {
 

  render() {
    return (
      <>
        <div
          class="card"
          style={{ width: "250px", marginRight: "20px", marginTop: "10px" }}
        >
          <div class="card-body">
            <h5 class="card-title">{this.props.title}</h5>
            <p class="card-text">{this.props.description}</p>
            {this.props.entity ? (
              <a  className={"access-entity"} href={this.props.url} class="btn btn-primary">
                Acceder
              </a>
            ) : (
              <button onClick={this.props.onClickEdit} class="btn btn-primary">
                Editar
              </button>
            )}
            {!this.props.entity && (
              <button onClick={this.props.onClickDelete} class="btn btn-secondary">
                Eliminar
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}


GenericCard.defaultProps = {
  title: 'Sin nombre',
  description: 'Sin descripcion'
}