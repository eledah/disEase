"use strict";

let currentScenario = 11;


// States
const SUS = 0;
const DED = 2;
const IMM = 3;

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

let SCENES = [ 
	// 0
	// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE)
	function() {
		loadScenario(21, 0, 100);
		setInfectionValues(0, 0.3, 0, true, 0, 0.3, 0, 0);
		initialInfectWith(5, 5, INFECTION[0].VALUE);

		fillWithInfection(0, 10, 20, 10, INFECTION[4].VALUE);
		fillWithInfection(10, 0, 10, 20, INFECTION[4].VALUE);
		initialInfectWith(0, 10, SUS);
		initialInfectWith(10, 0, SUS);
		initialInfectWith(20, 10, SUS);
		initialInfectWith(10, 20, SUS);
			
	},
	// 1
	function () {
		loadScenario(21, 0, 200);
		setInfectionValues(0, 1, 0, true, 0, 1, 1, 0);
		initialInfectWith(10, 10, INFECTION[0].VALUE);
	},
	// 2
	function() {
		loadScenario(21, 0, 150);
		setInfectionValues(0, 0.5, 0, true, 0, 0.5, 0.5, 0);
		initialInfectWith(10, 10, INFECTION[0].VALUE);
	},
	// 3
	function() {
		loadScenario(21, 0.03, 50);
		setInfectionValues(0, 0.5, 0, true, 0, 0.5, 0.5, 0);
		INFECTION[4].ENABLED = true;
		initialInfectWith(10, 10, INFECTION[0].VALUE);
	},
	// 4
	function() {
		loadScenario(41, 0.03, 75);
		setInfectionValues(0, 0.5, 0.5, true, 0, 0.5, 0, 0);
		INFECTION[4].ENABLED = true;
	},
	// 5
	function() {
		loadScenario(41, 0.01, 10);
		setInfectionValues(0, 0.4, 0, true, 0, 0.4, 0, 0);
		setInfectionByRadius(20, 20, 4, INFECTION[0].VALUE);
	},
	// 6
	function() {
		loadScenario(81, 0.01, 50);
		setInfectionValues(0, 0.3, 0, true, 0, 0.3, 0, 0);

		INFECTION[4].ENABLED = true;

		setInfectionByRadius(40, 40, 5, INFECTION[0].VALUE);

		setDegreeByRadius(80, 80, 20, 5);
		setDegreeByRadius(80, 80, 15, 6);
		setDegreeByRadius(80, 80, 10, 7);
		setDegreeByRadius(80, 80, 5, 8);
	},
	// 7
	function() {
		loadScenario(51, 0.001, 10);

		setInfectionValues(0, 0.27, 0.2, true, 0, 0.27, 0, 0);

		setInfectionByRadius(2, 2, 2, INFECTION[0].VALUE);
		setDegreeByRadius(25, 25, 10, 5);
		setDegreeByRadius(25, 25, 9, 6);
		setDegreeByRadius(25, 25, 7, 7);
		setDegreeByRadius(25, 25, 5, 8);
	},
	// 8
	function() {
		loadScenario(51, 0.1, 50);

		setInfectionValues(0, 0.7, 0, true, 0, 0.7, 0, 0);
		setInfectionValues(1, 0.6, 0, true, 0, 0.6, 0, 0);
		setInfectionValues(2, 0.5, 0, true, 0, 0.5, 0, 0);
		setInfectionValues(3, 0.4, 0, true, 0, 0.4, 0, 0);

		INFECTION[4].ENABLED = true;

		setInfectionByRadius(10, 10, 3, INFECTION[0].VALUE);
		setInfectionByRadius(40, 10, 3, INFECTION[1].VALUE);
		setInfectionByRadius(10, 40, 3, INFECTION[2].VALUE);
		setInfectionByRadius(40, 40, 3, INFECTION[3].VALUE);

	},
	// 9
	function() {
		loadScenario(51, 0.2, 100);

		setInfectionValues(0, 0.5, 5.1, true, 0, 0.5, 0, 0);
		setInfectionValues(1, 0.7, 0.01, true, 0, 0.7, 0, 0);

		INFECTION[4].ENABLED = true;

		setInfectionByRadius(10, 10, 3, INFECTION[0].VALUE);
		setInfectionByRadius(40, 40, 2, INFECTION[1].VALUE);
	},
	// 10
	function() {
		loadScenario(51, 0.02, 100);
		// SIMPLE CHANGE OF INFECTION CHANCE
		setInfectionValues(0, 0.15, 0.3, true, 0, 0.15, 0, 0);

		INFECTION[4].ENABLED = true;

		// setInfectionByRadius(10, 10, 3, INFECTION[0].VALUE);
		cycleFunction = function() {
			if(CYCLE % 80 < 40) {
				INFECTION[0].INFECTION_CHANCE += 0.02;
				INFECTION[0].REINFECTION_CHANCE += 0.02;
				INFECTION[0].SPAR += 0.01;
			}else{
				INFECTION[0].INFECTION_CHANCE -= 0.02;
				INFECTION[0].REINFECTION_CHANCE -= 0.02;
				INFECTION[0].SPAR -= 0.01;
			}
			updateSliderValue();
		}
	},
	// 11
	function() {
		loadScenario(50, 0.01, 10);
		// SIMPLE CHANGE OF INFECTION CHANCE
		// I would like to focus on a very special cell in this entire table.
		// We are all controlled by the media that we consume and the people around us.
		// If I'm being controlled all the time, then is there any "me" left in this body? What's the point of living if "Me" doesn't exist anymore?
		// And when you have broken out of the consumption cycle, you will realize that there's a world out there that needs fixing.

		// function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE)
		setInfectionValues(0, 0.2, 2, true, 0, 0.2, 0, 0.00010);
		setInfectionValues(1, 0.2, 2, true, 0, 0.2, 0, 0.00005);
		setInfectionValues(2, 0.2, 2, true, 0, 0.2, 0, 0.00001);

		INFECTION[4].ENABLED = true;
		INFECTION[4].SPAR = 0.002;
		INFECTION[4].INFECTION_CHANCE = 0;

		let changeValue = 0.012;
		let bottomInfection = 0;
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
			// console.log(INFECTION[0].INFECTION_CHANCE + " " + INFECTION[1].INFECTION_CHANCE);
			updateSliderValue();
		}
	},
	// 12
	function() {
		loadScenario(35, 0.01, 100);
		setInfectionValues(0, 0.4, 10, true, 0, 0.2, 0.5, 0);
		setInfectionValues(2, 1, 2, false, 0, 0.2, 1, 0);
		cycleFunction = function() {
			if(CYCLE == 24) {
				INFECTION[2].ENABLED = true;
				setInfectionByRadius(30, 30, 3, INFECTION[2].VALUE)
				cycleFunction = function(){};
			}
		}
	}
]




