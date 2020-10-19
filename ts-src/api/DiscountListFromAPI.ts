import { IDiscount } from "./../interface/IDiscount";
import { DiscountValues } from "./../model/DiscountValues";


export class DiscountListFromAPI {

	getDiscountsUsingXhr() {
		let xhr = new XMLHttpRequest();
		let discounts: Array<IDiscount> = new Array();
		xhr.open("GET", 'http://localhost:8080/discounts/');
		xhr.onload = (event) => {
			var data = JSON.parse(event.target.response);
			if (Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			{
				data._embedded.discountList.forEach((discount) => {
					discounts.push({ 
										 DiscountName : discount.discountName,
									   DiscountType : discount.discountType,
									   UserTypes :	discount.userType,
									   OrganizationName : discount.organizationName,
									   DiscountValues : discount.discountsOfPreschool,
									   Id : discount.id
      				});
				});
			}
			else {
				console.log('error');
			  }
		};
		xhr.onerror = (err) => {
			console.log('[Error]', err);
		  }
		  // Send XHR request
		  xhr.send();
		  return discounts;
	}
	

	getDiscountValuesUsingXhr() {
		let xhr = new XMLHttpRequest();
		let discountValues: Array<DiscountValues> = new Array();
		xhr.open("GET", 'http://localhost:8080/values/');
		xhr.onload = (event) => {
			var data = JSON.parse(event.target.response);
			if (Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			{
				data._embedded.discountValuesList.forEach((discountValue) => {
					discountValues.push(discountValue);
				});
			}
			else {
				console.log('error');
			  }
		};
		xhr.onerror = (err) => {
			console.log('[Error]', err);
		  }
		  // Send XHR request
		  xhr.send();
		  return discountValues;
	}
}