import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ColumnChooserModal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Select columns to display</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.children}
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
            onClick={this.props.onHide}
            >Save changes</Button>
          </Modal.Footer>

      </Modal>
    )
  }
}

export default ColumnChooserModal;
