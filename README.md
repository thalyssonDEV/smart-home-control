# 📖 Documentação da API de Automação Residencial

Esta API RESTful permite gerenciar cômodos, dispositivos, cenas e tarefas de automação residencial. A documentação a seguir descreve todos os endpoints disponíveis, seus métodos HTTP, parâmetros, e formatos de dados de requisição e resposta.

---

## 🏠 Endpoints de Cômodos (`/api/rooms`)

### Listar e Criar Cômodos

* **Method**: `GET` e `POST`
* **URL**: `/api/rooms/`
* **Parâmetros**: Nenhum.
* **Corpo da Requisição (`POST`)**:
    ```json
    {
      "name": "string"
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de objetos de cômodos.
        ```json
        [
          {
            "id": 1,
            "name": "Sala de Estar"
          },
          {
            "id": 2,
            "name": "Cozinha"
          }
        ]
        ```
    * **Falha (400 Bad Request)**:
        ```json
        {
          "name": [
            "Este campo é obrigatório."
          ]
        }
        ```
* **Resposta (`POST`)**:
    * **Sucesso (201 Created)**: Retorna o objeto do cômodo recém-criado.
        ```json
        {
          "id": 3,
          "name": "Quarto"
        }
        ```
    * **Falha (400 Bad Request)**:
        ```json
        {
          "name": [
            "Este campo é obrigatório."
          ]
        }
        ```

---

### Recuperar, Atualizar e Deletar um Cômodo

* **Method**: `GET`, `PUT`, `PATCH`, `DELETE`
* **URL**: `/api/rooms/{id}/`
* **Parâmetros (URL)**:
    * `id`: O ID do cômodo a ser manipulado.
* **Corpo da Requisição (`PUT` / `PATCH`)**:
    ```json
    {
      "name": "string"
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna o objeto do cômodo.
        ```json
        {
          "id": 1,
          "name": "Sala de Estar"
        }
        ```
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```
* **Resposta (`PUT` / `PATCH`)**:
    * **Sucesso (200 OK)**: Retorna o objeto do cômodo atualizado.
        ```json
        {
          "id": 1,
          "name": "Sala de TV"
        }
        ```
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```
* **Resposta (`DELETE`)**:
    * **Sucesso (204 No Content)**: Resposta vazia, indicando sucesso.
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```

---

## 💡 Endpoints de Dispositivos (`/api/devices`)

### Listar e Criar Dispositivos

* **Method**: `GET` e `POST`
* **URL**: `/api/devices/`
* **Parâmetros**: Nenhum.
* **Corpo da Requisição (`POST`)**:
    ```json
    {
      "name": "string",
      "icon": "string",
      "state": false,
      "room": 1
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de objetos de dispositivos.
        ```json
        [
          {
            "id": 1,
            "name": "Lâmpada Principal",
            "icon": "lightbulb",
            "state": true,
            "room": 1
          }
        ]
        ```
    * **Falha (400 Bad Request)**:
        ```json
        {
          "name": [
            "Este campo é obrigatório."
          ]
        }
        ```
* **Resposta (`POST`)**:
    * **Sucesso (201 Created)**: Retorna o objeto do dispositivo recém-criado.
        ```json
        {
          "id": 2,
          "name": "Ventilador de Teto",
            "icon": "fan",
            "state": false,
            "room": 1
        }
        ```
    * **Falha (400 Bad Request)**:
        ```json
        {
          "room": [
            "Objeto inválido para a relação 'room' - ID inválido."
          ]
        }
        ```

---

### Recuperar, Atualizar e Deletar um Dispositivo

* **Method**: `GET`, `PUT`, `PATCH`, `DELETE`
* **URL**: `/api/devices/{id}/`
* **Parâmetros (URL)**:
    * `id`: O ID do dispositivo.
* **Corpo da Requisição (`PUT` / `PATCH`)**:
    ```json
    {
      "name": "string",
      "icon": "string",
      "state": true,
      "room": 1
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna o objeto do dispositivo.
        ```json
        {
          "id": 1,
          "name": "Lâmpada Principal",
          "icon": "lightbulb",
          "state": true,
          "room": 1
        }
        ```
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```
* **Resposta (`PUT` / `PATCH`)**:
    * **Sucesso (200 OK)**: Retorna o objeto do dispositivo atualizado.
        * **Observação**: Se a requisição contiver apenas o campo `state`, a lógica do serializer `toggle_state()` será ativada, invertendo o estado atual. Se outros campos forem enviados junto, a atualização padrão do ModelViewSet será usada.
        ```json
        {
          "id": 1,
          "name": "Lâmpada Principal",
          "icon": "lightbulb",
          "state": false,
          "room": 1
        }
        ```
* **Resposta (`DELETE`)**:
    * **Sucesso (204 No Content)**: Resposta vazia, indicando sucesso.
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```

---

## 🛋️ Endpoints de Dispositivos por Cômodo

### Listar Dispositivos de um Cômodo

* **Method**: `GET`
* **URL**: `/api/rooms/{room_id}/devices/`
* **Parâmetros (URL)**:
    * `room_id`: O ID do cômodo.
* **Corpo da Requisição**: Nenhum.
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de dispositivos que pertencem ao cômodo especificado.
        ```json
        [
          {
            "id": 1,
            "name": "Lâmpada Principal",
            "icon": "lightbulb",
            "state": true,
            "room": 1
          },
          {
            "id": 2,
            "name": "Ventilador de Teto",
            "icon": "fan",
            "state": false,
            "room": 1
          }
        ]
        ```
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```

---

## 🎬 Endpoints de Cenas (`/api/scenes`)

### Listar e Criar Cenas

* **Method**: `GET` e `POST`
* **URL**: `/api/scenes/`
* **Parâmetros**: Nenhum.
* **Corpo da Requisição (`POST`)**:
    ```json
    {
      "name": "string",
      "state": true,
      "in_progress": false
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de objetos de cenas.
        ```json
        [
          {
            "id": 1,
            "name": "Filme",
            "state": true,
            "in_progress": false
          }
        ]
        ```
* **Resposta (`POST`)**:
    * **Sucesso (201 Created)**: Retorna o objeto da cena recém-criada.
        ```json
        {
          "id": 2,
          "name": "Hora de Dormir",
          "state": false,
          "in_progress": false
        }
        ```

---

### Recuperar, Atualizar e Deletar uma Cena

* **Method**: `GET`, `PUT`, `PATCH`, `DELETE`
* **URL**: `/api/scenes/{id}/`
* **Parâmetros (URL)**:
    * `id`: O ID da cena.
* **Corpo da Requisição (`PUT` / `PATCH`)**:
    ```json
    {
      "name": "string",
      "state": false,
      "in_progress": false
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna o objeto da cena.
        ```json
        {
          "id": 1,
          "name": "Filme",
          "state": true,
          "in_progress": false
        }
        ```
* **Resposta (`PUT` / `PATCH`)**:
    * **Sucesso (200 OK)**: Retorna o objeto da cena atualizado.
        ```json
        {
          "id": 1,
          "name": "Modo Festa",
          "state": false,
          "in_progress": false
        }
        ```
* **Resposta (`DELETE`)**:
    * **Sucesso (204 No Content)**: Resposta vazia, indicando sucesso.
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```

---

## ✅ Endpoints de Tarefas (`/api/tasks`)

### Listar e Criar Tarefas

* **Method**: `GET` e `POST`
* **URL**: `/api/tasks/`
* **Parâmetros**: Nenhum.
* **Corpo da Requisição (`POST`)**:
    ```json
    {
      "device": 1,
      "scene": 1,
      "active": true,
      "action": "toggle",
      "timer": 0,
      "order": 1
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de objetos de tarefas.
        ```json
        [
          {
            "id": 1,
            "device": 1,
            "scene": 1,
            "active": true,
            "action": "turn_on",
            "timer": 0,
            "order": 1
          }
        ]
        ```
* **Resposta (`POST`)**:
    * **Sucesso (201 Created)**: Retorna o objeto da tarefa recém-criada.
        ```json
        {
          "id": 2,
          "device": 2,
          "scene": 1,
          "active": true,
          "action": "turn_off",
          "timer": 0,
          "order": 2
        }
        ```

---

### Recuperar, Atualizar e Deletar uma Tarefa

* **Method**: `GET`, `PUT`, `PATCH`, `DELETE`
* **URL**: `/api/tasks/{id}/`
* **Parâmetros (URL)**:
    * `id`: O ID da tarefa.
* **Corpo da Requisição (`PUT` / `PATCH`)**:
    ```json
    {
      "device": 1,
      "scene": 1,
      "active": false,
      "action": "turn_off",
      "timer": 0,
      "order": 1
    }
    ```
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna o objeto da tarefa.
        ```json
        {
          "id": 1,
          "device": 1,
          "scene": 1,
          "active": true,
          "action": "turn_on",
          "timer": 0,
          "order": 1
        }
        ```
* **Resposta (`PUT` / `PATCH`)**:
    * **Sucesso (200 OK)**: Retorna o objeto da tarefa atualizado.
        ```json
        {
          "id": 1,
          "device": 1,
          "scene": 1,
          "active": false,
          "action": "turn_off",
          "timer": 0,
          "order": 1
        }
        ```
* **Resposta (`DELETE`)**:
    * **Sucesso (204 No Content)**: Resposta vazia.
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```

---

## 📋 Endpoints de Tarefas por Cena

### Listar Tarefas de uma Cena

* **Method**: `GET`
* **URL**: `/api/scenes/{scene_id}/tasks/`
* **Parâmetros (URL)**:
    * `scene_id`: O ID da cena.
* **Corpo da Requisição**: Nenhum.
* **Resposta (`GET`)**:
    * **Sucesso (200 OK)**: Retorna uma lista de tarefas que pertencem à cena especificada, ordenadas pelo campo `order`.
        ```json
        [
          {
            "id": 1,
            "device": 1,
            "scene": 1,
            "active": true,
            "action": "turn_on",
            "timer": 0,
            "order": 1
          },
          {
            "id": 2,
            "device": 2,
            "scene": 1,
            "active": true,
            "action": "turn_off",
            "timer": 0,
            "order": 2
          }
        ]
        ```
    * **Falha (404 Not Found)**:
        ```json
        {
          "detail": "Não encontrado."
        }
        ```