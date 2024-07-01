import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { Button } from "./Button";

interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    [key: string]: any;
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [id, setId] = useState<string>("");

    useEffect(() => {
        const userCollection = collection(db, "users");

        const unsubscribe = onSnapshot(userCollection, (snapshot) => {
            setUsers(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name || "",
                    phoneNumber: doc.data().phoneNumber || "",
                    email: doc.data().email || "",
                    ...doc.data(),
                }))
            );
        });

        return () => unsubscribe();
    }, []);

    const showPopUp = (user: User) => {
        setIsPopUpOpen(true);
        setSelectedUser(user);
        setName(user.name);
        setPhoneNumber(user.phoneNumber);
        setEmail(user.email);
        setId(user.id);
    };

    const closePopUp = () => {
        setIsPopUpOpen(false);
        setSelectedUser(null);
        setName("");
        setPhoneNumber("");
        setEmail("");
        setId("");
    };

    const modifyData = async () => {
        if (selectedUser) {
            console.log("Selected User:", selectedUser); // Debugging statement
            const userDoc = doc(db, "users", selectedUser.id);
            await updateDoc(userDoc, {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                uuid: id,
            });
            console.log("Data updated successfully!"); // Debugging statement
            closePopUp(); // Close popup after saving
        } else {
            console.log("No user selected"); // Debugging statement
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.phoneNumber} - {user.email}
                        <Button onClick={() => showPopUp(user)}>Modify</Button>
                    </li>
                ))}
            </ul>
            {isPopUpOpen && (
                <form onSubmit={(e) => { e.preventDefault(); modifyData(); }}>
                    <input
                        placeholder="id"
                        value={id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                    />
                    <input
                        placeholder="name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <input
                        placeholder="phoneNumber"
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                    />
                    <input
                        placeholder="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <Button type="button" onClick={() => closePopUp()}>Close</Button>
                    <Button type="submit" onClick={()=>modifyData()}>Save</Button>
                </form>
            )}
        </div>
    );
}
