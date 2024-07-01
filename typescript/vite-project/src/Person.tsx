

type Props={
    name:string;
    age:number;
    isMarried:boolean;
    country:Countries;
}

export enum Countries{
  Brazil="Hungary",
  France="France",
  India="India",
  UnitedStates="United States"
}
function User(props:Props) {
  
  
  return (
   <div>
    <p>Name:{props.name}</p>
    <p>Age:{props.age}</p>
    <p>Married:{props.isMarried}</p>
    <p>Country origin:{props.country}</p>
   </div>
  )
}

export default User