const express = require('express')
const app = express()
let users = []
let books = []
// database
// home route


let style = `
<style>
form{
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    width: max-content;
    background-color: #5b5b5b;
}
input, button{
    border-radius: 10px;
    height: 40px;
    width: 400px;
    font-size: larger;
}
label{
    font-size: larger;
    font-weight: bold;
    color:white;
}
#button:hover{
    background-color:rgb(186, 236, 236);
    cursor: pointer;
}
.nav{
    height: max-content;
    width: max-content;
    background-color: #5b5b5b;
    border-radius: 5px;
}
.list, .hlist{
    border-radius: 10px;
    height: 40px;
    width: 400px;
    font-size: larger;
    border: 1px solid #5b5b5b;
}
.hlist{
    color: white;
    background-color: darkcyan;
}
a{
    height: 100px;
    width: 80px;
    text-decoration: none;
    color: white;
}
.nav:hover{
    cursor: pointer;
    background-color: rgb(179, 179, 179);
    color: #5b5b5b;
}
</style>
`;

let favPage = function(data){
    if(!empty(data)){
        return `<!doctype>
                <html>
                    <head>
                    ${style}
                    </head>
                    <body>
                        <center>
                        <table>
                            <tr>
                                <td class="nav" id="home"><a href="/">Home</a></td>
                                <td class="nav" id="favourite"><a href="/favourite">Favourite Book</a></td>
                            </tr>
                        </table>
                            <p class="list">${data.book} is the most favoured book with ${data.count} readers</p>
                        </center>
                    </body>
                </html>`;
    }else{
        return `<!doctype>
                <html>
                    <head>
                    ${style}
                    </head>
                    <body>
                        <center>
                        <table>
                        <tr>
                            <td class="nav" id="home"><a href="/">Home</a></td>
                            <td class="nav" id="favourite"><a href="/favourite">Favourite Book</a></td>
                        </tr>
                    </table>
                    <p class="list">There are no books abailable yet.</p>
                        </center>
                    </body>
                </html>`;

    }
    
}
let listUser = function(data){
    if(!empty(data)){
        let list = "";
        for (let b of data) {
            list += `<tr>
                        <td class="list">${b.name}</td>
                        <td class="list">${b.book}</td>
                    </tr>`;
        }
        return list;
    }else{
        return `<p id="yes">There are no books available yet.</p>`
    }
}
let homePage = function(data){
    return `<!DOCTYPE html>
    <html>
        <head>
            <title></title>
            ${style}
        </head>
        <body>
            <center>
            <table>
                <tr>
                    <td class="nav" id="home"><a href="/">Home</a></td>
                    <td class="nav" id="favourite"><a href="/favourite">Favourite Book</a></td>
                </tr>
            </table>
                <form method="GET" action="/create">
                    <label>Name</label><br>
                    <input type="text" name="firstName"> <br>
                    <label>Book</label><br>
                    <input type="text" name="book"> <br>
                    <input type="submit" value="Insert" id="button">
                </form>
                <br>
                <table>
                    <tr>
                        <td class="hlist">Reader</td>
                        <td class="hlist">Book</td>
                    </tr>
                    ${listUser(data)}
                </table>                
            </center>
        </body>
    </html>`;
}

let empty = function(container){
    if(container.length === 0){
        return true;
    }else{
        return false;
    }
}

app.get('/', function(req, res){
    res.send(homePage(users))
})
// create and store a user
app.get('/create', function(req, res){
    let exist = false;
    let user = {
        name : req.query.firstName,
        book : req.query.book
    }
    let book = {
        count: 0,
        book: req.query.book  
        }
    if(!empty(books)){
        for (let b of books) {
            if (b.book === req.query.book) {
                exist = true
                console.log('Exist')
                b.count++
            }
        }
    }else{
        exist = true
        console.log('New')
        book.count++
        books.push(book)
    }
    if(!exist){
        console.log('New')
        book.count++
        books.push(book)
    }
    users.push(user)
    res.send(homePage(users))
})
// app.get('/favourite', function(req, res){
//     res.send(favPage(books))
// })
app.get('/favourite', function(req, res){
    if(!empty(books)){
        let favBook = undefined;
        let maxCount = 0;
        for (let b of books) {
            if (b.count > maxCount) {
                favBook = b
                maxCount = b.count
            }
        }
        res.send(favPage(favBook))
    }else{
        res.send(favPage(books))
    }
})

app.listen(8088)