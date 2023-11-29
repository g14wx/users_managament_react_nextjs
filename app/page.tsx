'use client';

import CustomTable from "@/components/table/customTable";
import {useDispatch, useSelector} from "react-redux";
import {IPeopleManagementState} from "@/redux/slices/peopleManagementSlice/interfaces/IPeopleManagementState";
import {useEffect, useState} from "react";
import {loadPeople, showPeopleOnConsole} from "@/redux/slices/peopleManagementSlice/peopleManagementSlice";
import SimpleModal from "@/components/modals/simpleModal";
import {PersonStatus} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";
import {Alert, Button, ConfigProvider} from "antd";
import ModalNoActivePersons from "@/components/modals/modalNoActivePersons";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {SizeType} from "antd/es/config-provider/SizeContext";

export default function Home() {
    const {people} = useSelector((state: IPeopleManagementState) => state.peopleManagement);
    const dispatch = useDispatch();
    const [size] = useState<SizeType>('large');

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(loadPeople({}));
    }, [dispatch]);

    useEffect(() => {
        if (people.every(person => person.status === PersonStatus.Inactive)) {
            setIsModalOpen(true);
        }
    }, [people]);

    const handleShowPeopleOnConsole = () => {
        dispatch(showPeopleOnConsole({}));
    }

    return (
        <div style={{paddingLeft: 10, paddingBottom: 10}}>
            <ModalNoActivePersons setModal={setIsModalOpen} isModalOpen={isModalOpen}/>
            <SimpleModal/>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#a3c911',
                        borderRadius: 10,

                        // Alias Token
                        colorBgContainer: '#f6ffed',
                    },
                }}
            >
                    <Button type="primary" size={size} onClick={handleShowPeopleOnConsole}>console log active users</Button> :
            </ConfigProvider>
            <CustomTable people={people}/>
        </div>
    );
}
