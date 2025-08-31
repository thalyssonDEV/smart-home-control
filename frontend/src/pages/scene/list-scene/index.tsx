import { Link } from "react-router";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";

export const ListScene = () => {
  return (
    <div className="relative p-5 pb-[150px] ">
      <ActionButton icon="plus" />
      <h1 className="text-center text-2xl font-bold">Cenas</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {scenesMock.map((scene) => (
          <Link to={`/cenas/${scene.id}`} key={scene.id} state={scene}>
            <Card
              key={scene.id}
              title={scene.name}
              showStatus={true}
              status={scene.state}
              icon={scene.icon}
              toggleStatus={scene.in_progress}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
const scenesMock = [
  {
    id: 6,
    name: "Modo Cinema",
    icon: "fa-film",
    state: true,
    in_progress: false,
    tasks: [
      {
        id: 14,
        device: 14,
        scene: 6,
        active: true,
        action: false,
        timer: null,
        order: 1,
      },
      {
        id: 15,
        device: 15,
        scene: 6,
        active: true,
        action: true,
        timer: null,
        order: 2,
      },
      {
        id: 16,
        device: 16,
        scene: 6,
        active: true,
        action: true,
        timer: null,
        order: 3,
      },
      {
        id: 17,
        device: 17,
        scene: 6,
        active: true,
        action: false,
        timer: null,
        order: 4,
      },
      {
        id: 27,
        device: 17,
        scene: 6,
        active: true,
        action: true,
        timer: null,
        order: 5,
      },
      {
        id: 28,
        device: 18,
        scene: 6,
        active: true,
        action: true,
        timer: 30,
        order: 6,
      },
    ],
  },
  {
    id: 7,
    name: "Bom Dia",
    icon: "fa-sun",
    state: true,
    in_progress: false,
    tasks: [
      {
        id: 18,
        device: 14,
        scene: 7,
        active: true,
        action: false,
        timer: null,
        order: 1,
      },
      {
        id: 19,
        device: 17,
        scene: 7,
        active: true,
        action: true,
        timer: null,
        order: 2,
      },
    ],
  },
  {
    id: 8,
    name: "Hora do Café",
    icon: "fa-mug-hot",
    state: true,
    in_progress: false,
    tasks: [
      {
        id: 21,
        device: 20,
        scene: 8,
        active: true,
        action: true,
        timer: null,
        order: 1,
      },
      {
        id: 20,
        device: 18,
        scene: 8,
        active: true,
        action: true,
        timer: null,
        order: 2,
      },
    ],
  },
  {
    id: 9,
    name: "Boa Noite",
    icon: "fa-moon",
    state: true,
    in_progress: false,
    tasks: [
      {
        id: 22,
        device: 21,
        scene: 9,
        active: true,
        action: false,
        timer: null,
        order: 1,
      },
      {
        id: 23,
        device: 22,
        scene: 9,
        active: true,
        action: false,
        timer: null,
        order: 2,
      },
      {
        id: 24,
        device: 23,
        scene: 9,
        active: true,
        action: true,
        timer: null,
        order: 3,
      },
    ],
  },
  {
    id: 10,
    name: "Hora de Trabalhar",
    icon: "fa-briefcase",
    state: true,
    in_progress: false,
    tasks: [
      {
        id: 25,
        device: 24,
        scene: 10,
        active: true,
        action: true,
        timer: null,
        order: 1,
      },
      {
        id: 26,
        device: 25,
        scene: 10,
        active: true,
        action: true,
        timer: null,
        order: 2,
      },
    ],
  },
];
