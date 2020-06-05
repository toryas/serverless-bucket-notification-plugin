export default class BucketNotificationConfiguration {
    constructor(bucket, notificationConfig) {
        this.Bucket = bucket
        this.NotificationConfiguration = notificationConfig
    }

    toJSON() {
        let { Bucket, NotificationConfiguration } = this
        return { Bucket, NotificationConfiguration }
    }
}