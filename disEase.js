"use strict";

let currentScenario = 1;
let dataLength = 200;

let SHOWHEALTHY = false;
let SHOWDESC = true;

let drawCellBorder = false;
let drawChart = true;
let drawGraphics = true;

// States
const SUS = 0;
const DED = 2;
const IMM = 3;

// Evolution Multipliers
const EVO_INF = 1.1;
const EVO_REINF = 1.1;
const EVO_SPAR = 1.1;
const EVO_DEATH = 1.1;
const EVO_EVO = 1;
const EVO_REC = 0.5;

// Array Properties
let LEN = 70;
let DEGREE = 4;

// Cycle Properties
let CYCLE = 0;
let cycleLimit = 200;
let cycleDelay = 70; //miliseconds
let cancelCode;
let pauseState = 0;
let runState = 0;
let notFirstTime = false;

// Arrays
let MAIN;
	let SCND;
	let AllSUS;
let INFECTION_STATE;
let DEG;
	let rand1;
	let rand2;
let INFLVL;
// HeatMap
let timesInfected;
let maxHeat = 0;
let heatVision = false;

let sceneTitle = "";
let sceneDescription = "";

// Infections
let INFECTION_0 = {ID: 0, VALUE: 1.0, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#fa1e4e", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#800F28", RECOVERY_CHANCE: 0, POWER: 1};
let INFECTION_1 = {ID: 1, VALUE: 1.1, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#38FF88", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#1C8044", RECOVERY_CHANCE: 0, POWER: 2};
let INFECTION_2 = {ID: 2, VALUE: 1.2, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#FFFC45", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#807E22", RECOVERY_CHANCE: 0, POWER: 3};
let INFECTION_3 = {ID: 3, VALUE: 1.3, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#FFA3FC", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#80527E", RECOVERY_CHANCE: 0, POWER: 4};

// Infectious Immunities
let IMMUNITY_0 = {ID: 0, VALUE: 3, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#8CF4FF", ENABLED: false, dps: [], immunityCHANCE: 0.005}

let INFECTION = [INFECTION_0, INFECTION_1, INFECTION_2, INFECTION_3];
let IMMUNITY = [IMMUNITY_0];

const PAUSED = 1;
const UNPAUSED = 0;
const RUNNING = 1;

// COLORS
const COLOR_DEAD = "grey";
const COLOR_IMMUNE = "#B3E5FC";
const COLOR_SUSCEPTIBLE = "#0d0d0d";
// Degrees
const COLOR_SUSCEPTIBLE_5 = "1a1a1a";
const COLOR_SUSCEPTIBLE_6 = "262626";
const COLOR_SUSCEPTIBLE_7 = "333333";
const COLOR_SUSCEPTIBLE_8 = "404040";


// Chart Declaration
let mainChart; 
let chart;
let averageInfected = 0;
// Chart Datasets
let infdps = [];
let immdps = [];
let deddps = [];
let susdps = [];
let avginfdps = [];
let dedprdps = [];
let deadThisRound = 0;

let cycleFunction = function(){};

// Scenarios
let SCENES = [ 
	// 0
	// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE)
	function() {
		loadScenario(61, 0.3);
		setInfectionValues(0, 1, 0, true, 0, 0, 1, 0);
		setInfection(0, 0, INFECTION[0].VALUE);

		sceneTitle = "What is this all about?"
		sceneDescription = "disEase.js is a simple model, which tries to shed some light on how <i>infectious pieces of information</i> (such as physical diseases, mental diseases and rumors) "
		+ "spread throughout a group of individuals in a society."
		+ "<br>" + "<br>" + "The first set of buttons -right below this text- help you navigate through different scenarios. Each scenario has got it's own story to tell about the matter."
		+ "<br>" + "The second set of buttons -.GO, .RESET, .STEP and .HEAT control the model. '.GO' Runs the model, '.RESET' does whatever its name suggests, '.STEP' moves the model to its next step " 
		+ "and finally, '.HEAT' changes the view of the model and displays a heatmap of diseases instead (Which will be used later on)."
		+ "<br>" + "And to the left, is the model's CT (Cycle Time) in miliseconds. The lower it is, the faster the model runs. But remember, sometimes the model limits the CT, not the slider."
		+ "<br>" + "<br>" + "Under the buttons, lie the two charts. These two, display the model is their own fashions. The Graphical Table on the left, displays a live representation of the model, while the "
		+ "Statistical Table on the left, displays the model numbers over the time on a chart."
		+ "<br>" + "<br>" + "Go ahead and run the current model for a few times. Remember that all will be explained in the upcoming scenarios. So whenever you are ready, go to the next one."
	},
	// 1
	function () {
		loadScenario(31, 0);
		setInfectionValues(0, 1, 0, true, 0, 0, 1, 0);
		setInfection(15, 15, INFECTION[0].VALUE);
		setCycleTime(150);
		sceneTitle = "SIR Model."
		sceneDescription = "This is the simplest model possible. Each person is surrounded by four neighbours. (Except for those on the corners)"
		+ " Each round, the infected person will infect all their neighbours and then will die."
		+ "<br>" + "The closest example of this model in real life would be forest wildfires. Where everything burns down and fire is often spread in all directions until it reaches a river or something like that "
		+ "which halts the progress of infection."
		+ "<br>" + "To make the model more realistic, we're going to bring on the mathematics! Whenever ready, head on to the next scenario.";
	},
	// 2
	function() {
		loadScenario(21, 0);
		setInfectionValues(0, 0.5, 0, true, 0, 0.5, 0.5, 0);
		setInfection(10, 10, INFECTION[0].VALUE);
		setCycleTime(150);
		cycleFunction = function() {
			setDatatableNum(countDead());
			setDatatableText("Dead People");	
		}

		sceneTitle = "SIR Model. Now with Probability!"
		sceneDescription = "It's not commonplace for a disease -or even wildfire- to spread so flawlessly and kill/burn everyone who catches it."
		+ " In order to reach a more realistic model, we will use probabilities for many factors of any infectious entity."
		+ "<br>" + "1- The first factor would be <i>'Infection Chance'</i>. The chance which decides if a neighbour gets infected, given the fact that their neighbours are infected."
		+ "<br>" + "2- The second factor is <i>'Re-Infection Chance'</i>. Which decides that whether an infected person is going to be infected in the next round as well."
		+ "<br>" + "3- And finally, <i>'Death Chance'</i>. A roll of dice which decides the fate of the infected individual. <br>In this model, all three factors are set to 50%.";
	},
	// 3
	function() {
		loadScenario(31, 0.01);
		setInfectionValues(0, 0.75, 0, true, 0, 0.75, 0.1, 0);
		IMMUNITY[0].ENABLED = true;
		setInfection(Math.floor(Math.random() * LEN), Math.floor(Math.random() * LEN), INFECTION[0].VALUE);
		
		cycleFunction = function() {
			if(countDead() > 10) {
				fillWithInfection(0, 15, 30, 15, IMMUNITY[0].VALUE);
				fillWithInfection(15, 0, 15, 30, IMMUNITY[0].VALUE);
			}

			setDatatableNum(countDead());
			setDatatableText("Dead People");
		}

		sceneTitle = "Disease Immunity and The Importance of Quarantine."
		sceneDescription = "For the next phase, we're adding 'Immune' cells to the model as well. Immune people simply do not get sick."
		+ "<br>" + "Each time you click 'Reset' in this model, a random person will be infected for the model to work. "
		+ "And for each and every round, there will be a quarantine in place after 10 or more people are reported to be dead. "
		+ "Quarantines were and are used to contain infections from spreading. If you run the model for yourself, it's easy to spot the reason for their success."
		+ "<br>" + "<br>" + "And since this was a working method when it came to diseases, some parents thoughts that they could do the same for their children. Basically, they tried to "
		+ "raise their children in a quarantine area, where no harm or misinformation could come to them. From my own experience dealing with children of said childhoods, I can assure you "
		+ "that raising children in a quarantine area is extremely dangerous to them in the longterm. 'Why' you ask? Well, let us find out in the next scenario."
	},
	// 4
	function() {
		loadScenario(31, 0.02);
		setInfectionValues(0, 0.4, 0.2, true, 0, 0.6, 0, 0);
		IMMUNITY[0].ENABLED = true;
		fillWithInfection(10, 10, 20, 20, IMMUNITY[0].VALUE);
		fillWithInfection(12, 12, 18, 18, 0);
		sceneTitle = "How to Bypass Quarantines as a Virus?"
		sceneDescription = "But does the quarantine method work anymore? Is 'Isolating the Child' a working method? Is 'Extreme Censorship' going to work for the governments? "
		+ "<br>" + "I don't know the definite answer to that. However, from my point of view, the quarantine method doesn't work anymore. Why?"
		+ "<br>" + "Well, aside from 'the Internet happened' being an answer -which is too general- I'd like to introduce another factor in infectious diseases, "
		+ "which is called SPAR or [SP]ontaneous [A]ctivation [R]ate."
		+ "<br>" + "<br>" +"SPAR decides whether a random infection is going to spawn or not. You can think of it as 'A Global Infection Rate' or 'A diseses that's in the air. "
		+ "Which bypasses all quarantines and limitations. As long as the infection rate is high enough, SPAR will guarantee that everyone will hear about the news/infection."
		+ "<br>" + "<br>" + "In this model, you can see how the quarantine barriers try to hold the infection back, but fail miserably. Because sometimes, the disease comes from within.";
	},
	// 5
	function() {
		loadScenario(71, 0.01);
		setInfectionValues(0, 0.4, 30, true, 0, 0.3, 0, 0);
		setInfectionValues(2, 0.5, 0, true, 0, 0.5, 0, 0);
		setInfectionByRadius(50, 50, 3, INFECTION[0].VALUE);
		setInfectionByRadius(20, 50, 3, INFECTION[0].VALUE);
		setInfectionByRadius(50, 20, 3, INFECTION[0].VALUE);
		setInfectionByRadius(20, 20, 3, INFECTION[2].VALUE);

		cycleFunction = function() {
			setDatatableNum(Math.floor(countInfectedByValue(INFECTION[2].VALUE) * 100 / countInfected()) + "%");
			setDatatableText("Percentage of YELLOW");
		}

		sceneTitle = "Let them Fight!"
		sceneDescription = "Let's do a little bit of experimentation. Here we have got 2 different diseases."
		+ "<br>" + "The 'RED' disease has a high SPAR and a low Infection Chance. Meaning that the people quickly forget about it. On the other hand, the news outlets are talking way too much about it."
		+ "<br>" + "The 'YELLOW' disease, on the other hand, has got a low SPAR and a high Infection Chance. Meaning that it is rather important. Anyone who hears about it, will think about it. "
		+ "But for some reason, it's highly overlooked when it comes to news media outlets."
		+ "<br>" + "Run the model and see the results for yourself!"
		+ "<br>" + "<br>" + "As you can see, RED news will first overtake the community. "
		+ "But overtime and in the long term, it's the YELLOW disease that takes over. Which is good, right? A crucial peace of information finally gaining headlines and getting people to talk about it. "
		+ "Sounds too good to be true. However, in the reality we live in and with the current circumstances, we don't experience such scenarios. Why? Becuase the the SPAR and Infection Rate are everchanging."
		+ "<br>" + "In the next scenario, we shortly discuss the rates that affect the life cycle of a news.";
	},
	// 6
	function() {
		loadScenario(51, 0.02);
		setInfectionValues(0, 0.15, 0.5, true, 0, 0.15, 0, 0);

		setDatatableText("Infection Chance")
		cycleFunction = function() {
			if(CYCLE % 80 < 40) {
				INFECTION[0].INFECTION_CHANCE += 0.02;
				INFECTION[0].REINFECTION_CHANCE += 0.02;
				INFECTION[0].SPAR += 0.5;
			}else{
				INFECTION[0].INFECTION_CHANCE -= 0.02;
				INFECTION[0].REINFECTION_CHANCE -= 0.02;
				INFECTION[0].SPAR -= 0.5;
			}
			setDatatableNum(Math.floor(INFECTION[0].INFECTION_CHANCE * 100) + "%");
		}
		sceneTitle = "The Cycle of Life."
		sceneDescription = "Why would anyone care about the suicide victims of 2013? We're well past that. Why would we care about forest fires that happened two weeks ago? "
		+ "There are newer occurings that I could care about. "
		+ "<i>I've seen all the memes and consumed all the media about them. So please, give me something new to have feelings about. Miss me with that old stuff.</i>"
		+ "<br>" + "<br>" + "As the name suggests, 'News' is all about the 'New' occurings. Nobody gives a damn about old news. And with the Internet and its light-speed news, we get bored way too faster. "
		+ "No matter how short, each and every news has a life cycle. That's what we're trying to model right over here."
		+ "<br>" + "<br>" + "Basically, for each news there are 3 different phases (Some say it's 5 but let's go with the simpler version for now):"
		+ "<br>" + "1- When nobody knows about it and it's about to go mainstream."
		+ "<br>" + "2- When it's mainstream and almost everyone knows about it."
		+ "<br>" + "3- When the slowpokes and those living under the rocks find out about it."
		+ "<br>" + "As an example, let's take a look at a normal internet meme. Some person randomly starts something. Those around them will popularize it and then it goes mainstream."
		+ "After recieving the 'Mainstream' treatment, people will eventually get bored of it and move on to the next meme. Said meme will get the 'Facebook Treatment' and die in misery."
		+ "<br>" + "<br>" + "In order to model these three phases in a simple manner, we increase -and decrease- the infection values on a linear basis."
		+ " Each cycle, the infection rate is changed by 0.02 (depending on whether it's going up or down) and SPAR is changed by 0.1."
		+ "<br>" + "Press start and see the results for yourself."
	},
	// 7
	function() {
		loadScenario(71, 0);
		setInfectionValues(0, 0.7, 40, true, 0, 0.5, 0, 0);
		setInfectionValues(2, 0.8, 0.3, true, 0, 0.5, 0, 0);

		setInfectionByRadius(50, 50, 3, INFECTION[0].VALUE);
		setInfectionByRadius(20, 50, 3, INFECTION[0].VALUE);
		setInfectionByRadius(50, 20, 3, INFECTION[0].VALUE);
		setInfectionByRadius(20, 20, 3, INFECTION[2].VALUE);

		let totalInfected = 0;
		let totalYellow = 0;

		setDatatableText("YELLOW's Share of Infections")
		cycleFunction = function() {
			INFECTION[0].INFECTION_CHANCE -= 0.01;
			INFECTION[0].REINFECTION_CHANCE -= 0.01;

			INFECTION[2].INFECTION_CHANCE -= 0.01;
			INFECTION[2].REINFECTION_CHANCE -= 0.01;
			if(INFECTION[0].INFECTION_CHANCE < 0) {
				clearInterval(cancelCode);
				INFECTION[0].INFECTION_CHANCE = 0;
			}

			totalInfected += countInfected();
			totalYellow += countInfectedByValue(INFECTION[2].VALUE);

			setDatatableNum(Math.floor(totalYellow * 100 / totalInfected) + "%");

		}
		sceneTitle = "A more Realistic Look Into the Fight."
		sceneDescription = "<i>All the World's a Stage."
		+ "<br>" + "> William Shakespeare</i>"
		+ "<br>" + "<br>" + "Remember the model with RED and YELLOW disease? Where in the end, almost everyone was following the Important news? Good times. "
		+ "However, we are now going to face reality and give them a life cycle."
		+ " Since no matter how loud you shout something, people will eventually get bored of the same news and move on to the next one."
		+ "<br>" + "By increasing and decreasing the infection chances, we're creating a life cycle for each news."
		+ "<br>" + "<br>" + "As you can see for yourself, no matter the importance, in the end it's the news with more outlets and louder shouts that gains most of the engagements. "
		+ "Meaning that by having media by your side, you can determine what most people think -and therefore, act-."
		+ "Under such circumstances, the idea of 'Democracy' wouldn't mean much. Those with the money and power will control the media, and therefore the people's ideas and actions."
		+ "<br>" + "<br>" + "Watching people care about something important and suddenly leave it the other day just to care about something else tells me something irritating. "
		+ "People don't want to act accordingly and solve the problems, they just want to sympathize with other human beings. <i>I'm not feeling sad to motivate myself, I'm feeling sad "
		+ "to feel as a human being and feel better afterwards.</i>"
		+ "<br>" + "<br>" + "If our beliefs and biases are following those of the medias', then the concept of 'Individuality' and 'Freedom' is nothing but a joke to laugh at."
		+ " As intelligent human beings, we should not let media outlets -and generally speaking, outside memes (Even this webpage(!))- define 'Right' or 'Wrong' for us. Caring and sympathizing is"
		+ "a required part of human nature. But what use is it if it's not leading to actions?";
	},
	// 8
	function() {
		loadScenario(51, 0.01);
		// SIMPLE CHANGE OF INFECTION CHANCE

		// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE)
		setInfectionValues(0, 0.2, 2, true, 0, 0.2, 0, 0.00010);
		setInfectionValues(1, 0.2, 2, true, 0, 0.2, 0, 0.00005);
		setInfectionValues(2, 0.2, 2, true, 0, 0.2, 0, 0.00001);

		setDegreesByRandom(0.010, 5);
		setDegreesByRandom(0.008, 6);
		setDegreesByRandom(0.006, 7);
		setDegreesByRandom(0.004, 8);
		

		IMMUNITY[0].ENABLED = true;
		IMMUNITY[0].SPAR = 0.002;
		IMMUNITY[0].INFECTION_CHANCE = 0;

		setInfection(25, 25, SUS);

		let changeValue = 0.012;
		let bottomInfection = 0;
		let infectionCounter = 0;
		cycleFunction = function() {
			if(CYCLE % 150 < 75) {
				if(INFECTION[0].INFECTION_CHANCE > changeValue && INFECTION[0].INFECTION_CHANCE > (bottomInfection + changeValue)) {
					INFECTION[0].INFECTION_CHANCE -= changeValue;
					INFECTION[0].REINFECTION_CHANCE -= changeValue;
				}
			} else {
				INFECTION[0].INFECTION_CHANCE += changeValue;
				INFECTION[0].REINFECTION_CHANCE += changeValue;
			}
			if((CYCLE + 50) % 150 < 75) {
				if(INFECTION[1].INFECTION_CHANCE > changeValue && INFECTION[1].INFECTION_CHANCE > (bottomInfection + changeValue)) {
					INFECTION[1].INFECTION_CHANCE -= changeValue;
					INFECTION[1].REINFECTION_CHANCE -= changeValue;
				}
			} else {
				INFECTION[1].INFECTION_CHANCE += changeValue;
				INFECTION[1].REINFECTION_CHANCE += changeValue;
			}
			if((CYCLE + 100) % 150 < 75) {
				if(INFECTION[2].INFECTION_CHANCE > changeValue && INFECTION[2].INFECTION_CHANCE > (bottomInfection + changeValue)) {
					INFECTION[2].INFECTION_CHANCE -= changeValue;
					INFECTION[2].REINFECTION_CHANCE -= changeValue;
				}
			} else 	{
				INFECTION[2].INFECTION_CHANCE += changeValue;
				INFECTION[2].REINFECTION_CHANCE += changeValue;
			}

			if(isInfected(25, 25)) {
				infectionCounter++;
				setDatatableNum(Math.floor(infectionCounter * 100 / CYCLE) + "%");
				setDatatableText("Percentage of the time that the middle person is sick.");

			}

		}
		sceneTitle = "What Lies Beyond the Surface."
		sceneDescription = "<i>In the future, everyone will be world-famous for 15 minutes."
		+ "<br>" + "> Andy Warhol, 1968.</i>"
		+ "<br>" + "<br>" + "The internet and its light-speed methods made it possible for news outlets to publish news stories without any delay."
		+ " More than ever, we are exposed to different news from all over the world."
		+ " And for whatever reason, whenever I check my news feed, it's filled to the brim with death, fraud, kidnapping and other types of 'Bad News'."
		+ " It's as if nobody cares about 'Good News' and we're all here to experience and talk about misery."
		+ "<br>" + "<br>" + "Bad news after bad news, it is as an infection of despair and hopelessness is taking over us all."
		+ "<br>" + "<br>" + "I wanted to model this overflow of news to fully understand how it affects us and how to deal with it. This is why I probably started it all: "
		+ "To understand 'How to deal with overwhelming rush of depressing news?'"
		+ "<br>" + "So in this scenario, different diseases -depressing news- grow and fall with a fixed frequency (depending on the cycle number). Just after one ends, another one comes around the corner."
		+ "<br>" + "<br>" + " As the code runs, you might want to look at the orange graph line, which indicates 'The Average Infected People Until Now'."
		+ "<br>" + "<br>" + "If you have let the code run long enough, you will see that more than 50% of people (nearly 60%) are always 'Sick' or 'Depressed' or 'Hopleless'."
		+ " Why, because they let themselves to be taken by these news waves every single time. How does one break out of this mundane everyday cycle? idk I haven't wrote that part yet."
	},
	// 9
	function() {
		loadScenario(51, 0.2);

		setInfectionValues(0, 0.5, 5.1, true, 0, 0.5, 0, 0);
		setInfectionValues(1, 0.7, 0.01, true, 0, 0.7, 0, 0);

		IMMUNITY[0].ENABLED = true;

		setInfectionByRadius(10, 10, 3, INFECTION[0].VALUE);
		setInfectionByRadius(40, 40, 2, INFECTION[1].VALUE);

		sceneTitle = "Shut It Down."
		sceneDescription = "This section is incomplete.";
	},
	// 10
	function() {
		loadScenario(101, 0);
		// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE)
		setInfectionValues(0, 0.3, 0, true, 0.002, 0.3, 0.1, 0.004);
		setInfectionByRadius(50, 50, 5, INFECTION[0].VALUE);
		setDegreesByRandom(0.010, 5);
		setDegreesByRandom(0.008, 6);
		setDegreesByRandom(0.006, 7);
		setDegreesByRandom(0.004, 8);
		
	},
	// 11
	function() {
		loadScenario(70, 0.01);
		// Which is more important? Infection Chance or Re-Infection Chance?
		setInfectionValues(0, 0.5, 1, true, 0, 0.5, 0, 0);

		let decider = 0;

		cycleFunction  = function() {
			if(CYCLE % 200 == 0) {
				decider++;	
				clearTableFromInfections();
			}

			if(decider > 6)
				decider = 0;

			switch(decider) {
				case 0:
					INFECTION[0].INFECTION_CHANCE = 0.2;
					INFECTION[0].REINFECTION_CHANCE = 0.8;
					break;
				case 1:
					INFECTION[0].INFECTION_CHANCE = 0.3;
					INFECTION[0].REINFECTION_CHANCE = 0.7;
					break;
				case 2:
					INFECTION[0].INFECTION_CHANCE = 0.4;
					INFECTION[0].REINFECTION_CHANCE = 0.6;
					break;
				case 3:
					INFECTION[0].INFECTION_CHANCE = 0.5;
					INFECTION[0].REINFECTION_CHANCE = 0.5;
					break;
				case 4:
					INFECTION[0].INFECTION_CHANCE = 0.6;
					INFECTION[0].REINFECTION_CHANCE = 0.4;
					break;
				case 5:
					INFECTION[0].INFECTION_CHANCE = 0.7;
					INFECTION[0].REINFECTION_CHANCE = 0.3;
					break;
				case 6:
					INFECTION[0].INFECTION_CHANCE = 0.8;
					INFECTION[0].REINFECTION_CHANCE = 0.2;
					break;
			}

			setDatatableNum(INFECTION[0].INFECTION_CHANCE + ", " + INFECTION[0].REINFECTION_CHANCE);
			setDatatableText("Infection + Reinfection Chance");
		}
		sceneTitle = "Consistency is Key.";
	},
	// 12
	function() {

		loadScenario(35, 0.01);
		setInfectionValues(0, 0.4, 10, true, 0, 0.2, 0.5, 0);
		// setInfectionValues(2, 1, 2, false, 0, 0.2, 1, 0);
		// cycleFunction = function() {
		// 	if(CYCLE == 24) {
		// 		INFECTION[2].ENABLED = true;
		// 		setInfectionByRadius(30, 30, 3, INFECTION[2].VALUE)
		// 		cycleFunction = function(){};
		// 	}
		// }
	},
	// 13
	function() {
		loadScenario(120, 0.04);

		setInfectionValues(0, 0.4, 1, true, 0, 0.2, 0.4, 0);
		// // setDegreeByRadius(25, 25, 15, 5);
		// // setDegreeByRadius(25, 25, 7, 6);
		// // setDegreeByRadius(25, 25, 3, 7);
		// // setDegreeByRadius(25, 25, 1, 8);

		// setInfectionValues(0, 0.5, 0, true, 0, 0.5, 0, 0);
		// setInfectionValues(1, 0.5, 0, true, 0, 0.5, 0, 0);
		// setInfectionValues(2, 0.5, 0, true, 0, 0.5, 0, 0);
		// setInfectionValues(3, 0.5, 0, true, 0, 0.5, 0, 0);
		
		// INFECTION[0].POWER = 1;
		// INFECTION[1].POWER = 1;
		// INFECTION[2].POWER = 1;
		// INFECTION[3].POWER = 1;


		// cycleFunction = function() {
		// 	let maxCycle = 1000
		// 	let mod = CYCLE % maxCycle;
		// 	if(mod < maxCycle / 4 && mod >= 0){
		// 		MAIN[50][50] = INFECTION[0].VALUE;
		// 		INFECTION[0].POWER = 1.1;
		// 		INFECTION[3].POWER = 1;
		// 	}
		// 	if(mod < maxCycle / 2 && mod >= maxCycle / 4){
		// 		MAIN[50][50] = INFECTION[1].VALUE;
		// 		INFECTION[1].POWER = 1.1;
		// 		INFECTION[0].POWER = 1;
		// 	}
		// 	if(mod < maxCycle * 3 / 4 && mod >= maxCycle / 2){
		// 		MAIN[50][50] = INFECTION[2].VALUE;
		// 		INFECTION[2].POWER = 1.1;
		// 		INFECTION[1].POWER = 1;
		// 	}
		// 	if(mod < maxCycle && mod >= maxCycle * 3 / 4){
		// 		MAIN[50][50] = INFECTION[3].VALUE;
		// 		INFECTION[3].POWER = 1.1;
		// 		INFECTION[2].POWER = 1;
		// 	}
		// }
	},
	// 14
	function() {
		loadScenario(75, 0.01);
		// First Circle
		setDegreeByRadius(25, 25, 10, 5);
		setDegreeByRadius(25, 25, 7, 6);
		setDegreeByRadius(25, 25, 5, 7);
		setDegreeByRadius(25, 25, 3, 8);

		// Second Circle
		setDegreeByRadius(50, 50, 12, 5);
		setDegreeByRadius(50, 50, 10, 6);
		setDegreeByRadius(50, 50, 7, 7);
		setDegreeByRadius(50, 50, 4, 8);

		setInfectionValues(0, 0.27, 0.3, true, 0, 0.27, 0, 0);

		dataLength = 400;

		setDatatableText("Infection + Reinfection Chance");

		cycleFunction = function() {
			if(CYCLE == 150)
				setInfectionValues(0, 0.24, 0, true, 0, 0.24, 0, 0);
			if(CYCLE == 300)
				setInfectionValues(0, 0.30, 0.3, true, 0, 0.30, 0, 0);
			setDatatableNum(INFECTION[0].INFECTION_CHANCE);
		}
	},
	// 15
	function() {
		loadScenario(70, 0.005);
		setInfectionValues(0, 0.25, 0.1, true, 0, 0.25, 0, 0);
		
		dataLength = 500;
		cycleFunction = function() {
			if(CYCLE == 250) {
				for(let i = 0; i < 70; i++) {
					setDegree(i, 35, 7);
					setDegree(i, 36, 6);
					setDegree(i, 34, 6);
					setDegree(i, 37, 5);
					setDegree(i, 33, 5);
				}
			}
		}
	},
	// 16
	function() {
		loadScenario(50, 0);
		setInfectionValues(0, 0.27, 0, true, 0, 0.27, 0, 0);

		for(let i = 0; i < 50; i++)
			setInfection(i, 0, INFECTION[0].VALUE);

		for(let i = 0; i < 50; i++){
			setInfection(10, i, IMMUNITY[0].VALUE);
			setInfection(20, i, IMMUNITY[0].VALUE);
			setInfection(30, i, IMMUNITY[0].VALUE);
			setInfection(40, i, IMMUNITY[0].VALUE);
			for(let j = 0; j <= 9; j++) {
				setDegree(j, i, 4);
				setDegree(j + 10, i, 5);
				setDegree(j + 20, i, 6);
				setDegree(j + 30, i, 7);
				setDegree(j + 40, i, 8);
			}
		}
		
	}
]

loadScene(currentScenario);
drawTable();

// calculateAverageInfected();


// Main Functions
function INITIALIZE() {
	cycleDelay = document.getElementById("timeSlider").value;

	if (runState == RUNNING){
		clearInterval(cancelCode);
	}

	createTable();

	// RESUME
	if(pauseState == UNPAUSED && notFirstTime){
		IMMUNIZE();
		if(heatVision)
			drawHeatMap();
		else
			drawTable();
	}

	notFirstTime = true;
	
	cancelCode = setInterval(advanceCycle, cycleDelay);
	runState = RUNNING;
}

function RESET() {
	CYCLE = 0;
	averageInfected = 0;
	heatVision = false;
	clearInterval(cancelCode);
	// console.log("RESET: " + cancelCode + " was used to cancel the interval");
	for(let x = 0; x < LEN; x++) {
		for(let y = 0; y < LEN; y++) {
			MAIN[x][y] = 0;
			SCND[x][y] = 0;
			timesInfected[x][y] = 0;
		}
	}

	createTable();
	setDatatableText("Optional Datafield.");
	setDatatableNum("?");
	setCycleTime(50);
	disableInfections();
	cycleFunction = function(){};
	resetDatasets();
	loadScene(currentScenario);
	resetDataTable();
	drawTable();
}

function resetDatasets() {
	for(let i = 0; i < INFECTION.length; i++)
		INFECTION[i].dps = [];
	for(let i = 0; i < IMMUNITY.length; i++)
		IMMUNITY[i].dps = [];
	infdps = [];	
	deddps = [];
	susdps = [];
	avginfdps = [];
	dedprdps = [];
	updateChart();
	declareChart();
}

function STEP() {
	PAUSE();
	advanceCycle();
}

function PAUSE() {
	pauseState = PAUSED;
	clearInterval(cancelCode);
}

function isPaused() {
	if(pauseState == PAUSED)
		return true;
	return false;
}

function disableInfections() {
	for(let i = 0; i < INFECTION.length; i++) {
		INFECTION[i].SPAR = 0;
		INFECTION[i].ENABLED = false;
		INFECTION[i].DEATH_CHANCE = 0;
		INFECTION[i].INFECTION_CHANCE = 0;
		INFECTION[i].EVOLUTION_CHANCE = 0;
		INFECTION[i].REINFECTION_CHANCE = 0;
	}
}

function IMMUNIZE() {
	for(let i = 0; i < MAIN.length; i++) {
		for(let j = 0; j < MAIN[i].length; j++){
			if(MAIN[i][j] == IMMUNITY[0].VALUE)
				MAIN[i][j] = SUS
			if(Math.random() < IMMUNITY[0].immunityCHANCE)
				MAIN[i][j] = IMM;
		}
	}
	return;
}

function createTable() {
	document.getElementById("mainTABLE").outerHTML = "<table id = 'mainTABLE'> </table>";
	let mainTABLE = document.getElementById("mainTABLE");
	for (let r = 0; r < LEN; r++) {
		let row = document.createElement("tr");
		for (var c = 0; c < LEN; c++) {
			let cell = document.createElement("td");
			cell.bgColor = getCellColor(r, c);
			if(drawCellBorder)
				cell.style.border = "1px solid black";
			row.appendChild(cell);
		}           
		mainTABLE.appendChild(row);
	}
}

function advanceCycle() {
	let deathCount = 0;
	CYCLE++;
	// console.log("CYCLE: " + CYCLE);

	for(let p = 0; p < INFECTION.length; p++) {
		if(INFECTION[p].ENABLED && INFECTION[p].SPAR > 0){
			spawnSpontaneousInfection(p);
		}
	}

	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			SCND[i][j] = MAIN[i][j];
		}
	}
	// console.time('resolveTable');
	resolveTable();
	// console.timeEnd('resolveTable');

	// console.time('cycleFunction');
	cycleFunction();
	// console.timeEnd('cycleFunction');

	// console.time('countInfectedUntilNow');
	countInfectedUntilNow();
	// console.timeEnd('countInfectedUntilNow');

	// console.time('drawTable');
	if(drawGraphics) {
		if(heatVision)
			drawHeatMap();
		else
			drawTable();
	}
	// console.timeEnd('drawTable');

	// console.time('updateChart');
	if(drawChart)
		updateChart();
	// console.timeEnd('updateChart');

	// console.time('updateDataTable');
	updateDataTable();
	// console.timeEnd('updateDataTable');

	deadThisRound = 0;
}

function resolveTable() {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			// INFECTED CELL
			if(isInfected(i, j)) {
				let cellState = getValue(i, j);
				// UP
				if(isInTable(i - 1, j)) {
					// infect(i - 1, j);
					infectWith(i - 1, j, cellState);
				}
				// RIGHT
				if(isInTable(i, j + 1)) {
					// infect(i, j + 1);
					infectWith(i, j + 1, cellState);
				}
				// DOWN
				if(isInTable(i + 1, j)) {
					// infect(i + 1, j);
					infectWith(i + 1, j, cellState);
				}
				// LEFT
				if(isInTable(i, j - 1)) {
					// infect(i, j - 1);
					infectWith(i, j - 1, cellState);
				}
				switch(DEG[i][j]) {
					case 4:
						break;
					// 1 2
					// 3 4
					case 5:
						infectDIRWith(i, j, oneToFourRand(), cellState);
						break;
					case 6:
						rand1 = oneToFourRand();
						rand2 = oneToFourRand();
						while(rand1 == rand2){
							rand2 = oneToFourRand();
						}
						infectDIRWith(i, j, rand1, cellState);
						infectDIRWith(i, j, rand2, cellState);
						break;
					case 7:
						rand1 = oneToFourRand();
						for(let t = 1; t < 5; t++) {
							if(t != rand1)
								infectDIRWith(i, j, t, cellState);
						}
						break;
					case 8:
						infectDIRWith(i, j, 1, cellState);
						infectDIRWith(i, j, 2, cellState);
						infectDIRWith(i, j, 3, cellState);
						infectDIRWith(i, j, 4, cellState);
						break;
				}
				decideFate(i, j);
			}
		}
	}
	
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			MAIN[i][j] = SCND[i][j];
		}
	}
	return;
}

