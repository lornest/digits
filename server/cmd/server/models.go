package main

type Game struct {
	Round            int   `json:"round"`
	Target           int   `json:"target"`
	GuessableNumbers []int `json:"guessableNumbers"`
}

type DailyGames struct {
	GameDay int    `json:"gameDay"`
	Games   []Game `json:"games"`
}
