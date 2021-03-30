module.exports = {
    "development": {
        "entries": {
            "index": "./src/entries/index",
            "login": "./src/entries/login",
        },
        "htmlWebpackPlugin": {
            "index": {
                "template": "dev.html",
            },
            "login":{
                "template": "dev.html",
            }

        }
    },
    "production": {
        "entries": {
            "index": "./src/entries/index",
            "login": "./src/entries/login",
        },
        "htmlWebpackPlugin": {
            "index": {
                "template": "dist.html",
            },
            "login":{
                "template": "dist.html",
            }

        }
    },
    "MVCHtmlWebpackPlugin": {
        "index": {
            "template": "index.cshtml",
            "title" : "index page",
            "filename" : "Home/Index.cshtml"
        },
        // "login": {
        //     "template": "login.cshtml",
        //     "title" : "login page",
        //     "filename" : "Home/Login.chtml"
        // },
    }
}