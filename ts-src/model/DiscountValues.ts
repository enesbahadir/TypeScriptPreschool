import { IPreschool } from "./../interface/IPreschool";
import { IDiscountValues } from "./../interface/IDiscountValues";

export class DiscountValues implements IDiscountValues {

	private _id : number;
	private _preschool : IPreschool;
	private _value : number;

	constructor(id : number, preschool : IPreschool, value : number)
	{
		this._id = id;
		this._preschool = preschool;
		this._value = value;
	}

	get Id() {
    return this._id;
  }

  set Id(id : number)
  {
    this._id = id;
  }

  get Value() {
    return this._value;
  }

  set Value(value : number)
  {
    this._value = value;
  }

  get Preschool()
  {
  	return this._preschool;
  }

  set Preschool(preschool : IPreschool)
  {
  	this._preschool = preschool;
  }
}