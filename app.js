const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const path = require('path');
const app = express();
const staticPublic = express.static(path.join(__dirname, 'public'))
const PORT = 1337;
const timeAgo = require('node-time-ago');


app.use(staticPublic);
app.use(morgan('dev'));
// app.use(err, req, res, next);
app.get("/", (req, res) => {

const posts = postBank.list();

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = postBank.find(id);
    if (!postBank.find(id)) {
      throw new Error('Not Found')
    }
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
       
        <div class='news-item'>
          <p>
            
            ${post.title}
            <small>(by ${post.name})</small>
            </p>
            <p>
            ${post.content}
            </p>
            <small class="news-info">
          ${post.date}
          </small>
          </div>
          
          </div>
          </body>
          </html>

  `
    );
  });
  
  const html = `<!DOCTYPE html>
  <html>
  <head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
  <div class="news-list">
  <header><img src="/logo.png"/>Wizard News</header>
  ${posts.map(post => `
  <div class='news-item'>
  <p>
  <span class="news-position">${post.id}. ▲</span>
  ${post.title}
  <a href="/posts/${post.id}">${post.title}</a>
    <small>(by ${post.name})</small>
    </p>
          <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
    </body>
    </html>`
    
    res.send(html);
});

// app.use(timeAgo(Date.now() + 65 * 1000))

app.use(express.static(path.join(__dirname,'public')))

app.use((err, req, res, next) => {
  console.error(Error)
  // res.send('Not Found!')
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});


