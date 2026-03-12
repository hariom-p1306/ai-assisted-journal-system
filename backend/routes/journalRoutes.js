const express = require("express")
const router = express.Router()
const Journal = require("../models/Journal")
const analyzeJournal = require("../services/llmService");



router.post("/journal", async (req,res)=>{

 try{

  const {userId, ambience, text} = req.body

  const entry = new Journal({
   userId,
   ambience,
   text
  })

  await entry.save()

  res.json({
   message:"Journal saved successfully",
   entry
  })

 }catch(error){
  res.status(500).json({error:error.message})
 }

})


router.get("/journal/:userId", async (req,res)=>{

 try{

  const entries = await Journal.find({
   userId:req.params.userId
  }).sort({createdAt:-1})

  res.json(entries)

 }catch(error){
  res.status(500).json({error:error.message})
 }

})

router.post("/journal/analyze", async (req, res) => {

  try {

    const { text, userId } = req.body;

    const analysis = await analyzeJournal(text);

    const parsed = JSON.parse(analysis);

    const entry = new Journal({
      userId,
      text,
      emotion: parsed.emotion,
      keywords: parsed.keywords,
      summary: parsed.summary
    });

    await entry.save();

    res.json({
      message: "Journal analyzed and saved",
      entry
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

router.get("/journal/insights/:userId", async (req, res) => {
  try {

    const entries = await Journal.find({
      userId: req.params.userId
    });

    const totalEntries = entries.length;

    // Calculate top emotion
    const emotionCount = {};
    entries.forEach(entry => {
      if (entry.emotion) {
        emotionCount[entry.emotion] = (emotionCount[entry.emotion] || 0) + 1;
      }
    });

    const topEmotion = Object.keys(emotionCount).reduce((a, b) =>
      emotionCount[a] > emotionCount[b] ? a : b,
      null
    );

    // Calculate most used ambience
    const ambienceCount = {};
    entries.forEach(entry => {
      if (entry.ambience) {
        ambienceCount[entry.ambience] =
          (ambienceCount[entry.ambience] || 0) + 1;
      }
    });

    const mostUsedAmbience = Object.keys(ambienceCount).reduce((a, b) =>
      ambienceCount[a] > ambienceCount[b] ? a : b,
      null
    );

    // Get recent keywords
    const recentKeywords = [];

    entries.forEach(entry => {
      if (entry.keywords) {
        recentKeywords.push(...entry.keywords);
      }
    });

    const uniqueKeywords = [...new Set(recentKeywords)].slice(0, 5);

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords: uniqueKeywords
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;