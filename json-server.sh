npm install -g json-server
echo '{ "users":' >> db.json
curl https://jsonplaceholder.typicode.com/users >> db.json
echo ', "todos":' >> db.json
curl https://jsonplaceholder.typicode.com/todos >> db.json
echo '}'
npx json-server db.json