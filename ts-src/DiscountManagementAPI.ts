import { IDiscount } from "./interface/IDiscount";
import { DiscountValues } from "./model/DiscountValues";
import { Database } from "./Database";
import { Discount } from "./Discount";


export class DiscountManagementAPI
{

	static createDiscountWithAPI(discount)
	{
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://localhost:8080/discounts/',false);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(discount);
		window.location.reload();
		if (! (Number(event.target.status) >= 200 && Number(event.target.status) < 400))
			console.log('error');
		Database.createDiscountList();
	}

	static createDiscountValuesAPI(IDiscountValues)
	{
		debugger;
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://localhost:8080/values/',false);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(IDiscountValues);
		xhr.onload = (event) => {
			let data = JSON.parse(event.target.response);
			if (Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			{
				IDiscountValues.Id = data.id;
				IDiscountValues.Preschool = data.preschool;
				IDiscountValues.Value = data.Value;
			}
			else {
				console.log('error');
			  }
		};	
		//window.location.reload();
		return IDiscountValues;
	}
}