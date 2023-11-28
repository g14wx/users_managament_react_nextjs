import {IPerson} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";

export  interface IPeopleManagementState {
    peopleManagement: {
        people: IPerson[]
    }
}