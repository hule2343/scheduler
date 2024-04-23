from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker

from app.env import DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_USER

DATABASE = "postgresql+psycopg2://%s:%s@%s:5432/%s" % (
    DB_USER,
    DB_PASSWORD,
    DB_HOSTNAME,
    DB_NAME,
)

engine = create_engine(DATABASE, echo=True)

# 実際の DB セッション
SessionLocal = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)


class Base(DeclarativeBase):
    pass


Base.query = SessionLocal.query_property()


# Dependency Injection用
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