function setCycleTime(CT) {
	document.getElementById("timeSlider").value = CT;
	document.getElementById("cycleTime").innerHTML = CT + "ms";
	cycleDelay = CT;
}

function updateCycleTime() {
	let newCycleTime = document.getElementById("timeSlider").value;
	cycleDelay = newCycleTime;
	document.getElementById("cycleTime").innerHTML = newCycleTime + "ms";
	if(runState == RUNNING) {
		clearInterval(cancelCode);
		cancelCode = setInterval(advanceCycle, newCycleTime);
	}
}

// Scenario Functions
function loadScenario(tableLength, immC) {
	LEN = tableLength;
	IMMUNITY[0].immunityCHANCE = immC;

	MAIN = createArray(LEN, LEN);
	SCND = createArray(LEN, LEN);
	DEG = createArray(LEN, LEN);
	//HeatMap
	timesInfected = createArray(LEN, LEN);

	INFECTION_STATE = createArray(INFECTION.length - 1, LEN, LEN);

	for(let x = 0; x < LEN; x++) {
		for(let y = 0; y < LEN; y++) {
			MAIN[x][y] = 0;
			SCND[x][y] = 0;
			DEG[x][y] = 4;
			timesInfected[x][y] = 0;
		}
	}
	IMMUNIZE();
}

