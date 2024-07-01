import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';

interface User {
  email: string;
  name: string;
  phoneNumber: string;
}

export default function SelectedUser() {
  const { id: uuid } = useParams(); // Assuming `id` is the UUID parameter
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (uuid) {
        const usersRef = collection(db, 'users'); // Collection reference
        const q = query(usersRef, where('uuid', '==', uuid)); // Query for documents where uuid matches
        const querySnapshot = await getDocs(q); // Execute the query
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setUser(doc.data() as User); // Set user data from the document
          });
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUser();
  }, [uuid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Ez az id: {uuid}</div>
      <div>Email: {user.email}</div>
      <div>Telszam: {user.phoneNumber}</div>
      <div>Név: {user.name}</div>
    </div>
  );
}
