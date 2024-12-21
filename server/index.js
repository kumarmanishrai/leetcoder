const express = require('express');
const cors = require('cors')
const axios = require('axios');
const puppeteer = require('puppeteer')


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cors({
    origin: ["https://leetcoder-umber.vercel.app", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],

}))
var total
var username
var imgurl
var arr = []
var c = 1;
var cntr1 = "easy"
var cntr2 = "medium"
var cntr3 = "hard"
var cntr4 = "submissions in the last year"

// let userid = "theravi_04"

// console.log(`userid: ${userid}`);

async function getUserDetails(req, res) {
    console.log(req.body)

    let userid = req.body.userid
    try {
        console.log("here")
        const browser = await puppeteer.launch();
        console.log("here1")

        const page = await browser.newPage();

        await page.goto(`https://leetcode.com/${userid}`);
        console.log("here1")
        console.log(page)

        await page.setViewport({width: 1080, height: 1024});
        console.log("here2")

        const textSelector = await page.locator('.text-label-1').waitHandle();
        console.log(textSelector)
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title.
        console.log('The title of this blog post is "%s".', fullTitle);

        // const handleTimeout = setTimeout(function(){
        //     res.status(404).send({
        //         msg: "user not found"
        //     })
        // },12000)

        setTimeout(function(){
            // clearTimeout(handleTimeout)
            res.status(200).send({
                // userid: userid,
                // username: username,
                // imgurl: imgurl,
                // total: total,
                // other: arr,
                data: textSelector
            })
        },8000)
        
        
    } catch (error) {
        res.status(404).send({
            msg: "could not found any user"
        })
    }


    
}

app.get('/check', (req, res)=> {
    res.send("listening on backend")
})
app.post('/getUser', getUserDetails)




app.listen(port, function () {
    console.log(`listening on ${port}`)
});