function loadScene(sceneCode) {
	SCENES[sceneCode]();
	notFirstTime = false;
	createTable();
	drawTable();
	document.getElementById("scenarioName").innerHTML = "&#8805;  Scenario " + sceneCode + " : " + sceneTitle;
	if(SHOWDESC)
		document.getElementById("description").innerHTML = sceneDescription;
	else {
		document.getElementById("description").style.height = 0;
		document.getElementById("boundingBox").style.height = "90%";		
	}
	declareChart();
}

function previousScenario() {
	if(currentScenario > 0) {
		currentScenario--;
		RESET();
		loadScene(currentScenario);

	}
}

function nextScenario() {
	if(currentScenario < SCENES.length - 1) {
		currentScenario++;
		RESET();
		loadScene(currentScenario);
	}
}

// Datatable Functions
function updateDataTable() {
	let infectedNum = countInfected();
	document.getElementById("healthyNum").innerHTML = countSusceptible();
	document.getElementById("infectedNum").innerHTML = infectedNum;
	document.getElementById("infectedPercentage").innerHTML = Math.floor((infectedNum / (LEN * LEN)) * 100) + "%";
}

function resetDataTable() {
	document.getElementById("healthyNum").innerHTML = "?";
	document.getElementById("infectedNum").innerHTML = "?";
	document.getElementById("infectedPercentage").innerHTML = "?";
}

