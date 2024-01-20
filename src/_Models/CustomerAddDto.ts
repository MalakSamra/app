export class CustomerAddDto{
    constructor(
        public name: string = "",
        public nationality: string ="",
        public mobile_Number: string="",
        public telephone1: string = "",
        public telephone2: string = "",
        public whatsapp_Number: string = "",
        public email: string = "",
        public address: string = "",
        public description: string = "",
        public job: string = "",
        public entry_Agent: string = "",
        public entry_Date: Date = new Date, 
        public sales_man: string ="",
        public rating: number=0
    ){}
}