from sqlalchemy import create_engine, Engine
from typing import Union

def getDBinstance(path: str = "./db.sqlite") -> Union[Engine, False]:
    try:
        return create_engine(url=f"sqlite:///{path}", echo=True)
    except:
        return False

db = getDBinstance()