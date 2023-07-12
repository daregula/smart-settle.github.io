import { ResponseModel } from "../models/Responses.js";
import  express  from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";

// Create an Express router
const router = express.Router();

// GET endpoint to fetch all responses
// router.get("/", async (req, res) => {
//     try {
//         const response = await ResponseModel.find({});
//         res.json(response)
//     } catch (err) {
//         res.json(err); 
//     }
// })

// POST endpoint to create a new response
// router.post("/", async (req, res) => {
//     console.log(req.body)
    
//     try {
        
//         res.json(response)
//     } catch (err) {
//         res.json(err); 
//     }
// })

// PUT endpoint to update a response and associate it with a user
router.post("/", async (req, res) => {
    const newResponse = req.body

    console.log(req.body)
    try {
        const responses = new ResponseModel(newResponse);
        await responses.save()

        const user = await UserModel.findById(req.body.userOwner)
        user.savedResponses.push(req.body.responseID)
        await user.save()
        // using put we dont need the res
        res.json({savedResponses: user.savedResponses})
    } catch (err) {
        console.log(err); 
    }
})

// GET endpoint to fetch saved responses for a specific user (handles showing "My previous searches" page)
router.get("/savedResponses/ids/:userOwner", async (req, res) => {
    try {
        const userOwner = req.params.userOwner;
        const userResponses = await ResponseModel.find({
            userOwner,
        });
        res.json(userResponses)
    } catch (err) {
        res.json(err);
    }
})

// Export the router
export { router as responseRouter }


