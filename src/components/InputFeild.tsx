import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import "./styles.css";
import gearImage from '../gear.png';


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

  //SLA / GENERAL
  "SLA": "/general",
  "General": "/general",
  "Turnaround Time": "/general",
  "Delivery Rules": "/general",
  "Training Notes": "/general",
  "Inconsistent CADs": "/general",

  //SEND TO ENGINEERS
  "Send to Engineers": "/sendToEngineers",
  "2x4 Rafters": "/sendToEngineers",
  "Detached Structures": "/sendToEngineers",
  "Metal Framed Structures": "/sendToEngineers",
  "Steel Framed Structures": "/sendToEngineers",
  "Pergolas": "/sendToEngineers",
  "Patios": "/sendToEngineers",
  "Saggy Roofs": "/sendToEngineers",
  "Old Roofs": "/sendToEngineers",
  "Ponding": "/sendToEngineers",
  "Charlton, MA": "/sendToEngineers",
  "Northborough, MA": "/sendToEngineers",
  "Prince William County, VA": "/sendToEngineers",
  "Calculations Not Passing": "/sendToEngineers",
  "Electrical Queue": "/sendToEngineers",
  "Greg Queue": "/sendToEngineers",
  "EE Stamps": "/sendToEngineers",
  "SE Review Process": "/sendToEngineers",


  //CODES/WIND/SNOW
  "Codes": "/codesWindSnow",
  "Wind": "/codesWindSnow",
  "Snow": "/codesWindSnow",
  "Exposure Categories": "/codesWindSnow",


  //GRAOUND MOUNTS
  "Ground Mounts": "/groundMounts",
  "C-pile": "/groundMounts",
  "Concrete Footing": "/groundMounts",
  "Auger Screw": "/groundMounts",
  "Ground Screw": "/groundMounts",
  "Risk Category 1": "/groundMounts",
  "Max E/W Spacing": "/groundMounts",
  "Max N/S Spacing": "/groundMounts",
  "Footing Sizes": "/groundMounts",


  //ERROR RATE POLICY
  "Error Rate Policy": "/errorRatePolicy",
  "Pay Rates": "/errorRatePolicy",
  "Senior Account Manager": "/errorRatePolicy",
  "Junior Account Manager": "/errorRatePolicy",
  "QA/QC Round Timeline": "/errorRatePolicy",


  //TEMPLATES
  "Templates": "/templates",
  "Match Letter to CAD": "/templates",
  "Last Names": "/templates",
  "System Size": "/templates",
  "Dead Load": "/templates",
  "Section C of Letter": "/templates",
  "Section D of Letter": "/templates",
  "Revisions": "/templates",
  "Post Installs": "/templates",
  "COA Numbers": "/templates",
  "Address": "/templates",


  //AHJ DATABASE
  "AHJ Database": "/database",
  "Upcodes": "/database",
  "ATC Website": "/database",
  "Oklahoma Projects": "/database",
  "New Mexico Projects": "/database",
  "Florida Projects": "/database",
  "North Carolina Projects": "/database",
  "Houston Projects": "/database",

  //CALCULATIONS
  "Calculations": "/calculations",
  "Point Loads": "/calculations",
  "Pull Out Value": "/calculations",
  "Deck Mount Calculations": "/calculations",


  //FOLDERS
  "Folders": "/folders",
  "Add EE Folder Label": "/folders",
  "Add EL Folder Label": "/folders",
  "COM Accounts": "/folders",
  "Battery Folder Label": "/folders",
  "Ground Mount Folder Label": "/folders",
  "EL & ST Folder Label": "/folders",
  "ST Only Folder Label": "/folders",
  "EE Only Folder Label": "/folders",
  "Load Calcs Folder Label": "/folders",
  "WCE Folder Label": "/folders",
  "Order of Labeling Folders": "/folders",
  "Order of Labeling Revisions": "/folders",


  //ROOF FRAMING
  "Roof Framing": "/roofFraming",
  "Roof Slopes": "/roofFraming",
  "Array Tilt": "/roofFraming",
  "Roof Material": "/roofFraming",
  "Assumed Language": "/roofFraming",
  "Tile Roofing Dead Load": "/roofFraming",
  "Dimensional Lumber": "/roofFraming",
  "Rough Sawn Lumber": "/roofFraming",


  //ATTACHMENTS / SCREWS
  "Mount Spacing": "/attachmentsScrews",
  "Ballast Projects": "/attachmentsScrews",
  "Attachment and Screw Type": "/attachmentsScrews",
  "150 mph or greater wind speed": "/attachmentsScrews",

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
    //console.log(className);
    if(className !== "search-terms" && !target.closest(".input"))
      setInputSelected(false);
  }


  //This function happens when the user presses enter or the "GO" button
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(search);
    const link = getLink(search);
    let dropDownElements = document.querySelectorAll("#search-term");
    let numElements = dropDownElements.length;
    if(link){
      navigate(link);
      //console.log(link);
      setSearch("");
      setSearchTerms([]);
    }//goes to first link in search terms if full key isnt typed
    else if(numElements !== 0){
      const firstLink = getLink(dropDownElements[0].innerHTML);
      if(firstLink !== undefined){
        navigate(firstLink);
        setSearch("");
        setSearchTerms([]);
      }
    }
  };


  //This function checks to make sure joined search terms are equal 
  //to a value in the searchFilter
  function shouldRenderSearchTerms(){
    const terms = searchTerms.join("");
    let matched = false;
    for(const key of Object.keys(searchFilter)){
      if(key.toLowerCase().startsWith(terms.toLowerCase()) && terms !== ""){
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
      //user has selected text
      selectedText = selection.toString();
    }
  }


  //This function sets up functionality for clicking
  //search terms in the drop down menu
  function handleSearchTermClick(key:string){
    const path = searchFilter[key];
    if(path){
      navigate(path);
      for(let i = 0; i < searchTerms.length; i++){
        searchTerms.pop();
      }
      setSearch("");
      setSearchTerms([]);
    }
    //For changing CSS styles
    const appElement = document.querySelector(".App");
    appElement?.classList.add("AppPageActive");
  }

  
  //this changes the contents of searchTerms when a key is pressed. 
  //This is activated at the end of the input tag in the form
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    // eslint-disable-next-line
    const alphanumericRegex = /^[a-zA-Z0-9\s\/]$/;
    const input = event.currentTarget;
    const cursorPos = input.selectionStart ?? 0;
    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    if(event.key === "Backspace" && selectedText === "") {
      searchTerms.splice(cursorPos - 1, 1);//delete one char
    }
  
    if(event.key && selectedText !== ""){
      searchTerms.splice(selectionStart, selectionEnd - selectionStart);//delete selected letters
    }
  
    if(alphanumericRegex.test(event.key)) {
      searchTerms.splice(cursorPos, 0, event.key);//insert new char
    }
    //console.log("search terms: ", searchTerms);
  }

  //console.log("search terms size: ", searchTerms.length);


  return (
    <form className="input"  onSubmit={handleSearchSubmit}>
      <input 
        className="inputBox" 
        type="input" 
        onSelect={handleTextSelection} 
        placeholder="Enter a topic to search..." 
        value={search} 
        onChange={(e)=>{
          // eslint-disable-next-line
          const regex = /^[a-zA-Z0-9\s\/\b]+$/; 
          if(regex.test(e.target.value) || e.target.value === ''){
            setSearch(e.target.value)
          }
        }} 
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        >
      </input>
      <Link to="/settings" className="gear">
          <img src={gearImage} alt="Gear" />
      </Link>
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