// Infections
let INFECTION_0 = {ID: 0, VALUE: 1.0, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#EC407A", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#94284C", RECOVERY_CHANCE: 0};
let INFECTION_1 = {ID: 1, VALUE: 1.1, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#AB47BC", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#6A2D75", RECOVERY_CHANCE: 0};
let INFECTION_2 = {ID: 2, VALUE: 1.2, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#66BB6A", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#3E7040", RECOVERY_CHANCE: 0};
let INFECTION_3 = {ID: 3, VALUE: 1.3, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#FDD835", ENABLED: false, dps: [], EVOLUTION_CHANCE: 0, REINFECTION_CHANCE: 0.2, DEATH_CHANCE: 0, DEATH_COLOR: "#A89023", RECOVERY_CHANCE: 0};

// Infectious Immunities
let IMMUNITY_0 = {ID: 100, VALUE: 3, INFECTION_CHANCE: 0, SPAR: 0, COLOR: "#B3E5FC", ENABLED: false, dps: [], immunityCHANCE: 0.005}


let INFECTION = [INFECTION_0, INFECTION_1, INFECTION_2, INFECTION_3, IMMUNITY_0];

const PAUSED = 1;
const UNPAUSED = 0;

const RUNNING = 1;


// COLORS
const COLOR_DEAD = "#B0BEC5";
const COLOR_IMMUNE = "#B3E5FC";
const COLOR_INFECTED = "#EC407A";
	// TYPES
	const COLOR_INFECTED_2 = "#AB47BC";
	const COLOR_INFECTED_3 = "#66BB6A";
	const COLOR_INFECTED_4 = "#FFA726";
const COLOR_SUSCEPTIBLE = "#F5F5F5";
	// Degrees
	const COLOR_SUSCEPTIBLE_5 = "D5D5D5";
	const COLOR_SUSCEPTIBLE_6 = "C0C0C0";
	const COLOR_SUSCEPTIBLE_7 = "B0B0B0";
	const COLOR_SUSCEPTIBLE_8 = "A0A0A0";


// Chart Declaration
let dataLength = 200;
let mainChart; 
let chart;
let averageInfected = 0;
	let infdps = [];
	let immdps = [];
	let deddps = [];
	let susdps = [];
	let avginfdps = [];

	let dedprdps = [];
	let deadThisRound = 0;
// declareChart();

let functionNames = [
	"SIMPLE SIR"	
];

let cycleFunction = function(){};

// cycleFunction();

// console.log(SCENES[0]);
loadScene(currentScenario);
drawTable();

// calculateAverageInfected();


function INITIALIZE() {
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

	// updateModels();
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

	updateChances();
	disableInfections();
	cycleFunction = function(){};
	resetDatasets();
	loadScene(currentScenario);
	// let midPerson = Math.floor(LEN / 2); 
	// MAIN[midPerson][midPerson] = INFECTION[0].VALUE;
	resetDataTable();
	drawTable();
}

function resetDatasets() {
	for(let i = 0; i < INFECTION.length; i++)
		INFECTION[i].dps = [];
	infdps = [];
	// immdps = [];
	deddps = [];
	susdps = [];
	avginfdps = [];
	dedprdps = [];
	updateChart();
	declareChart();
}

function disableInfections() {
	for(let i = 0; i < INFECTION.length; i++){
		INFECTION[i].SPAR = 0;
		INFECTION[i].ENABLED = false;
		INFECTION[i].DEATH_CHANCE = 0;
		INFECTION[i].INFECTION_CHANCE = 0;
		INFECTION[i].EVOLUTION_CHANCE = 0;
		INFECTION[i].REINFECTION_CHANCE = 0;
	}
}

function STEP() {
	Pause();
	advanceCycle();
}

function Pause() {
	pauseState = PAUSED;
	clearInterval(cancelCode);
	updateChances();
}

function isPaused() {
	if(pauseState == PAUSED)
		return true;
	return false;
}

function updateChances() {
	INFECTION[0].INFECTION_CHANCE = document.getElementById("infectionCHANCE").value / 100;
	INFECTION[4].immunityCHANCE = document.getElementById("immunityCHANCE").value / 100;
	INFECTION[0].SPAR = document.getElementById("spAR").value / 100;

	updateSliderValue();
}

function updateDataTable() {
	let dataTable = document.getElementById("dataTable");
	dataTable.rows[0].cells[1].innerHTML = countSusceptible();
	dataTable.rows[1].cells[1].innerHTML = countInfected();
	dataTable.rows[2].cells[1].innerHTML = Math.floor(averageInfected);
	dataTable.rows[3].cells[1].innerHTML = countDead();
}

function resetDataTable() {
	dataTable.rows[0].cells[1].innerHTML = "?";
	dataTable.rows[1].cells[1].innerHTML = "?";
	dataTable.rows[2].cells[1].innerHTML = "?";
	dataTable.rows[3].cells[1].innerHTML = "?";
}

function updateSliderValue() {
	document.getElementById("infLable").innerHTML = " " + INFECTION[0].INFECTION_CHANCE * 100 + "%"
	document.getElementById("immLable").innerHTML = " " + INFECTION[4].immunityCHANCE * 100 + "%"
	document.getElementById("spARLable").innerHTML = " " + INFECTION[0].SPAR * 100 + "%"

	document.getElementById("infectionCHANCE").value = INFECTION[0].INFECTION_CHANCE * 100;
	document.getElementById("immunityCHANCE").value = INFECTION[4].immunityCHANCE * 100;
	document.getElementById("spAR").value = INFECTION[0].SPAR * 100;

}

/*function updateModels() {
	// Model Selection
	if(document.getElementById("SISRADIO").checked) {
		// SIS MODEL
		deathCHANCE = 0;
	}
	if(document.getElementById("SIRRADIO").checked) {
		// SIR MODEL 
		deathCHANCE = 1;
	}
}*/

function IMMUNIZE() {
	for(let i = 0; i < MAIN.length; i++) {
		for(let j = 0; j < MAIN[i].length; j++){
			if(MAIN[i][j] == INFECTION[4].VALUE)
				MAIN[i][j] = SUS
			if(Math.random() < INFECTION[4].immunityCHANCE)
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
			row.appendChild(cell);
		}           
		mainTABLE.appendChild(row);
	}
}


function getCellColor(r, c) {
	let bgColor = "#FFFFFF";
	if(isInfected(r, c)){
		bgColor = INFECTION[getInfectionTypeByValue(MAIN[r][c])].COLOR;
	}
	if(isDead(r, c)) {
		let realValue = ((MAIN[r][c] * 10) - 10) / 10;
		bgColor = INFECTION[getInfectionTypeByValue(realValue)].DEATH_COLOR;
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

function drawTable() {
	let gTable = document.getElementById("mainTABLE");
	for(let r = 0; r < LEN; r++) {
		for(let c = 0; c < LEN; c++) {
			gTable.rows[r].cells[c].bgColor = getCellColor(r, c);
		}
	}
}


function isSusceptible(m, n) {
	if(MAIN[m][n] == SUS)
		return true;
	else
		return false;
}

function getInfectionTypeByValue(VALUE) {
	for(let i = 0; i < INFECTION.length; i++) {
		if(INFECTION[i].VALUE == VALUE){
			return i;
		}
	}
}

function isDead(m, n) {
	if(MAIN[m][n] >= 2 && MAIN[m][n] < 3)
		return true;
	return false;
}

function isInfected(m, n) {
	if(MAIN[m][n] >= INFECTION[0].VALUE && MAIN[m][n] <= INFECTION[INFECTION.length - 2].VALUE)
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

function infectWith(m, n, infectionType) {
	if(Math.random() < INFECTION[getInfectionTypeByValue(infectionType)].INFECTION_CHANCE){
		if(isSusceptible(m, n)){
			SCND[m][n] = infectionType;
		}else if(isInfected(m, n) && getState(m, n) < infectionType){
			SCND[m][n] = infectionType;
		}
	}
}

function getState(m, n) {
	return MAIN[m][n];
}

function setState(m, n, STATE) {
	MAIN[m][n] = STATE;
}

function increaseInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k]++;
}

function decreaseInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k]--;
}

function resetInfectionDuration(i, j, k) {
	INFECTION_STATE[i][j][k] = 0;
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
	// console.log(timesInfected);
	// console.log(maxHeat);
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

function recoverFromInfection(m, n, infectionValue) {
	// console.log(m + " " + n + " " + infectionType + " " + getInfectionTypeByValue(infectionType) + " " + INFECTION[0].INFECTION_CHANCE);
	if(Math.random() < INFECTION[getInfectionTypeByValue(infectionValue)].REINFECTION_CHANCE){
		SCND[m][n] = infectionValue;
		timesInfected[m][n]++;
	} else {
		SCND[m][n] = SUS;
	}
}

function decideFate(m, n) {
	let tempType = getInfectionTypeByValue(MAIN[m][n]);

 	// DEATH
 	if(Math.random() < INFECTION[tempType].DEATH_CHANCE){
		SCND[m][n] = DED + (INFECTION[tempType].VALUE - 1);
		deadThisRound++;
		// resetInfectionDuration(m, n, tempType);
		return;
 	}

 	// IMMUNITY
 	if(Math.random() < INFECTION[tempType].RECOVERY_CHANCE){
		SCND[m][n] = INFECTION[4].VALUE;
		// resetInfectionDuration(m, n, tempType);
		return;
 	}

 	// INFECTION EVOLUTION
	if(INFECTION[tempType].EVOLUTION_CHANCE > Math.random()) {
		SCND[m][n] = INFECTION[tempType + 1].VALUE;
		INFECTION[tempType + 1].ENABLED = true;
		INFECTION[tempType + 1].SPAR = INFECTION[tempType].SPAR * 1.5;
		INFECTION[tempType + 1].INFECTION_CHANCE = INFECTION[tempType].INFECTION_CHANCE * 1.5;
		INFECTION[tempType + 1].EVOLUTION_CHANCE = INFECTION[tempType].EVOLUTION_CHANCE * 0.5;
		INFECTION[tempType + 1].REINFECTION_CHANCE = INFECTION[tempType].REINFECTION_CHANCE * 1.5;
		// chart.Data[tempType + 1].showInLegend = true;
		return;
	}

	recoverFromInfection(m, n, SCND[m][n]);
}

function spawnInfection(infectionID) {
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

	let spontaneousAR = INFECTION[infectionID].SPAR; 
	while(spontaneousAR > Math.random()) {
		rand = Math.floor(Math.random() * (AllSUS.length));
		// console.log(rand);
		// console.log(AllSUS);
		initialInfectWith(AllSUS[rand].x, AllSUS[rand].y, INFECTION[infectionID].VALUE);
		AllSUS.splice(rand, 1);
		spontaneousAR--;
	}
}

function isInTable(m, n) {
	if(m >= 0 && n >= 0 && m < LEN && n < LEN)
		return true;
	return false;
}

function oneToFourRand() {
	let rand = Math.floor(Math.random() * 4) + 1;
	return rand;
}

function infectDIRWith(m, n, d, infectionType) {
	switch(d) {
		case 1:
			if(isInTable(m - 1, n - 1))
				infectWith(m - 1, n - 1, infectionType);
			break;
		case 2:
			if(isInTable(m - 1, n + 1))
				infectWith(m - 1, n + 1, infectionType);
			break;
		case 3:
			if(isInTable(m + 1, n - 1))
				infectWith(m + 1, n - 1, infectionType);
			break;
		case 4:
			if(isInTable(m + 1, n + 1))
				infectWith(m + 1, n + 1, infectionType);
			break;
	}
}

function resolveTable() {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			// INFECTED CELL
			if(isInfected(i, j)) {
				let cellState = getState(i, j);
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

function advanceCycle() {
	let deathCount = 0;
	CYCLE++;
	console.log("CYCLE: " + CYCLE);

	for(let p = 0; p < INFECTION.length; p++) {
		if(INFECTION[p].ENABLED && INFECTION[p].SPAR > 0){
			spawnInfection(p);
		}
	}

	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++) {
			SCND[i][j] = MAIN[i][j];
		}
	}
	console.time('resolveTable');
	resolveTable();
	console.timeEnd('resolveTable');

	console.time('cycleFunction');
	cycleFunction();
	console.timeEnd('cycleFunction');

	console.time('countInfectedUntilNow');
	countInfectedUntilNow();
	console.timeEnd('countInfectedUntilNow');

	// console.time('drawTable');
	if(heatVision)
		drawHeatMap();
	else
		drawTable();
	// console.timeEnd('drawTable');

	console.time('updateChart');
	updateChart();
	console.timeEnd('updateChart');

	console.time('updateDataTable');
	updateDataTable();
	console.timeEnd('updateDataTable');

	deadThisRound = 0;
}

function countInfectedUntilNow() {
	averageInfected = (countInfected() + (CYCLE - 1) * averageInfected) / CYCLE;
	// console.log(averageInfected);
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

// CHART DRAWING :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

function countInfected() {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] >= INFECTION[0].VALUE && MAIN[i][j] <= INFECTION[INFECTION.length - 2].VALUE)
				count++;
		}
	}
	return count;
}

function countInfectedByType(infectionValue) {
	let count = 0;
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(MAIN[i][j] == INFECTION[getInfectionTypeByValue(infectionValue)].VALUE)
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
			if(MAIN[i][j] == INFECTION[4].VALUE)
				count++;
		}
	}
	return count;
}

