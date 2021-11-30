import { MatGridTileHeaderCssMatStyler } from "@angular/material";
import { WorkingHour } from "./working-hour.model";

export class AtmModel {
    id: number;
    address: string;
    options: string[];
    //starting with Sunday
    workingHours: WorkingHour[];
    geoLocation: number[];

    private static lastId = 0;

    constructor(address = "", options = [] as string[], workingHours = [] as WorkingHour[], latitude = 0, longitude = 0) {
        this.id = this.getId();
        this.address = address;
        this.options = options;
        this.workingHours = workingHours;
        this.geoLocation = [latitude, longitude];
    }

    private getId(): number {
        return AtmModel.lastId++;
    }

    isCurrentlyOpen() {
        let dateNow = new Date();
        let dayOfWeek = dateNow.getDay();

        if (this.workingHours[dayOfWeek] === undefined)
            return false;

        if (this.isAlwaysOpen())
        return true;

        dateNow.setFullYear(1970, 0, 1);
        
        if(dateNow.getTime() > this.workingHours[dayOfWeek].from.getTime() && dateNow.getTime() < this.workingHours[dayOfWeek].to.getTime())
            return true;

        return false;
    }

    isAlwaysOpen() {
        for (let worhHour of this.workingHours){
            if (worhHour.from.getTime() != worhHour.to.getTime())
                return false;
        }

        return true;
    }
}