const path = './server/posts.json';

const methods = require('./public/scripts/server.js');
const fs = require('fs');

const express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


for(method in methods){
	[].__proto__[method]=methods[method];
}


app.put('/posts', (req, res)=>{
	const allPosts = JSON.parse(fs.readFileSync(path));
    const configs = req.body;
	const posts = allPosts.getPhotoPosts(Number(configs.skip), Number(configs.top), configs.filterConfig);
	console.log(posts);
	if(posts){
		res.send(JSON.stringify(posts));
		res.statusCode = 200;
	}
	else{
		res.send('olala2');
		res.statusCode = 400;
	}
})

app.post('/post', (req, res) => {
	const posts = JSON.parse(fs.readFileSync(path));
	const post = req.body;

	post.createdAt = new Date(post.createdAt);

	if (posts.addPhotoPost(post)) {
		fs.writeFile(path, JSON.stringify(posts));
		res.statusCode=200;
	}

	else {
		res.send("olala2");
		res.statusCode=400;
	}
})


app.get('/post/:id', (req, res) => {
	const posts = JSON.parse(fs.readFileSync(path));
	const post = posts.getPhotoPost(`${req.params.id}`);

	if (post) {
		res.send(JSON.stringify(post));
		res.statusCode=200;
	}

	else {
		res.send("olala2");
		res.statusCode=400;
	}
})


app.put('/post/:id', (req, res) => {
	const posts = JSON.parse(fs.readFileSync(path));
	const editPost = req.body;
	const id = `${req.params.id}`;
    console.log(id, editPost);
	if (posts.editPhotoPost(id, editPost)) {
		res.send("olala1");
		fs.writeFile(path, JSON.stringify(posts));
		res.statusCode=200;
	}

	else {
		res.send("olala2");
		res.statusCode=400;
	}
})

app.delete('/post/:id', (req, res)=>{
	const posts = JSON.parse(fs.readFileSync(path));
	const id = `${req.params.id}`;

	if(posts.removePhotoPost(id)){
		res.send("olala1");
		fs.writeFile(path, JSON.stringify(posts));
		res.statusCode=200;
	}
	else{
		res.send("olala2");
		res.statusCode=400;
	}
})






const server = app.listen(3000, () => {
	console.log('Server on port 3000');
});
