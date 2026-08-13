"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(cors());

app.use(express.json());


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {

    res.json({

        success: true,

        app: "Moron AI",

        status: "online",

        message: "Moron backend is alive 😂"

    });

});


/* =========================================================
   CHAT ENDPOINT
========================================================= */

app.post("/api/chat", async (req, res) => {

    try {

        const {
            message,
            conversation
        } = req.body;


        /* =========================================
           VALIDATION
        ========================================= */

        if (
            !message ||
            typeof message !== "string"
        ) {

            return res.status(400).json({

                success: false,

                error: "Message is required."

            });

        }


        console.log(
            "User:",
            message
        );


        /* =========================================
           TEMPORARY MORON RESPONSE
           
           We are NOT connecting the real AI yet.
        ========================================= */

        const response = createTestResponse(
            message
        );


        res.json({

            success: true,

            message: response.message,

            reaction: response.reaction

        });

    }

    catch (error) {

        console.error(
            "Chat error:",
            error
        );


        res.status(500).json({

            success: false,

            error: "Something went wrong."

        });

    }

});


/* =========================================================
   TEMPORARY MORON BRAIN
========================================================= */

function createTestResponse(message) {

    const text =
        message.toLowerCase();


    /* =========================================
       TEASING
    ========================================= */

    if (
        text.includes("stupid") ||
        text.includes("idiot") ||
        text.includes("moron") ||
        text.includes("dumb")
    ) {

        return {

            message:
                "EXCUSE ME?! 😭 You really came here just to insult me?",

            reaction:
                "crying"

        };

    }


    /* =========================================
       LAUGHING
    ========================================= */

    if (
        text.includes("lol") ||
        text.includes("haha") ||
        text.includes("😂")
    ) {

        return {

            message:
                "😂 Look at you laughing at me. I'm hilarious and you know it.",

            reaction:
                "laughing"

        };

    }


    /* =========================================
       STRESS
    ========================================= */

    if (
        text.includes("stressed") ||
        text.includes("overwhelmed")
    ) {

        return {

            message:
                "Hey. Forget the jokes for a second. Take a breath. ❤️",

            reaction:
                "supportive"

        };

    }


    /* =========================================
       DEFAULT
    ========================================= */

    return {

        message:
            "I received your message. My real AI brain is coming soon. 😂",

        reaction:
            "none"

    };

}


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            `Moron backend running on port ${PORT}`
        );
    }
);