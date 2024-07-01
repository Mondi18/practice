import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './config';
import { Button } from './Button';

interface User {
  id: string;
  [key: string]: any;
}

export default function App() {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [togglePopUp,setTogglePopUp]=useState<boolean>(false);
  

  const modifyData = async () => {
    console.log('Modify Data Called');
    if (selectedUser) {
      console.log('Selected User:', selectedUser);
      const userDoc = doc(db, 'users', selectedUser.id);
      await updateDoc(userDoc, {
        name: name,
        phone: phoneNumber,
        email: email,
        uuid: id,
      });
      navigate(`/user/${id}`, { state: { name, address, phoneNumber, email } });
    } else {
      console.log("Nem létezik user");
    }
  };
  const openPopUp=(user:User)=>{
    setTogglePopUp(true);
    setSelectedUser(user);
  }
  const closePopUp=()=>{
    setTogglePopUp(false);
    setSelectedUser(null)
  }
  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "users");
      const usersSnap = await getDocs(usersRef);
      
      if (!usersSnap.empty) {
        const usersList: User[] = [];
        usersSnap.forEach(doc => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
        console.log("Users data:", usersList);
      } else {
        console.log("No such document!");
      }
    }
    getUsers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted');
    modifyData();
  };

  return (
    <div>
      {users.map(user=>{
          return <div>
            <p>{user.id}</p>
            <p>{user.name}</p>  
            <p>{user.phoneNumber}</p>
            <Button onClick={()=>openPopUp(user)}>Módosítás</Button>
            </div>

      })}
      {
        togglePopUp &&(

      <form onSubmit={handleSubmit}>
        <Input placeholder="Id" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} />
        <Input placeholder="Teljes név" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        <Input placeholder="Cím" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
        <Input placeholder="Telefonszám" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)} />
        <Input placeholder="Email cím" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <button type="submit">Submit</button>
        <Button onClick={()=>closePopUp()}>Bezárás</Button>
      </form>
        
        )}

    </div>
  );
}
