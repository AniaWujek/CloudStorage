nginx: nginx/* nginx/sites-available/* nginx/html/*
	sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
	sudo cp -R nginx/sites-available /etc/nginx
	sudo cp -R nginx/html /etc/nginx
	sudo chmod -R 755 /etc/nginx/
	sudo chown www-data:www-data -R /etc/nginx/html
	sudo rm /etc/nginx/sites-enabled/*
	sudo ln -s /etc/nginx/sites-available/$(enabled) /etc/nginx/sites-enabled/$(enabled)
