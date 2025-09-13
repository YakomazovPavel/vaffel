push:
	npm run build
	git add .
	git commit --allow-empty-message -m ""
	git push origin main