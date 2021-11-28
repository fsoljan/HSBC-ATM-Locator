export class SearchModel {
    public text: string;
    public selectedOptions: string[];
    public isOpen: boolean;

    constructor(text = "", selectedOptions = [] as string[], isOpen = false) {
        this.text = text;
        this.selectedOptions = selectedOptions;
        this.isOpen = isOpen;
    }
}