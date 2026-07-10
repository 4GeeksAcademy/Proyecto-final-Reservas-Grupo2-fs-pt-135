import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ConfirmModal = ({
    show,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Volver",
    loading = false,
    onConfirm,
    onCancel
}) => {
    return (
        <Modal
            show={show}
            onHide={onCancel}
            centered
            className="confirm-modal"
        >
            <Modal.Header closeButton className="reservation-modal-header">
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="reservation-modal-body">
                <p className="confirm-modal-message">
                    {message}
                </p>
            </Modal.Body>

            <Modal.Footer className="reservation-modal-footer">
                <Button
                    className="bookify-btn"
                    onClick={onCancel}
                    disabled={loading}
                >
                    {cancelText}
                </Button>

                <Button
                    variant="danger"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Cancelando..." : confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};