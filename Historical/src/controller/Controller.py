import pandas as pd
import datetime as dt
from pytz import utc
from binance import Client
from src.database.SQLite import db
from src.models.CoinTable import metaObj, CoinTableModel

class Controller():
    def __init__(self, symbol: str, client: Client, interval: str = '15m', pastDays: int = 365):
        metaObj.create_all(bind=db)
        self.symbol: str = symbol
        self.client: Client = client
        self.data: pd.DataFrame = None
        self.interval = interval
        self.pastDays = pastDays

    def getStartDate(self) -> str:
        return str(
            (dt.datetime.now(dt.timezone.utc).date() - pd.Timedelta(str(self.pastDays)+' days'))
        )

    def getOHLC(self) -> None:
        self.data = pd.DataFrame(
            self.client.get_historical_klines(
                symbol=self.symbol,
                start_str=self.getStartDate(),
                end_str=str(dt.datetime.now(dt.timezone.utc).date()),
                interval=self.interval
            )
        )
        self.__processingOHLC()

    def saveOHLC(self) -> None:
        self.data.to_sql(name=CoinTableModel.name, con=db, if_exists="append")

    def __processingOHLC(self) -> None:
        self.data.columns = [
            'OpenDateTime',
            'Open', 'High', 'Low', 'Close', 'Volume',
            'CloseDateTime',
            'qav',
            'NumTrades',
            'taker_base_vol',
            'taker_quote_vol',
            'is_best_match'
        ]
        self.data['OpenDateTime'] = [dt.datetime.fromtimestamp(x/1000, tz=utc) for x in self.data.OpenDateTime]
        self.data['CloseDateTime'] = [dt.datetime.fromtimestamp(x/1000, tz=utc) for x in self.data.CloseDateTime]
        self.data['Symbol'] = self.symbol
        self.data = self.data[
            ['Symbol', 'OpenDateTime', 'CloseDateTime', 'Open', 'High', 'Low', 'Close', 'Volume', 'NumTrades']
        ]
