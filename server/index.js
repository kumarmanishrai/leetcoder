const express = require('express');
const cors = require('cors')
const axios = require('axios');
const cheerio = require('cheerio');

const port = 4000;

const app = express();

app.use(express.json())
app.use(cors({
    origin: ["https://leetcoder-umber.vercel.app"],
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
    var total
    var arr = []
    var c = 1;
    var cntr1 = "easy"
    var cntr2 = "medium"
    var cntr3 = "submissionsCount"
    let userid = req.body.userid
    try {
        await axios.get(`https://leetcode.com/u/${userid}/`)
        .then(res => {
            const $ = cheerio.load(res.data)
            $('.space-y-2').each((index, element) => {
                ans = $(element).find('.text-base').text()
                if (ans.trim() !== '') {
                    let level = eval(`cntr${c++}`)
                    let ques = ans.trim()
                    arr.push({
                        level: level,
                        ques: ques,
                    });
                    if (arr.length == 4) {
                        arr.forEach(e => {
                            console.log(`${e.level} : ${e.ques}`);
                        })
                    }

                }

            })
            $('.space-x-4').each((index, element) => {
                ans = $(element).find('img').attr('src');
                if(typeof ans === 'string') {
                    imgurl = ans.trim()
                }
                
            })
            $('.absolute').each((index, element) => {
                ans = $(element).find('.font-medium').text()
                if (ans.trim() !== '') {
                    total = ans.trim()
                    console.log("Total: " + total);
                }
            })
            
            $('.items-center').each((index, element) => {
                ans = $(element).find('.font-semibold').text()
                if(ans.trim() !== '') {
                    username = ans.trim()
                    console.log(username);
                }
                
            })
        })

        const handleTimeout = setTimeout(function(){
            res.status(404).send({
                msg: "user not found"
            })
        },12000)

        setTimeout(function(){
            clearTimeout(handleTimeout)
            res.status(200).send({
                userid: userid,
                username: username,
                imgurl: imgurl,
                total: total,
                other: arr,
            })
        },4000)
        
    } catch (error) {
        res.status(404).send({
            msg: "could not found any user"
        })
    }


    
}

app.post('/getUser', getUserDetails)




app.listen(port, function () {
    console.log(`listening on ${port}`)
});
