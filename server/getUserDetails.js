import puppeteer from 'puppeteer';
const axios = require('axios');
const browser = await puppeteer.launch();
const page = await browser.newPage();


const getUserDetails= (req, res) => {
    
    helper(req, res);
}

const helper = async(req, res) => {
    console.log(req.body)

    let userid = req.body.userid
    try {
        const htmlBody = await axios.get(`https://leetcode.com/u/${userid}/`)
        console.log(htmlBody);

        const handleTimeout = setTimeout(function(){
            res.status(404).send({
                msg: "user not found"
            })
        },12000)

        // setTimeout(function(){
        //     clearTimeout(handleTimeout)
        //     res.status(200).send({
        //         userid: userid,
        //         username: username,
        //         imgurl: imgurl,
        //         total: total,
        //         other: arr,
        //     })
        // },4000)
        
    } catch (error) {
        res.status(404).send({
            msg: "could not found any user"
        })
    }


    
}


module.exports = {getUserDetails}