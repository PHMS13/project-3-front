import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { idUser } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get(`/users/user/${idUser}`);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  console.log(user);

  return (
    <>
      {!isLoading && (
        <>
          <h1> user Profile</h1>
          <h1>jardins</h1>
          {user.garden.map((garden) => {
            return (
              <div>
                <p>local: {garden.local}</p>
                <Link to={`/mygarden/${garden._id}`}>Va para o jardim</Link>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default UserProfile;