function setDatatableNum(text) {
	document.getElementById("cycleFuncNum").innerHTML = text;
}

function setDatatableText(text) {
	document.getElementById("cycleFuncText").innerHTML = text;
}

// Table functions
function drawTable() {
	let gTable = document.getElementById("mainTABLE");
	for(let r = 0; r < LEN; r++) {
		for(let c = 0; c < LEN; c++) {
			gTable.rows[r].cells[c].bgColor = getCellColor(r, c);
		}
	}
}

function getCellColor(r, c) {
	let bgColor = "#0c0c0c";
	if(isInfected(r, c)){
		bgColor = INFECTION[getIDbyValue(MAIN[r][c])].COLOR;
	}
	if(isDead(r, c)) {
		let realValue = ((MAIN[r][c] * 10) - 10) / 10;
		bgColor = INFECTION[getIDbyValue(realValue)].DEATH_COLOR;
	}
	switch(MAIN[r][c]) {
		case SUS:
			switch(DEG[r][c]) {
				case 4:
					bgColor = COLOR_SUSCEPTIBLE;
					break;
				case 5:
					bgColor = COLOR_SUSCEPTIBLE_5;
					break;
				case 6:
					bgColor = COLOR_SUSCEPTIBLE_6;
					break;
				case 7:
					bgColor = COLOR_SUSCEPTIBLE_7;
					break;
				case 8:
					bgColor = COLOR_SUSCEPTIBLE_8;
					break;
			}
			break;
		case IMM:
			bgColor = COLOR_IMMUNE;
			break;
		default:
			break;
	}
	return bgColor;
}

