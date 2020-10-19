import { IDiscount } from "./../interface/IDiscount";
import { DiscountValues } from "./../model/DiscountValues";
import { Database } from "./../data/Database";
import { Discount } from "./../model/Discount";


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

	static createDiscountValuesAPI(discountValues)
	{
		debugger;
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://localhost:8080/values/');
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		let discountValuesJSON = JSON.stringify(discountValues);
		xhr.send(discountValues);
		xhr.onload = (event) => {
			let data = JSON.parse(event.target.response);
			if (Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			{
				discountValues.Id = data.id;
				discountValues.Preschool = data.preschool;
				discountValues.Value = data.value;
			}
			else {
				console.log('error');
			  }
		};	
		//window.location.reload();
		return discountValues;
	}
}