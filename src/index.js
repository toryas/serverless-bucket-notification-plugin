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
      'getInfo:run': this.show.bind(this),
    };
  }

  show(){
    console.log(this.serverless.service)
  }

  async putEvent(){
    this.serverless.cli.log("Running plugin -> Serverless Bucket Notification Plugin")
    let bh = new BucketHelper(this.serverless)
    bh.putNotification();

  }

}

module.exports = ServerlessPlugin;
