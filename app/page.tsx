'use client';

import CustomTable from "@/components/table/customTable";
import {useDispatch, useSelector} from "react-redux";
import {IPeopleManagementState} from "@/redux/slices/peopleManagementSlice/interfaces/IPeopleManagementState";
import {useEffect} from "react";
import {loadPeople} from "@/redux/slices/peopleManagementSlice/peopleManagementSlice";
import SimpleModal from "@/components/modals/simpleModal";

export default function Home() {
    const {people} = useSelector((state: IPeopleManagementState) => state.peopleManagement);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPeople({}));
    }, [dispatch]);
    return (
        <div className="App">
            <SimpleModal/>
            <CustomTable people={people}/>
        </div>
    );
}
