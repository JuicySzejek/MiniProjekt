var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;

var path = require('path');
var bodyParser = require("body-parser")

let logged = false;

let users = [
    { id: 1, login: "AAA", pass: "PASS1", wiek: 10, uczen: "checked", plec: "m" },
    { id: 2, login: "BBB", pass: "PASS2", wiek: 11, uczen: "checked", plec: "k" },
    { id: 3, login: "CCC", pass: "PASS3", wiek: 12, uczen: "no", plec: "m" },
    { id: 4, login: "DDD", pass: "PASS4", wiek: 13, uczen: "checked", plec: "k" },
    { id: 5, login: "EEE", pass: "PASS5", wiek: 14, uczen: "no", plec: "m" },
]

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    const index = path.join(__dirname + "/static/main.html");
    res.sendFile(index);
})

app.get('/register', function (req, res) {
    const index = path.join(__dirname + "/static/register.html");
    res.sendFile(index);
})

app.get('/login', function (req, res) {
    const index = path.join(__dirname + "/static/login.html");
    res.sendFile(index);
})

app.get('/admin', function (req, res) {
    let index = "";
    if (logged == true) {
        index = path.join(__dirname + "/static/admin.html");
    }
    else {
        index = path.join(__dirname + "/static/fail.html");
    }
    res.sendFile(index);
})

app.get('/logout', function (req, res) {
    logged = false;
    res.redirect("/");
})

app.get('/admin.css', function (req, res) {
    res.sendFile(__dirname + "/" + "admin.css");
});

app.get('/show', function (req, res) {
    if (logged == true) {
        users = (users.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        }));
        let head = "<head><style>*{box-sizing: border-box; margin: 0; padding: 0; color: whitesmoke; font-size: 30px; font-family: 'Lucida Console', Monaco, monospace;}a{margin-left: 20px; position: relative; top: 20px}body{background-color: darkslategrey;}table {border-collapse: collapse;width: 75vw; border: 1px solid goldenrod;}td, th {border: 1px solid goldenrod;text-align: left;padding: 8px;}</style></head>"
        let nav = "<body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><a href='/admin'>admin</a><br/><br/>";
        let tabela = "<table style='margin-left: 20px'>";
        for (i = 0; i < users.length; i++) {
            let id = "<td>id: " + users[i].id + "</td>";
            let user = "<td>user: " + users[i].login + " - " + users[i].pass + "</td>";
            let uczen = "";
            if (users[i].uczen == "no") {
                uczen = "<td>uczeń: <input type='checkbox' disabled='disabled'></td>";
            }
            else {
                uczen = "<td>uczeń: <input type='checkbox' disabled='disabled' checked='checked'></td>";
            }
            let wiek = "<td>wiek: " + users[i].wiek + "</td>";
            let plec = "<td>płeć: " + users[i].plec + "</td>";
            tabela += "<tr>" + id + user + uczen + wiek + plec + "</tr>";
        }
        let total = head + nav + tabela + "</table></body>";
        res.send(total);
    } else {
        res.sendFile(path.join(__dirname + "/static/fail.html"));
    }
})

