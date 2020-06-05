import BaseConfiguration from './base-configuration';
import FilterRules from './filter-rules';
export default class LambdaFunctionConfiguration extends BaseConfiguration {

    /**
     * 
     * @param {Array<string>} events 
     * @param {string} lambdaFunction 
     * @param {Array<FilterRules>} filters
     * @param {string} name 
     */
    constructor(events, lambdaFunction, filters, name) {
        super(events, filters, name);
        this.LambdaFunctionArn = lambdaFunction;
    }

    toJSON() {
        let { Events, LambdaFunctionArn, Filter, Id } = this
        return { Events, LambdaFunctionArn, Filter, Id }
    }
}