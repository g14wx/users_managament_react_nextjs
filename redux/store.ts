import { configureStore } from "@reduxjs/toolkit";
import peopleManagementSlice from "@/redux/slices/peopleManagementSlice/peopleManagementSlice";

export default configureStore({
    reducer: {
        peopleManagement: peopleManagementSlice
    }
});