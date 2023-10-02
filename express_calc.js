const express = require("express");

const app = express();

app.use(express.json());


app.get("/mean", (req, res) => {
    let nums;
    try {
        nums = req.query.nums.split(",");
    }
    catch(e) {
        console.error(e);
        return res.status(400).send("numbers are required");
    }
    if (nums[0] === ""){
        return res.status(400).send("numbers are required");
    }
    let total = 0;
    for (let num of nums){
        if (isNaN(parseInt(num))){
            return res.status(400).send(`${num} is not a number`);
        }
        total += parseInt(num);
    }
    return res.json({operation: "mean", value: total/nums.length});
});

app.get("/median", (req, res) => {
    let nums;
    try {
        nums = req.query.nums.split(",");
    }
    catch(e) {
        console.error(e);
        return res.status(400).send("numbers are required");
    }
    if (nums[0] === ""){
        return res.status(400).send("numbers are required");
    }
    for (let num of nums){
        if (isNaN(parseInt(num))){
            return res.status(400).send(`${num} is not a number`);
        }
    }
    nums.sort();
    let median;
    if (nums.length % 2 === 1){
        median = nums[Math.floor(nums.length/2)];
    }
    else {
        median = (parseInt(nums[Math.floor(nums.length/2)]) + parseInt(nums[Math.floor(nums.length/2) - 1])) / 2;
    }
    return res.json({operation: "median", value: median});
});

app.get("/mode", (req, res) => {
    let nums;
    try {
        nums = req.query.nums.split(",");
    }
    catch(e) {
        console.error(e);
        return res.status(400).send("numbers are required");
    }
    if (nums[0] === ""){
        return res.status(400).send("numbers are required");
    }
    let num_count = {highest_val: -1, highest_num: -1};
    for (let num of nums){
        if (isNaN(parseInt(num))){
            return res.status(400).send(`${num} is not a number`);
        }
        if (num_count[num] === undefined){
            num_count[num] = 1;
        }
        else {
            num_count[num] += 1;
        }
        if (num_count[num] > num_count.highest_val){
            num_count.highest_val = num_count[num];
            num_count.highest_num = num;
        }
    }
    return res.json({operation: "mode", value: num_count.highest_num});
});




app.listen(3000, function () {
  console.log('App on port 3000');
})