import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";

interface ListDeviceProps {
  devices?: Array<{
    id: number;
    name: string;
    icon: string;
    state: boolean;
    room: number;
  }>;
}

export const ListDevice = ({ devices = devicesMock }: ListDeviceProps) => {
  return (
    <div className="relative p-5 pb-[150px] ">
      <Link to={`/dispositivos/novo`}>
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Dispositivos</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {devices.map((device) => (
          <Card
            key={device.id}
            title={device.name}
            icon={device.icon}
            showStatus={true}
            status={device.state}
          />
        ))}
      </div>
    </div>
  );
};
const devicesMock = [
  {
    id: 14,
    name: "Lâmpada Inteligente",
    icon: "fa-lightbulb",
    state: true,
    room: 7,
  },
  {
    id: 15,
    name: "Televisão 8K",
    icon: "fa-tv",
    state: false,
    room: 7,
  },
  {
    id: 16,
    name: "Soundbar",
    icon: "fa-volume-up",
    state: false,
    room: 7,
  },
  {
    id: 17,
    name: "Cortina Elétrica",
    icon: "fa-person-booth",
    state: false,
    room: 7,
  },
  {
    id: 18,
    name: "Lâmpada da Bancada",
    icon: "fa-lightbulb",
    state: true,
    room: 8,
  },
  {
    id: 19,
    name: "Geladeira Smart",
    icon: "fa-ice-cream",
    state: false,
    room: 8,
  },
  {
    id: 20,
    name: "Cafeteira",
    icon: "fa-mug-hot",
    state: false,
    room: 8,
  },
  {
    id: 21,
    name: "Lâmpada de Cabeceira",
    icon: "fa-lightbulb",
    state: false,
    room: 9,
  },
  {
    id: 22,
    name: "Televisão do Quarto",
    icon: "fa-tv",
    state: true,
    room: 9,
  },
  {
    id: 23,
    name: "Ar Condicionado",
    icon: "fa-wind",
    state: false,
    room: 9,
  },
  {
    id: 24,
    name: "Luminária de Mesa",
    icon: "fa-lightbulb",
    state: false,
    room: 10,
  },
  {
    id: 25,
    name: "Computador",
    icon: "fa-desktop",
    state: false,
    room: 10,
  },
  {
    id: 26,
    name: "Luz Externa",
    icon: "fa-lightbulb",
    state: false,
    room: 11,
  },
];
