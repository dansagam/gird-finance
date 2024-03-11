import CustomNotFoundIcon from "@/assets/svgs/404.svg?react";
import { BASE_PATH } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col h-full min-h-[50vh] justify-center">
      <h2 className=" font-semibold text-3xl text-center">Something went Wrong!!!</h2>
      <div className=" flex flex-col justify-center items-center h-full">
        <CustomNotFoundIcon />
        <h4>We can&apos;t find the page that you are looking for </h4>
        <button
          color="primary"
          onClick={() => {
            navigate(BASE_PATH.HOME);
          }}
        >
          Go back home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
