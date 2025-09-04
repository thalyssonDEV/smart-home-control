import { Link, useParams } from "react-router-dom";
import { Card } from "../../../components/card";
import { useEffect, useState } from "react";
import { fetchData } from "../../../insfrastructure/fetch-data";
import { ActionButton } from "../../../components/action-button";
import { Loading } from "../../../components/loading";

export const SceneDetail = () => {
  const params = useParams<{ id: string }>();
  const sceneId = params.id;

  const [scene, setScene] = useState<any>(null);
  const [sceneIsRunning, setSceneIsRunning] = useState(false);

  useEffect(() => {
    fetchScenes();
  }, []);

  const handleToggleActive = async (id: any, status: boolean) => {
    try {
      const fetchObj = {
        method: "PATCH",
        config: {
          data: { active: !status },
        },
        endpoint: `/tasks/${id}/`,
      };

      await fetchData(fetchObj);
      fetchScenes();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const runScene = async () => {
    try {
      setSceneIsRunning(true); // mostra o loading

      const fetchObj = {
        method: "POST",
        config: {
          data: { active: true },
        },
        endpoint: `/scenes/${sceneId}/run/`,
      };

      await fetchData(fetchObj);

      // Simula tempo de execução (3s)
      setTimeout(() => {
        setSceneIsRunning(false);
        fetchScenes();
      }, 3000);
    } catch (error) {
      console.error("Error running scene:", error);
      setSceneIsRunning(false);
    }
  };

  const fetchScenes = async () => {
    const response = await fetchData({ endpoint: `/scenes/${sceneId}` });
    setScene(response);
  };

  return (
    <div className="relative">
      <Link to={`/cenas/novo`} state={scene}>
        <ActionButton icon="edit" />
      </Link>

      {scene && (
        <>
          <h1 className="text-center text-2xl font-bold p-3">
            <i className={`fa-solid ${scene.icon} mr-2`}></i>
            {scene.name}
          </h1>

          <div className="w-full flex justify-center mb-5">
            <ActionButton
              icon="play"
              onClick={runScene}
              className="relative right-0 top-0"
            />
          </div>

          {sceneIsRunning && (
            <div className="flex justify-center mb-4">
              <Loading />
            </div>
          )}

          {scene.tasks.map((task: any) => (
            <div key={task.id} className="p-3 rounded">
              <Card
                title={
                  <div className="flex gap-3">
                    <i className={`fa-solid ${task.device.icon}`}></i>
                    <p>{task.device.name}</p>
                  </div>
                }
                toggleStatus={task.active}
                toggle={() => handleToggleActive(task.id, task.active)}
                status={task.action}
                showStatus={true}
                className="min-h-[100px]"
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
    </div>
  );
};
