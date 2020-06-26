import BucketHelper from './helper/bucket.helper'


class BucketNotificationConfigPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      putEvents: {
        usage: 'to put notification event in bucket',
        lifecycleEvents: [
          'run',
        ]
      },
      getInfo:{
        lifecycleEvents:['run']
      }
    };

    this.hooks = {
      'putEvents:run': this.putEvents.bind(this),
      'after:deploy:finalize': this.putEvents.bind(this),
    };
  }

  async putEvents(){
    this.serverless.cli.log("[Serverless Bucket Notification Plugin]:Start")
    let bh = new BucketHelper(this.serverless)
    await bh.putNotifications();
    this.serverless.cli.log("[Serverless Bucket Notification Plugin]:Done")


  }

}

module.exports = BucketNotificationConfigPlugin;
