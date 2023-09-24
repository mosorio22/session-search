import * as React from "react";
import Select from "./Select";

const Search = (props) => {

    //PREDICATE
    //options for the predicate select
    const predicates = [
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
    //select option state vars for predicate select
    const [predicateValue, setPredicateValue] = React.useState(props.search.predicate);

    //function to set state var for predicate select
    //also resets operator state
    function handlePredicateChange (event) {
        setPredicateValue(event.target.value);
        setOperatorValue("equals");
        props.search.predicate = event.target.value;
    };

    //list for conditional rendering of operator selects
    const stringList = ["domain", "user_email", "first_name", "last_name", "path"];

    //OPERATOR
    //options for the string operator select
    const stringOperators = [
        {label: "equals", value: "="},
        {label: "contains", value: "CONTAINS"},
        {label: "starts with", value: "STARTS_WITH"},
        {label: "in list", value: "IN"}
    ];
     //options for the numeric operator select
     const numericOperators = [
        {label: "equals", value: "="},
        {label: "between", value: "BETWEEN"},
        {label: "greater than", value: ">"},
        {label: "less than", value: "<"},
        {label: "in list", value: "IN"},
    ];
    
    //select option state var for operator select
    const [operatorValue, setOperatorValue] = React.useState(props.search.operator);

    //function to set state var for operator select
    function handleOperatorChange (event) {
        setOperatorValue(event.target.value);
        props.search.operator = event.target.value;
    };

    //INPUT
    //input state vars for 1st input
    const [inputOneValue, setInputOneValue] = React.useState(props.search.inputOne);

    //function to set state var for 1st input
    function handleInputOneChange (event) {
        setInputOneValue(event.target.value);
        props.search.inputOne = event.target.value;
    };

    //input state vars for 2nd input
    const [inputTwoValue, setInputTwoValue] = React.useState(props.search.inputTwo);

    //function to set state var for 2nd input
    function handleInputTwoChange (event) {
        setInputTwoValue(event.target.value);
        props.search.inputTwo = event.target.value;
    };


    const predicateOptions = (
        <Select
            options={predicates}
            value={predicateValue}
            onChange={handlePredicateChange}
        />
    );
    const operatorOptions = (
        <Select
            options={stringList.includes(predicateValue) ? stringOperators : numericOperators}
            value={operatorValue}
            onChange={handleOperatorChange}
        />
    );

 
    const searchbar = (
    <div className="searchbar-wrapper">
        <button className="close" onClick={() => props.handleRemoval(props.index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
            </svg>
        </button>
        <div data-search-index={props.index}>
            {predicateOptions}
            {operatorValue !== "BETWEEN" 
            ? <div>{operatorOptions}<input value={inputOneValue} onChange={handleInputOneChange}></input></div> 
            : <div><span>is</span>{operatorOptions}<input value={inputOneValue} onChange={handleInputOneChange}></input><span>and</span><input value={inputTwoValue} onChange={handleInputTwoChange}></input></div>}
        </div>
    </div>
    );
    return searchbar;
}

export default Search;