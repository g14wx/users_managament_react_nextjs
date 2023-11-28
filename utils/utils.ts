import {DateTime} from "luxon";
export  interface IUtils {
    getCurrentDateTime(): string
}
export class Utils implements  IUtils{
    public getCurrentDateTime(): string{
        const now = DateTime.local();
        return now.toLocaleString(DateTime.DATETIME_FULL);
    }
}