import { useLocation, useParams } from "react-router-dom";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";

export const SceneDetail = () => {
  const params = useParams<{ id: string }>();
  const sceneId = params.id;

  const [scene, setScene] = useState<any>(null);

  useEffect(() => {
    const fetchScenes = async () => {
      const response = await fetchData({ endpoint: `/scenes/${sceneId}` });
      const data = await response;
      setScene(data);
    };

    fetchScenes();
  }, []);

  const handleToggle = async (id: any) => {
    try {
      const updateTaskStatus = await fetchData({ endpoint: `/tasks/${id}` });
      console.log(updateTaskStatus);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      {scene && (
        <>
          <h1 className="text-center text-2xl font-bold m-3">
            <i className={`fa-solid ${scene.icon}`}></i>
            {scene.name}
          </h1>
          {scene.tasks.map((task: any) => (
            <div key={task.id} className="p-3 rounded ">
              <Card
                title={task.id}
                toggleStatus={task.active}
                toggle={() => handleToggle(task.id)}
                status={task.action}
                showStatus={true}
                className="h-[100px]"
              />
              {task.timer && (
                <div className="shadow p-3 mt-4 flex items-center justify-center gap-3 bg-secondary">
                  <i className="fa-solid fa-clock"></i>
                  {task.timer} segundos
                </div>
              )}
            </div>
          ))}
        </>
      )}
      <pre>{JSON.stringify(scene, null, 2)}</pre>
    </div>
  );
};
