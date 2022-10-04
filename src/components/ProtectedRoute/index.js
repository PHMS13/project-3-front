import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    const parsedUser = JSON.parse(loggedInUser || '""');

    if (parsedUser) {
      navigate("/profile");
    }
  }, []);

  return <Component />;
}
