#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';

// ----- MASTER DATA ----- //
let master_choices = [
  "Traditional birthday wish 🌺",
  "Sing happy birthday song 🫠",
  "Recite birthday poem 🎙",
  "Custom request - Ask me anything 🃏",
];

let master_questions = [
  "Tell me a memory of a place you love 🏞",
  "Tell me a guilty pleasure of yours 🌒",
  "If you have one hour left to live, what will you do? ⏳",
];

// ----- FUNCTION DEFINITIONS ----- //
// Helper delay function that takes ms input (default is 2000)
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// Shows a welcome screen to user
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "😤😤😤 🎉 Happy Birthday Oanh 🎉 😤😤😤"
  );

  await sleep(3000);
  rainbowTitle.stop();

  // Use template string for multiline logs
  // prettier-ignore
  console.log(`
  Hello, this is ${chalk.bgBlueBright("Trang")}, your unfriendly local programmer 🦥
  ${chalk.magentaBright('This project has been fun, hope you like it 🐶')}
  `);
}

// Ask for user activity
async function askActivity() {
  const answers = await inquirer.prompt({
    name: "birthday_choice",
    type: "list",
    message: "Please select an option:",
    choices: master_choices,
  });

  console.log(`${chalk.green("Your request has been recorded 🆗")}`);
  findAndRemove(answers.birthday_choice, true);
}

// Process the request (show spinner)
async function processRequest(waitMsg, successMsg) {
  waitMsg = waitMsg ? waitMsg : "Please wait... 🤔";
  successMsg = successMsg
    ? successMsg
    : "Request processed, fetching real person...\n";

  const spinner = createSpinner(waitMsg).start();
  await sleep();

  // Loader is finished
  spinner.success({ text: successMsg });
  console.log("------------------------------------------------------------\n");
}

// Does user want to replay?
async function askContinue() {
  const answers = await inquirer.prompt({
    name: "continue_choice",
    type: "confirm",
    message: "Submit another request (for a price)?",
  });

  return answers.continue_choice;
}

// Ask for information from user
async function askQuestion() {
  const answers = await inquirer.prompt({
    name: "question_choice",
    type: "list",
    message: "Please answer a question:",
    choices: master_questions,
  });

  await processRequest("Interesting... 🧭", "Alright, let's hear it!\n");

  await inquirer.prompt({
    name: "question_answered",
    type: "input",
    message: "Have you finished answering?",
    default() {
      return "Yes";
    },
  });

  console.log(`${chalk.green("Thank you for your input 🤗")}`);
  findAndRemove(answers.question_choice, false);
}

// Remove an already executed choice from master list
function findAndRemove(selected, isChoiceList) {
  if (isChoiceList) {
    if (master_choices.length) {
      master_choices = master_choices.filter((choice) => choice != selected);
    }
  } else {
    if (master_questions.length) {
      master_questions = master_questions.filter(
        (question) => question != selected
      );
    }
  }
}

// End game screen
function goodbye() {
  const msg = "Happy Birthday!";

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));

    // prettier-ignore
    let dog = ([
      "",
      "   .-------------.       .    .   *       *   ",
      "  \/_\/_\/_\/_\/_\/_\/_\/ \\         *       .   )    .",
      " \/\/_\/_\/_\/_\/_\/_\/\/ _ \\ __          .        .   ",
      "\/_\/_\/_\/_\/_\/_\/_\/|\/ \\.\' .`-o                    ",
      " |             ||-\'(\/ ,--\'                    ",
      " |             ||  _ |        ",
      " |             ||\'\' ||   ",
      " |_____________|| |_|L      ",
      "",
      "© 2022 birthday-cli LLC. No rights reserved 🍰",
    ].join('\n'));
    console.log(dog);
  });
}

// ----- MAIN PROGRAM ----- //
await welcome();

while (1) {
  await askActivity();
  await processRequest();

  if (master_choices.length > 0) {
    const isContinue = await askContinue();
    if (isContinue) {
      await askQuestion();
    } else {
      console.log(`${chalk.yellow("Understood, have a great day! 👋")}`);
      break;
    }
  } else {
    console.log(`${chalk.yellow("It seems we ran out of options 🙃")}`);
    break;
  }
}

// End of game
goodbye();
