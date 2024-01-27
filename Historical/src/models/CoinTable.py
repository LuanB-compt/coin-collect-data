from sqlalchemy import Table, MetaData, Column, String, Double, DateTime, Integer

metaObj = MetaData()

CoinTableModel = Table(
    "CoinTable",
    metaObj,
    Column("Symbol", String, nullable=False, autoincrement=False, unique=False),
    Column("OpenDateTime", DateTime, nullable=False, autoincrement=False, unique=False),
    Column("CloseDateTime", DateTime, nullable=False, autoincrement=False, unique=False),
    Column("Open", Double, nullable=False, autoincrement=False, unique=False),
    Column("High", Double, nullable=False, autoincrement=False, unique=False),
    Column("Low", Double, nullable=False, autoincrement=False, unique=False),
    Column("Close", Double, nullable=False, autoincrement=False, unique=False),
    Column("Volume", Double, nullable=False, autoincrement=False, unique=False),
    Column("NumTrades", Integer, nullable=True, autoincrement=False, unique=False)
)
