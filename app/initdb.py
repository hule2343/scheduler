from sqlalchemy import create_engine
from app.models.models import Base
from app.env import DB_USER, DB_PASSWORD,  DB_NAME

DATABASE = "postgresql+psycopg2://%s:%s@testdb:5432/%s" % (
    DB_USER,
    DB_PASSWORD,
    DB_NAME,)

engine = create_engine(
    DATABASE,
    echo=True
)

def initdb():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
if __name__ == "__main__":
    initdb()