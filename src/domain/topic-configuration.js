import BaseConfiguration from './base-configuration';
import FilterRules from './filter-rules';
export default class TopicConfiguration extends BaseConfiguration {
    
    /**
     * 
     * @param {Array<string>} events 
     * @param {string} topicArn 
     * @param {Array<FilterRules>} filters
     * @param {string} name 
     */
    constructor(events,topicArn,filters, name) {
        super(events,filters,name);
        this.TopicArn = topicArn;
    }

    toJSON(){
        let {Id,TopicArn,Events,Filter} = this
        return {Id,TopicArn,Events,Filter}
    }

}