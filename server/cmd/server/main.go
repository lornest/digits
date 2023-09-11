package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
)

const port = "3001"

func main() {
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: routes(),
	}

	err := srv.ListenAndServe()
	if err != nil {
		log.Panic(err)
	}
}

func TodaysGames() (DailyGames, error) {
	return DailyGames{}, nil
}

func routes() http.Handler {
	r := chi.NewRouter()

	r.Route("/games", func(r chi.Router) {
		r.Get("/today", func(w http.ResponseWriter, r *http.Request) {
			games := DailyGames{
				GameDay: 1,
				Games: []Game{
					{
						Round:            1,
						Target:           51,
						GuessableNumbers: []int{1, 2, 3, 10, 15, 20},
					},
				},
			}
			resp, _ := json.Marshal(games)
			w.Write(resp)
		})
	})

	return r
}