function isInTable(m, n) {
	if(m >= 0 && n >= 0 && m < LEN && n < LEN)
		return true;
	return false;
}

// Heatmap Functions
function getHeatmapColor(m, n) {
	let cellHeat = timesInfected[m][n];
	if(cellHeat == 0)
		return "#FFFFFF"; 
	if(cellHeat > 0 && cellHeat <= maxHeat / 4)
		return "#ffcdd2";
	if(cellHeat > maxHeat / 4 && cellHeat <= maxHeat / 2)
		return "#e57373";
	if(cellHeat > maxHeat / 2 && cellHeat <= 3 * maxHeat / 4)
		return "#f44336";
	if(cellHeat > 3 * maxHeat / 4 && cellHeat <= maxHeat)
		return "#d32f2f";
}

function drawHeatMap() {
	let gTable = document.getElementById("mainTABLE");
	setMaxHeat();
	for(let r = 0; r < LEN; r++) {
		for(let c = 0; c < LEN; c++) {
			gTable.rows[r].cells[c].bgColor = getHeatmapColor(r, c);
		}
	}
}

function setMaxHeat() {
	maxHeat = 0;
	for(let r = 0; r < LEN; r++) {
		for(let c = 0; c < LEN; c++) {
			if(timesInfected[r][c] > maxHeat) {
				maxHeat = timesInfected[r][c];
			}
		}
	}
}

