import uvicorn
from server import Server
from bot import Bot
from os import getenv
from Registry import Registry


def main():
    TOKEN = getenv("TOKEN")
    WEB_APP_URL = getenv("WEB_APP_URL")
    BOT_DOMAIN = getenv("BOT_DOMAIN")
    PATH_TO_DB = getenv("PATH_TO_DB")
    DEBUG = getenv("DEBUG")

    if DEBUG:
        print(f"""
========================================================================================================================
    
TOKEN       {TOKEN}
WEB_APP_URL {WEB_APP_URL}
BOT_DOMAIN  {BOT_DOMAIN}
PATH_TO_DB  {PATH_TO_DB}
DEBUG       {DEBUG}

========================================================================================================================
""")
    registry = Registry(filename=PATH_TO_DB)
    bot = Bot(token=TOKEN, url=WEB_APP_URL)
    server = Server(bot=bot, registry=registry)
    uvicorn.run(server, host="0.0.0.0", port=8000)  # log_level="info"


if __name__ == "__main__":
    main()
