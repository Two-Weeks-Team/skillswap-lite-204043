import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from routes import router
from models import engine, Base

# create tables on startup
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

app = FastAPI(title="SkillSwap Lite API", description="API for SkillSwap Lite, a micro‑mentoring platform", version="1.0")

@app.middleware("http")
async def normalize_api_prefix(request: Request, call_next):
    if request.scope.get("path", "").startswith("/api/"):
        request.scope["path"] = request.scope["path"][4:] or "/"
    return await call_next(request)

app.include_router(router)

@app.get("/health", summary="Health check")
async def health():
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse, summary="Landing page")
async def index():
    html = """
    <html>
      <head>
        <title>SkillSwap Lite</title>
        <style>
          body {font-family: Inter, sans-serif; margin: 0; padding: 0; color: #e0e0e0; background: #0c141a;}
          header {background: #006d77; padding: 1rem; text-align: center;}
          h1 {margin: 0; font-size: 2rem;}
          p {margin: 1rem 0;}
          nav a {color: #ff6f61; margin: 0 1rem; text-decoration: none;}
          footer {background: #001f2b; padding: 1rem; text-align: center; font-size: 0.9rem;}
        </style>
      </head>
      <body>
        <header>
          <h1>SkillSwap Lite</h1>
        </header>
        <main style="padding: 2rem; text-align: center;">
          <p>15‑minute peer skill swaps, no frills.</p>
          <h2>Endpoints</h2>
          <ul style="text-align: left; display: inline-block;">
            <li>GET /health – health check</li>
            <li>GET /matches – list reciprocal matches</li>
            <li>POST /sessions – create a 15‑minute session</li>
            <li>POST /ratings – submit session rating</li>
          </ul>
          <p>Tech stack:</p>
          <ul style="text-align: left; display: inline-block;">
            <li>Python 3.12, FastAPI, SQLAlchemy, httpx</li>
            <li>PostgreSQL / SQLite storage</li>
            <li>DigitalOcean Serverless Inference (openai-gpt-oss-120b)</li>
          </ul>
          <p><a href="/docs">API Docs</a> | <a href="/redoc">ReDoc</a></p>
        </main>
        <footer>© 2026 SkillSwap Lite</footer>
      </body>
    </html>
    """
    return HTMLResponse(content=html, status_code=200)