function toggleHeatVision() {
	if(heatVision) {
		heatVision = false;
		drawTable();
	}
	else {
		heatVision = true;
		drawHeatMap();
	}
}

// Infection Functions
function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE) {
	INFECTION[infectionType].INFECTION_CHANCE = INF_CHANCE;
	INFECTION[infectionType].SPAR = SPAR;
	INFECTION[infectionType].ENABLED = STATUS;
	INFECTION[infectionType].EVOLUTION_CHANCE = EVO_CHANCE;
	INFECTION[infectionType].REINFECTION_CHANCE = REINF_CHANCE;
	INFECTION[infectionType].DEATH_CHANCE = DED_CHANCE;
	INFECTION[infectionType].RECOVERY_CHANCE = REC_CHANCE;
}

function setImmunityValues() {

}

function infectWith(m, n, infectionValue) {
	let infectionID = getIDbyValue(infectionValue);
	if(Math.random() < INFECTION[infectionID].INFECTION_CHANCE){
		if(isSusceptible(m, n)){
			SCND[m][n] = infectionValue;
		} else if(isInfected(m, n) && INFECTION[infectionID].POWER > INFECTION[getIDbyValue(getValue(m, n))].POWER){
			SCND[m][n] = infectionValue;
		}
	}
}

function infectDIRWith(m, n, d, infectionValue) {
	switch(d) {
		case 1:
			if(isInTable(m - 1, n - 1))
				infectWith(m - 1, n - 1, infectionValue);
			break;
		case 2:
			if(isInTable(m - 1, n + 1))
				infectWith(m - 1, n + 1, infectionValue);
			break;
		case 3:
			if(isInTable(m + 1, n - 1))
				infectWith(m + 1, n - 1, infectionValue);
			break;
		case 4:
			if(isInTable(m + 1, n + 1))
				infectWith(m + 1, n + 1, infectionValue);
			break;
	}
}

