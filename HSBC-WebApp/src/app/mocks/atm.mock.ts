import { AtmModel } from "../models/atm.model";
import { WorkingHour } from "../models/working-hour.model";

export class AtmMock {
    private constructor() {}

    static getAtmMocks() {
        let midnight = new Date(1970, 0, 1);
        let am8 = new Date(1970, 0, 1, 8);
        let pm9 = new Date(1970, 0, 1, 21);
        let pm10 = new Date(1970, 0, 1, 22);

        let am8pm9 = new WorkingHour(am8, pm9);
        let am8pm10 =  new WorkingHour(am8, pm10);
        let always = new WorkingHour(midnight, midnight);

        //sunday is at index 0
        let storeWorkingHour = [am8pm9, am8pm10, am8pm10, am8pm10, am8pm10, am8pm10, am8pm9];
        let roundTheClock = [always, always, always, always, always, always, always]

        let standardAtm = ["withdraw"];
        let contactlessAtm = ["contactless", "withdraw"];
        let depositAtm = ["withdraw", "deposit"];
        let vault = ["vault"];
        let standardBank = ["contactless", "withdraw", "deposit"];
        let coinDeposit = ["contactless", "withdraw", "deposit", "coinDeposit"];

        let atms = [] as AtmModel[];
        atms.push(new AtmModel("Dubečka bb, Okretište Dubec, Zagreb 10000", standardAtm, storeWorkingHour, 1789959.86, 5752834.40));
        atms.push(new AtmModel("Zagrebačka 15, Sesvete 10360", coinDeposit, roundTheClock, 1793014.80, 5752734.72));
        atms.push(new AtmModel("Dubrava 47, Zagreb 10000", standardBank, roundTheClock, 1786725.349523, 5752888.229408));
        atms.push(new AtmModel("Slavonska avenija 11d, Zagreb 10000", standardAtm, storeWorkingHour, 1786776.446923, 5748744.1));

        return atms;
    }
}