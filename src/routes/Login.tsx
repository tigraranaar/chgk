import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setAdmin, setPlayer } from "../features/user/userSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginAsAdmin = () => {
    dispatch(setAdmin());
    navigate("/Create");
  };

  const loginAsPlayer = () => {
    dispatch(setPlayer());
    navigate("/Join");
  };

  return (
    <div className="wrapper">
      <div className="title">Что? Где? Когда?</div>
      <div className="subtitle">Войти как...</div>
      <div className="buttons">
        <button className="button" onClick={loginAsAdmin}>
          Администратор
        </button>
        <button className="button" onClick={loginAsPlayer}>
          Игрок
        </button>
      </div>
    </div>
  );
}
