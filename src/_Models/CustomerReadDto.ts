export class CustomerReadDto{
    constructor(
        public id: number = 0,
        public name: string ="",
        public nationality: string ="",
        public mobile_Number: string ="",
        public telephone1: string = "",
        public telephone2: string = "",
        public whatsapp_Number: string = "",
        public email: string = "",
        public address: string = "",
        public description: string = "",
        public job: string = "",
        public sales_man: string ="",
        public rating: string=""
    ){}
}