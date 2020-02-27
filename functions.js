// Main Functions
function INITIALIZE()
function RESET()
function resetDatasets()
function STEP()
function Pause()
function isPaused()
function disableInfections()
function IMMUNIZE()
function createTable()
function advanceCycle()
function resolveTable()
function setCycleTime(CT)
function updateCycleTime()

// Scenario Functions
function previousScenario()
function nextScenario()
function loadScenario(tableLength, immC)
function loadScene(sceneCode)

// Datatable Functions
function updateDataTable()
function resetDataTable()
function setDatatableNum(text)
function setDatatableText(text)

// Table functions
function drawTable()
function getCellColor(r, c)
function isInTable(m, n)

// Heatmap Functions
function getHeatmapColor(m, n)
function drawHeatMap()
function setMaxHeat()
function toggleHeatVision()

// Infection Functions
function setInfectionValues(infectionType ,INF_CHANCE, SPAR, STATUS, EVO_CHANCE, REINF_CHANCE, DED_CHANCE, REC_CHANCE)
function infectWith(m, n, infectionValue)
function infectDIRWith(m, n, d, infectionType)
function decideFate(m, n)
function spawnSpontaneousInfection(infectionID)
function recoverFromInfection(m, n, infectionValue)

// set() Functions
function setValue(m, n, STATE)
function setInfection(x, y, infectionValue)
function setInfectionByRadius(m, n, RADIUS, infectionType)
function fillWithInfection(startingX, startingY, endingX, endingY, infectionValue)

// is() Functions
function isSusceptible(m, n)
function isDead(m, n)
function isInfected(m, n)
function isImmune(m, n)

// get() Functions
function getValue(m, n)
function getIdByValue(infectionValue)

// Counter Functions.
function countDead()
function countImmune()
function countSusceptible()
function countInfected()
function countInfectedByID(infectionID)
function countInfectedUntilNow()
function countInfectedByValue(infectionValue)

// Degree Functions
function setDegree(x, y, DEGREE)
function setRandDegree(CHANCE, DEGREE)
function setDegreeByRadius(x, y, RADIUS, DEGREE)

// Chart Functions
function declareChart()
function updateChart()
function shiftAllDPS()
function toogleDataSeries(e)
function showInfectionInLegend(infectionType)
function getStripLineOpacity()

// Statistics Functions
function returnToState()
function calculateAverageInfected()
function calculateAverageInfectedByPercentageForCycleCount(CYCLECOUNT, PERCENTAGE)

// Infection Duration Functions
function increaseInfectionDuration(i, j, k)
function decreaseInfectionDuration(i, j, k)
function resetInfectionDuration(i, j, k)

// Misc. Functions
function oneToFourRand()
function createArray(length)
function clearTableFromInfections()