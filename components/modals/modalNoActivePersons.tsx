import {Modal} from 'antd';
import {Dispatch, SetStateAction} from "react";

interface IModalNoActivePersonsProps {
    setModal:  Dispatch<SetStateAction<boolean>>;
    isModalOpen: boolean
}

export default function ModalNoActivePersons({setModal, isModalOpen}: IModalNoActivePersonsProps) {
    const handleClose = () => {
        setModal(false);
    }
    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleClose} onCancel={handleClose}>
            <p>Its seems that all the people are inactive</p>
        </Modal>
    );
}