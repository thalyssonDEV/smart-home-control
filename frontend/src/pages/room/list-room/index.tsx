import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";

export const ListRoom = () => {
  return (
    <div className="relative p-5 pb-[150px] ">
      <div className="absolute right-3 top-3 w-[50px] h-[50px]">
        <ActionButton icon="plus" />
      </div>
      <h1 className="text-center text-2xl font-bold">Cômodos</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {roomsMock.map((room) => (
          <Link to={`/comodos/${room.id}`} key={room.id}>
            <Card title={room.name} icon={room.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};
const roomsMock = [
  {
    id: 7,
    name: "Sala de Estar",
    icon: "fa-couch",
  },
  {
    id: 8,
    name: "Cozinha",
    icon: "fa-utensils",
  },
  {
    id: 9,
    name: "Quarto Principal",
    icon: "fa-bed",
  },
  {
    id: 10,
    name: "Escritório",
    icon: "fa-laptop",
  },
  {
    id: 11,
    name: "Varanda",
    icon: "fa-umbrella-beach",
  },
  {
    id: 12,
    name: "Lavanderia",
    icon: "fa-soap",
  },
  {
    id: 13,
    name: "Quarto 3",
    icon: "fa-bed",
  },
  {
    id: 14,
    name: "Sala de Estar",
    icon: "fa-couch",
  },
  {
    id: 15,
    name: "Cozinha",
    icon: "fa-utensils",
  },
  {
    id: 16,
    name: "Quarto Principal",
    icon: "fa-bed",
  },
  {
    id: 17,
    name: "Escritório",
    icon: "fa-laptop",
  },
  {
    id: 18,
    name: "Varanda",
    icon: "fa-umbrella-beach",
  },
  {
    id: 19,
    name: "Lavanderia",
    icon: "fa-soap",
  },
  {
    id: 20,
    name: "Quarto 3",
    icon: "fa-bed",
  },
];
