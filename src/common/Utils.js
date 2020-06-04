import React from 'react';
import styled from 'styled-components';
import { Col, Modal, Button } from 'react-bootstrap';

const ErrorMessage = styled(Col)`
	color: #C95B64;
`

const ErrorModal = ({showModal, setShowModal, errorMessage}) => {
	return (
		<Modal show={showModal}>
			<Modal.Header closeButton>
				<Modal.Title>Error</Modal.Title>
			</Modal.Header>
			<Modal.Body>{errorMessage}</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={() => setShowModal(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export { ErrorMessage, ErrorModal };