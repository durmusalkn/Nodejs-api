# Get - Post - Put - Delete in Nodejs

This project about how to make get, post, put and delete in nodejs. In this project
- express
- body-parser
- sqlite3
are  used

Let's install requirements

## Installation

This project requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
npm install body-parser
npm install express
npm install sqlite3
```

## Development

After the requirements are installed; we need a database on sqlite. Created a database and created a table on the database.
```sh
CREATE DATABASE database;
```
```sh
CREATE TABLE Movies(
    id int NOT NULL PRIMARY KEY,
    title varchar(255) NOT NULL,
    rating int NOT NULL
);
```
buraya veri tabani tesmi eklenecek

After the database is created, we can see the empty version of the project by typing *node app.js* in the terminal. This project is running on port 5000

This project is about movies. We can add, delete, get or post a movie.

### Get
To fetch all the movies, it is necessary to go to the "/movies" link. Thanks to the code below, all movies are pulled from the database and listed in json format. Comment lines explain which code does which operation.
```javascript
// connection database
const DB_PATH = "database.db";

//get all movie
app.get( "/movies", (req, res)=>{ 
    const db = new sqlite3.Database( DB_PATH, (err)=>{ 
        if (err){ return console.log(err); } 
        db.all(`SELECT * FROM Movies`, (err, results)=>{ 

            res.status(200).json({ 
                "movies": results
            });
            db.close();
        });
    });
});
```

Buraya da resim eklenecek

##### List Movie by ID
```javascript
// get movie by id
app.get( "/movies/:id", (req, res)=>{
    // localhost:5000/movies/3 
    const db = new sqlite3.Database( DB_PATH, (err)=>{ 
        if (err){ return console.log(err); }
        db.get(`SELECT * FROM Movies where id = ?`,req.params.id, (err, results)=>{
            res.status(200).json({ 
                "movies": results
            });
            db.close();
        });
    });
});
```

Buraya da resim konulacak]

### Post
```javascript
// add movie
app.post( "/add_movie", (req, res)=>{
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if ( err ){ return console.log(err); }
        db.run(`
        INSERT INTO movies (title, rating) VALUES (?, ?)
        `,[req.body.title, req.body.rating], (err)=>{
            if (err) {
                db.close();
                return console.log(err); 
            }
            res.status(200).json({ 
                msg: "Entry succesfully inserted to the DB",
                body: req.body
            });
        })
    });
});
```

buraya da resim konulacak


### Put
```javascript
app.put( "/movie/update", (req, res)=>{    
const db = new sqlite3.Database( DB_PATH, (err)=>{
        if ( err ){ return console.log(err); }
        db.run(`UPDATE movies SET title = ?, rating = ? where id = ?`,[req.body.title, req.body.rating, req.body.id], (err)=>{
           
            if (err) { 
                db.close();
                return console.log(err); 
            }
            res.status(200).json({
                msg: "Entry succesfully inserted to the DB",
                body: req.body
            });
        })
 
    });
});

```

reis son olayiu bilitin


```javascript
//delete movie by id
app.delete("/movies/delete/:id", (req, res)=>{
    // localhost:5000/movies/delete/2 --> Delete movie which number 2
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if (err){ return console.log(err); }
        db.all(`DELETE FROM Movies where id = ?`,req.params.id, (err, results)=>{
           
             res.status(200).json({ 
                 "message":"deleted", changes: this.changes
             });
            db.close();
 
        });
 
    });
});

```
resim ekle
