"use client";

import type { NextPage } from "next";
import Head from "next/head";

import { useMemo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Service: NextPage = () => {
  const [individualNumber, setIndividualNumber] = useState<string>("");
  const [numbersArr, setNumbersArr] = useState<number[]>([]);

  const quickSort = (input: number[]): number[] => {
    console.log("Sortin");
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

  const sorted = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return quickSort(numbersArr);
  }, [numbersArr]);

  const codeString = `
  function quickSort(input){
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
  }`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndividualNumber(e.target.value);
  };

  const handleEnterPress = (individualNumber: string) => {
    if (individualNumber === "") {
      return;
    }
    setNumbersArr([...numbersArr, Number(individualNumber)]);
    setIndividualNumber("");
  };

  const handleNumberClick = (number: string) => {
    setIndividualNumber(individualNumber + number);
  };

  const handleAddClick = () => {
    if (individualNumber === "") {
      return;
    }
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

  const QuickSort = () => {
    return (
      <div className="quicksort-component-container">
        <div className="digit-buttons-container">
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
        <div className="buttons-container">
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
        <div className="input-box-container">
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
        <div className="inputArr-container">
          <h3>
            Input Array: [
            {numbersArr.map((number, index) => {
              return index === numbersArr.length - 1 ? number : `${number}, `;
            })}
            ]
          </h3>
        </div>
        <div className="sortedArr-container">
          <h3>
            Sorted Array: [
            {sorted.map((number, index) => {
              return index === sorted.length - 1 ? number : `${number}, `;
            })}
            ]
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      </Head>
      <section className="service section" id="services">
        <div className="container">
          <div className="row">
            <div className="section-title padd-15">
              <h2>Quicksort React Component</h2>
            </div>
          </div>
        </div>
        <h3>Introduction</h3>
        <p>
          Sorting data is a common task in software engineering, and as a result
          there have been many sorting algorithms developed throughout the
          history of computer science.
        </p>
        <p>
          My favorite sorting algorithm is quicksort, which was developed by{" "}
          <a href="https://en.wikipedia.org/wiki/Tony_Hoare">Tony Hoare</a>, a
          British computer scientist, in the late 1950's. On this page, I
          implement a React component to demonstrate the quicksort algorithm.
        </p>

        <h3>Component Design</h3>
        <p>
          This component will consist of 12 buttons: one for each digit 0-9, an{" "}
          <b>Add</b> button, an <b>Delete</b> button, and a <b>Clear</b> button.
        </p>
        <p>
          When the user clicks on a digit button (or presses Enter on their
          keyboard while a digit button is focused), that digit will show up in
          an input box below the buttons. Additional clicks on button digits
          will add digits to the number.
        </p>
        <p>
          In order to add a number to the input array, users click on the{" "}
          <b>Add</b> button, or press Enter while the input box is focused.
        </p>
        <p>
          Users can remove the last digit from a number being entered by
          pressing the <b>Delete</b> button, or by pressing Enter on the
          keyboard while the <b>Delete</b> button is focused.
        </p>
        <p>
          Users can clear the contents of the input array by clicking on the{" "}
          <b>Clear</b> button or pressing Enter while the <b>Clear</b> button is
          focused.
        </p>
        <p>
          Below the input box, we display the input array and the sorted array.
        </p>

        <h3>Component</h3>

        <QuickSort />

        <h3>Quicksort Algorithm</h3>

        <p>
          The quicksort algorithm works by first taking the input array and
          dividing it up into two sub-arrays. One of the sub-arrays contains all
          the numbers in the input that are larger than a randomly chosen pivot
          element within the input array. The other contains all of the numbers
          in the input array that are larger than the pivot element.
        </p>
        <p>
          Then, we return a new array that first contains the result of calling
          the same quicksort algorithm on the sub-array containing values
          smaller than the pivot element, our pivot element, and then the result
          of running the quicksort algorithm on the sub-array containing values
          greater than the pivot.
        </p>
        <p>
          The base case for this recursive algorithm is the situation where the
          input array provided contains only one element. In that case, rather
          than engaging in another recursive function call, we simply return the
          array.
        </p>
        <p>Here is what this algorithm looks like implemented in JavaScript.</p>
        <div className="code-container">
          <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </section>
    </>
  );
};

export default Service;
