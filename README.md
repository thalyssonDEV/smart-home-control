# Documentação da API (Endpoints)

## Cômodos (Rooms)

### Listar todos os cômodos

-   **Method:** `GET`
-   **URL:** `/api/rooms/`
-   **Parâmetros:**
    -   `name` (query): Filtra por nome do cômodo.
    -   `icon` (query): Filtra por ícone do cômodo.
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        [
            {
                "id": 1,
                "name": "Sala de Estar",
                "icon": "living-room"
            }
        ]
        ```

### Criar um novo cômodo

-   **Method:** `POST`
-   **URL:** `/api/rooms/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Cozinha",
        "icon": "kitchen"
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `201 Created`
    -   **Body:**
        ```json
        {
            "id": 2,
            "name": "Cozinha",
            "icon": "kitchen"
        }
        ```

### Obter detalhes de um cômodo

-   **Method:** `GET`
-   **URL:** `/api/rooms/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Sala de Estar",
            "icon": "living-room"
        }
        ```
-   **Resposta (Falha):**
    -   **Status:** `404 Not Found`

### Atualizar um cômodo

-   **Method:** `PUT` / `PATCH`
-   **URL:** `/api/rooms/{id}/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Sala de TV",
        "icon": "tv"
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Sala de TV",
            "icon": "tv"
        }
        ```

### Deletar um cômodo

-   **Method:** `DELETE`
-   **URL:** `/api/rooms/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `204 No Content`

## Dispositivos (Devices)

### Listar todos os dispositivos

-   **Method:** `GET`
-   **URL:** `/api/devices/`
-   **Parâmetros:**
    -   `name` (query): Filtra por nome do dispositivo.
    -   `room` (query): Filtra por ID do cômodo.
    -   `state` (query): Filtra por estado (`true` ou `false`).
    -   `icon` (query): Filtra por ícone.
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        [
            {
                "id": 1,
                "name": "Lâmpada",
                "icon": "lightbulb",
                "state": false,
                "room": 1
            }
        ]
        ```

### Criar um novo dispositivo

-   **Method:** `POST`
-   **URL:** `/api/devices/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Televisão",
        "icon": "tv",
        "state": false,
        "room": 1
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `201 Created`
    -   **Body:**
        ```json
        {
            "id": 2,
            "name": "Televisão",
            "icon": "tv",
            "state": false,
            "room": 1
        }
        ```

### Obter detalhes de um dispositivo

-   **Method:** `GET`
-   **URL:** `/api/devices/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Lâmpada",
            "icon": "lightbulb",
            "state": false,
            "room": 1
        }
        ```

### Atualizar um dispositivo

-   **Method:** `PUT` / `PATCH`
-   **URL:** `/api/devices/{id}/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Lâmpada Inteligente",
        "state": true
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Lâmpada Inteligente",
            "icon": "lightbulb",
            "state": true,
            "room": 1
        }
        ```

### Deletar um dispositivo

-   **Method:** `DELETE`
-   **URL:** `/api/devices/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `204 No Content`

## Cenas (Scenes)

### Listar todas as cenas

-   **Method:** `GET`
-   **URL:** `/api/scenes/`
-   **Parâmetros:**
    -   `name` (query): Filtra por nome da cena.
    -   `state` (query): Filtra por estado (`true` ou `false`).
    -   `in_progress` (query): Filtra por cenas em andamento (`true` ou `false`).
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        [
            {
                "id": 1,
                "name": "Modo Cinema",
                "state": true,
                "in_progress": false,
                "tasks": []
            }
        ]
        ```

### Criar uma nova cena

-   **Method:** `POST`
-   **URL:** `/api/scenes/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Bom Dia",
        "state": true
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `201 Created`
    -   **Body:**
        ```json
        {
            "id": 2,
            "name": "Bom Dia",
            "state": true,
            "in_progress": false,
            "tasks": []
        }
        ```

### Obter detalhes de uma cena

-   **Method:** `GET`
-   **URL:** `/api/scenes/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Modo Cinema",
            "state": true,
            "in_progress": false,
            "tasks": [
                {
                    "id": 1,
                    "device": 1,
                    "scene": 1,
                    "active": true,
                    "action": false,
                    "timer": null,
                    "order": 1
                }
            ]
        }
        ```

### Atualizar uma cena

-   **Method:** `PUT` / `PATCH`
-   **URL:** `/api/scenes/{id}/`
-   **Corpo da Requisição:**
    ```json
    {
        "name": "Modo Cinema - Atualizado",
        "state": false
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "name": "Modo Cinema - Atualizado",
            "state": false,
            "in_progress": false,
            "tasks": []
        }
        ```

### Deletar uma cena

-   **Method:** `DELETE`
-   **URL:** `/api/scenes/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `204 No Content`

## Tarefas (Tasks)

### Listar todas as tarefas de uma cena

-   **Method:** `GET`
-   **URL:** `/api/scenes/{scene_id}/tasks/`
-   **Parâmetros:**
    -   `active` (query): Filtra por tarefas ativas (`true` ou `false`).
    -   `action` (query): Filtra por ação (`true` para ligar, `false` para desligar).
    -   `device` (query): Filtra por ID do dispositivo.
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        [
            {
                "id": 1,
                "device": 1,
                "scene": 1,
                "active": true,
                "action": false,
                "timer": null,
                "order": 1
            }
        ]
        ```

### Criar uma nova tarefa em uma cena

-   **Method:** `POST`
-   **URL:** `/api/scenes/{scene_id}/tasks/`
-   **Corpo da Requisição:**
    ```json
    {
        "device": 2,
        "action": true,
        "timer": 5
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `201 Created`
    -   **Body:**
        ```json
        {
            "id": 2,
            "device": 2,
            "scene": 1,
            "active": true,
            "action": true,
            "timer": 5,
            "order": 2
        }
        ```

### Reordenar tarefas de uma cena

-   **Method:** `POST`
-   **URL:** `/api/scenes/{scene_id}/reorder-tasks/`
-   **Corpo da Requisição:**
    ```json
    {
        "ordered_task_ids": [2, 1]
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        [
            {
                "id": 2,
                "device": 2,
                "scene": 1,
                "active": true,
                "action": true,
                "timer": 5,
                "order": 1
            },
            {
                "id": 1,
                "device": 1,
                "scene": 1,
                "active": true,
                "action": false,
                "timer": null,
                "order": 2
            }
        ]
        ```
-   **Resposta (Falha):**
    -   **Status:** `400 Bad Request` (IDs duplicados, IDs inválidos, ou lista de IDs incompleta)

### Obter detalhes de uma tarefa

-   **Method:** `GET`
-   **URL:** `/api/tasks/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "device": 1,
            "scene": 1,
            "active": true,
            "action": false,
            "timer": null,
            "order": 1
        }
        ```

### Atualizar uma tarefa

-   **Method:** `PUT` / `PATCH`
-   **URL:** `/api/tasks/{id}/`
-   **Corpo da Requisição:**
    ```json
    {
        "active": false,
        "timer": 10
    }
    ```
-   **Resposta (Sucesso):**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "id": 1,
            "device": 1,
            "scene": 1,
            "active": false,
            "action": false,
            "timer": 10,
            "order": 1
        }
        ```

### Deletar uma tarefa

-   **Method:** `DELETE`
-   **URL:** `/api/tasks/{id}/`
-   **Resposta (Sucesso):**
    -   **Status:** `204 No Content`
