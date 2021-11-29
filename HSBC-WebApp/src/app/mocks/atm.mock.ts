import { AtmModel } from "../models/atm.model";
import { WorkingHour } from "../models/working-hour.model";

export class AtmMock {
    private constructor() {}

    static getAtmMocks() {
        let midnight = new Date(1970, 0, 1);
        let am8 = new Date(1970, 0, 1, 8);
        let pm4 = new Date(1970, 0, 1, 16);
        let pm9 = new Date(1970, 0, 1, 21);
        let pm10 = new Date(1970, 0, 1, 22);

        let am8pm9 = new WorkingHour(am8, pm9);
        let am8pm10 =  new WorkingHour(am8, pm10);
        let always = new WorkingHour(midnight, midnight);
        let classic = new WorkingHour(am8, pm4);

        //sunday is at index 0
        let storeWorkingHour = [am8pm9, am8pm10, am8pm10, am8pm10, am8pm10, am8pm10, am8pm9];
        let roundTheClock = [always, always, always, always, always, always, always];
        let notWorkingWeekends = [undefined, classic, classic, classic, classic, classic, undefined];

        let standardAtm = ["withdraw"];
        let contactlessAtm = ["contactless", "withdraw"];
        let depositAtm = ["withdraw", "deposit"];
        let vault = ["vault"];
        let standardBank = ["contactless", "withdraw", "deposit"];
        let coinDeposit = ["contactless", "withdraw", "deposit", "coinDeposit"];
        let full = ["contactless", "withdraw", "deposit", "coinDeposit", "vault"];

        let atms = [] as AtmModel[];
        atms.push(new AtmModel("Dubečka bb, Okretište Dubec, Zagreb", standardAtm, storeWorkingHour, 16.079428, 45.828046));
        atms.push(new AtmModel("Zagrebačka 15, Sesvete", coinDeposit, roundTheClock, 16.106851, 45.827448));
        atms.push(new AtmModel("Dubrava 47, Zagreb", standardBank, roundTheClock, 16.050426, 45.828398));
        atms.push(new AtmModel("Slavonska avenija 11d, Zagreb", standardAtm, storeWorkingHour, 16.050862, 45.802457));
        atms.push(new AtmModel("Maksimirska 86-88, Zagreb", standardBank, roundTheClock, 16.007752, 45.817276));
        atms.push(new AtmModel("Ilica 38, Zagreb", vault, roundTheClock, 15.970953, 45.813322));
        atms.push(new AtmModel("Vlaška 106, Zagreb", full, roundTheClock, 15.994848, 45.814126));
        atms.push(new AtmModel("Savska cesta 60, Zagreb", vault, roundTheClock, 15.960637, 45.798461));
        atms.push(new AtmModel("Miramarska cesta 23, Zagreb", full, roundTheClock, 15.975466, 45.802093));
        atms.push(new AtmModel("Zinke Kunc 2, Zagreb", full, roundTheClock, 15.996818, 45.792926));
        atms.push(new AtmModel("Trg J.F.Kennedyja 6, Zagreb", contactlessAtm, roundTheClock, 16.011656, 45.816003));

        return atms;
    }
}