import React from 'react'
import {Modal} from 'react-bootstrap'

const AddExpenseDialog = () => {
  return (
    <Modal show>
        <Modal.Header closeButton>
            <Modal.Title>
              Add Note
            </Modal.Title>
        </Modal.Header>
    </Modal>
  )
}

export default AddExpenseDialog