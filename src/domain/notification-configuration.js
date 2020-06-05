import LambdaFunctionConfiguration from "./lambda-function-configuration"
import QueueConfiguration from "./queue-configuration"
import TopicConfiguration from "./topic-configuration"

export default class NotificationConfiguration {
    /**
     * 
     * @param {Array<LambdaFunctionConfiguration>} lambdaConfigs 
     * @param {Array<TopicConfiguration>} TopicConfigs 
     * @param {Array<QueueConfiguration>} QueueConfigs 
     */
    constructor(lambdaConfigs, TopicConfigs, QueueConfigs) {
        this.LambdaFunctionConfigurations = lambdaConfigs
        this.TopicConfigurations = TopicConfigs
        this.QueueConfigurations = QueueConfigs
    }

    toJSON(){
        let {LambdaFunctionConfigurations,TopicConfigurations,QueueConfigurations} = this
        return {LambdaFunctionConfigurations,TopicConfigurations,QueueConfigurations};
    }
}