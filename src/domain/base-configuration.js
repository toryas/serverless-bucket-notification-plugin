import FilterRules from './filter-rules';
export default class BaseConfiguration {

    /**
     * 
     * @param {Array<string>} events 
     * @param {Array<FilterRules} filters 
     * @param {string} name 
     */
    constructor(events, filters, name) {
        this.Id = name;
        this.Events = events;
        this.Filter = { Key: { FilterRules: filters } }
    }


}