from aiogram import Bot as TGBot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode, MenuButtonType
from aiogram.types import (
    Message,
    InlineQueryResultArticle,
    InputTextMessageContent,
    InlineQueryResultsButton,
    WebAppInfo,
    MenuButtonWebApp,
    InlineQueryResultPhoto,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
)
from aiogram.types.inline_query import InlineQuery
from aiogram.filters.command import Command
from aiogram.methods.set_chat_menu_button import SetChatMenuButton

baskets = [
    {
        "id":"1", 
        "name":"Посиделки 2 ноября", 
        "photo":"https://downloader.disk.yandex.ru/preview/3b3c2ddd42cf9d84afb250d46876def8261b27b81f6d7ebf9250e2487d2aa650/67415176/KWcx509eMhcb4UU_4HattorWd3j1B0FksaSRpJpWSZGISZdN3Mw0MWkj-g_czMuFyzfnIsla70jD87W_QBgE0g%3D%3D?uid=0&filename=1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048",
        "link":"https://t.me/yakomazov_bot/start?startapp=123"
    },
    {
        "id":"2", 
        "name":"Хеллоуин", 
        "photo":"https://downloader.disk.yandex.ru/preview/4edca4ddbe40c91ffcf0a95cc992df13dc8834dfb91be4106e61e99ff389c4d9/6741527f/O75z42RDxoJopG5bJ1vex3nvrfyj__1CqVPUl29VsSgH42bkZqJAKEwE86UbmZcDjdG6cphYItuSyIagbbdtOA%3D%3D?uid=0&filename=2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048",
        "link":"https://t.me/yakomazov_bot?profile"
    },
    {
        "id":"3", 
        "name":"Тыквенный спас", 
        "photo":"https://downloader.disk.yandex.ru/preview/fb90edcef6ee2ef66b90bd627d81c4be01cde4f2904b8d30d0bcf761908ecd81/674152e3/L2d5YyKFUkr6SP6t-oIsw4rWd3j1B0FksaSRpJpWSZErCKq059OzrADJkZy9R6AC_ucUGk5did0q-Ku9CMyvlA%3D%3D?uid=0&filename=3.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048",
        "link":"https://t.me/yakomazov_bot?startapp=sdf23&"
    },
    {
        "id":"19", 
        "name":"Отчаяние", 
        "photo":"https://downloader.disk.yandex.ru/preview/62e7b462e7c680d1a043275f4112d093a6938d41932a07055ba1da6aea308e56/67415316/JEF8Nul4kkjOSnDzjQjS1orWd3j1B0FksaSRpJpWSZFUDIHwNQ0CJYv6fNJkhZCXU9fokZkOiy25Xpt9t4wwgw%3D%3D?uid=0&filename=9.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048",
        "link":""
    },
]

photo_bota = "https://downloader.disk.yandex.ru/preview/8b4afccbf4a685f2e82fca2536f63db83c77dd24d9d0eb3eb1b6fe82334133f5/6741562c/zy6dQWME2ZtynCu5ap1CPt-klyi6dJZKHRorgUdwirMuSQthdTHXjO8kT7_UebCfKixpzkOMpn4bpuov8Futxw%3D%3D?uid=0&filename=icon2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"


# photo_url = "https://photos.app.goo.gl/eLKpTjxezmHXAcWQA"
# photo_url = "https://img.freepik.com/free-photo/shopping-basket-on-white_93675-130677.jpg?size=626&ext=jpg"
# photo_url = 


bot_self_link = "https://t.me/yakomazov_bot?profile"
bot_self_link_start = "https://t.me/yakomazov_bot/start?startapp=123"



class Bot:
    def __init__(self, token: str, url: str) -> None:
        self.bot = TGBot(
            token=token, default=DefaultBotProperties(parse_mode=ParseMode.HTML)
        )
        self.dp = Dispatcher()
        self.url = url

        @self.dp.inline_query()
        async def inline_handler(query: InlineQuery):
            print("query", query)

            article = InlineQueryResultArticle(
                id="0",
                title="Поделиться ботом",
                thumbnail_url=photo_bota,
                description="Пригласите друзей с помощью реферальной ссылки",
                input_message_content=InputTextMessageContent(
                    message_text="input_message_content"
                ),
            )

            photos = [InlineQueryResultPhoto(
                id=basket.get("id"),
                photo_url=basket.get("photo"),
                thumbnail_url=basket.get("photo"),
                title=basket.get("name"),
                description=basket.get("id"),
                caption=f"Добавляем свои вафельки сюда!\n{basket.get("link")}",
                reply_markup=InlineKeyboardMarkup(
                    inline_keyboard=[
                        [
                            InlineKeyboardButton(
                                text="Добавить вафель",
                                url=bot_self_link_start,
                                # login_url=LoginUrl(
                                #     url=BOT_DOMAIN,
                                # )
                                # web_app=WebAppInfo(url="https://t.me/yakomazov_bot?startapp=sdf23&mode=compact")
                            )
                        ]
                    ]
                )
                ) for basket in baskets]
            

            # photo = InlineQueryResultPhoto(
            #     id="1",
            #     photo_url=photo_url,
            #     # photo_url="http://192.168.1.9/1.jpg",
            #     # thumbnail_url="https://img.freepik.com/free-photo/shopping-basket-on-white_93675-130677.jpg?size=626&ext=jpg",
            #     thumbnail_url=photo_url,
            #     title="Посиделки 2 ноября",
            #     description="#1",
            #     # caption="Добавляем свои вафельки сюда!\nhttps://t.me/yakomazov_bot/start?startapp=123",
            #     caption=f"Добавляем свои вафельки сюда!\n{bot_self_link}",
            #     reply_markup=InlineKeyboardMarkup(
            #         inline_keyboard=[
            #             [
            #                 InlineKeyboardButton(
            #                     text="Добавить вафель",
            #                     url=bot_self_link_start,
            #                     # login_url=LoginUrl(
            #                     #     url=BOT_DOMAIN,
            #                     # )
            #                     # web_app=WebAppInfo(url=WEB_APP_URL)
            #                 )
            #             ]
            #         ]
            #     ),
            #     # photo_width
            #     # photo_height
            # )

            button = InlineQueryResultsButton(
                # start_parameter="123",
                text="Создать корзину",
                web_app=WebAppInfo(url=self.url),
            )

            await query.answer(
                results=[*photos, article], button=button, cache_time=1, is_personal=True
                # results=photos, button=button, cache_time=1, is_personal=True
            )

        @self.dp.message(Command("start"))
        async def start(message: Message) -> None:
            print("user", message.from_user)
            await self.bot(
                SetChatMenuButton(
                    chat_id=message.chat.id,
                    menu_button=MenuButtonWebApp(
                        type=MenuButtonType.WEB_APP,
                        text="Меню",
                        web_app=WebAppInfo(url=self.url),
                    ),
                )
            )

            await message.answer(
                f"Привет, {message.from_user.full_name}!  \nПереходи в меню, чтобы создавать и делиться своими корзинами вафель от vaffel"
            )

    async def start(self) -> None:
        print("start bot")
        await self.bot.set_my_name(name="Vaffel")
        # await bot.set_my_short_description(short_description="my_short_description")
        await self.bot.set_my_description(
            description="Создавайте и делитесь корзинами, для совместного заказа норвежских вафель от Vaffel"
        )
        await self.dp.start_polling(self.bot, skip_updates=True)


# if __name__ == "__main__":
#     asyncio.run(main())
