import {useEffect, useState} from "react";
import {Button, ConfigProvider, Modal} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import PersonForm from "@/components/forms/personForm";
import SubmitButton from "@/components/forms/submitButton";
import useForm from "antd/es/form/hooks/useForm";
import {useDispatch} from "react-redux";
import {editPerson, savePerson} from "@/redux/slices/peopleManagementSlice/peopleManagementSlice";
import {IPerson, PersonStatus} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";
import {Utils} from "@/utils/utils";

interface ISimpleModal {
    personToEdit?: IPerson
}

export default function SimpleModal({personToEdit}: ISimpleModal) {
    const [size] = useState<SizeType>('large');
    const [sizeSmall] = useState<SizeType>('small');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm();
    const dispatch = useDispatch();


    const resetFields = () => {
        form.setFields([
            {
                name: "name",
                value: personToEdit?.name || ""
            },
            {
                name: "favorite_food",
                value: personToEdit?.favorite_food || ""
            },
            {
                name: "favorite_movie",
                value: personToEdit?.favorite_movie || ""
            },
            {
                name: "status",
                value: personToEdit == null ? true : personToEdit!.status === PersonStatus.Active
            }
        ]);
    };

    useEffect(() => {
        if (personToEdit != null) {
            resetFields();
        }
    }, [form, personToEdit]);

    const utils = new Utils();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        resetFields();
        setIsModalOpen(false);
    };

    const handleOnSave = () => {
        const person = form.getFieldsValue() as IPerson;
        person.updated_at = utils.getCurrentDateTime();
        if(typeof person.status == "boolean" || !person.status){
            person.status = person.status ? PersonStatus.Active : PersonStatus.Inactive;
        }
        if (personToEdit != null) {
            console.log(person.status);
            dispatch(editPerson({person: person, id: personToEdit.id}));
        } else {
            dispatch(savePerson({person: person}));
        }
    }
    return (
        <div style={{paddingTop: 10, paddingLeft: 10, paddingBottom: 10}}>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#00b96b',
                        borderRadius: 10,

                        // Alias Token
                        colorBgContainer: '#f6ffed',
                    },
                }}
            >
                {personToEdit == null ?
                    <Button type="primary" icon={<PlusOutlined/>} size={size} onClick={showModal}>Add</Button> :
                    <Button type="primary" icon={<EditOutlined/>} size={sizeSmall} onClick={showModal}>Edit</Button>}
            </ConfigProvider>

            <Modal title="Person information" open={isModalOpen} footer={[
                <Button key="1" onClick={handleCancel}>Cancel</Button>,
                <SubmitButton key="2" form={form} onSuccess={handleOk} onSave={handleOnSave}></SubmitButton>
            ]}>
                <PersonForm form={form}/>
            </Modal>
        </div>
    );
}