function decideFate(m, n) {
	let tempType = getIDbyValue(MAIN[m][n]);

 	// DEATH
 	if(Math.random() < INFECTION[tempType].DEATH_CHANCE){
		SCND[m][n] = DED + (INFECTION[tempType].VALUE - 1);
		deadThisRound++;
		return;
 	}

 	// IMMUNITY
 	if(Math.random() < INFECTION[tempType].RECOVERY_CHANCE){
		SCND[m][n] = IMMUNITY[0].VALUE;
		return;
 	}

 	// INFECTION EVOLUTION
	if(INFECTION[tempType].EVOLUTION_CHANCE > Math.random()) {
		SCND[m][n] = INFECTION[tempType + 1].VALUE;
		setInfectionValues(tempType + 1, INFECTION[tempType].INFECTION_CHANCE * EVO_INF, INFECTION[tempType].SPAR * EVO_SPAR, true, INFECTION[tempType].EVOLUTION_CHANCE * EVO_EVO, INFECTION[tempType].REINFECTION_CHANCE * EVO_REINF, INFECTION[tempType].DEATH_CHANCE * EVO_REINF, INFECTION[tempType].RECOVERY_CHANCE * EVO_REC)
		return;
	}

	recoverFromInfection(m, n, SCND[m][n]);
}

function spawnSpontaneousInfection(infectionID) {
	let rand;
	AllSUS = [];
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			if(isSusceptible(i, j)) {
				AllSUS.push({
					x: i,
					y: j
				});
			}
		}	
	}

	let SPAR = INFECTION[infectionID].SPAR; 
	while(SPAR > Math.random()) {
		rand = Math.floor(Math.random() * (AllSUS.length));
		setInfection(AllSUS[rand].x, AllSUS[rand].y, INFECTION[infectionID].VALUE);
		AllSUS.splice(rand, 1);
		SPAR--;
	}
}

function recoverFromInfection(m, n, infectionValue) {
	// console.log(m + " " + n + " " + infectionType + " " + getIDbyValue(infectionType) + " " + INFECTION[0].INFECTION_CHANCE);
	if(Math.random() < INFECTION[getIDbyValue(infectionValue)].REINFECTION_CHANCE){
		SCND[m][n] = infectionValue;
		timesInfected[m][n]++;
	} else {
		SCND[m][n] = SUS;
	}
}


// set() Functions
function setValue(m, n, STATE) {
	MAIN[m][n] = STATE;
}

function setInfection(x, y, infectionValue) {
	MAIN[x][y] = infectionValue;
}

function setInfectionByRadius(m, n, RADIUS, infectionValue) {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(Math.sqrt(Math.pow(i - m, 2) + Math.pow(j - n, 2)) < RADIUS)
				MAIN[i][j] = infectionValue;
		}
	}
}

function fillWithInfection(startingX, startingY, endingX, endingY, infectionValue) {
	for(let i = startingX; i <= endingX; i++) {
		for(let j = startingY; j <= endingY; j++){
			MAIN[i][j] = infectionValue;
		}
	}
}

// is() Functions
function isSusceptible(m, n) {
	if(MAIN[m][n] == SUS)
		return true;
	else
		return false;
}

function isDead(m, n) {
	if(MAIN[m][n] >= 2 && MAIN[m][n] < 3)
		return true;
	return false;
}

function isInfected(m, n) {
	if(MAIN[m][n] >= INFECTION[0].VALUE && MAIN[m][n] <= INFECTION[INFECTION.length - 1].VALUE)
		return true;
	else
		return false;
}

function isImmune(m, n) {
	if(MAIN[m][n] == IMM)
		return true;
	else
		return false;
}

// get() Functions
function getValue(m, n) {
	return MAIN[m][n];
}

function getIDbyValue(infectionValue) {
	for(let i = 0; i < INFECTION.length; i++){
		if(INFECTION[i].VALUE == infectionValue)
			return i;
	}
}

// Counter Functions
function countDead() {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] == DED)
				count++;
		}
	}
	return count;
}

function countImmune() {
	let count = 0;
	for(let i = 0; i < MAIN.length; i++) {
		for(let j = 0; j < MAIN[i].length; j++){
			if(MAIN[i][j] == IMMUNITY[0].VALUE)
				count++;
		}
	}
	return count;
}

function countSusceptible() {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] == SUS)
				count++;
		}
	}
	return count;
}

function countInfected() {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] >= INFECTION[0].VALUE && MAIN[i][j] <= INFECTION[INFECTION.length - 1].VALUE)
				count++;
		}
	}
	return count;
}

function countInfectedByID(infectionID) {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] == INFECTION[infectionID].VALUE)
				count++;
		}
	}
	return count;
}

function countInfectedUntilNow() {
	averageInfected = (countInfected() + (CYCLE - 1) * averageInfected) / CYCLE;
}

function countInfectedByValue(infectionValue) {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] == INFECTION[getIDbyValue(infectionValue)].VALUE)
				count++;
		}
	}
	return count;
}

