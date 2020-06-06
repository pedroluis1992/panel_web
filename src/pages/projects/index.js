import React from "react";
import { userContext } from "../../context/userContext";
import GenericCard from "../../components/GenericCard";
import GenericModal from "../../components/modals/GenericModal";
import { Input } from "antd";
import { GraphQLClient } from "graphql-request";
import { Redirect } from "react-router-dom";

export class Projects extends React.Component {
  static contextType = userContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      project: {},
      redirect: true,
      search: "",
      visible: false,
      edit: false,
      projects: [],
      projectsCopy: [],
    };
    this.client = new GraphQLClient("https://api-panel-web.herokuapp.com/graphql");
  }

  async componentWillMount() {
    if (this.context.user.isSuccess == false) {
      this.setState({ redirect: false });
      this.context.setParentState({user: { isSuccess: true}})

      this.getProjects();
    }
  }

  async getProjects() {
    const query = `
    {
      Projects {
        _id
        name
        description
      }
    }
  `;
    const data = await this.client.request(query);
    this.setState({ projects: data.Projects, projectsCopy: data.Projects });
  }

  filterEntity = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  openModal = (project) => {
    if (!!project)
      this.setState({
        edit: true,
        visible: true,
        project: {
          _id: project._id,
          name: project.name,
          description: project.description,
        },
      });
    if (!project) this.setState({ visible: true });
  };

  searchEntity = () => {
    const { search } = this.state;

    let copyArray = this.state.projectsCopy;
    if (search.length == 0) {
      this.setState({ projects: copyArray });
    }
    if (search.length > 0) {
      let result = copyArray.filter(
        (entity) =>
          entity.name.toLocaleLowerCase() === search.toLocaleLowerCase()
      );
      this.setState({ projects: result });
    }
  };

  deleteProject = async (project) => {
    const query = `
    mutation{
      deleteProject(_id: "${project._id}"){
        name
        _id
      }
    }
  `;
  const data = await this.client.request(query);
  if (data) {
      this.getProjects();
    }
  }

  handleOk = async () => {
    if (
      this.state.project.name === undefined ||
      this.state.project.description === undefined
    )
      return;
    let query;
    if (this.state.edit) {
      query = `
      mutation {
        updateProject(_id: "${this.state.project._id}", input: {
          name: "${this.state.project.name}",
          description: "${this.state.project.description}",
        }){
          _id
          name
          description
        }
      }
    `;
    } else {
      query = `
            mutation {
              createProject(input: {
                name: "${this.state.project.name}",
                description: "${this.state.project.description}",
              }){
                _id
                name
                description
              }
            }
          `;
    }
    const data = await this.client.request(query);
    if (
      (data.createProject || data.updateProject).name ==
      this.state.project.name
    ) {
      this.setState(
        {
          edit: false,
          visible: false,
          project: { name: "", description: "", _id: "" },
        },
        () => {
          this.getProjects();
        }
      );
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      edit: false,
      project: { name: "", description: "",  _id: "" },
    });
  };

  onChange = (event, type) => {
    this.setState({ project: { ...this.state.project, [type]: event.target.value } });
  };

  content = () => {
    return (
      <div>
        <Input
          value={this.state.project.name}
          placeholder="Nombre"
          onChange={(event) => this.onChange(event, "name")}
        />
        <br />
        <br />
        <Input
          value={this.state.project.description}
          placeholder="Description"
          onChange={(event) => this.onChange(event, "description")}
        />
        <br />
      </div>
    );
  };


  render() {
    const projects = this.state.projects.map((project) => {
      return (
        <GenericCard
          title={project.name}
          description={project.description}
          onClickEdit={() => this.openModal(project)}
          onClickDelete={() => this.deleteProject(project)}
        />
      );
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
          <button
            style={{ marginRight: "10px" }}
            type="button"
            class="btn btn-danger"
            onClick={() => this.openModal()}
          >
            Nuevo
          </button>
        </div>

        <div className="d-flex flex-wrap">{projects}</div>
        <GenericModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          children={this.content()}
        />
      </div>
    );
  }
}
