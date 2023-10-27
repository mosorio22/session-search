import * as React from "react";
import Search from "../Search/Search";
import './SearchMenu.scss';

const SearchMenu = () => {

    //state for searches
    const [searches, setSearches] = React.useState([{predicate:"domain", operator:"=", inputOne:"", inputTwo:""}]);

    //state for query
    const [query, setQuery] = React.useState("");

    //function to set state var for searches
    const handleAddSearches = (): void => {
        //only allow max of 10 searches at once
        if(searches.length < 10) {
            setSearches(searches => [...searches, {predicate:"domain", operator:"=", inputOne:"", inputTwo:""}]);
        }
    }

    //function to remove individual search
    const handleRemoval = (i: number): void => {
        //if only one searh remains, reset
        if (searches.length === 1) {
            handleReset();
        }
        //otherwise remove search
        else {
            setSearches(searches.filter((search, index) => index !== i));
        }
    }

    //function to clear state on reset
    const handleReset = (): void => {
        setSearches([{predicate:"domain", operator:"=", inputOne:"", inputTwo:""}]);
    }

    //list for conditional rendering of queries
    const diffOptionQueries: Array<string> = ["BETWEEN", "STARTS_WITH", "CONTAINS", "IN"];

    //list of predicates that look for numbers
    const numericList: Array<string> = ["visits", "screen_width", "screen_height", "page_response"];

    //function to generate SQL queries
    const handleQuery = (): void => {
        let queryString = "SELECT id FROM session WHERE ";
        let queryErrors = [];
        for (let i = 0; i < searches.length; i++) {
            //check inputs
            //blank input
            if (searches[i].inputOne === "" || (searches[i].operator === "BETWEEN" && searches[i].inputTwo === "")) {
                queryErrors.push("Blank Input at query " + i);
            }
            //numberical input validation
            if (numericList.includes(searches[i].predicate)) {
                if (searches[i].operator !== "IN") {
                    //check input values are numbers
                    if (!/^-?\d+(\.\d+)?$/.test(searches[i].inputOne) && searches[i].inputOne !== "") {
                        queryErrors.push("Non numerical input value found at query " + i);
                    }
                    if (searches[i].operator === "BETWEEN" && !/^-?\d+(\.\d+)?$/.test(searches[i].inputTwo) && searches[i].inputTwo !== "") {
                        queryErrors.push("Non numerical second input value found at query " + i);
                    }
                }
            }

            //confirm in list values are comma separated numbers
            if (searches[i].operator === "IN") {
                //numeric list
                if (numericList.includes(searches[i].predicate)) {
                    if (!/^-?\d+(\.\d+)?(,\d+(\.\d+)?)+$/.test(searches[i].inputOne)) {
                        queryErrors.push("Expecting comma separated numbers (no spaces) at query " + i);
                    }
                }
                //string list
                if (!/(.,).+[^,]$/.test(searches[i].inputOne)) {
                    queryErrors.push("Expecting comma separated string at query " + i);
                }
            }

            if (i !== 0) {
                queryString = queryString + " AND ";
            }
            //see if query needs different text
            if (!diffOptionQueries.includes(searches[i].operator)) {
                queryString = queryString  + searches[i].predicate + " " + searches[i].operator +
                " " + searches[i].inputOne;
            }
            else {
                switch(searches[i].operator) {
                    case "BETWEEN":
                        queryString = queryString + searches[i].predicate + " " + searches[i].operator +
                         " " + searches[i].inputOne + " AND " + searches[i].inputTwo;
                        break;
                    case "STARTS_WITH":
                        queryString = queryString + searches[i].predicate + " LIKE %" + searches[i].inputOne;
                        break;
                    case "CONTAINS":
                        queryString = queryString + searches[i].predicate + " LIKE %" + searches[i].inputOne + "%";
                        break;
                    case "IN":
                        queryString = queryString + searches[i].predicate + " " + searches[i].operator +
                        " (" + searches[i].inputOne + ")";
                        break;
                    default:
                        queryErrors.push("Invalid Query at query " + i);
                }
            }
        }
        if (queryErrors.length > 0) {
            queryString = queryErrors.join();
        }
        setQuery(queryString);
    }

    const getSearches = searches.map((search,i) => {
        return (
            <Search
                search={search} 
                index={i}
                key={"searches_key_" + Math.random()}
                handleRemoval={handleRemoval}
                setSearches={setSearches}
            />
        )
    });

    const menu = (
        <div className="search-menu">
            <div className="search-builder">
                {getSearches}
                <button className="and-button" onClick={handleAddSearches}>And</button>
            </div>
            <div className="button-section">
                <button onClick={handleQuery}>Search</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="query-wrapper">{query}</div>
        </div>
    );


    return menu;
}

export default SearchMenu;