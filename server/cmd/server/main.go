package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

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
			currentDate := time.Now()

			w.Write([]byte("Today's games:" + currentDate.String()))
		})
	})

	return r
}