// Degree Functions
function setDegree(x, y, DEGREE) {
	DEG[x][y] = DEGREE;
}

function setDegreesByRandom(CHANCE, DEGREE) {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(Math.random() < CHANCE)
				DEG[i][j] = DEGREE;
		}
	}
}

function setDegreeByRadius(x, y, RADIUS, DEGREE) {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(Math.sqrt(Math.pow(i - x, 2) + Math.pow(j - y, 2)) < RADIUS)
				DEG[i][j] = DEGREE;
		}
	}
}

// Chart Functions
function declareChart() {
	chart = new CanvasJS.Chart("chartContainer", {
		// theme: "light2",
		backgroundColor: "#0c0c0c",

		axisY: {
			labelFontSize: 10,
			gridThickness: 0,
			crosshair: {
				enabled: true
			},
			includeZero: true
		},

		axisX: {
			labelFontSize: 10,
			includeZero: false,
			stripLines:[
			{                
				opacity:getStripLineOpacity(),
				startValue:23,
				endValue:25,              
				color:"#DDDDDD"                
			}
			]    

		},

		legend: {
			fontColor: "#CCC",
			verticalAlign: "bottom",
			horizontalAlign: "middle",
			dockInsidePlotArea: false,
			itemclick: toogleDataSeries
		},
		
		data: [
			{
				showInLegend: INFECTION[0].ENABLED,
				type: "line",
				name: "INF#1",
				color: INFECTION[0].COLOR,
				dataPoints: INFECTION[0].dps
			},
			{
				showInLegend: INFECTION[1].ENABLED,
				type: "line",
				name: "INF#2",
				color: INFECTION[1].COLOR,
				dataPoints: INFECTION[1].dps
			},
			{
				showInLegend: INFECTION[2].ENABLED,
				type: "line",
				name: "INF#3",
				color: INFECTION[2].COLOR,
				dataPoints: INFECTION[2].dps
			},
			{
				showInLegend: INFECTION[3].ENABLED,
				type: "line",
				name: "INF#4",
				color: INFECTION[3].COLOR,
				dataPoints: INFECTION[3].dps
			},
			{
				showInLegend: true,
				type: "line",
				name: "Average Infected",
				lineDashType: "dash",
				color: "#FB8C00",
				dataPoints: avginfdps
			},
			{
				showInLegend: SHOWHEALTHY,
				type: "line",
				name: "Healthy",
				color: "#1565C0",
				dataPoints: susdps
			},
			{
				showInLegend: true,
				type: "line",
				name: "Immune",
				color: IMMUNITY[0].COLOR,
				dataPoints: IMMUNITY[0].dps	
			},
			{
				showInLegend: true,
				type: "line",
				name: "Dead",
				color: COLOR_DEAD,
				dataPoints: deddps	
			},
			{
				showInLegend: true,
				type: "line",
				name: "Death per Round",
				color: "white",
				dataPoints: dedprdps	
			}
		]
	});
}

function updateChart() {
		if(CYCLE == 0 || CYCLE == 1)
			shiftAllDPS();

		for(let i = 0; i < INFECTION.length; i++) {
			if(INFECTION[i].ENABLED) {
				INFECTION[i].dps.push({
					x: CYCLE,
					y: countInfectedByValue(INFECTION[i].VALUE)
				});

				if (INFECTION[i].dps.length > dataLength) {
					INFECTION[i].dps.shift();
				}
			}
		}

		for(let i = 0; i < IMMUNITY.length; i++) {
			if(IMMUNITY[i].ENABLED) {
				IMMUNITY[i].dps.push({
					x: CYCLE,
					y: countImmune()
				});

				if (IMMUNITY[i].dps.length > dataLength) {
					IMMUNITY[i].dps.shift();
				}
			}
		}
		
		avginfdps.push({
			x: CYCLE,
			y: averageInfected
		});

		if(SHOWHEALTHY) { 
				susdps.push({
				x: CYCLE,
				y: countSusceptible()
			});
		}

		dedprdps.push({
			x: CYCLE,
			y: deadThisRound
		});

		deddps.push({
			x: CYCLE,
			y: countDead()
		});

	if (deddps.length > dataLength) {
		deddps.shift();
	}

	if (susdps.length > dataLength) {
		susdps.shift();
	}

	if (avginfdps.length > dataLength) {
		avginfdps.shift();
	}

	if (dedprdps.length > dataLength) {
		dedprdps.shift();
	}
	chart.render();
}

function shiftAllDPS() {
	deddps.shift();
	susdps.shift();
	avginfdps.shift();
	for(let i = 0; i < INFECTION.length; i++)
		INFECTION[i].dps.shift();
	for(let i = 0; i < IMMUNITY.length; i++)
		IMMUNITY[i].dps.shift();
}

function toogleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

function showInfectionInLegend(infectionType) {
	if(INFECTION[infectionType].ENABLED == true)
		return true;
	return false;
}

function getStripLineOpacity() {
	if(currentScenario == 12)
		return 1;
	return 0;
}

// Statistics Functions
function returnToState() {
	for(let x = 0; x < LEN; x++) {
		for(let y = 0; y < LEN; y++) {
			MAIN[x][y] = 0;
			SCND[x][y] = 0;
		}
	}
	CYCLE = 0;
	let midPerson = Math.floor(LEN / 2); 
	MAIN[midPerson][midPerson] = INFECTION[0].VALUE;
	SCND[midPerson][midPerson] = INFECTION[0].VALUE;
}


function calculateAverageInfected() {
	MAIN = createArray(LEN, LEN);
	SCND = createArray(LEN, LEN);
	returnToState();

	let AVERAGE = new Array(100);
	for(let i = 24; i < 30; i+=0.001) {
		AVERAGE[i] = calculateAverageInfectedByPercentageForCycleCount(cycleLimit, i / 100);
		console.log(i + "," + AVERAGE[i]);
	}
	console.log(AVERAGE);
}


function calculateAverageInfectedByPercentageForCycleCount(CYCLECOUNT, PERCENTAGE) {
	let infectionCount = 0;
	let repeat = 1000;
	CYCLECOUNT = 500;
	returnToState();
	// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE)
	setInfectionValues(0, PERCENTAGE, 0, true, 0, PERCENTAGE, 0, 0);
	for(let i = 0; i < repeat; i++){
		while(CYCLE < CYCLECOUNT){
			CYCLE++;
			resolveTable();
		}
		infectionCount = infectionCount + countInfected();
		returnToState();
	}
	return (infectionCount / repeat);
}

// Statistics Functions
function increaseInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k]++;
}

function decreaseInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k]--;
}

function resetInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k] = 0;
}

// Misc. Functions
function oneToFourRand() {
	let rand = Math.floor(Math.random() * 4) + 1;
	return rand;
}

function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

		return arr;
}

function clearTableFromInfections() {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			if(isInfected(i, j))
				MAIN[i][j] = SUS;
		}
	}
}