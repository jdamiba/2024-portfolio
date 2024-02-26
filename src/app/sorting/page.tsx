"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";

const Service: NextPage = () => {
  const [individualNumber, setIndividualNumber] = useState<string>("");
  const [numbersArr, setNumbersArr] = useState<number[]>([]);

  const [leftArr, setLeftArr] = useState<number[]>([]);

  const quickSort = (input: number[]): number[] => {
    if (input.length < 2) {
      return input;
    }

    let pivot = input[input.length - 1];

    let left = [];

    let right = [];

    for (let i = 0; i < input.length - 1; i++) {
      if (input[i] < pivot) {
        left.push(input[i]);
      } else {
        right.push(input[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndividualNumber(e.target.value);
  };

  const handleEnterPress = (individualNumber: string) => {
    setIndividualNumber(individualNumber);
  };

  const handleNumberClick = (number: string) => {
    setIndividualNumber(individualNumber + number);
  };

  const handleAddClick = () => {
    setNumbersArr([...numbersArr, Number(individualNumber)]);
    setIndividualNumber("");
  };

  const handleDelete = () => {
    setIndividualNumber(
      individualNumber.substring(0, individualNumber.length - 1)
    );
  };

  const handleClear = () => {
    setNumbersArr([]);
    setIndividualNumber("");
  };

  return (
    <>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Sorting</h2>
            </div>
          </div>
        </div>
        <p>
          Sorting data is a common task in software engineering, and as a result
          there have been many sorting algorithms developed throughout the
          history of computer science.
        </p>

        <p>
          My favorite sorting algorithm is quicksort, which was developed by{" "}
          <a href="https://en.wikipedia.org/wiki/Tony_Hoare">Tony Hoare</a>, a
          British computer scientist, in the late 1950's.
        </p>

        <p>
          To implement the quicksort array, we first need to create an array of
          numbers to be sorted.
        </p>

        <p>
          Hit <b>Add</b> to add a number to the array, <b>Delete</b> to remove a
          digit from the current number, and <b>Clear</b> to remove all entries
          from the array.
        </p>
        <div className="input-area">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
            return (
              <button
                key={number}
                onClick={() => {
                  handleNumberClick(String(number));
                }}
                className="number-button"
              >
                {number}
              </button>
            );
          })}
        </div>
        <div>
          <button onClick={handleAddClick} className="user-input-button">
            Add
          </button>
          <button onClick={handleDelete} className="user-input-button">
            Delete
          </button>
          <button onClick={handleClear} className="user-input-button">
            Clear
          </button>
        </div>
        <div>
          <input
            className="input-box"
            type="number"
            value={individualNumber}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEnterPress(individualNumber);
            }}
          />
        </div>
        <div>
          Input Array: [
          {numbersArr.map((number, index) => {
            return index === numbersArr.length - 1 ? number : `${number},`;
          })}
          ]
        </div>
        <div>
          Sorted Array: [
          {quickSort(numbersArr).map((number, index) => {
            return index === quickSort(numbersArr).length - 1
              ? number
              : `${number},`;
          })}
          ]
        </div>
      </section>
    </>
  );
};

export default Service;
