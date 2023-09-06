package main

type Game struct {
	Number           int   `json:"number"`
	Target           int   `json:"target"`
	GuessableNumbers []int `json:"guessableNumbers"`
}

type DailyGames struct {
	GameDay int    `json:"gameDay"`
	Games   []Game `json:"games"`
}
