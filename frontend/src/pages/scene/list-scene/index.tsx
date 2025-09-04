import { Link } from "react-router";
import { ActionButton } from "../../../components/action-button";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";
import { Loading } from "../../../components/loading";

export const ListScene = () => {
  const [scenesData, setScenesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScenesData = async () => {
      try {
        setLoading(true);
        const response = await fetchData({ endpoint: "/scenes" });
        setScenesData(response);
      } catch (error) {
        console.error("Error fetching scenes:", error);
        setScenesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScenesData();
  }, []);

  return (
    <div className="relative p-5 pb-[150px] ">
      <Link to="/cenas/novo">
        <ActionButton icon="plus" />
      </Link>
      <h1 className="text-center text-2xl font-bold">Cenas</h1>

      {!loading ? (
        <div className="grid grid-cols-2 pb-30 gap-5 mt-5">
          {scenesData &&
            scenesData.map((scene) => (
              <Link
                to={`/cenas/${scene.id}`}
                key={scene.id}
                state={{ selectedScene: scene }}
              >
                <Card
                  key={scene.id}
                  title={scene.name}
                  // showStatus={true}
                  // status={scene.state}
                  icon={scene.icon}
                  toggleStatus={scene.in_progress}
                />
              </Link>
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
