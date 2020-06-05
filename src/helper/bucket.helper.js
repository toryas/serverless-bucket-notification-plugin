import { getAWSCredentials, getCustomBucketNotificationConfig } from '../util/serverless.util'
import { makeS3service } from '../util/aws.util';
import NotificationConfiguration from '../domain/notification-configuration'
import BucketNotificationConfiguration from '../domain/bucket-notification-configuration';

export default class BucketHelper {
    constructor(serverless) {
        this.serverless = serverless;
        this.s3 = makeS3service(getAWSCredentials(this.serverless));
    }

    async putNotification() {
        let config = await getCustomBucketNotificationConfig(this.serverless);
        if (await this.isBucketExist(config.Bucket)) {
            let currentBNConfig = await this.getCurrentNotificationBucket(config.Bucket);
            let lisTopic = this.mergeList(currentBNConfig.TopicConfigurations,config.NotificationConfiguration.TopicConfigurations)
            let lisLambdas = this.mergeList(currentBNConfig.LambdaFunctionConfigurations,config.NotificationConfiguration.LambdaFunctionConfigurations)
            let lisQueue = this.mergeList(currentBNConfig.QueueConfigurations,config.NotificationConfiguration.QueueConfigurations)

            let finalConfig = new BucketNotificationConfiguration(config.Bucket,
                new NotificationConfiguration(lisLambdas,lisTopic,lisQueue))
            try{
                await this.s3.putBucketNotificationConfiguration(finalConfig).promise()
            }catch(e){
                this.serverless.cli.log(`[ERROR]:${e.message}`)
            }
                
        } else {
            console.log(`algo salio mal`)
        }

    }

    /**
     * Check if Bucket Exist
     * 
     * @param {*} bucket bucket name
     */
    async isBucketExist(bucket) {
        let buckets = await this.s3.listBuckets().promise();
        if (buckets.Buckets.find(item => item.Name == bucket)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Return Notification Configurations of specific Bucket
     * @param {string} bucket bucket name to get notification config 
     */
    async getCurrentNotificationBucket(bucket) {
        let config = await this.s3.getBucketNotificationConfiguration({ Bucket: bucket }).promise();
        return new NotificationConfiguration(config.LambdaFunctionConfigurations,
            config.TopicConfigurations,
            config.QueueConfigurations)
    }

    /**
     * Concat List A with List B, without duplicates in B
     * @param {*} a list A
     * @param {*} b list B
     */
    mergeList(a,b){
        return a.concat(b.filter(item => a.findIndex(element => element.Id == item.Id)<0))
    }

}



    