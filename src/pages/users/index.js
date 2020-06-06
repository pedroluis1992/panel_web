import React from "react";
import { userContext } from "../../context/userContext";
import GenericCard from "../../components/GenericCard";
import GenericModal from "../../components/modals/GenericModal";
import { Input } from "antd";
import { GraphQLClient } from "graphql-request";
import { Redirect } from "react-router-dom";

export  class Users extends React.Component {
  static contextType = userContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      redirect: true,
      search: "",
      visible: false,
      edit: false,
      users: [],
      usersCopy: [],
    };
    this.client = new GraphQLClient("https://api-panel-web.herokuapp.com/graphql");
  }

  async componentWillMount() {
    if (this.context.user.isSuccess == false) {
      this.setState({ redirect: false });
      this.context.setParentState({ user: { isSuccess: true } });
      this.getUsers();
    }
  }

  async getUsers() {
    const query = `
    {
      Users {
        _id
        firstname
        lastname
        age
      }
    }
  `;
    const data = await this.client.request(query);
    this.setState({ users: data.Users, usersCopy: data.Users });
  }

  filterEntity = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  openModal = (user) => {
    if (!!user)
      this.setState({
        edit: true,
        visible: true,
        user: {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
        },
      });
    if (!user) this.setState({ visible: true });
  };

  deleteUser = async (user) => {
    const query = `
    mutation{
      deleteUser(_id: "${user._id}"){
        firstname
        _id
      }
    }
  `;
    const data = await this.client.request(query);
    if (data) {
      this.getUsers();
    }
  };

  handleOk = async () => {
    if (
      this.state.user.firstname === undefined ||
      this.state.user.lastname === undefined ||
      this.state.user.age === undefined
    )
      return;
    let query;
    if (this.state.edit) {
      query = `
      mutation {
        updateUser(_id: "${this.state.user._id}", input: {
          firstname: "${this.state.user.firstname}",
          lastname: "${this.state.user.lastname}",
          age: ${this.state.user.age}
        }){
          _id
          firstname
          lastname
          age
        }
      }
    `;
    } else {
      query = `
            mutation {
              createUser(input: {
                firstname: "${this.state.user.firstname}",
                lastname: "${this.state.user.lastname}",
                age: ${this.state.user.age}
              }){
                _id
                firstname
                lastname
                age
              }
            }
          `;
    }
    const data = await this.client.request(query);
    if (
      (data.createUser || data.updateUser).firstname ==
      this.state.user.firstname
    ) {
      this.setState(
        {
          edit: false,
          visible: false,
          user: { firstname: "", lastname: "", age: 0, _id: "" },
        },
        () => {
          this.getUsers();
        }
      );
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      edit: false,
      user: { firstname: "", lastname: "", age: 0, _id: "" },
    });
  };

  searchEntity = () => {
    const { search } = this.state;

    let copyArray = this.state.usersCopy;
    if (search.length == 0) {
      this.setState({ users: copyArray });
    }
    if (search.length > 0) {
      let result = copyArray.filter(
        (entity) =>
          entity.firstname.toLocaleLowerCase() === search.toLocaleLowerCase()
      );
      this.setState({ users: result });
    }
  };

  onChange = (event, type) => {
    this.setState({ user: { ...this.state.user, [type]: event.target.value } });
  };

  content = () => {
    return (
      <div>
        <Input
          value={this.state.user.firstname}
          placeholder="Nombre"
          onChange={(event) => this.onChange(event, "firstname")}
        />
        <br />
        <br />
        <Input
          value={this.state.user.lastname}
          placeholder="Apellido"
          onChange={(event) => this.onChange(event, "lastname")}
        />
        <br />
        <br />
        <Input
          value={this.state.user.age}
          className={"input-number"}
          type="Number"
          placeholder="Años"
          onChange={(event) => this.onChange(event, "age")}
        />
        <br />
      </div>
    );
  };

  render() {
    const users = this.state.users.map((user) => {
      return (
        <GenericCard
          title={user.firstname}
          description={user.lastname}
          onClickEdit={() => this.openModal(user)}
          onClickDelete={() => this.deleteUser(user)}
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

        <div className="d-flex flex-wrap">{users}</div>
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
