import BaseConfiguration from './base-configuration';
import FilterRules from './filter-rules';
export default class QueueConfiguration extends BaseConfiguration {

    /**
     * 
     * @param {Array<string>} events 
     * @param {string} queueArn 
     * @param {Array<FilterRules>} filters
     * @param {string} name 
     */
    constructor(events, queueArn, filters, name) {
        super(events, filters, name);
        this.QueueArn = queueArn;
    }

    toJSON() {
        let { Events, QueueArn, Filter, Id } = this
        return { Events, QueueArn, Filter, Id }
    }
}