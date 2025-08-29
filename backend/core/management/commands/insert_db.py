from django.core.management.base import BaseCommand
from core.models import Room, Device, Scene, Task

class Command(BaseCommand):
    help = 'Popula o banco de dados com dados iniciais para teste.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Limpando o banco de dados antigo...')
        Room.objects.all().delete()
        Scene.objects.all().delete()
        Device.objects.all().delete()
        Task.objects.all().delete()

        self.stdout.write('Criando novos dados de teste...')

        # --- Estrutura de dados expandida ---
        data = {
            'Sala de Estar': {
                'devices': ['Lâmpada Inteligente', 'Televisão 8K', 'Soundbar', 'Cortina Elétrica'],
                'scenes': {
                    'Modo Cinema': {
                        'tasks': [
                            {'device': 'Lâmpada Inteligente', 'action': False}, # Desligar
                            {'device': 'Televisão 8K', 'action': True},       # Ligar
                            {'device': 'Soundbar', 'action': True},          # Ligar
                            {'device': 'Cortina Elétrica', 'action': False}, # Fechar (desligar)
                        ]
                    },
                    'Bom Dia': {
                         'tasks': [
                            {'device': 'Lâmpada Inteligente', 'action': False}, # Desligar
                            {'device': 'Cortina Elétrica', 'action': True},    # Abrir (ligar)
                        ]
                    }
                }
            },
            'Cozinha': {
                'devices': ['Lâmpada da Bancada', 'Geladeira Smart', 'Cafeteira'],
                'scenes': {
                    'Hora do Café': {
                        'tasks': [
                            {'device': 'Lâmpada da Bancada', 'action': True}, # Ligar
                            {'device': 'Cafeteira', 'action': True},         # Ligar
                        ]
                    }
                }
            },
            'Quarto Principal': {
                'devices': ['Lâmpada de Cabeceira', 'Televisão do Quarto', 'Ar Condicionado'],
                'scenes': {
                    'Boa Noite': {
                        'tasks': [
                            {'device': 'Lâmpada de Cabeceira', 'action': False}, # Desligar
                            {'device': 'Televisão do Quarto', 'action': False}, # Desligar
                            {'device': 'Ar Condicionado', 'action': True},      # Ligar
                        ]
                    }
                }
            },
            'Escritório': {
                'devices': ['Luminária de Mesa', 'Computador'],
                'scenes': {
                    'Hora de Trabalhar': {
                        'tasks': [
                             {'device': 'Luminária de Mesa', 'action': True}, # Ligar
                             {'device': 'Computador', 'action': True},        # Ligar
                        ]
                    }
                }
            },

            'Varanda': {
                'devices': ['Luz Externa'], # Cômodo com dispositivos, mas sem cenas
                'scenes': {}
            },
            'Lavanderia': {
                'devices': [], # Cômodo sem nenhum dispositivo e sem cenas
                'scenes': {}
            }
        }

        # --- Loop para povoar o banco de dados ---
        for room_name, room_data in data.items():
            novo_comodo = Room.objects.create(name=room_name)
            
            # Um dicionário temporário para guardar os devices criados neste cômodo
            devices_neste_comodo = {} 
            for device_name in room_data['devices']:
                novo_device = Device.objects.create(name=device_name, room=novo_comodo)
                devices_neste_comodo[device_name] = novo_device
            
            for scene_name, scene_data in room_data['scenes'].items():
                nova_cena = Scene.objects.create(name=scene_name)

                for task_info in scene_data['tasks']:
                    dispositivo_para_task = devices_neste_comodo[task_info['device']]
                    
                    Task.objects.create(
                        device=dispositivo_para_task,
                        scene=nova_cena,
                        action=task_info['action']
                    )

        self.stdout.write(self.style.SUCCESS('Banco de dados populado com sucesso!'))