echo 'Building the API Docker image...'
docker build -t api_img .
echo 'API Docker image built successfully.'

echo 'Running the API Docker container...'
docker run --rm -p 8000:8000 --name api_container \
--link last_onion_db_container:last_onion_db_container api_img