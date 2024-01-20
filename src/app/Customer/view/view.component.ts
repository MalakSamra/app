import { Component,inject,TemplateRef } from '@angular/core';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCustomerService } from 'src/app/_Services/viewCustomer.service';
import { CustomerAddDto } from 'src/_Models/CustomerAddDto';
import { CustomerReadDto } from 'src/_Models/CustomerReadDto';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  customers:CustomerReadDto[]=[];
  customer:CustomerReadDto = new CustomerReadDto();
  tableColumns:string[]= Object.keys(new CustomerReadDto()); 
  selectedColumns: {[key: string]:boolean}={};
  newCst: CustomerAddDto = new CustomerAddDto();
  private modalService = inject(NgbModal);
	closeResult = '';

  constructor (public viewCustomerService: ViewCustomerService){}
  ngOnInit():void {
    this.viewCustomerService.GetAll().subscribe(data=>{
      this.customers=data;
      console.log(this.customers);
    })
  }
  exportToExcel():void{
    const ws = XLSX.utils.json_to_sheet(this.customers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Placeholder');
    XLSX.writeFile(wb, 'CustomerList.xlsx');
  }
  printTable():void{
    window.print();
  }
  addCst(){
    const t = localStorage.getItem("Token");
    if(t != null){
      const tokenData = atob(t.split('.')[1]);
      const tokenObject = JSON.parse(tokenData);
      const userId = tokenObject["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      this.newCst.entry_Agent=userId;
      this.newCst.entry_Date= new Date(Date.now());
      this.viewCustomerService.addCst(this.newCst).subscribe((a)=>{
        console.log(a);
      })
      window.location.reload();
    }
  }
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  getColumnValue(customer: CustomerReadDto, column: string):any{
    const columnKey = column as keyof CustomerReadDto;
    return customer[columnKey];
  }
  onCheckboxChange(column: string){
    this.selectedColumns[column] = !this.selectedColumns[column];
    console.log(this.selectedColumns);
  }
  deleteCustomer(cstId:number){
    this.viewCustomerService.DeleteCst(cstId).subscribe((a)=>{
      console.log(a);
    })
    window.location.reload();
  }
}
