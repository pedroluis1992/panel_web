import React from "react";
import { Modal } from "antd";

export default class GenericModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          title=" Modal"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
         {this.props.children}
        </Modal>
      </>
    );
  }
}
