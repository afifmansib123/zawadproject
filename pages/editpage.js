import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import bcryptjs from 'bcryptjs';

export default function EditPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession();
    const userId = session?.user?._id;

    const updateUser = async (x) => {
        try {
            const response = await axios.put(`/api/delusers/${x}`, {
                _id: userId,
                password: bcryptjs.hashSync(password),
            });
            console.log(response.data);
            alert("User updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Error updating user");
        }
    };

    return (
        <div>
            <label>please input new password</label>
            <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={()=>updateUser(userId)}>Update User</button>
        </div>
    );
}
