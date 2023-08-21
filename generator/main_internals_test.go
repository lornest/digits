package main

import (
	"fmt"
	"testing"
)

func TestContains(t *testing.T) {
	var tests = []struct {
		s    []int
		v    int
		want bool
	}{
		{[]int{}, 1, false},
		{[]int{1, 2, 3}, 2, true},
		{[]int{1, 2, 3}, 4, false},
	}

	for _, test := range tests {
		testname := fmt.Sprintf("Contains(%v, %v)", test.s, test.v)
		t.Run(testname, func(t *testing.T) {
			if got := contains(test.s, test.v); got != test.want {
				t.Errorf("got %v, want %v", got, test.want)
			}
		})
	}
}

func TestFilterOneOperationResults(t *testing.T) {
	var tests = []struct {
		results      []int
		oneOpResults []int
		want         []int
	}{
		{[]int{1, 2, 3}, []int{1, 2, 3}, []int{}},
		{[]int{1, 2, 3}, []int{1, 2}, []int{3}},
		{[]int{1, 2, 3}, []int{1, 2, 4}, []int{3}},
	}

	for _, test := range tests {
		testname := fmt.Sprintf("FilterOneOperationResults(%v, %v)", test.results, test.oneOpResults)
		t.Run(testname, func(t *testing.T) {
			got := filterOneOperationResults(test.results, test.oneOpResults)
			if !sliceEqual(got, test.want) {
				t.Errorf("got %v, want %v", test.results, test.want)
			}
		})
	}
}

func TestGenerateResults(t *testing.T) {
	var tests = []struct {
		current       int
		operations    int
		maxOperations int
		numbers       []int
		want          []int
	}{
		{1, 0, 2, []int{1, 2}, []int{2, 2, 1, 2}},
		{5, 0, 1, []int{2, 3}, []int{ /* expected results here */ }},
		// Add more test cases as needed.
	}

	for _, test := range tests {
		testname := fmt.Sprintf("GenerateResults(%v, %v, %v, %v)", test.current, test.operations, test.maxOperations, test.numbers)
		t.Run(testname, func(t *testing.T) {
			var got []int
			generateResults(test.current, test.operations, test.maxOperations, test.numbers, &got)
			if !sliceEqual(got, test.want) {
				t.Errorf("got %v, want %v", got, test.want)
			}
		})
	}
}

func sliceEqual[T comparable](a, b []T) bool {
	if len(a) != len(b) {
		return false
	}
	for i, v := range a {
		if v != b[i] {
			return false
		}
	}
	return true
}