function setDegreeByRadius(m, n, RADIUS, DEGREE) {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(Math.sqrt(Math.pow(i - m, 2) + Math.pow(j - n, 2)) < RADIUS)
				DEG[i][j] = DEGREE;
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

function setInfectionByRadius(m, n, RADIUS, infectionType) {
	for(let i = 0; i < LEN; i++) {
		for(let j = 0; j < LEN; j++){
			if(Math.sqrt(Math.pow(i - m, 2) + Math.pow(j - n, 2)) < RADIUS)
				MAIN[i][j] = infectionType;
		}
	}
}

// function loadScenario(tableLength, modelType, immC, delay) {
function loadScenario(tableLength, immC, delay) {
	LEN = tableLength;
	// MODEL = modelType;
	INFECTION[4].immunityCHANCE = immC;
	cycleDelay = delay;

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

	/*switch(MODEL){
		case "SIS":
			document.getElementById("SISRADIO").checked = true;
			break;
		case "SIR":
			document.getElementById("SIRRADIO").checked = true;
			break;
	}*/

	document.getElementById("infectionCHANCE").value = INFECTION[0].INFECTION_CHANCE * 100;
	document.getElementById("immunityCHANCE").value = immC * 100;
	document.getElementById("spAR").value = INFECTION[0].SPAR * 100;
	
	// updateModels();
	IMMUNIZE();
	// INITIALIZE();
}

function showInfectionInLegend(infectionType) {
	if(INFECTION[infectionType].ENABLED == true)
		return true;
	return false;
}

function testFunc(e) {
	console.log(e);
}

function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

function declareChart() {
	chart = new CanvasJS.Chart("chartContainer", {
		theme: "light2"
		,
		// zoomEnabled: true,
  //     	panEnabled: true,
		title :{
			// text: "Dynamic Data"
		},
		axisY: {
			labelFontSize: 10,
			crosshair: {
				enabled: true
			},
			includeZero: true
		},
		axisX: {
			labelFontSize: 10,
			includeZero: false
		},

		legend:{
			fontsize: 3,
			cursor:"pointer",
			verticalAlign: "top",
			horizontalAlign: "left",
			dockInsidePlotArea: true,
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
				showInLegend: true,
				type: "line",
				name: "Healthy",
				color: "#1565C0",
				dataPoints: susdps
			},
			{
				showInLegend: true,
				type: "line",
				name: "Immune",
				color: INFECTION[4].COLOR,
				dataPoints: INFECTION[4].dps	
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
				color: "black",
				dataPoints: dedprdps	
			}
		]
	});
}

