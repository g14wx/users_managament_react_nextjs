import {createSlice, Slice} from "@reduxjs/toolkit";
import {donnyObj, mattObj, miroslavObj, rockyObj} from "@/static/rawPeopleData";
import {IUtils, Utils} from "@/utils/utils";
import {IPerson, PersonStatus} from "@/redux/slices/peopleManagementSlice/interfaces/IPerson";

export const peopleManagementSlice :Slice<{people: IPerson[]}> = createSlice({
    name: "peopleManagementSlice",
    initialState : {
        people: [{} as IPerson]
    },
    reducers: {
        loadPeople: (state) => {
            /**
             * setting all the raw object into an array
             */
            const peopleArray = [
                rockyObj,
                miroslavObj,
                donnyObj,
                mattObj
            ];

            state.people = peopleArray.map((loopPerson, i) => {
                const utils: IUtils = new Utils();
                let person: IPerson = {
                    id: Date.now().toString() + i.toString(),
                    favorite_food: "",
                    favorite_movie: "",
                    name: "",
                    status: PersonStatus.Active,
                    updated_at: utils.getCurrentDateTime()
                };
                for (const [key, value] of Object.entries(loopPerson)) {
                    const attr = key.replaceAll(" ", "_").toLowerCase();
                    if (attr === "Status") {
                        person[attr] = value === "Active" ? PersonStatus.Active : PersonStatus.Inactive;
                    } else {
                        person[attr] = value;
                    }
                }
                return person;
            }).map(value => value);
        },
        editPerson(state, action: {payload: {person: IPerson, id: string}}){
            const index = state.people.findIndex((loopPerson) => loopPerson.id === action.payload.id);
            state.people[index] = action.payload.person;
        },
        savePerson(state, action: {payload: {person: IPerson}}){
            state.people.push(action.payload.person);
        }
    }
});

// Action creators are generated for each case reducer function
export const { loadPeople , editPerson, savePerson} = peopleManagementSlice.actions;

export default peopleManagementSlice.reducer;