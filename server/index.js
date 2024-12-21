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
        const browser = await puppeteer.launch({headless: false});
        console.log("here1")

        const page = await browser.newPage();

        await page.goto(`https://leetcode.com/${userid}`,{ waitUntil: 'networkidle2' });
        console.log("here2")
        console.log(page)

        await page.setViewport({width: 1080, height: 1024});
        
        const data = await page.evaluate(() => {
            const name = document.querySelector(
              '.text-label-1.dark\\:text-dark-label-1.break-all.text-base.font-semibold'
            )?.innerText;
        
            const rank = document.querySelector(
              '.flex-1.items-end.space-x-\\[5px\\].text-base span:nth-child(2)'
            )?.innerText;
        
            const location = document.querySelector(
              '.flex.items-start.space-x-\\[9px\\]:nth-child(2) .truncate'
            )?.innerText;
        
            const institution = document.querySelector(
              '.flex.items-start.space-x-\\[9px\\]:nth-child(3) .truncate'
            )?.innerText;
        
            const githubLink = document.querySelector(
              'a[href^="https://github.com"]'
            )?.href;
        
            const linkedinLink = document.querySelector(
              'a[href^="https://linkedin.com"]'
            )?.href;
        
            const skills = Array.from(
              document.querySelectorAll(
                '.text-label-2.dark\\:text-dark-label-2.bg-fill-3.dark\\:bg-dark-fill-3.rounded-\\[16px\\].px-2.py-0\\.5.text-xs'
              )
            ).map(skill => skill.innerText);

            const solvedProblems = document.querySelector('div span.text-[30px]').innerText; // 736
            const categories = Array.from(document.querySelectorAll('.flex-none.flex-col .text-xs.font-medium')).map((el) => ({
            category: el.innerText,
            stats: el.nextElementSibling.innerText
            }));
        
            return { name, rank, location, institution, githubLink, linkedinLink, skills, solvedProblems, categories };
          });


        setTimeout(function(){
            res.status(200).send({
                data: data
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