function shiftAllDPS() {
	deddps.shift();
	susdps.shift();
	avginfdps.shift();
	for(let i = 0; i < INFECTION.length; i++)
		INFECTION[i].dps.shift();
}

function updateChart() {
		if(CYCLE == 0 || CYCLE == 1)
			shiftAllDPS();

		for(let i = 0; i < INFECTION.length; i++) {
			INFECTION[i].dps.push({
				x: CYCLE,
				y: countInfectedByType(INFECTION[i].VALUE)
			});

			if (INFECTION[i].dps.length > dataLength) {
				INFECTION[i].dps.shift();
			}
		}

		avginfdps.push({
			x: CYCLE,
			y: averageInfected
		});

		susdps.push({
			x: CYCLE,
			y: countSusceptible()
		});

		dedprdps.push({
			x: CYCLE,
			y: deadThisRound
		});

		deddps.push({
			x: CYCLE,
			y: countDead()
		});

	if (immdps.length > dataLength) {
		immdps.shift();
	}

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

function initialInfectWith(m, n, infectionType) {
	MAIN[m][n] = infectionType;
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


function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE) {
	INFECTION[infectionType].INFECTION_CHANCE = INF_CHANCE;
	INFECTION[infectionType].SPAR = SPAR;
	INFECTION[infectionType].ENABLED = STATUS;
	INFECTION[infectionType].EVOLUTION_CHANCE = EVO_CHANCE;
	INFECTION[infectionType].REINFECTION_CHANCE = REINF_CHANCE;
	INFECTION[infectionType].DEATH_CHANCE = DED_CHANCE;
	INFECTION[infectionType].RECOVERY_CHANCE = REC_CHANCE;
}

// function loadScenario(tableLength, modelType, infC, immC, spantaneousAR, delay)



function loadScene(sceneCode){
	SCENES[sceneCode]();
	notFirstTime = false;
	createTable();
	drawTable();
	document.getElementById("SCENARIO").innerHTML = "Scenario: " + sceneCode;
	updateSliderValue();
	declareChart();
}

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
