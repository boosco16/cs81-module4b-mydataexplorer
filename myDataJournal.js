// My guesses before I run any code:
// 1. I think Friday will have the most screen time because that's when I relax after work.
// 2. I think Saturday will be my best focus day because I get more sleep on weekends.
// 3. I think more caffeine will help me focus better since I only drink it when I'm tired. 

let weekData = [
  { day: "Monday", sleepHours: 8, screenTime: 5, mood: "energized", caffeineIntake: 1, focusLevel: 7 },
  { day: "Tuesday", sleepHours: 8, screenTime: 6, mood: "tired", caffeineIntake: 2, focusLevel: 5 },
  { day: "Wednesday", sleepHours: 6, screenTime: 8, mood: "stressed", caffeineIntake: 3, focusLevel: 4 },
  { day: "Thursday", sleepHours: 7.5, screenTime: 4, mood: "productive", caffeineIntake: 1, focusLevel: 9 },
  { day: "Friday", sleepHours: 6.5, screenTime: 7, mood: "distracted", caffeineIntake: 2, focusLevel: 5 },
  { day: "Saturday", sleepHours: 8, screenTime: 3, mood: "relaxed", caffeineIntake: 0, focusLevel: 8 },
  { day: "Sunday", sleepHours: 7, screenTime: 4, mood: "productive", caffeineIntake: 1, focusLevel: 8 }
];

let journalAnalyzer = {
  data: weekData,
  
  findHighestScreenTime() {
    let maxDay = this.data[0];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].screenTime > maxDay.screenTime) {
        maxDay = this.data[i];
      }
    }
    return maxDay.day + " (" + maxDay.screenTime + " hrs)";
  },
  averageSleep() {
    let total = 0;
    for (let i = 0; i < this.data.length; i++) {
      total = total + this.data[i].sleepHours;
    }
    let avg = total / this.data.length;
    return avg.toFixed(1);
  },

  mostFrequentMood() {
    let moodCounts = {};
    for (let i = 0; i < this.data.length; i++) {
      let mood = this.data[i].mood;
      if (moodCounts[mood] == undefined) {
        moodCounts[mood] = 1;
      } else {
        moodCounts[mood] = moodCounts[mood] + 1;
      }
    }

    let topMood = "";
    let topCount = 0;
    for (let mood in moodCounts) {
      if (moodCounts[mood] > topCount) {
        topMood = mood;
        topCount = moodCounts[mood];
      }
    }
    return topMood;
  },

  correlateCaffeineToFocus() {
    let highCaffeineTotal = 0;
    let highCaffeineDays = 0;
    let lowCaffeineTotal = 0;
    let lowCaffeineDays = 0;

    for (let i = 0; i < this.data.length; i++) {
      let entry = this.data[i];
      if (entry.caffeineIntake >= 2) {
        highCaffeineTotal = highCaffeineTotal + entry.focusLevel;
        highCaffeineDays = highCaffeineDays + 1;
      } else {
        lowCaffeineTotal = lowCaffeineTotal + entry.focusLevel;
        lowCaffeineDays = lowCaffeineDays + 1;
      }
    }

    let highAvg = highCaffeineTotal / highCaffeineDays;
    let lowAvg = lowCaffeineTotal / lowCaffeineDays;

    if (highAvg > lowAvg) {
      return "Yes!";
    } else {
      return "Nope!";
    }
  }
};

console.log("Analyzing my Data Journal...");
console.log(" ");
console.log("Most screen time: " + journalAnalyzer.findHighestScreenTime());
console.log("Average sleep: " + journalAnalyzer.averageSleep() + " hrs");
console.log("Most frequent mood: " + journalAnalyzer.mostFrequentMood());
console.log("Does more caffeine mean better focus? -> " + journalAnalyzer.correlateCaffeineToFocus());

// Test case
weekData.push({ day: "Extra Day", sleepHours: 9, screenTime: 1, mood: "productive", caffeineIntake: 0, focusLevel: 10 });
console.log(" ");
console.log("After adding an extra day:");
console.log("New average sleep: " + journalAnalyzer.averageSleep() + " hrs");
