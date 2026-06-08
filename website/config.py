# config.py

from dotenv import load_dotenv
import os
from pathlib import Path

# Determine the environment
load_dotenv(dotenv_path="website\\.env")
ENV = os.getenv("ENV")  # default to 'dev'

# Load corresponding .env file
env_path = Path(f"website\\.env.{ENV}")
if env_path.exists():
    load_dotenv(dotenv_path=env_path)

# Now load the variables
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY", "r4m0s_4r1zp3_s3cr3t")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

CURRENT_ENV = ENV