import React, { useState, useEffect } from 'react'
import "./styles.css";
import { Link, BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

interface Props{
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    navigate: (path: string) => void;
    initialSearchTerms: string[];
}

export const useSearchTerms = (initialSearchTerms: string[]) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(initialSearchTerms);

  return [searchTerms, setSearchTerms] as const;
};

type SearchFilter = {
  [searchTerm: string]: string;
};

const searchFilter: SearchFilter = {
  "SLA": "/general",
  "General": "/general",
  "Send to Engineers": "/sendToEngineers",
  "Codes": "/codesWindSnow",
  "Wind": "/codesWindSnow",
  "Snow": "/codesWindSnow",
  "Ground Mounts": "/groundMounts",
  "Error Rate Policy": "/errorRatePolicy",
  "Templates": "/templates",
  "AHJ Database": "/database",
  "Calculations": "/calculations",
  "Folders": "/folders",
  "Roof Framing": "/roofFraming",
  "Attachment and Screw Type": "/attachmentsScrews",
  "Turnaround Time": "/general",
  "QA / QC Sheet": "/general",
  "Pay Structure": "/errorRatePolicy",
  "Patio Structures": "/sendToEngineers",
  "Pergolas": "/sendToEngineers",
  "2x4 Rafters": "/sendToEngineers",
  "High Snow Load": "/sendToEngineers",
  "Revisions": "/folders",
  "COM Accounts": "/folders",
  "Post Installs": "/folders",
  "Last Names": "/templates",
  "Addresses": "/templates",
  "System Sizes": "/templates",
  "COA Numbers": "/templates",
  "Roof Slopes": "/roofFraming",
  "Array Tilt": "/roofFraming",
  "Roof Material": "/roofFraming",
  "Assumed Language": "/roofFraming",
  "Tile Roofing": "/roofFraming",
  "Metal Framing": "/roofFraming",
  "Dead Load": "/roofFraming",
  "Exposure Categories": "/codesWindSnow",
  "Calculation Checks": "/codesWindSnow",
  "Oklahoma Projects": "/database",
  "Houston Projects": "/database",
  "New Mexico Projects": "/database",
  "Upcodes": "/database",
  "ATC Website": "/database",
  "Illinois Projects": "/database",
  "Deck Mounts": "/attachmentsScrews",
  "Pullout Values": "/attachmentsScrews",
  "M5x60mm Screws": "/attachmentsScrews",
  "Embedment Depths": "/attachmentsScrews",
  "5/16 Lag Screws": "/attachmentsScrews",
  "Attachment Spacing": "/attachmentsScrews",
  "Spans": "/calculations",
};

function getLink(searchTerm: string): string | undefined {
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  for (const key in searchFilter) {
    if (key.toLowerCase() === lowercaseSearchTerm) {
      return searchFilter[key];
    }
  }
  return undefined;
}

const InputFeild = ({ search, setSearch, navigate, initialSearchTerms }: Props) => {
  const [searchTerms, setSearchTerms] = useSearchTerms(initialSearchTerms);
  const [inputSelected, setInputSelected] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  //These functions hide and show the drop down menu
  //if the input box is clicked on
  //they are modified in the form
  const handleInputFocus = () => {
    setInputSelected(true);
  }
  function handleDocumentClick(event: MouseEvent){
    const target = event.target as HTMLElement;
    const className = target.className;
    console.log(className);
    if(className !== "search-terms" && !target.closest(".input"))
      setInputSelected(false);
  }

  //happens when the user presses enter or the "GO" button
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(search);
    const link = getLink(search);
    let dropDownElements = document.querySelectorAll("#search-term");
    let numElements = dropDownElements.length;
    if(link){
      navigate(link);
      console.log(link);
      setSearch("");
      setSearchTerms([]);
    }//goes to first link in search terms if full key isnt typed
    else if(numElements != 0){
      const firstLink = getLink(dropDownElements[0].innerHTML);
      if(firstLink !== undefined){
        navigate(firstLink);
        setSearch("");
        setSearchTerms([]);
      }
    }
  };

  //This function checks to make sure joined search terms are equal to a val in searchFilter
  function shouldRenderSearchTerms(){
    const terms = searchTerms.join("");
    let matched = false;
    for(const key of Object.keys(searchFilter)){
      if(key.toLowerCase().startsWith(terms.toLowerCase()) && terms != ""){
        matched = true;
      }
    }
    return matched;
  }

  let selectedText = "";
   //This function handles when the user highlights
  //a chunk of letter from the search bar and deletes them
  //It is called when input tag in form is clicked on
  function handleTextSelection(){
    const selection = window.getSelection();
    if(selection?.toString()){
      //use has selected text
      selectedText = selection.toString();
    }
  }

  //This function sets up functionality for clicking
  //search terms in the drop down menu
  function handleSearchTermClick(key:string){
    const path = searchFilter[key];
    const emptyString = "";
    if(path){
      navigate(path);
      for(let i = 0; i < searchTerms.length; i++){
        searchTerms.pop();
      }
      setSearch("");
      setSearchTerms([]);
    }
  }

  //this changes the contents of searchTerms when a key is pressed. 
  //This is activated at the end of the input tag in the form
  let prevIndex = -1;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const alphanumericRegex = /^[a-zA-Z0-9\s\/]$/;
    const input = event.currentTarget;
    const cursorPos = input.selectionStart ?? 0;
    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    if(event.key == "Backspace" && selectedText == "") {
      searchTerms.splice(cursorPos - 1, 1);//delete one char
    }
  
    if(event.key && selectedText != ""){
      searchTerms.splice(selectionStart, selectionEnd - selectionStart);//delete selected letters
    }
  
    if(alphanumericRegex.test(event.key)) {
      searchTerms.splice(cursorPos, 0, event.key);//insert new char
    }
    /*
    setTimeout(() => {
      let firstElement = document.querySelector(".search-term");
      console.log(firstElement?.className);
      firstElement?.classList.add("search-term-selected");
    }, 1);
    */
    //console.log("search terms: ", searchTerms);
  }

  //console.log("search terms size: ", searchTerms.length);


  return (
    <form className="input" onSubmit={handleSearchSubmit}>
      <input 
        className="inputBox" 
        type="input" 
        onSelect={handleTextSelection} 
        placeholder="Enter a topic to search..." 
        value={search} 
        onChange={(e)=>{
          const regex = /^[a-zA-Z0-9\s\/\b]+$/; 
          if(regex.test(e.target.value) || e.target.value == ''){
            setSearch(e.target.value)
          }
        }} 
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        >
      </input>

      <button className="submit" type="submit" >Go</button>
      {inputSelected && shouldRenderSearchTerms() && (
        <div className="search-terms" id="search-terms">
          {Object.keys(searchFilter).filter(key => key.toLowerCase().startsWith(search.toLowerCase())).map((key, index) => (
      <span key={index} className="search-term" id="search-term" onClick={() => handleSearchTermClick(key)}>{key}</span>
    ))}
        </div>
      )}
    </form>
  )
}

export default InputFeild;
