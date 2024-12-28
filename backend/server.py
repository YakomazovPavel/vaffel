import asyncio
from typing import Annotated
from fastapi import FastAPI, APIRouter, Query
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from bot import Bot
from Registry import Registry

# import time

# from fastapi.encoders import jsonable_encoder
from Types import Basket


class Server(FastAPI):
    def __init__(self, *args, bot: Bot, registry: Registry, **kwargs) -> None:
        self.bot = bot
        self.registry = registry

        @asynccontextmanager
        async def lifespan(app: FastAPI):
            asyncio.create_task(bot.start())
            yield

        # all fields https://fastapi.tiangolo.com/reference/fastapi/#fastapi-class
        default = {
            "title": "Title",
            "description": """Для работы с <a href="/UserApp/docs#/">Users</a><br/>Для работы с <a href="/BasketApp/docs#/">Basket</a><br/>""",
            "summary": "Summary",
            "version": "0.0.1",
            # "contact": {
            #     "name": "Deadpoolio the Amazing",
            #     "url": "http://x-force.example.com/contact/",
            #     "email": "dp@x-force.example.com",
            # },
            "root_path": "/api",
            # "root_path_in_servers": False,
        }
        super().__init__(*args, lifespan=lifespan, **default, **kwargs)
        # Configure routes
        router = APIRouter()
        router.include_router(BasketRouter(registry=registry))
        router.include_router(UserRouter())
        self.include_router(router)

        # self.mount(path="/UserApp", app=UserApp(), name="UserApp")
        # self.mount(
        #     path="/BasketApp",
        #     app=BasketApp(),
        #     name="BasketApp",
        # )

        # @self.get("/hello")
        # def server_hello():
        #     return "server_hello!"


class BasketRouter(APIRouter):
    def __init__(self, *args, registry: Registry, **kwargs) -> None:
        self.registry = registry
        default = {"prefix": "/basket", "tags": ["Basket"]}
        super().__init__(*args, **default, **kwargs)

        @self.get("/")
        def get_basket(
            user_id: Annotated[
                int | None,
                Query(title="User Id", description="Идентификатор пользователя"),
            ] = None,
        ):
            return user_id

        @self.get("/{basket_id}")
        def basket_detail(basket_id: int):
            print("basket_id", basket_id, "type", type(basket_id))
            return basket_id

        @self.post("/")
        def post_basket(basket: Basket):
            print("post_basket", basket)
            print("expired_at", basket.expired_at)
            res = self.registry.create_basket(basket)
            # print("res", res)
            return JSONResponse(content=basket.model_dump_json())


class UserRouter(APIRouter):
    def __init__(self, *args, **kwargs) -> None:
        default = {"prefix": "/user", "tags": ["User"]}
        super().__init__(*args, **default, **kwargs)

        @self.get("/")
        def user_hello():
            return "Hello!"


# class UserApp(FastAPI):
#     def __init__(self, *args, **kwargs) -> None:
#         super().__init__(*args, **kwargs)

#         @self.get("path1")
#         async def path1():
#             return {"message": "app1"}


# class BasketApp(FastAPI):
#     def __init__(self, *args, **kwargs) -> None:
#         super().__init__(*args, **kwargs)

#         @self.get("path2")
#         async def path2():
#             return {"message": "BasketApp"}


# @property
# def run(self):
#     return self


# app.include_router(prefix_router)
# app.get("/hello")(hello_handler)

# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
