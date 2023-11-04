import React, { useEffect, useState, useRef } from "react";

const Popup: React.FC<ModalProps> = ({ isOpen, hasCloseBtn, onClose, children, title }) => {
	const [isModalOpen, setModalOpen] = useState(isOpen);
	const modalRef = useRef<HTMLDialogElement | null>(null);
	useEffect(() => {
		setModalOpen(isOpen);
	}, [isOpen]);
	useEffect(() => {
		const modalElement = modalRef.current;
		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isModalOpen]);
	const handleCloseModal = () => {
		if (onClose) {
			onClose();
		}
		setModalOpen(false);
	};
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "Escape") {
			handleCloseModal();
		}
	};
	return (
		<dialog ref={modalRef} onKeyDown={handleKeyDown} className={`modal ${!isModalOpen && "closed"}`}>
			{hasCloseBtn && (
				<div className="modal-close-btn" onClick={handleCloseModal}>
					got it!
				</div>
			)}
			{title && <h2 className="modal-title">{title}</h2>}
			<div className="modal-conent">{children}</div>
		</dialog>
	);
};

export default Popup;
