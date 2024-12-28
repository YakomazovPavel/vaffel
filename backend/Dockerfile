FROM python:3.12
WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r requirements.txt
COPY *.py ./
ADD ./Types ./Types
ADD ./Registry ./Registry
# COPY ./registry.py .
# COPY ./main.py .
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
CMD ["python", "main.py"]