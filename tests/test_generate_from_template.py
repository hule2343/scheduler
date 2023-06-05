from app.cruds.template import generate_slots,create
from sqlalchemy.orm import Session
from app.models.models import Task

task_list=[]

def test_create_template(test_db:Session):
    templatetask_list=[]
    for task in task_list:
        


def test_generate_slots(test_db:Session):
    for task in task_list:
        db_task=Task(
            
        )