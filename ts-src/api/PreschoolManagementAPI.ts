import { IPreschool } from "./../interface/IPreschool";
import { Database } from "./../data/Database";
import { PreschoolListFromAPI } from "./PreschoolListFromAPI";

/**
*	Anaokulu ekleme, silme ve düzenleme işlemlerini API üzerinden yapan sınıftır.
*/
export class PreschoolManagementAPI {

	/**
	*	Verilen IPreschool objesini HTTP POST metodu ile gönderen metod
	*/
	static createPreschoolWithAPI(IPreschool)
	{
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://localhost:8080/preschools/',false);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(IPreschool);
		window.location.reload();
		if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			console.log('error');
		Database.createPreschoolList();
	}

	/**
	*	Verilen IPreschool objesini HTTP PUT metodu ile düzenleyen sınıf, 
	*/
	static editPreschoolWithAPI(IPreschool, id)
	{
		let xhr = new XMLHttpRequest();
		xhr.open("PUT", 'http://localhost:8080/preschools/'+id);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(IPreschool);
		window.location.reload();
		if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			console.log('error');
		Database.createPreschoolList();
	}

	/**
	* Verilen id ile uygun IPreschool nesnesini silmek için HTTP DELETE metodunu çalıştırır.
	*/
	static deletePreschoolWithAPI(id)
	{
		let xhr = new XMLHttpRequest();
		xhr.open("DELETE", 'http://localhost:8080/preschools/'+id);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send();
		window.location.reload();
		if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400)
			console.log('error');
		Database.createPreschoolList();
	}
	


}