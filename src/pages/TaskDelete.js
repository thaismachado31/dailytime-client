import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../apis/api";

function TaskDelete() {
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const areYouSure = window.confirm(
      "Se você deletar, as informações não poderão ser recuperadas. Você tem certeza?"
    );

    if (areYouSure) {
      return api
        .delete(`/task/${_id}`)
        .then((response) => {
          navigate(`/secondhome`);
        })
        .catch((err) => console.error(err));
    }
    navigate(-1);
  }, [_id, navigate]);

  return <div> Excluindo...</div>;
}

export default TaskDelete;
