from sqlalchemy import create_engine, Engine

def getDBinstance(path: str = "../out/db.sqlite") -> Engine or False:
    try:
        return create_engine(url=f"sqlite:///{path}", echo=True)
    except:
        return False

db = getDBinstance()