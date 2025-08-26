from django.db import models

# Modelagem do Banco de Dados

class Room(models.Model):
    name = models.CharField(max_lenght=100)

    def __str__(self):
        return self.nome


class Device(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, null=False)
    state = models.BooleanField(default=False) # True = LIGADO, False = DESLIGADO
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='devices') # Chave Estrangeira de Room

    def __str__(self):
        return f"{self.name}" ({self.room.name})


class Scene(models.Model):
    name = models.CharField(max_length=100)
    state = models.BooleanField(default=True) # True = ATIVA, False = INATIVA
    in_progress = models.BooleanField(default=False) # True = EXECUTANDO, False = NÃO EXECUTANDO

    def __str__(self):
        return self.name


class Task(models.Model):
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="tasks") # Chave Estrangeira de Device
    scene = models.ForeignKey(Scene, on_delete=models.CASCADE, related_name="tasks") # Chave Estrangeira de Scene
    active = models.BooleanField(default=True) # True = TASK ATIVA, False = TASK SUSPENSA
    action = models.BooleanField(default=True)  # True = LIGAR, False = DESLIGAR
    timer = models.IntegerField(blank=True, null=True)  # Temporizador entre tasks ( Opcional )
    order = models.IntegerField()  # Ordem de execução dentro da cena

    def __str__(self):
        return f"Task {self.order} - {self.scene.name} - {self.device.name}"