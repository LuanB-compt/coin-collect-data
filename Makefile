build:
	mkdir ./out

install-historical:
	sudo apt install python3.11
	sudo apt install python3.11-venv
	python3.11 -m venv ./Historical/.env
	./Historical/.env/bin/pip install -r ./Historical/requirements.txt

