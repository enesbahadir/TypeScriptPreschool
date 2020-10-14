import { IPreschool } from "./interface/IPreschool";

export class PreschoolListFromAPI {
	static getPreschoolsUsingXhr(){
		let xhr = new XMLHttpRequest();
		let preschools: Array<IPreschool> = new Array();
		xhr.open("GET", 'http://localhost:8080/preschools/');
		xhr.onload = (event) => {
			var data = JSON.parse(event.target.response);
			if (Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			{
				data._embedded.preschoolList.forEach((preschool) => {
					preschools.push({ 
										PreschoolName: preschool.preschoolName,
      							Price: Number(preschool.price),
      							EndOfEarlyRegistrationDate: preschool.endOfEarlyRegistrationDate,
      							Id : preschool.id
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
		  return preschools;
	}
	
}