import * as React from "react";
import Select from "../Select/Select";
import './Search.css';
import { ChangeEvent } from "react";

const Search = (props: 
    {search: {predicate: string, operator: string, inputOne: string, inputTwo: string}, 
    index: number, key: string, handleRemoval: Function, 
    setSearches: React.Dispatch<React.SetStateAction<{ predicate: string; operator: string; inputOne: string; inputTwo: string; }[]>>
    }) => {

    //select option state vars for predicate select
    const [predicateValue, setPredicateValue] = React.useState(props.search.predicate);

    //select option state var for operator select
    const [operatorValue, setOperatorValue] = React.useState(props.search.operator);

    //input state vars for 1st input
    const [inputOneValue, setInputOneValue] = React.useState(props.search.inputOne);

    //input state vars for 2nd input
    const [inputTwoValue, setInputTwoValue] = React.useState(props.search.inputTwo);

    //PREDICATE
    //options for the predicate select
    const predicates: Array<{label: string, value: string}> = [
        {label: "Domain", value: "domain"},
        {label: "# of Visits", value: "visits"},
        {label: "User Email", value: "user_email"},
        {label: "Screen Width", value: "screen_width"},
        {label: "Screen Height", value: "screen_height"},
        {label: "First Name", value: "first_name"},
        {label: "Last Name", value: "last_name"},
        {label: "Page Response Time", value: "page_response"},
        {label: "Page Path", value: "path"}
    ];

    //function to set state var for predicate select
    //also resets operator state
    const handlePredicateChange = (predicateValue: string): void => {
        setPredicateValue(predicateValue);
        setOperatorValue("equals");
        props.search.predicate = predicateValue;
    };

    //list for conditional rendering of operator selects
    const stringList: Array<string> = ["domain", "user_email", "first_name", "last_name", "path"];

    //OPERATOR
    //options for the string operator select
    const stringOperators: Array<{label: string, value: string}> = [
        {label: "equals", value: "="},
        {label: "contains", value: "CONTAINS"},
        {label: "starts with", value: "STARTS_WITH"},
        {label: "in list", value: "IN"}
    ];
     //options for the numeric operator select
     const numericOperators: Array<{label: string, value: string}> = [
        {label: "equals", value: "="},
        {label: "between", value: "BETWEEN"},
        {label: "greater than", value: ">"},
        {label: "less than", value: "<"},
        {label: "in list", value: "IN"},
    ];

    //function to set state var for operator select
    const handleOperatorChange = (operatorValue: string): void => {
        setOperatorValue(operatorValue);
        props.search.operator = operatorValue;
    };

    //INPUT

    //function to set state var for 1st input
    const handleInputOneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputOneValue(event.target.value);
        props.search.inputOne = event.target.value;
    };

    //function to set state var for 2nd input
    const handleInputTwoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputTwoValue(event.target.value);
        props.search.inputTwo = event.target.value;
    };


    const predicateOptions = (
        <Select
            options={predicates}
            value={predicateValue}
            onChange={handlePredicateChange}/>
    );
    const operatorOptions = (
        <Select
            options={stringList.includes(predicateValue) ? stringOperators : numericOperators}
            value={operatorValue}
            onChange={handleOperatorChange}/>
    );

 
    const searchbar = (
    <div className="searchbar-wrapper">
        <button
        className="close"
        onClick={() => props.handleRemoval(props.index)}
        >
            x
      </button>
        <div className="search-inputs" data-search-index={props.index}>
            {predicateOptions}
            {operatorValue !== "BETWEEN" 
            ? <div className="operator-inputs" >{operatorOptions}<input value={inputOneValue} onChange={handleInputOneChange}></input></div> 
            : <div className="operator-inputs"><span>is</span>{operatorOptions}<input value={inputOneValue} onChange={handleInputOneChange}></input><span>and</span><input value={inputTwoValue} onChange={handleInputTwoChange}></input></div>}
        </div>
    </div>
    );
    return searchbar;
}

export default Search;