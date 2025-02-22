import { GiArmoredBoomerang } from "react-icons/gi";

function Logo() {
  return (
    <div className="flex items-center">
      <div className="">
        <h1 className="font-bold text-3xl font-serif">
          SkilloFin
        </h1>

      </div>
      <GiArmoredBoomerang className=" w-7 h-7 -mt-3 ml-1" />
    </div>
  );
}

export default Logo;
