import SearchJob from "./searchJob";
import FilterCategory from "./FilterCategory";
function FilterJobs({handleFilterCategory, input , handleInput}){
    return(
        <div className="flex items-center justify-between">
            <SearchJob input={input} handleInput={handleInput}/>
            <FilterCategory handleFilterCategory={handleFilterCategory}/>
        </div>
    )
}
export default FilterJobs