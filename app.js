// IMPORT DEPENDENCIES
const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
app.use( bodyParser.json() );

// veri tabanı bağlantısı
const DB_PATH = "database.db";

//get all movie
app.get( "/movies", (req, res)=>{ // get işlemi yapıldığı için .get kullanıldı
    const db = new sqlite3.Database( DB_PATH, (err)=>{ //veritabanı bağlantısı sağlandı.
        if (err){ return console.log(err); } // eğer bağlantı başarısız değilse 
        db.all(`SELECT * FROM Movies`, (err, results)=>{ // Movies tablosundaki tüm verileri getir

            res.status(200).json({ // response'u 200 dönen verileri json'a dönüştür.
                "movies": results
            });
            db.close(); // veritabanını kapat

        });

    });
});


// get movie by id
app.get( "/movies/:id", (req, res)=>{ 
    // localhost:5000/movies/3  --> id 3 olan filmi gösterir. 
    const db = new sqlite3.Database( DB_PATH, (err)=>{ // veri tabanı bağlantısı
        if (err){ return console.log(err); } // başarılı ise
        db.get(`SELECT * FROM Movies where id = ?`,req.params.id, (err, results)=>{
            // url ile verilen id, veritabanındaki ile eşleşeni getir.
            res.status(200).json({ // response 200 dönenleri listele
                "movies": results
            });
            db.close(); // veri tabanını kapat

        });

    });
});


//delete movie by id
app.delete("/movies/delete/:id", (req, res)=>{ //Silinecek filmin id'sini gir
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if (err){ return console.log(err); }
        db.all(`DELETE FROM Movies where id = ?`,req.params.id, (err, results)=>{
            // id'si eşleşen film veri tabanından silinecektir.
             res.status(200).json({ // işlem başarılı ise msg göster
                 "message":"deleted", changes: this.changes
             });
            db.close(); //veri tabanını kapat

        });

    });
});


// add movie
app.post( "/add_movie", (req, res)=>{
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if ( err ){ return console.log(err); }
        db.run(`
        INSERT INTO movies (title, rating) VALUES (?, ?)
        `,[req.body.title, req.body.rating], (err)=>{
            // request olarak gönderilen title ve rating değerlerini
            // Movies veri tabanına kayıt etmesini sağlayan sql kodu
            if (err) { 
                db.close(); 
                return console.log(err); // eğer hatalı ise hatayı yazdır.
            }
            res.status(200).json({ // eğer başarılı olursa msg'yi göster.
                // ardından eklenen filmi göster
                msg: "Entry succesfully inserted to the DB",
                body: req.body
            });
        })

    });
});


app.put( "/movie/update", (req, res)=>{ // update için put kullanıldı
    const db = new sqlite3.Database( DB_PATH, (err)=>{
        if ( err ){ return console.log(err); }
        db.run(`UPDATE movies SET title = ?, rating = ? where id = ?`,[req.body.title, req.body.rating, req.body.id], (err)=>{
            // rating title ve id'i al
            // id'ler birbirine eşit ise güncelleme işlemi yap
            if (err) {  // bağlantı sağlanamazsa 
                db.close(); // veri tabanını kapat
                return console.log(err); // hata mesajı döndür
            }
            res.status(200).json({ // response 200 ise msg döndür ve
                // değiştirilen filmi döndür
                msg: "Entry succesfully inserted to the DB",
                body: req.body
            });
        })

    });
});

// START SERVER
app.listen( 5000 );