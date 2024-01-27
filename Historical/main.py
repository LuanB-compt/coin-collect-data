from binance.client import Client
from src.controller.Controller import Controller


if __name__=="__main__":
    client = Client()
    c = Controller(symbol="ETHUSDT", client=client)
    c.getOHLC()
    c.saveOHLC()
