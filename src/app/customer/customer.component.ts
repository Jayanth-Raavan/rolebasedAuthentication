import { Component, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service : MasterService) {
    this.customersdata();
   }

  customersList : any;

  customersdata(){
    this.service.GetUsersData().subscribe(result=>{
      this.customersList = result
    })
  }

  ngOnInit(): void {
  }

}
