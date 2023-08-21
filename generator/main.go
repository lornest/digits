package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	// Generate 6 unique numbers between 1 and 25 inclusive
	numbers := make([]int, 6)
	for i := 0; i < 6; i++ {
		for {
			number := r.Intn(25) + 1
			if !contains(numbers, number) {
				numbers[i] = number
				break
			}
		}
	}
	fmt.Println("Numbers:", numbers)

	// Generate results that can be obtained with only one operation
	oneOperationResults := []int{}
	generateResults(0, 0, 1, numbers, &oneOperationResults)

	// Initialize the final results list and generate results with 2 to 5 operations
	results := []int{}
	for i := 5; i >= 2; i-- {
		generateResults(0, 0, i, numbers, &results)
	}

	// Remove results that can be obtained with just one operation
	filteredResults := filterOneOperationResults(results, oneOperationResults)

	// Filter the results to keep only those between 50 and 100
	roundOneResults := []int{}
	for _, result := range filteredResults {
		if result >= 50 && result <= 100 {
			roundOneResults = append(roundOneResults, result)
		}
	}

	fiveResults := []int{}
	for _, result := range filteredResults {
		if result > 400 && result < 500 {
			fiveResults = append(fiveResults, result)
		}
	}
	// Pick a random number from the filtered results
	selectedNumber := roundOneResults[rand.Intn(len(roundOneResults))]
	selectedFiveNumber := fiveResults[rand.Intn(len(fiveResults))]

	fmt.Println("Selected number between 50 and 100:", selectedNumber)
	fmt.Println("Selected number between 400 and 500:", selectedFiveNumber)
}

func generateResults(current int, operations int, maxOperations int, numbers []int, results *[]int) {
	if current < 0 {
		return
	}
	if operations == maxOperations {
		*results = append(*results, current)
		return
	}
	for _, number := range numbers {
		generateResults(current+number, operations+1, maxOperations, numbers, results)
		generateResults(current-number, operations+1, maxOperations, numbers, results)
		generateResults(current*number, operations+1, maxOperations, numbers, results)
		if number != 0 {
			generateResults(current/number, operations+1, maxOperations, numbers, results)
		}
	}
}

// Remove results that can be obtained with just one operation as they are not interesting!
func filterOneOperationResults(results []int, oneOperationResults []int) []int {
	filteredResults := []int{}
	for _, result := range results {
		if !contains(oneOperationResults, result) {
			filteredResults = append(filteredResults, result)
		}
	}
	return filteredResults
}

// Helper function to check if a slice contains the given value
func contains(s []int, value int) bool {
	for _, v := range s {
		if v == value {
			return true
		}
	}
	return false
}