app.get('/sort', function (req, res) {
    if (logged == true) {
        let tab = users;
        if (req.query.sortowanie == 0) {
            tab = (tab.sort(function (a, b) {
                return parseFloat(b.wiek) - parseFloat(a.wiek);
            }));
        } else {
            tab = (tab.sort(function (a, b) {
                return parseFloat(a.wiek) - parseFloat(b.wiek);
            }));
        }
        let head = "<head><style>*{box-sizing: border-box; margin: 0; padding: 0; color: whitesmoke; font-size: 30px; font-family: 'Lucida Console', Monaco, monospace;}a{margin-left: 20px; position: relative; top: 20px}body{background-color: darkslategrey;}table {border-collapse: collapse;width: 75vw; border: 1px solid goldenrod;}td, th {border: 1px solid goldenrod;text-align: left;padding: 8px;}</style></head>"
        let nav = "<body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><a href='/admin'>admin</a><br/><br/>";
        let sortowanie = '<form action ="/sort" onchange="this.submit()" style="margin-left: 20px;"><input type="radio" name="sortowanie" value = "1">rosnaco<input type="radio" name="sortowanie" value = "0" style="margin-left: 20px">malejaco</form>'
        let tabela = "<table style='margin-left: 20px'>";
        for (i = 0; i < tab.length; i++) {
            let id = "<td>id: " + tab[i].id + "</td>";
            let user = "<td>user: " + tab[i].login + " - " + tab[i].pass + "</td>";
            let uczen = "";
            if (tab[i].uczen == "no") {
                uczen = "<td>uczeń: <input type='checkbox' disabled='disabled'></td>";
            }
            else {
                uczen = "<td>uczeń: <input type='checkbox' disabled='disabled' checked='checked'></td>";
            }
            let wiek = "<td>wiek: " + tab[i].wiek + "</td>";
            let plec = "<td>płeć: " + tab[i].plec + "</td>";
            tabela += "<tr>" + id + user + uczen + wiek + plec + "</tr>";
        }
        let total = head + nav + sortowanie + tabela + "</table></body>";
        res.send(total);
    } else {
        res.sendFile(path.join(__dirname + "/static/fail.html"));
    }
})

app.get('/gender', function (req, res) {
    if (logged == true) {
        users = (users.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        }));
        let head = "<head><style>*{box-sizing: border-box; margin: 0; padding: 0; color: whitesmoke; font-size: 30px; font-family: 'Lucida Console', Monaco, monospace;}a{margin-left: 20px; position: relative; top: 20px}body{background-color: darkslategrey;}table {border-collapse: collapse;width: 75vw; border: 1px solid goldenrod;}td, th {border: 1px solid goldenrod;text-align: left;padding: 8px;}</style></head>"
        let nav = "<body><a href='/sort'>sort</a><a href='/gender'>gender</a><a href='/show'>show</a><a href='/admin'>admin</a><br/><br/>";
        let tabelaKobiet = "<table style='margin-left: 20px'>";
        let tabelaMezczyzn = tabelaKobiet;
        for (i = 0; i < users.length; i++) {
            if (users[i].plec == "k" || users[i].plec == "K") {
                let id = "<td>id: " + users[i].id + "</td>";
                let plec = "<td>płeć: " + users[i].plec + "</td>";
                tabelaKobiet += "<tr>" + id + plec + "</tr>";
            } else {
                let id = "<td>id: " + users[i].id + "</td>";
                let plec = "<td>płeć: " + users[i].plec + "</td>";
                tabelaMezczyzn += "<tr>" + id + plec + "</tr>";
            }
        }
        let total = head + nav + tabelaKobiet + "</table><br/>" + tabelaMezczyzn + "</table></body>";
        res.send(total);
    } else {
        res.sendFile(path.join(__dirname + "/static/fail.html"));
    }
})

app.post("/registerForm", function (req, res) {
    let control = 0;
    if (req.body.login == undefined) {
        res.send("Podaj login jeszcze raz");
    } else {
        for (i = 0; i < users.length; i++) {
            if (users[i].login == req.body.login) {
                res.send("Podaj nowy login - taki login jest już w bazie");
                control = 1;
            }
        }
        if (control == 0) {
            users[users.length] = req.body;
            users[users.length - 1].id = users.length;
            users[users.length - 1].wiek = parseInt(users[users.length - 1].wiek);
            if (users[users.length - 1].uczen[1] == "checked") {
                users[users.length - 1].uczen.splice(0, 1);
                users[users.length - 1].uczen = users[users.length - 1].uczen.join();
            }
            console.log(users);
            res.send("Witaj " + req.body.login + ". Zostałeś zarejestrowany. Możesz teraz się zalogować");
        }
    }
    console.log(users);
})

app.post("/loginForm", function (req, res) {
    for (i = 0; i < users.length; i++) {
        if (users[i].login == req.body.login) {
            if (users[i].pass == req.body.pass) {
                logged = true;
                res.redirect("/admin")
            } else {
                res.send("Złe hasło. Spróbuj ponownie")
            }
        }
    }
    res.send("Zły login. Spróbuj ponownie")
})

//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})