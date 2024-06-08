import pytest
from conftest import test_client
from fastapi.testclient import TestClient
from app.models.models import Slot, User


def test_all(test_client: TestClient):
    group = test_client.post("admin/groups", json={"name": "testGroup"})
    group_id = group.json().get("id")
    assert group.status_code == 200
    assert group.json().get("name") == "testGroup"
    user2 = test_client.post(
        "/admin/users",
        json={
            "name": "testUser2",
            "room_number": "B311",
            "password": "superUserPassword",
            "is_admin": False,
        },
    )
    user3 = test_client.post(
        "/admin/users",
        json={
            "name": "testUser3",
            "room_number": "B311",
            "password": "superUserPassword",
            "is_admin": False,
        },
    )
    user_4 = test_client.post(
        "/admin/users",
        json={
            "name": "testUser4",
            "room_number": "B311",
            "password": "superUserPassword",
            "is_admin": False,
        },
    )
    assert user2.status_code == 200
    assert user2.json().get("name") == "testUser2"
    assert user2.json().get("room_number") == "B311"
    assert not user2.json().get("is_admin")
    addusers = test_client.post(
        "/admin/groups/" + group_id + "/adduser",
        json={
            "users": [
                user2.json().get("id"),
                user3.json().get("id"),
                test_client.user.id,
            ]
        },
    )
    assert addusers.status_code == 200
    assert addusers.json().get("users")[0].get("name") == "testUser2"
    assert addusers.json().get("users")[0].get("role") == "super"
    assert addusers.json().get("users")[1].get("name") == "testUser3"
    assert addusers.json().get("users")[1].get("role") == "super"

    role_change = test_client.patch(
        group_id + "/users/" + user3.json().get("id") + "/role",
        json={
            "role": "normal",
        },
    )
    assert role_change.status_code == 200
    assert role_change.json().get("role") == "normal"
    user3_Login = test_client.post(
        "/login",
        data={
            "username": "testUser3",
            "password": "superUserPassword",
        },
    )
    user_4_Login = test_client.post(
        "/login",
        data={
            "username": "testUser4",
            "password": "superUserPassword",
        },
    )

    add_task = test_client.post(
        group_id + "/tasks",
        json={
            "name": "testTask",
            "detail": "testDetail",
            "max_worker_num": 1,
            "min_worker_num": 1,
            "exp_worker_num": 1,
            "point": 1,
        },
    )
    assert add_task.status_code == 200
    assert add_task.json().get("name") == "testTask"
    assert add_task.json().get("detail") == "testDetail"
    assert add_task.json().get("max_worker_num") == 1
    assert add_task.json().get("min_worker_num") == 1
    assert add_task.json().get("exp_worker_num") == 1
    assert add_task.json().get("point") == 1
    assert add_task.json().get("group_id") == group_id
    add_task_Faliure = test_client.post(
        group_id + "/tasks",
        headers={"Authorization": f"Bearer {user3_Login.json().get('access_token')}"},
        json={
            "name": "testTask",
            "detail": "testDetail",
            "max_worker_num": 1,
            "min_worker_num": 1,
            "exp_worker_num": 1,
            "point": 1,
        },
    )
    assert add_task_Faliure.status_code == 403
    add_slot = test_client.post(
        group_id + "/slots",
        json={
            "name": "testSlot",
            "start_time": "2021-01-01T00:00:00",
            "end_time": "2021-01-01T01:00:00",
            "task_id": add_task.json().get("id"),
        },
    )

    assert add_slot.status_code == 200
    assert add_slot.json().get("name") == "testSlot"
    assert add_slot.json().get("start_time") == "2021-01-01T00:00:00"
    assert add_slot.json().get("end_time") == "2021-01-01T01:00:00"
    assert add_slot.json().get("task_id") == add_task.json().get("id")
    assert add_slot.json().get("creater_id") == test_client.user.id
    add_slot_Faliure = test_client.post(
        group_id + "/slots",
        headers={"Authorization": f"Bearer {user_4_Login.json().get('access_token')}"},
        json={
            "name": "testSlot",
            "start_time": "2021-01-01T00:00:00",
            "end_time": "2021-01-01T01:00:00",
            "task_id": add_task.json().get("id"),
        },
    )
    assert add_slot_Faliure.status_code == 403
    assign_slot = test_client.post(
        group_id + "/slots/" + add_slot.json().get("id") + "/assign",
    )
    assert assign_slot.status_code == 200
    assert assign_slot.json().get("assignees")[0].get("id") == test_client.user.id
    assert assign_slot.json().get("assignees")[0].get("name") == test_client.user.name
    assign_slot_Failure = test_client.post(
        group_id + "/slots/" + add_slot.json().get("id") + "/assign",
        headers={"Authorization": f"Bearer {user_4_Login.json().get('access_token')}"},
    )
    assert assign_slot_Failure.status_code == 403
    cancel_slot = test_client.post(
        group_id + "/slots/" + add_slot.json().get("id") + "/cancel",
    )
    assert cancel_slot.status_code == 200
    assert cancel_slot.json().get("assignees") == []
    assign_slot= test_client.post(
        group_id + "/slots/" + add_slot.json().get("id") + "/assign",
    )
    assert assign_slot.status_code == 200
    complete_slot= test_client.post(
        group_id + "/slots/" + add_slot.json().get("id") + "/complete",
    )
    assert complete_slot.status_code == 200
    assert complete_slot.json().get("assignees") == []
    complete_user= test_client.get(
        "/me",
    )
    assert complete_user.status_code == 200
    assert complete_user.json().get("point") == 1
    