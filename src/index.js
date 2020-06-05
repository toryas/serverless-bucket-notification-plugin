import BucketHelper from './helper/bucket.helper'


class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      putEvent: {
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
      'putEvent:run': this.putEvent.bind(this),
      'after:deploy:finalize': this.putEvent.bind(this),
    };
  }

  async putEvent(){
    this.serverless.cli.log("Running plugin -> Serverless Bucket Notification Plugin")
    let bh = new BucketHelper(this.serverless)
    bh.putNotification();
    this.serverless.cli.log("Serverless Bucket Notification Plugin -> Done")


  }

}

module.exports = ServerlessPlugin;
