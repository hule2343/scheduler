from app.cruds.admin import create_admin

def createadminuser():
    name=input("Enter name: ")
    password=input("Enter password: ")
    re_password=input("Re-enter password: ")
    room_number=input("Enter room number: ")
    if password!=re_password:
        print("Passwords do not match")
        return
    response = create_admin(name, password, room_number)
    print(response)

if __name__ == "__main__":
    createadminuser()
    