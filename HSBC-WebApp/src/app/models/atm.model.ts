import { MatGridTileHeaderCssMatStyler } from "@angular/material";
import { WorkingHour } from "./working-hour.model";

export class AtmModel {
    address: string;
    options: string[];
    //starting with Sunday
    workingHours: WorkingHour[];
    geoLocation: number[];

    constructor(address: string, options: string[], workingHours: WorkingHour[], latitude: number, longitude: number) {
        this.address = address;
        this.options = options;
        this.workingHours = workingHours;
        this.geoLocation = [latitude, longitude];
    }

    isCurrentlyOpen() {
        let dateNow = new Date();
        let dayOfWeek = dateNow.getDay();

        dateNow.setFullYear(1970, 0, 1);
        
        if(dateNow.getTime() > this.workingHours[dayOfWeek].from.getTime() && dateNow.getTime() < this.workingHours[dayOfWeek].to.getTime())
            return true;

        return false;
    }

    isAlwaysOpen() {
        for (let worhHour of this.workingHours){
            if (worhHour.from.getTime() == worhHour.to.getTime())
                return false;
        }

        return true;
    }
}