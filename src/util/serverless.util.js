import TopicConfiguration from "../domain/topic-configuration";
import FilterRules from "../domain/filter-rules";
import LambdaFunctionConfiguration from "../domain/lambda-function-configuration";
import QueueConfiguration from "../domain/queue-configuration";
import NotificationConfiguration from "../domain/notification-configuration";

/**
 * Return AWS credentials from serverless framework
 * @param {Object} serverless Serverless Framework Object
 */
export function getAWSCredentials(serverless) {
    let provider = serverless.getProvider('aws');
    return provider.getCredentials().credentials;
}

/**
 * Return array whit notification configurations groups
 * @param {*} serverless Serverless object
 */
export function getCustomBucketNotificationConfigArray(serverless){
    let arrayConfig = serverless.service.custom.BucketNotificationConfig;
    return arrayConfig;
}

/**
 * Return notification config, from serverless.yml
 * @param {*} customeBucketNotificationConfigurationItem notification config for bucket
 */
export function getCustomBucketNotificationConfig(customeBucketNotificationConfigurationItem) {

    let topicNotifications = getNotificationListByType('topic', customeBucketNotificationConfigurationItem);
    let lambdaNotifications = getNotificationListByType('lambda', customeBucketNotificationConfigurationItem);
    let queueNotifications = getNotificationListByType('queue', customeBucketNotificationConfigurationItem)

    return {
        Bucket:customeBucketNotificationConfigurationItem.bucket,
        NotificationConfiguration:new NotificationConfiguration(lambdaNotifications,topicNotifications,queueNotifications)
    }
        

}

/**
 * Return list of notification type from bucketNotificationConfigurationItem in serverless.yml
 * @param {string} element Element type notification config
 * @param {Object} customeBucketNotificationConfigurationItem notification config for bucket
 * 
 * @return {Array<TopicConfiguration>|Array<LambdaFunctionConfiguration>|Array<QueueConfiguration>} notification list 
 */
function getNotificationListByType(type, customeBucketNotificationConfigurationItem) {
    let construct;
    switch (type) {
        case 'topic': construct = TopicConfiguration;
            break;
        case 'lambda': construct = LambdaFunctionConfiguration;
            break;
        case 'queue': construct = QueueConfiguration;
            break;
    }
    let notifications = customeBucketNotificationConfigurationItem.notifications.filter(item => Object.keys(item) == type)

    let listNotification = new Array();
    for (let item of notifications) {
        let notification = item[type]
        let filters = []
        if (notification.prefix) {
            filters.push(new FilterRules('prefix', notification.prefix))
        }
        if (notification.suffix) {
            filters.push(new FilterRules('suffix', notification.suffix))
        }
        listNotification.push(new construct(notification.events, notification.arn, filters,notification.name));
    }
    return listNotification;

}