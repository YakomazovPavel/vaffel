import sqlite3 as db
from Types import Basket, BasketDetail, Dishes
from datetime import datetime
from abc import ABC, abstractmethod


class Registry(ABC):
    # @abstractmethod
    # def create_user(): ...

    @abstractmethod
    def create_basket(): ...

    # @abstractmethod
    # def get_menu(): ...


class LiteRegistry(Registry):
    def __init__(self, filename: str | None) -> None:
        self.filename = filename
        # TODO: Если файла не было, неоходимо проинициальзировать пустые таблички
        # TODO: Написать парсер исходного меню!

    def _exec(self, query: str, params: tuple | list[tuple] | None = None):
        with db.connect(self.filename) as connect:
            cursor = connect.cursor()
            if params is None or isinstance(params, tuple):
                cursor.execute(query, params)
            elif isinstance(params, list):
                cursor.executemany(query, params)
            else:
                return
            result = cursor.fetchall()
            return result

    # def sql_datetime(value: datetime) -> str:
    #     if not isinstance(value, datetime):
    #         raise ValueError
    #     return value.strftime("%Y-%m-%d %H:%M:%S")

    def create_basket(self, basket: Basket):
        res = self._exec(
            query="INSERT INTO baskets (name, expired_at, user_id) VALUES (?, ?, ?)",
            # params=(basket.name, basket.expired_at.isoformat(), basket.user_id),
            params=(
                basket.name,
                basket.expired_at.strftime("%Y-%m-%d %H:%M:%S"),
                basket.user_id,
            ),  # YYYY-MM-DD HH:MM:SS например, 2021-12-01 13:23:08
            # datetime.strptime('Jun 1 2005  1:33PM', '%b %d %Y %I:%M%p')
        )
        return res

    # def get_menu(self):

    # def Categories()


# connection = db.connect('vaffel.db')

# connection.close()

# categori_id = {
#     "Завтраки": 1,
#     "Детское меню": 2,
#     "Шпинатные вафли": 3,
#     "Популярное": 4,
#     "Томатные вафли": 5,
#     "Картофельные вафли": 6,
#     "Сырные вафли": 7,
#     "Сладкие вафли": 8,
#     "Салаты": 9 ,
#     "Супы и горячие блюда": 10,
#     "Напитки": 11,
#     "Наборы": 12,
# }

# with open("menu.json", "r") as file:
#     data = json.load(file)
#     for categori in data:
#         id_category = categori_id.get(categori.get("name"))
#         dishes = categori.get("categoryDishes")
#         if id_category and dishes:
#             for item in dishes:
#                 photo = item.get("photo")
#                 values = (
#                     item.get("name", ""),
#                     item.get("description", ""),
#                     int(float(item.get("price"))) if item.get("price") is not None else 0,
#                     float(item.get("weight")) if item.get("weight") is not None else 0.0,
#                     float(item.get("calories")) if item.get("calories") is not None else 0.0,
#                     float(item.get("proteins")) if item.get("proteins") is not None else 0.0,
#                     float(item.get("fats")) if item.get("fats") is not None else 0.0,
#                     float(item.get("carbs")) if item.get("carbs") is not None else 0.0,
#                     item.get("photo", {}).get("original", ""),
#                     item.get("photo", {}).get("large", ""),
#                     item.get("photo", {}).get("webp", ""),
#                     id_category
#                     )
#                 connection = db.connect('vaffel.db')
#                 cursor = connection.cursor()
#                 cursor.execute("INSERT INTO dishes ('name', 'description', 'price', 'weight', 'calories', 'proteins', 'fats', 'carbs', 'photo_original', 'photo_large', 'photo_webp', 'category_id') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", values)
#                 connection.commit()
#                 connection.close()

#                 print(values)


class AlchemyRegistry(Registry): ...
