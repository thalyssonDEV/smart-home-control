import { Link } from "react-router";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";

export const ListScene = () => {
  const [scenesData, setScenesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchScenesData = async () => {
      try {
        const response = await fetchData({ endpoint: "/scenes" });
        setScenesData(response);
      } catch (error) {
        console.error("Error fetching scenes:", error);
        setScenesData([]);
      }
    };

    fetchScenesData();
  }, []);

  return (
    <div className="relative p-5 pb-[150px] ">
      <ActionButton icon="plus" />
      <h1 className="text-center text-2xl font-bold">Cenas</h1>

      <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
        {scenesData &&
          scenesData.map((scene) => (
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
