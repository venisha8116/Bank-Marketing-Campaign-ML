from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import router as api_router
from .core.config import API_DESCRIPTION, API_TITLE, API_VERSION, CORS_ORIGINS, MODEL_METADATA
from .services import predictor


@asynccontextmanager
async def lifespan(_: FastAPI):
    predictor.load()
    yield
    predictor.unload()


app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/", tags=["Meta"], summary="Service information")
def root() -> dict:
    return {
        "service": API_TITLE,
        "version": API_VERSION,
        "model": MODEL_METADATA["algorithm"],
        "docs": "/docs",
        "openapi": "/openapi.json",
    }